<script setup lang="ts">
import { ref, computed } from "vue";
import { useStore, planforms, members } from "../utils/stores";

import "element-plus/es/components/message/style/css";
import { ElMessage } from "element-plus";

const store = useStore();

let planform: keyof planforms;
let member: keyof members;

// 复制内容
function copy(data: string) {
  navigator.clipboard.writeText(data).then(
    () => {
      ElMessage.success("复制成功");
    },
    () => {
      ElMessage.error("复制失败");
    }
  );
}

// 创建自定订阅地址
const custom_selected = ref("/bilibili/user/video/393396916");

const custom_url = computed(
  () => "https://rss.asoul.info" + custom_selected.value
);

const custom_options = [
  { description: "贾布加布的投稿", url: "/bilibili/user/video/393396916" },
  { description: "魂报的专栏", url: "/bilibili/user/article/619440171" },
  { description: "ASOUL周报的动态", url: "/bilibili/user/dynamic/1185499676" },
  {
    description: "ASOUL微博超话",
    url: "/weibo/super_index/10080861838dd4bdf01b1414e70089ca10d776",
  },
];

// 创建成员动态选项卡
const dynamic_selected = ref(["bilibili", "official"]);

const dynamic_url = computed(
  () =>
    "https://rss.asoul.info/" +
    dynamic_selected.value[0] +
    "/" +
    dynamic_selected.value[1]
);

const dynamic_options: {
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
  dynamic_options.push({
    value: planform,
    label: planform,
    children: children,
  });
}
</script>

<template>
  <el-row justify="center">
    <el-col :md="17" :sm="19" :xs="24">
      <div class="title">
        <span>RSS订阅</span>
      </div>

      <el-card class="info-box" shadow="hover">
        <template #header>
          <div class="card-header">
            <span>各成员动态</span>
            <el-button @click="copy(dynamic_url)" type="text">复制</el-button>
          </div>
        </template>
        <div class="rss-box">
          <el-cascader v-model="dynamic_selected" :options="dynamic_options" />
          <div class="rss-link">
            <el-tooltip :content="dynamic_url" placement="top">
              <el-link
                :underline="false"
                :href="dynamic_url"
                target="_blank"
                type="primary"
                >订阅链接</el-link
              >
            </el-tooltip>
          </div>
        </div>
      </el-card>

      <el-card class="info-box" shadow="hover">
        <template #header>
          <div class="card-header">
            <span>自定订阅地址</span>
            <el-button @click="copy(custom_url)" type="text">复制</el-button>
          </div>
        </template>
        <div class="rss-box">
          <el-radio-group class="radio-box" v-model="custom_selected">
            <el-radio v-for="item in custom_options" :label="item.url">{{
              item.description
            }}</el-radio>
          </el-radio-group>
          <div class="rss-link">
            <el-tooltip :content="custom_url" placement="top">
              <el-link
                :underline="false"
                :href="custom_url"
                target="_blank"
                type="primary"
                >订阅链接</el-link
              >
            </el-tooltip>
          </div>
        </div>
        <el-divider></el-divider>
        <div class="card-header">
          <div>
            <span>更多规则请查看</span>
            <el-link
              :underline="false"
              href="https://docs.rsshub.app"
              target="_blank"
              type="primary"
              >docs.rsshub.app</el-link
            >
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<style scoped>
.rss-box {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
}
.rss-link {
  margin: 8px;
}
.radio-box {
  flex-direction: column;
  align-items: flex-start;
}
</style>
