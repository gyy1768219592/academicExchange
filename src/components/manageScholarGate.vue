<template>
  <div>
    <div class="main">
      <div class="manager-content">
        <div class = "left-block1">
          <div v-bind:class="isSelected1 ? 'manager-search-on' : 'manager-search'">
            <a-input-search
              class="manager-searchBox-1"
              placeholder="通过ID搜索学者门户"
              @search="onSearch1"
              @focus="selected1"
              @blur="undoSelected1"
            />
          </div>
          <div class="manager-result-main-scholar">
            <div class="topbar">
              <span style="margin-left: 20px"> 检索到的学者门户</span>
            </div>
            <div class="manager-result-list-scholar">
              <div class="card-list">
                <a-card>
                  <a-card-grid
                    style="width: 100%"
                    v-for="(item, key) in scholarList.scholarList1"
                    :key="key"
                  >
                    <div class="card-avatar" @click="gotoScholar(item.ScholarId)">
                      <a-avatar
                        v-if="item.AvatarUrl != null"
                        :size="80"
                        :src="item.AvatarUrl"
                      />
                      <a-avatar
                        v-else
                        :size="80"
                        :style="'backgroundColor: #B22222'"
                        >{{ item.name.substring(0, 3)  }}
                      </a-avatar>
                    </div>
                    <div class="card-info" @click="gotoScholar(item.ScholarId)">
                      <span style="font-size: 16px; font-weight: 600"
                        >{{ item.name }} </span
                      >
                      <div
                        v-if="
                          item.institution != '' && item.institution != null
                        "
                        style="
                          height: 30px;
                          overflow: hidden;
                          text-overflow: ellipsis;
                          white-space: nowrap;
                        "
                      >
                        {{ item.institution }}
                      </div>
                      <div v-else style="height: 30px">暂无科研机构数据</div>
                      <a-col :span="7">
                        <a-statistic
                          class="manager-result-scholar-number"
                          title="论文数"
                          :value="item.paper == null ? 19 : item.paper"
                          :value-style="{
                            'text-align': 'center',
                          }"
                        />
                      </a-col>
                      <a-col :span="7">
                        <a-statistic
                          class="manager-result-scholar-number"
                          title="被引量"
                          :value="
                            item.citation == null ? 16 : item.citation
                          "
                          :value-style="{
                            'text-align': 'center',
                          }"
                        />
                      </a-col>
                    </div>
                    <div class="card-button">
                      <p style="margin-top: 42px">
                        <a-tooltip>
                          <template slot="title">
                            管理学者门户
                          </template>
                          <a-button shape="circle" icon="setting" @click="changeMain(key,item)"/>
                        </a-tooltip>
                      </p>
                    </div>
                  </a-card-grid>
                </a-card>
              </div>
            </div>
          </div>
        </div>
        <div class = "middle-block1">
          <div class="manager-result-list-scholar">
            <div class="card-list1">
              <a-card>
                <a-card-grid
                  style="width: 100%"
                  v-for="(item, key) in scholarListMain"
                  :key="key"
                >
                  <div class="card-avatar" @click="gotoScholar(item.ScholarId)">
                    <a-avatar
                      v-if="item.AvatarUrl != null"
                      :size="80"
                      :src="item.AvatarUrl"
                    />
                    <a-avatar
                      v-else
                      :size="80"
                      :style="'backgroundColor: #B22222'"
                      >{{ item.name.substring(0, 3)  }}
                    </a-avatar>
                  </div>
                  <div class="card-info" @click="gotoScholar(item.ScholarId)">
                    <span style="font-size: 16px; font-weight: 600"
                      >{{ item.name }} </span
                    >
                    <div
                      v-if="
                        item.institution != '' && item.institution != null
                      "
                      style="
                        height: 30px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                      "
                    >
                      {{ item.institution }}
                    </div>
                    <div v-else style="height: 30px">暂无科研机构数据</div>
                    <a-col :span="7">
                      <a-statistic
                        class="manager-result-scholar-number"
                        title="论文数"
                        :value="item.paper == null ? 19 : item.paper"
                        :value-style="{
                          'text-align': 'center',
                        }"
                      />
                    </a-col>
                    <a-col :span="7">
                      <a-statistic
                        class="manager-result-scholar-number"
                        title="被引量"
                        :value="
                          item.citation == null ? 16 : item.citation
                        "
                        :value-style="{
                          'text-align': 'center',
                        }"
                      />
                    </a-col>
                  </div>
                </a-card-grid>
              </a-card>
            </div>
          </div>
          <div class="topbar">
            <span style="margin-left: 20px"> 下属的数据库门户</span>
          </div>
          <div class="manager-result-list-scholar">
            <div class="card-list">
              <a-card>
                <a-card-grid
                  style="width: 100%"
                  v-for="(item, key) in scholarList.scholarList2"
                  :key="key"
                >
                  <div class="card-avatar" @click="gotoAuthor(item.AuthorId)">
                    <a-avatar
                      :size="80"
                      :style="'backgroundColor: #B22222'"
                      >{{ item.name.substring(0, 3)  }}
                    </a-avatar>
                  </div>
                  <div class="card-info" @click="gotoAuthor(item.AuthorId)">
                    <span style="font-size: 16px; font-weight: 600"
                      >{{ item.name }} </span
                    >
                    <div
                      v-if="
                        item.institution != '' && item.institution != null
                      "
                      style="
                        height: 30px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                      "
                    >
                      {{ item.institution }}
                    </div>
                    <div v-else style="height: 30px">暂无科研机构数据</div>
                    <a-col :span="7">
                      <a-statistic
                        class="manager-result-scholar-number"
                        title="论文数"
                        :value="item.paper == null ? 0 : item.paper"
                        :value-style="{
                          'text-align': 'center',
                        }"
                      />
                    </a-col>
                    <a-col :span="7">
                      <a-statistic
                        class="manager-result-scholar-number"
                        title="被引量"
                        :value="
                          item.citation == null ? 0 : item.citation
                        "
                        :value-style="{
                          'text-align': 'center',
                        }"
                      />
                    </a-col>
                  </div>
                  <div class="card-button" @click="deleteScholar(key,item)">
                    <p style="margin-top: 42px">
                      <a-tooltip>
                        <template slot="title">
                          删除数据库门户
                        </template>
                        <a-button shape="circle" icon="close" />
                      </a-tooltip>
                    </p>
                  </div>
                </a-card-grid>
              </a-card>
            </div>
          </div>
        </div>
        <div class = "right-block1">
          <div v-bind:class="isSelected2 ? 'manager-search-on' : 'manager-search'">
            <a-input-search
              class="manager-searchBox-2"
              placeholder="通过ID搜索数据库门户"
              @search="onSearch2"
              @focus="selected2"
              @blur="undoSelected2"
            />
          </div>
          <div class="manager-result-main-scholar">
            <div class="topbar">
              <span style="margin-left: 20px"> 检索到的数据库门户</span>
            </div>
            <div class="manager-result-list-scholar">
              <div class="card-list">
                <a-card>
                  <a-card-grid
                    style="width: 100%"
                    v-for="(item, key) in scholarList.scholarList3"
                    :key="key"
                  >
                    <div class="card-avatar" @click="gotoAuthor(item.AuthorId)">
                      <a-avatar
                        :size="80"
                        :style="'backgroundColor: #B22222'"
                        >{{ item.name.substring(0, 3)  }}
                      </a-avatar>
                    </div>
                    <div class="card-info" @click="gotoAuthor(item.AuthorId)">
                      <span style="font-size: 16px; font-weight: 600"
                        >{{ item.name }} </span
                      >
                      <div
                        v-if="
                          item.institution != '' && item.institution != null
                        "
                        style="
                          height: 30px;
                          overflow: hidden;
                          text-overflow: ellipsis;
                          white-space: nowrap;
                        "
                      >
                        {{ item.institution }}
                      </div>
                      <div v-else style="height: 30px">暂无科研机构数据</div>
                      <a-col :span="7">
                        <a-statistic
                          class="manager-result-scholar-number"
                          title="论文数"
                          :value="item.paper == null ? 0 : item.paper"
                          :value-style="{
                            'text-align': 'center',
                          }"
                        />
                      </a-col>
                      <a-col :span="7">
                        <a-statistic
                          class="manager-result-scholar-number"
                          title="被引量"
                          :value="
                            item.citation == null ? 0 : item.citation
                          "
                          :value-style="{
                            'text-align': 'center',
                          }"
                        />
                      </a-col>
                    </div>
                    <div class="card-button" @click="addScholar(key,item)">
                      <p style="margin-top: 42px">
                        <a-tooltip>
                          <template slot="title">
                            添加数据库门户
                          </template>
                          <a-button shape="circle" icon="plus" />
                        </a-tooltip>
                      </p>
                    </div>
                  </a-card-grid>
                </a-card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <a-back-top></a-back-top>
  </div>
