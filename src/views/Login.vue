<template>
  <div id="wrap">
    <v-form
      id="loginform"
      ref="formLogin"
      v-model="valid"
      @submit.prevent="checkForm"
    >
      <v-container>
        <v-row class="d-flex justify-center">
          <v-col cols="12" sm="12">
            <v-text-field
              v-model="loginAcount"
              :counter="9"
              :rules="nameRules"
              label="Введите логин"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row class="d-flex justify-center">
          <v-col cols="12" sm="12">
            <v-text-field
              v-model="password"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, rules.min]"
              :type="show1 ? 'text' : 'password'"
              name="input-10-1"
              label="Введите пароль"
              hint="Должно быть 8 символов"
              counter
              @click:append="show1 = !show1"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-btn
            :disabled="!valid"
            color="success"
            class="mx-auto"
            @click="validate"
            type="submit"
          >
            Войти
          </v-btn>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "login",
  data() {
    return {
      loginAcount: "",
      password: "",
      valid: true,
      show1: false,
      type: null,
      elapse: null,
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 8 || "Min 8 characters",
        emailMatch: () => `The email and password you entered don't match`,
      },
      nameRules: [
        (v) => !!v || "Name is required",
        (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
      ],
    };
  },
  methods: {
    ...mapActions(["checkout"]),
    changes(s) {
      this.showAlert(s);
    },
    validate() {
      this.$refs.formLogin.validate();
    },
    checkForm() {
      let data = {
        login: this.loginAcount,
        password: this.password,
      };
      this.$refs.formLogin.resetValidation();
      this.$store.dispatch("checkout", data);
    },
  },
};
</script>

<style scoped>
#wrap {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
#loginform {
  width: 400px;
  /*height: 250px;*/
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.18);
  padding: 15px;
}
</style>
