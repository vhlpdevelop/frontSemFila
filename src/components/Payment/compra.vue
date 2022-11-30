<template>
  <v-app class="">
    <v-container
      fluid
      ma-0
      pa-0
      fill-height
      class="d-flex align-center justify-center backgroundCompraTop"
    >
      <v-row no-gutters class="d-flex backgroundCompra">
        <v-col
          cols="12"
          sm="6"
          md="6"
          lg="6"
          xl="6"
          class="pa-5 d-flex align-start"
        >
          <v-container fluid ma-0 pa-0>
            <v-breadcrumbs :items="itemsCrumbs" divider="/">
              <template v-slot:item="{ item }">
                <v-breadcrumbs-item
                  :to="item.to"
                  class="text-subtitle-2 crumb-item"
                  style="text-decoration: underline"
                  :disabled="item.disabled"
                  exact
                >
                  {{ item.text }}
                </v-breadcrumbs-item>
              </template>
            </v-breadcrumbs>

            <v-container class="d-flex align-center justify-center">
              <div class="pl-3 pr-3 mt-6">
                <v-subheader class="ma-0 pa-0 mb-n3"
                  >imagem - {{ itemCompra.item_name }}</v-subheader
                >
                <v-img
                  max-width="400"
                  max-height="300"
                  contain
                  class="elevation-6"
                  :src="itemCompra.image_url"
                  lazy-src="https://i.ibb.co/WH7Bj1J/empty.jpg"
                >
                  <template v-slot:placeholder>
                    <v-row
                      class="fill-height ma-0"
                      align="center"
                      justify="center"
                    >
                      <v-progress-circular
                        indeterminate
                        color="grey lighten-5"
                      ></v-progress-circular>
                    </v-row>
                  </template>
                </v-img>
              </div>
            </v-container>
            <v-container fluid class="d-flex justify-center">
              <v-avatar
                v-if="itemCompra.discount_status"
                class="avatarColor mr-2"
                size="46"
              >
                <v-icon color="primary"> mdi-sale </v-icon>
              </v-avatar>
              <v-avatar
                v-if="itemCompra.destaques"
                class="avatarColor mr-2"
                size="46"
              >
                <v-icon color="red">mdi-fire</v-icon>
              </v-avatar>
              <v-avatar
                v-if="itemCompra.promotion"
                class="avatarColor"
                size="46"
              >
                <v-icon color="yellow">mdi-lightning-bolt </v-icon>
              </v-avatar>
            </v-container>
            <v-container fluid class="d-none d-sm-flex">
              <v-row align="center" justify="center">
                <v-col cols="4" class="text-center">
                  <v-badge
                    bordered
                    bottom
                    color="grey darken-1"
                    icon="mdi-cash"
                    offset-x="20"
                    offset-y="20"
                  >
                    <v-avatar class="avatarColor">
                      <v-icon> mdi-lock </v-icon>
                    </v-avatar>
                  </v-badge>
                  <p>
                    <a class="hoverTag"> Pagamentos e Segurança </a>
                  </p>
                </v-col>
                <v-col cols="4" class="text-center">
                  <v-avatar class="avatarColor">
                    <v-icon>mdi-archive-refresh </v-icon>
                  </v-avatar>

                  <p>
                    <a class="hoverTag"> Política de Devolução </a>
                  </p>
                </v-col>
              </v-row>
            </v-container>
          </v-container>
        </v-col>
        <v-col cols="12" sm="6" md="6" lg="4" xl="6" class="">
          <v-container fluid class="d-row justify-center align-center">
            <p
              class="mb-0 ImportFont black--text font-weight-bold text-truncate text-center mt-6"
            >
              {{ itemCompra.item_name }}
            </p>
            <v-card-actions class="pa-0 text-center">
              <v-container fluid v-if="itemCompra.discount_status">
                <v-row no-gutters>
                  <v-col cols="12">
                    <b class="headline font-weight-light greenTitle pt-3"
                      >R$
                      {{
                        (itemCompra.price - itemCompra.discount_value).toFixed(
                          2
                        )
                      }}</b
                    >
                  </v-col>
                  <v-col cols="12">
                    <b
                      style="text-decoration: line-through"
                      class="body-1 font-weight-light grey--text pt-3 mr-2"
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
            <span class="compraDescription ml-5">Descrição do produto</span>
            <v-container fluid class="d-flex align-center justify-center">
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
            <v-container ma-0 pa-0 class="d-flex align-center justify-center descriptionClass"
              fluid>
            <v-row no-gutters class="d-flex align-center justify-center">
              <v-col cols="3" class="d-flex align-center justify-center ">
                <v-icon color="orange">mdi-lightbulb-alert-outline</v-icon>
              </v-col>
              <v-col cols="9" class="d-flex align-center justify-center mt-2">
                <p class="text-caption black--text">Este é uma compra com retirada. Diferentes marketplaces terão diferentes retiradas.</p>
              </v-col>
            </v-row>
            </v-container>
            <v-container fluid class="pr-n12">
              <v-row class="d-flex justify-center align-center" no-gutters>
                <v-col
                  cols="12 mb-n4"
                  class="d-flex justify-center align-center"
                >
                  <p
                    class="ImportFontNormal"
                    style="font-size: 1.2em !important"
                  >
                    Quantidade
                  </p></v-col
                >
                <v-col cols="12" class="d-flex justify-center align-center">
                  <v-row no-gutter class="d-flex justify-center align-center">
                    <v-col cols="8" class="d-flex justify-center align-center">
                      <v-slider
                        v-model="itemCompra.qtd"
                        class="align-center"
                        :max="max"
                        :min="min"
                        hide-details
                      >
                      </v-slider>
                    </v-col>
                    <v-col cols="4">
                      <v-text-field
                        v-model="itemCompra.qtd"
                        class="mt-0 pt-0"
                        :rules="[rules.counter]"
                        hide-details
                        single-line
                        type="number"
                        :value="1"
                        style="width: 40px"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col> </v-col>
              </v-row>
            </v-container>

            <v-subheader class="text-center ma-6 mt-10"
              >Atenção, na compra de um produto, terá duração de 6 meses e
              podendo variar até 1 semana(Tempo da Promoção) para sua retirada
              na loja.</v-subheader
            >
          </v-container>
          <v-container fluid ma-0 pa-0 class="mb-10">
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
                <v-icon right style="text-decoration: none !important"
                  >mdi-shopping</v-icon
                >
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
  props: ["id"],
  data: () => ({
    rules: {
      required: (value) => !!value || "Selecione a quantidade.",
      counter: (value) => value >= 1 || "mínimo é 1",
      counter: (value) => value <= 30 || "maximo é 30 unidades",
    },
    qtd: 1,
    min: 1,
    max: 30,
    snackErro: false,
    snackSucesso: false,
    route: "",
    itemsCrumbs: [
      {
        text: "Voltar ao início",
        to: { name: "homeCardapio" },
      },
    ],
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
      if (this.itemCompra.qtd >= 1 && this.itemCompra.qtd <= 30) {
        //console.log(this.item.num)
        this.addCart(this.itemCompra).then((response) => {
          //Após colocar no carrinho, mostrar ao usuário
        });
      }
    },
    moveToCheckout() {
      if (this.itemCompra.qtd >= 1 && this.itemCompra.qtd <= 30)
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
    getParam() {
      return this.route;
    },
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
      this.route = this.id;
      //console.log(this.getItem);
      this.itemCompra = JSON.parse(JSON.stringify(this.getItem));
      //console.log(this.itemCompra);
    }
  },
};
</script>

<style scoped>
@import "./compra.module.css";
.avatarColor {
  background-color: rgb(242, 66, 54, 0.4) !important;
}
.centered-input {
}
.centered-input >>> input {
  text-align: center;
}
</style>
