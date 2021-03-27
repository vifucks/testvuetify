<template>
  <div>
    <h1 class="mb-8 secondary--text">Создание трансфера</h1>
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
      class="createForm"
      @submit.prevent="checkForm"
    >
      <v-select
        v-model="form.start"
        :items="target"
        :rules="[(v) => !!v || 'Item is required']"
        label="Откуда"
        required
      ></v-select>
      <v-select
        v-model="form.end"
        :items="target"
        :rules="[(v) => !!v || 'Item is required']"
        label="Куда"
        required
      ></v-select>

      <v-text-field
        v-model="form.cost"
        :counter="6"
        :rules="nameRules"
        label="Цена трансфера"
        required
      ></v-text-field>

      <v-dialog
        ref="dialog"
        v-model="modal"
        :return-value.sync="form.date"
        persistent
        width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="form.date"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
            label="Дата"
          ></v-text-field>
        </template>
        <v-date-picker v-model="form.date" scrollable>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="modal = false"> Cancel </v-btn>
          <v-btn text color="primary" @click="$refs.dialog.save(form.date)">
            OK
          </v-btn>
        </v-date-picker>
      </v-dialog>

      <v-btn
        :disabled="!valid"
        color="success"
        class="mr-4"
        @click="validate"
        type="submit"
      >
        Создать
      </v-btn>

      <v-btn color="error" class="mr-4" @click="reset"> Сбросить данные </v-btn>

      <!--    <v-btn-->
      <!--        color="warning"-->
      <!--        @click="resetValidation"-->
      <!--    >-->
      <!--      Reset Validation-->
      <!--    </v-btn>-->
    </v-form>
  </div>
</template>


<script>
import { mapActions } from "vuex";

export default {
  name: "create-transfer",

  data() {
    return {
      modal: false,
      form: {
        start: "",
        end: "",
        date: new Date().toISOString().substr(0, 10),
        cost: null,
      },
      menu: false,
      menu2: false,
      valid: true,
      name: "",
      nameRules: [
        (v) => !!v || "Name is required",
        (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
      ],
      email: "",
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      numberRules: [
        (value) => !!value || "Required.",
        (value) => (value && value.length >= 3) || "Min 3 characters",
      ],
      select: null,
      target: ["Белокуриха", "Новосибирск"],
    };
  },

  methods: {
    ...mapActions(["chek_token"]),
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    async checkForm() {
      let url = "https://test.belotouriha.ru/graphic/create";
      await this.axios
        .post(url, {
          from: this.form.start,
          to: this.form.end,
          cost: this.form.cost,
          date: this.form.date.split("-").reverse().join("."),
        })
        .catch((e) => {
          this.chek_token();
          throw new Error(e);
        });
      Object.keys(this.form).forEach((key) => {
        this.form[key] = "";
      });
      this.$refs.form.resetValidation();
    },
  },
};
</script>
<style lang="scss">
.createForm {
  max-width: 500px;
}
</style>
