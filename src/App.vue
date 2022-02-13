<script setup lang="ts">
import Header from "./components/Header.vue";
import SideBar from "./components/SideBar.vue";
</script>

<template>
  <el-container>
    <el-container>
      <el-header><Header /></el-header>
      <el-main> <router-view /></el-main>
    </el-container>
    <el-aside width="250px">
      <SideBar />
    </el-aside>
  </el-container>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
