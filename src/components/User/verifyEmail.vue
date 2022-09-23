<template>
  <v-app>
    <v-parallax src="https://i.ibb.co/t260MTR/5182ae135815275-61eeba8cb745d.jpg">
      <v-row align="center" justify="center" no-gutters>
      <v-col cols="6">
        <v-skeleton-loader
            class="mx-auto pa-6 ma-6"
            :boilerplate="true"
            :elevation="2"
            type="article, actions"
            v-if="firstLoad"
            :loadingSkeleton="loading"
          ></v-skeleton-loader>
        <v-card v-show="!loadingSkeleton" class="card-layout verifyEmail white--text">
          <v-card-text class="my-4 text-center subtitle-1">
            <p><h1 class="verifyEmail ">{{getVerify}}</h1></p>
            <p class="verifyEmail">
              Está pronto para começar usar a <span class="cardVerify">SemFila?</span>
            </p>
            <p class="verifyEmail">
              Clique no botão iniciar para autenticar sua conta.
            </p>
            
          </v-card-text>
          <v-card-actions pa-5>
            <v-layout align-center justify-center pa-2>
            <v-btn v-show="!loading" @click="verifyEmail" color="success" padded :elevation="5">Iniciar</v-btn>
            <v-progress-circular
              v-show="loading"
              indeterminate
              color="primary"
            />
            </v-layout>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    </v-parallax>

    

      
          
     
    
    <v-snackbar v-model="snackSucesso" color="success">
      <v-layout justify-space-around align-center>{{ this.snackMsg }}</v-layout>
    </v-snackbar>
    <v-snackbar v-model="snackErro" color="error">
      <v-layout justify-space-around align-center>{{ this.snackMsg }}</v-layout>
    </v-snackbar>
    <mainfooter/>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
//import mainfooter from "../Resources/main-footer.vue"
import mainfooter from "../Dashboard/ContentFooter.vue"
import { mask } from "vue-the-mask";
export default {
  directives: {
    mask,
  },
  components: {
    mainfooter,
    
  },
  props: ["id"],
  data: () => ({
    loading: false,
    loadingSkeleton: true,
    firstLoad: true,
    snackErro: false,
    snackSucesso: false,
    snackMsg: "",
    timeout: 5000,
  }),
  computed: {
    ...mapGetters(["getRespostaUser", "getMessageUser","getVerify"]),
  },
  methods: {
    ...mapActions(["verify", "sendVerification"]),
    verifyEmail() {
      this.loading = true;
      this.sendVerification(this.id).then((response) => {
        if(this.getRespostaUser){
          this.snackErro = false;
          this.snackMsg = this.getMessageUser;
          this.snackSucesso = true;
          setTimeout(function(){ 
          this.$router.push({
            name: "home",
        }) }.bind(this), 3000);
        }else{
          this.popError(this.getMessageUser)
        }
      });
    },
    popError(msg) {
      this.snackSucesso = false;
      this.snackMsg = msg;
      this.snackErro = true;
      this.loading = false;
    },
  },
  created() {
    console.log(this.id)
    this.verify(this.id).then((response) => {
      //Ao criar, verificar
      if (this.getRespostaUser) {
        this.snackSucesso = true;
        this.snackMsg = this.getMessageUser;
        this.loadingSkeleton = false;
        this.firstLoad = false;
      } else {
        
        this.popError(this.getMessageUser);
        
        setTimeout(function(){ 
          this.$router.push({
            name: "home",
        }) }.bind(this), 3000);
        
        
      }
    });
  },
};
</script>

<style scoped>
   @import "../Dashboard/home.module.css";
  .card-layout{
    background-color:rgb(254,147,140);
  }
  p {
    color:white;
  }
</style>