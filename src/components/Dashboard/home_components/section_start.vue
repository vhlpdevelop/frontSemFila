
<template>
    <v-app style="background-image: linear-gradient( rgb(245,245,245) , white , rgb(245,245,245) ); margin-top: 40px; margin-bottom: 30px;">
        <section class=" d-flex justify-center align-center mt-12">
        <div class="px-4 mx-auto mt-12 max-w-7xl px-sm-6 px-lg-8">
            <div class="max-w-2xl mx-auto text-center">
                <h2 class="text-md-h4 text-lg-h4 text-h6  font-weight-bold">3 passos para fazer seu cadastro no SemFila</h2>
                <p class="max-w-lg mx-auto mt-4 text-center font-weight-light">Tire suas dúvidas sobre como cadastrar no SemFila para vender.</p>
            </div>

            <div class="d-flex justify-center mt-12 mt-lg-12">
                <div style="position: absolute" class="d-none d-sm-none d-md-flex px-xl-44 px-mt-12 px-lg-12 ">
                    <img style="width:100%" src="https://cdn.rareblocks.xyz/collection/celebration/images/steps/2/curved-dotted-line.svg" alt="" />
                </div>

                <v-row  style="position: relative" class="text-center">
                    <v-col cols="12" md="4" lg="4" xl="4">
                        <div>
                            <div class="d-flex align-center justify-center text-center elevation-5 mx-auto rounded-circle "  style="background-color: white;width: 60px; height:60px">
                            <span class="text-xl  font-semibold black--text" > 1 </span>
                        </div>
                        <h3 class="mt-6 text-xl font-semibold leading-tight text-black mt-md-10 corMedia">Informe os seus dados de contato</h3>
                        <p class="mt-4 text-base">Complete seu cadastro. SemFila aceita MEI, mas não é possível vender apenas com CPF. Esses serão os principais canais de contato do SemFila com você.</p>
                        </div>
                        
                    </v-col>

                    <v-col cols="12" md="4" lg="4" xl="4">
                        <div class="d-flex align-center justify-center text-center elevation-5 mx-auto rounded-circle "  style="background-color: white;width: 60px; height:60px">
                            <span class="text-xl font-semibold black--text"> 2 </span>
                        </div>
                        <h3 class="mt-6 text-xl font-semibold leading-tight text-black mt-md-10 corMedia">Aguarde a validação</h3>
                        <p class="mt-4 text-base text-gray-600">A SemFila leva algumas horas para validar sua empresa. </p>
                    </v-col>

                    <v-col cols="12" md="4" lg="4" xl="4">
                        <div class="d-flex align-center justify-center text-center elevation-5 mx-auto rounded-circle "  style="background-color: white;width: 60px; height:60px">
                            <span class="text-xl font-semibold black--text"> 3 </span>
                        </div>
                        <h3 class="mt-6 text-xl font-semibold leading-tight text-black mt-md-10 corMedia">Assine o contrato</h3>
                        <p class="mt-4 text-base text-gray-600">Informe o restante dos dados e escolha o modelo de contrato que mais lhe atrai. A partir disso está tudo pronto para usar.</p>
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

.corMedia{
    color: #F24236 !important;
}
*{
    font-family: Josefin Sans !important;
    font-size: 1em;
}
</style>