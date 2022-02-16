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
    loading: { articles: true, dynamics: true, fans: true, schedules: true },
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
      official: <rssparsed["items"]>[],
      ava: <rssparsed["items"]>[],
      bella: <rssparsed["items"]>[],
      carol: <rssparsed["items"]>[],
      diana: <rssparsed["items"]>[],
      eileen: <rssparsed["items"]>[],
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
    updateFan(member: keyof members, fan: any[]) {
      this.fans[member] = fan;
    },
  },
  getters: {
    getArticles(state) {
      let pics = [
        {
          link: "https://space.bilibili.com/703007996/article",
          image:
            "https://i0.hdslb.com/bfs/article/80d3563014013b213b1623f61d24af5fa0ef32d5.png@700w_200h_progressive.webp",
        },
      ];
      for (let index in state.articles) {
        pics.push({
          link: state.articles[index].link,
          image:
            state.articles[index].description.match(/<img.*?src="(.*?)"/)[1] +
            "@700w_200h_progressive.webp",
        });
        if (pics.length == 5) break;
      }
      return pics;
    },
    getDynamics(state) {
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
    getFans(state) {
      const avatars = <members>{
        official:
          "https://i2.hdslb.com/bfs/face/43b21998da8e7e210340333f46d4e2ae7ec046eb.jpg",
        ava: "https://i0.hdslb.com/bfs/face/566078c52b408571d8ae5e3bcdf57b2283024c27.jpg",
        bella:
          "https://i2.hdslb.com/bfs/face/668af440f8a8065743d3fa79cfa8f017905d0065.jpg",
        carol:
          "https://i1.hdslb.com/bfs/face/a7fea00016a8d3ffb015b6ed8647cc3ed89cbc63.jpg",
        diana:
          "https://i2.hdslb.com/bfs/face/d399d6f5cf7943a996ae96999ba3e6ae2a2988de.jpg",
        eileen:
          "https://i1.hdslb.com/bfs/face/8895c87082beba1355ea4bc7f91f2786ef49e354.jpg",
      };
      let member: keyof members;
      let fans: { avatar: string; count: number; followers: string[] }[] = [];
      for (member in state.fans) {
        let m: string[] = [];
        let n = state.fans[member][0].description.match(/<br>总计(.*)/)[1];
        for (let index in state.fans[member]) {
          m.push(state.fans[member][index].title.match(/新粉丝 (.*)/)[1]);
          if (m.length == 3) break;
        }
        fans.push({
          avatar: avatars[member] + "@240w_240h_1c_1s.webp",
          count: n,
          followers: m,
        });
      }
      return fans;
    },
    getSchedules(state) {
      for (let index in state.articles) {
        if (
          state.dynamics.weibo.official[index].description.match(/日程表/)[0]
        ) {
          return {
            link: state.dynamics.weibo.official[index].link,
            image:
              state.dynamics.weibo.official[index].description.match(
                /<img.*?src="(.*?)"/
              )[1],
          };
        }
      }
      return { link: "a", image: "a" };
    },
  },
});
