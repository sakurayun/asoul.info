<script setup lang="ts">
import { ref, onBeforeMount } from "vue";
import parse from "rss-to-json";
import { useStore, members, RSSUrl, roomID } from "../utils/stores";

import "element-plus/es/components/notification/style/css";
import { ElNotification } from "element-plus";
import { Sunny, Moon } from "@element-plus/icons-vue";

const store = useStore();

const pathname = ref("");

// 夜间模式
function changemode() {
  store.darkMode = !store.darkMode;
  document.body.classList.toggle("dark");
}

onBeforeMount(() => {
  // 获取当前路径
  pathname.value = window.location.pathname;
  // 获取直播状态
  store.live = [];
  Promise.all(
    Reflect.ownKeys(store.fans).map((member) => {
      return new Promise<void>(async (resolve) => {
        try {
          store.updateLive({
            member: member,
            live: (
              await parse(RSSUrl["live"] + roomID[member as keyof members], {})
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
  <div class="toolbar">
    <el-menu
      class="toolbar-nav"
      mode="horizontal"
      :default-active="pathname"
      router
    >
      <el-menu-item index="/">首页</el-menu-item>
      <el-menu-item index="/dynamic">动态</el-menu-item>
      <el-menu-item index="/rss">RSS订阅</el-menu-item>
      <div class="toolbar-action toolbar-side">
        <el-space class="sub-action" size="large" wrap>
          <a v-for="live in store.getLive" target="_blank" :href="live.link">
            <el-avatar :src="live.avatar"></el-avatar>
          </a>
          <el-button
            @click="changemode"
            :icon="store.darkMode ? Sunny : Moon"
            size="large"
            circle
          ></el-button>
        </el-space>
      </div>
    </el-menu>
    <div class="toolbar-title toolbar-side">
      <el-link class="site-title" :underline="false" href="/"
        >A-Soul Info</el-link
      >
    </div>
  </div>
</template>

<style scoped>
.toolbar {
  top: 0;
  left: 0;
  width: 100%;
  position: fixed;
  z-index: 723;
}
.toolbar-nav {
  justify-content: center;
}
.toolbar-side {
  position: absolute;
  display: inline-flex;
  align-items: center;
  height: 100%;
  top: 0;
}
.toolbar-title {
  left: 0;
  padding-left: 80px;
}
.toolbar-action {
  right: 0;
  padding-right: 80px;
}
.site-title {
  font-size: 1.3em;
  font-weight: bold;
}

@media (max-width: 768px) {
  .toolbar-action {
    display: none !important;
  }
  .toolbar-nav {
    height: 59px;
    padding-left: 100%;
    justify-content: flex-end !important;
  }
  .toolbar-title {
    transform: translate(-3.5em);
    padding-left: 50% !important;
  }
  .sub-action {
    margin-left: 8px;
  }
}
</style>
