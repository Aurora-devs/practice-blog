import { createStore } from "vuex";
import axios from "axios";

export interface State {
  articles: Array<Object>;
  token: string | null;
}

export default createStore<State>({
  state() {
    return {
      articles: [],
      token: localStorage.token || null,
    };
  },
  mutations: {
    async getAllArticles(state) {
      const res = await axios.get("/api/articles");
      const data = res.data.articles;
      state.articles = data;
    },
    setToken(state, token) {
      localStorage.setItem("token", token);
      state.token = token;
    },
    removeToken(state) {
      localStorage.removeItem("token");
      state.token = null;
    },
  },
});
