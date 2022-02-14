import { defineStore } from "pinia";

export interface planforms {
  bilibili: members;
  weibo: members;
  douyin: members;
}

export interface members {
  official: any;
  ava: any;
  bella: any;
  carol: any;
  diana: any;
  eileen: any;
}

interface rssparsed {
  title: any;
  description: any;
  link: any;
  image: any;
  category: any;
  items: any[];
}

export const useStore = defineStore("main", {
  state: () => ({
    loading: { articles: true, dynamics: true, fans: true },
    select: true,
    articles: <rssparsed["items"]>[],
    dynamics: <planforms>{
      bilibili: <members>{
        official: <rssparsed["items"]>[],
        ava: <rssparsed["items"]>[],
        bella: <rssparsed["items"]>[],
        carol: <rssparsed["items"]>[],
        diana: <rssparsed["items"]>[],
        eileen: <rssparsed["items"]>[],
      },
      weibo: <members>{
        official: <rssparsed["items"]>[],
        ava: <rssparsed["items"]>[],
        bella: <rssparsed["items"]>[],
        carol: <rssparsed["items"]>[],
        diana: <rssparsed["items"]>[],
        eileen: <rssparsed["items"]>[],
      },
      douyin: <members>{
        official: <rssparsed["items"]>[],
        // ava: <rssparsed["items"]>[],
        // bella: <rssparsed["items"]>[],
        // carol: <rssparsed["items"]>[],
        // diana: <rssparsed["items"]>[],
        // eileen: <rssparsed["items"]>[],
      },
    },
    fans: <members>{
      official: 0,
      ava: 0,
      bella: 0,
      carol: 0,
      diana: 0,
      eileen: 0,
    },
  }),
  actions: {
    updateArticle(article: any[]) {
      this.articles = article;
    },
    updateDynamic(
      planform: keyof planforms,
      member: keyof members,
      dynamic: any[]
    ) {
      this.dynamics[planform][member] = dynamic;
    },
  },
  getters: {
    getArticle(state) {
      let pics = [
        {
          link: "https://space.bilibili.com/703007996/article",
          image:
            "https://i0.hdslb.com/bfs/article/f1feb589c2c4c246e6a39fe9ce80da2a76c4bec1.jpg",
        },
      ];
      for (let index in state.articles) {
        pics.push({
          link: state.articles[index].link,
          image:
            state.articles[index].description.match(/<img.*?src="(.*?)"/)[1],
        });
        if (pics.length == 5) break;
      }
      return pics;
    },
    getDynamic(state) {
      let planform: keyof planforms;
      let member: keyof members;
      let dynamics: any[] = [];
      for (planform in state.dynamics) {
        for (member in state.dynamics[planform]) {
          dynamics = dynamics.concat(state.dynamics[planform][member]);
        }
      }
      return dynamics;
    },
  },
});
