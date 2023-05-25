<template>
  <v-app>
    <v-container
      pa-12
      fluid
      class="white--text backgroundTornar textComeceDefault"
    >
      <v-row justify="center">
        <v-col cols="12" md="8" sm="8" lg="6" xl="8">
          <v-subheader class="white--text">Sobre SemFila</v-subheader>
          <h1 class="mb-5 text-start">
            <span class="cardTitle ">Chega de filas</span>, cardápios digitais
            estáticos e gastar com equipamento eletrônico caro para realizar
            pedidos!
          </h1>
          <p class="text-start ">
            Criar cardápios digitais de fácil uso e acesso é a nossa paixão e
            dedicação. Tecnologia é o nosso oficío.
          </p>
        </v-col>
      </v-row>
    </v-container>
    <v-container fluid pa-12 class="text-center textComeceDefault">
      <v-row justify="center">
        <v-col cols="12" md="8" sm="10" lg="8" xl="10">
          <v-subheader class="white--text"
            >O que é <span class="textColorDefaultDashBoard ml-1">SemFila</span>
          </v-subheader>
          <v-divider dark></v-divider>
          <p class="pa-5 textGrow">
            É um cardápio digital de fácil acesso e uso, onde o consumidor
            realiza compras com o estabelecimento e apresenta um QrCode que
            possui dados criptografados do pedido realizado.
          </p>
          <v-subheader class="white--text ">Nosso <span class="textColorDefaultDashBoard ml-1">conceito</span></v-subheader>
          <v-divider dark></v-divider>
          <p class="pa-5 textGrow">
            Queremos cobrar barato para entregar muito. Quem consome pode pedir
            reembolso dos produtos a qualquer momento e se ele não usar o qrcode
            também recebe devolta.
          </p>
          <v-subheader class="white--text">Onde <span class="textColorDefaultDashBoard ml-1">surgiu</span></v-subheader>
          <v-divider dark></v-divider>
          <p class="pa-5 textGrow">
            A ideia surgiu em uma cidadezinha do interior de Mato grosso do Sul,
            em uma festa com uma gigantesca fila. ´Eu só queria beber uma
            cerveja´, foi então o ínicio.
          </p>
        </v-col>
      </v-row>
    </v-container>
    <v-container
      fluid
      pa-12
      class="text-center textComeceDefault d-flex align-center justify-center"
    >
      <v-row class="d-flex justify-center">
        <v-col cols="12" md="8" sm="8" lg="8" xl="8">
          <v-subheader
            class="white--text text-center text-sm-start text-md-start text-lg-start text-xl-start"
            >O que <span class="textColorDefaultDashBoard ml-1">entregamos?</span>
          </v-subheader>
          <v-row class="d-flex justify-center">
            <v-col cols="6" sm="3" md="4" lg="2" xl="2" class="d-flex">
              <v-card class="pa-2 flex-grow-1 cardPartners" width="120">
                <v-row no-gutters>
                  <v-col cols="12" lg="7" class="d-flex justify-end">
                    <v-icon small color="red">mdi-check-decagram</v-icon>
                  </v-col>
                  <v-col cols="12" class="d-flex justify-start mt-n5">
                    <v-row class="mt-4">
                      <v-col
                        cols="12"
                        class="d-flex align-center justify-center"
                      >
                        <v-avatar icon size="60" tile class="rounded-xl">
                          <v-icon x-large color="blue"> mdi-lock </v-icon>
                        </v-avatar>
                      </v-col>
                      <v-col cols="12" class="">
                        <p class="text-center">
                          <span class="font-weight-bold white--text"
                            >Segurança</span
                          >
                        </p>
                        <p class="grey--text text-center mt-n4">
                          na sua compra
                        </p></v-col
                      >
                    </v-row>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
            <v-col cols="6" sm="3" md="4" lg="2" xl="2" class="d-flex">
              <v-card class="pa-2 flex-grow-1 cardPartners" width="120">
                <v-row no-gutters>
                  <v-col cols="12" lg="7" class="d-flex justify-end">
                    <v-icon small color="red">mdi-check-decagram</v-icon>
                  </v-col>
                  <v-col cols="12" class="d-flex justify-start mt-n5">
                    <v-row class="mt-4">
                      <v-col
                        cols="12"
                        class="d-flex align-center justify-center"
                      >
                        <v-avatar icon size="60" tile class="rounded-xl">
                          <v-icon x-large color="secondary">
                            mdi-package-variant-closed-check
                          </v-icon>
                        </v-avatar>
                      </v-col>
                      <v-col cols="12" class="">
                        <p class="text-center">
                          <span class="font-weight-bold white--text"
                            >Logística</span
                          >
                        </p>
                        <p class="grey--text text-center mt-n4">
                          para estoque da empresa
                        </p></v-col
                      >
                    </v-row>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
            <v-col cols="6" sm="3" md="4" lg="2" xl="2" class="d-flex">
              <v-card class="pa-2 flex-grow-1 cardPartners" width="120">
                <v-row no-gutters>
                  <v-col cols="12" lg="7" class="d-flex justify-end">
                    <v-icon small color="red">mdi-check-decagram</v-icon>
                  </v-col>
                  <v-col cols="12" class="d-flex justify-start mt-n5">
                    <v-row class="mt-4">
                      <v-col
                        cols="12"
                        class="d-flex align-center justify-center"
                      >
                        <v-avatar icon size="60" tile class="rounded-xl">
                          <v-icon x-large color="green">
                            mdi-trending-up
                          </v-icon>
                        </v-avatar>
                      </v-col>
                      <v-col cols="12" class="">
                        <p class="text-center">
                          <span class="font-weight-bold white--text"
                            >Aumento</span
                          >
                        </p>
                        <p class="grey--text text-center mt-n4">
                          geral nas vendas
                        </p></v-col
                      >
                    </v-row>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
            <v-col cols="6" sm="3" md="4" lg="2" xl="2" class="d-flex">
              <v-card class="pa-2 flex-grow-1 cardPartners" width="120">
                <v-row no-gutters>
                  <v-col cols="12" lg="7" class="d-flex justify-end">
                    <v-icon small color="red">mdi-check-decagram</v-icon>
                  </v-col>
                  <v-col cols="12" class="d-flex justify-start mt-n5">
                    <v-row class="mt-4">
                      <v-col
                        cols="12"
                        class="d-flex align-center justify-center"
                      >
                        <v-avatar icon size="60" tile class="rounded-xl">
                          <v-icon x-large color="orange">
                            mdi-cash-check
                          </v-icon>
                        </v-avatar>
                      </v-col>
                      <v-col cols="12" class="">
                        <p class="text-center">
                          <span class="font-weight-bold white--text"
                            >Gratuito</span
                          >
                        </p>
                        <p class="grey--text text-center mt-n4">
                          para iniciar seu negócio
                        </p></v-col
                      >
                    </v-row>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
            <v-col cols="6" sm="3" md="4" lg="2" xl="2" class="d-flex">
              <v-card class="pa-2 flex-grow-1 cardPartners" width="120">
                <v-row no-gutters>
                  <v-col cols="12" lg="7" class="d-flex justify-end">
                    <v-icon small color="red">mdi-check-decagram</v-icon>
                  </v-col>
                  <v-col cols="12" class="d-flex justify-start mt-n5">
                    <v-row class="mt-4">
                      <v-col
                        cols="12"
                        class="d-flex align-center justify-center"
                      >
                        <v-avatar icon size="60" tile class="rounded-xl">
                          <v-icon x-large color="primary"> mdi-sitemap </v-icon>
                        </v-avatar>
                      </v-col>
                      <v-col cols="12" class="">
                        <p class="text-center">
                          <span class="font-weight-bold white--text"
                            >Simplicidade</span
                          >
                        </p>
                        <p class="grey--text text-center mt-n4">
                          na hora de usar
                        </p></v-col
                      >
                    </v-row>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
    <v-container fluid class="text-center textComeceDefault my-10 mb-16">
      <v-row justify="center" class="mb-10">
        <v-col cols="12" md="8" sm="10" lg="8" xl="10">
          <h1 class="mt-10 mb-10" style="font-size: 1.5rem">
            Conheça nosso plano <span class="textColorDefaultDashBoard"> SemFila</span>
          </h1>
          <v-row justify="center">
            <v-col cols="12" md="6" sm="6" lg="6" xl="6">
              <v-card>
                <v-row class="pa-2 d-flex align-center justify-center">
                  <v-col cols="12" class="d-flex align-center justify-center">
                    <v-icon color="green" class="mr-2">mdi-check</v-icon
                    ><span> Seu cardapio no SemFila</span>
                  </v-col>
                  <v-col cols="12" class="d-flex align-center justify-center">
                    <v-icon color="green" class="mr-2">mdi-check</v-icon
                    ><span> Painel administrativo</span>
                  </v-col>
                  <v-col cols="12" class="d-flex align-center justify-center">
                    <v-icon color="green" class="mr-2">mdi-check</v-icon
                    ><span> Total controle dos preços</span>
                  </v-col>
                  <v-col cols="12" class="d-flex align-center justify-center">
                    <span class="font-weight-bold mr-2">5%</span>
                    <span>Comissão sobre pedidos</span>
                  </v-col>
                  <v-col cols="12" class="d-flex align-center justify-center">
                    <span class="font-weight-bold mr-2">1%</span>
                    <span>Taxa para retirada semanal</span>
                  </v-col>
                  <v-col cols="12" class="d-flex align-center justify-center">
                    <span class="font-weight-bold mr-2">0%</span>
                    <span>Taxa para retirada mensal</span>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
    <section_startVue></section_startVue>
    <v-container fluid class="text-center textComeceDefault my-10 mb-16">
      <v-divider dark></v-divider>
      <v-row justify="center" class="mb-10">
        <v-col cols="12" md="8" sm="10" lg="8" xl="10">
          <h1 class="mt-10 mb-10" style="font-size: 1.5rem">
            Qualquer um pode ser <span class="textColorDefaultDashBoard"> SemFila</span>
          </h1>
          <v-row justify="center">
            <v-col cols="12" md="6" sm="6" lg="6" xl="6">
              <p class="text-start pa-5 pa-sm-1 pa-md-1 pa-lg-1 pa-xl-1" >
                Comece agora, totalmente gratuito. Com o nosso painel
                administrativo você tem acesso a todo nosso trabalho.
              </p>
            </v-col>
            <v-col
              cols="12"
              md="6"
              sm="6"
              lg="6"
              xl="6"
              class="d-flex justify-center align-center"
            >
            <a href="https://semfila.tech">
              <v-btn rounded outlined class="buttonSearch"
                >Quero começar agora</v-btn
              >
            </a>
              
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>
<script>
import section_startVue from './home_components/section_start.vue';
export default {
  metaInfo() {
        return { 
            title: "Seja um parceiro SemFila",
            titleTemplate: null,
            meta: [
                { name: 'description', content:  'Gerencie seu cardapio de forma rápida e simples. Configure seu cardápio...'},           
            ]
        }
    },
  components:{
    section_startVue
  },
  mounted(){
    document.dispatchEvent(new Event('render-complete'))
  }
};
</script>
<style>
.textGrow{
  font-size: calc(13px + 0.390625vw) !important;
}
.cardPartners {
  background: rgba(16, 12, 8, 1) !important;
  border-color: #e8e8e7 !important;
  border-radius: 10px !important;
  border-style: solid !important;
}
.backgroundCard {
  width: 300px !important;
  background: rgba(16, 12, 8, 1) !important;
  overflow-y: hidden !important;
  overflow-x: hidden !important;
  height: 100px !important;
}
.textHeader {
  font-size: 1.8rem;
}
.cardColorPartner {
  background: #f24236 !important;
  border-color: #e8e8e7 !important;
  border-radius: 5px !important;
  border-style: solid !important;
}
@import "./home.module.css";
</style>
