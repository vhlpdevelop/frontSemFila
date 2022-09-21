<template>
  <v-app>
    <v-layout
      class="justify-sm-center justify-md-center justify-lg-center justify-xl-center align-sm-center align-md-center align-lg-center align-xl-center"
    >
      <v-container ma-0 pa-0>
        <v-layout row class="no-gutters">
          <v-layout column pa-5>
            <b class="text-center TitleCard">Como deseja pular a fila?</b>
            <v-flex xs12 md8>
              <v-text-field
                v-model="schemaUser.email"
                label="Email"
                :rules="CampoObrigatorio"
                prepend-icon="mdi-email"
              />
            </v-flex>
            <!-- CAMPOS SENHA -->
            <v-flex xs12 md8>
              <v-text-field
                v-model="schemaUser.password"
                label="Senha"
                :rules="CampoObrigatorioSenha"
                prepend-icon="mdi-account-lock"
                type="password"
              />
            </v-flex>
          </v-layout>
        </v-layout>

        <v-layout column align-center justify-center>
          <v-btn v-show="!loading" @click="confirmar">Confirmar</v-btn>
          <v-progress-circular v-show="loading" indeterminate color="primary" />
        </v-layout>
      </v-container>
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
    },
    snackMsg: "",
    confirmSenha: "",
    confEmail: "",
    timeout: 5000,
  }),
  computed: {
    ...mapGetters(["getMessageLogin", "getUser", "getAuth"]),
  },
  methods: {
    ...mapActions(["FazerLogin", "callSnack"]),
    async login() {
      this.FazerLogin(this.schemaUser).then((response) => {
        if (this.getAuth) {
          console.log("Ok");
          this.snackSucesso = true;
          this.snackMsg = this.getMessageLogin;
          setTimeout(function (router){
            router.go(-1)
          }, 3000, this.$router)
        } else {
          console.log("N ok");
          this.loading = false;
          this.snackErro = true;
          this.snackMsg = this.getMessageLogin;
          
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
      if (this.validateEmail(this.schemaUser.email)) {
        if (this.schemaUser.password !== "") {
            this.login()
        } else {
          this.loading = false;
          this.snackMsg = "Senha vazia";
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
