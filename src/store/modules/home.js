/* eslint-disable no-unused-vars */
import {
  SET_ROOMS,
  SET_SEANSES,
  SET_CURRENT_DATE,
  SET_CURRENT_ROOM,
  UPDATE_SEANS,
  FETCH_SEANSES,
  FETCH_MONEY,
  SET_MONEY
} from "../consts";
import * as axios from "axios";
import format from "date-fns/format";

import { urlPrefix } from "../../settings";

const seanses_url = `${urlPrefix}api/seans`;

export default {
  state: {
    currentDate: format(new Date(), "yyyy-MM-dd"),
    currentRoom: "Абстракция",
    rooms: [],
    seanses: [],
    money: {}
  },
  mutations: {
    SET_ROOMS(state, rooms) {
      state.rooms = rooms;
    },
    SET_SEANSES(state, seanses) {
      state.seanses = [...seanses];
    },
    SET_CURRENT_DATE(state, date) {
      state.currentDate = date;
    },
    SET_CURRENT_ROOM(state, room) {
      state.currentRoom = room;
    },
    SET_MONEY(state, data) {
      state.money = { ...data };
    },
    UPDATE_SEANS(state, data) {
      const { id } = data;

      let item = null;
      for (item of state.seanses) {
        if (item.id === id) break;
      }

      item.room = data.room;
      item.card = data.card;
      item.cash = data.cash;
      item.count = data.count;
      item.date = data.date;
      item.duration = data.duration;
      item.film = data.film;
      item.guest = data.guest;
      item.note = data.note;
      item.rent = data.rent;
      item.status = data.status;
      item.time = data.time;
      item.checkout = [...data.checkouts];
    }
  },
  actions: {
    async FETCH_ROOMS({ commit }) {
      const roomsResponse = await axios.get(`${urlPrefix}api/rooms`);
      const rooms = roomsResponse.data;

      commit(SET_ROOMS, rooms);
    },
    async FETCH_SEANSES({ commit, state, dispatch }) {
      const seansesResponse = await axios.get(seanses_url, {
        params: {
          room: state.currentRoom,
          date: state.currentDate
        }
      });

      const seanses = seansesResponse.data;
      dispatch(FETCH_MONEY, state.currentDate);

      commit(SET_SEANSES, seanses);
    },
    async UPDATE_BY_DATE({ commit, state, dispatch }, date) {
      if (date == null) return;

      commit(SET_CURRENT_DATE, date);

      const response = await axios.get(seanses_url, {
        params: {
          room: state.currentRoom,
          date: state.currentDate
        }
      });
      dispatch(FETCH_MONEY, state.currentDate);
      commit(SET_SEANSES, response.data);
    },
    async UPDATE_BY_ROOM({ commit, state, dispatch }, room) {
      commit(SET_CURRENT_ROOM, room);
      const response = await axios.get(seanses_url, {
        params: {
          room: state.currentRoom,
          date: state.currentDate
        }
      });
      dispatch(FETCH_MONEY, state.currentDate);
      commit(SET_SEANSES, response.data);
    },
    async UPDATE_SEANS({ commit, state, dispatch }, newData) {
      try {
        const response = await axios.put(
          `${urlPrefix}api/seans/` + newData.id,
          newData
        );

        dispatch(FETCH_MONEY, state.currentDate);

        if (state.currentRoom !== newData.room) {
          dispatch(FETCH_SEANSES);
          Promise.resolve();
        } else {
          commit(UPDATE_SEANS, newData);
          Promise.resolve();
        }
      } catch (err) {
        alert(err.response.data.message);
      }
    },
    async CREATE_RESERV({ dispatch }, data) {
      try {
        if (data?.date === null) {
          alert("Дата не введена!");

          return;
        }
        const response = await axios.post(`${urlPrefix}api/seans`, data);

        dispatch(FETCH_SEANSES);
        alert("Запись добавлена!");
      } catch {
        alert("Произошла ошибка");
      }
    },
    async FETCH_MONEY({ commit }, date) {
      try {
        const response = await axios.get(`${urlPrefix}api/money`, {
          params: {
            date
          }
        });

        commit(SET_MONEY, response.data);
      } catch {
        commit(SET_MONEY, {});
      }
    }
  },
  getters: {
    getCurrentDate(state) {
      return state.currentDate;
    },
    getSeanses(state) {
      let seanses = state.seanses.filter(item => item.status !== "canceled");
      seanses = seanses.sort((a, b) => a.time.slice(0, 2) - b.time.slice(0, 2));
      return seanses;
    },
    getMoney(state) {
      return state.money;
    }
  }
};
