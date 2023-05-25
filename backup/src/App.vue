<template>
  <v-app  >
    <router-view  />
    <footer>
    <CookieLaw theme="base">
      
  <div slot-scope="props">
    <div slot="message" class="mb-2">
        Este site usa cookies para garantir que você obtenha a melhor experiência de navegação. Desativar os cookies do site pode prejudicar a funcionalidade de alguns recursos. <router-link style="color: red" to="privacidade">Ler mais</router-link>
      </div>
     
        <button class="mr-6" style="color: red; text-decoration: underline"  @click="props.accept"><span>Concordar e fechar</span></button>
      
        <button style="color: grey; text-decoration: underline"  @click="props.close"><span>Discordar e fechar</span></button>
      
    
  
  </div>
    </CookieLaw>
  </footer>
  </v-app>
</template>
<script>

    import CookieLaw from 'vue-cookie-law'
  export default {
    components: { CookieLaw },
    name: 'App',
    metaInfo: {
    title: 'SemFila',
    titleTemplate: '%s | Seu cardapio digital',
    meta: [
    { name: 'description', content:  'A melhor maneira de comprar na hora. Veja o cardapio e todos os produtos de restaurantes, praças de alimentação, bares e festa, faça seu pedido e retire sua compra.'},           
    ]
    },
    data () {
      return {
      //
      }
    }
  }
</script>
<style lang="scss">
@font-face {
  font-family: Josefin Sans;
  src: url("./font/JosefinSans/JosefinSans-VariableFont_wght.ttf");
}
.v-application .text-lg-h4{
  font-family: Josefin Sans !important;
}
.theme--light.v-application{
    background: #100C08 !important;
}
.v-application {
  [class*='text-'] {
    color: #E8E8E7;
    font-family: Josefin Sans !important;
  }
  font-family:  Josefin Sans !important;
}
</style>
