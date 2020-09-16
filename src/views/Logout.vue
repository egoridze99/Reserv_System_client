<template>
  <div class=""></div>
</template>

<script>
import { LOGOUT } from "../store/consts";
export default {
  created() {
    this.$store.dispatch(LOGOUT);
    this.$router.push("/");
  }
};
</script>