</template>
<script>
import { getData } from "@/api/webget";
import { postData } from "@/api/webpost";
import { deleteData } from "@/api/webdelete";
export default {
  data() {
    return {
      visible: false,
      isSelected1: false,
      isSelected2: false,
      currentPage: "1",
      total: 203,
      src:
            "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
      scholarListMain:[{
        ScholarId: -1,
        name: "无名氏",
        src: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
        institution: "暂无科研机构数据",
        paper: 0,
        citation: 0,
        // Hindex: res.data[0].dataScholar.hindex,
      }],
      scholarList:{
        scholarList1: [],
        scholarList2: [],
        scholarList3: [],
      }
    };
  },
  props: ["word"],
  methods: {
    gotoScholar(Id){
      //去此人的主页
      if(Id!=-1){
        let routeUrl = this.$router.resolve({
          path: "/scholarIndex/" ,
          query: { scholarid: Id },
        });
        window.open(routeUrl.href, '_blank');
        // this.$router.push("/scholarIndex/" + Id);
      }
    },
    gotoAuthor(Id){
      //去此人的主页
      let routeUrl = this.$router.resolve({
        path: "/authorIndex/" ,
        query: { authorid: Id },
      });
      window.open(routeUrl.href, '_blank');
      // this.$router.push("/authorIndex/" + Id);
    },
    changeMain(key,item){
      this.$set(this.scholarListMain,0,this.scholarList.scholarList1[key]);
      let params = new URLSearchParams();
      params.append("scholarId", item.ScholarId);
      //调用封装的putData函数，获取服务器返回值 
      let url = this.$urlPath.website.getScholarBelong;
      getData(url, params).then(res => {
        console.log(res.data);
        if (res.code === 1001) {
          // this.$message.success(res.message);
          this.scholarList.scholarList2.splice(0,this.scholarList.scholarList2.length);
          for(var i = 0; i < res.data.dataScholars.length; i ++){
            var newAuthor = {
              AuthorId: res.data.dataScholars[i].authorId,
              name: res.data.dataScholars[i].displayName,
              // AvatarUrl: res.data[i].AvatarUrl,
              institution: res.data.institution[i],
              paper: res.data.dataScholars[i].paperCount,
              citation: res.data.dataScholars[i].citationCount,
              Hindex: res.data.dataScholars[i].hindex,
            };
            this.scholarList.scholarList2.push(newAuthor);
          }
          this.$set(this.scholarList,"scholarList2",this.scholarList.scholarList2);
          //window.sessionStorage.setItem("UserId", res.data.userid);
          // const webAdrs = window.sessionStorage.getItem("WebAdrs");
        } else {
          console.log(res.code);
          this.$message.error(res.message);
        }
      });
    },
    deleteScholar(key,item){
      let authorid = item.AuthorId;
      let url = this.$urlPath.website.undoClaimDataPortal;
      let params = {
        scholarId: this.scholarListMain[0].ScholarId,
        authorId: authorid,
      };
      deleteData(url, params).then((res) => {
        console.log(res.code);
        if (res.code === 1001) {
          this.scholarList.scholarList2.splice(key, 1);
          this.$set(this.scholarList,"scholarList2",this.scholarList.scholarList2);
          this.$message.success("数据库门户已移除");
        } else {
          this.$message.error(res.message);
        }
      });
    },
    addScholar(key,item){
      let params = new URLSearchParams();
      let url = this.$urlPath.website.claimDataPortal;
      params.append("scholarId", this.scholarListMain[0].ScholarId);
      params.append("authorId", item.AuthorId);
      postData(url, params).then((res) => {
        console.log(res.code);
        if (res.code === 1001) {
          this.scholarList.scholarList2.push(this.scholarList.scholarList3[key]);
          this.$set(this.scholarList,"scholarList2",this.scholarList.scholarList2);
          this.scholarList.scholarList3.splice(key, 1);
          this.$set(this.scholarList,"scholarList3",this.scholarList.scholarList3);
          this.$message.success("数据库门户已添加");
        } else {
          this.$message.error(res.message);
        }
      });
    },
    changePage() {
      console.log(this.currentPage);
    },
    selected1() {
      this.isSelected1 = true;
    },
    selected2() {
      this.isSelected2 = true;
    },
    undoSelected1() {
      this.isSelected1 = false;
    },
    undoSelected2() {
      this.isSelected2 = false;
    },
    onSearch1(value) {//查找之后要结果
      if(!(/^\d+$/.test(value)))
      {
        this.$message.error("输入非法！");
        return;
      }
      let params = new URLSearchParams();
      params.append("ScholarName", "");
      params.append("ScholarId", value);
      //调用封装的putData函数，获取服务器返回值 
      let url = this.$urlPath.website.getRealScholarByID;
      getData(url, params).then(res => {
        console.log(res.data);
        if (res.code === 1001) {
          // this.$message.success(res.message);
          var newAuthor = {
            ScholarId: res.data[0].ScholarId,
            name: res.data[0].Name,
            AvatarUrl: res.data[0].AvatarUrl,
            institution: res.data[0].Institution,
            // paper: res.data[0].dataScholar.paperCount,
            // citation: res.data[0].dataScholar.citationCount,
            // Hindex: res.data[0].dataScholar.hindex,
          };
          if(this.scholarList.scholarList1.length === 0){
            this.scholarList.scholarList1.push(newAuthor);
          }
          else{
            this.$set(this.scholarList.scholarList1,0,newAuthor);
          }
          //window.sessionStorage.setItem("UserId", res.data.userid);
          // const webAdrs = window.sessionStorage.getItem("WebAdrs");
        } else {
          console.log(res.code);
          this.$message.error(res.message);
        }
      });
    },
    onSearch2(value) {//查找之后要结果
      if(!(/^\d+$/.test(value)))
      {
        this.$message.error("输入非法！");
        return;
      }
      let params = new URLSearchParams();
      // params.append("value", value);
      //调用封装的putData函数，获取服务器返回值 
      let url = this.$urlPath.website.getScholarByID + value;
      getData(url, params).then(res => {
        console.log(res.data);
        if (res.code === 1001) {
          var newAuthor = {
            AuthorId: res.data.dataScholar.authorId,
            name: res.data.dataScholar.displayName,
            src:
            "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
            institution: res.data.institution,
            paper: res.data.dataScholar.paperCount,
            citation: res.data.dataScholar.citationCount,
            Hindex: res.data.dataScholar.hindex,
          };
          if(this.scholarList.scholarList3.length === 0){
            this.scholarList.scholarList3.push(newAuthor);
          }
          else{
            this.$set(this.scholarList.scholarList3,0,newAuthor);
          }
          //window.sessionStorage.setItem("UserId", res.data.userid);
          // const webAdrs = window.sessionStorage.getItem("WebAdrs");
        } else {
          console.log(res.code);
          this.$message.error(res.message);
        }
      });
    },
    afterVisibleChange(val) {
      console.log('visible', val);
    },
    showDrawer() {
      this.visible = true;
    },
    onClose() {
      this.visible = false;
    },
  },
};
</script>

