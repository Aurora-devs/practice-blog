import { createStore } from "vuex";

export interface State {}

export default createStore<State>({
  state() {
    return {};
  },
  mutations: {},
});
