<template>
  <div>
    <h1 class="mb-8 secondary--text">Все комментарии</h1>
    <v-switch
      v-model="switcher"
      :label="`Показать не принятые комментарии`"
    ></v-switch>
    <v-card
      v-for="comment in filteredCard"
      elevation="7"
      class="my-4"
      :class="{ nomoderated: !comment.moderate }"
      :key="comment.id"
    >
      <v-layout class="pa-4 project align-center">
        <v-flex>
          <div>
            Пользователь: <b>{{ comment.user }}</b>
          </div>
          <div>{{ comment.text }}</div>
        </v-flex>
        <v-flex v-if="!comment.moderate" class="flex-grow-0">
          <v-btn color="success" @click="moderateCard(comment.id)">
            Принять
          </v-btn>
        </v-flex>
        <v-flex class="flex-grow-0 ml-4">
          <v-btn color="error" @click="deleteCard(comment.id)"> Удалить </v-btn>
        </v-flex>
      </v-layout>
    </v-card>
  </div>
</template>


<script>
export default {
  name: "allcomments",
  data() {
    return {
      сommentsAll: [],
      switcher: false,
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    async loadData() {
      let url = "https://test.belotouriha.ru/comments/getall";
      let { data } = await this.axios.post(url, {});
      this.сommentsAll = data;
    },
    async deleteCard(v) {
      let url = "https://test.belotouriha.ru/comments/delete";
      await this.axios
        .post(url, {
          id: v,
        })
        .then(() => this.loadData());
    },
    async moderateCard(v) {
      let url = "https://test.belotouriha.ru/comments/moderate";
      await this.axios
        .post(url, {
          id: v,
        })
        .then(() => this.loadData());
    },

    checkForm() {
      this.$refs.form.resetValidation();
      Object.keys(this.form).forEach((key) => {
        this.form[key] = "";
      });
    },
  },
  computed: {
    filteredCard() {
      if (this.switcher) {
        let data = this.сommentsAll.filter((e) => e.moderate === 0);
        return data;
      } else {
        return this.сommentsAll;
      }
    },
  },
};
</script>
<style lang="scss">
.createForm {
  max-width: 500px;
}

.nomoderated {
  border-left: 5px solid #980303 !important;
}
</style>
