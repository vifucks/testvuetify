<template>
  <div>
    <h1 class="mb-8 secondary--text">Изменение цены отеля</h1>
    <v-form
      ref="changePrice"
      v-model="valid"
      lazy-validation
      class="createForm"
      @submit.prevent="changePrice"
    >
      <v-select
        v-model="hotel"
        :items="target"
        :rules="[(v) => !!v || 'Item is required']"
        label="Имя отеля"
        required
      ></v-select>

      <v-text-field
        v-model="basicCost"
        :counter="6"
        :rules="numberRules"
        label="Базовая номера"
        type="number"
        required
      ></v-text-field>
      <v-text-field
        v-model="middleCost"
        :counter="6"
        :rules="numberRules"
        label="Средние номера"
        type="number"
        required
      ></v-text-field>
      <v-text-field
        v-model="topCost"
        :counter="6"
        :rules="numberRules"
        label="Высокие номера"
        type="number"
        required
      ></v-text-field>


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
  name: "changeprices",

  data() {
    return {
      hotelList: [],
      hotel: '',
      basicCost: null,
      middleCost: null,
      topCost: null,
      valid: true,
      numberRules: [
        (value) => !!value || "Required.",
        (value) => (value && value.length >= 3) || "Min 3 characters",
      ],
      select: null,
      target: ["АВРОРА", "АЛТАЙ-ВЭСТ", "ЦЕНТРСОЮЗ", "САНАТОРИЙ РОССИИЯ", "ЭХО", "НА КАМУШКАХ", "АЛТАЙСКИЙ ЗАМОК", "РОДНИК АЛТАЯ"],
    };
  },

  methods: {
    ...mapActions(["chek_token"]),
    validate() {
      this.$refs.changePrice.validate();
    },
    reset() {
      this.$refs.changePrice.reset();
    },
    resetValidation() {
      this.$refs.changePrice.resetValidation();
    },
    async changePrice() {
      let hotelid = this.target.indexOf(this.hotel) + 1
      let url = "https://test.belotouriha.ru/hotels/change ";
      await this.axios
        .post(url, {
          id: hotelid,
          basic: this.basicCost,
          comfort: this.middleCost,
          luxury: this.topCost,
        })
        .catch((e) => {
          throw new Error(e);
        });
      this.basicCost = null
      this.middleCost = null
      this.topCost = null
      this.$refs.changePrice.resetValidation();
    },
  },
};
</script>
<style lang="scss">
.createForm {
  max-width: 500px;
}
</style>
