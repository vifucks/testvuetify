<template>
  <div>
    <h1 class="mb-8 secondary--text">Все трансферы</h1>
    <transfer-one
      v-for="i in transfers"
      :key="i.id"
      :transfer="i"
      @deleteCard="deleteCard"
    >
    </transfer-one>
  </div>
</template>


<script>
import TransferOne from "../components/c-transfer/c-transfer";
export default {
  name: "transfers",
  components: {
    TransferOne,
  },

  data() {
    return {
      transfers: [],

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
  created() {
    this.loadData();
  },
  methods: {
    async loadData() {
      let url = "https://test.belotouriha.ru/graphic/getall";
      let { data } = await this.axios.post(url);
      this.transfers = data;
    },
    async deleteCard(v) {
      let url = "https://test.belotouriha.ru/graphic/delete";
      await this.axios
        .post(url, {
          id: v,
        })
        .then(() => this.loadData());

      // let index = this.transfers.findIndex(e => e.id === v)
      // console.log(index)
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
  },
};
</script>
<style lang="scss">
.createForm {
  max-width: 500px;
}
</style>
