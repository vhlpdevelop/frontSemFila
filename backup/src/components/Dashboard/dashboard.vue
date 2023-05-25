<template>
  <v-app class="backgroundDash">
    <v-container fluid ma-0 pa-0>
      <v-toolbar flat class="backgroundBDashBoard ml-1 mr-1">
        <v-app-bar-nav-icon
          class="hidden-md-and-up drawerSetting"
          @click.stop="drawer = !drawer"
          
        />

        <v-toolbar-title>
          
          <v-btn text class="navTitleDashBoard ma-1" @click="$router.push({name:'home'})" ><v-avatar size="140"><img :src="logo"></v-avatar></v-btn>
        </v-toolbar-title>
        <v-spacer />

        <div
          v-for="(item, index) in subMenu"
          :key="item.title"
          @click="$router.push({ path: item.path })"
          class="hidden-sm-and-down"
        >
          <a class="hidden-sm-and-down navTitleDashBoard mr-5">
            {{ item.title }}</a
          >
        </div>

        <v-btn
          depressed
          text
          class="ml-5 navTitleDashBoard d-none d-sm-flex d-md-flex d-lg-flex d-xl-flex"
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
        <v-btn v-if="!getAuth" icon fab color="white" @click="pushToLogin" class="rounded-xl d-flex d-sm-none">
          <v-icon>
            mdi-login
          </v-icon>
        </v-btn>

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
            <v-btn text class="navTitleDashBoard" @click="$router.push({name:'home'})"><v-avatar class="ml-n5" size="100"><img :src="logo"></v-avatar></v-btn>
          </v-list-item>
          <v-divider />
          <v-list-item
            v-for="(item, index) in subMenu"
            :key="item.title"
            :to="item.path"
          >
            <v-list-item-title class="navTitleDashBoard">{{
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
    <v-overlay :value="getPaymentCheck"  >
      <v-slide-x-transition v-show="getPaymentCheck" mode="in">
        <v-card
        elevation="12"
        class="pt-6 pb-6 mr-5 ml-5"
        style="background: linear-gradient(90deg, #FC466B 0%, #3F5EFB 100%);"
      >
        <div class="pyro">
          <div class="before"></div>
          <div class="after"></div>
        </div>
        <v-row no-gutters>
          <v-col cols="12" class="d-flex align-center justify-center">
            <p class=" text-justify font-weight-bold text-sm-h6 text-md-h5 text-lg-h6 text-xl-h5"><v-icon fab left> mdi-qrcode</v-icon>Seu QRCODE chegou!<v-icon fab right> mdi-qrcode</v-icon></p>
          </v-col>
          <v-col cols="12" class="mt-6 d-flex align-center justify-center">
            <v-btn
              class="white--text buttonSearch pr-12 pl-12"
              @click="SetPaymentCheck(false)"
            >
              Entendi
            </v-btn>
          </v-col>
          <v-col cols="12" class="mt-4 d-flex align-center justify-center">
            <v-btn
              text
              class="text-decoration-underline"
              style="color: rgb(254, 147, 140) !important;"
              @click="toLink('qrcodes')"
            >
              Ver meus QrCodes
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
      </v-slide-x-transition>
      
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
      { title: "Tornar-me um SemFila", path: "/tornarSemFila" },
      { title: "Carreiras", path: "/carreiras"}
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
      this.$gtag.event('login', { method: 'Google' })
      this.$router.push({
        name: "entrar",
      });
    },
    moveToSettings() {
      this.$router.push({
        name: "config",
      });
    },
    accountLogOut() {
      //Realizar logout
      this.$gtag.event('logout', { method: 'Google' })
      this.LogOut().then((response) => {
        this.logged = false;
      });
    },
  },
  created() {
    document.title = "SemFila";
    if(!this.getAuth){
      this.autoLogin().then(() => {
      if (this.getAuth) {
        this.logged = true;
      }
    });
    }else{
      this.logged=true;
    }

  },
};
</script>
<style lang="scss">
$particles: 60;
$width: 500;
$height: 400;

// Create the explosion...
$box-shadow: ();
$box-shadow2: ();
@for $i from 0 through $particles {
  $box-shadow: $box-shadow,
    random($width)-$width /
      2 +
      px
      random($height)-$height /
      1.2 +
      px
      hsl(random(360), 100, 50);
  $box-shadow2: $box-shadow2, 0 0 #fff;
}
@mixin keyframes($animationName) {
  @-webkit-keyframes #{$animationName} {
    @content;
  }

  @-moz-keyframes #{$animationName} {
    @content;
  }

  @-o-keyframes #{$animationName} {
    @content;
  }

  @-ms-keyframes #{$animationName} {
    @content;
  }

  @keyframes #{$animationName} {
    @content;
  }
}

@mixin animation-delay($settings) {
  -moz-animation-delay: $settings;
  -webkit-animation-delay: $settings;
  -o-animation-delay: $settings;
  -ms-animation-delay: $settings;
  animation-delay: $settings;
}

@mixin animation-duration($settings) {
  -moz-animation-duration: $settings;
  -webkit-animation-duration: $settings;
  -o-animation-duration: $settings;
  -ms-animation-duration: $settings;
  animation-duration: $settings;
}

@mixin animation($settings) {
  -moz-animation: $settings;
  -webkit-animation: $settings;
  -o-animation: $settings;
  -ms-animation: $settings;
  animation: $settings;
}

@mixin transform($settings) {
  transform: $settings;
  -moz-transform: $settings;
  -webkit-transform: $settings;
  -o-transform: $settings;
  -ms-transform: $settings;
}

body {
  margin: 0;
  padding: 0;
  background: #003366;
  overflow: hidden;
}

.pyro > .before,
.pyro > .after {
  position: absolute;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  box-shadow: $box-shadow2;
  @include animation(
    (
      1s bang ease-out infinite backwards,
      1s gravity ease-in infinite backwards,
      5s position linear infinite backwards
    )
  );
}

.pyro > .after {
  @include animation-delay((1.25s, 1.25s, 1.25s));
  @include animation-duration((1.25s, 1.25s, 6.25s));
}

@include keyframes(bang) {
  to {
    box-shadow: $box-shadow;
  }
}

@include keyframes(gravity) {
  to {
    @include transform(translateY(200px));
    opacity: 0;
  }
}

@include keyframes(position) {
  0%,
  19.9% {
    margin-top: 10%;
    margin-left: 40%;
  }
  20%,
  39.9% {
    margin-top: 40%;
    margin-left: 30%;
  }
  40%,
  59.9% {
    margin-top: 20%;
    margin-left: 70%;
  }
  60%,
  79.9% {
    margin-top: 30%;
    margin-left: 20%;
  }
  80%,
  99.9% {
    margin-top: 30%;
    margin-left: 80%;
  }
}
</style>
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
