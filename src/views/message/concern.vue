<template>
  <div>
    <Nav></Nav>
    <Sider-nav></Sider-nav>
    <h2 style="margin-left: 250px;margin-top:1%">我的关注</h2>
    <a-list item-layout="horizontal" :data-source="data">
      <a-list-item slot="renderItem" slot-scope="item">
        <a-button type="danger" slot="actions" ghost>取消关注</a-button>
        <a-button type="primary" slot="actions" ghost>发送私信</a-button>
        <a-list-item-meta description="此处为学者个人简介">
          <a slot="title" href="https://www.antdv.com/">{{ item.title }}</a>
          <a-avatar
            slot="avatar"
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          />
        </a-list-item-meta>
      </a-list-item>
    </a-list>
  </div>
</template>
<script>
import Nav from "../../components/nav.vue";
import SiderNav from "../../components/siderNav.vue";
const data = [
  {
    title: "学者1"
  },
  {
    title: "学者名2"
  },
  {
    title: "Ant Design Title 3"
  },
  {
    title: "Ant Design Title 4"
  }
];

export default {
  data() {
    return {
      data
    };
  },
  components: {
    Nav,
    SiderNav
  },
  methods: {}
};
</script>
<style scoped>
.ant-list.ant-list-split {
  margin-left: 250px;
  margin-right: 2%;
  margin-top: 1%;
}
</style>
