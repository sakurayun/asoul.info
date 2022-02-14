<script setup lang="ts">
import { onBeforeMount } from "vue";
import parse from "rss-to-json";
import { useStore, planforms, members } from "../utils/stores";

const store = useStore();

let planform: keyof planforms;
let member: keyof members;

// onBeforeMount(
//   // 获取动态
//   async () => {
//     for (planform in store.dynamics) {
//       for (member in store.dynamics[planform]) {
//         try {
//           store.updateDynamic(
//             planform,
//             member,
//             (
//               await parse(
//                 "https://rss.asoul.info/" + planform + "/" + member,
//                 {}
//               )
//             ).items
//           );
//         } catch (error) {
//           console.log(error);
//         }
//       }
//     }
//     store.loading.dynamics = false;
//   }
// );
</script>

<template>
  <el-skeleton
    style="width: 240px"
    :loading="store.loading.dynamics"
    animated
    :throttle="500"
  >
    <template #template>
      <el-skeleton-item variant="image" style="width: 240px; height: 240px" />
      <div style="padding: 14px">
        <el-skeleton-item variant="h3" style="width: 50%" />
        <div
          style="
            display: flex;
            align-items: center;
            justify-items: space-between;
            margin-top: 16px;
            height: 16px;
          "
        >
          <el-skeleton-item variant="text" style="margin-right: 16px" />
          <el-skeleton-item variant="text" style="width: 30%" />
        </div>
      </div>
    </template>
    <template #default>
      <el-timeline>
        <el-timeline-item
          v-for="(activity, index) in store.getDynamic"
          :key="index"
          :timestamp="activity.pubDate"
        >
          {{ activity.title }}
          <el-card>
            <div v-html="activity.description"></div>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </template>
  </el-skeleton>
</template>

<style scoped></style>
