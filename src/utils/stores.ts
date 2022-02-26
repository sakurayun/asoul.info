import { defineStore } from "pinia";

export const useStore = defineStore("main", {
  state: () => ({
    darkMode: false,

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
            "@900w.webp",
        });
        if (pics.length == 5) break;
      }
      return pics;
    },

    getSchedules(state) {
      for (let index in state.schedules) {
        if (state.schedules[index].description.match(/日程表/) != null) {
          return {
            link: state.schedules[index].link,
            image: state.schedules[index].description
              .match(/<img style="" src="(.*?)"/)[1]
              .replace("large", "middle"),
          };
        }
      }
    },

    getFans(state) {
      let member: keyof members;
      let fans: { avatar: string; count: number; followers: string[] }[] = [];
      for (member in state.fans) {
        let n: number = 0;
        let m: string[] = [];
        if (state.fans[member].length > 0) {
          n = state.fans[member][0].description.match(/<br>总计(.*)/)[1];
          for (let index in state.fans[member]) {
            m.push(state.fans[member][index].title.match(/新粉丝 (.*)/)[1]);
            if (m.length == 3) break;
          }
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

// RSSHub服务器链接
const baseUrl = "https://rss.asoul.info";

// RSS链接
export const RSSUrl = {
  article: baseUrl + "/bilibili/user/article/",
  fans: baseUrl + "/bilibili/user/followers/",
  live: baseUrl + "/bilibili/live/room/",
  video: baseUrl + "/bilibili/user/video/",
  super: baseUrl + "/weibo/super_index/",

  bilibili: baseUrl + "/bilibili/user/dynamic/",
  weibo: baseUrl + "/weibo/user/",
  douyin: baseUrl + "/newrank/douyin/",
};

// B站直播房间号
export const roomID = <members>{
  official: "22632157",
  ava: "22625025",
  bella: "22632424",
  carol: "22634198",
  diana: "22637261",
  eileen: "22625027",
};

// uid
export const uid = <planforms>{
  // B站uid
  bilibili: <members>{
    official: "703007996",
    ava: "672346917",
    bella: "672353429",
    carol: "351609538",
    diana: "672328094",
    eileen: "672342685",
  },
  // 微博uid
  weibo: <members>{
    official: "7519401668",
    ava: "7595051004",
    bella: "7594710405",
    carol: "7594393391",
    diana: "7595006312",
    eileen: "7524943648",
  },
  // 抖音uid
  douyin: <members>{
    official:
      "ED0541CCB662F271BABBB151ECCA782E8A7AEDA3BB5159EA34A703EB0C64083A",
    ava: "8EC8326C4F6EC2AC2D967718EEFD19778A7AEDA3BB5159EA34A703EB0C64083A",
    bella: "A6C99AE8C9D2196AE2A1AA4AB581869B8A7AEDA3BB5159EA34A703EB0C64083A",
    carol: "1F940D9DA29B758F41F7B2FF20256D2D8A7AEDA3BB5159EA34A703EB0C64083A",
    diana: "25BE77A3B0ECC9CC56EC1DD226D4EB9A",
    eileen: "C749B0655717A39DE61AD13A7E13BFF88A7AEDA3BB5159EA34A703EB0C64083A",
  },
};
