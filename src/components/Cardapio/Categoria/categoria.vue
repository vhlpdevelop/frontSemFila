<template>
  <v-app style="background-color: rgb(245, 245, 245) !important">
    <v-container ma-0 pa-0 fluid class="backGroundDestaques">
      
        <v-container fluid ma-0 pa-0 fill-height class="d-flex">
          <v-row align="center" justify="center" class="mt-3">
            <v-card style="width: 100%" v-if="getCardapio.cardapio[getCategoria].items.length > 0" class="rounded-xl backGroundDestaques" elevation="5" >
              <v-row justify="start" class="mt-3 ma-1" no-gutters>
                <v-col cols="12">
                  <v-card-title class="ml-6 CategoryName"
                  ><b>{{ getCardapio.cardapio[getCategoria].category_name }}</b>
                  </v-card-title
                >
                </v-col>
                <v-col cols="12" class="ml-6 mt-n6">
                  <v-subheader>Nós recomendamos para você</v-subheader>
                </v-col>
                
              </v-row>

              <v-card-text>
                <v-data-iterator
                  :headers="headers"
                  :items="getCardapio.cardapio[getCategoria].items"
                  hide-default-header
                  hide-default-footer
                  class="d-flex flex-column mh-100 ma-5"
                >
                  <template v-slot:default="props">
                    <v-row class="fill-height overflow-auto" id="container">
                      <v-col
                        v-for="(item, idx) in props.items"
                        :key="item.item_name"
                        :cols="12 / itemsPerRow"
                        class="py-1 mb-5"
                      >
                        <v-card
                          outlined
                          class=" fill-height rounded-xl"
                          @click="toCompra(item)"
                        >
                          <v-card-title>
                            <v-row>
                              <v-col cols="8">
                                <p class="text-truncate" style="max-width: 300px">
                                  {{ item.item_name }}
                                </p>
                                <v-subheader class="text-truncate" style="max-width: 300px">{{
                                  item.description
                                }}</v-subheader>
                              </v-col>
                              <v-col cols="4">
                                <div>
                                  <v-img
                                    class="d-none d-sm-flex"
                                    alt="Avatar"
                                    :src="item.image_url"
                                    width="180px"
                                    height="120px"
                                  ></v-img>
                                  <v-img
                                    class=" d-flex d-sm-none"
                                    alt="Avatar"
                                    :src="item.image_url"
                                    width="80px"
                                    height="60px"
                                  ></v-img>
                                </div>
                              </v-col>
                            </v-row>
                          </v-card-title>
                          <v-divider></v-divider>
                          <v-card-text>
                            <v-row>
                              <v-col cols="8" md="10" sm="10">
                                <div v-if="item.discount_status" class="ml-6">
                                  <b class="textColorDefault mr-2">
                                    R$ {{ (item.price - item.discount_value).toFixed(2) }}
                                  </b>
                                  <b style="text-decoration: line-through;"
                                    >R${{ item.price }}
                                  </b>
                                </div>
                                <b class="" v-else>
                                  <span class="ml-6 textColorDefault"
                                    >R${{ item.price }}</span
                                  >
                                </b>
                              </v-col>
                              <v-col cols="4" md="2" sm="2" xl="2">
                                <v-tooltip bottom v-if="item.destaques">
                                  <template v-slot:activator="{ on, attrs }">
                                    <v-icon
                                      color="red"
                                      dark
                                      v-bind="attrs"
                                      v-on="on"
                                    >
                                      mdi-fire
                                    </v-icon>
                                  </template>
                                  <span>Está em destaque</span>
                                </v-tooltip>
                                <v-tooltip bottom v-if="item.discount_status">
                                  <template v-slot:activator="{ on, attrs }">
                                    <v-icon
                                      color="primary"
                                      dark
                                      v-bind="attrs"
                                      v-on:hover="on"
                                    >
                                      mdi-sale
                                    </v-icon>
                                  </template>
                                  <span>Possui desconto</span>
                                </v-tooltip>
                                <v-tooltip bottom v-if="item.promotion">
                                  <template v-slot:activator="{ on, attrs }">
                                    <v-icon
                                      color="yellow"
                                      dark
                                      v-bind="attrs"
                                      v-on="on"
                                    >
                                      mdi-lightning-bolt
                                    </v-icon>
                                  </template>
                                  <span>Está em promoção</span>
                                </v-tooltip>
                              </v-col>
                            </v-row>
                          </v-card-text>
                        </v-card>
                      </v-col>
                    </v-row>
                  </template>
                </v-data-iterator>
              </v-card-text>
            </v-card>
            <v-card v-else>
              <v-card-title class="ma-2" style="word-break: break-word">
                Aguarde, estamos arrumando nosso cardápio {{ getCardapio.cardapio[getCategoria].category_name }}
              </v-card-title>
            </v-card>
          </v-row>
        </v-container>
     
    </v-container>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "CategoriaItem",

  props: ["props"],
  data: () => ({
    snackErro: false,
    snackSucesso: false,
    timeout: 5000,
    categorias: [],
    category_name: "",
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
    ...mapActions(["MovetoCompra"]),
    toCompra(item) {
      //console.log(item)
      this.MovetoCompra(item).then(() => {
        this.$router.push({
          //arrumar os props
          name: "compra",
        });
      });
    },
  },
  computed: {
    ...mapGetters(["getLoading", "getLoaded", "getCardapio", "getCategoria"]),
    itemsPerRow() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return 1;
        case "sm":
          return 1;
        case "md":
          return 2;
        case "lg":
          return 3;
        case "xl":
          return 4;
      }
    },
  },

  created() {
    if (this.getCardapio.cardapio.length > 0) {
      console.log("flag")
      if (this.getCardapio.cardapio[this.getCategoria] === undefined) {
        this.$router.push({
          name: "homeCardapio",
        });
      }
      //this.categorias = this.getCardapio.cardapio[this.getCategoria];
    }
  },
};
</script>

<style>
@import "../cardapio.module.css";
</style>
