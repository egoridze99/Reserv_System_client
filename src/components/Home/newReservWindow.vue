<template>
  <md-dialog :md-active.sync="isActive">
    <md-card>
      <md-card-header>
        <md-card-header-text>
          <div class="md-title">Добавление нового резерва</div>
        </md-card-header-text>
      </md-card-header>
      <form @submit.prevent="createReserv">
        <md-card-content class="md-scrollbar">
          <md-field>
            <md-select
              name="room"
              id="room"
              placeholder="Выбор зала"
              v-model="currentRoom"
            >
              <md-option v-for="room in rooms" :key="room" :value="room">{{
                room
              }}</md-option>
            </md-select>
          </md-field>
          <md-datepicker md-immediately @input="selectDate">
            <label for>Выбор даты</label>
          </md-datepicker>
          <md-field>
            <label>Время HH:MM</label>
            <md-input
              v-model="time"
              placeholder="Время HH:MM"
              required
            ></md-input>
          </md-field>
          <md-field>
            <label>Продолжительность</label>
            <md-input
              v-model="duration"
              placeholder="Продолжительность"
              required
            ></md-input>
          </md-field>
          <md-field>
            <label>Кол-во гостей</label>
            <md-input
              v-model="count"
              placeholder="Кол-во гостей"
              required
            ></md-input>
          </md-field>
          <md-field>
            <label>Имя гостя</label>
            <md-input
              v-model="guest.name"
              placeholder="Имя гостя"
              required
            ></md-input>
          </md-field>
          <md-field>
            <label>Телефон гостя</label>
            <md-input
              v-model="guest.tel"
              placeholder="Телефон гостя"
              required
            ></md-input>
          </md-field>
          <md-field>
            <label>Фильм</label>
            <md-input v-model="film" placeholder="Фильм" required></md-input>
          </md-field>
          <md-field>
            <label>Примечание</label>
            <md-textarea v-model="note" placeholder="Примечание"></md-textarea>
          </md-field>
          <md-field>
            <label>Сумма аренды</label>
            <md-input
              v-model="rent"
              required
              placeholder="Сумма аренды"
            ></md-input>
          </md-field>
        </md-card-content>
        <md-dialog-actions>
          <md-button class="md-accent md-raised" @click="toggleModal"
            >Закрыть</md-button
          >
          <md-button class="md-primary md-raised" type="submit"
            >Сохранить</md-button
          >
        </md-dialog-actions>
      </form>
    </md-card>
  </md-dialog>
</template>

<script>
import { CREATE_RESERV } from "../../store/consts";
import { mapActions } from "vuex";
import format from "date-fns/format";
export default {
  name: "new-reserv-modal",
  props: ["active", "toggleModal", "rooms"],
  data() {
    return {
      currentRoom: "",
      date: "",
      time: "",
      duration: "",
      count: "",
      guest: {
        name: "",
        tel: ""
      },
      film: "-",
      rent: 0,
      note: ""
    };
  },
  computed: {
    isActive: {
      get() {
        return this.active;
      },
      set() {
        this.toggleModal();
      }
    }
  },
  methods: {
    ...mapActions([CREATE_RESERV]),
    createReserv() {
      this.CREATE_RESERV({
        room: this.currentRoom,
        date: this.date,
        time: this.time,
        duration: this.duration,
        count: this.count,
        guest: this.guest,
        film: this.film,
        rent: this.rent,
        note: this.note
      });
      this.currentRoom = "";
      this.date = "";
      this.time = "";
      this.duration = "";
      this.count = "";
      this.guest = {
        name: "",
        tel: ""
      };
      this.film = "-";
      this.rent = 0;
      this.note = "";
      this.toggleModal();
    },
    selectDate(date) {
      date = format(date, "yyyy-MM-dd");
      this.date = date;
    }
  }
};
</script>

<style lang="scss" scoped>
.md-card-content {
  height: fit-content;
  max-height: 400px;
  overflow: auto;
}

.md-scrollbar {
  &::before {
    background-color: #000 !important;
  }
}
</style>
