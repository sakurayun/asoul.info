<script setup lang="ts">
import { ref, computed } from "vue";
import { useStore, planforms, members } from "../utils/stores";

const store = useStore();

let planform: keyof planforms;
let member: keyof members;

const rssurl = computed(
  () => "https://rss.asoul.info/" + selected.value[0] + "/" + selected.value[1]
);

// 创建表单
const selected = ref(["bilibili", "official"]);

const options: {
  value: keyof planforms;
  label: keyof planforms;
  children: { value: keyof members; label: keyof members }[];
}[] = [];

for (planform in store.dynamics) {
  const children = [];
  for (member in store.dynamics[planform]) {
    children.push({
      value: member,
      label: member,
    });
  }
  options.push({ value: planform, label: planform, children: children });
}
</script>

<template>
  <div>RSS订阅地址</div>
  <el-cascader v-model="selected" :options="options" />
  {{ rssurl }}
</template>

<style scoped></style>
