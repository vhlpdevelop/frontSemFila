<template>
  <v-app>
    <v-layout align-center justify-center>
      <v-form ref="form">
        <v-container pa-5>
          <v-layout row wrap>
            <v-layout column pa-5>
              <b class="text-center TitleCard"
                >Crie sua conta rapidinho</b
              >
              <v-flex xs12 md8>
                <v-text-field
                  v-model="schemaUser.email"
                  label="Email"
                  :rules="CampoObrigatorio"
                  prepend-icon="mdi-email"
                />
              </v-flex>
              <v-flex xs12 md8>
                <v-text-field
                  v-model="confEmail"
                  label="Confirmar Email"
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
              <v-flex xs12 md8>
                <v-text-field
                  v-model="confirmSenha"
                  label="Confirmar a senha"
                  :rules="CampoObrigatorioSenha"
                  prepend-icon="mdi-account-lock"
                  type="password"
                />
              </v-flex>
            </v-layout>
          </v-layout>

          <v-layout column align-center justify-center>
            <v-checkbox
              v-model="agreeTerms"
              :label="`Eu concordo com os`"
            ></v-checkbox>
            <v-layout row class="justify-center align-center mt-n4 pb-3 ma-1">
              <a @click="$router.push((path = '/TermosdeUso'))" class="mr-1"
                >Termos de Serviço</a
              >
              e
              <a class="ml-1" @click="$router.push((path = '/privacidade'))"
                >Política de privacidade</a
              >
            </v-layout>
            
            <v-btn block rounded outlined color="#FE938C" v-show="!loading" @click="confirmar">Confirmar</v-btn>
            <v-progress-circular
              v-show="loading"
              indeterminate
              color="primary"
            />
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
    cadastrar() {
      this.registrarUser(this.schemaUser).then((response) => {
        if (this.getRespostaUser) {
          console.log("Ok");
          this.snackSucesso = true;
          this.snackMsg = this.getMessageUser;
        } else {
          console.log("N ok");
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
      if (this.validateEmail(this.schemaUser.email)) {
        console.log("2");
        if (this.validateEmail(this.confEmail)) {
          console.log("3");
          if (this.confirmEmails()) {
            console.log("4");
            if (this.agreeTerms) {
              console.log("5");
              if (this.confirmSenha === this.schemaUser.password) {
                console.log("6");
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
