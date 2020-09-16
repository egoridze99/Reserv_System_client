<template>
  <div class="container">
    <div class="md-card">
      <div class="md-layout">
        <md-field class="md-layout-item">
          <label>От</label>
          <md-input placeholder="гггг-мм-дд" v-model="untill"></md-input>
        </md-field>
        <md-field class="md-layout-item">
          <label>До</label>
          <md-input placeholder="гггг-мм-дд" v-model="till"></md-input>
        </md-field>
        <md-field class="md-layout-item"
          ><md-button
            class="md-raised md-primary md-layout-item"
            @click="fetchCanceled"
            >Поглядеть</md-button
          >
        </md-field>
      </div>
    </div>
    <div class="info">
      <h1 v-if="seanses.length === 0" class="content__title">
        Пока записей нет...
      </h1>
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
      ></seans-card-done>
    </div>
  </div>
</template>

<script>
import format from "date-fns/format";
import seansCardDone from "../Home/seansCardDone";
import { urlPrefix } from "../../settings";
export default {
  data() {
    return {
      untill: format(new Date(), "yyyy-MM-dd"),
      till: format(new Date(), "yyyy-MM-dd"),
      seanses: []
    };
  },
  methods: {
    async fetchCanceled() {
      const response = await this.$http.get(`${urlPrefix}admin_api/canceled`, {
        params: {
          untill: this.untill,
          till: this.till
        }
      });
      this.seanses = [...response.data];
    }
  },
  components: {
    seansCardDone
  }
};
</script>

<style>
.md-card {
  padding: 20px !important;
}

.md-field {
  margin: 30px;
}

.info {
  margin-top: 20px;
}
</style>
