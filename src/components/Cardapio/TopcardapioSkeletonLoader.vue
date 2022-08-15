<template>
<v-row v-if="!getLoaded" class="align-center justify-space-around">
        <v-skeleton-loader  type="button mr-1">
      </v-skeleton-loader>
      <v-skeleton-loader type="button mr-1">
      </v-skeleton-loader>
      <v-skeleton-loader  type="button mr-1">
      </v-skeleton-loader>
      <v-skeleton-loader  type="button mr-1">
      </v-skeleton-loader>
      <v-skeleton-loader class="hidden-sm-and-down"  type="button">
      </v-skeleton-loader>
      </v-row>
 </template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  props:["load"],
  data: () => ({
  }),

  methods: {

  },

  computed: mapGetters(["getLoaded"]),

  created() {

  },
};
</script>

<style>
@import "./cardapio.module.css";
</style>
