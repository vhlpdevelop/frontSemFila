<template>
  <v-app>
    <link
      href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900|Material+Icons"
      rel="stylesheet"
    />
    <link
      href="https://cdn.jsdelivr.net/npm/vuetify/dist/vuetify.min.css"
      rel="stylesheet"
    />
    <div>
      <v-toolbar flat class="grey white--text">
        <v-app-bar-nav-icon
          class="white--text"
          @click.stop="drawer = !drawer"
        />

        <v-toolbar-title>
          <b>PAINEL ADMIN</b>
        </v-toolbar-title>
        <v-spacer />
        <v-toolbar-items
          v-for="menus in menu"
          :key="menus.title"
          class="hidden-xs-only"
        >
          <v-menu offset-y>
            <template v-slot:activator="{ on }">
              <v-btn width="150" text v-on="on" class="white--text">
                {{ menus.title }}
                <v-icon right>{{ menus.icon }}</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="item in getPerfil"
                v-if="item.title.includes(menus.title)"
                :key="item.title"
                :to="item.path"
              >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar-items>
      </v-toolbar>

      <v-navigation-drawer
        v-model="drawer"
        absolute
        temporary
        width="300"
        class="mx-auto"
      >
        <v-list>
          <v-list-item class="hidden-xs-only">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Painel Admin</v-list-item-title>
          </v-list-item>

          <v-divider />

          <v-list-group
            v-for="menus in subMenu"
            :key="menus.title"
            no-action
            :prepend-icon="menus.icon"
          >
            <template v-slot:activator>
              <v-list-item-title>{{ menus.title }}</v-list-item-title>
            </template>
            <v-list-item
              v-for="item in getPerfil"
              v-if="item.title.includes(menus.title)"
              :key="item.title"
              :to="item.path"
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item>
          </v-list-group>
        </v-list>
      </v-navigation-drawer>
    </div>

    <v-content class>
      <router-view />
      <ContentFooter />
    </v-content>
  </v-app>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import ContentFooter from "../Dashboard/ContentFooter";
export default {
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.isLoggedIn ? next() : next("/");
    });
  },
  components: {
    ContentFooter,
  },
  name: "Lob",
  props: ["isLoggedIn"],
  data: () => ({
    drawer: null,
    appTitle: "Admin DashBoard",
    navDrawer: true,
    sidebar: true,
    menu: [{ title: "Produto" }, { title: "Pedidos" }, { title: "Historico" }],
    subMenu: [
      { title: "Usuários" },
      { title: "Produto" },
      { title: "Historico" },
      { title: "Pedidos" },
      { title: "Financeiro" },
    ],
  }),

  computed: mapGetters(["getPerfil"]),
  methods: {
    ...mapActions([]),
  },
};
</script>
