<template>
<el-container>
<!-- 侧边栏 -->
  <el-aside style="width:150px;background-color:#323745">
      <layout-aside></layout-aside>
  </el-aside>
<!-- 右侧 -->
  <el-container>
    <!-- 头部组件 -->
    <el-header>
        <layout-header></layout-header>
    </el-header>
    <!-- 内容区域 -->
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
export default {
    
}
</script>

<style>

</style>