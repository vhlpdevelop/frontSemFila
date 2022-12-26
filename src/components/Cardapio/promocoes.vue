<template>
  <v-app style="background-color: #19180a !important">
    <v-container fluid class="backGroundDestaques">
      <v-container
        fluid
        fill-height
        class="d-flex"
        style="background-color: #19180a !important"
      >
        <v-row align="center" justify="center" class="mt-3">
          <v-card
            style="width: 100%; background-color: #19180a !important"
            flat
            v-if="itemPromocoes.length > 0"
          >
            <v-row justify="start" class="mt-3 ma-1" no-gutters>
              <v-col cols="12">
                <v-card-title class="ml-6 textColorDefault"
                  ><b>Promoções</b>
                </v-card-title>
              </v-col>
              <v-col cols="12" class="ml-6 mt-n6">
                <v-subheader style="color: #fbfbff !important"
                  >Nós recomendamos para você</v-subheader
                >
              </v-col>
            </v-row>

            <v-card-text>
              <v-data-iterator
                :headers="headers"
                :items="itemPromocoes"
                hide-default-header
                hide-default-footer
                class="d-flex flex-column ma-5"
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
                        class="fill-height rounded-xl"
                        @click="toCompra(item)"
                      >
                        <v-card-title>
                          <v-row>
                            <v-col cols="8">
                              <p
                                class="text-truncate itemName"
                                style="max-width: 300px"
                              >
                                {{ item.item_name }}
                              </p>
                              <v-subheader style="word-break: break-word">{{
                                item.description
                              }}</v-subheader>
                            </v-col>
                            <v-col cols="4">
                              <div v-if="item.image_url !== ''">
                                <v-img
                                  class="d-none d-sm-flex"
                                  alt="Avatar"
                                  :src="item.image_url"
                                  width="180px"
                                  height="120px"
                                ></v-img>
                                <v-img
                                  class="d-flex d-sm-none"
                                  alt="Avatar"
                                  :src="item.image_url"
                                  width="80px"
                                  height="60px"
                                ></v-img>
                              </div>
                              <div v-else>
                                <v-img
                                  class="d-none d-sm-flex"
                                  alt="Avatar"
                                  src="https://i.ibb.co/WH7Bj1J/empty.jpg"
                                  width="180px"
                                  height="120px"
                                ></v-img>
                                <v-img
                                  class="d-flex d-sm-none"
                                  alt="Avatar"
                                  src="https://i.ibb.co/WH7Bj1J/empty.jpg"
                                  width="80px"
                                  height="60px"
                                ></v-img>
                              </div>
                            </v-col>
                          </v-row>
                        </v-card-title>
                        <v-divider></v-divider>
                        <v-card-text>
                          <v-row no-gutters>
                            <v-col cols="12">
                              <v-row >
                                <v-col cols="8" md="10" sm="10">
                                  <div v-if="item.discount_status" class="ml-6">
                                    <b class="textColorDefault mr-2">
                                      R$
                                      {{
                                        (
                                          item.price - item.discount_value
                                        ).toFixed(2)
                                      }}
                                    </b>
                                    <b style="text-decoration: line-through"
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
                              <v-col cols="12" class="d-flex align-start justify-start">
                            <v-subheader class="d-flex align-end justify-end">Tempo da promoção - {{item.promotion_duration * 24}} horas</v-subheader>
                          </v-col>
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
              Estamos sem promoções hoje
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

  props: ["object", "index"],
  data: () => ({
    snackErro: false,
    snackSucesso: false,
    timeout: 5000,
    itemPromocoes: [],
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
    ...mapGetters(["getPromocoes"]),
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
    if (this.getPromocoes.length > 0) {
      this.itemPromocoes = this.getPromocoes;
    }
  },
};
</script>

<style scoped>

@import "./cardapio.module.css";
</style>
