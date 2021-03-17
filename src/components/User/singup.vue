<template>
  <v-app>
    <mainHeader/>

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
import mainHeader from "../Resources/mainHeader"
export default {
  directives: {
    mask,
  },
  components:{
    mainHeader
  },
  data: () => ({
    loading: false,
    dialog: false,
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
      email: null,
      senha: null,
      telefone: null,
      name: null,
    },
    snackMsg: "",
    confirmSenha: null,
    confEmail: null,
    timeout: 5000,
  }),
  computed: {
    ...mapGetters(["getRespostaUser", "getMessageUser"]),
  },
  methods: {
    ...mapActions(["registrarUser"]),
    openDialog() {
      this.dialog = true;
    },
    dialogTerms(termos) {
      this.dialog = false;
      this.agreeTerms = termos;
    },
    terms() {
      this.$router.push({
        name: "Termos",
      });
    },
    cadastrar() {
      //console.log("6");
      this.registrarUser(this.schemaUser).then((response) => {
        if (this.getRespostaUser.ok) {
          this.snackErro = false;
          this.snackMsg = this.getRespostaUser.msg;
          this.snackSucesso = true;
          this.$router.push({
            name: "Página Inicial",
            params: {
              isLoggedIn: !this.isLoggedIn,
            },
          });
        } else {
          this.loading = false;
          this.popError(this.getMessageUser);
        }
      });
    },
    validateEmail: function (email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },
    popError(msg) {
      this.snackMsg = msg;
      this.snackErro = true;
      this.loading = false;
    },
    confirmar() {
      this.loading = true;
      if (this.validateEmail(this.schemaUser.email)) {
        if (this.schemaUser.name) {
          if (this.schemaUser.telefone) {
            if (this.validateEmail(this.confEmail)) {
              if (this.agreeTerms) {
                if (this.schemaUser.email === this.confEmail) {
                  if (this.confirmSenha === this.schemaUser.senha) {
                    this.cadastrar();
                  } else {
                    this.popError("Senhas incorretas");
                  }
                } else {
                  this.popError("Emails inseridos não são os mesmos");
                }
              } else {
                this.popError("Você não concordou com os termos");
              }
            } else {
              this.popError("Email inválido");
            }
          } else {
            this.popError("Campo telefone não inserido");
          }
        } else {
          this.popError("Campo nome não inserido");
        }
      } else {
        this.popError("Email inválido");
      }
    },
  },
};
</script>


