<template>
  <v-app style="background-color: rgb(245,245,245) !important;">
    <v-container fluid fill-height class=" d-inline-block">
      <v-row class="justify-center align-center text-center">
        <v-container fluid fill-height class="d-flex justify-center align-center mb-16 mt-6">
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
            <v-col cols="12" class="mt-2 mb-6">
              <v-btn outlined icon fab @click="goTo()" ><v-icon>mdi-arrow-down</v-icon></v-btn>
            </v-col>
          </v-row>
        </v-col>
        </v-container>
        

        <v-col cols="12" md="12" lg="12" sm="12" xs="12" class="mt-16" ref="section_start" >
          <section_1  >
            
          </section_1>
        </v-col>
        <v-col cols="12" md="12" lg="12" sm="12" xs="12" class="mt-16 mb-6 d-row align-center justify-center" style="background: white" >
          <section_partness class="" ></section_partness>
        </v-col>
        
        <v-col cols="12" md="12" lg="12" sm="12">
          <v-row justify="center" align="center">
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
import section_1 from "./home_components/section_start.vue"
import section_numbers from "./home_components/section_numbers.vue"
import section_ratings from "./home_components/section_ratings.vue"
import section_partness from "./home_components/section_partness.vue"
export default {
  components: {
    section_1,
    section_numbers,
    section_partness,
    section_ratings
  },

  name: "SemFila",
  data: () => ({
    drawer: null,
    appTitle: "Sem Fila",
    navDrawer: true,
    search:"",
    imagebalde: require("../../img/balde.png"),
  }),

  computed: {}, //mapGetters([""]),
  methods: {
    //...mapActions([""]),
    goTo(){
      var element = this.$refs['section_start'];
      
      var top = element.offsetTop;
      
      window.scrollTo(0, top+120);
    },  
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
