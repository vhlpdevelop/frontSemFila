<template>
  <v-container ma-0 pa-0 fluid>
    <v-img :src="wave"></v-img>
    <v-footer class="backgroundFooter" style="width: 100%">
    
    <v-container ma-0 pa-0 fluid class="d-flex align-center justify-center  ">
      
      <v-row  >
        <v-col cols="12" sm="4" md="6" lg="6" xl="6" class="d-flex">
          <v-container fluid class="flex-grow-1 d-flex row justify-center align-center">
            <p>
              <h1>Sem Fila <span>/ Tech</span></h1>
            </p>
            <v-container fluid class="d-flex justify-center">
              <v-icon large class="ma-5"> mdi-instagram </v-icon>
              <v-icon large class="ma-5"> mdi-facebook </v-icon>
            </v-container>
            <v-subheader>
              SemFila - Todos os Direitos Reservados
            </v-subheader>
          </v-container>
        </v-col>
        <v-col cols="12" sm="8" md="6" lg="6" xl="6">
          <v-container fluid class="flex-grow-1">
            <v-container fluid><v-btn  text @click=" $router.push({
        name: 'termos',
      })" >Termos e condições de Uso </v-btn></v-container>
            
      <v-container fluid><v-btn  text @click=" $router.push({
        name: 'privacidade',
      })" >Privacidade </v-btn></v-container>
      <v-container fluid><v-btn  text  @click=" $router.push({
        name: 'ajuda',
      })" >Ajuda </v-btn></v-container>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
  </v-container>
  
</template>
<script>
export default {
  data: () => ({
    wave: require('../../img/wave.svg')
  }),
};
</script>
<style scoped>
.backgroundFooter{
  background-image: url('../../img/wave-down.svg');
}

</style>
