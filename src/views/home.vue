<template>
  <div>
    <topNav></topNav>
    <div class="home-content">
      <div v-bind:class="isSelected ? 'home-search-on' : 'home-search'">
        <a-popover trigger="click" placement="bottomLeft">
          <template slot="content">
            <div class="home-searchCard">选项</div>
          </template>
          <a-button
            class="home-searchButton"
            type="link"
            @click="selected"
            @blur="undoSelected"
            >高级检索</a-button
          >
        </a-popover>
        <a-input-search
          class="home-searchBox"
          placeholder="搜论文、专利、国家项目、学者"
          @search="onSearch"
          @focus="selected"
          @blur="undoSelected"
        />
      </div>
      <div class="home-display">
        <div class="institution-rank">
          <div class="research-hotpots-title">科研机构排名</div>
          <institutionRank></institutionRank>
        </div>
        <div class="research-hotpots">
          <div class="research-hotpots-title">科研热点领域</div>
          <research-hotpots></research-hotpots>
        </div>
      </div>
    </div>
    <div class="home-footer">
      <a-layout-footer style="text-align: center">
        Ant Design ©2018 Created by Ant UED
      </a-layout-footer>
    </div>
  </div>
</template>

<script>
import topNav from "@/components/nav.vue";
import researchHotpots from "@/components/researchHotpots.vue";
import institutionRank from "@/components/institutionRank.vue";
export default {
  components: {
    topNav,
    researchHotpots,
    institutionRank,
  },
  data() {
    return {
      isSelected: false,
    };
  },
  methods: {
    selected() {
      this.isSelected = true;
    },
    undoSelected() {
      this.isSelected = false;
    },
    onSearch(value) {
      this.$router.push({ path: "/searchResult", query: { word: value } });
    },
  },
};
</script>

<style>
.home-content {
  width: 1280px;
  margin: 0 auto;
}

.home-search {
  border-radius: 10px;
  margin: 100px auto;
  border: solid 2px rgba(0, 0, 0, 0.3);
  width: 700px;
  height: 50px;
}

.home-search:hover {
  border: solid 2px rgba(0, 0, 0, 0.5);
}

.home-search-on {
  border-radius: 10px;
  margin: 100px auto;
  border: solid 2px #1890ff;
  width: 700px;
  height: 50px;
}
.home-searchBox {
  width: 605px;
}
.home-searchButton {
  font-size: 14px;
  margin-top: 7px;
  height: 32px;
  border: 0;
  border-right: 2px solid #e3e3e3;
}
.home-searchButton:hover {
  border-right: 2px solid #e3e3e3;
}
.home-searchButton:focus {
  border-right: 2px solid #e3e3e3;
}

.home-searchBox .ant-input {
  margin-top: 1px;
  border-radius: 0 10px 10px 0;
  border: none;
  display: inline-block;
}
.home-searchBox .ant-input:focus {
  border: none;
  box-shadow: none;
}
.home-searchCard {
  width: 663px;
}
.institution-rank {
  float: left;
  padding-left: 20px;
}
.research-hotpots {
  float: right;
}
.research-hotpots-title {
  font-size: 18px;
  font-weight: 700;
}
.home-display {
  height: 700px;
}
</style>