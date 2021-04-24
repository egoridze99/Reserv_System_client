<template>
  <md-card v-if="mode === 'done'">
    <md-card-header>
      <div class="md-title">{{ room }}</div>
      <div class="md-title2">{{ name }}</div>
      <div class="md-title2">Дата: {{ dateFormated }}</div>
    </md-card-header>

    <md-card-content>
      <div class="md-layout">
        <div class="md-layout-item md-elevation-2">Время: {{ time }}</div>
        <div class="md-layout-item md-elevation-2">
          Продолжительность: {{ duration }}ч.
        </div>
        <div class="md-layout-item md-elevation-2">{{ count }} гостей</div>
        <div class="md-layout-item md-elevation-2 guest">
          <div class="">{{ guest.name }}</div>
          <div class="">{{ guest.tel }}</div>
        </div>
        <div class="md-layout-item md-elevation-2">Фильм: {{ film }}</div>
        <div class="md-layout-item md-elevation-2">{{ statusEdited }}</div>
      </div>
      <div class="md-elevation-2 note">Примечание: {{ note }}</div>
      <div class="md-layout">
        <div class="md-layout-item md-elevation-2">
          Сумма аренды:{{ rent }}&#8381;
        </div>
        <div class="md-layout-item md-elevation-2">
          Картой: {{ card }}&#8381;
        </div>
        <div class="md-layout-item md-elevation-2">
          Наличкой: {{ cash }}&#8381;
        </div>
      </div>
      <hr />
      <div class="md-title">Расходы</div>
      <div
        class="md-elevation-2 md-layout"
        v-for="checkout in checkouts"
        :key="checkout.id"
      >
        <div class="md-layout-item">Сумма: {{ checkout.summ }}</div>
        <div class="md-layout-item">Заметка: {{ checkout.note }}</div>
      </div>
    </md-card-content>

    <md-card-actions>
      <md-button @click="changeMode" class="md-primary" v-if="isNotOperator"
        >Редактировать</md-button
      >
    </md-card-actions>
  </md-card>
  <!-- Корректировка -->
  <md-card v-else-if="mode === 'correct'" class="edited">
    <md-card-header>
      <div class="md-title">
        <md-field>
          <md-select
            name="room"
            placeholder="Выбор зала"
            v-model="room_corrected"
          >
            <md-option v-for="room in rooms" :key="room" :value="room">{{
              room
            }}</md-option>
          </md-select>
        </md-field>
      </div>
    </md-card-header>
    <md-card-content>
      <div class="md-layout">
        <div class="md-layout-item md-elevation-2">
          Время:
          <span
            ><md-field
              ><md-input
                v-model="time_corrected"
                :value="time_corrected"
              ></md-input></md-field
          ></span>
        </div>
        <div class="md-layout-item md-elevation-2">
          Продолжительность:
          <md-field
            ><md-input
              v-model="duration_corrected"
              :value="duration_corrected"
            ></md-input></md-field
          >ч.
        </div>
        <div class="md-layout-item md-elevation-2">
          <md-field
            ><md-input
              v-model="count_corrected"
              :value="count_corrected"
            ></md-input
          ></md-field>
          гостей
        </div>
      </div>
      <div class="md-layout">
        <div class="md-layout-item md-elevation-2 guest md-size-11">
          <div class="">
            <md-field
              ><md-input
                v-model="guest_corrected.name"
                :value="guest_corrected.name"
              ></md-input
            ></md-field>
          </div>
          <div class="">
            <md-field
              ><md-input
                v-model="guest_corrected.tel"
                :value="guest_corrected.tel"
              ></md-input
            ></md-field>
          </div>
        </div>
        <div class="md-layout-item md-elevation-2">
          Фильм:
          <md-field
            ><md-input
              v-model="film_corrected"
              :value="film_corrected"
            ></md-input
          ></md-field>
        </div>
        <div class="md-layout-item md-elevation-2">
          <md-field
            ><md-select v-model="status_corrected" :value="status_corrected">
              <md-option value="not_allowed">Не подтверждено 🙈</md-option>
              <md-option value="progress">Ждем гостей 😊</md-option>
              <md-option value="waiting">Гости уже в зале! 🤪</md-option>
              <md-option value="finished">Сеанс завершен 🤑</md-option>
              <md-option value="canceled">Гости отменили бронь 😞</md-option>
            </md-select></md-field
          >
        </div>
      </div>
      <div class="md-elevation-2 note">
        Примечание:
        <md-field
          ><md-textarea
            v-model="note_corrected"
            :value="note_corrected"
          ></md-textarea
        ></md-field>
      </div>
      <div class="md-layout">
        <div class="md-layout-item md-elevation-2">
          Сумма аренды:<md-field
            ><md-input
              v-model="rent_corrected"
              :value="rent_corrected"
            ></md-input></md-field
          >&#8381;
        </div>
        <div class="md-layout-item md-elevation-2">
          Картой:
          <md-field
            ><md-input
              v-model="card_corrected"
              :value="card_corrected"
            ></md-input></md-field
          >&#8381;
        </div>
        <div class="md-layout-item md-elevation-2">
          Наличкой:
          <md-field
            ><md-input
              v-model="cash_corrected"
              :value="cash_corrected"
            ></md-input></md-field
          >&#8381;
        </div>
      </div>
      <hr />
      <div class="md-title">Расходы</div>
      <div
        class="md-elevation-2 md-layout checkouts"
        v-for="(checkout, i) in checkouts_corrected"
        :key="checkout.id"
      >
        <div class="md-layout-item">
          Сумма:
          <md-field
            ><md-input
              v-model="checkouts_corrected[i].summ"
              :value="checkouts_corrected[i].summ"
            ></md-input
          ></md-field>
        </div>
        <div class="md-layout-item">
          Заметка:
          <md-field
            ><md-input
              v-model="checkouts_corrected[i].note"
              :value="checkouts_corrected[i].note"
            ></md-input
          ></md-field>
        </div>
      </div>
      <md-button class="md-primary" @click="addCheckout"
        >Добавить расход</md-button
      >
    </md-card-content>
    <md-card-actions>
      <md-button @click="changeMode" class="md-accent">Отменить</md-button>
      <md-button @click="submitChanges" class="md-primary">Сохранить</md-button>
      <md-progress-spinner
        v-if="loader"
        :md-diameter="30"
        :md-stroke="3"
        md-mode="indeterminate"
      ></md-progress-spinner>
    </md-card-actions>
  </md-card>
