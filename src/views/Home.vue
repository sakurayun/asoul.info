<script setup lang="ts">
import { onBeforeMount } from "vue";
import parse from "rss-to-json";
import { useStore, members } from "../utils/stores";

const store = useStore();

let member: keyof members;

onBeforeMount(async () => {
  // 获取官号文章
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
  // 获取官号微博
  try {
    store.updateSchedule(
      (await parse("https://rss.asoul.info/weibo/official", {})).items
    );
  } catch (error) {
    console.log(error);
  }
  store.loading.schedules = false;
  // 获取粉丝数
  for (member in store.fans) {
    try {
      store.updateFan(
        member,
        (await parse("https://rss.asoul.info/fans/" + member, {})).items
      );
    } catch (error) {
      console.log(error);
    }
  }
  store.loading.fans = false;
});
</script>

<template>
  <el-row>
    <el-col :span="24">
      <el-carousel trigger="click" v-loading="store.loading.articles">
        <el-carousel-item v-for="item in store.getArticles">
          <a target="_blank" :href="item.link">
            <img :src="item.image" referrerpolicy="no-referrer"
          /></a>
        </el-carousel-item>
      </el-carousel>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="10">
      <el-skeleton :loading="store.loading.fans" animated>
        <template #template>
          <el-skeleton-item variant="image" />
        </template>
        <template #default>
          <el-table :data="store.getFans">
            <el-table-column label="member">
              <template #default="scope">
                <el-avatar :src="scope.row.avatar"></el-avatar>
              </template>
            </el-table-column>
            <el-table-column prop="count" label="count" />
            <el-table-column prop="followers" label="new followers" />
          </el-table>
        </template>
      </el-skeleton>
    </el-col>
    <el-col :span="14">
      <el-skeleton :loading="store.loading.schedules" animated>
        <template #template>
          <el-skeleton-item variant="image" />
        </template>
        <template #default>
          <el-image
            :src="store.getSchedules?.image"
            referrerpolicy="no-referrer"
            fit="scale-down"
          ></el-image>
        </template>
      </el-skeleton>
    </el-col>
  </el-row>
</template>

<style scoped></style>
