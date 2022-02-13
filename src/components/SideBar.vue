<script setup lang="ts">
import { useStore, planforms, members } from "../utils/stores";

const store = useStore();

let planform: keyof planforms;
let member: keyof members;

// 创建表单
const options: {
  label: keyof planforms;
  children: { label: keyof members; disabled: boolean }[];
}[] = [];

for (planform in store.dynamics) {
  const children = [];
  for (member in store.dynamics[planform]) {
    children.push({
      label: member,
      disabled: false,
    });
  }
  options.push({ label: planform, children: children });
}
</script>

<template>
  <div>引流地址</div>
  <el-tabs type="border-card">
    <el-tab-pane v-for="p in options" :label="p.label"
      ><el-checkbox v-for="m in p.children" :label="m.label" />
    </el-tab-pane>
  </el-tabs>
</template>

<style scoped></style>
