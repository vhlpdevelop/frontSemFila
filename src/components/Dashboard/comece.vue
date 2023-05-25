<template>
  <v-app>
    <v-container fluid class="deepTopColor">
    </v-container>
    <v-container pa-12 fluid class="text-center  backgroundComece textComeceDefault">
      <v-row justify="center">
        <v-col cols="12" md="8" sm="6" lg="6" xl="6">
          <v-container pa-6>
            <h1 class="mb-12 font-weight-bold textGrow textComeceDefault ">Muito mais que um cardapio digital</h1>
            <p class=" text-start textGrow font-weight-bold textComeceDefault pt-12 mt-12 mb-12">
              A proxima tecnologia
              de benefícios e praticidade. E temos Qrcodes do futuro com
              nossa ideia de expansão. Além de promover mais valorização para quem
              vende!
            </p>
          </v-container>


        </v-col>
      </v-row>
    </v-container>
    <v-container fluid pa-12 class="text-center deepBottomColor  textComeceDefault">
      <v-subheader class="white--text text-decoration-underline mt-6 ml-n6 ml-md-0 ml-lg-0 ml-xl-0">Sobre o cardapio digital</v-subheader>
      <h1 class="mb-5 textGrowBigger">Entenda o que é um cardapio digital</h1>
      <p class=" text-justify textGrow  pr-6 pl-6 pt-4">
        O nosso cardapio digital é um Web Software que seus clientes acessam pelo celular, que lhe proporciona
        o autoatendimento, sem necessidade de esperar pelo garçom. Com fotos e descrições detalhadas, a interface é
        muito intuitiva e confere ao cliente a liberdade de escolher seu pedido, personalizando-o, podendo acrescentar
        opcionais ou retirar ingredientes.
      </p>
      <p class=" text-justify textGrow pr-6 pl-6 pt-4">
        Com autonomia garantida, o pedido é enviado diretamente para a cozinha ou bar, minimizando o tempo de espera.
      </p>
      <p class=" text-justify textGrow  pr-6 pl-6 pt-4">
        Aquela tradicional levantada de braço para chamar a atenção do garçom ficou no passado: com um clique, o cliente
        pode pedir bebidas e sobremesas a qualquer tempo fora chamar o garçom responsavél pela mesa com o mesmo clique.
      </p>
      <p class=" text-justify textGrow  pr-6 pl-6 pt-4">
        O cardápio digital deixa seus garçons mais livres para atender e servir com mais qualidade e eficiência, além de
        estar sempre atualizado: você mesmo consegue atualizar instantaneamente o seu menu, podendo incluir, alterar ou
        retirar produtos do cardápio, através do painel de gestão.
      </p>

    </v-container>
    <v-container fluid class="pr-10 pl-10">
      <v-divider dark></v-divider>
    </v-container>
    <v-container fluid pa-12 class="text-center textGrow textComeceDefault ">

      <h1 class="textGrowBigger">Para cada camerâ mais um acesso acontece</h1>
      <p class=" text-center textGrow pr-16 pl-16">
        Clientes, bares e festas. O SemFila foi criado por pessoas que têm um desejo em comum: Evitar filas e dar
        sentido ao cardápio digital.
      </p>

    </v-container>
    <v-container fluid class="backgroundAnchor">
      <v-row justify="center">
        <v-col cols="12">
          <v-row justify="center" align="center">
            <v-col cols="12" sm="6" md="6" lg="4" xl="6">
              <v-img src="https://i.ibb.co/dJ9NJvP/gallery.png" max-width="500px" max-height="320" contain></v-img>
            </v-col>
            <v-col cols="12" sm="6" md="6" lg="6" xl="6">
              <p class="textComeceDefault textGrow text-justify">
                Primeiro, seu cliente vai escanear seu QrCode e acessar seu cardápio<span
                  class="textColorDefaultDashBoard"> SemFila</span>, onde poderá navegar e ver todos os produtos e
                promoções em tempo real.
              </p>

            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12"><v-row justify="center" align="center">
            <v-col cols="12" sm="6" md="6" lg="6" xl="6">
              <p class="textComeceDefault textGrow text-justify">Após o cliente comprar um produto atravês do cardápio,
                a <span class="textColorDefaultDashBoard">SemFila</span> irá gerar um QrCode contendo dados da compra e
                o contéudo.</p>
            </v-col>
            <v-col cols="12" sm="6" md="6" lg="4" xl="6" order="first" order-sm="last">
              <v-img src="https://i.ibb.co/Df7vzhn/imagephone-2.png" max-width="500px" max-height="320" contain></v-img>
            </v-col>
          </v-row></v-col>
        <v-col cols="12"><v-row justify="center" align="center">
            <v-col cols="12" sm="6" md="6" lg="4" xl="6">
              <v-img src="https://i.ibb.co/vP80hQr/gallery-2.png" max-width="500px" max-height="320" contain></v-img>
            </v-col>
            <v-col cols="12" sm="6" md="6" lg="6" xl="6">
              <p class="textComeceDefault textGrow text-justify">Agora é só escanear com uma conta autorizada <span
                  class="textColorDefaultDashBoard">SemFila</span> para retirar o produto, rápido, fácil e prático!
                Apenas contas que estão registradas no estabelecimento podem autorizar a entrega do produto, ou seja,
                seguro! </p>
            </v-col>
          </v-row></v-col>
      </v-row>
    </v-container>
    <v-container fluid class="text-center pl-10 pr-10 mt-6">
      <v-card class="pa-6">
        <div class="textGrow black--text">

          <p>
            Não perca esta <span class="primary--text">oportunidade</span> única de aumentar a sua eficiência e otimizar
            o seu tempo. Aproveite as nossas
            ferramentas e faça o máximo do seu negócio.<br /> Junte-se a nós <span class="primary--text">hoje</span> e
            comece a alcançar os seus <span class="primary--text">objetivos!</span>
          </p>
        </div>
        <div class="pl-16 pr-16">
          <v-btn class="primary white--text buttonSearch" block rounded outlined
            @click="$router.push({ name: 'tornar' })">Saiba mais</v-btn>
        </div>
      </v-card>


    </v-container>

  </v-app>
</template>
<script>
export default {
  metaInfo() {
    return {
      title: "Como fazemos",
      titleTemplate: null,
      meta: [
        { name: 'description', content: 'Conheça como funciona a SemFila e quão prático é...' },
      ]
    }
  },
  mounted() {
    document.dispatchEvent(new Event('render-complete'))
  }
};
</script>
<style>
@import "./home.module.css";

.textGrow {
  font-size: calc(15px + 0.390625vw) !important;
}
.textGrowBigger {
  font-size: calc(25px + 0.390625vw) !important;
}
</style>
