<template>
  <v-app>
    <v-container pa-12 fluid class="white--text backgroundTornar textComeceDefault">
      <v-row justify="center">
        <v-col cols="12" md="8" sm="8" lg="6" xl="8">
          <v-subheader class="white--text">Sobre SemFila</v-subheader>
          <h1 class="mb-5 text-start">
            <span class="cardTitle">Chega de filas</span>, cardápios digitais estáticos e gastar com
            equipamento eletrônico caro para realizar pedidos!
          </h1>
          <p class="text-start">
            Criar cardápios digitais de fácil uso e acesso é a nossa paixão e
            dedicação. Tecnologia é o nosso oficío.
          </p>
        </v-col>
      </v-row>
    </v-container>
    <v-container fluid pa-12 class="text-center textComeceDefault">
      <v-row justify="center">
        <v-col cols="12" md="8" sm="10" lg="8" xl="10">
          <v-subheader class="white--text">O que é <span class="textColorDefault ml-1">SemFila</span> </v-subheader>
          <v-divider dark></v-divider>
          <p class="pa-5">
            É um cardápio digital de fácil acesso e uso, onde o consumidor
            realiza compras com o estabelecimento e apresenta um QrCode que
            possui dados criptografados da Nota fiscal e do pedido realizado.
          </p>
          <v-subheader class="white--text">Nosso conceito</v-subheader>
          <v-divider dark></v-divider>
          <p class="pa-5">
            Queremos cobrar barato para entregar muito. Quem consome pode pedir
            reembolso dos produtos a qualquer momento e se ele não usar o qrcode
            também recebe devolta.
          </p>
          <v-subheader class="white--text">Onde surgiu?</v-subheader>
          <v-divider dark></v-divider>
          <p class="pa-5">
            A ideia surgiu em uma cidadezinha do interior de Mato grosso do Sul,
            em uma festa com uma gigantesca fila. ´Eu só queria beber uma
            cerveja´, foi então o ínicio.
          </p>
        </v-col>
      </v-row>
    </v-container>
    <v-container fluid class="text-center textComeceDefault">
      <v-row justify="center">
        <v-col cols="12" md="8" sm="10" lg="8" xl="10">
          <v-subheader class="white--text">O que <span class="textColorDefault ml-1">entregamos?</span> </v-subheader>
          <v-row>
            <v-col>
              <v-card class="pa-2 flex-grow-1 cardPartners" width="120">
            <v-row no-gutters>
              <v-col cols="12" lg="7" class="d-flex justify-end">
                
                  <v-icon small color="red">mdi-check-decagram</v-icon>
                
              </v-col>
              <v-col cols="12" class="d-flex justify-start mt-n5">
                <v-row class="mt-4">
                  <v-col cols="12" class="d-flex align-center justify-center">
                    <v-avatar icon size="60" tile class="rounded-xl">
                      <v-icon x-large color="blue">
                        mdi-lock
                      </v-icon>
                    </v-avatar>
                  </v-col>
                  <v-col cols="12" class="">
                    <p class="text-center">
                      <span class="font-weight-bold white--text"
                        >Segurança</span
                      >
                    </p>
                    <p class="grey--text text-center mt-n4">na sua compra</p></v-col
                  >
                </v-row>
              </v-col>
            </v-row>
          </v-card>
            </v-col>
            <v-col>
              <v-card class="pa-2 flex-grow-1 cardPartners" width="120">
            <v-row no-gutters>
              <v-col cols="12" lg="7" class="d-flex justify-end">
                
                  <v-icon small color="red">mdi-check-decagram</v-icon>
                
              </v-col>
              <v-col cols="12" class="d-flex justify-start mt-n5">
                <v-row class="mt-4">
                  <v-col cols="12" class="d-flex align-center justify-center">
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
                    <p class="grey--text text-center mt-n4">para estoque da empresa</p></v-col
                  >
                </v-row>
              </v-col>
            </v-row>
          </v-card>
            </v-col>
            <v-col>
              <v-card class="pa-2 flex-grow-1 cardPartners" width="120">
            <v-row no-gutters>
              <v-col cols="12" lg="7" class="d-flex justify-end">
                
                  <v-icon small color="red">mdi-check-decagram</v-icon>
                
              </v-col>
              <v-col cols="12" class="d-flex justify-start mt-n5">
                <v-row class="mt-4">
                  <v-col cols="12" class="d-flex align-center justify-center">
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
                    <p class="grey--text text-center mt-n4">geral nas vendas</p></v-col
                  >
                </v-row>
              </v-col>
            </v-row>
          </v-card>
            </v-col>
            <v-col>
              <v-card class="pa-2 flex-grow-1 cardPartners" width="120">
            <v-row no-gutters>
              <v-col cols="12" lg="7" class="d-flex justify-end">
                
                  <v-icon small color="red">mdi-check-decagram</v-icon>
                
              </v-col>
              <v-col cols="12" class="d-flex justify-start mt-n5">
                <v-row class="mt-4">
                  <v-col cols="12" class="d-flex align-center justify-center">
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
                    <p class="grey--text text-center mt-n4">para iniciar seu negócio</p></v-col
                  >
                </v-row>
              </v-col>
            </v-row>
          </v-card>
            </v-col>
            <v-col>
              <v-card class="pa-2 flex-grow-1 cardPartners" width="120">
            <v-row no-gutters>
              <v-col cols="12" lg="7" class="d-flex justify-end">
                
                  <v-icon small color="red">mdi-check-decagram</v-icon>
                
              </v-col>
              <v-col cols="12" class="d-flex justify-start mt-n5">
                <v-row class="mt-4">
                  <v-col cols="12" class="d-flex align-center justify-center">
                    <v-avatar icon size="60" tile class="rounded-xl">
                      <v-icon x-large color="primary">
                        mdi-sitemap
                      </v-icon>
                    </v-avatar>
                  </v-col>
                  <v-col cols="12" class="">
                    <p class="text-center">
                      <span class="font-weight-bold white--text"
                        >Simplicidade</span
                      >
                    </p>
                    <p class="grey--text text-center mt-n4">na hora de usar</p></v-col
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
      <v-divider dark></v-divider>
      <v-row justify="center" class="mb-10">
        <v-col cols="12" md="8" sm="10" lg="8" xl="10">
          <h1 class="mt-10 mb-10">Qualquer um pode ser <span class="textColorDefault"> SemFila</span></h1>
          <v-row justify="center">
            <v-col cols="12" md="6" sm="6" lg="6" xl="6">
                <p class="text-start pa-5 pa-sm-1 pa-md-1 pa-lg-1 pa-xl-1">Comece agora, totalmente gratuito. Com o nosso painel administrativo você tem acesso a todo nosso trabalho.</p>
            </v-col>
            <v-col cols="12" md="6" sm="6" lg="6" xl="6" class="d-flex justify-center align-center">
                <v-btn rounded outlined class="buttonSearch">Me tornar um SemFila</v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>
<script>
export default {};
</script>
<style>
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
.textHeader{
  font-size: 1.8rem;
}
.cardColorPartner{
  background: #F24236 !important;
  border-color: #e8e8e7 !important;
  border-radius: 5px !important;
  border-style: solid !important;
  
}
@import "./home.module.css";
</style>
