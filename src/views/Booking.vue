<template>
  <div>
    <h1 class="mb-8 secondary--text">Все заявки по трансферу</h1>
    <v-layout class="checkboxes mb-12">
      <v-checkbox
          v-model="ex4"
          label="Все"
          color="indigo"
          value="Все"
          hide-details
      ></v-checkbox>
      <v-checkbox
          v-model="ex4"
          label="Не прочитано"
          color="orange darken-3"
          value="Не прочитано"
          hide-details
      ></v-checkbox>
      <v-checkbox
          v-model="ex4"
          label="Выполнено"
          color="success"
          value="Выполнено"
          hide-details
      ></v-checkbox>
      <v-checkbox
          v-model="ex4"
          label="В работе"
          color="info"
          value="В работе"
          hide-details
      ></v-checkbox>
      <v-dialog
          ref="dialog"
          v-model="modalTime"
          :return-value.sync="date"
          persistent
          width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
              v-model="date"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
              label="Дата"
              class="datapickers"
          ></v-text-field>
        </template>
        <v-date-picker v-model="date" scrollable>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="modalTime = false"> Cancel</v-btn>
          <v-btn text color="primary" @click="$refs.dialog.save(date)">
            OK
          </v-btn>
        </v-date-picker>
      </v-dialog>
      <v-btn class="closePicker" @click="date = ''">
        X
      </v-btn>
    </v-layout>
    <bookingOne
        v-for="(i) in bookings"
        :key="i.id"
        :booking="i"
        @dialogOpen="dialogOpen"
    >
    </bookingOne>
      <v-pagination
          v-model="page"
          :length="pages - 1"
          prev-icon="mdi-menu-left"
          next-icon="mdi-menu-right"
      ></v-pagination>
    <v-dialog
        v-model="modal"
        width="800"
    >
      <v-card>
        <v-card-title class="headline blue-grey darken-3 white--text">
          Заявка id: {{ modalData.id }}
        </v-card-title>

        <v-card-text class="pa-5">
          <div class="modalTitle">
            id: <span class="modalTitleText">{{ modalData.id }}</span>
          </div>
          <hr class="modalHr">
          <div class="modalTitle">
            Дата заезда: <span class="modalTitleText">{{ modalData.tuda }}</span>
          </div>
          <hr class="modalHr">
          <div class="modalTitle">
            Дата отъезда: <span class="modalTitleText">{{ modalData.obratno }}</span>
          </div>
          <hr class="modalHr">
          <div class="modalTitle">
            Уровень комфорта: <span class="modalTitleText">{{ modalData.level }}</span>
          </div>
          <!--          <hr class="modalHr">-->
          <!--          <div class="modalTitle">-->
          <!--            Цена: <span class="modalTitleText">{{ modalData.cost }}</span>-->
          <!--          </div>-->
          <hr class="modalHr">
          <div class="modalTitle">
            Дата заявки: <span class="modalTitleText">{{ modalData.times }}</span>
          </div>
          <hr class="modalHr">
          <div class="modalTitle">
            Количество человек: <span class="modalTitleText">{{ modalData.people }}</span>
          </div>
          <hr class="modalHr">
          <div class="modalTitle">
            Имя клиента: <span class="modalTitleText">{{ modalData.name }}</span>
          </div>
          <hr class="modalHr">

          <div class="modalTitle">
            Номер клиента: <span class="modalTitleText">{{ modalData.phone }}</span>
          </div>
          <hr class="modalHr">
          <div class="modalTitle">
            Комментарий клиента: <span class="modalTitleText">{{ modalData.comment }}</span>
          </div>
          <hr class="modalHr">
          <div class="modalTitle">
            Статус заявки: <span class="modalTitleText">{{ modalData.status }}</span>
          </div>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              v-if="modalData.status === 'Не прочитано'"
              color="warning"
              text
              @click="readOn('В работе')"
              class="uppercase"
          >
            Прочитано
          </v-btn>
          <v-btn
              v-if="modalData.status !== 'Выполнено'"
              color="success"
              text
              @click="readOn('Выполнено')"
          >
            Выполнена
          </v-btn>
          <v-btn
              color="error"
              text
              @click="bookingDelete"
          >
            Удалить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </div>
