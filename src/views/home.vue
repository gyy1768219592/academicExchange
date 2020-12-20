<template>
  <div>
    <topNav></topNav>
    <div class="home-content">
      <div
        v-bind:class="isSelected ? 'homeIndex-search-on' : 'homeIndex-search'"
      >
        <a-popover trigger="click" placement="bottomLeft">
          <template slot="content">
            <div class="home-searchCard">
              <a-form
                :form="form"
                :label-col="{ span: 6 }"
                :wrapper-col="{ span: 14 }"
                @submit="handleSubmit"
              >
                <a-form-item label="检索词/检索学者">
                  <a-input
                    placeholder="检索论文、项目、专利的关键词 / 检索学者的姓名"
                    v-decorator="['word']"
                  />
                </a-form-item>
                <a-form-item label="科研机构">
                  <a-input
                    placeholder="检索项目、专利的完成单位"
                    v-decorator="['institution']"
                  />
                </a-form-item>
                <a-form-item label="学术成果作者">
                  <a-input
                    placeholder="检索项目、专利的作者"
                    v-decorator="['author']"
                  />
                </a-form-item>
                <a-form-item label="发表日期">
                  <a-range-picker
                    popupStyle="width:386.75px"
                    allowClear
                    :placeholder="['开始日期', '结束日期']"
                    format="YYYY-MM-DD"
                    :value="yearValue"
                    :mode="['date', 'date']"
                    @panelChange="handlePanelChange2"
                    @change="handleChange"
                  />
                </a-form-item>
                <a-form-item :wrapper-col="{ span: 14, offset: 6 }">
                  <a-button type="primary" html-type="submit" block>
                    检索
                  </a-button>
                </a-form-item>
              </a-form>
            </div>
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
import moment from "moment";
export default {
  components: {
    topNav,
    researchHotpots,
    institutionRank,
  },
  data() {
    return {
      isSelected: false,
      form: this.$form.createForm(this, { name: "advancedSearch" }),
      yearValue: [],
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
      if (value.length == 0) {
        this.$message.error("请输入检索内容");
      } else {
        this.$router.push({
          path: "/searchResult",
          query: {
            word: value,
            institution: "",
            author: "",
            startDate: "",
            endDate: "",
          },
        });
      }
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        let word = values.word === undefined ? "" : values.word;
        let institution =
          values.institution === undefined ? "" : values.institution;
        let author = values.author === undefined ? "" : values.author;
        let startDate =
          this.yearValue[0] === undefined
            ? ""
            : moment(this.yearValue[0]).format("YYYYMMDD");
        let endDate =
          this.yearValue[1] === undefined
            ? ""
            : moment(this.yearValue[1]).format("YYYYMMDD");
        if (
          word.length == 0 &&
          institution.length == 0 &&
          author.length == 0 &&
          startDate.length == 0 &&
          endDate.length == 0
        ) {
          this.$message.error("请输入检索内容");
        } else {
          this.$router.push({
            path: "/searchResult",
            query: {
              word: word,
              institution: institution,
              author: author,
              startDate: startDate,
              endDate: endDate,
            },
          });
        }
      });
    },
    handleChange(value) {
      this.yearValue = value;
      console.log(this.yearValue);
    },
    handlePanelChange2(value) {
      this.yearValue = value;
      console.log(this.yearValue);
    },
  },
};
</script>

<style>
body{
  
}
.home-content {
  width: 1280px;
  margin: 0 auto;
  
}

.homeIndex-search {
  border-radius: 10px;
  margin: 100px auto;
  border: solid 2px rgba(0, 0, 0, 0.3);
  width: 700px;
  height: 50px;
}

.homeIndex-search:hover {
  border: solid 2px rgba(0, 0, 0, 0.5);
}

.homeIndex-search-on {
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