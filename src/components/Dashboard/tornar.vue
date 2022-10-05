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
    <v-container style="background-color: rgb(245,245,245) !important;" fluid pa-12 class="text-center textComeceDefault">
      <v-row justify="center">
        <v-col cols="12" md="8" sm="10" lg="8" xl="10">
          <v-subheader>O que é <span class="textColorDefault ml-1">SemFila</span> </v-subheader>
          <v-divider></v-divider>
          <p class="pa-5">
            É um cardápio digital de fácil acesso e uso, onde o consumidor
            realiza compras com o estabelecimento e apresenta um QrCode que
            possui dados criptografados da Nota fiscal e do pedido realizado.
          </p>
          <v-subheader>Nosso conceito</v-subheader>
          <v-divider></v-divider>
          <p class="pa-5">
            Queremos cobrar barato para entregar muito. Quem consome pode pedir
            reembolso dos produtos a qualquer momento e se ele não usar o qrcode
            também recebe devolta.
          </p>
          <v-subheader>Onde surgiu?</v-subheader>
          <v-divider></v-divider>
          <p class="pa-5">
            A ideia surgiu em uma cidadezinha do interior de Mato grosso do Sul,
            em uma festa com uma gigantesca fila. ´Eu só queria beber uma
            cerveja´, foi então o ínicio.
          </p>
        </v-col>
      </v-row>
    </v-container>
    <v-container style="background-color: rgb(245,245,245) !important;" fluid class="text-center textComeceDefault">
      <v-divider></v-divider>
      <v-row justify="center">
        <v-col cols="12" md="8" sm="10" lg="8" xl="10">
          <h1 class="mt-6 mb-4">Qualquer um pode ser <span class="textColorDefault"> SemFila</span></h1>
          <v-row justify="center">
            <v-col cols="12" md="6" sm="6" lg="6" xl="6">
                <p class="text-start">Comece agora, totalmente gratuito. Com o nosso painel administrativo você tem acesso a todo nosso trabalho</p>
            </v-col>
            <v-col cols="12" md="6" sm="6" lg="6" xl="6" class="d-flex justify-center align-center">
                <v-btn rounded outlined color="#FE938C">Me tornar um SemFila</v-btn>
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
@import "./home.module.css";
</style>
