<template>
  <v-app>
    <v-container fluid fill-height class="mx-auto background d-inline-block">
        
      <v-row no-gutters class="justify-center align-center flex-xl-grow-1" >
        <v-skeleton-loader
            class="mx-auto pa-6 ma-6"
            :boilerplate="true"
            :elevation="2"
            type="article, actions"
            v-if="firstLoad"
            :loadingSkeleton="loading"
          ></v-skeleton-loader>
        <v-col cols="12" >
          <v-row 
          v-show="!firstLoad"
            no-gutters
            xs="1"
            sm="1"
            md="1"
            justify="center"
            align="start"
            class="d-flex flex-xl-grow-1"
          >
            <v-col cols="6" sm="4" lg="6"> </v-col>
            <v-col>
              <v-form ref="form" lazy-validation v-model="valid">
                <v-card
                  outlined
                  elevation="2"
                  class="pa-6 pb-12 flex-xl-grow-1 align-center rounded-xl"
                  style="height: 100%"
                >
                  <v-container fluid class="ma-1 align-center justify-center">
                    <v-card-title
                      class="flex-xl-grow-1 TitleCard align-center justify-center"
                      style="word-break: break-word"
                    >
                      Recuperar a Senha
                    </v-card-title>
                  </v-container>

                  <v-container fluid pa-5 class="mt-n8">
                    Digite sua nova <span class="textImp">Senha</span>
                    <v-text-field
                      dense
                      label="Sua senha"
                      type="password"
                      solo
                      :rules="CampoObrigatorioSenha"
                      v-model="schemaUser.password"
                    ></v-text-field>
                  </v-container>
                  <v-container fluid pa-5 class="mt-n8">
                    Por favor, novamente digite sua nova <span class="textImp">Senha</span>
                    <v-text-field
                      dense
                      type="password"
                      label="Sua senha novamente"
                      solo
                      :rules="CampoObrigatorioSenha"
                      v-model="schemaUser.passwordTester"
                    ></v-text-field>
                  </v-container>

                  <v-container fluid>
                    <p class="recaptcha pa-5 mt-n10">
                      Esse site é protegido pelo reCAPTCHA e está sujeito à
                      Política de Privacidade e aos Termos de Serviço do Google.
                    </p>
                  </v-container>
                  <v-row
                    justify="center"
                    align="center"
                    dense
                    class="mt-n6 mb-3 ml-1"
                  >
                    <v-col
                      cols="12"
                      class="d-flex justify-center align-center pr-3"
                    >
                      <v-btn
                        class="buttonCategory white--text"
                        v-show="!loading"
                        block
                        @click="confirmar"
                        >Alterar Senha</v-btn
                      >
                      <v-progress-circular
                        v-show="loading"
                        indeterminate
                        color="primary"
                      />
                    </v-col>
                    
                  </v-row>
                  <v-snackbar v-model="snackSucesso" color="success">
      <v-layout justify-space-around align-center>{{ snackMsg }}</v-layout>
    </v-snackbar>
    <v-snackbar v-model="snackErro" color="error">
      <v-layout justify-space-around align-center>{{ snackMsg }}</v-layout>
    </v-snackbar>
                </v-card>
              </v-form>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
    
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { mask } from "vue-the-mask";

import mainfooter from "../Dashboard/ContentFooter.vue";

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
    loading_data: false,
    loadingSkeleton: true,
    firstLoad: true,
    valid: false,
    CampoObrigatorioSenha: [
      (v) => !!v || "Por favor, insira sua senha",
      (v) => (v && v.length >= 5) || "Senha fraca",
      (v) => (v && v.length <= 20) || "Tamanho excedido!",
    ],
    snackErro: false,
    snackSucesso: false,
    schemaUser: {
      password: "",
      passwordTester: "",
    },
    snackMsg: "",
    timeout: 5000,
  }),
  computed: {
    ...mapGetters(["getRespostaUser", "getMessageUser"]),
  },
  methods: {
    ...mapActions(["ChangePassword", "verifyTokenPassword"]),
    alterarSenha() {
        let aux = {
            token: this.id,
            schema: this.schemaUser.password,
        }
      this.ChangePassword(aux).then((response) => {
        if (this.getRespostaUser) {
          this.snackErro = false;
          this.snackMsg = this.getMessageUser;
          this.snackSucesso = true;
          setTimeout(
            function (router) {
              router.push({
                name: 'login'
              })
            },
            5000,
            this.$router
          );
        } else {
          this.loading = false;
          this.popError(this.getMessageUser);
        }
      });
    },
    popError(msg) {
      this.snackMsg = msg;
      this.snackErro = true;
      this.loading = false;
    },
    confirmar() {
       
      this.loading = true;
      if (this.$refs.form.validate()) {
        if (this.schemaUser.password === this.schemaUser.passwordTester) {
          this.alterarSenha();
        } else {
          this.popError("Por favor, verifique suas senhas");
        }
      } else {
       
        this.popError("Por favor, Verifique os campos");
      }
    },
  },
  created() {
    
    this.verifyTokenPassword(this.id).then((response) => {
      //Ao criar, verificar
      if (this.getRespostaUser) {
        this.snackSucesso = true;
        this.snackMsg = this.getMessageUser;
        this.loadingSkeleton = false;
        this.firstLoad = false;
        
      } else {
        this.popError(this.getMessageUser);
        /*
        setTimeout(
          function () {
            this.$router.push({
              name: "login",
            });
          }.bind(this),
          3000
        );
        */
      }
    });
  },
};
</script>
<style>
@import "./login.module.css";
</style>
