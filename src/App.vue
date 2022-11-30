<template>
  <v-app  >
    <router-view  />
  </v-app>
</template>
<script>
window.cookieconsent.initialise({
      "palette": {
        "popup": {
          "background": "#f5f5f5",
          "text": "#000000"
        },
        "button": {
          "background": "#f24236",
          "text": "#ffffff"
        }
      },
      "content": {
        "message": "Este site usa cookies para garantir que você obtenha a melhor experiência de navegação. Desativar os cookies do site pode prejudicar a funcionalidade de alguns recursos.",
        "dismiss": "Concordar e fechar",
        "link": "Ler mais",
        "href": "https://semfilaapp.netlify.app/privacidade"
      }
    });
  export default {
    name: 'App',
    components: {
    //
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
