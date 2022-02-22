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
    <el-col :md="20" :sm="21">
      <el-card :body-style="{ padding: '0px' }" shadow="hover">
        <el-skeleton :loading="store.loading.articles" animated>
          <template #template>
            <el-skeleton-item variant="image" />
          </template>
          <template #default>
            <el-carousel
              height="auto"
              trigger="click"
              indicator-position="outside"
            >
              <img :src="store.getArticles[0].image" alt="" class="toolImg" />
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
    <el-col :md="18" :sm="17">
      <el-card :body-style="{ padding: '5px' }" shadow="hover">
        <template #header>
          <div class="card-header">
            <span>日程表</span>
            <el-link
              type="info"
              target="_blank"
              :href="store.getSchedules?.link"
              >原动态</el-link
            >
          </div>
        </template>
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

    <el-col :md="6" :sm="7">
      <el-card shadow="hover">
        <el-skeleton :loading="store.loading.fans" animated>
          <template #template>
            <el-skeleton-item variant="image" />
          </template>
          <template #default>
            <el-table :data="store.getFans">
              <el-table-column label="成员">
                <template #default="scope">
                  <el-avatar :src="scope.row.avatar"></el-avatar>
                </template>
              </el-table-column>
              <el-table-column label="粉丝数">
                <template #default="scope">
                  <el-popover
                    placement="top-start"
                    title="新粉丝"
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

<style scoped>
img {
  width: 100%;
}
.toolImg {
  opacity: 0;
  width: 100%;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
