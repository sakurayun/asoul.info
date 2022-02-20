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

export const useStore = defineStore("main", {
  state: () => ({
    loading: { articles: true, dynamics: true, fans: true, schedules: true },

    live: <any[]>[],

    articles: <any[]>[],

    schedules: <any[]>[],

    fans: <members>{
      official: <any[]>[],
      ava: <any[]>[],
      bella: <any[]>[],
      carol: <any[]>[],
      diana: <any[]>[],
      eileen: <any[]>[],
    },

    dynamics: <planforms>{
      bilibili: <members>{
        official: <any[]>[],
        ava: <any[]>[],
        bella: <any[]>[],
        carol: <any[]>[],
        diana: <any[]>[],
        eileen: <any[]>[],
      },
      weibo: <members>{
        official: <any[]>[],
        ava: <any[]>[],
        bella: <any[]>[],
        carol: <any[]>[],
        diana: <any[]>[],
        eileen: <any[]>[],
      },
      douyin: <members>{
        official: <any[]>[],
        ava: <any[]>[],
        bella: <any[]>[],
        carol: <any[]>[],
        diana: <any[]>[],
        eileen: <any[]>[],
      },
    },

    selected: <[keyof planforms, keyof members][]>[
      ["bilibili", "official"],
      ["bilibili", "ava"],
      ["bilibili", "bella"],
      ["bilibili", "carol"],
      ["bilibili", "diana"],
      ["bilibili", "eileen"],
      ["weibo", "official"],
      ["weibo", "ava"],
      ["weibo", "bella"],
      ["weibo", "carol"],
      ["weibo", "diana"],
      ["weibo", "eileen"],
      ["douyin", "official"],
    ],
  }),

  actions: {
    updateLive(live: {}) {
      this.live.push(live);
    },

    updateArticle(article: any[]) {
      this.articles = article;
    },

    updateSchedule(schedule: any[]) {
      this.schedules = schedule;
    },

    updateFan(member: keyof members, fan: any[]) {
      this.fans[member] = fan;
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
    getLive(state) {
      if (state.live) {
        return state.live.map((item) => {
          return {
            member: item.member.charAt(0).toUpperCase() + item.member.slice(1),
            avatar: new URL(
              `../assets/avatars/${item.member}.webp`,
              import.meta.url
            ).href,
            description: item.live.description,
            link: item.live.link,
            created: item.live.created,
          };
        });
      } else {
        return [];
      }
    },

    getArticles(state) {
      let pics = [];
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

    getSchedules(state) {
      for (let index in state.schedules) {
        if (state.schedules[index].description.match(/日程表/)[0]) {
          return {
            link: state.schedules[index].link,
            image: state.schedules[index].description
              .match(/<img.*?src="(.*?)"/)[1]
              .replace("large", "middle"),
          };
        }
      }
    },

    getFans(state) {
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
          avatar: new URL(`../assets/avatars/${member}.webp`, import.meta.url)
            .href,
          count: n,
          followers: m,
        });
      }
      return fans;
    },

    getDynamics(state) {
      let dynamics: any[] = [];
      state.selected.forEach(([planform, member]) => {
        state.dynamics[planform][member].forEach((dynamic: any) => {
          dynamic.planform = new URL(
            `../assets/planform/${planform}.webp`,
            import.meta.url
          ).href;
          dynamic.member = new URL(
            `../assets/avatars/${member}.webp`,
            import.meta.url
          ).href;
          dynamics.push(dynamic);
        });
      });
      dynamics.sort((a, b) => {
        return b.created - a.created;
      });
      return dynamics;
    },
  },
});
