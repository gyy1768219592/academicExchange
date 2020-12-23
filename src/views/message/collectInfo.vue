<template>
  <div class="al" >
    <a-table :data-source="data" :columns="columns">
      <div
        slot="filterDropdown"
        slot-scope="{
          setSelectedKeys,
          selectedKeys,
          confirm,
          clearFilters,
          column
        }"
        style="padding: 8px"
      >
        <a-input
          v-ant-ref="c => (searchInput = c)"
          :placeholder="`Search ${column.dataIndex}`"
          :value="selectedKeys[0]"
          style="width: 188px; margin-bottom: 8px; display: block;"
          @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
          @pressEnter="
            () => handleSearch(selectedKeys, confirm, column.dataIndex)
          "
        />
        <a-button
          type="primary"
          icon="search"
          size="small"
          style="width: 90px; margin-right: 8px"
          @click="() => handleSearch(selectedKeys, confirm, column.dataIndex)"
        >
          搜索
        </a-button>
        <a-button
          size="small"
          style="width: 90px"
          @click="() => handleReset(clearFilters)"
        >
          重置
        </a-button>
      </div>
      <a-icon
        slot="filterIcon"
        slot-scope="filtered"
        type="search"
        :style="{ color: filtered ? '#108ee9' : undefined }"
      />
      <a slot="customRender" slot-scope="text, record, index, column" >
        <span v-if="searchText && searchedColumn === column.dataIndex">
          <template
            v-for="(fragment, i) in text
              .toString()
              .split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i'))"
          >
            <mark
              v-if="fragment.toLowerCase() === searchText.toLowerCase()"
              :key="i"
              class="highlight"
              >{{ fragment }}</mark
            >
            <template v-else >{{ fragment }}</template>
          </template>
        </span>
        <template v-else >
          {{ text }}
        </template>

      </a>
      <p slot="expandedRowRender" slot-scope="record" style="margin: 0">
        {{ record.description }}
      </p>
      <span slot="action" slot-scope=" record">
      <a-button @click="deleteCollect(record)"  type="danger" ghost>
        取消收藏
      </a-button>
      <a-divider type="vertical" />
      <a-button @click="toPaper(record)" style="color:	#696969;border-color:	#696969">
        查看
      </a-button>
      </span>
    </a-table>
  </div>
</template>
<script>
import { getData } from "@/api/webget";
import { putData } from "@/api/webput";

