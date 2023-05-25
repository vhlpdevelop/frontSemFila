<template>
  <v-container class="mb-6 backgroundCompra d-flex align-center justify-center">
    <v-row class="mb-6">
      <v-col cols="12" md="10" lg="10" xl="10">
        <v-card tile elevation="0">
          <v-card-title style="word-break: break-word" class="text-center black--text">Selecione o tipo de
            Pagamento</v-card-title>
          <v-row>
            <v-col cols="12" md="6">
              <v-expansion-panels>
                <v-expansion-panel>
                  <v-expansion-panel-header class="green--text">
                    Pagar com pix
                    <v-icon color="green" small right>mdi-clover</v-icon>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <p class="black--text text-center">
                      <b>As informações devem aparecer:</b>
                    </p>
                    <v-row no-gutters>
                      <v-col cols="12" md="6">
                        <p class="black--text text-center">
                          <b>Empresa: SEM FILA LTDA</b>
                        </p>
                      </v-col>
                      <v-col cols="12" md="6">
                        <p class="black--text text-center">
                          <b>CNPJ: 40.470.307/0001-43 </b>
                        </p>
                      </v-col>
                      <v-col cols="12" md="12" class="">
                        <v-divider></v-divider>
                        <p class="black--text text-center mt-2">
                          Verifique o <b>valor</b> antes de realizar o pagamento.
                        </p>
                      </v-col>
                    </v-row>
                    <v-container fluid v-if="!getAuth">
                      <v-row no-gutters class="d-flex align-center justify-center" v-if="!pixReady">
                        <v-col cols="10" sm="6" md="6" lg="6" xl="6" class="d-flex align-center justify-center">
                          <v-text-field v-model="phone" type="phone" label="Digite seu número do Whatsapp"
                            :rules="rules" color="secondary--text" hint="Exemplo 11999999999"
                            :disabled="loading">
                            <template v-slot:prepend>
                              <v-icon color="blue">mdi-cellphone</v-icon>
                            </template>
                          </v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                    <v-row align="center" justify="center">
                      <v-col cols="12" class="d-flex align-center justify-center" v-if="!buttonPix.pixError">
                        <v-btn @click="payment('PIX')" v-show="ButtonToggle" outlined rounded
                          :disabled="buttonPix.pixLock" :color="buttonPix.pixColor" class="pr-6 pl-6">{{
                            buttonPix.pixMessage }}</v-btn>
                      </v-col>
                      <v-col cols="12" v-show="loading" class="">
                        <div class="d-flex align-center justify-center">
                          <v-progress-circular size="64" color="green" indeterminate><v-icon
                              color="green">mdi-clover</v-icon></v-progress-circular>
                        </div>
                        <p class="text-center green--text">Gerando seu pix...</p>
                      </v-col>
                      <v-col cols="12" class="d-flex align-center justify-center">
                        <v-container fluid fill-height v-if="pixReady" style="background-color: lightgray"
                          class="mt-2 pa-5 d-flex align-center justify-center">
                          <v-row no-gutters class="d-flex align-center justify-center">
                            <v-col cols="12" class="text-center black--text">
                              <p>Código Pix gerado</p>
                            </v-col>
                            <v-col cols="12" class="d-flex align-center justify-center">
                              <v-img @click="copyCode()" class="" min-width="80" max-width="240"
                                :src="imageQRcode"></v-img>
                            </v-col>
                            <v-col cols="12" class="d-flex align-center justify-center">
                              <v-subheader class="mb-n3">Clique abaixo*</v-subheader>
                            </v-col>
                            <v-col cols="12" class="d-flex align-center justify-center">
                              <v-btn outlined class="mb-5" @click="copyCode()">
                                Copiar Código Pix<v-icon color="green">mdi-content-paste</v-icon>
                              </v-btn>
                            </v-col>
                            <v-col cols="12">
                              <v-container>
                                <div class="d-flex align-center justify-center ">
                                  <div class="pr-4 pl-4 pb-2 pt-2 green rounded-circle white--text">
                                    1
                                  </div>
                                </div>
                                <div>
                                  <p class="text-center black--text">Clique em copiar código pix</p>
                                </div>
                              </v-container>
                              <v-container>
                                <div class="d-flex align-center justify-center ">
                                  <div class="pr-4 pl-4 pb-2 pt-2 green rounded-circle white--text">
                                    2
                                  </div>
                                </div>
                                <div>
                                  <p class="text-center black--text">Abra seu aplicativo do banco. <br /> Vá até <span
                                      class="green--text"><b>Pix Copie e Cole</b></span> e cole o código.</p>
                                </div>
                              </v-container>
                              <v-container>
                                <div class="d-flex align-center justify-center ">
                                  <div class="pr-4 pl-4 pb-2 pt-2 green rounded-circle white--text">
                                    3
                                  </div>
                                </div>
                                <div>
                                  <p class="text-center black--text">Após realizar o pagamento, volte para a página ou
                                    aguarde chegar em
                                    seu Whatsapp <v-icon class="mt-n1" color="green">mdi-whatsapp</v-icon></p>
                                </div>
                              </v-container>
                            </v-col>
                          </v-row>
                          <v-container fluid ma-0 pa-0 class="mt-12 text-center">
                            <v-row no-gutters>
                              <v-col cols="12" class="d-flex align-center justify-center mb-4">
                                <v-subheader>Caso tenha feito o pagamento e não recebeu o qrcode, clique
                                  abaixo*</v-subheader>
                              </v-col>
                              <v-col cols="12" class="d-flex align-center justify-center">
                                <v-btn outlined rounded color="primary" :loading="paymentCheckLoading"
                                  @click="checkPagamento" :disabled="paymentCheckDisable">{{ paymentCheckText }}</v-btn>
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-container>
                        <v-container v-if="buttonPix.pixError">
                          <p class="primary--text text-center">{{ snackMsg }}</p>
                          <p class="text-center black--text mt-n2">Tente por outro meio de pagamento</p>
                        </v-container>
                      </v-col>
                    </v-row>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-col>
            <v-col cols="12" md="6">
              <v-expansion-panels>
                <v-expansion-panel @click="openLoad()">
                  <v-expansion-panel-header class="blue--text">
                    Cartão de Crédito
                    <v-icon small right color="blue">mdi-credit-card</v-icon>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-row no-gutters class="text-center black--text">
                      <v-col cols="12" md="6">
                        <p>
                          <b>Valor da Cobrança</b>
                        </p>
                      </v-col>
                      <v-col cols="12" md="6">
                        <p>
                          <b class="green--text">R$ {{ getTotalCart.toFixed(2) }}</b>
                        </p>
                      </v-col>
                    </v-row>
                    <v-container fluid ma-0 pa-0 v-if="!getAuth" class="d-flex align-center justify-center">
                      <v-row class="d-flex align-center justify-center" no-gutters>
                        <v-col cols="12" class="d-flex align-center justify-center">
                          <v-subheader>Por favor, complete os campos abaixo *</v-subheader>
                        </v-col>
                        <v-col cols="10" sm="6" md="6" lg="6" xl="6" class="d-flex align-center justify-center">
                          <v-text-field v-model="phone" type="phone" label="Digite seu número do Whatsapp"
                            :rules="rules" color="secondary--text" hint="Exemplo 11999999999"
                            :disabled="loading">
                            <template v-slot:prepend>
                              <v-icon color="blue">mdi-cellphone</v-icon>
                            </template>
                          </v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                    <v-container fluid ma-0 pa-0 v-else class="text-center black--text">
                      <p>
                        Compra será enviada para o seu WhatsApp.
                      </p>
                      <p><v-icon class="mt-n2 mr-2">mdi-whatsapp</v-icon> <b>{{ phone }}</b></p>
                    </v-container>

                    <div v-if="buttonCredit.creditShow">
                      <div class="d-flex align-center justify-center mb-n6 mt-6 ml-n6">
                        <v-subheader>Dados do cartão de crédito</v-subheader>
                      </div>
                      <v-container fluid ma-0 pa-0 class="align-center justify-center d-flex">
                        <form class="formCard">
                          <input type="hidden" name="token" />
                          <v-card class="pb-2 tile">
                            <v-row no-gutters>
                              <v-col cols="12" class="d-flex align-center justify-start ml-4 mb-n2">
                                <v-subheader>Número Cartão</v-subheader>
                              </v-col>
                              <v-col cols="10" class="ml-6 d-flex align-center justify-center inputCustomNumber">
                                <div ref="cardNumber" id="card-number-element" class="field"></div>
                                <span class="brand mr-3 mb-n1"><i class="pf pf-credit-card" id="brand-icon"></i></span>
                              </v-col>
                            </v-row>
                            <v-row no-gutters>
                              <v-col cols="6">
                                <div class="mb-n2 ml-4">
                                  <v-subheader>Expiração</v-subheader>
                                </div>
                                <div class="d-flex align-center justify-center ml-8 inputCustom">
                                  <div ref="cardExpire" id="card-expiry-element" class="field"></div>
                                </div>
                              </v-col>
                              <v-col cols="6">
                                <div class="mb-n2">
                                  <v-subheader>CVC</v-subheader>
                                </div>
                                <div class="d-flex align-center justify-center ml-8 mr-12 inputCustom">
                                  <div ref="cardCVC" id="card-cvc-element" class="field"></div>
                                </div>
                              </v-col>
                            </v-row>
                            <div class="outcome mt-4  red--text">
                              <div id="card-errors"></div>
                            </div>
                          </v-card>
                        </form>
                      </v-container>
                      <p class="d-flex align-center justify-center">
                        <v-subheader class="mt-n4 text-justify">Não guardamos nenhuma informação sobre os dados do
                          cartão.</v-subheader>
                      </p>
                    </div>
                    <v-row align="center" justify="center" class="mt-6">
                      <v-col cols="12" class="d-flex align-center justify-center">
                        <v-btn @click="payment('CREDIT')" small v-show="ButtonToggle" outlined rounded
                          :color="buttonCredit.creditColor" :disabled="buttonCredit.creditLock"
                          class=" pr-16 pl-16"><v-icon class="ml-n6 mr-3">
                            mdi-credit-card</v-icon>{{ buttonCredit.creditMessage }} </v-btn>
                      </v-col>
                      <v-col cols="10" v-if="loading">
                        <div class="d-flex align-center justify-center">
                          <v-progress-circular size="64" color="blue" indeterminate><v-icon
                              color="blue">mdi-credit-card</v-icon></v-progress-circular>
                        </div>
                        <p class="text-center blue--text">Avaliando seu cartão...</p>
                      </v-col>
                      <v-col cols="12" class="d-flex align-center justify-center">
                        <v-container fluid fill-height v-if="creditReady" style="background-color: lightgray"
                          class="mt-2 pa-5 d-flex align-center justify-center">
                          <v-container fluid ma-0 pa-0 class="mt-12 text-center">
                            <v-row no-gutters>
                              <v-col cols="12" class="d-flex align-center justify-center mb-4">
                                <v-subheader>Caso tenha feito o pagamento e não recebeu o qrcode, clique
                                  abaixo*</v-subheader>
                              </v-col>
                              <v-col cols="12" class="d-flex align-center justify-center">
                                <v-btn outlined rounded color="blue" :loading="paymentCheckLoading"
                                  @click="checkPagamento" :disabled="paymentCheckDisable">{{ paymentCheckText }}</v-btn>
                              </v-col>
                            </v-row>
                          </v-container>

                        </v-container>
                        <v-container v-if="buttonCredit.creditError">
                          <p class="primary--text text-center">{{ snackMsg }}</p>
                          <p class="text-center black--text mt-n2">Tente por outro meio de pagamento</p>
                        </v-container>
                      </v-col>
                    </v-row>
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
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { loadStripe } from '@stripe/stripe-js';
export default {

  data: () => ({
    loading: false,
    pixReady: false,
    creditReady: false,
    pixCode: "",
    buttonCredit: {
      creditMessage: "Pagar",
      creditColor: "blue",
      creditLock: false,
      creditShow: true
    },
    buttonPix: {
      pixMessage: "Pagar com Pix",
      pixError: false,
      pixLock: false,
      pixColor: "green"
    },
    error: "",
    timeout: 5000,
    loadingFrete: false,

    snackSucesso: false,
    imageQRcode: "",
    snackErro: false,
    paymentCheckText: "Checar pagamento",
    paymentCheckDisable: false,
    snackMsg: "",
    total: 0,
    ButtonToggle: true,
    paymentCheckLoading: false,
    pedido_id: "",
    nome: "",
    phone: "",
    cpf: "",
    CampoObrigatorio: [(v) => !!v || "Campo obrigatório!"],
    desconto: 0,
    rules: [
        (v) => !!v || "Por favor, insira seu número",
        (v) => v.length <= 11 || 'Máximo 11 caracteres',
        (v) => v.length > 10 || 'Mínimo 11 caracteres',
    ],

    style: {
      base: {
        iconColor: '#666EE8',
        color: 'black',
        lineHeight: '40px',
        fontWeight: 300,
        fontFamily: 'Helvetica Neue',
        fontSize: '16px',

        '::placeholder': {
          color: '#CFD7E0',
        }
      }
    },
    //element
    card: null,
    cardCVC: null,
    cardExpire: null,
    stripe: null,
    token: null,
    cardBrandToPfClass: {
      'visa': 'pf-visa',
      'mastercard': 'pf-mastercard',
      'amex': 'pf-american-express',
      'discover': 'pf-discover',
      'diners': 'pf-diners',
      'jcb': 'pf-jcb',
      'unknown': 'pf-credit-card',
    }
  }),
  computed: {
    ...mapGetters([
      "getRespostaUser",
      "getUser",
      "getAuth",
      "getPaymentMsg",
      "getStatus",
      "getPlan",
      "getCart",
      "getCardapio",
      "getTotalCart",
      "getEmailSave",
      "getPedidoID"
    ]),
  },

  methods: {
    ...mapActions(["getProfile", "PaymentCheck", "clearCart", "updateProfile", "fetchTotal", "fetchPedidoPagamento", "fetchEmailSaved", "fetchConfirmPagamento"]),
    setBrandIcon(brand) {
      console.log(brand)
      var brandIconElement = document.getElementById('brand-icon');
      console.log(brandIconElement)
      var pfClass = 'pf-credit-card';
      if (brand in this.cardBrandToPfClass) {
        pfClass = this.cardBrandToPfClass[brand];
      }
      for (var i = brandIconElement.classList.length - 1; i >= 0; i--) {
        brandIconElement.classList.remove(brandIconElement.classList[i]);
      }
      brandIconElement.classList.add('pf');
      brandIconElement.classList.add(pfClass);
      console.log(brandIconElement)
    },
    setOutcome(result) {
      var successElement = document.querySelector('.success');
      var errorElement = document.querySelector('.error');
      successElement.classList.remove('visible');
      errorElement.classList.remove('visible');

      if (result.token) {
        // In this example, we're simply displaying the token
        successElement.querySelector('.token').textContent = result.token.id;
        successElement.classList.add('visible');

        // In a real integration, you'd submit the form with the token to your backend server
        //var form = document.querySelector('form');
        //form.querySelector('input[name="token"]').setAttribute('value', result.token.id);
        //form.submit();
      } else if (result.error) {
        errorElement.textContent = result.error.message;
        errorElement.classList.add('visible');
      }
    },
    openLoad() {
      this.$forceUpdate();

      const execute = async () => { await this.loaderStripe() }
      execute().then(() => {
        this.setUpStripe();
      });
    },
    async loaderStripe() {
      this.stripe = await loadStripe('pk_test_51N0UQSAoZD96C4SxPGHPCfztYhllxWHzJO4MHS2mMKc44xs0sycNAC1bDIBNOi3zVONilyklJbMPCpQEVBe3jeOc00yCWMa3yK')

    },
    setUpStripe() {
      if (!this.buttonCredit.creditShow) {
        return;
      }
      const elements = this.stripe.elements();
      this.card = elements.create('cardNumber', { style: this.style });

      this.card.mount(this.$refs.cardNumber)
      this.card.on('change', (event) => {
        this.displayError(event)
        this.setOutcome(event)
        if (event.brand) {
          this.setBrandIcon(event.brand);
        }
      })

      this.cardExpire = elements.create('cardExpiry', { style: this.style })
      this.cardExpire.mount(this.$refs.cardExpire)
      this.cardCVC = elements.create('cardCvc', { style: this.style })
      this.cardCVC.mount(this.$refs.cardCVC)
      document.querySelector('.formCard').addEventListener('submit', function (e) {
        e.preventDefault();

        this.stripe.createToken(cardNumberElement, null).then(this.setOutcome);
      });
    },
    displayError(event) {
      console.log(event)
      const displayError = document.getElementById('card-errors')
      if (event.error) {
        displayError.textContent = event.error.message
      } else {
        displayError.textContent = ''
      }
    },
    testCard() {

      const cardElementContainer = document.querySelector('#card-number-element');
      const cardElementExpire = document.querySelector('#card-expiry-element')
      const cardElementCVC = document.querySelector('#card-cvc-element')
      let cardElementEmpty = cardElementContainer.classList.contains('StripeElement--empty');
      let cardElementExpireEmpty = cardElementExpire.classList.contains('StripeElement--empty');
      let cardElementCVCEmpty = cardElementCVC.classList.contains('StripeElement--empty');
      if (cardElementEmpty || cardElementExpireEmpty || cardElementCVCEmpty) {

        //Cartão vazio.
        this.snackSucesso = false;
        this.snackMsg = "Insira os dados do cartão";
        this.snackErro = true;
        const displayError = document.getElementById('card-errors')
        displayError.textContent = "Insira os dados do cartão";
        this.creditReady = false;
        this.loading = false;
        this.ButtonToggle = true;
        return false;
      }

      return true;
    },
    checkPagamento() { //Verificar o pagamento.
      this.paymentCheckLoading = true;
      this.fetchPedidoPagamento(this.pedido_id).then(() => {
        this.paymentCheckLoading = false;
        if (this.getStatus) {
          this.paymentCheckDisable = true;
          this.paymentCheckText = "Sucesso!"
          this.snackMsg = this.getPaymentMsg;
          this.snackErro = false;
          this.snackSucesso = true;
        } else {
          this.snackSucesso = false;
          this.snackMsg = this.getPaymentMsg;
          this.snackErro = true;
        }
      });
    },
    validatePhone(phone) {
      if (phone.length === 11) {
        return true
      }
    },
    openTab() {
      window.open(this.getPlan.url, '_blank').focus();
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
        if (!this.validatePhone(this.phone)) {
          this.snackSucesso = false;
          this.snackMsg = "Número inválido."
          this.snackErro = true;
          console.log("error")
          return;

        }
      }
      if (this.getCart.length > 0) {
        this.ButtonToggle = false;
        this.loading = true;
        var object = {
          cart: this.getCart,
          user: 0,
          company_id: this.getCardapio.store.company_id,
          store_id: this.getCardapio.store._id,
          phone: this.phone,
        };
        if (type === "PIX") {
          object.type = type;
          this.PaymentCheck(object).then(async (response) => {
            if (this.getStatus) {
              this.fetchTotal(this.getCart).then(() => {
                this.$gtag.purchase({

                  "transaction_id": this.getPedidoID,
                  "affiliation": "Google online store",
                  "value": parseFloat(this.getTotalCart)
                })
              });
              this.snackSucesso = true;
              this.snackMsg = "Código pix gerado";
              this.pedido_id = this.getPedidoID;
              this.loading = false;
              this.pixReady = true;
              this.clearCart();
              this.pixCode = this.getPlan.qrcode;
              this.imageQRcode = this.getPlan.imagemQrcode;
            } else {

              this.pixReady = false;
              this.loading = false;
              this.buttonPix.pixError=true;
              this.snackMsg = this.getPaymentMsg;
              this.snackErro = true;
            }
          });
        } else {
          //CREDITO
          if (!this.testCard()) {
            return;
          }
          object.type = 'CREDIT';

          this.PaymentCheck(object).then(async () => {

            if (this.getStatus) {
              this.snackSucesso = true;
              this.snackMsg = "Verificando dados do seu cartão";
              this.pedido_id = this.getPedidoID;
              console.log(this.getStatus)
              this.clearCart();
              //CRIAR PAYMENTMETHOD
              const paymentMethodReq = await this.stripe.createPaymentMethod({
                type: "card",
                card: this.card,
                billing_details: null,
              })

              const { error } = await this.stripe.confirmCardPayment(this.getPlan.url, {
                payment_method: paymentMethodReq.paymentMethod.id
              })
              if (error) {
                console.log("ERRO OCORREU")
                console.log(error)
                this.clearCart();
                this.creditReady = false;
                this.loading = false;
                this.snackMsg = error;
                this.buttonCredit.creditError = true;
                this.snackErro = true;
              } else {
                this.creditReady = true;
                this.loading = false;

              }
            } else {
              this.buttonCredit.creditError = true;
              this.creditReady = false;
              this.loading = false;
              console.log(this.getPaymentMsg)

              this.snackMsg = this.getPaymentMsg;
              this.snackErro = true;
            }
          });
        }
      } else {
        //CARRINHO VAZIO, não liberar
        this.snackMsg = "Carrinho vazio";
        this.snackErro = true;
      }
    },
  },
  async created() {
    //Checar se o token é valido
    this.fetchEmailSaved()

    this.fetchTotal(this.getCart)
    this.getProfile().then(() => {
      if (this.getRespostaUser) {

        this.phone = this.getUser.phone
        //Se o usuário tiver logado...
      } else {
        this.phone = this.getEmailSave
      }
    });
    if (this.getCart.length <= 0) {
      this.buttonPix.pixColor = "grey";
      this.buttonPix.pixLock = true;
      this.buttonPix.pixMessage = "Carrinho vazio"
      this.buttonCredit.creditColor = "grey";
      this.buttonCredit.creditLock = true;
      this.buttonCredit.creditMessage = "Carrinho vazio"
      this.buttonCredit.creditShow = false;
    }


  },
};
</script>
<style>
.formCard {
  width: 330px;
  margin: 20px 0;
}

