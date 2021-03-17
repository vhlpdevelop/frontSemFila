<template>
  <v-app>
    <div>
      <v-toolbar class="grey white--text">
        <v-layout align-center justify-center>
          <v-toolbar-title>
            <router-link to="/" tag="span" style="cursor: pointer"
              >Lob</router-link
            >
          </v-toolbar-title>
        </v-layout>
      </v-toolbar>
    </div>

    <v-layout align-center justify-end>
      <v-layout column align-center justify-center>
        <div>
          <h2 class="font-weight-bold">
            MELHORE SEU DESEMPENHO NA HORA DE TRABALHAR
          </h2>
          <ul>
            <li>
              Lob Counter é um sistema feito para medir seu tempo e trabalho,
            </li>
            <li>
              para que você saiba o quanto está ganhando e quanto está perdendo
            </li>
            <li>ao realizar um projeto!</li>
          </ul>
        </div>
      </v-layout>

      <v-layout align-center justify-center>
        <v-card>
          <v-form ref="form">
            <v-container pa-5>
              <v-layout row wrap>
                <v-layout column pa-5>
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
                      v-model="schemaUser.senha"
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
                <v-layout column pa-5>
                  <v-flex xs12 md8>
                    <v-text-field
                      v-model="schemaUser.name"
                      label="Nome completo"
                      :rules="CampoObrigatorio"
                      prepend-icon="mdi-account"
                    />
                  </v-flex>
                  <v-flex xs12 md8>
                    <v-text-field
                      v-model="schemaUser.telefone"
                      label="telefone"
                      :rules="CampoObrigatorio"
                      prepend-icon="mdi-cellphone-iphone"
                    />
                  </v-flex>
                </v-layout>
              </v-layout>

              <v-layout column align-center justify-center>
                <v-checkbox
                  v-model="agreeTerms"
                  :label="`Eu concordo com os`"
                ></v-checkbox>
                <a @click="openDialog()"
                  >Termos de Serviço e Política de privacidade</a
                >

                <v-btn v-show="!loading" @click="confirmar">Confirmar</v-btn>
                <v-progress-circular
                  v-show="loading"
                  indeterminate
                  color="primary"
                />
              </v-layout>
            </v-container>
          </v-form>
        </v-card>
      </v-layout>
    </v-layout>
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
  props: ["id"],
  data: () => ({
    props: ["id"],
    dialog: false,
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
      senha: "",
      telefone: "",
      name: "",
      idEmpresa: "",
      profile: "",
      cargo: "",
      idPerfil: "",
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
      "registrarUserbyInvite",
      "FazerLogin",
    ]),
    openDialog() {
      this.dialog = true;
    },
    dialogTerms(termos) {
      this.dialog = false;
      this.agreeTerms = termos;
    },
    cadastrar() {
      this.registrarUserbyInvite(this.schemaUser).then((response) => {
        if (this.getRespostaUser) {
          console.log("Ok");
          this.snackErro = false;
          this.snackSucesso = true;
          this.snackMsg = this.getMessageUser;
          let object = {
              user: this.schemaUser.email,
              pss: this.schemaUser.senha
          }
          this.FazerLogin(object).then((response) => {
            if (this.getAuth) {
              this.$router.push({
                name: "Página Inicial",
                params: {
                  isLoggedIn: !this.isLoggedIn,
                },
              });
            }
          });
        } else {
          console.log("N ok");
          this.loading = false;
          this.snackErro = true;
          this.snackMsg = this.getMessageUser;
        }
      });
    },
    validateEmail: function (email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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
        if (this.validateEmail(this.confEmail)) {
          if (this.confirmEmails()) {
            if (this.agreeTerms) {
              if (this.confirmSenha === this.schemaUser.senha) {
                this.cadastrar();
              }
            } else {
              this.snackErro = true;
              this.snackMsg =
                "Para cadastrar é necessário concordar com os termos de uso";
              this.loading = false;
            }
          }
        }
      }
    },
  },
  created() {
    this.autenticarbyEmail(this.id).then((response) => {
      if (this.getRespostaUser) {
        this.snackSucesso = true;
        this.snackMsg = this.getMessageUser;
        this.schemaUser = this.getUser;
      } else {
        this.snackErro = true;
        this.snackMsg = this.getMessageUser;
        setTimeout(function(){ 
          this.$router.push({
            name: "Lobby",
            params: {
            isLoggedIn: !this.isLoggedIn,
          },
        }) }.bind(this), 3000);
      }
    });
  },
};
</script>


