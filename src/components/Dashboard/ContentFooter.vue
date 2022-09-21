<template>
  <v-footer class="d-flex align-center justify-center topGradient">
    
    <v-container fluid fill-height>
      
      <v-row>
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
</template>
<script>
export default {};
</script>
<style>

</style>
