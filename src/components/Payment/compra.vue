<template>
  <v-container fluid fill-height class="d-flex align-center justify-center">
    <v-row no-gutters class="d-flex align-center justify-center">
      <v-col cols="12" sm="6" md="4" lg="4" xl="4">
        <v-container class="d-flex justify-center">
          <v-img
            max-width="320px"
            max-height="180px"
            contain

            :src="itemCompra.image_url"
          >
          </v-img>
        </v-container>

        <v-icon
          v-if="itemCompra.discount_status"
          absolute
          top
          right
          color="primary"
        >
          mdi-sale
        </v-icon>
        <v-icon v-if="itemCompra.destaques" absolute top right color="red"
          >mdi-fire</v-icon
        >
        <v-icon absolute top right v-if="itemCompra.promotion" color="yellow"
          >mdi-lightning-bolt</v-icon
        >
      </v-col>
      <v-col cols="12" sm="6" md="6" lg="6" xl="6">
        <v-container fluid class="d-row justify-center align-center">
          <p class="mb-0 ImportFont text-center">
            {{ itemCompra.item_name }}
          </p>
          <v-card-actions class="pa-0 text-center">
            <v-container fluid v-if="itemCompra.discount_status">
              <b
                style="text-decoration: line-through"
                class="headline font-weight-light pt-3 mr-2"
                >R${{ itemCompra.price }}</b
              >
              <b class="headline font-weight-light greenTitle pt-3"
                >R$
                {{
                  (itemCompra.price - itemCompra.discount_value).toFixed(2)
                }}</b
              >
            </v-container>
            <v-container fluid v-else>
              <p class="greenTitle pt-3">R${{ itemCompra.price }}</p>
            </v-container>

            <v-spacer></v-spacer>
          </v-card-actions>
          <p class="subtitle-1 font-weight-thin text-center">
            {{ itemCompra.description }}
          </p>
          <v-container class="text-center" fluid v-if="itemCompra.promotion">
            <v-subheader class="text-center"
              >Tempo da promoção -
              {{ itemCompra.promotion_duration * 24 }} horas</v-subheader
            >
          </v-container>
          <v-container class="d-flex justify-center">
            <v-container class="d-flex">
              <p class="title mr-12">Quantidade</p>

              <v-text-field
                v-model="itemCompra.qtd"
                :rules="[rules.counter]"
                outlined
                single-line
                type="number"
                :value="1"
                dense
              ></v-text-field>
            </v-container>
          </v-container>

          <v-subheader class="text-center ma-6"
            >Atenção, na compra de um produto, terá duração de 6 meses e podendo
            variar até 1 semana(Promoção) para sua retirada na
            loja.</v-subheader
          >

          <v-container class="d-flex justify-center">
            <v-btn
              @click="addOnCart()"
              class="primary white--text"
              outlined
              tile
              dense
              ><v-icon>mdi-cart</v-icon>
              Colocar no carrinho
            </v-btn>
          </v-container>
          <v-container class="d-flex justify-center">
            <v-btn @click="moveToCheckout()" outlined tile dense>
              Ir ao checkout
              <v-icon right>mdi-shopping</v-icon>
            </v-btn>
          </v-container>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
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

<style>
@import "./compra.module.css";
</style>
