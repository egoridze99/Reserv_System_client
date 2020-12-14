<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { LOGOUT } from "./store/consts";

export default {
  created() {
    this.$http.interceptors.response.use(undefined, err => {
      // eslint-disable-next-line no-unused-vars
      return new Promise((resolve, reject) => {
        if (err.response.status === 401 && err.response.config) {
          this.$store.dispatch(LOGOUT);
          this.$router.push("/login");
        }
        throw err;
      });
    });

    this.$http.interceptors.response.use(undefined, err => {
      // eslint-disable-next-line no-unused-vars
      return new Promise((resolve, reject) => {
        if (err.response.status === 403 && err.response.config) {
          this.$router.push("/");
        }
        throw err;
      });
    });
  }
};
</script>

<style lang="scss" scoped>
#app {
  height: 100%;
}
</style>
