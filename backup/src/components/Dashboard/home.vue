<template>
  <v-app class="backgroundHome">
    <v-container fluid fill-height class="d-inline-block">
      <v-row class="justify-center align-center text-center">
        <v-container fluid fill-height class="d-flex justify-center align-center mb-16 mt-6">
          <v-col cols="12" md="12" lg="12">
            <span class="headerTitleHome">Hora de deixar tudo mais fácil</span>
          </v-col>
          <v-col cols="12" md="12" lg="12" class="mt-n8">
            <span class="headersubTitleHome">A facilidade está aqui.</span>
          </v-col>
          <v-col cols="12" md="12" lg="6" sm="12" xs="12">
            <v-row class="justify-center align-center text-center">
              <v-col cols="12" xl="12" md="10" lg="12" sm="7" xs="12">
                
                <v-menu offset-y>
                  <template v-slot:activator="{ on, attrs }">
                    
                    <v-text-field hide-details dense append-icon="mdi-keyboard-return" v-bind="attrs" v-on="on"
                  label="Digite o lugar que está procurando" v-model="search" class="searchField" solo></v-text-field>
                  </template>
                  <v-list>
                    <v-list-item-group>
                      <v-list-item v-for="store in computedObj" :key="store._id">
                        <v-list-item-title @click="moveTo(store.store_url)"><v-icon class="mr-2" color="white" small>mdi-arrow-right</v-icon>{{ store.name }}</v-list-item-title>
                      </v-list-item>
                    </v-list-item-group>
                  </v-list>
                </v-menu>

              </v-col>

            </v-row>
          </v-col>
        </v-container>
        <v-col cols="12" md="12" lg="12" sm="12" xl="12">
          <v-row align="center" justify="center">
            <v-col cols="12" md="12" lg="8" sm="12" xl="12" class="d-flex">
              <v-row align="center" justify="center">
                <v-col cols="6" class="d-flex flex-grow-1">
                  <v-card class="rounded-xl cardColor1 flex-grow-1">
                    <v-row no-gutters>
                      <v-col cols="12">
                        <v-row no-gutters class="d-flex mb-n12 pt-4 mt-md-n4 mt-n4 mt-lg-n4">
                          <v-col cols="12">
                            <p class="mt-4 ml-2 textCardSection text-start text-sm-center " order="1">Restaurante</p>
                          </v-col>

                        </v-row>
                      </v-col>
                      <v-col cols="12" lg="6" md="6" xl="6"
                        class="d-flex align-center justify-sm-center align-sm-center" order-xl="1" order-lg="1"
                        order-md="1" order-sm="2" order="2">
                        <a class="ml-3 mt-1 optionCard " @click="$router.push({name:'restauranteecafe'})">
                          Inscreva-se >
                        </a>
                      </v-col>
                      <v-col cols="12" lg="6" md="6" xl="6" order-xl="2" order-lg="2" order-md="2" order-sm="1"
                        order="1" class="mt-n4">
                        <div class="d-flex justify-sm-center">
                          <v-img max-width="176" max-height="202" contain class="mt-5 imageShadow"
                            src="https://i.ibb.co/xztHGY6/Pizza-PNG-Transparente-Sem-Fundo.png">
                          </v-img>
                        </div>

                      </v-col>
                    </v-row>
                  </v-card>
                </v-col>
                <v-col cols="6" class="d-flex flex-grow-1">
                  <v-card class="rounded-xl fill-height cardColor2 flex-grow-1">
                    <v-row no-gutters justify="center" align="center">
                      <v-col cols="12">
                        <v-row no-gutters class="d-flex mb-n12 pt-4 mt-md-n4 mt-n4 mt-lg-n4">
                          <v-col cols="12">
                            <p class="mt-4 ml-2 textCardSection text-sm-center" order="1">Bar</p>
                          </v-col>

                        </v-row>
                      </v-col>
                      <v-col cols="12" lg="6" md="6" xl="6" class="d-flex align-center justify-sm-center" order-xl="1"
                        order-lg="1" order-md="1" order-sm="2" order="2">
                        <a class="ml-3 mt-1 optionCard " @click="$router.push({name:'festaebar'})">
                          Cadastre-se >
                        </a>
                      </v-col>
                      <v-col cols="12" lg="6" md="6" xl="6" order-xl="2" order-lg="2" order-md="2" order-sm="1"
                        order="1" class=" mt-n4 ">
                        <div class="d-flex justify-sm-center">
                          <v-img max-width="176" max-height="202" contain
                            class="mt-5 imageShadow d-flex align-self-center"
                            src="https://i.ibb.co/yRF9wxQ/img-chopp.png">
                          </v-img>
                        </div>

                      </v-col>
                    </v-row>
                  </v-card>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="12" md="12" lg="12" sm="12" xl="12" class="mt-12">
          <v-row align="center" justify="center">
            <v-col cols="12" md="12" lg="6" sm="12" xl="12" class="d-flex">
              <v-row align="center" justify="center">
                <v-col cols="4" class="d-flex flex-grow-1">
                  <v-card height="100px" class="rounded-xl smallcardColor1 flex-grow-1">
                    <v-row no-gutters>
                      <v-col cols="12" sm="6" md="6" lg="6" xl="6" class="d-flex align-end">
                        <a @click="$router.push({name:'festaebar'})" class="smalltextCardSection pa-0 ma-0 mb-n3 ml-2">
                          Pub >
                        </a>
                      </v-col>
                      <v-col cols="12" sm="6" md="6" lg="6" xl="6" class="d-flex"> <v-img max-width="119"
                          max-height="108" contain class=" imageShadow" aspect-ratio="1.1"
                          src="https://i.ibb.co/m8v9zTN/imgbin-budweiser-beer-anheuser-busch-inbev-distilled-beverage-png.png">
                        </v-img> </v-col>
                    </v-row>
                  </v-card>
                </v-col>
                <v-col cols="4" class="d-flex flex-grow-1">
                  <v-card height="100px" class="rounded-xl smallcardColor2 flex-grow-1">
                    <v-row no-gutters>
                      <v-col cols="12" sm="6" md="6" lg="6" xl="6" class="d-flex align-end">
                        <a @click="$router.push({name:'restauranteecafe'})" class="smalltextCardSection mb-n2 ml-2">
                          Café >
                        </a> </v-col>
                      <v-col cols="12" sm="6" md="6" lg="6" xl="6"> <v-img max-width="119" max-height="108" contain
                          class=" imageShadow" style="padding: 2px 2px 2px 2px;"
                          src="https://i.ibb.co/bPgsS6Q/kisspng-white-coffee-coffee-cup-cafe-caf-au-lait-cafs-in-berlin-amp-kaffeersterei-exclusive-5b7bbb7a.png">
                        </v-img> </v-col>
                    </v-row>
                  </v-card>
                </v-col>
                <v-col cols="4" class="d-flex flex-grow-1">
                  <v-card height="100px" class="rounded-xl smallcardColor3 flex-grow-1">
                    <v-row no-gutters>
                      <v-col cols="12" sm="6" md="6" lg="6" xl="6" class="d-flex align-end ">
                        <a @click="$router.push({name:'festaebar'})" class="smalltextCardSection ml-2 ">Show ></a> </v-col>
                      <v-col cols="12" sm="6" md="6" lg="6" xl="6"> <v-img max-width="119" max-height="108" contain
                          class="imageShadow"
                          src="https://i.ibb.co/KwPFDbc/kisspng-computer-speakers-sound-box-subwoofer-pro-acoustics-5b1b0bfcaa8be3-3841475715284991966986.png">
                        </v-img> </v-col>
                    </v-row>
                  </v-card>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="12" md="12" lg="12" sm="12" xl="12" class="mt-16">
          <v-container fluid class="pr-10 pl-10">
            <v-divider dark></v-divider>
          </v-container>

        </v-col>
        <v-col cols="12" md="12" lg="12" sm="12" xs="12" class=" mb-6 d-row align-center justify-center">
          <section_partness class=""></section_partness>
        </v-col>
        <v-col cols="12" md="12" lg="12" sm="12" xl="12" class="">
          <v-container fluid class="pr-10 pl-10">
            <v-divider dark></v-divider>
          </v-container>

        </v-col>
        <v-col cols="12" md="12" lg="12" sm="12" xl="12" class="">
          <v-container fluid class="backgroundSec3">
            <v-row no-gutters>
              <v-col cols="12" sm="8" md="8" lg="6" xl="6">

              </v-col>
              <v-col cols="12" sm="4" md="4" lg="6" xl="6" class="d-flex align-center justify-center">
                <v-container fluid fill-height class="white--text d-flex align-center justify-center mt-sm-10">
                  <v-row class="d-flex align-center justify-center mt-lg-16 mt-sm-16 mt-n10">
                    <v-col cols="12">
                      <h1 class="text-start text-md-justify text-lg-justify text-sm-justify text-lg-justify textHeaderSec3">Você tem vontade de criar
                        um QrCode?</h1>
                    </v-col>
                    <v-col cols="12">
                      <p class="text-start white--text text-sm-justify text-lg-justify text-md-justify textGrow">Seja um SemFila Tech e veja como é inovar o
                        digital.</p>
                    </v-col>
                    <v-col cols="12"
                      class="d-flex align-center justify-center justify-lg-start justify-sm-end justify-md-start ">
                      <v-btn outlined class="buttonSec3" @click="$router.push({ name: 'comece' })">Saiba mais</v-btn>
                    </v-col>
                  </v-row>
                </v-container>
              </v-col>
            </v-row>
          </v-container>

        </v-col>
        <v-col cols="12" class="mt-16">
          <section_ratings></section_ratings>
        </v-col>
        <v-col cols="12" class="mt-16">
          <section_numbers></section_numbers>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import section_1 from "./home_components/section_start.vue";
