<template>
  <v-app>
    <v-container fluid class="pa-5">
      <v-row justify="center">
        <v-col cols="12" md="6">
          <v-card>
            <v-card>
              <v-card-title style="word-break: break-word" class="text-center"
                >Selecione o tipo de pagamento</v-card-title
              >
              <v-row class="pa-5">
                <v-col cols="12" md="6">
                  <v-expansion-panels>
                    <v-expansion-panel>
                      <v-expansion-panel-header>
                        Pagar com pix <v-icon small right>mdi-clover</v-icon>
                      </v-expansion-panel-header>
                      <v-expansion-panel-content>
                        <p>
                          <b>Tipo de chave: CNPJ</b>
                        </p>
                        <p>
                          <b>Número: 000.000.000/0001-00</b>
                        </p>
                        <p>
                          Ao clicar no botão pagar, nesta tela irá mostar o
                          codigo de pagamento pix. Copie e cole no seu
                          aplicativo de banco para realizar o pagamento.
                        </p>
                        <v-row align="center" justify="center">
                          <v-col cols="10"
                            ><v-btn
                              @click="payment('PIX')"
                              v-show="ButtonToggle"
                              outlined
                              >Pagar com pix</v-btn
                            ></v-col
                          >
                          <v-col cols="10"
                            ><v-progress-circular
                              v-show="loading"
                              indeterminate
                            ></v-progress-circular
                          ></v-col>
                          <v-col cols="10"
                            ><div
                              v-show="pixReady"
                              style="background-color: lightgray"
                              class="mt-2"
                            >
                              <p>{{ pixCode }}</p>
                            </div></v-col
                          >
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
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat.
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </v-col>

                <v-spacer></v-spacer>
              </v-row>
            </v-card>
          </v-card>
        </v-col>
        <v-snackbar v-model="snackSucesso" color="success">
      <v-layout justify-space-around align-center>{{snackMsg}}</v-layout>
    </v-snackbar>
    <v-snackbar v-model="snackErro" color="error">
      <v-layout justify-space-around align-center>{{snackMsg}}</v-layout>
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
    pixCode: "123123ABC",
    timeout: 5000,
    loadingFrete: false,
    snackSucesso: false,
    snackErro: false,
    snackMsg: "",
    total: 0,
    ButtonToggle: true,
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
  mounted() {
    let mercadopago = document.createElement("script");
    mercadopago.setAttribute("id", "mercadopago");
    mercadopago.setAttribute(
      "src",
      "https://secure.mlstatic.com/sdk/javascript/v1/mercadopago.js"
    );
    document.head.appendChild(mercadopago);
  },
  computed: {
    ...mapGetters([
      "getRespostaUser",
      "getUser",
      "getStatus",
      "getPlan",
      "getCart",
      "getCardapio",
    ]),
  },
  methods: {
    ...mapActions(["getProfile", "PaymentCheck", "clearCart", "updateProfile"]),
    payment(type) {
      if (this.getCart.length > 0) {
        this.ButtonToggle = false;
        this.loading = true;
        this.snackAlert = false;
        //console.log(this.getUser);
        var object = {
          cart: this.getCart,
          user: 0,
          company_id: this.getCardapio.store.company_id,
          store_id: this.getCardapio.store._id,
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
              this.snackMsg = 'Código pix gerado'
              this.loading = false;
              this.pixReady = true;
              this.clearCart();
              //console.log(this.getPlan);
              //window.location.href = this.getPlan.url;
            } else {
              this.loading = false;
              this.snackMsg = 'Ocorre um erro ao gerar o pix'
              this.snackErro = true;
              
            }
          });
        } else {
          //CREDITO
        }
      } else {
        //CARRINHO VAZIO, não liberar
        this.snackMsg = 'Carrinho vazio'
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
