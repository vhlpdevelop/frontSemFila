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
                solo
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" lg="6" sm="6" xs="12">
              <v-btn block class="buttonSearch white--text">Buscar</v-btn>
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
          <v-row class="justify-center align-center text-center mt-6">
            <v-card class="sheetsPinky mr-6 pa-3">
              <v-row class="align-start justify-start">
                <v-card-title class="white--text">Festas</v-card-title>
              </v-row>
              <v-row class="align-end justify-end">
                testes
              </v-row>
              <v-row class="align-end justify-start">
                <v-container fluid>
                  <a>teste</a>
                </v-container>
              </v-row>
            </v-card>
            <v-card class="sheetsPinky mr-6 pa-3">
              <v-row class="align-start justify-start">
                <v-card-title class="white--text">Festas</v-card-title>
              </v-row>
              <v-row class="align-end justify-end">
                testes
              </v-row>
              <v-row class="align-end justify-start">
                <v-container fluid>
                  <a>teste</a>
                </v-container>
              </v-row>
            </v-card>
            <v-card class="sheetsPinky mr-6 pa-3">
              <v-row class="align-start justify-start">
                <v-card-title class="white--text">Festas</v-card-title>
              </v-row>
              <v-row class="align-end justify-end">
                testes
              </v-row>
              <v-row class="align-end justify-start">
                <v-container fluid>
                  <a>teste</a>
                </v-container>
              </v-row>
            </v-card>
            <v-card class="sheetsPinky mr-6 pa-3">
              <v-row class="align-start justify-start">
                <v-card-title class="white--text">Festas</v-card-title>
              </v-row>
              <v-row class="align-end justify-end">
                testes
              </v-row>
              <v-row class="align-end justify-start">
                <v-container fluid>
                  <a>teste</a>
                </v-container>
              </v-row>
            </v-card>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
    <v-container fluid> <v-divider></v-divider> </v-container>
    <v-container fluid> </v-container>
    <v-container fluid> </v-container>
    <v-container fluid> </v-container>
  </v-app>
</template>

<script>
export default {
  name: "NoLine",
  data: () => ({
    drawer: null,
    appTitle: "NoLine - Sem Fila",
    navDrawer: true,
    imagebalde: require("../../img/balde.png"),
  }),

  computed: {}, //mapGetters([""]),
  methods: {
    //...mapActions([""]),
  },
  created() {},
};
</script>

<style scoped>
@import "./home.module.css";
</style>
