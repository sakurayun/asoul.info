<script setup lang="ts">
import { ref, onBeforeMount } from "vue";
import parse from "rss-to-json";
import { View } from "@element-plus/icons-vue";
import { useStore, planforms, members } from "../utils/stores";

const store = useStore();

let planform: keyof planforms;
let member: keyof members;

const dynamics = ref(<any[]>[]);

const load = () => {
  dynamics.value = store.getDynamics.slice(0, dynamics.value.length + 5);
};

const reload = () => {
  dynamics.value = store.getDynamics.slice(
    0,
    Math.max(dynamics.value.length, 5)
  );
};

onBeforeMount(
  // 获取动态
  () => {
    Promise.all(
      store.selected.map(([planform, member]) => {
        return new Promise<void>(async (resolve) => {
          try {
            store.updateDynamic(
              planform,
              member,
              (
                await parse(
                  "https://rss.asoul.info/" + planform + "/" + member,
                  {}
                )
              ).items
            );
            options.forEach((option) => {
              if (option.value === planform) {
                option.children.forEach((child) => {
                  if (child.value === member) {
                    child.disabled = false;
                  }
                });
              }
            });
            resolve();
          } catch (error) {
            console.log(error);
            resolve();
          }
        });
      })
    ).then(() => {
      store.loading.dynamics = false;
    });
  }
);

// 创建选项卡
const dialogVisible = ref(false);

const props = { multiple: true };

const options: {
  value: keyof planforms;
  label: keyof planforms;
  children: { value: keyof members; label: keyof members; disabled: boolean }[];
}[] = [];

for (planform in store.dynamics) {
  const children = [];
  for (member in store.dynamics[planform]) {
    children.push({
      value: member,
      label: member,
      disabled: true,
    });
  }
  options.push({ value: planform, label: planform, children: children });
}
</script>

<template>
  <el-dialog
    width="280px"
    title="动态筛选"
    v-model="dialogVisible"
    v-on:close="reload"
  >
    <el-cascader-panel
      v-model="store.selected"
      :options="options"
      :props="props"
    />
  </el-dialog>

  <el-row justify="center">
    <el-col class="title" :md="17" :sm="19" :xs="24">
      <div>最近动态</div>
      <el-button
        type="text"
        :loading="store.loading.dynamics"
        @click="dialogVisible = true"
      >
        选择
      </el-button>
    </el-col>
  </el-row>

  <el-row justify="center">
    <el-col :md="17" :sm="19" :xs="24">
      <el-card
        class="infinite-list"
        v-infinite-scroll="load"
        infinite-scroll-distance="100"
        v-loading="store.loading.dynamics"
        shadow="never"
      >
        <el-timeline>
          <el-timeline-item
            v-for="dynamic in dynamics"
            :timestamp="new Date(dynamic.created).toLocaleString()"
            placement="top"
          >
            <el-card shadow="hover">
              <template #header>
                <div class="card-header">
                  <el-space wrap>
                    <el-avatar size="small" :src="dynamic.member"></el-avatar>
                    <el-avatar size="small" :src="dynamic.planform"></el-avatar>
                  </el-space>
                  <el-link type="info" target="_blank" :href="dynamic.link">
                    原动态
                  </el-link>
                </div>
              </template>
              <div>{{ dynamic.title }}</div>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </el-card>
    </el-col>
  </el-row>
</template>

<style scoped>
.title {
  font-size: 1.5em;
  font-weight: bold;
  margin-bottom: 0.5em;
  display: inline-flex;
  justify-content: space-between;
}
.infinite-list {
  height: calc(100vh - 150px);
  overflow: auto;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
