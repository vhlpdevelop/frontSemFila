<template>
  <div v-if="!getLoaded">
    <v-row
      
      class="align-center"
      transition="fade-transition"
    >
      <v-skeleton-loader
        type="image, actions"
        class="mr-1 d-none d-md-flex d-sm-flex d-lg-flex d-xl-flex "
      >
      </v-skeleton-loader>
      <v-skeleton-loader type="image, actions" class="mr-1">
      </v-skeleton-loader>
      <v-skeleton-loader
        type="image, actions"
        class="mr-1 d-none d-md-flex d-sm-flex d-lg-flex d-xl-flex "
      >
      </v-skeleton-loader>
    </v-row>
    <v-container >
      <v-row class="align-center justify-center" transition="fade-transition">
        
      </v-row>
    </v-container>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["load"],
  data: () => ({}),

  methods: {},

  computed: mapGetters(["getLoaded"]),

  created() {},
};
</script>

<style>
@import "./cardapio.module.css";
</style>
