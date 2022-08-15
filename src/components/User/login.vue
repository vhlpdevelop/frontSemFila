<template>
  <v-app>
    <v-container fluid fill-height class=" mx-auto d-flex background d-inline-block">
      <v-row
        md="2"
        xs="1"
        sm="1"
        no-gutters
        class="justify-center align-center"
      >
        <v-col></v-col>
        <v-col class="d-flex mx-auto justify-center align-center">
          <v-card
            elevation="2"
            outlined
            shaped
            
            class="pa-3"
          >
            <v-container fluid class="ma-3 align-center justify-center">
              <v-card-title class="TitleCard align-center justify-center">
                NOLINE
              </v-card-title>
              <v-card-subtitle class="TitleCard2 text-center">
                Gerencie suas vendas de forma prática e fácil
              </v-card-subtitle>
            </v-container>

            <v-container fluid pa-5 class="mt-n6">
              Insira o <span class="textImp">email</span>
              <v-text-field
                hide-details
                dense
                label="joao@meuemail.com.br"
                solo
              ></v-text-field>
            </v-container>
            <v-container fluid pa-5>
              Digite sua <span class="textImp">senha</span>
              <v-text-field
                dense
                hide-details
                label="Sua senha"
                type="password"
                solo
              ></v-text-field>
            </v-container>
            <p class="red--text text-center">{{errorMsg}}</p>
            <v-container
              fluid
              class=" pt-1 text-center align-center justify-between mt-n5"
            >
              <v-btn text to="/privacy">Esqueci meu Email </v-btn>
              <v-btn text to="/privacy">Esqueci minha Senha </v-btn>
            </v-container>
            <v-container fluid>
              <p class="recaptcha pa-5 mt-n10">
                Esse site é protegido pelo reCAPTCHA e está sujeito à Política
                de Privacidade e aos Termos de Serviço do Google.
              </p>
            </v-container>
            <v-container pa-5 class="mt-n12 mx-auto">
              <v-btn block class="buttonCategory white--text" @click="loginRapido()">
                Avançar
              </v-btn>
            </v-container>

            <v-container fluid class=" align-center justify-center text-center">
              <p>
                Ainda não possui cadastro?
                <v-btn text to="/signUp" class="pinkyBackground white--text pa-1">Cadastre sua loja!</v-btn>
              </p>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data: () => ({
    user: "",
    pss: "",
    remember: false,
    cancelled: false,
    isLoggedIn: false,
    erro: false,
    erroForm: false,
    loading: false,
    errorMsg: "",
    validacao: [(v) => v.length > 4 || "Campo inválido"],
  }),
  computed: mapGetters(["getAuth", "getMessageLogin"]),
  methods: {
    ...mapActions(["FazerLogin", "pingIt"]),
    async loginRapido() {
      this.pingIt().then((response) => {
        console.log("End");
      });
      this.$router.push({
        name: "dashboard",
        params: {
          isLoggedIn: !this.isLoggedIn,
        },
      });
    },
    async handleSubmit() {
      if (this.$refs.form.validate()) {
        try {
          this.loading = true;
          let data = {
            user: this.user,
            pss: this.pss,
          };
          this.FazerLogin(data).then((response) => {
            if (this.getAuth) {
              this.$router.push({
                name: "dashboard",
                params: {
                  isLoggedIn: !this.isLoggedIn,
                },
              });
            } else {
              this.erro = true;
              this.loading = false;
            }
          });
        } catch (error) {
          this.loading = false;
          this.erro = true;
          throw error;
        }
      } else {
        this.erroForm = true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>

@import "./login.module.css";
</style>