<style>
.left-block1{
  width: 33%;
  height: 1350px;
  border-right: 1px solid rgb(239, 239, 239);
  border: solid 1px white;
}
.middle-block1{
  width: 34%;
  height: 1350px;
  border: solid 1px white;
  border-left: 1px solid rgb(239, 239, 239);
  border-right: 1px solid rgb(239, 239, 239);
  margin: -1350px 0px 0px 33%;
}
.right-block1{
  width: 33%;
  height: 1350px;
  margin: -1350px 0px 0px 67%;
  border-left: 1px solid rgb(239, 239, 239);
  border: solid 1px white;
}
.manager-result-main-scholar .topbar {
  width: 100%;
  border-bottom: 1px solid #e3e3e3;
  /* border: solid 1px black; */
  height: 40px;
}
.manager-result-list-scholar .card-list {
  /* border: solid 1px black; */
  width: 90%;
  height: 1050px;
  margin: 20px auto;
  overflow-y: auto;
}
.manager-result-list-scholar .card-list .card-avatar {
  float: left;
  width: 20%;
}
.manager-result-list-scholar .card-list .card-info {
  float: left;
  margin-left: 5%;
  width: 65%;
}
.manager-result-list-scholar .card-list .card-info span {
  display: inline-block;
  width: 90%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.manager-result-list-scholar .card-list .card-button {
  float: right;
  width: 10%;
}
.manager-result-list-scholar .card-list1 {
  /* border: solid 1px black; */
  width: 90%;
  /* height: 1100px; */
  margin: 20px auto;
  overflow-y: auto;
}
.manager-result-list-scholar .card-list1 .card-avatar {
  float: left;
  width: 20%;
}
.manager-result-list-scholar .card-list1 .card-info {
  float: left;
  margin-left: 5%;
  width: 65%;
}
.manager-result-list-scholar .card-list1 .card-info span {
  display: inline-block;
  width: 90%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.manager-result-list-scholar .card-list1 .card-button {
  float: right;
  width: 10%;
}
.manager-content {
  width: 1280px;
  margin: 0 auto;
}

.manager-search {
  border-radius: 10px;
  margin: 20px auto;
  border: solid 2px rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 40px;
}

.manager-search:hover {
  border: solid 2px rgba(0, 0, 0, 0.5);
}

.manager-search-on {
  border-radius: 10px;
  margin: 20px auto;
  border: solid 2px #B22222;
  width: 100%;
  height: 40px;
}
.manager-searchBox-1 {
  width: 99%;
  margin-left: 1%;
  height: 100%;
}
.manager-searchBox-2 {
  width: 99%;
  margin-left: 1%;
  height: 100%;
}
.manager-searchButton {
  font-size: 14px;
  margin-top: 7px;
  height: 32px;
  border: 0;
  border-right: 2px solid #e3e3e3;
}
.manager-searchButton:hover {
  border-right: 2px solid #e3e3e3;
}
.manager-searchButton:focus {
  border-right: 2px solid #e3e3e3;
}

.manager-searchBox-1 .ant-input {
  margin-top: 1px;
  border-radius: 0 10px 10px 0;
  border: none;
  display: inline-block;
}
.manager-searchBox-1 .ant-input:focus {
  border: none;
  box-shadow: none;
}

.manager-searchBox-2 .ant-input {
  margin-top: 1px;
  border-radius: 0 10px 10px 0;
  border: none;
  display: inline-block;
}
.manager-searchBox-2 .ant-input:focus {
  border: none;
  box-shadow: none;
}
.manager-searchCard {
  width: 663px;
}
.manager-result-scholar-number {
  display: inline-block;
}

</style>