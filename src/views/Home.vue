<script setup lang="ts">
import { onBeforeMount } from "vue";
import parse from "rss-to-json";
import { useStore } from "../utils/stores";

const store = useStore();

onBeforeMount(
  // 获取官号文章
  async () => {
    try {
      store.updateArticle(
        (
          await parse(
            "https://rss.asoul.info/bilibili/user/article/703007996",
            {}
          )
        ).items
      );
    } catch (error) {
      console.log(error);
    }
    store.loading.articles = false;
  }
);
</script>

<template>
  <div class="block">
    <el-carousel trigger="click" v-loading="store.loading.articles">
      <el-carousel-item v-for="item in store.getArticle">
        <a target="_blank" :href="item.link"> <img :src="item.image" /></a>
      </el-carousel-item>
    </el-carousel>
  </div>
  <div>日程表</div>
  <div>粉丝数</div>
</template>

<style scoped>
</style>
