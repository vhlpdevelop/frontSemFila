<template>
  <v-app class="">
    <v-container fluid fill-height class="pa-5 backgroundCompra d-flex align-start justify-center">
      <v-row>
        <v-col cols="12" md="10" lg="10" xl="10">
          <v-card tile elevation="10">
            <v-card-title style="word-break: break-word" class="text-center black--text">Selecione o tipo de
              Pagamento</v-card-title>
            <v-row class="pa-5">
              <v-col cols="12" md="6">
                <v-expansion-panels>
                  <v-expansion-panel>
                    <v-expansion-panel-header class="checkOut">
                      Pagar com pix
                      <v-icon class="checkOut" small right>mdi-clover</v-icon>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <p>
                        <b>As informações devem aparecer:</b>
                      </p>
                      <v-row no-gutters>
                        <v-col cols="12" md="6">
                          <p>
                            <b>Empresa: SEM FILA </b>
                          </p>
                        </v-col>
                        <v-col cols="12" md="6">
                          <p>
                            <b>CNPJ: 40.470.307/0001-43 </b>
                          </p>
                        </v-col>
                        <v-col cols="12" md="6">
                          <p>
                            <b>Banco Gerencianet 364 </b>
                          </p>
                        </v-col>
                        <v-col cols="12" md="6">
                          <p>
                            <b>Conta: 410302-5 </b>
                          </p>
                        </v-col>
                        <v-col cols="12" md="6">
                          <p>
                            Verifique o Valor antes de realizar o pagamento.
                          </p>
                        </v-col>
                      </v-row>

                      <v-container fluid v-if="!getAuth">
                        <v-row class="d-flex align-center justify-center">
                          <v-col cols="12" sm="12" md="6" lg="6" xl="6" class="d-flex align-center justify-center">
                            <v-text-field v-model="nome" label="Nome Completo" :rules="CampoObrigatorio"
                              color="secondary--text">
                              <template v-slot:prepend>
                                <v-icon color="primary">mdi-account</v-icon>
                              </template>

                            </v-text-field>
                          </v-col>
                          <v-col cols="12" sm="12" md="6" lg="6" xl="6" class="d-flex align-center justify-center">
                            <v-text-field v-model="cpf" label="CPF" :rules="CampoObrigatorio"
                              color="secondary--text">
                              <template v-slot:prepend>
                                <v-icon color="primary">mdi-account</v-icon>
                              </template>

                            </v-text-field>
                          </v-col>
                        </v-row>
                      </v-container>
                      <p>
                        Ao clicar no botão pagar, nesta tela irá mostar o codigo
                        de pagamento pix. Copie e cole no seu aplicativo de
                        banco para realizar o pagamento.
                      </p>


                      <v-row align="center" justify="center">
                        <v-col cols="10"><v-btn @click="payment('PIX')" v-show="ButtonToggle" outlined rounded
                            class="buttonColor pr-6 pl-6">Pagar com pix</v-btn></v-col>
                        <v-col cols="10"><v-progress-circular v-show="loading"
                            indeterminate></v-progress-circular></v-col>
                        <v-col cols="10"><v-container fluid fill-height v-show="pixReady"
                            style="background-color: lightgray" class="mt-2 align-center justify-center">
                            <p>Codigo pix gerado</p>

                            <v-btn class="ma-5" text x-small @click="copyCode()"><v-subheader>Pix copie e
                                cole</v-subheader><v-icon>mdi-clipboard</v-icon></v-btn>


                          </v-container></v-col>
                      </v-row>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-col>
              <v-col cols="12" md="6">
                <v-expansion-panels>
                  <v-expansion-panel>
                    <v-expansion-panel-header>
                      Cartão de Crédito
                      <v-icon small right>mdi-credit-card</v-icon>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                      Sentimos muito, mas ainda não terminamos de implementar
                      este pagamento. Por enquanto temos apenas pagamento por
                      PIX.
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-col>

              <v-spacer></v-spacer>
            </v-row>
          </v-card>
        </v-col>
        <v-snackbar v-model="snackSucesso" color="success">
          <v-layout justify-space-around align-center>{{ snackMsg }}</v-layout>
        </v-snackbar>
        <v-snackbar v-model="snackErro" color="error">
          <v-layout justify-space-around align-center>{{ snackMsg }}</v-layout>
        </v-snackbar>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  data: () => ({
    loading: false,
    pixReady: false,
    pixCode: "",
    error: "",
    timeout: 5000,
    loadingFrete: false,
    snackSucesso: false,
    snackErro: false,
    snackMsg: "",
    total: 0,
    ButtonToggle: true,
    nome: "",
    cpf: "",
    CampoObrigatorio: [(v) => !!v || "Campo obrigatório!"],
    desconto: 0,
    user: {
      endereco: {
        rua: "",
        num: "",
        cep: "",
        complemento: "",
        bairro: "",
        estado: "",
        cidade: "",
      },
    },
    rules: {
      required: (value) => !!value || "Campo necessário",
      min: (v) => (v && v.length >= 6) || "Minimo 6 caracteres",
      minCep: (v) =>
        (v && v.length >= 8 && v.length < 9) || "Minimo 8 caracteres",
      minEstado: (v) =>
        (v && v.length >= 2 && v.length < 3) || "Minimo 2 caracteres",
    },
  }),
  computed: {
    ...mapGetters([
      "getRespostaUser",
      "getUser",
      "getAuth",
      "getStatus",
      "getPlan",
      "getCart",
      "getCardapio",
    ]),
  },
  methods: {
    ...mapActions(["getProfile", "PaymentCheck", "clearCart", "updateProfile"]),
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
    async copyCode() {

      try {
        await navigator.clipboard
          .writeText(this.pixCode)
          .then(() => {
            alert("Texto Copiado");
          })
          .catch(() => {
            alert("Algo deu errado");
          });
      } catch (e) {
        this.error = e.message;
      }

      this.snackMsg = "Codigo Copiado";
      this.snackSucesso = true;
    },
    payment(type) {
      if (!this.getAuth) { //NÃO ESTA AUTENTICADO, VERIFICAR SE CAMPO NOME E CPF ESTÃO PREENCHIDOS E CORRETOS.
        if (!this.TestaCPF(this.cpf)) {
          this.snackSucesso = false;
          this.snackMsg = "CPF inválido."
          this.snackErro = true;
          return;
        }

        if (this.nome === "") {
          this.snackSucesso = false;
          this.snackMsg = "Nome vazio."
          this.snackErro = true;
          return;
        }

      }
      if (this.getCart.length > 0) {
        this.ButtonToggle = false;
        this.loading = true;

        //console.log(this.getUser);
        var object = {
          cart: this.getCart,
          user: 0,
          company_id: this.getCardapio.store.company_id,
          store_id: this.getCardapio.store._id,
          nome: this.nome,
          cpf: this.cpf
        };
        if (type === "PIX") {
          object.type = type;
          //console.log(object);
          //console.log("Aqui")
          this.PaymentCheck(object).then((response) => {
            //console.log("Flag")
            //console.log(this.getStatus)
            if (this.getStatus) {
              this.snackSucesso = true;
              this.snackMsg = "Código pix gerado";

              this.loading = false;
              this.pixReady = true;
              this.clearCart();
              this.pixCode = this.getPlan;
              //window.location.href = this.getPlan.url;
            } else {
              this.pixReady = false;
              this.loading = false;
              this.snackMsg = "Ocorre um erro ao gerar o pix";
              this.snackErro = true;
            }
          });
        } else {
          //CREDITO
        }
      } else {
        //CARRINHO VAZIO, não liberar
        this.snackMsg = "Carrinho vazio";
        this.snackErro = true;
      }
    },
  },
  created() {
    //Checar se o token é valido
    this.getProfile().then(() => {
      if (this.getRespostaUser) {
        //Se o usuário tiver logado...
      } else {
        //TRATAR ISSO!
        //console.log("ERROR");
      }
    });
  },
};
</script>
<style>
@import "./compra.module.css";
</style>
