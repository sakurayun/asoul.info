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
    v-model="dialogVisible"
    title="动态选择"
    width="360px"
    :close="reload"
  >
    <el-cascader-panel
      v-model="store.selected"
      :options="options"
      :props="props"
    />
  </el-dialog>

  <el-row justify="space-between">
    <div class="title">最近动态</div>
    <el-button
      type="text"
      :loading="store.loading.dynamics"
      @click="dialogVisible = true"
    >
      选择
    </el-button>
  </el-row>

  <el-row>
    <el-col :span="24">
      <el-card>
        <ul
          v-infinite-scroll="load"
          infinite-scroll-distance="100"
          class="infinite-list"
          style="overflow: auto"
          v-loading="store.loading.dynamics"
        >
          <el-timeline>
            <el-timeline-item
              v-for="dynamic in dynamics"
              :timestamp="new Date(dynamic.created).toLocaleString()"
              placement="top"
            >
              <el-card>
                <div>
                  <el-avatar size="small" :src="dynamic.planform"></el-avatar>
                  <el-avatar size="small" :src="dynamic.member"></el-avatar>
                </div>
                <div>{{ dynamic.title }}</div>
                <div>
                  <el-tag
                    ><el-link :icon="View" target="_blank" :href="dynamic.link"
                      >原动态</el-link
                    >
                  </el-tag>
                </div>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </ul>
      </el-card>
    </el-col>
  </el-row>
</template>

<style scoped>
.title {
  font-size: 1.5em;
  font-weight: bold;
  margin-bottom: 1em;
}
.infinite-list {
  height: calc(100vh - 300px);
}
</style>