.group {

  box-shadow: 0 10px 20px 0 rgba(49, 49, 93, 0.10), 0 3px 6px 0 rgba(0, 0, 0, 0.08);
  border-radius: 6px;
  margin-bottom: 20px;
}

.labelUnic {


  height: 40px;
  line-height: 40px;
  margin-left: 0px;

}

.group .labelUnic:not(:last-child) {}

.labelUnic>span {
  width: 120px;
  text-align: right;
  margin-right: 5px;
}

.labelUnic>span.brand {
  width: 30px;
}

.field {
  background: transparent;
  font-weight: 300;
  border: 0;
  color: black !important;
  outline: none;
  flex: 1;
  padding-right: 10px;
  padding-left: 10px;
  cursor: text;
}

.field::-webkit-input-placeholder {
  color: #CFD7E0;
}

.field::-moz-placeholder {
  color: #CFD7E0;
}


.outcome {
  float: left;
  width: 100%;
  padding-top: 8px;
  min-height: 24px;
  text-align: center;
}

.success,
.error {
  display: none;
  font-size: 13px;
}

.success.visible,
.error.visible {
  display: inline;
}

.error {
  color: #E4584C;
}

.success {
  color: #666EE8;
}

.success .token {
  font-weight: 500;
  font-size: 13px;
}


