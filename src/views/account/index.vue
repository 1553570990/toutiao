<template>
  <el-card v-loading="loading">
    <bread-crumb slot="header">
      <template slot="title">账户信息</template>
    </bread-crumb>
    <el-upload :http-request="uploadUserImg" :show-file-list="false">
      <img :src="userInfo.photo?userInfo.photo:defaultImg" alt="" class="head-image">
    </el-upload>
    <el-form ref="userFrom" :model="userInfo" :rules="userRules" label-width="100px">
      <el-form-item label="用户名" prop="name">
        <el-input v-model="userInfo.name" style="width: 300px"></el-input>
      </el-form-item>
      <el-form-item label="简介" prop="intro">
        <el-input v-model="userInfo.intro" style="width: 300px"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="userInfo.email" style="width: 300px"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input
          v-model="userInfo.mobile"
          style="width: 300px"
          disabled
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveUserInfo">保存</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import eventBus from '../../utils/events'
export default {
  data() {
    return {
      loading: false,
      defaultImg:require('../../assets/avatar.jpg'),
      userInfo: {
          name:'',
          intro:'',
          email:'',
          photo:'',
          mobile:''
      },
      userRules: {
          name:[{
              required:true,
              message:'用户名不能为空'
          },{
              min:2,
              max:8,
              message:'用户名长度必须为2-8位'
          }],
          email:[{
              pattern:/^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/,
              message:'邮箱格式不正确'
          }]
      },
    };
  },
  methods: {
    uploadUserImg(params) {
        this.loading = true;
        const data = new FormData();
        data.append('photo',params.file);
        this.$http({
            url:'/user/photo',
            method:'patch',
            data
        }).then(()=>{
            this.loading = false;
            // 右上角同步 拨电话 接电话
            // eventBus $emit() 触发监听 仅限于当前实例 解决办法:全局vue实例，eventBus
            eventBus.$emit('updateUserInfo') //参数相当于电话号 打了一个电话

            this.getUserInfo();
        })
    },
    saveUserInfo() {
        this.$refs.userFrom.validate((isOk)=>{
            if(isOk){
                this.$http({
                    url:'/user/profile',
                    method:'patch',
                    data:this.userInfo
                }).then(()=>{
                    // 成功提示
                    // 右上角同步
                    // this.getUserInfo();
                    //eventBus 非纯父子组件关系的传值 
                     eventBus.$emit('updateUserInfo')
                })
            }
        })
    },
    getUserInfo() {
      this.$http({
        url: "/user/profile",
      }).then((result) => {
        // console.log(result);
        this.userInfo = result.data;
      });
    },
  },
  created() {
    this.getUserInfo();
  },
};
</script>

<style scoped lang="less">
    .head-image{
        position: absolute;
        width: 200px;
        height: 200px;
        border-radius: 50%;
        margin-left: 500px;
    }
</style>