export default {
  inject: ['reload'],
  props: ['ch'],
  data() {
    return {
      data: [],
      searchText: "",
      searchInput: null,
      searchedColumn: "",
      columns: [
        {
          title: "名称",
          dataIndex: "name",
          key: "name",
          width: 550,
          ellipsis: true,
          scopedSlots: {
            filterDropdown: "filterDropdown",
            filterIcon: "filterIcon",
            customRender: "customRender"
          },
          onFilter: (value, record) =>
            record.name
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: visible => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus();
              }, 0);
            }
          }
        },
        {
          title: "作者",
          dataIndex: "author",
          width: 200,
          ellipsis: true,
          key: "author",
          scopedSlots: {
            filterDropdown: "filterDropdown",
            filterIcon: "filterIcon",
            customRender: "customRender"
          },
          onFilter: (value, record) =>
            record.author
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: visible => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus();
              });
            }
          }
        },
        {
          title: "发表日期",
          dataIndex: "date",
          key: "date",
          ellipsis: true,
          width: 180,
          scopedSlots: {
            filterDropdown: "filterDropdown",
            filterIcon: "filterIcon",
            customRender: "date"
          },
          onFilter: (value, record) =>
            record.date
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: visible => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus();
              });
            }
          }
        },
        {
          title: "操作",
          ellipsis: true,
          dataIndex: "",
          key: "x",
          scopedSlots: { customRender: "action" }
        }
      ]
    };
  },

  mounted() {
    console.log(this.choose)
    if (this.ch === 0)
        this.getCollectPaper();
    else if(this.ch === 1)
        this.getCollectPatent();
    else if(this.ch === 2)
        this.getCollectProject();
    else
        this.$message.error("获取数据失败");
  },
  methods: {
    format(date) {
      return date.slice(0,4)+ '-' + date.slice(4,6)+'-' +date.slice(6,8);
    },
    parentFn(payload) {
        this.choosen = payload;
    },
    handleSearch(selectedKeys, confirm, dataIndex) {
      confirm();
      this.searchText = selectedKeys[0];
      this.searchedColumn = dataIndex;
    },
    handleReset(clearFilters) {
      clearFilters();
      this.searchText = "";
    },
    getCollectPaper(){
      var _this = this;
      let url = _this.$urlPath.website.getCollectPaper;
      getData(url,null).then(res => {
        console.log(res);
        if (res.code === 1001) {
          // console.log(res.data);
          for (let i = 0; i < res.data.total; i++) {
            let author = ''
            res.data.authors[i].forEach(auth => {
              author += auth.name.replace(/\s/g,"") + '; '
            })
            _this.data.push({
                key: i+1,
                name: res.data.paperList[i].paperTitle,
                author,
                date: res.data.paperList[i].date.split('T')[0],
                description: res.data.paperList[i].paper_abstract,
                id: res.data.paperList[i].paperId,

            });
        }
          console.log("获取成功");
        }
        else {
          _this.$message.error("获取数据失败");
        }
      });
    },
    getCollectPatent(){
      var _this = this;
      let url = _this.$urlPath.website.getCollectPatent;
      getData(url,null).then(res => {
        console.log(res);
         if (res.code === 1001) {
         //console.log(res.data);
          for (let i = 0; i < res.data.total; i++) {
           var date = res.data.patentList[i].applicationDate;
           date = this.format(date);
            _this.data.push({
                key: i+1,
                name: res.data.patentList[i].title,
                author: res.data.patentList[i].inventor.replace(/\s/g,""),
                date:date,
                description: res.data.patentList[i].abstract,
                id: res.data.patentList[i].id,
            });
        }
          console.log("获取成功");
        }
        else {
          _this.$message.error("获取数据失败");
        }
      });
    },
    getCollectProject(){
      var _this = this;
      let url = _this.$urlPath.website.getCollectProject;
      getData(url,null).then(res => {
        console.log(res);
        if (res.code === 1001) {
          for (let i = 0; i < res.data.total; i++) {
            _this.data.push({
                key: i+1,
                name: res.data.projectList[i].fundProject,
                author: res.data.projectList[i].authors.replace(/\s/g,""),
                date: res.data.projectList[i].publishDate,
                description: res.data.projectList[i].chineseTitle,
                id: res.data.projectList[i].projectId,
            });
        }
          console.log("获取成功");
        }
        else {
          _this.$message.error("获取数据失败");
        }
      });
    },
    deleteCollect(index){
      console.log(this.ch)
      console.log(index.id)
      var _this = this;
      let url = _this.$urlPath.website.delCollect;
      let params = {
        "type":  _this.ch,
        "paperId": index.id,
      };
      putData(url,params).then(res => {
        console.log(res);
        if (res.code === 1001) {
            console.log("取消成功");
        }
        else {
          _this.$message.error("取消失败");
        }
        this.reload();
      });
    },
    toPaper(index) {
      var _this = this;
      if(_this.ch == 0){
        this.$router.push("/paperDisplay/" + index.id);
      }else if(_this.ch == 1){
        this.$router.push("/patentDisplay/" + index.id);
      }else{
        this.$router.push("/progDisplay/" + index.id);
      }
    },
  }
};
</script>
<style scoped>
.al ::-webkit-scrollbar{
  display: none;
}
.al{
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */
  overflow-x: hidden;
  overflow-y: auto;
}

/*.ant-table-wrapper {
  margin-left: 250px;
  margin-right: 2%;
  margin-top: 1%;
}*/
.highlight {
  background-color: rgb(255, 192, 105);
  padding: 0px;
}
</style>