import section_numbers from "./home_components/section_numbers.vue";
import section_ratings from "./home_components/section_ratings.vue";
import section_partness from "./home_components/section_partness.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    section_1,
    section_numbers,
    section_partness,
    section_ratings,
  },

  name: "SemFila",
  metaInfo() {
    return {
      title: "Conheça a SemFila",
      titleTemplate: null,
      meta: [
        { name: 'description', content: 'A nova maneira de comprar com QrCode.' },
      ]
    }
  },
  data: () => ({
    drawer: null,
    appTitle: "Sem Fila",
    navDrawer: true,
    search: "",
    searched: [
    ],
    limit: 5,
    imagebalde: require("../../img/balde.png"),
  }),
  watch: {
    search(after, before) {
      this.searchIt();
    }
  },
  computed: {
    ...mapGetters(["getSearch"]),
    computedObj(){
    return this.limit ? this.searched.slice(0,this.limit) : this.searched
  }
  },
  methods: {
    ...mapActions(["fetchSearch"]),
    goTo() {
      var element = this.$refs["section_start"];

      var top = element.offsetTop;

      window.scrollTo(0, top + 120);
    },
    searchIt() {
      this.fetchSearch(this.search).then(() => {
        this.searched = this.getSearch
      });
    },
    moveTo(keyword) {
      this.search=keyword
      this.$gtag.event('search', { method: 'Google' })
      this.$router.push({
        //arrumar os props
        name: "homeCardapio",
        params: {
          id: keyword,
        },
      });
    },
  },
  created() { },
  mounted() {
    document.dispatchEvent(new Event('render-complete'))
  }
};
</script>

<style scoped>
.textGrow {
  font-size: calc(15px + 0.390625vw) !important;
}
.buttonSec3 {
  font-family: Josefin Sans !important;
  font-size: 1em !important;
  background-color: #f24236 !important;
  box-shadow: 7px 6px 5px 1px rgba(0, 0, 0, 0.25);
}

.backgroundSec3 {
  background-image: url("../../img/img_fundo_home.png");
  height: 480px;
  background-position: left;
  background-repeat: no-repeat;
  background-size: contain;
}

.theme--dark.v-divider {
  border-color: #E8E8E7 !important;
}

@import "./home.module.css";
</style>
