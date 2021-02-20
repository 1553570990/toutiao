<template>
  <el-row type="flex" class="layout-header" justify="space-between">
    <el-col class="left" :span="6">
      <i class="el-icon-s-unfold icon"></i>
      <span>哈尔滨布卡科技有限公司</span>
    </el-col>
    <el-col class="right" :span="3">
      <!-- 用户头像 :src="动态地址从数据库中拿" -->
      <img
        :src="Info.photo ? Info.photo : defaultImg"
        alt=""
        class="head-img"
      />
      <!-- 功能键 -->
      <el-dropdown trigger="click" @command="handleMenuItem">
        <!-- 用户名 插槽-->
        <span class="el-dropdown-link">
          {{Info.name}}<i class="el-icon-arrow-down el-icon-s--right"></i>
        </span>
        <!-- 下拉项 剧名插槽 -->
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="account">个人信息</el-dropdown-item>
          <el-dropdown-item command="git">git地址</el-dropdown-item>
          <el-dropdown-item command="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
</template>

<script>
import eventBus from "../../utils/events";
export default {
  data() {
    return {
      Info: {},
      defaultImg: require("../../assets/avatar.jpg"), //默认头像
    };
  },
  // 获取用户信息
  methods: {
    handleMenuItem(command) {
      if (command === "accont") {
        // console.log(1);
      } else if (command === "git") {
        window.location.href = "https://github.com/1553570990/toutiao";
      } else {
        window.localStorage.clear();
        this.$router.push("/login");
      }
    },
    getUserInfo() {
      // const token = window.localStorage.getItem('user-token'); axios.config.js代替
      this.$http({
        url: "/user/profile",
        // headers:{
        //     Authorization:`Bearer ` + token
        // }
      }).then((result) => {
        // console.log(123);
        // console.log(result);
        this.Info = result.data
        // console.log(this.Info);
        
      });
    },
  },
  created() {
        //$emit() 触发事件 只限于当前实例
        // $on 监听事件 只限于当前实例
        // v-on 只限于当前实例 可以用标签上 可以绑定父组件方法
    eventBus.$on("updateUserInfo", () => {
    this.getUserInfo();
    });
    this.getUserInfo();
  },
};
</script>

<style lang="less">
.layout-header {
  padding: 8px 0;
  .left {
    .icon {
      font-size: 22px;
      margin-right: 5px;
    }
  }
  .right {
    display: flex;
    align-items: center;
    .head-img {
      border-radius: 50%;
      margin-right: 5px;
      width: 40px;
      height: 40px;
    }
  }
}
</style>