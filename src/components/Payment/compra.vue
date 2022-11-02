<template>
  <v-app class="mb-n6">
    <v-container
      fluid
      ma-0
      pa-0
      fill-height
      class="d-flex align-center justify-center backgroundCompra"
    >
      <v-row no-gutters class="d-flex">
        <v-col
          cols="12"
          sm="6"
          md="4"
          lg="5"
          xl="4"
          class="pa-5 d-flex align-start"
        >
          <v-container fluid ma-0 pa-0>
            <v-container class="d-flex align-center justify-center">
              <div v-if="itemCompra.image_url !== ''">
                <v-img
                  max-width="320px"
                  max-height="180px"
                  contain
                  class=""
                  :src="itemCompra.image_url"
                >
                </v-img>
              </div>
              <div v-else>
                <v-img
                  width="320px"
                  height="180px"
                  contain
                  class=""
                  src="https://i.ibb.co/WH7Bj1J/empty.jpg"
                >
                </v-img>
              </div>
            </v-container>
            <v-container fluid class="d-flex">
              <v-icon v-if="itemCompra.discount_status" color="primary">
                mdi-sale
              </v-icon>
              <v-icon v-if="itemCompra.destaques" color="red">mdi-fire</v-icon>
              <v-icon v-if="itemCompra.promotion" color="yellow"
                >mdi-lightning-bolt</v-icon
              >
            </v-container>
          </v-container>
        </v-col>
        <v-col cols="12" sm="6" md="6" lg="6" xl="6">
          <v-container fluid class="d-row justify-center align-center">
            <p class="mb-0 ImportFont text-truncate text-center mt-2">
              {{ itemCompra.item_name }}
            </p>
            <v-card-actions class="pa-0 text-center">
              <v-container fluid v-if="itemCompra.discount_status">
                <v-row no-gutters>
                  <v-col cols="12">
                    <b class="headline font-weight-light greenTitle pt-3"
                  >R$
                  {{
                    (itemCompra.price - itemCompra.discount_value).toFixed(2)
                  }}</b
                >
                  </v-col>
                  <v-col cols="12">
                    <b
                  style="text-decoration: line-through"
                  class="body-1 font-weight-light pt-3 mr-2"
                  >R${{ itemCompra.price }}</b
                >
                  </v-col>
                </v-row>
                
                
              </v-container>
              <v-container fluid v-else>
                <p class="greenTitle pt-3">R${{ itemCompra.price }}</p>
              </v-container>

              <v-spacer></v-spacer>
            </v-card-actions>
            <v-container fluid>
              <span class="compraDescription">Descrição</span>
              <p
                class="subtitleDescription text--primary ImportFontNormal text-center"
              >
                {{ itemCompra.description }}
              </p>
            </v-container>

            <v-container
              class="d-flex align-center justify-center"
              fluid
              v-if="itemCompra.promotion"
            >
              <v-subheader class=""
                >Tempo da promoção -
                {{ itemCompra.promotion_duration * 24 }} horas</v-subheader
              >
            </v-container>
            <v-container fluid class="pr-n12">
              <v-row
                class="d-flex justify-center align-center quantidadeCorner"
                no-gutters
              >
                <v-col cols="5 mb-n5" md="3" xl="3">
                  <p
                    class="ImportFontNormal"
                    style="font-size: 1.2em !important"
                  >
                    Quantidade
                  </p></v-col
                >
                <v-col cols="3  mb-n4 " md="3" xl="3"
                  ><v-text-field
                    v-model="itemCompra.qtd"
                    :rules="[rules.counter]"
                    outline
                    single-line
                    type="number"
                    :value="1"
                    class="ImportFontNormal centered-input"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>

            <v-subheader class="text-center ma-6 mt-10"
              >Atenção, na compra de um produto, terá duração de 6 meses e
              podendo variar até 1 semana(Tempo da Promoção) para sua retirada
              na loja.</v-subheader
            >
          </v-container>
          <v-container
            fluid
            ma-0
            pa-0
            class="containerDown containerDownTwo mb-10"
          >
            <v-container class="d-flex justify-center pt-8">
              <v-btn
                @click="addOnCart()"
                class="addCarrinho white--text"
                outlined
                rounded
                dense
                ><v-icon>mdi-cart</v-icon>
                Colocar no carrinho
              </v-btn>
            </v-container>
            <v-container class="d-flex justify-center align-center text-center">
              <v-btn
                @click="moveToCheckout()"
                text
                dense
                class="checkOut"
                style="text-decoration: underline"
              >
                Ir ao checkout
                <v-icon right>mdi-shopping</v-icon>
              </v-btn>
            </v-container>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Compra",
  data: () => ({
    rules: {
      required: (value) => !!value || "Required.",
      counter: (value) => value >= 1 || "mínimo é 1",
    },
    qtd: 1,
    snackErro: false,
    snackSucesso: false,
    timeout: 5000,
    itemCompra: {
      //Exemplo de item
      description: "",
      price: "",
      id: "",
      item_name: "",
      tira: "",
      cor: "",
      qtd: 1,
      num: "34",
      id_num: "",
      image_url: [],
    },

    headers: [
      { align: "center", value: "image_url" },
      {
        align: "center",
        value: "item_name",
      },
      { align: "center", value: "price" },
      { value: "tags" },
      ,
    ],
  }),

  methods: {
    ...mapActions(["addCart"]),
    addOnCart() {
      if (this.itemCompra.qtd >= 1) {
        //console.log(this.item.num)
        this.addCart(this.itemCompra).then((response) => {
          //Após colocar no carrinho, mostrar ao usuário
        });
      }
    },
    moveToCheckout() {
      this.addCart(this.itemCompra).then((response) => {
        this.$router.push({
          //arrumar os props
          name: "checkout",
        });
      });
    },
  },
  computed: {
    ...mapGetters(["getCardapio", "getItem", "getCart"]),
    itemsPerRow() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return 1;
        case "sm":
          return 1;
        case "md":
          return 2;
        case "lg":
          return 4;
        case "xl":
          return 4;
      }
    },
  },
  mounted() {
    if (this.getItem !== undefined) {
      //console.log(this.getItem);
      this.itemCompra = JSON.parse(JSON.stringify(this.getItem));
      //console.log(this.itemCompra);
    }
  },
  created() {
    if (this.getItem !== undefined) {
      //console.log(this.getItem);
      this.itemCompra = JSON.parse(JSON.stringify(this.getItem));
      //console.log(this.itemCompra);
    }
  },
};
</script>

<style scoped>
@import "./compra.module.css";
.centered-input >>> input {
  text-align: center;
}
</style>