</template>


<script>
import bookingOne from "../components/c-booking/c-booking";

export default {
  name: "booking",
  components: {
    bookingOne,
  },

  data() {
    return {
      bookings: [],
      modal: false,
      modalData: {},
      ex4: "Все",
      modalTime: false,
      sortMas: [],
      date: "",
      pages: 1,
      page: 1
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    async bookingDelete() {
      let url = "https://test.belotouriha.ru/booking/delete";
      let data = {
        id: this.modalData.id
      }
      await this.axios.post(url, data);
      this.bookings = this.bookings.filter(req => req.id !== this.modalData.id)
      this.modal = false
    },
    async readOn(status) {
      let url = "https://test.belotouriha.ru/booking/status";
      this.modalData.status = 'В работе'
      let data1 = {
        id: this.modalData.id,
        status: status
      }
      await this.axios.post(url, data1);
      let {data} = await this.axios.post("https://test.belotouriha.ru/booking/page");
      this.bookings = data.data
      this.rerender()
      this.modal = false
      console.log('laoding',data.pages)
    },
    dialogOpen(v) {
      let id = v
      let data = this.bookings.find(booking => booking.id === id)
      this.modalData = data
      this.modal = true
    },
    async loadData() {
      let url = "https://test.belotouriha.ru/booking/page";
      let {data} = await this.axios.post(url);
      this.bookings = data.data
      this.pages = data.pages
    },
    async deleteCard(v) {
      let url = "https://test.belotouriha.ru/graphic/delete";
      await this.axios
          .post(url, {
            id: v,
          })
          .then(() => this.loadData());
    },
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    checkForm() {
      this.$refs.form.resetValidation();
      Object.keys(this.form).forEach((key) => {
        this.form[key] = "";
      });
    },
    async rerender() {
      let {data} = await this.axios.post("https://test.belotouriha.ru/booking/page", {
        status: this.ex4,
        date: this.date
      })
      this.bookings = data.data
      this.pages = data.pages
      this.page = 1
    },
    async rerenderPagination(v) {
      // this.page++
      let {data}  = await this.axios.post("https://test.belotouriha.ru/booking/page", {
        status: this.ex4,
        page: v,
        date: this.date
      })
      this.bookings = data.data
    },
    async nextPage() {
      this.page++
      let {data}  = await this.axios.post("https://test.belotouriha.ru/booking/page", {
        status: this.ex4,
        page: this.page-1,
        date: this.date
      })
      console.log(data.data)
      this.bookings = data.data
    },
    async prevPage() {
      this.page--
      let {data}  = await this.axios.post("https://test.belotouriha.ru/booking/page", {
        status: this.ex4,
        page: this.page-1,
        date: this.date
      })
      this.bookings = data.data
    }
  },
  computed: {
  },
  watch: {
    ex4() {
      this.rerender()
    },
    date() {
      this.rerender()
    },
    page(v) {
      this.rerenderPagination(v)
    }
  }
};
</script>
<style lang="scss" scoped>
.createForm {
  max-width: 500px;
}

.modalTitle {
  font-size: 16px;
  color: #16c7ff;
  margin-bottom: 0.7rem;

  .modalTitleText {
    font-size: 18px;
    color: #1e2229 !important;
  }
}

.modalHr {
  margin-bottom: 1rem;
  opacity: 0.5;
}

.checkboxes {
  display: flex;

  > div:first-child {
    margin-left: 0;
  }

  .datapickers{
    max-width: 300px;
  }

  > div {
    margin-left: 2rem;
  }

}
.closePicker {
  position: relative;
  top: 13px;
  left: 21px;
}
</style>
