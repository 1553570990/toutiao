<template>
  <el-card class="material">
    <bread-crumb>
      <template slot="title">素材管理</template>
    </bread-crumb>
    <el-upload
      class="upload-btn"
      :show-file-list="false"
      :http-request="uploadImg"
    >
      <el-button size="small" type="primary">上传图片</el-button>
    </el-upload>
    <!-- tab -->
    <el-tabs v-model="activeName" @tab-click="changeTab">
      <el-tab-pane label="全部素材" name="all">
        <div class="card-list">
          <el-card class="img-card" v-for="item in list" :key="item.id">
            <img :src="item.url" alt="" />
            <el-row
              class="operate"
              type="flex"
              align="middle"
              justify="space-around"
            >
              <i @click="collectOrCancel(item)" class="el-icon-star-on" :style="{color:item.is_collected ? 'red':''}"></i>
              <i @click="delImg(item)" class="el-icon-delete-solid"></i>
            </el-row>
          </el-card>
        </div>
        <!-- 分页 -->
        <el-row type="flex" justify="center">
          <el-pagination
            @current-change="changePage"
            :current-page="page.page"
            :page-size="page.pageSize"
            :total="page.total"
            background
            layout="prev,pager,next"
          ></el-pagination>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="收藏素材" name="collect">
        <div class="card-list">
          <el-card class="img-card" v-for="item in list" :key="item.id">
            <img :src="item.url" alt="">
          </el-card>
        </div>
        <!-- 分页 -->
        <el-row type="flex" justify="center">
          <el-pagination
            @current-change="changePage"
            :current-page="page.page"
            :page-size="page.pageSize"
            :total="page.total"
            background
            layout="prev,pager,next"
          ></el-pagination>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      activeName: "all",
      page: {
        page: 1,
        pageSize: 2,
        total: 0,
      },
      list: [],
    };
  },
  methods: {
    uploadImg(params) {
      // console.log(params); //图片的信息
      const obj = new FormData();
      obj.append("image", params.file);
      this.$http({
        url: "/user/images",
        method: "post",
        data: obj,
      }).then(() => {
        this.getMaterial();
      });
    },
    delImg(item){
      this.$confirm('确定要删除此素材吗?','提示').then(()=>{
        // delete 方式
        this.$http({
          url:`/user/images/${item.id}`,
          method:'delete'
        }).then(()=>{
          this.getMaterial();
        })
      })
    },
    async collectOrCancel(item){
      const mess = item.is_collected ? "取消" : "";
      await this.$confirm(`确定要${mess}收藏这个素材吗?`)
      await  this.$http({
          url:`/user/images/${item.id}`,
          method:'put',
          data:{
            collect:!item.is_collected
          }
      })
      this.getMaterial();
    },
    // collectOrCancel(item){
    //   const mess = item.is_collected ? "取消" : "";
    //   this.$confirm(`确定要${mess}收藏这个素材吗?`).then(()=>[
    //     //put 方式
    //     this.$http({
    //       url:`/user/images/${item.id}`,
    //       method:'put',
    //       data:{
    //         collect:!item.is_collected
    //       }
    //     }).then(()=>[
    //       this.getMaterial()
    //     ])
    //   ])
    // },
    changeTab() {
      //收藏页签
      // activeName 变成collect
      // this.page.page = 1
      this.page.page = 1;
      this.getMaterial();
    },
    changePage(newPage) {
      this.page.page = newPage;
      this.getMaterial();
    },
    getMaterial() {
      this.$http({
        url: "/user/getImages",
        params: {
          page: this.page.page, //第几页默认第一页
          per_page: this.page.pageSize, //每页几条
          collect: this.activeName === "collect",
        },
      }).then((result) => {
        // 数据 添加到list中
        // 分页控件数据
        // console.log(result);
        this.list = result.data.results;
        this.page.total = result.data.total_count;
      });
    },
  },
  created() {
    this.getMaterial();
  },
};
</script>

<style lang='less' scoped>
.material {
  .card-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  .img-card {
    width: 180px;
    height: 180px;
    margin: 30px;
    position: relative;
  }
  img {
    width: 100%;
    height: 100%;
  }
  .operate {
    position: absolute;
    width: 100%;
    bottom: 0;
    left: 0;
    height: 30px;
    font-size: 18px;
    background-color: #f4f5f6;
  }
}
</style>