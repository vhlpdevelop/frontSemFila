<template>
  <v-app>
    <v-container fluid fill-height class="backgroundHome d-inline-block">
      <v-row class="justify-center align-center text-center">
        <v-col cols="12" md="12" lg="12">
          <span class="headerTitle">Hora de deixar tudo mais fácil</span>
        </v-col>
        <v-col cols="12" md="12" lg="12" class="mt-n6">
          <span class="headersubTitle"
            >A facilidade está aqui. É só apontar a camêra</span
          >
        </v-col>
        <v-col cols="12" md="12" lg="6" sm="12" xs="12">
          <v-row class="justify-center align-center text-center">
            <v-col cols="12" xl="8" md="7" lg="8" sm="7" xs="12">
              <v-text-field
                hide-details
                dense
                prepend-icon="mdi-keyboard"
                append-icon="mdi-keyboard-return"
                label="Digite o lugar que está procurando"
                v-model="search"
                solo
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" lg="6" sm="6" xs="12">
              <v-btn outlined @click="moveTo()" block color="#FE938C" class="buttonSearch ">Buscar</v-btn>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="12" lg="12" sm="12" xs="12" class="d-flex">
          <v-container fluid>
            <v-row align="center" justify="center">
              <v-col cols="12" md="5" lg="5" sm="6">
                <v-card
                  elevation="2"
                  outlined
                  shaped
                  class="d-flex sheetsPinky mr-6 pa-2"
                >
                  <v-row class="align-start justify-start mt-3 ml-3">
                    <v-card-title class="white--text cardTitle"
                      >Festa</v-card-title
                    >
                  </v-row>
                  <v-row class="align-end d-flex justify-start">
                    <v-btn class="ml-n12 mb-6 " rounded x-small outlined
                      >Veja as opções
                      <v-icon right>mdi-arrow-right</v-icon></v-btn
                    >
                  </v-row>
                  <v-row class="align-end d-flex justify-end">
                    <v-img
                      contain
                      max-height="160"
                      max-width="230"
                      :src="imagebalde"
                    ></v-img>
                  </v-row>
                </v-card>
              </v-col>
              <v-col cols="12" md="5" lg="5" sm="6">
                <v-card
                  elevation="2"
                  outlined
                  shaped
                  class="d-flex sheetsMarine mr-6 pr-5 pl-5 pb-2"
                >
                  <v-row class="align-start d-flex justify-start mt-3 ml-3">
                    <v-card-title class="white--text cardTitle"
                      >Bar</v-card-title
                    >
                  </v-row>
                  <v-row class="align-end d-flex justify-start">
                    <v-btn class="ml-n12 mb-6 " rounded x-small outlined
                      >Veja as opções
                      <v-icon right>mdi-arrow-right</v-icon></v-btn
                    >
                  </v-row>
                  <v-row class="align-end d-flex justify-end">
                    <v-img
                      contain
                      max-height="160"
                      max-width="230"
                      :src="imagebalde"
                    ></v-img>
                  </v-row>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
        <v-col cols="12" md="12" lg="12" sm="12" xs="12">
          <v-row>
            <v-col cols="12" md="4" lg="4" sm="4" xs="4">
              <v-card class="sheetsPinky mr-6 pa-6">
              <v-row class="align-start justify-start">
                <v-card-title class="white--text">QrCodes <v-icon right color="black"> mdi-qrcode</v-icon></v-card-title>
              </v-row>
              <v-row class="align-end justify-end white--text">
                Cada produto é um qrcode único e possuindo dados criptografados para manter a segurança. E o melhor, você pode compartilhar eles.
              </v-row>
              <v-row class="align-end justify-start">
                <v-container fluid>
                  <v-btn text rounded color="#589D6C">Saiba mais</v-btn>
                </v-container>
              </v-row>
            </v-card>
            </v-col>
            <v-col cols="12" md="4" lg="4" sm="4" xs="4">
              <v-card class="sheetsMarine mr-6 pa-6">
              <v-row class="align-start justify-start ">
                <v-card-title class="white--text">Seja um SemFila</v-card-title>
              </v-row>
              <v-row class="align-end justify-end white--text">
                Que tal um upgrade no cardápio digital ? E o melhor, é acessado em qualquer lugar sem precisar do QrCode!
              </v-row>
              <v-row class="align-end justify-start">
                <v-container fluid>
                  <v-btn rounded outlined color="#FE938C">Começar!</v-btn>
                </v-container>
              </v-row>
            </v-card>
            </v-col>
            <v-col cols="12" md="4" lg="4" sm="4" xs="4">
              <v-card class="sheetsPinky mr-6 pa-6">
              <v-row class="align-start justify-start">
                <v-card-title class="white--text">Se liga nos Destaques <v-icon color="red"> mdi-fire</v-icon></v-card-title>
              </v-row>
              <v-row class="align-end justify-end white--text">
                Só os mais escolhidos para você quando navega no cardápio! E não só isso como os melhores preços e a indicação da casa.
              </v-row>
              <v-row class="align-end justify-start">
                <v-container fluid>
                  <v-btn text rounded color="#589D6C">Saiba mais</v-btn>
                </v-container>
              </v-row>
            </v-card>
            </v-col>
          </v-row>
            
            
          
        </v-col>
      </v-row>
    </v-container>
    <v-container fluid>  </v-container>

  </v-app>
</template>

<script>
export default {
  name: "NoLine",
  data: () => ({
    drawer: null,
    appTitle: "NoLine - Sem Fila",
    navDrawer: true,
    search:"",
    imagebalde: require("../../img/balde.png"),
  }),

  computed: {}, //mapGetters([""]),
  methods: {
    //...mapActions([""]),
    moveTo(){
      
      this.$router.push({
        //arrumar os props
        name: "homeCardapio",
        params: {
          id: this.search
        },
      });
    }
  },
  created() {},
};
</script>

<style scoped>
@import "./home.module.css";
</style>
