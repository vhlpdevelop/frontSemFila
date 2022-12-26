<template>
  <v-row class="align-center justify-center" v-if="getLoaded">
    <v-app-bar-nav-icon
      class="hidden-md-and-up float-left"
      @click.stop="drawer = !drawer"
    />

    <h1 v-if="!storeHasImage">{{ store.name }}</h1>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
      width="300"
      class="mx-auto"
    >
      <v-list class="">
        <v-list-item class="">
          <v-list-item-icon>
            <v-icon style="color: rgb(55, 80, 92) !important;">mdi-home</v-icon>
          </v-list-item-icon>
          <v-btn text class="navTitle" to="/home">NOLINE</v-btn>
        </v-list-item>
        <v-divider />
        <v-list-item
          v-for="(item, index) in subMenu"
          :key="item.title"
          :to="item.to"
        >
          <v-list-item-title class="navTitle">{{
            item.title
          }}</v-list-item-title>
        </v-list-item>

        <v-divider />
        <v-list-item to="/entrar">
          <v-list-item-title class="navSubMenu">Entrar</v-list-item-title>
        </v-list-item>
        <v-list-item
          v-for="(item, index) in staticMenu"
          :key="item.title"
          :to="item.path"
        >
          <v-list-item-title class="navSubMenu">{{
            item.title
          }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-row>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["object"],
  data: () => ({
    storeHasImage: false,
    store: "",
    cardapio: "",
    drawer: false,
    staticMenu: [
      { title: "Politicas", path: "/politicas" },
      { title: "Ajuda", path: "/ajuda" },
    ],
        subMenu: [
      { title: "Comece por aqui", to: "/comece" },
      { title: "Tornar-me um Sem fila", to: "/semfila" },
      { title: "Parceiros", to: "/parceiros" },
      { title: "Jornada", to: "/jornada" },
    ],
  }),

  methods: {},

  computed: mapGetters(["getLoading", "getLoaded", "getCardapio"]),

  async created() {
    if (this.getLoaded) {
      if (this.getCardapio !== "") {
        let aux = this.getCardapio.store.store_img;
        if (aux.length !== 0) {
          this.storeHasImage = true;
        }

        this.store = this.getCardapio.store;
        this.cardapio = this.getCardapio.cardapio;
      }
    }
  },
};
</script>

<style>
@import "./cardapio.module.css";
</style>
