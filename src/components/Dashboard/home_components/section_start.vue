
<template>
    <v-app style="background-image: linear-gradient( rgb(245,245,245) , white , rgb(245,245,245) ); margin-top: 40px; margin-bottom: 30px;">
        <section class=" d-flex justify-center align-center mt-12">
        <div class="px-4 mx-auto mt-12 max-w-7xl px-sm-6 px-lg-8">
            <div class="max-w-2xl mx-auto text-center">
                <h2 class="corAlta text-md-h4 text-lg-h4 text-h6 text-decoration-underline font-weight-bold">Como funciona?</h2>
                <p class="max-w-lg mx-auto mt-4 text-center font-weight-light corMedia">Como todo cardapio por QRCODE, pegue seu celular.</p>
            </div>

            <div class="d-flex justify-center mt-12 mt-lg-12">
                <div style="position: absolute" class="d-none d-sm-none d-md-flex px-xl-44 px-mt-12 px-lg-12 ">
                    <img style="width:100%" src="https://cdn.rareblocks.xyz/collection/celebration/images/steps/2/curved-dotted-line.svg" alt="" />
                </div>

                <v-row  style="position: relative" class="text-center">
                    <v-col cols="12" md="4" lg="4" xl="4">
                        <div>
                            <div class="d-flex align-center justify-center text-center elevation-5 mx-auto rounded-circle "  style="background-color: white;width: 60px; height:60px">
                            <span class="text-xl  font-semibold text-gray-700 " > 1 </span>
                        </div>
                        <h3 class="mt-6 text-xl font-semibold leading-tight text-black mt-md-10 corMedia">Ler o QRCODE</h3>
                        <p class="mt-4 text-base text-gray-600">Utilize a camerâ do celular para leitura do QRCODE e abra o link para acessar o cardápio.</p>
                        </div>
                        
                    </v-col>

                    <v-col cols="12" md="4" lg="4" xl="4">
                        <div class="d-flex align-center justify-center text-center elevation-5 mx-auto rounded-circle "  style="background-color: white;width: 60px; height:60px">
                            <span class="text-xl font-semibold text-gray-700"> 2 </span>
                        </div>
                        <h3 class="mt-6 text-xl font-semibold leading-tight text-black mt-md-10 corMedia">Compre no cardápio</h3>
                        <p class="mt-4 text-base text-gray-600">Navegue pelo cardápio e compre os produtos. Para cada produto comprado será gerado um QRCODE único. </p>
                    </v-col>

                    <v-col cols="12" md="4" lg="4" xl="4">
                        <div class="d-flex align-center justify-center text-center elevation-5 mx-auto rounded-circle "  style="background-color: white;width: 60px; height:60px">
                            <span class="text-xl font-semibold text-gray-700"> 3 </span>
                        </div>
                        <h3 class="mt-6 text-xl font-semibold leading-tight text-black mt-md-10 corMedia">Mostre seu QRCODE</h3>
                        <p class="mt-4 text-base text-gray-600">Com a compra efetuada, mostre o QRCODE para um atendente do estabelecimento realizar o scaneamento. Pronto!</p>
                    </v-col>
                </v-row>
            </div>
        </div>
    </section>
    </v-app>
    
</template>

<script>
    export default {
        name: 'HowItWorks',
        data() {
            return {
                //
            }
        },
        methods: {
            //
        }
    }
</script>

<style>
    @font-face {
    font-family: Josefin Sans;
    src: url("../../../font/JosefinSans/JosefinSans-VariableFont_wght.ttf");
}
.corAlta{
    color: rgb(254,147,140) !important;
}
.corMedia{
    color: rgb(88, 157, 108) !important;
}
*{
    font-family: Josefin Sans !important;
    font-size: 1em;
}
</style>