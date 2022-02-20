<script setup lang="ts">
import { onBeforeMount } from "vue";
import parse from "rss-to-json";
import { useStore } from "../utils/stores";

import "element-plus/es/components/notification/style/css";
import { ElNotification } from "element-plus";

const store = useStore();

onBeforeMount(() => {
  // 获取直播状态
  store.live = [];
  Promise.all(
    Reflect.ownKeys(store.fans).map((member) => {
      return new Promise<void>(async (resolve) => {
        try {
          store.updateLive({
            member: member,
            live: (
              await parse("https://rss.asoul.info/bilibili/live/room/3", {})
            ).items[0],
          });
          resolve();
        } catch (error) {
          resolve();
        }
      });
    })
  ).then(() => {
    store.getLive.forEach((live) => {
      setTimeout(() => {
        ElNotification({
          title: live.member + "正在直播",
          dangerouslyUseHTMLString: true,
          message: live.description,
          position: "bottom-right",
          onClick: () => {
            window.open(live.link);
          },
        });
      }, 1000);
    });
  });
});
</script>

<template>
  <el-menu class="el-menu-demo" mode="horizontal" router>
    <el-menu-item index="/">首页</el-menu-item>
    <el-menu-item index="/dynamic">动态</el-menu-item>
    <el-menu-item index="/rss">RSS订阅</el-menu-item>
    <el-sub-menu index="live" :disabled="store.getLive.length == 0">
      <template #title>正在直播</template>
      <a v-for="live in store.getLive" target="_blank" :href="live.link">
        <el-avatar :src="live.avatar"></el-avatar>
      </a>
    </el-sub-menu>
  </el-menu>
</template>

<style scoped></style>
