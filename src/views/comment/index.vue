<template>
  <el-card v-loading="loading">
    <bread-crumb slot="header">
      <template slot="title">评论列表</template>
    </bread-crumb>
    <el-table :data="list">
      <el-table-column width="700" label="标题" prop="title"></el-table-column>
      <el-table-column
        :formatter="formatter"
        label="评论状态"
        prop="comment_status"
      ></el-table-column>
      <el-table-column label="总评论数" prop="total_comment"></el-table-column>
      <el-table-column label="粉丝评论数" prop="fans_comment"></el-table-column>
      <el-table-column label="操作">
        <!-- 作用域插槽 slot-scope -->
        <!-- obj是表中每一项的集合 -->
        <template slot-scope="obj">
          <el-button size="small" type="text" @click="openOrClose(obj.row)">{{
            obj.row.comment_status ? "关闭评论" : "打开评论"
          }}</el-button>
          <!-- <el-button size="small">打开或关闭评论</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-row type="flex" justify="center" style="margin: 10px 0">
      <!-- 分页插件 current-page每页显示多少条 @cuttent-change方法，页面改变触发 page-size页总数 total总数-->
      <el-pagination
        @current-change="changePage"
        :current-page="page.page"
        :page-size="page.pageSize"
        :total="page.total"
        background
        layout="prev,pager,next"
      ></el-pagination>
    </el-row>
  </el-card>
</template>

<script>
import {openOrClose_Comment} from '../../api/comment'
export default {
  data() {
    return {
      loading:false,
      list: [
        {
          title: "",
          comment_status: "",
          total_comment: "",
          fans_comment: "",
        },
      ],
      page: {
        page: 1,
        pageSize: 4,
        total: 0,
      },
    };
  },
  methods: {
    formatter(row) {
      return row.comment_status ? "正常" : "关闭";
    },
    async openOrClose(row){
      const mess = row.comment_status ? "关闭" : "打开";
      await this.$confirm(`是否要${mess}评论`, "提示");
      await openOrClose_Comment({ article_id: row.id },{ allow_comment: !row.comment_status,})
      this.getComments()
    },
    // openOrClose(row) {
    //   const mess = row.comment_status ? "关闭" : "打开";
    //   this.$confirm(`是否要${mess}评论`, "提示").then(() => {
    //     this.$http({
    //       method: "put",
    //       url: "/comments/status",
    //       params: { article_id: row.id },
    //       data: {
    //         allow_comment: !row.comment_status,
    //       },
    //     }).then((result) => {
    //       console.log(result);
    //       this.getComments();
    //     });
    //   });
    //   //改变状态
    //   // 重新渲染列表
    // },
    changePage(newPage) {
      // 分页功能
      this.page.page = newPage;
      this.getComments();
    },
    getComments() {
      this.loading = true;
      this.$http({
        url: "/comments",
        params: {
          response_type: "comment",
          page: this.page.page,
          per_page: this.page.pageSize,
        },
      }).then((result) => {
        this.loading = false;
        // console.log(result);
        this.list = result.data.results;
        this.page.total = result.data.total_count;
      });
    },
  },
  created() {
    this.getComments();
  },
};
</script>

<style>
</style>