<template>
  <v-app>
    <v-container fluid fill-height class="background d-flex">
      <v-row class="justify-center align-center mx-auto">
        <v-col cols="12" md="6"></v-col>
        <v-col cols="12" md="6">
          <v-container class="">
            <v-row no-gutters class="justify-center align-center">
              <v-card>
                <v-col cols="12"
                  ><v-card-title style="word-break: break-word"
                    ><b class="text-center TitleCard"
                      >Hora de usar o cardapio digital chegou!</b
                    ></v-card-title
                  ></v-col
                >
                <v-col cols="12"
                  ><v-card-subtitle class="text-center mt-n10 SubTitleCard"
                    >Como deseja continuar?</v-card-subtitle
                  ></v-col
                >
                <v-col cols="12"
                  >
                  <v-container>
                    <div id="g_id_onload"
                        data-client_id="YOUR_CLIENT_ID"
                        data-ux_mode="redirect"
                        data-login_uri="https://www.example.com/your_login_endpoint">
                     </div>
                    <div class="g_id_signin" data-type="standard"></div>
                  </v-container>
                  
                  </v-col>

                <v-col cols="12">
                  <v-layout row class="justify-center align-center pb-3 ma-1">
                    <a @click="openDialog()"
                      >Termos de Serviço e Política de privacidade</a
                    >
                  </v-layout>
                </v-col>
              </v-card>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
    <v-dialog v-model="dialog" scrollable v-show="dialog">
      <v-card>
        <v-card-title>Termos de Serviço e Política de privacidade</v-card-title>
        <v-divider></v-divider>
        <v-card-text> um monte de termos sla? </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="blue darken-1" text @click="dialogTerms(false)">
            discordo
          </v-btn>
          <v-btn color="blue darken-1" text @click="dialogTerms(true)">
            concordo
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-app>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { mask } from "vue-the-mask";


export default {
  directives: {
    mask,
  },
  data: () => ({
    loading: false,
    dialog: false,
    isInit: false,
    isSignIn: false,
  }),
  computed: {
    ...mapGetters(["getRespostaUser", "getMessageUser"]),
  },
  methods: {
    ...mapActions(["registrarUser"]),
     onSignIn (user) {
      // do stuff, for exampl
      console.log(user)
    },
    openDialog() {
      this.dialog = true;
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
    mounted(){
    let that = this
    console.log(GoogleAuth)
    console.log(gapi)
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
    
  }
};
</script>
<style>
@import "./login.module.css"; 
</style>
