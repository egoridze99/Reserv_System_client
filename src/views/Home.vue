<template>
  <div class="page-container">
    <md-app md-waterfall md-mode="fixed-last">
      <md-app-toolbar class="md-large md-dense md-primary">
        <div class="md-toolbar-row">
          <div class="md-toolbar-section-start">
            <md-button
              class="md-icon-button"
              @click="menuVisible = !menuVisible"
            >
              <md-icon>menu</md-icon>
            </md-button>

            <span class="md-title">Система бронирование Film is...</span>
          </div>
          <div class="md-toolbar-section-end">
            <router-link to="/admin" class="link" v-if="isAdmin"
              >Панель администратора</router-link
            >
            <router-link to="/logout" class="link">Выйти</router-link>
          </div>
        </div>
        <newReservWindow
          :active="showDialog"
          :toggleModal="toggleModal"
          :rooms="rooms"
        />
      </md-app-toolbar>

      <md-app-drawer :md-active.sync="menuVisible">
        <md-toolbar>Меню</md-toolbar>
        <div class="settings md-elevation-4">
          <md-field>
            <md-select
              name="room"
              id="room"
              placeholder="Выбор зала"
              v-model="currentRoom"
              @input="UPDATE_BY_ROOM"
            >
              <md-option value="all">Все комнаты</md-option>
              <md-option v-for="room in rooms" :key="room" :value="room">{{
                room
              }}</md-option>
            </md-select>
          </md-field>
          <md-field>
            <md-datepicker
              md-immediately
              @input="UPDATE_BY_DATE"
              :value="currentDate"
            >
              <label for>Выбор даты</label>
            </md-datepicker>
          </md-field>
        </div>
        <md-button class="md-primary" @click="toggleModal"
          >Добавить резерв</md-button
        >
      </md-app-drawer>
      <md-app-content>
        <h3 v-if="seanses.length === 0" class="content__title">
          Записей пока нет
        </h3>
        <seans-card-done
          v-else
          v-for="seans in seanses"
          :key="seans.id"
          :id="seans.id"
          :time="seans.time"
          :duration="seans.duration"
          :count="seans.count"
          :guest="seans.guest"
          :film="seans.film"
          :hookah="seans.hookah"
          :tea="seans.tea"
          :note="seans.note"
          :rent="seans.rent"
          :card="seans.card"
          :cash="seans.cash"
          :status="seans.status"
          :room="seans.room"
          :checkouts="seans.checkout"
          :name="seans.name"
        ></seans-card-done>
      </md-app-content>
    </md-app>
    <md-snackbar
      :md-position="'center'"
      :md-duration="Infinity"
      :md-active.sync="showSnackbar"
      md-persistent
    >
      <div class="md-layout">
        <div class="md-layout-item">Доход: {{ money.income }}₽.</div>
        <div class="md-layout-item">Затраты: {{ money.expense }}₽.</div>
        <div class="md-layout-item">Прибыль: {{ money.proceeds }}₽.</div>
        <div class="md-layout-item">По карте: {{ money.all_by_card }}₽.</div>
        <div class="md-layout-item">Наличными: {{ money.all_by_cash }}₽.</div>
        <div class="md-layout-item md-gutter">
          В кассе на начало: {{ money.cashier_start }}₽.
        </div>
        <div class="md-layout-item md-gutter">
          В кассе на конец: {{ money.cashier_end }}₽.
        </div>
      </div>
    </md-snackbar>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import {
  FETCH_ROOMS,
  FETCH_SEANSES,
  UPDATE_BY_DATE,
  UPDATE_BY_ROOM,
  FETCH_MONEY
} from "@/store/consts";
import seansCardDone from "../components/Home/seansCardDone";
import newReservWindow from "../components/Home/newReservWindow";
export default {
  name: "Home",
  data: () => ({
    menuVisible: false,
    showDialog: false
  }),
  computed: {
    ...mapGetters({
      currentDate: "getCurrentDate",
      seanses: "getSeanses",
      money: "getMoney"
    }),
    rooms: function() {
      return this.$store.state.home.rooms;
    },
    currentRoom: function() {
      return this.$store.state.home.currentRoom;
    },
    showSnackbar: function() {
      return Object.keys(this.money).length > 0;
    },
    isAdmin: function() {
      return localStorage.getItem("role") === "1";
    }
  },
  methods: {
    ...mapActions([
      FETCH_ROOMS,
      FETCH_SEANSES,
      UPDATE_BY_DATE,
      UPDATE_BY_ROOM,
      FETCH_MONEY
    ]),
    toggleModal() {
      this.showDialog = !this.showDialog;
    }
  },
  created: function() {
    this.FETCH_ROOMS();
    this.FETCH_SEANSES();
  },
  components: {
    seansCardDone,
    newReservWindow
  }
};
</script>

<style lang="scss" scoped>
.md-app {
  min-height: 100vh;
}

.md-toolbar {
  position: absolute;
  top: 0;
  justify-content: center;
  font-size: 25px;
}

.md-app-drawer {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  max-height: 100vh;
}

.settings {
  width: 100%;
  padding: 20px 20px 60px;
  margin-bottom: 40px;
}

.md-field {
  margin: 0;
}

.link {
  color: #fff !important;
  font-size: 18px !important;
}

.content__title {
  text-align: center;
  margin-top: 30px;
  font-size: 30px;
  font-family: "Roboto";
}

.md-layout-item {
  margin: 0 20px;
}

.md-snackbar {
  max-width: 100% !important;
  max-height: 100px !important;

  .md-layout {
    margin: 0 auto;
    width: 100%;
  }
}

.link {
  color: #fff !important;
  font-size: 16px !important;
  margin-right: 20px;
}

.md-toolbar.md-large.md-dense {
  min-height: 64px !important;
}
</style>