</template>

<script>
import { UPDATE_SEANS } from "../../store/consts";
import { mapActions } from "vuex";

export default {
  name: "seans-card-done",
  data: function() {
    return {
      mode: "done",
      time_corrected: this.time,
      duration_corrected: this.duration,
      count_corrected: this.count,
      guest_corrected: this.guest,
      film_corrected: this.film,
      note_corrected: this.note,
      rent_corrected: this.rent,
      card_corrected: this.card,
      cash_corrected: this.cash,
      status_corrected: this.status,
      room_corrected: this.room,
      rooms: this.$store.state.home.rooms,
      checkouts_corrected: this.checkouts.map(item => ({
        id: item.id,
        summ: item.summ,
        note: item.note
      }))
    };
  },
  methods: {
    ...mapActions([UPDATE_SEANS]),
    changeMode() {
      if (this.mode === "done") this.mode = "correct";
      else {
        this.mode = "done";
        this.time_corrected = this.time;
        this.duration_corrected = this.duration;
        this.count_corrected = this.count;
        this.guest_corrected = this.guest;
        this.film_corrected = this.film;
        this.note_corrected = this.note;
        this.rent_corrected = this.rent;
        this.card_corrected = this.card;
        this.cash_corrected = this.cash;
        this.status_corrected = this.status;
        this.room_corrected = this.room;
        this.checkouts_corrected = this.checkouts.map(item => ({
          id: item.id,
          summ: item.summ,
          note: item.note
        }));
      }
    },
    async submitChanges() {
      await this.UPDATE_SEANS({
        id: this.id,
        time: this.time_corrected,
        duration: this.duration_corrected,
        count: this.count_corrected,
        guest: this.guest_corrected,
        film: this.film_corrected,
        note: this.note_corrected,
        rent: this.rent_corrected,
        card: this.card_corrected,
        cash: this.cash_corrected,
        status: this.status_corrected,
        room: this.room_corrected,
        checkouts: this.checkouts_corrected
      });

      this.changeMode();
    },
    addCheckout() {
      this.checkouts_corrected.push({
        summ: 0,
        note: "",
        id: Math.random() * 1000,
        new: true
      });
    }
  },
  computed: {
    statusEdited: function() {
      switch (this.status) {
        case "not_allowed":
          return "Не подтверждено 🙈";
        case "progress":
          return "Ждем гостей 😊";
        case "waiting":
          return "Гости уже в зале! 🤪";
        case "finished":
          return "Сеанс завершен 🤑";
        case "canceled":
          return "Гости отменили бронь 😞";
        default:
          return this.status;
      }
    },
    loader() {
      return this.$store.state.home.loader;
    },
    dateFormated() {
      const months = [
        "января",
        "февраля",
        "марта",
        "апреля",
        "мая",
        "июня",
        "июля",
        "августа",
        "сентября",
        "октября",
        "ноября",
        "декабря"
      ];

      const date = new Date(this.date);
      const day = date.getDate();
      const month = months[date.getMonth()];
      const year = date.getUTCFullYear();

      return `${day} ${month} ${year}`;
    },
    isNotOperator: function() {
      return this.$store.state.role !== "operator";
    }
  },
  props: [
    "id",
    "time",
    "duration",
    "count",
    "guest",
    "film",
    "note",
    "rent",
    "card",
    "cash",
    "status",
    "room",
    "checkouts",
    "name",
    "date"
  ]
};
</script>

<style lang="scss" scoped>
.md-card {
  background-color: rgba($color: #ddd, $alpha: 0.5) !important;
  margin-bottom: 20px;

  &.edited {
    background-color: rgba($color: #bbb, $alpha: 0.5) !important;

    .md-layout-item {
      background: rgba($color: #fff, $alpha: 0.7) !important;
    }

    .note {
      background: rgba($color: #fff, $alpha: 0.7) !important;
    }

    .md-field {
      background: rgba($color: #fff, $alpha: 0.7) !important;
      // margin: 0 20px;
    }
  }

  .md-layout-item {
    &:not(.guest) {
      align-items: center;
      display: flex;
      justify-content: center;
    }

    background: rgba($color: #eee, $alpha: 0.3);
    text-align: center;
    font-weight: 600;
    font-size: 15px;

    min-height: 45px;
    width: 100%;
    margin: 20px;
    padding: 20px;
    &.done {
      display: flex;
      justify-content: center;
    }
  }
}

.note {
  padding: 30px;
  font-weight: 600;
  font-size: 15px;
  margin: 0 20px;
}

.md-input {
  text-align: center !important;
}

.checkouts,
.md-title {
  margin-top: 20px;
}
</style>
