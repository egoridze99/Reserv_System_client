<template>
  <div class="wrapper">
    <div class="login-form">
      <md-toolbar class="md-accent" v-if="error">
        <h3 class="md-title">{{ error }}</h3>
      </md-toolbar>
      <h3 class="login-form__title">Логин</h3>
      <md-field>
        <label>Логин</label>
        <md-input v-model="login"></md-input>
      </md-field>
      <md-field>
        <label>Пароль</label>
        <md-input v-model="password" type="password"></md-input>
      </md-field>
      <md-button class="md-primary" @click="submitForm">Войти</md-button>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { LOGIN } from "../store/consts";

export default {
  data: function() {
    return {
      login: "",
      password: "",
      error: ""
    };
  },
  methods: {
    ...mapActions([LOGIN]),
    submitForm() {
      this.LOGIN({
        login: this.login,
        password: this.password
      })
        .then(() => this.$router.push("/"))
        .catch(err => (this.error = err));
    }
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-form {
  width: 600px;
  padding: 40px;
  border: 2px solid #448aff;
  border-radius: 5px;
  text-align: center;

  &__title {
    font-family: "Roboto";
    font-weight: 300;
    font-size: 24px;
  }
}
</style>