@import "./compra.module.css";
</style>
<style lang="scss">
.inputCustom {
  --background: #fff;
  --border-default: #D0D0DF;
  --border-active: #3D6DF9;
  --shadow-default: #{rgba(#202048, .12)};
  --shadow-active: #{rgba(#3D6DF9, .25)};
  --text-color: #818190;
  --placeholder-color: #C9C9D9;
  --placeholder-color-hover: #BABAC9;
  --close: #818190;
  --close-light: #BABAC9;
  --close-background: #F1F1FA;
  width: 50%;
  max-width: 120px;
  display: flex;
  align-items: center;
  position: relative;
  border-radius: 8px;
  background: var(--background);
  box-shadow: inset 0 0 0 var(--border-width, 1px) var(--border, var(--border-default)), 0 1px 3px var(--shadow, var(--shadow-default));
  transition: box-shadow .2s;
  --clear-x: 0px;
  --clear-swipe-left: 0px;
  --clear-swipe-x: 0;
  --clear-swipe: 0px;
  --clear-scale: 0;
  --clear-rotate: 0deg;
  --clear-opacity: 0;
  --clear-arrow-o: 1;
  --clear-arrow-x: 0px;
  --clear-arrow-y: 0px;
  --clear-arrow-offset: 4px;
  --clear-arrow-offset-second: 4px;
  --clear-line-array: 8.5px;
  --clear-line-offset: 27px;
  --clear-long-array: 8.5px;
  --clear-long-offset: 24px;

  &.clearing,
  &:focus-within {
    --border-width: 1.5px;
    --border: var(--border-active);
    --shadow: var(--shadow-active);
  }

  &.clearing {
    --close-background: transparent;
    --clear-arrow-stroke: var(--close-light);
  }

  &:hover {
    .text {
      input {
        &::placeholder {
          color: var(--placeholder-color-hover);
        }
      }
    }
  }

}

