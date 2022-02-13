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
    loading: { dynamics: true, fans: true },
    select: true,
    dynamics: <planforms>{
      bilibili: <members>{
        official: [],
        ava: [],
        bella: [],
        carol: [],
        diana: [],
        eileen: [],
      },
      weibo: <members>{
        official: [],
        ava: [],
        bella: [],
        carol: [],
        diana: [],
        eileen: [],
      },
      douyin: <members>{
        official: [],
        // ava: [],
        // bella: [],
        // carol: [],
        // diana: [],
        // eileen: [],
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
    updateDynamic(
      planform: keyof planforms,
      member: keyof members,
      dynamic: any[]
    ) {
      this.dynamics[planform][member] = dynamic;
    },
  },
  getters: {
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
