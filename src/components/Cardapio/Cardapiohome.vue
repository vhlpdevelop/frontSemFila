<template>
  <v-app style="background-color: rgb(245, 245, 245) !important">
    <v-row no-gutters class="align-center justify-center">
    <v-col cols="10" lg="12" md="12" sm="12" class="mt-5 mb-n6 ">
      <v-responsive :aspect-ratio="16 / 9" max-height="500px" class="">
        <v-carousel cycle hide-delimiters show-arrows-on-hover>
          <template v-slot:prev="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on"
              ><v-icon fab>mdi-arrow-left</v-icon></v-btn
            >
          </template>
          <template v-slot:next="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on"
              ><v-icon fab>mdi-arrow-right</v-icon></v-btn
            >
          </template>
          <template v-for="(destaques, index) in itemDestaques">
            <v-carousel-item
              v-if="(index + 1) % columns === 1 || columns === 1"
              :key="index"
            >
              <v-row align="center" justify="center" class="flex-nowrap">
                <template v-for="(n, i) in columns">
                  <template v-if="+index + i < itemDestaques.length">
                    <v-col cols="12" lg="3" md="4" sm="6" xs="12" :key="i">
                      <v-responsive max-width="320" :aspect-ratio="16 / 9">
                        <v-card
                          @click="toCompra(itemDestaques[+index + i])"
                          dark
                          
                          elevation="7"
                          outlined
                          class="pa-5 cardDestaques"
                        >
                          <v-row align="center" justify="center">
                            <v-img
                              contain
                              :aspect-ratio="16 / 9"
                              :src="itemDestaques[+index + i].image_url"
                              max-height="300"
                              class=" d-none d-sm-flex"
                            >
                              <v-row align="start" justify="start"> </v-row>
                            </v-img>
                            <v-img
                              contain
                              :aspect-ratio="16 / 9"
                              :src="itemDestaques[+index + i].image_url"
                              max-height="220"
                              max-width="320"
                              class=" d-flex d-sm-none"
                            ></v-img>
                          </v-row>
                          <v-icon
                            v-if="itemDestaques[+index + i].discount_status"
                            absolute
                            top
                            right
                            color="primary"
                          >
                            mdi-sale
                          </v-icon>
                          <v-icon x-large absolute top right color="red"
                            >mdi-fire</v-icon
                          >
                          <v-row align="start" justify="center" class="">
                            <v-card-title class="text-truncate" style="max-width: 200px"
                              >{{ itemDestaques[+index + i].item_name }}
                            </v-card-title>
                          </v-row>
                          <v-row align="center" justify="center">
                            <p class="mt-n6 pinkColorText"
                              >R${{
                                itemDestaques[+index + i].price
                              }}</p
                            >
                          </v-row>
                          <v-row align="center" justify="center">
                            <v-card-text class="d-flex align-center justify-center">
                            <v-subheader class="text-truncate" style="max-width: 300px">
                              {{
                              itemDestaques[+index + i].description
                            }}
                            </v-subheader>
                            </v-card-text>
                          </v-row>
                          <v-row align="end" justify="end" >
                            <v-card-actions>
                              <v-btn
                                rounded
                                outlined
                                class="pr-6 pl-6 pinkColorText"
                                @click="toCompra(itemDestaques[+index + i])"
                                >Comprar</v-btn
                              >
                            </v-card-actions>
                          </v-row>
                        </v-card>
                        
                      </v-responsive>
                    </v-col>
                  </template>
                </template>
              </v-row>
            </v-carousel-item>
          </template>
        </v-carousel>
      </v-responsive>
    </v-col>
    <v-col cols="10" class="">
      <v-row align="center" justify="center">
        <v-divider></v-divider>
        <h1 class="mr-3 ml-3 navTitle">Promoções</h1>
        <v-divider></v-divider>
      </v-row>
      <v-row align="center" justify="center" class="">
        <template v-for="(promocao, index) in itemPromocoes">
          <v-col
            cols="6"
            md="3"
            lg="3"
            sm="4"
            class="align-center justify-center d-flex"
          >
            
              <v-card class="pa-5 flex-grow-1" elevation="5">
                <v-row align="center" justify="center">
                  <v-img
                    contain
                    :aspect-ratio="16 / 9"
                    :src="promocao.image_url"
                    max-height="220"
                    max-width="160"
                    class="mt-2 d-none d-sm-flex"
                  ></v-img>
                  
                </v-row>
                <v-row align="center" justify="center">
                  <v-img
                    contain
                    :aspect-ratio="16 / 9"
                    :src="promocao.image_url"
                    max-height="120"
                    max-width="80"
                    class="mt-2 d-flex d-sm-none"
                  ></v-img>
                </v-row>
                <v-icon color="yellow"
                  absolute
                  top
                  right
                      >mdi-lightning-bolt</v-icon
                    >
                <v-row align="start" justify="center">
                  <v-card-title
                  
                    class="text-caption text-lg-body-1"
                    >
                    <span class="pinkTitle text-truncate" style="max-width: 130px" >{{ promocao.item_name }}</span>
                    </v-card-title
                  >
                </v-row>

                <v-row align="center" justify="center">
                  <v-subheader class="mt-n8 "
                    >Promoção</v-subheader
                  >
                </v-row>
                <v-row align="center" justify="center">
                  <v-subheader class="mt-n7 textColorDefault text-lg-button"
                    >R${{ promocao.price }}</v-subheader
                  >
                </v-row>
                <v-row align="center" justify="center">
                  
                  <v-subheader class=" text-truncate" style="max-width: 200px">
                    {{
                    promocao.description
                  }}
                  </v-subheader>
                 
                </v-row>

                <v-row align="center" justify="center">
                  <v-card-actions class="ma-2">
                    <v-btn outlined rounded class=" pl-4 pr-4" @click="toCompra(promocao)">Comprar</v-btn>
                  </v-card-actions>
                </v-row>
              </v-card>
           
          </v-col>
        </template>
      </v-row>
    </v-col>
    <v-col
      cols="12"
      :key="index"
      class="mt-12"
      v-for="(categoria, index) in categorias"
    >
      
      
        <v-container fluid ma-0 pa-0 fill-height class="d-flex">
          <v-row align="center" justify="center" class="mt-3">
            
              <v-card style="width: 100%" v-if="categoria.items.length > 0" elevation="5" class="pa-3">
              <v-row justify="start" class="mt-3">
                <v-card-title class="ml-6 CategoryName"
                  ><b>{{ categoria.category_name }}</b>
                  </v-card-title
                >
                
              </v-row>

              <v-card-text>
                <v-data-iterator
                  :headers="headers"
                  :items="categoria.items"
                  hide-default-header
                  hide-default-footer
                  class="d-flex flex-column mh-100 ma-5"
                >
                  <template v-slot:default="props">
                    <v-row class="fill-height overflow-auto d-flex align-center justify-center" id="container">
                      <v-col
                        v-for="(item, idx) in props.items"
                        :key="item.item_name"
                        :cols="12 / itemsPerRow"
                        class=" mb-5"
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
                            <v-row no-gutters>
                              <v-col cols="8" md="10" xl="10" sm="10" lg="10">
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
                              <v-col cols="4" md="2" sm="2" xl="2" lg="2">
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
      
            
          </v-row>
        </v-container>
      
    </v-col>
  </v-row>
  </v-app>
  
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["object"],
  data: () => ({
    storeHasImage: false,
    store: "",
    cardapio: "",
    drawer: false,
    colors: [
      "indigo",
      "warning",
      "pink darken-2",
      "red lighten-1",
      "deep-purple accent-4",
    ],
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
    itemDestaques: [],
    itemPromocoes: [],
    categorias: [],
    slides: ["First", "Second", "Third", "Fourth", "Fifth"],
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
    itemsPerRow() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return 1;
        case "sm":
          return 1;
        case "md":
          return 2;
        case "lg":
          return 2;
        case "xl":
          return 3;
      }
    },
    columns() {
      if (this.$vuetify.breakpoint.xl) {
        return 4;
      }
      if (this.$vuetify.breakpoint.lg) {
        return 3;
      }

      if (this.$vuetify.breakpoint.md) {
        return 2;
      }

      return 1;
    },
    ...mapGetters([
      "getLoading",
      "getLoaded",
      "getCardapio",
      "getDestaques",
      "getPromocoes",
    ]),
  },

  async created() {
    if (this.getDestaques.length > 0) {
      this.itemDestaques = this.getDestaques;
      this.itemPromocoes = this.getPromocoes;
      //console.log(this.getCardapio);
      this.categorias = this.getCardapio.cardapio;
    }
  },
};
</script>

<style scoped>
@import "./cardapio.module.css";
.layout {
  display: inline-block;
  width: 100%;
}
</style>
