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

    articles: <rssparsed["items"]>[],

    schedules: <rssparsed["items"]>[],

    fans: <members>{
      official: <rssparsed["items"]>[],
      ava: <rssparsed["items"]>[],
      bella: <rssparsed["items"]>[],
      carol: <rssparsed["items"]>[],
      diana: <rssparsed["items"]>[],
      eileen: <rssparsed["items"]>[],
    },

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

    selected: <[keyof planforms, keyof members][]>[],
  }),

  actions: {
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
