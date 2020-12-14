<template>
  <div class="new-user-tab">
    <div class="new-user-tab__form">
      <h2>Регистрация нового администратора</h2>
      <form @submit.prevent="createUser">
        <md-field>
          <label>Логин</label>
          <md-input v-model="login"></md-input>
        </md-field>
        <md-field>
          <label>Пароль</label>
          <md-input v-model="password" type="password"></md-input>
        </md-field>
        <md-button type="submit" class="md-primary md-raised"
          >Добавить</md-button
        >
      </form>
    </div>
  </div>
</template>

<script>
import { urlPrefix } from "../../settings";
export default {
  name: "new-user-tab",
  data() {
    return {
      login: "",
      password: "",
    };
  },
  methods: {
    async createUser() {
      try {
        await this.$http.post(`${urlPrefix}admin_api/new_user`, {
          login: this.login,
          password: this.password,
        });

        this.login = "";
        this.password = "";
      } catch (e) {
        alert(e.response.data.msg);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.new-user-tab__form {
  text-align: center;
  max-width: 500px;
  margin: 0 auto;
}
</style>