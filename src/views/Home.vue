<script setup lang="ts">
import { onBeforeMount } from "vue";
import parse from "rss-to-json";
import { useStore, members } from "../utils/stores";

const store = useStore();

onBeforeMount(() => {
  // 获取官号文章
  (async () => {
    try {
      store.updateArticle(
        (
          await parse(
            "https://rss.asoul.info/bilibili/user/article/703007996",
            {}
          )
        ).items
      );
      store.loading.articles = false;
    } catch (error) {
      console.log(error);
    }
  })();

  // 获取官号微博
  (async () => {
    try {
      store.updateSchedule(
        (await parse("https://rss.asoul.info/weibo/official", {})).items
      );
      store.loading.schedules = false;
    } catch (error) {
      console.log(error);
    }
  })();

  // 获取粉丝数
  Promise.all(
    Reflect.ownKeys(store.fans).map((member) => {
      return new Promise<void>(async (resolve, reject) => {
        try {
          store.updateFan(
            member as keyof members,
            (
              await parse(
                "https://rss.asoul.info/fans/" + (member as string),
                {}
              )
            ).items
          );
          resolve();
        } catch (error) {
          reject(error);
        }
      });
    })
  )
    .then(() => {
      store.loading.fans = false;
    })
    .catch((error) => {
      console.log(error);
    });
});
</script>

<template>
  <el-row justify="center">
    <el-col :span="22">
      <el-card>
        <el-skeleton :loading="store.loading.articles" animated>
          <template #template>
            <el-skeleton-item variant="image" />
          </template>
          <template #default>
            <el-carousel trigger="click" arrow="never">
              <el-carousel-item v-for="item in store.getArticles">
                <a target="_blank" :href="item.link">
                  <img :src="item.image" referrerpolicy="no-referrer" />
                </a>
              </el-carousel-item>
            </el-carousel>
          </template>
        </el-skeleton>
      </el-card>
    </el-col>
  </el-row>

  <el-row :gutter="20">
    <el-col :span="18">
      <el-card>
        <el-skeleton :loading="store.loading.schedules" animated>
          <template #template>
            <el-skeleton-item variant="image" />
          </template>
          <template #default>
            <img
              :src="store.getSchedules?.image"
              referrerpolicy="no-referrer"
            />
          </template>
        </el-skeleton>
      </el-card>
    </el-col>

    <el-col :span="6">
      <el-card>
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
              <el-table-column label="count">
                <template #default="scope">
                  <el-popover
                    placement="top-start"
                    title="new followers"
                    :width="200"
                    trigger="hover"
                    :content="scope.row.followers.toLocaleString()"
                  >
                    <template #reference>
                      {{ scope.row.count }}
                    </template>
                  </el-popover>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-skeleton>
      </el-card>
    </el-col>
  </el-row>
</template>

<style scoped></style>