.inputCustomNumber {
  --background: #fff;
  --border-default: #D0D0DF;
  --border-active: #3D6DF9;
  --shadow-default: #{rgba(#202048, .12)};
  --shadow-active: #{rgba(#3D6DF9, .25)};
  --text-color: #818190;
  --placeholder-color: #C9C9D9;
  --placeholder-color-hover: #BABAC9;
  --close: #818190;
  --close-light: #BABAC9;
  --close-background: #F1F1FA;
  width: 90%;
  max-width: 300px;
  display: flex;
  align-items: center;
  position: relative;
  border-radius: 8px;
  background: var(--background);
  box-shadow: inset 0 0 0 var(--border-width, 1px) var(--border, var(--border-default)), 0 1px 3px var(--shadow, var(--shadow-default));
  transition: box-shadow .2s;
  --clear-x: 0px;
  --clear-swipe-left: 0px;
  --clear-swipe-x: 0;
  --clear-swipe: 0px;
  --clear-scale: 0;
  --clear-rotate: 0deg;
  --clear-opacity: 0;
  --clear-arrow-o: 1;
  --clear-arrow-x: 0px;
  --clear-arrow-y: 0px;
  --clear-arrow-offset: 4px;
  --clear-arrow-offset-second: 4px;
  --clear-line-array: 8.5px;
  --clear-line-offset: 27px;
  --clear-long-array: 8.5px;
  --clear-long-offset: 24px;

  &.clearing,
  &:focus-within {
    --border-width: 1.5px;
    --border: var(--border-active);
    --shadow: var(--shadow-active);
  }

  &.clearing {
    --close-background: transparent;
    --clear-arrow-stroke: var(--close-light);
  }

  &:hover {
    .text {
      input {
        &::placeholder {
          color: var(--placeholder-color-hover);
        }
      }
    }
  }

}</style>