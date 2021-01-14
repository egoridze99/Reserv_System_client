import Vue from "vue";
import Vuex from "vuex";
import { LOGOUT } from "./consts";
import { urlPrefix } from "../settings";

import * as axios from "axios";

Vue.use(Vuex);

import home from "./modules/home";
import { SUCCESS_AUTH } from "./consts";

export default new Vuex.Store({
  state: {
    token: localStorage.getItem("token")
  },
  mutations: {
    SUCCESS_AUTH(state, token) {
      state.token = token;
    },
    LOGOUT(state) {
      state.token = "";
    }
  },
  actions: {
    // eslint-disable-next-line no-unused-vars
    LOGIN: async function({ commit }, data) {
      try {
        const response = await axios.post(`${urlPrefix}admin_api/login`, data);

        const token = response.data.token;
        const role = response.data.role;
        const name = response.data.name;

        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        localStorage.setItem("name", name);
        axios.defaults.headers.common["Authorization"] = token;

        commit(SUCCESS_AUTH, token);
        return Promise.resolve(token);
      } catch (err) {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("name");
        return Promise.reject(err.response.data.msg);
      }
    },
    LOGOUT: function({ commit }) {
      commit(LOGOUT);

      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("name");
      delete axios.defaults.headers.common["Authorization"];
    }
  },
  getters: {
    isLoggedIn(state) {
      return !!state.token;
    }
  },
  modules: {
    home
  }
});
