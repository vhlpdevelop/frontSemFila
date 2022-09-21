<template>
  <v-app>
    <div>
      <v-toolbar flat class="backgroundB elevation-5"
     
      >
        <v-app-bar-nav-icon
          class="hidden-md-and-up"
          @click.stop="drawer = !drawer"
        />

        <v-toolbar-title>
          <v-btn text class="navTitle" to="/home">SemFila</v-btn>
        </v-toolbar-title>
        <v-spacer />
        
        <div v-for="(item, index) in subMenu"
            :key="item.title"
            @click="$router.push({path:item.path})"
            class="hidden-sm-and-down">
          <v-btn text depressed class="hidden-sm-and-down navText" > {{item.title}}</v-btn>
        </div>
        <v-btn depressed text class="ml-5 navTitle d-none d-sm-flex d-md-flex d-lg-flex d-xl-flex" to="/entrar">criar conta</v-btn>
        <v-btn raised class="navButtonEntrar white--text mr-5 d-none d-sm-flex d-md-flex d-lg-flex d-xl-flex"  to="/entrar">Entrar</v-btn>
      </v-toolbar>

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
              <v-icon style="color: rgb(55, 80, 92) !important;"
                >mdi-home</v-icon
              >
            </v-list-item-icon>
            <v-btn text class="navTitle" to="/home">SEMFILA</v-btn>
          </v-list-item>
          <v-divider />
          <v-list-item
            v-for="(item, index) in subMenu"
            :key="item.title"
            :to="item.path"
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
    </div>

    <v-container  ma-0 pr-0 pl-0 pt-3 fluid  class="mx-auto ">
      <router-view />
    </v-container>
    <ContentFooter />
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ContentFooter from "../Dashboard/ContentFooter";
export default {
  components: {
    ContentFooter,
  },
  name: "NoLine",
  data: () => ({
    drawer: null,
    appTitle: "NoLine - Sem Fila",
    navDrawer: true,
    sidebar: true,
    staticMenu: [
      { title: "Termos de Uso", path: "/TermosdeUso" },
      { title: "Termos de Privacidade", path: "/privacidade" },
      { title: "Ajuda", path: "/ajuda" },
    ],
    menu: [
      { title: "Cardapio" },
      { title: "QR CODE" },
      { title: "Financeiro" },
      { title: "Minha Conta" },
    ],
    subMenu: [
      { title: "Comece por aqui", path: "/comece" },
      { title: "Tornar-me um Sem fila", path: "/tornarSemFila" },
    ],
  }),

  computed: mapGetters(["getPerfil"]),
  methods: {
    ...mapActions([]),
  },
  created(){
    
  }
};
</script>

<style>
@import "./dashboard.module.css";
</style>
