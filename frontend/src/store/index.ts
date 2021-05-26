import { createStore } from "vuex";
import axios from "axios";

export interface State {
  articles: Array<Object>;
}

export default createStore<State>({
  state() {
    return {
      articles: [],
    };
  },
  mutations: {
    async getAllArticles(state) {
      const res = await axios.get("/api/articles");
      const data = res.data.articles;
      state.articles = data;
    },
  },
});
