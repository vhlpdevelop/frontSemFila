<template>
  <v-app>
    <v-container fluid fill-height class="mx-auto background d-inline-block">
      <v-row no-gutters class="justify-center align-center flex-xl-grow-1">
        <v-col cols="12">
          <v-row
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
                      class="flex-xl-grow-1 TitleCard text-truncate align-center justify-center"
                    >
                      Recuperar a Senha
                    </v-card-title>
                  </v-container>

                  <v-container fluid pa-5 class="mt-n8">
                    Digite seu <span class="textImp">Email</span>
                    <v-text-field
                      dense
                      label="joao@email.com.br"
                      solo
                      :rules="emailRules"
                      v-model="schemaUser.email"
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
                        >Recuperar senha</v-btn
                      >
                      <v-progress-circular
                        v-show="loading"
                        indeterminate
                        color="primary"
                      />
                    </v-col>
                    <v-col cols="12" class="d-flex justify-center align-center">
                      <v-btn text outlined color="primary" block to="/entrar">
                        Já tenho uma conta
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-card>
              </v-form>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
    <v-snackbar v-model="snackSucesso" color="success">
      <v-layout justify-space-around align-center>{{ this.snackMsg }}</v-layout>
    </v-snackbar>
    <v-snackbar v-model="snackErro" color="error">
      <v-layout justify-space-around align-center>{{ this.snackMsg }}</v-layout>
    </v-snackbar>
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
    valid: false,
    emailRules: [
      (v) => !!v || "Por favor, digite o seu E-mail.",
      (v) =>
        /.+@.+/.test(v) ||
        "Por favor, seu E-mail precisa estar correto. exemplo: semfila@semfila.semfila",
    ],
    snackErro: false,
    snackSucesso: false,
    schemaUser: {
      email: "",
    },
    snackMsg: "",
    timeout: 5000,
  }),
  computed: {
    ...mapGetters(["getRespostaUser", "getMessageUser"]),
  },
  methods: {
    ...mapActions(["sendRecoveryPssToken"]),
    esqueciSenha() {
      //console.log("6");
      this.sendRecoveryPssToken(this.schemaUser).then((response) => {
        if (this.getRespostaUser) {
          this.snackErro = false;
          this.snackMsg = this.getMessageUser;
          this.snackSucesso = true;
          setTimeout(
            function (router) {
              router.go(-1);
            },
            5000,
            this.$router
          );
        } else {
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
      if(!this.$refs.form.validate()) {
        this.popError("Por favor, Verifique os campos");
        return ;
      }
      this.esqueciSenha();
    
    },
  },
};
</script>
<style>
@import "./login.module.css";
</style>
