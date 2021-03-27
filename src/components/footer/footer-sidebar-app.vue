<template>
  <div class="sidebar-footer">
<!--    <a href="#">-->
<!--      <i class="fa fa-bell"></i>-->
<!--      <span class="badge badge-pill badge-warning notification">3</span>-->
<!--    </a>-->
<!--    <a href="#">-->
<!--      <i class="fa fa-envelope"></i>-->
<!--      <span class="badge badge-pill badge-success notification">7</span>-->
<!--    </a>-->
<!--    <a href="#">-->
<!--      <i class="fa fa-cog"></i>-->
<!--      <span class="badge-sonar"></span>-->
<!--    </a>-->
    <a href="#" @click.prevent="del">
      <i class="fa fa-power-off"></i>
    </a>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "footer-sidebar-app",
  methods: {
    ...mapActions["clear_token"],
    del() {
      this.$store.dispatch("clear_token");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "footer-app";
</style>
