<template>
  <v-app>
    <v-container>
      <div class="row">
        <div class="col-md-5 col-sm-5 col-xs-12">
          <v-img :src="itemCompra.image_url"> </v-img>
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
        </div>
        <div class="col-md-7 col-sm-7 col-xs-12">
          <div class="pl-6">
            <p class=" mb-0 ImportFont">{{ itemCompra.item_name }}</p>
            <v-card-actions class="pa-0">
              <div v-if="itemCompra.discount_status">
                <b
                  style="text-decoration: line-through;"
                  class="headline font-weight-light pt-3 mr-2"
                  >R${{ itemCompra.price }}</b
                >
                <b class="headline font-weight-light greenTitle pt-3"
                  >R$ {{ itemCompra.price - itemCompra.discount_value }}</b
                >
              </div>
              <div v-else>
                <p class=" greenTitle pt-3">R${{ itemCompra.price }}</p>
              </div>

              <v-spacer></v-spacer>
            </v-card-actions>
            <p class="subtitle-1 font-weight-thin">
              {{ itemCompra.description }}
            </p>
            <div>
              <p class="title">Quantidade</p>

              <v-text-field
                v-model="itemCompra.qtd"
                :rules="[rules.counter]"
                outlined
                single-line
                type="number"
                style="width: 100px"
                :value="1"
                dense
              ></v-text-field>
            </div>

            <v-subheader class="ma-6 mb-2 text-center"
              >Atenção, na compra de um produto, terá duração de 6 meses e
              podendo variar até 1 semana(Promoção) para sua retirada na
              loja.</v-subheader
            >

            <v-container fluid class="mt-6">
              <v-btn
                @click="addOnCart()"
                class="primary white--text"
                outlined
                tile
                dense
                ><v-icon>mdi-cart</v-icon>
                Colocar no carrinho
              </v-btn>
              <v-btn @click="moveToCheckout()" class="ma-5" outlined tile dense>
                Ir ao checkout
                <v-icon right>mdi-shopping</v-icon>
              </v-btn>
            </v-container>
          </div>
        </div>
      </div>
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
      console.log(this.getItem);
      this.itemCompra = JSON.parse(JSON.stringify(this.getItem));
      console.log(this.itemCompra);
    }
  },
  created() {
    if (this.getItem !== undefined) {
      console.log(this.getItem);
      this.itemCompra = JSON.parse(JSON.stringify(this.getItem));
      console.log(this.itemCompra);
    }
  },
};
</script>

<style>
@import "./compra.module.css";
</style>
