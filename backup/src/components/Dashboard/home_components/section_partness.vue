<template>
  <v-row  class="d-flex align-center justify-center pa-5">
    
    
    <v-col cols="12">
      <div class="mb-12">
      <h1 class="text-start white--text textHeader">
      Os melhores SemFila
    </h1>
    </div>
      <v-row id="big" class="d-none d-md-flex" align="center" justify="center">
        <v-col cols="3" class="d-flex align-center justify-center" width="300">
          <v-card class="pa-2 flex-grow-1 cardPartners" width="300">
            <v-row no-gutters>
              <v-col cols="12" class="d-flex justify-end">
                
                  <v-icon small color="red">mdi-check-decagram</v-icon>
                
              </v-col>
              <v-col cols="12" class="d-flex justify-start mt-n5">
                <v-row no-guters>
                  <v-col cols="5" class="d-flex align-center justify-center">
                    <a href="https://www.instagram.com/estacaocaxara/">
                      <v-avatar size="72" tile class="rounded-xl" >
                     
                     <img 
                   src="https://i.ibb.co/7C0YfZF/16124156-680115445505947-4578459704748933120-a.jpg" 
                   />
                 
                   
                 </v-avatar>
                    </a>
                    
                  </v-col>
                  <v-col cols="7" class="mt-4">
                    <p class="text-start">
                      <a class="font-weight-bold white--text" href="https://www.semfila.app/estacaocaxara/home" style="text-decoration: none !important"
                        >Estação Caxara</a
                      >
                    </p>
                    <p class="grey--text text-start mt-n2">Pub</p></v-col
                  >
                </v-row>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-col cols="3" class="d-flex align-center justify-center" width="300">
          <v-card class="pa-2 flex-grow-1 cardPartners" width="300">
            <v-row no-gutters>
              <v-col cols="12" class="d-flex justify-end">
                
                  <v-icon small color="red">mdi-check-decagram</v-icon>
                
              </v-col>
              <v-col cols="12" class="d-flex justify-start mt-n5">
                <v-row no-guters class="">
                  <v-col cols="5" class="d-flex align-center justify-center">
                    <a href="https://www.instagram.com/vilarebuagastronomia/">
                      <v-avatar size="72" tile class="rounded-xl">
                      <img
