<template>
  <div>
    <Nav></Nav>
    <Sider-nav></Sider-nav>
    <template>
      <h2 style="margin-left: 250px;margin-top:1%">我的消息</h2>
      <a-list item-layout="horizontal" :data-source="data">
        <a-list-item slot="renderItem" slot-scope="item">
          <a-button type="danger" slot="actions" ghost>删除</a-button>
          <a-button type="primary" slot="actions" ghost @click="showModal">回复</a-button>
          <a-list-item-meta description="学者名">
            <a slot="title" href="https://www.antdv.com/">{{ item.title }}</a>
            <a-avatar
              slot="avatar"
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            />
          </a-list-item-meta>
        </a-list-item>
      </a-list>
    </template>

  </div>
</template>
<script>
import Nav from "../../components/nav.vue";
import SiderNav from "../../components/siderNav.vue";
const data = [
  {
    title: '邮件名称',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
];

export default {
 data() {
    return {
      visible: false,
      data,
    }
  },
  components: {
    Nav,
    SiderNav
  },
  methods: {
    showModal() {
      this.visible = true;
    },
    handleOk(e) {
      console.log(e);
      this.visible = false;
    },
  },
};
</script>
<style scoped>
.ant-list.ant-list-split {
  margin-left: 250px;
  margin-right: 2%;
  margin-top: 1%;
}
</style>
