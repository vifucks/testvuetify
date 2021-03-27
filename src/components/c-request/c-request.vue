<template>
  <v-card elevation="7" class="my-4" :class="statusClass">
    <v-layout class="pa-4 project align-center justify-space-between">
      <v-flex class="flexDate1">
        <div class="caption mb-1 grey--text">Откуда - куда</div>
        <div>{{ request.from }} &nbsp; - &nbsp; {{ request.to}}</div>
      </v-flex>
      <v-flex class="flexDate2">
        <div class="caption mb-1 grey--text">Дата поездки</div>
        <div>{{ request.date }}</div>
      </v-flex>
      <v-flex class="flexDate3">
        <div class="caption mb-1 grey--text">Кол. людей</div>
        <div>{{ request.people }}</div>
      </v-flex>
      <v-flex class="flexDate4">
        <div class="caption mb-1 grey--text">Имя</div>
        <div>{{ request.name }}</div>
      </v-flex>
      <v-flex class="flexDate5">
        <div class="caption mb-1 grey--text">Телефон</div>
        <div>{{ request.phone }}</div>
      </v-flex>
      <v-flex class="flexDate6">
        <div class="caption mb-1 grey--text">Время заявки</div>
        <div>{{ request.times }}</div>
      </v-flex>
      <v-flex class="flex-grow-0">
        <v-btn color="success" @click="openCard"> Открыть </v-btn>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  name: "request",
  props: ["request"],
  data() {
    return {};
  },
  methods: {
    openCard() {
      this.$emit("dialogOpen", this.request.id);
    },
  },
  computed: {
    statusClass() {
      let status = ''
      switch (this.request.status) {
        case 'Не прочитано':
          status = 'noRead'
          break
        case 'В работе':
          status = 'inWork'
          break
        case 'Выполнено':
          status = 'complete'
          break
      }
      return status
    }
  }
};
</script>

<style lang="scss" scoped>
.flexDate1 {
  min-width: 205px;
  max-width: 205px;
}
.flexDate2 {
  min-width: 115px;
  max-width: 115px;
}
.flexDate3{
  min-width: 75px;
  max-width: 75px;
}
.flexDate4{
  min-width: 160px;
  max-width: 300px;
}
.flexDate5{
  min-width: 130px;
  max-width: 130px;
}
.flexDate6{
  min-width: 170px;
  max-width: 170px;
}


.noRead {
  border-left: 5px solid orange !important;
}
.inWork {
  border-left: 5px solid #16c7ff !important;
}
.complete {
  border-left: 5px solid #5cb85c !important;
}

//.project.complete {
//  border-left: 4px solid #5cb85c;
//}
//.project.ongoing {
//  border-left: 4px solid orange;
//}
</style>
