<template>
  <v-app>
    <mainHeader/>
    <v-layout align-center justify-end>
      <v-layout column align-center justify-center>
        <div>
          <h2 class="font-weight-bold">
            ESTÁ PRONTO PARA AUMENTAR SUA PRODUTIVIDADE?
          </h2>
          <ul>
            <li>Ter o controle necessário e organização dos seus projetos</li>
            <li>Pronto para começar? clique no botão iniciar</li>
          </ul>
        </div>
      </v-layout>

      <v-layout align-center justify-center>
          <v-skeleton-loader
            class="mx-auto mb-6"
            :boilerplate="true"
            :elevation="2"
            type="card-avatar, article, actions"
            v-if="firstLoad"
            :loadingSkeleton="loading"
          ></v-skeleton-loader>
        <v-card v-show="!loadingSkeleton" class="card-layout">
          <v-card-text class="my-4 subtitle-1">
            
            <p>
              Aperte no botão Iniciar abaixo para
            </p>
            <p>
              autenticar sua conta.
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
      </v-layout>
    </v-layout>
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
import mainfooter from "../Resources/main-footer.vue"
import mainHeader from "../Resources/mainHeader.vue"
import { mask } from "vue-the-mask";
export default {
  directives: {
    mask,
  },
  components: {
    mainfooter,
    mainHeader
  },
  props: ["id"],
  data: () => ({
    props: ["id"],
    loading: false,
    loadingSkeleton: true,
    firstLoad: true,
    snackErro: false,
    snackSucesso: false,
    snackMsg: "",
    timeout: 5000,
  }),
  computed: {
    ...mapGetters(["getRespostaUser", "getMessageUser"]),
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
            name: "painel produtos",
            params: {
            isLoggedIn: !this.isLoggedIn,
          },
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
            name: "Lob",
        }) }.bind(this), 3000);
      }
    });
  },
};
</script>

<style scoped>
  .card-layout{
    background: #588EE0;
  }
  p {
    color:white;
  }
</style>