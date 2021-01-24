<template>
  <div class="container">
    <div class="md-card">
      <div class="md-layout mw300">
        <md-field class="md-layout-item">
          <label>Номер</label>
          <md-input placeholder="Номер" v-model="telephone"></md-input>
        </md-field>
        <md-field class="md-layout-item"
          ><md-button
            class="md-raised md-primary md-layout-item"
            @click="fetchData"
            >Поглядеть</md-button
          >
        </md-field>
      </div>
    </div>
    <div class="md-elevation-2 info" v-if="checked">
      <p v-if="telephone.length === 0">Такого пользователя нет</p>
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
        :date="seans.date"
      ></seans-card-done>
    </div>
  </div>
</template>

<script>
import { urlPrefix } from "../../settings";
import seansCardDone from "../Home/seansCardDone";
export default {
  name: "reservs-tab",
  components: {
    "seans-card-done": seansCardDone
  },
  computed: {
    rooms: function() {
      return this.$store.state.home.rooms;
    },
  },
  data() {
    return {
      telephone: "",
      checked: false,
      seanses: [],
    };
  },
  methods: {
    async fetchData() {
      const response = await this.$http.get(`${urlPrefix}admin_api/reservs`, {
        params: {
          telephone: this.telephone,
        },
      });

      this.checked = true;
      this.seanses = [...response.data];
      console.log(response.data);
    },
  },
};
</script>

<style lang="scss" scoped>
.mw300 {
  max-width: 300px;
  margin: 0 auto;
}
</style>
