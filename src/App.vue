<script setup lang="ts">
import ReloadPrompt from "./components/ReloadPrompt.vue";
import Header from "./components/Header.vue";
import Banner from "./components/Banner.vue";
import "./styles/dark.scss";
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

body {
  margin: 0;
  background-color: #f4f4f4;
}

.main-container {
  width: 100%;
  max-width: 1080px;
  margin: auto;
}
</style>
