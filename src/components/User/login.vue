<template>
  <v-app>
    <v-container ma-0 pa-0 fluid fill-height class="d-flex ">
      <v-row class="justify-center align-center mx-auto ">
        <v-col cols="12" md="6" class="background containerSpace"><v-container fluid fill-height ma-0 pa-0 ></v-container></v-col>
        <v-col cols="12" md="6" class="backgroundColor">
          <v-container ma-0 pa-0  fluid fill-height class="justify-center align-center containerSpace">
            <v-row no-gutters class="justify-center align-center ">
              <v-card class="backgroundSingUpEmail">
                <v-col cols="12" v-if="select">
                  <v-btn text block v-if="createAccount" @click="backSignIn"
                    ><v-icon small>mdi-arrow-left</v-icon>Voltar</v-btn
                  >
                  <v-btn text block v-if="loginAccount" @click="backSignIn"
                    ><v-icon small>mdi-arrow-left</v-icon>Voltar</v-btn
                  >
                </v-col>

                <v-col cols="12" v-if="!select"
                  ><v-card-title style="word-break: break-word"
                    ><b class="text-center TitleCard"
                      >Hora de usar o cardapio digital chegou!</b
                    ></v-card-title
                  ></v-col
                >

                <signIn v-if="loginAccount"></signIn>
                <signUp v-if="createAccount"></signUp>

                <v-col cols="12"  v-if="!select"
                  ><v-card-subtitle
                   
                    class="text-center black--text mt-n10 SubTitleCard"
                    >Como deseja continuar?</v-card-subtitle
                  ></v-col
                >

                <v-col cols="12" v-if="!select">
                  <v-container>
                    <v-btn class="black--text font-weight-bold" block text outlined @click="openEmail(false)"
                      >Entrar com Email</v-btn
                    >
                  </v-container>
                  <v-container>
                    <v-btn block text class="black--text font-weight-bold" @click="openEmail(true)"
                      >Criar minha conta</v-btn
                    >
                  </v-container>
                </v-col>
                <v-col cols="12" v-if="!select">
                  <v-container>
                    <div
                      id="g_id_onload"
                      data-client_id="YOUR_CLIENT_ID"
                      data-ux_mode="redirect"
                      data-login_uri="https://www.example.com/your_login_endpoint"
                    ></div>
                    <div class="g_id_signin" data-type="standard"></div>
                  </v-container>
                </v-col>
                <v-col cols="12" v-if="!select" v-show="!select">
                  <v-layout
                    column
                    class="justify-center align-center pb-3 ma-1"
                  >
                    <a @click="$router.push((path = '/TermosdeUso'))"
                      >Termos de Serviço</a
                    >
                    <a @click="$router.push((path = '/privacidade'))"
                      >Política de privacidade</a
                    >
                  </v-layout>
                </v-col>
              </v-card>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import signUp from "./signUpbyemail.vue";
import signIn from "./signInbyemail.vue";
export default {
  metaInfo() {
        return { 
            title: "Faça parte da SemFila",
            titleTemplate: '%s | Entrar',
            meta: [
                { name: 'description', content:  'Crie uma conta simples e utilize tudo!'},           
            ]
        }
    },
  components: {
    signUp,
    signIn,
  },
  data: () => ({
    loading: false,
    select: false,
    Email: false,
    Google: false,
    createAccount: false,
    loginAccount: false,
    dialog: false,
    isInit: false,
    isSignIn: false,
    snackMsg: "",
    timeout: 5000,
  }),
  computed: {
    ...mapGetters(["getRespostaUser", "getMessageUser"]),
  },
  methods: {
    ...mapActions(["registrarUser"]),
    backSignIn() {
      this.createAccount = false;
      this.loginAccount = false;
      this.select = false;
    },
    onSignIn(user) {
      // do stuff, for exampl
      console.log(user);
    },
    openEmail(type) {
      if (type) {
        this.createAccount = type;
      } else {
        this.loginAccount = true;
      }

      this.select = true;
    },
    terms() {
      this.$router.push({
        name: "Termos",
      });
    },
    popError(msg) {
      this.snackMsg = msg;
      this.snackErro = true;
      this.loading = false;
    },
  },
  mounted() {
    let that = this;
    console.log(GoogleAuth);
    console.log(gapi);
    /*
    gapi.signin2.render('google-signin-btn', { // this is the button "id"
      cookiePolicy: 'single_host_origin',
      isSignIn: true,
      onsuccess: this.onSignIn,
      onfailure: this.onSignIn,
       // note, no "()" here
    })
    let checkGauthLoad = setInterval(function(){
      that.isInit = that.$gAuth.isInit
      that.isSignIn = that.$gAuth.isAuthorized
      if(that.isInit) clearInterval(checkGauthLoad)
    }, 1000);
    */
  },
};
</script>
<style>
@import "./login.module.css";
</style>
