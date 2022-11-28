<template>
  <v-app  >
    <router-view  />
  </v-app>
</template>
<script>
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
