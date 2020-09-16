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
            @click="fetchData"
            >Поглядеть</md-button
          >
        </md-field>
      </div>
    </div>
    <div class="md-elevation-2 info" v-if="checked">
      <div class="md-layout">
        <md-card class="md-layout-item">
          <md-card-header-text>
            <div class="md-title">Всего заработано: {{ money.total }}</div>
          </md-card-header-text>
          <div class="" v-for="(room, index) in money" :key="room.total">
            <div class="" v-if="index === 'total'"></div>
            <div class="" v-else>
              <h2>{{ index }}:</h2>
              <p>Картой: {{ room.card }}</p>
              <p>Наличкой: {{ room.cash }}</p>
              <p>Всего: {{ room.rent }}</p>
            </div>
          </div>
        </md-card>
        <md-card class="md-layout-item">
          <md-card-header-text>
            <div class="md-title">
              Всего потрачено: {{ checkout.total }}
              <div class="" v-for="(room, index) in checkout" :key="room.total">
                <div class="" v-if="index === 'total'"></div>
                <div class="" v-else>
                  <h2>{{ index }}:</h2>
                  <span>{{ room }}</span>
                </div>
              </div>
            </div>
          </md-card-header-text>
        </md-card>
        <md-card class="md-layout-item">
          <md-card-header-text>
            <div class="md-title">
              Всего часов просмотров: {{ duration.total }}ч.
            </div>
            <div class="" v-for="(room, index) in duration" :key="room.total">
              <div class="" v-if="index === 'total'"></div>
              <div class="" v-else>
                <h2>{{ index }}:</h2>
                <span>{{ room }}ч.</span>
              </div>
            </div>
          </md-card-header-text>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import format from "date-fns/format";
import { urlPrefix } from "../../settings";
export default {
  name: "common-tab",
  computed: {
    rooms: function() {
      return this.$store.state.home.rooms;
    }
  },
  data() {
    return {
      untill: format(new Date(), "yyyy-MM-dd"),
      till: format(new Date(), "yyyy-MM-dd"),
      checkout: {},
      duration: {},
      money: {},
      checked: false
    };
  },
  methods: {
    async fetchData() {
      const response = await this.$http.get(`${urlPrefix}admin_api/common`, {
        params: {
          untill: this.untill,
          till: this.till
        }
      });

      this.checked = true;
      const { data } = response;
      this.checkout = data.checkout;
      this.money = data.money;
      this.duration = data.duration;
    }
  }
};
</script>

<style lang="scss" scoped>
.md-field {
  margin: 30px;
}

.info {
  margin-top: 40px;
  padding: 50px;
}

.md-card {
  padding: 20px !important;
}

p,
span {
  font-size: 16px;
}

h2 {
  font-size: 21px;
  display: inline-block;
  margin-right: 10px;
}
</style>
