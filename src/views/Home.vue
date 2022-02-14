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
        <a target="_blank" :href="item.link">
          <el-image :src="item.image" fit="scale-down"></el-image
        ></a>
      </el-carousel-item>
    </el-carousel>
  </div>
  <div>日程表</div>
  <div>粉丝数</div>
</template>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
