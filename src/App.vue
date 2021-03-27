<template>
   <v-app>
     <v-alert :color="type" v-if="type" class="absoluteError">
       Неверный пароль
     </v-alert>
    <div class="page-wrapper chiller-theme toggled">
      <span id="show-sidebar" class="btn btn-sm btn-dark">
        <i class="fas fa-bars"></i>
      </span>
      <sidebar-app v-if="auth.loggedIn.token"></sidebar-app>
      <div v-else></div>
      <main class="page-content" :class="{ 'pa-0': !auth.loggedIn.token }">
        <v-container>
          <router-view/>
        </v-container>
      </main>
    </div>
   </v-app>
</template>

<script>
import SidebarApp from './components/sidebar/sidebar-app'
import {mapActions, mapGetters} from "vuex";

export default {
  components: {
    SidebarApp
  },

  computed: {
    ...mapGetters({
      auth: 'auth',
      type: 'type'
})
  },
  methods: {
    ...mapActions['goHome']
  },
  watch: {
    type(v){
      console.log(v)
    }
  },
  // beforeCreate() {
  //   axios.post('https://test.belotouriha.ru/admin/check')
  //     .then(()=>{
  //       this.$store.dispatch('goHome')
  //       // this.$router.push('/')
  //     })
  //     .catch(() => {
  //       this.$router.push('/login')
  //     })
  // }
}



</script>

<style lang="scss">
@import "./src/assets/default.scss";


.absoluteError {
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: 400px;
  height: 40px;
  padding: 0 0 0 20px;
  display: flex;
  align-items: center;
}

</style>
