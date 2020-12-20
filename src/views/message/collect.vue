<template>
  <div class="al">
    <Nav></Nav>
    <Sider-nav></Sider-nav>
    <h2 style="margin-left: 250px;margin-top:1%">我的收藏</h2>
    <a-menu v-model="current" mode="horizontal" style="margin-left: 250px;margin-top:1%">
      <a-menu-item key="paper"> 
          <a-icon type="copy" />文献
      </a-menu-item>
      <a-menu-item key="app" > 
          <a-icon type="pie-chart" />专利
      </a-menu-item>
      <a-menu-item key="project" > 
          <a-icon type="appstore" />项目
      </a-menu-item>
    </a-menu>
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
          Search
        </a-button>
        <a-button
          size="small"
          style="width: 90px"
          @click="() => handleReset(clearFilters)"
        >
          Reset
        </a-button>
      </div>
      <a-icon
        slot="filterIcon"
        slot-scope="filtered"
        type="search"
        :style="{ color: filtered ? '#108ee9' : undefined }"
      />
      <a slot="customRender" slot-scope="text, record, index, column">
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
            <template v-else>{{ fragment }}</template>
          </template>
        </span>
        <template v-else>
          {{ text }}
        </template>
      </a>
      <p slot="expandedRowRender" slot-scope="record" style="margin: 0">
        {{ record.description }}
      </p>
      <a-button @click="deleteCollect" slot="action" type="danger" ghost>
        取消收藏
      </a-button>
    </a-table>
  </div>
</template>
<script>
//import { postData } from "@/api/webpost";
import { getData } from "@/api/webget";
//import { deleteData } from "@/api/webdelete";
//import { putData } from "@/api/webput";
import Nav from "../../components/nav.vue";
import SiderNav from "../../components/siderNav.vue";

export default {
  data() {
    return {
      current: ['paper'],
      data: [
        {
          key: null,
          name: null,
          author: null,
          date: null,
          description: null,
        }
      ],
      searchText: "",
      searchInput: null,
      searchedColumn: "",
      columns: [
        {
          title: "名称",
          dataIndex: "name",
          key: "name",
          width: 380,
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
          width: 240,
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
          width: 200,
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
  components: {
    Nav,
    SiderNav
  },
  mounted() {
    this.getCollectPaper();
  },
  methods: {
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
        console.log(res.data);
        if (res.code === 1001) {
          _this.data= res.data;
          _this.data = res.data.
        /*  key: "1",
    name: "神经网络与神经计算机:第二讲 神经网络的学习算法",
    author: "庄镇泉，王东生",
    date: "1990-10-12",
    description: "这里是论文的摘要"*/
          console.log("获取成功");
        } 
        else {
          //console.log(res.code);
          _this.$message.error("获取数据失败");
        }
      });
    }
    
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
.ant-table-wrapper {
  margin-left: 250px;
  margin-right: 2%;
  margin-top: 1%;
}
.highlight {
  background-color: rgb(255, 192, 105);
  padding: 0px;
}
</style>