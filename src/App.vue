<script setup lang="ts">
import ReloadPrompt from "./components/ReloadPrompt.vue";
import Header from "./components/Header.vue";
import Banner from "./components/Banner.vue";
</script>

<template>
  <ReloadPrompt />
  <el-container>
    <el-header><Header /></el-header>
    <el-main class="main-container">
      <Banner />
      <router-view />
    </el-main>
  </el-container>
</template>

<style>
#app {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
html {
  background-color: #f4f4f4;
}
.el-card {
  --el-card-border-radius: 9px;
}
.el-dialog {
  --el-border-radius-small: 9px;
}

/* element样式修改 */
.el-cascader-menu {
  min-width: unset !important;
}
.el-message {
  --el-message-min-width: 270px !important;
}

/* 主页样式 */
.main-container {
  width: 100%;
  max-width: 1080px;
  margin: auto;
}

/* 全局通用样式 */
.title {
  font-size: 1.5em;
  font-weight: bold;
  margin-bottom: 0.5em;
  display: flex;
  justify-content: space-between;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.info-box {
  margin-bottom: 10px;
}
</style>
