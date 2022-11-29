<template>
  <v-app>
    <v-container fluid class="deepTopColor">
    </v-container>
    <v-container pa-12 fluid class="text-center  backgroundComece textComeceDefault">
      <v-row justify="center">
        <v-col cols="12" md="8" sm="6" lg="6" xl="6">
          <v-container pa-6>
            <h1 class="mb-12 font-weight-bold textComeceDefault ">Muito mais que um cardapio digital</h1>
          <p class=" text-start font-weight-bold textComeceDefault pt-12 mt-12 mb-12">
            Somos muito mais que um cardapio digital: somos a proxima tecnologia
            de benefícios e praticidade. E temos Qrcodes de futuro do mundo com
            nossa ideia de expansão. Além de promover mais valorização para quem
            vende!
          </p>
          </v-container>
          
          
        </v-col>
      </v-row>
    </v-container>
    <v-container fluid pa-12 class="text-center deepBottomColor textComeceDefault ">
      
      <h1>Para cada camerâ mais um acesso acontece</h1>
      <p class=" text-center">
        Clientes, bares e festas. O SemFila foi criado por pessoas que têm um desejo em comum: Evitar filas e dar sentido ao cardápio digital.
      </p>
      
    </v-container>
    <v-container fluid class="backgroundAnchor" >
      <v-row justify="center">
        <v-col cols="12">
          <v-row justify="center" align="center">
            <v-col cols="12" sm="6" md="6" lg="4" xl="6">
              <v-img src="https://i.ibb.co/dJ9NJvP/gallery.png" max-width="500px" max-height="320" contain></v-img>
            </v-col>
            <v-col cols="12" sm="6" md="6" lg="6" xl="6">
              <p class="textComeceDefault  text-justify">
                Primeiro, seu cliente vai escanear seu QrCode e acessar seu cardápio<span class="textColorDefault"> SemFila</span>, onde poderá navegar e ver todos os produtos e promoções em tempo real.
              </p>
              
            </v-col>
          </v-row>
        </v-col>
        <v-col  cols="12"><v-row justify="center" align="center">
            <v-col cols="12" sm="6" md="6" lg="6" xl="6">
              <p class="textComeceDefault  text-justify">Após o cliente comprar um produto atravês do cardápio, a <span class="textColorDefault">SemFila</span> irá gerar um QrCode contendo dados da compra e o contéudo.</p>
            </v-col>
            <v-col cols="12" sm="6" md="6" lg="4" xl="6" order="first" order-sm="last">
              <v-img src="https://i.ibb.co/Df7vzhn/imagephone-2.png" max-width="500px" max-height="320" contain></v-img>
            </v-col>
          </v-row></v-col>
        <v-col  cols="12"><v-row justify="center" align="center">
            <v-col cols="12" sm="6" md="6" lg="4" xl="6">
              <v-img src="https://i.ibb.co/vP80hQr/gallery-2.png" max-width="500px" max-height="320" contain></v-img>
            </v-col>
            <v-col cols="12" sm="6" md="6" lg="6" xl="6">
              <p class="textComeceDefault text-justify">Agora é só escanear com uma conta autorizada <span class="textColorDefault">SemFila</span> para retirar o produto, rápido, fácil e prático! Apenas contas que estão registradas no estabelecimento podem autorizar a entrega do produto, ou seja, seguro! </p>
            </v-col>
          </v-row></v-col>
      </v-row>
    </v-container>
    <v-container fluid class="text-center" >
      <v-btn class="buttonSearch" rounded outlined @click="$router.push({name:'tornar'})"
            >Comece agora</v-btn
          >
    </v-container>
    
  </v-app>
</template>
<script>
export default {};
</script>
<style>
@import "./home.module.css";
</style>
