<template>
  <v-app>
    <section id="helper">
      <div class="py-6 justify-start d-flex flex">
        <v-btn block text>
          <div @click="$router.go(-1)" class="primary--text">Ajuda</div>
          <div>
            <v-icon x-small>mdi-arrow-right</v-icon>
            {{ id }}
          </div>
        </v-btn>
      </div>
      <v-container fluid class="text-center">
        <h2 class="font-weight-bold mb-5">{{ objectData.header }}</h2>
        <v-expansion-panels>
          <v-expansion-panel v-for="(item, i) in objectData.item" :key="i">
            <v-expansion-panel-header color="green--text">
              {{ item.title }}
            </v-expansion-panel-header>
            <v-expansion-panel-content class="ma-3" v-html="item.text ">
              
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-container>
    </section>
  </v-app>
</template>
<script>
import helper from "./helper";
export default {
  name: "helperComponent",
  props: ["id", "object"],
  data: () => ({
    objectData: {},
  }),
  created() {
    var finder = helper.searchHelper(this.id);
    if (finder !== null) {
      this.objectData = finder;
    } else {
      this.$router.go(-1);
    }
  },
};
</script>
