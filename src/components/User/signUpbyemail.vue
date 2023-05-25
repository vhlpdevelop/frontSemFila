<template>
  <v-app class="backgroundSingUpEmail">
    <v-layout align-center justify-center class="backgroundSingUpEmail">
      <v-form ref="form">
        <v-container pa-5>
          <v-layout row wrap>
            <v-layout column pa-5>
              <b class="text-center TitleCard">Crie sua conta rapidinho</b>
              <v-flex xs12 md8>
                <v-text-field v-model="schemaUser.name" label="Nome Completo" :rules="CampoObrigatorio"
                  color="secondary--text">
                  <template v-slot:prepend>
                    <v-icon color="primary">mdi-account</v-icon>
                  </template>

                </v-text-field>
              </v-flex>
              <v-flex xs12 md8>
                <v-text-field v-model="schemaUser.cpf" label="CPF - obrigatório" :rules="CampoObrigatorio"
                  color="secondary--text">
                  <template v-slot:prepend>
                    <v-icon color="primary">mdi-account</v-icon>
                  </template>

                </v-text-field>
              </v-flex>
              <v-flex xs12 md8>
                <v-text-field v-model="schemaUser.email" label="Digite seu Email" :rules="CampoObrigatorio"
                  color="secondary--text">
                  <template v-slot:prepend>
                    <v-icon color="primary">mdi-email</v-icon>
                  </template>

                </v-text-field>
              </v-flex>
              <v-flex xs12 md8>
                <v-text-field v-model="confEmail" label="Digte novamente seu email" :rules="CampoObrigatorio">
                  <template v-slot:prepend>
                    <v-icon color="primary">mdi-email-check</v-icon>
                  </template>
                </v-text-field>
              </v-flex>
              <!-- CAMPOS SENHA -->
              <v-flex xs12 md8>
                <v-text-field v-model="schemaUser.password" label="Digite sua senha, minimo 6 caracteres"
                  :rules="CampoObrigatorioSenha" type="password">
                  <template v-slot:prepend>
                    <v-icon color="primary">mdi-lock</v-icon>
                  </template>
                </v-text-field>
              </v-flex>
              <v-flex xs12 md8>
                <v-text-field v-model="confirmSenha" label="Confirme a sua senha" :rules="CampoObrigatorioSenha"
                  type="password">
                  <template v-slot:prepend>
                    <v-icon color="primary">mdi-lock-check</v-icon>
                  </template>
                </v-text-field>
              </v-flex>
            </v-layout>
          </v-layout>
          <v-container fluid>
            <p class="recaptcha pa-5 mt-n10 d-none">
              Esse site é protegido pelo reCAPTCHA e está sujeito à Política
              de Privacidade e aos Termos de Serviço do Google.
            </p>
          </v-container>
          <v-layout column align-center justify-center>
            <v-checkbox class="secondary--text" v-model="agreeTerms" :label="`Eu concordo com os`"></v-checkbox>
            <v-layout row class="justify-center align-center mt-n4 pb-3 ma-1">
              <a @click="$router.push((path = '/TermosdeUso'))" class="mr-1">Termos de Serviço</a>
              e
              <a class="ml-1" @click="$router.push((path = '/privacidade'))">Política de privacidade</a>
            </v-layout>

            <v-btn block outlined class="buttonConfirm font-weight-bold" v-show="!loading"
              @click="confirmar">Confirmar</v-btn>
            <v-progress-circular v-show="loading" indeterminate color="primary" />
          </v-layout>
        </v-container>
      </v-form>
    </v-layout>
    <v-snackbar v-model="snackSucesso" color="success">
      <v-layout justify-space-around align-center>{{ snackMsg }}</v-layout>
    </v-snackbar>
    <v-snackbar v-model="snackErro" color="error">
      <v-layout justify-space-around align-center>{{ snackMsg }}</v-layout>
    </v-snackbar>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data: () => ({
    loading: false,
    CampoObrigatorio: [(v) => !!v || "Campo obrigatório!"],
    CampoObrigatorioSenha: [
      (v) => !!v || "Campo obrigatório!",
      (v) => (v && v.length >= 5) || "Senha fraca",
      (v) => (v && v.length <= 20) || "Tamanho excedido!",
    ],
    snackErro: false,
    agreeTerms: false,
    snackSucesso: false,
    schemaUser: {
      email: "",
      password: "",
      name: "",
      cpf: ""
    },
    snackMsg: "",
    confirmSenha: "",
    confEmail: "",
    timeout: 5000,
  }),
  computed: {
    ...mapGetters(["getRespostaUser", "getMessageUser", "getUser", "getAuth"]),
  },
  methods: {
    ...mapActions([
      "registrarUser",
      "autenticarbyEmail",
      "FazerLogin",
      "callSnack",
    ]),
    TestaCPF(strCPF) {
      var Soma;
      var Resto;
      Soma = 0;
      if (strCPF == "00000000000") return false;

      for (let i = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
      Resto = (Soma * 10) % 11;

      if ((Resto == 10) || (Resto == 11)) Resto = 0;
      if (Resto != parseInt(strCPF.substring(9, 10))) return false;

      Soma = 0;
      for (let i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
      Resto = (Soma * 10) % 11;

      if ((Resto == 10) || (Resto == 11)) Resto = 0;
      if (Resto != parseInt(strCPF.substring(10, 11))) return false;
      return true;
    },
    cadastrar() {
      this.registrarUser(this.schemaUser).then((response) => {
        if (this.getRespostaUser) {
          //console.log("Ok");
          this.snackSucesso = true;
          this.snackMsg = this.getMessageUser;
          setTimeout(function (router){
            router.go(-1)
          }, 3000, this.$router)
        } else {
          //console.log("N ok");
          this.loading = false;
          this.snackErro = true;
          this.snackMsg = this.getMessageUser;
        }
      });
    },
    validateEmail: function (email) {
      var re =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },
    confirmEmails() {
      if (this.confEmail === this.schemaUser.email) {
        return true;
      } else {
        return false;
      }
    },
    confirmar() {
      this.loading = true;
      if (!this.TestaCPF(this.schemaUser.cpf)) {
        this.snackMsg =
          "CPF inválido.";
        this.snackErro = true;

        this.loading = false;
        return;
      }
      if(this.schemaUser.name === ""){
        this.snackMsg =
          "Insira o nome.";
        this.snackErro = true;

        this.loading = false;
        return;
      }
      if (this.validateEmail(this.schemaUser.email)) {

        if (this.validateEmail(this.confEmail)) {

          if (this.confirmEmails()) {

            if (this.agreeTerms) {

              if (this.confirmSenha === this.schemaUser.password) {

                this.cadastrar();
              } else {
                this.snackMsg =
                  "Senhas não conferem";
                this.snackErro = true;

                this.loading = false;
              }
            } else {
              this.snackMsg =
                "Para cadastrar é necessário concordar com os termos de uso";
              this.snackErro = true;

              this.loading = false;
            }
          } else {
            this.loading = false;
            this.snackMsg = "Emails diferentes";
            this.snackErro = true;
          }
        } else {
          this.loading = false;
          this.snackMsg = "Email Confirmação Inválido";
          this.snackErro = true;
        }
      } else {
        this.loading = false;
        this.snackMsg = "Email Inválido";
        this.snackErro = true;
      }
    },
  },
};
</script>
