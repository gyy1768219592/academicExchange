<template>
  <div>
    <Nav></Nav>
    <Sider-nav></Sider-nav>
    <h2 style="margin-left: 250px;margin-top:1%">我的收藏</h2>
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
//import { getData } from "@/api/webget";
//import { deleteData } from "@/api/webdelete";
//import { putData } from "@/api/webput";
import Nav from "../../components/nav.vue";
import SiderNav from "../../components/siderNav.vue";
const data = [
  {
    key: "1",
    name: "神经网络与神经计算机:第二讲 神经网络的学习算法",
    author: "庄镇泉，王东生",
    date: "1990-10-12",
    description: "这里是论文的摘要"
  },
  {
    key: "2",
    name: "非制度性依赖:中国支持型社会组织与政府关系探索",
    author: "魏瑛源，唐应辉，颐建雄",
    date: "2011-12-12",
    description:
      '考虑带启动时间的N-策略离散时间Geo/G/i排队系统,使用全概率分解技术,从任意初始状态出发,研究了队长的瞬态和稳态性质,推导出了在任意时刻"瞬态队长分布的z-变换的递推表达式,稳态队长分布的递推表达式和附加队长分布的表达式,并获得稳态队长的随机分解结果.最后,通过数值实例,讨论了稳态队长分布对系统参数的敏感性,并阐述了获得便于计算的稳态队长分布的表达式在系统容量的优化设计中的重要应用价值.'
  },
  {
    key: "3",
    name: "伪双曲方程的新分裂式正定混合元方法",
    author: "刘洋，李宏，高巍，何斯日古楞",
    date: "2012-11-21",
    description:
      "提出一类二阶伪双曲型方程的新的分裂正定式混合有限元方法.给出了半离散和全离散格式误差估计及其格式的稳定性.与传统的混合元相比,所提出的格式有几个优点:首先所提出的格式能够分裂成两个独立的积分微分子格式并且不需要求解匹配方程组系统;其次不必满足LBB相容性条件."
  }
];
export default {
  data() {
    return {
      data,
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
    deleteCollect(){
        //let params = new URLSearchParams();
        //params.append("UserId", UserId);
    },
  }
};
</script>
<style scoped>
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