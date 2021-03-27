<template>
  <v-card elevation="7" class="my-4">
    <v-layout class="pa-4 project align-center">
      <v-flex>
        <div class="caption mb-1 grey--text">ID</div>
        <div>{{ transfer.id }}</div>
      </v-flex>
      <v-flex>
        <div class="caption mb-1 grey--text">Откуда</div>
        <div>{{ transfer.from }}</div>
      </v-flex>
      <v-flex>
        <div class="caption mb-1 grey--text">Куда</div>
        <div>{{ transfer.to }}</div>
      </v-flex>
      <v-flex>
        <div class="caption mb-1 grey--text">Цена</div>
        <div>{{ transfer.cost }}</div>
      </v-flex>
      <v-flex>
        <div class="caption mb-1 grey--text">Дата</div>
        <div>{{ transfer.date }}</div>
      </v-flex>
      <v-flex class="flex-grow-0">
        <v-btn color="error" @click="deleteCard"> Удалить </v-btn>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  name: "transfer-one",
  props: ["transfer"],
  data() {
    return {};
  },
  methods: {
    deleteCard() {
      this.$emit("deleteCard", this.transfer.id);
    },
  },
};
</script>

<style lang="scss" scoped>
//.project.complete {
//  border-left: 4px solid #5cb85c;
//}
//.project.ongoing {
//  border-left: 4px solid orange;
//}
</style>