src="https://i.ibb.co/8PNrS5M/316367768-194472383107412-6487271863465689785-n.jpg"
                      />
                    </v-avatar>
                    </a>
                    
                  </v-col>
                  <v-col cols="7" class="mb-n2">
                    <p class="text-start">
                      <a class="font-weight-bold white--text" href="https://www.semfila.app/vilarebuagastronomia/home" style="text-decoration: none !important"
                        >Vila Rebua Gastronomia</a
                      >
                    </p>
                    <p class="grey--text text-start mt-n2">Restaurante</p></v-col
                  >
                </v-row>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-col cols="3" class="d-flex align-center justify-center" width="300">
          <v-card class="pa-2 flex-grow-1 cardPartners" width="300">
            <v-row no-gutters>
              <v-col cols="12" class="d-flex justify-end">
                
                  <v-icon small color="red">mdi-check-decagram</v-icon>
                
              </v-col>
              <v-col cols="12" class="d-flex justify-start mt-n5">
                <v-row no-guters>
                  <v-col cols="5" class="d-flex align-center justify-center">
                    <a href="https://www.instagram.com/zapizenbonitoms/">
                      <v-avatar size="72" tile  class="rounded-xl">
                      <img
                      src="https://i.ibb.co/rp2wrSM/301571642-1105104720091168-745642818850234750-n.jpg"
                      />
                    </v-avatar>
                    </a>

                   
                  </v-col>
                  <v-col cols="7" class="mt-4">
                    <p class="text-start">
                      <a class="font-weight-bold white--text" href="https://www.semfila.app/zapizen/home" style="text-decoration: none !important"
                        >Zapi Zen</a
                      >
                    </p>
                    <p class="grey--text text-start mt-n2">Restaurante</p></v-col
                  >
                </v-row>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-col cols="3" class="d-flex align-center justify-center" width="300">
          <v-card class="pa-2 flex-grow-1 cardPartners" width="300">
            <v-row no-gutters>
              <v-col cols="12" class="d-flex justify-end">
                
                  <v-icon small color="red">mdi-check-decagram</v-icon>
                
              </v-col>
              <v-col cols="12" class="d-flex justify-start mt-n5">
                <v-row no-guters>
                  <v-col cols="5" class="d-flex align-center justify-center">
                    <a href="https://www.instagram.com/labonitabarerestaurante/">
                      <v-avatar size="72" tile class="rounded-xl">
                      <img
                        src="https://i.ibb.co/GPwtWMk/43182921-257320734973261-8112687738852999168-n.jpg"
                      />
                    </v-avatar>
                    </a>  
                   
                  </v-col>
                  <v-col cols="7" class="mt-4">
                    <p class="text-start">
                      <a class="font-weight-bold white--text" href="https://www.semfila.app/labonita/home" style="text-decoration: none !important"
                        >La Bonita</a
                      >
                    </p>
                    <p class="grey--text text-start mt-n2">Bar</p></v-col
                  >
                </v-row>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-col>

    <v-col cols="12" class="d-flex d-md-none">
      <v-slide-group multiple :show-arrows="false">
        <v-slide-item class="mx-4">
          <v-card class="pa-2 flex-grow-1 cardPartners" width="120">
            <v-row no-gutters>
              <v-col cols="12" class="d-flex justify-end">
                
                  <v-icon small color="red">mdi-check-decagram</v-icon>
                
              </v-col>
              <v-col cols="12" class="d-flex justify-start mt-n5">
                <v-row class="mt-4">
                  <v-col cols="12" class="d-flex align-center justify-center">
                    <a href="https://www.instagram.com/estacaocaxara/">
                    <v-avatar size="72" tile class="rounded-xl">
                      <img
                      src="https://i.ibb.co/7C0YfZF/16124156-680115445505947-4578459704748933120-a.jpg"
                      />
                    </v-avatar>
                  </a>
                  </v-col>
                  <v-col cols="12" class="">
                    <p class="text-center">
                      <a class="font-weight-bold white--text" href="https://www.semfila.app/estacaocaxara/home" style="text-decoration: none !important"
                        >Estação Caxara</a
                      >

                    </p>
                    <p class="grey--text text-center mt-n2">Pub</p></v-col
                  >
                </v-row>
              </v-col>
            </v-row>
          </v-card>
        </v-slide-item>
        <v-slide-item class="mx-4">
          <v-card class="pa-2 flex-grow-1 cardPartners" width="120">
            <v-row no-gutters>
              <v-col cols="12" class="d-flex justify-end">
                
                  <v-icon small color="red">mdi-check-decagram</v-icon>
                
              </v-col>
              <v-col cols="12" class="d-flex justify-start mt-n5">
                <v-row class="mt-4">
                  <v-col cols="12" class="d-flex align-center justify-center">
                    <a href="https://www.instagram.com/vilarebuagastronomia/">
                    <v-avatar size="72" tile class="rounded-xl">
                      <img
                      src="https://i.ibb.co/8PNrS5M/316367768-194472383107412-6487271863465689785-n.jpg"
                      />
                    </v-avatar>
                    </a>
                  </v-col>
                  <v-col cols="12" class="">
                    <p class="text-center">
                      <a class="font-weight-bold white--text" href="https://www.semfila.app/vilarebuagastronomia/home" style="text-decoration: none !important"
                        >Vila Rebua Gastronomia</a
                      >
                    </p>
                    <p class="grey--text text-center mt-n2">Restaurante</p></v-col
                  >
                </v-row>
              </v-col>
            </v-row>
          </v-card>
        </v-slide-item>
        <v-slide-item class="mx-4">
          <v-card class="pa-2 flex-grow-1 cardPartners" width="120">
            <v-row no-gutters>
              <v-col cols="12" class="d-flex justify-end">
                
                  <v-icon small color="red">mdi-check-decagram</v-icon>
                
              </v-col>
              <v-col cols="12" class="d-flex justify-start mt-n5">
                <v-row class="mt-4">
                  <v-col cols="12" class="d-flex align-center justify-center">
                     <a href="https://www.instagram.com/zapizenbonitoms/">
                    <v-avatar size="72" tile class="rounded-xl">
                      <img
                      src="https://i.ibb.co/rp2wrSM/301571642-1105104720091168-745642818850234750-n.jpg"
                      />
                    </v-avatar>
                  </a>
                  </v-col>
                  <v-col cols="12" class="">
                    <p class="text-center">
                      <a class="font-weight-bold white--text" href="https://www.semfila.app/zapizen/home" style="text-decoration: none !important"
                        >Zapi Zen</a
                      >
                    </p>
                    <p class="grey--text text-center mt-n2">Restaurante</p></v-col
                  >
                </v-row>
              </v-col>
            </v-row>
          </v-card>
        </v-slide-item>
        <v-slide-item class="mx-4">
          <v-card class="pa-2 flex-grow-1 cardPartners" width="120">
            <v-row no-gutters>
              <v-col cols="12" class="d-flex justify-end">
                
                  <v-icon small color="red">mdi-check-decagram</v-icon>
                
              </v-col>
              <v-col cols="12" class="d-flex justify-start mt-n5">
                <v-row class="mt-4">
                  <v-col cols="12" class="d-flex align-center justify-center">
                     <a href="https://www.instagram.com/labonitabarerestaurante/">
                    <v-avatar size="72" tile class="rounded-xl">
                      <img
                      src="https://i.ibb.co/GPwtWMk/43182921-257320734973261-8112687738852999168-n.jpg"
                      />
                    </v-avatar>
                  </a>
                  </v-col>
                  <v-col cols="12" class="">
                    <p class="text-center">
                      <a class="font-weight-bold white--text" href="https://www.semfila.app/labonita/home" style="text-decoration: none !important"
                        >La Bonita</a
                      >
                    </p>
                    <p class="grey--text text-center mt-n2">Bar</p></v-col
                  >
                </v-row>
              </v-col>
            </v-row>
          </v-card>
        </v-slide-item>
  </v-slide-group>
    </v-col>
    <v-col cols="12" >
      <v-container fluid fill-height id="sectionCards" class="">
      <v-row class="d-flex">
        <v-col cols="12" sm="4" md="4" lg="4" xl="4">
          <v-card class="cardColorPartner">
            <v-row>
              <v-col cols="12" sm="6" md="6" lg="6" xl="6" class="d-flex align-center justify-center">
                <div class="mt-5">
                  <span class="text-start white--text ">
                  Monte da sua
                </span>
                <p class="text-start font-weight-bold white--text textHeaderPartness">
                  Maneira >
                </p>
                </div>
                
              </v-col>
              <v-col cols="12" sm="6" md="6" lg="6" xl="6" class="d-flex align-center justify-center">
                <v-img src="https://i.ibb.co/XzSmG1j/imagens-bebidas.png" contain width="150" height="200">

                </v-img>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-col cols="12" sm="4" md="4" lg="4" xl="4">
          <v-card class="cardColorPartner">
            <v-row>
              <v-col cols="12" sm="6" md="6" lg="6" xl="6" class="d-flex align-center justify-center">
                <div class="mt-5">
                  <span class="text-start white--text ml-n16">
                    Seu
                  </span>
                  <p class="text-start ml-6 mt-n1 font-weight-bold white--text textHeaderPartness">
                    Cardapio >
                  <p class="white--text mt-n6 ml-n16">
                    com sua <p class="white--text mt-n6">
                      cara
                    </p>
                  </p>
                </p>
                
                </div>
                
              </v-col>
              <v-col cols="12" sm="6" md="6" lg="6" xl="6" class="d-flex align-center justify-center">
                <v-img src="https://i.ibb.co/GVYMN3S/cardapio-1.png" contain width="150" height="200">

                </v-img>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-col cols="12" sm="4" md="4" lg="4" xl="4">
          <v-card class="cardColorPartner">
            <v-row>
              <v-col cols="12" sm="6" md="6" lg="6" xl="6" class="d-flex align-center justify-center" >
                <v-img src="https://i.ibb.co/KzgjYhd/pngwing-1.png" contain width="150" height="200">

                </v-img>
              </v-col>
              <v-col cols="12" sm="6" md="6" lg="6" xl="6" class="d-flex align-center justify-lg-start justify-center ml-n6-lg">
                <div class="mt-5">
                  <span class="text-center white--text">
                    Mais <v-icon color="yellow" v-for="index in 5" :key="index" >
                    mdi-star
                    </v-icon>
                </span>
                <p class="text-center font-weight-bold white--text textHeaderPartness">
                  Avaliados
                </p>
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-col>
    
</v-row>
</template>
<script></script>
<style scoped>
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
</style>
