<template>
  <v-app style="background-color: rgb(245, 245, 245) !important;">
    <v-container fluid ma-0 pa-0>
      <v-toolbar flat class="backgroundB rounded-xl ml-1 mr-1 elevation-5">
        <v-app-bar-nav-icon
          class="hidden-md-and-up"
          @click.stop="drawer = !drawer"
        />

        <v-toolbar-title>
          
          <v-btn text class="navTitle ma-1" @click="$router.push({name:'home'})" ><v-avatar ><img :src="logo"></v-avatar>SemFila</v-btn>
        </v-toolbar-title>
        <v-spacer />

        <div
          v-for="(item, index) in subMenu"
          :key="item.title"
          @click="$router.push({ path: item.path })"
          class="hidden-sm-and-down"
        >
          <v-btn text depressed class="hidden-sm-and-down navText">
            {{ item.title }}</v-btn
          >
        </div>

        <v-btn
          depressed
          text
          class="ml-5 navTitle d-none d-sm-flex d-md-flex d-lg-flex d-xl-flex"
          to="/entrar"
          v-if="!logged"
          >criar conta</v-btn
        >
        <v-btn
          raised
          class="navButtonEntrar white--text mr-5 d-none d-sm-flex d-md-flex d-lg-flex d-xl-flex"
          to="/entrar"
          v-if="!logged"
          >Entrar</v-btn
        >

        <span
          v-if="logged"
          class="d-none d-sm-flex d-md-flex d-lg-flex d-xl-flex"
        >
          <v-menu>
            <template v-slot:activator="{ on }">
              <v-list-item v-show="logged" v-on="on">
                <v-list-item-title class="navSubMenu"
                  >{{ getPerfil }}
                  <v-icon left color="green"
                    >mdi-account</v-icon
                  ></v-list-item-title
                >
              </v-list-item>
              <v-list-item @click="pushToLogin" v-show="!logged">
                <v-list-item-title class="navSubMenu">Entrar</v-list-item-title>
              </v-list-item>
            </template>
            <v-list shaped>
              <v-list-item-group>
                <v-list-item
                  @click="toLink('qrcodes')"
                  class="mb-1 text-center"
                >
                  <h1 class="navSubMenu">Meus QrCodes</h1>
                  <v-list-item-icon>
                    <v-badge
                      :content="getQrcodesSize.toString()"
                      value="2"
                      color="green"
                      overlap
                    >
                      <v-icon>mdi-qrcode</v-icon>
                    </v-badge>
                  </v-list-item-icon>
                </v-list-item>
                <v-list-item @click="moveToSettings()">
                  <v-list-item-icon
                    ><v-icon v-text="'mdi-cog'"></v-icon
                  ></v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title
                      v-text="'Configurações'"
                    ></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-divider></v-divider>

                <v-list-item @click="accountLogOut()">
                  <v-list-item-icon>
                    <v-icon v-text="'mdi-logout'"></v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title v-text="'Sair'"></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-menu>
        </span>
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
              <v-icon style="color: rgb(55, 80, 92) !important"
                >mdi-home</v-icon
              >
            </v-list-item-icon>
            <v-btn text class="navTitle" @click="$router.push({name:'home'})">SEMFILA</v-btn>
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
          <v-menu>
            <template v-slot:activator="{ on }">
              <v-list-item v-show="logged" v-on="on">
                <v-list-item-title class="navSubMenu"
                  >{{ getPerfil }}
                  <v-icon left color="green"
                    >mdi-account</v-icon
                  ></v-list-item-title
                >
              </v-list-item>
              <v-list-item @click="pushToLogin" v-show="!logged">
                <v-list-item-title class="navSubMenu">Entrar</v-list-item-title>
              </v-list-item>
            </template>
            <v-list shaped>
              <v-list-item-group>
                <v-list-item
                  @click="toLink('qrcodes')"
                  class="mb-1 text-center"
                >
                  <h1 class="navSubMenu">Meus QrCodes</h1>
                  <v-list-item-icon>
                    <v-badge
                      :content="getQrcodesSize.toString()"
                      value="2"
                      color="green"
                      overlap
                    >
                      <v-icon>mdi-qrcode</v-icon>
                    </v-badge>
                  </v-list-item-icon>
                </v-list-item>
                <v-list-item @click="moveToSettings()">
                  <v-list-item-icon
                    ><v-icon v-text="'mdi-cog'"></v-icon
                  ></v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title
                      v-text="'Configurações'"
                    ></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-divider></v-divider>

                <v-list-item @click="accountLogOut()">
                  <v-list-item-icon>
                    <v-icon v-text="'mdi-logout'"></v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title v-text="'Sair'"></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-menu>
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
    </v-container>

    <v-container ma-0 pr-0 pl-0 fluid class="mx-auto">
      <transition name="slide-fade">
        <router-view class="view" />
      </transition>
    </v-container>
      
    
    <ContentFooter ma-0 pr-0 pl-0 fluid class="mx-auto" />
    <v-overlay
      :z-index="zIndex"
      :value="getPaymentCheck"
    >
      <p color="white">Seu QRCODE chegou!</p>
      <v-btn
        class="white--text"
        color="teal"
        @click="SetPaymentCheck(false)"
      >
        Entendi
      </v-btn>
    </v-overlay>
  </v-app>
</template>

<script>
import { mapActions, mapGetters, mapMutations} from "vuex";
import ContentFooter from "../Dashboard/ContentFooter";
export default {
  components: {
    ContentFooter,
  },
  name: "NoLine",
  data: () => ({
    zIndex: 0,
    drawer: null,
    appTitle: "NoLine - Sem Fila",
    navDrawer: true,
    sidebar: true,
    logged: false,
    logo: require("../../img/semfila-tag-semfundo.png"),
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

  computed: mapGetters(["getPaymentCheck","getPerfil", "getAuth", "getQrcodesSize"]),
  methods: {
    ...mapActions(["LogOut", "autoLogin"]),
    ...mapMutations(["SetPaymentCheck"]),
    toLink(name) {
      ////console.log(name);
      this.$router.push({
        //arrumar os props
        name: name,
      });
    },
    pushToLogin() {
      this.$router.push({
        name: "entrar",
      });
    },
    moveToSettings() {
      this.$router.push({
        name: "settings",
      });
    },
    accountLogOut() {
      //Realizar logout
      this.LogOut().then((response) => {
        this.logged = false;
      });
    },
  },
  created() {
    document.title = "SemFila";
    this.autoLogin().then(() => {
      if (this.getAuth) {
        this.logged = true;
      }
    });
  },
};
</script>

<style>
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
@import "./dashboard.module.css";
</style>
