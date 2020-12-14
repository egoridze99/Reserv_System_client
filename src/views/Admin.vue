/* eslint-disable vue/no-unused-components */
<template>
  <div class="">
    <md-app>
      <md-app-toolbar class="md-primary">
        <div class="md-toolbar-section-start">
          <span class="md-title">Панель администратора</span>
        </div>
        <div class="md-toolbar-section-end">
          <router-link to="/" class="link">Главная</router-link>
          <router-link to="/logout" class="link">Выйти</router-link>
        </div>
      </md-app-toolbar>
      <md-app-content>
        <md-tabs>
          <md-tab id="tab-common" md-label="Общие сведения">
            <common-tab />
          </md-tab>
          <md-tab id="tab-rejected" md-label="Отмененные сеансы">
            <canceld-tab />
          </md-tab>
          <md-tab id="tab-new-user" md-label="Добавить нового пользователя">
            <new-user-tab />
          </md-tab>
          <md-tab id="reservs-tab" md-label="Поиск броней по номеру">
            <reservs-tab />
          </md-tab>
        </md-tabs>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
import Common from "../components/Admin/Common";
import Canceled from "../components/Admin/Canceled";
import NewUser from "../components/Admin/NewUser";
import Reservs from '../components/Admin/Reservs';
export default {
  components: {
    "common-tab": Common,
    "canceld-tab": Canceled,
    "new-user-tab": NewUser,
    "reservs-tab": Reservs
  },
  created() {
    this.$store.dispatch("FETCH_ROOMS");
  }
};
</script>

<style lang="scss" scoped>
.link {
  color: #fff !important;
  font-size: 16px;
  margin-right: 20px;
}
</style>
