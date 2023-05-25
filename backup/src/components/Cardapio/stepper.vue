<template>
    <transition name="slide-fade">
        <v-card pa-5>
            <v-container class="d-flex align-center justify-center" v-if="!showStepper">
                <v-row class="d-flex align-center justify-center">
                    <v-col cols="12" class="d-flex align-center justify-center">
                        <p class="TextSize">Primeira vez no <span class="primary--text font-weight-bold">SemFila?</span>
                        </p>
                    </v-col>
                    <v-col cols="12" class="d-flex align-center justify-center">
                        <v-img max-height="150"
  max-width="250" :src="gifShow">

                        </v-img>
                    </v-col>
                    <v-col cols="12" class="d-flex justify-center pa-6">
                        <p class="TextSizeMinor">Entenda como funciona</p>
                    </v-col>
                    <v-col cols="6" class="d-flex justify-center">
                        <v-btn outlined @click="close()">Já sei usar</v-btn>
                    </v-col>
                    <v-col cols="6" class="d-flex justify-center">
                        <v-btn color="primary" class="elevation-10" @click="showStepper = true">Me mostre</v-btn>
                    </v-col>
                </v-row>



            </v-container>
            <transition name="slide-fade">
                <ve-stepper v-if="showStepper" v-model="e1">
                    <v-stepper-header>
                        <ve-stepper-step :complete="e1 > 1" step="1" icon="mdi-cart">
                            Compra
                        </ve-stepper-step>

                        <v-divider></v-divider>

                        <ve-stepper-step :complete="e1 > 2" step="2" icon="mdi-qrcode">
                            Seu QRCODE
                        </ve-stepper-step>

                        <v-divider></v-divider>

                        <ve-stepper-step step="3" icon="mdi-cellphone">
                            Retirada
                        </ve-stepper-step>
                    </v-stepper-header>

                    <v-stepper-items>
                        <v-stepper-content step="1">
                            <v-card class="elevation-0">
                                <v-row no-gutters class="mb-2">
                                    <v-col cols="12" class="d-flex justify-center pa-3">
                                        <p class="font-weight-bold TextSizeMinor">Explore o <span
                                                class="primary--text">cardapio</span></p>
                                    </v-col>
                                    <v-col cols="12" class=" d-flex justify-start  ">
                                        <p class="ml-3 TextSizeMinor">1 -Escolha um <span class="primary--text">produto</span> <v-icon small right
                                                color="primary">mdi-shopping</v-icon></p>
                                    </v-col>
                                    <v-col cols="12" class="d-flex justify-center ">
                                        <p class="ml-3 TextSizeMinor">2 -Coloque no carrinho ou clique em ir ao <span class="primary--text">
                                                checkout <v-icon small color="primary" left>mdi-cart-check</v-icon>
                                            </span>
                                        </p>
                                    </v-col>
                                    <v-col cols="12" class="d-flex justify-center">
                                        <p class="ml-3 TextSizeMinor">3 -Crie uma <span class="primary--text">conta <v-icon left small class="mt-n2" color="primary">mdi-account</v-icon></span> ou prossiga sem, mas
                                            <span class="primary--text">recomendamos</span> que crie.</p>
                                    </v-col>
                                    <v-col cols="12" class="d-flex justify-center ">
                                        <p class="ml-3 TextSizeMinor">4 -Realize o <span class="primary--text">pagamento</span> e aguarde a chegada de seu <span class="primary--text">QrCode</span>, leva menos de 20 segundos.</p>
                                    </v-col>
                                </v-row>
                            </v-card>

                            <v-container ma-0 pa-0 fluid class="d-flex align-end justify-end">
                                <v-btn class="elevation-6" color="primary" @click="e1 = 2">Continuar</v-btn>
                            </v-container>
                        </v-stepper-content>

                        <v-stepper-content step="2">
                            <v-card class="elevation-0">
                            <v-row no-gutters class="mb-2">
                                    <v-col cols="12" class="d-flex justify-center pa-3">
                                        <p class="font-weight-bold TextSizeMinor">Abra o <span
                                                class="primary--text">menu <v-icon small>mdi-menu</v-icon></span> e clique em <span class="primary--text">Meus QrCodes</span></p>
                                    </v-col>
                                    <v-col cols="12" class=" d-flex justify-start pa-5 mt-n6">
                                        <p class="ml-3 TextSizeMinor">1 -Veja se seu <span class="primary--text">QrCode</span> <v-icon small right
                                                color="primary">mdi-qrcode</v-icon> está correto.</p>
                                    </v-col>
                                    <v-col cols="12" class="d-flex justify-center pa-5 mt-n6">
                                        <p class="ml-3 TextSizeMinor">2 -Clique no <span class="primary--text">QrCode</span>, assim ele abrirá e expandirá na tela.
                                        </p>
                                    </v-col>
                                    <v-col cols="12" class="d-flex justify-center align-center">
                                        <p class="ml-3 TextSizeMinor">Lembre-se, em todas as compras, receberá um email informando se foi pago ou não e também o numero do pedido.</p>
                                    </v-col>
                                </v-row>
                                </v-card>
                            <v-container fluid ma-0 pa-0>
                                <v-row no-gutters>
                                    <v-col cols="6" class="d-flex align-center justify-start">
                                        <v-btn outlined @click="e1 = 1">Voltar</v-btn>
                                    </v-col>
                                    <v-col cols="6"  class="d-flex align-center justify-center">
                                        <v-btn color="primary" class="elevation-6" @click="e1 = 3">Continuar</v-btn>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-stepper-content>

                        <v-stepper-content step="3">
                            <v-card class="elevation-0">
                            <v-row no-gutters class="mb-2">
                                    <v-col cols="12" class="d-flex justify-center pa-3">
                                        <p class="font-weight-bold TextSizeMinor">Com seu <span
                                                class="primary--text">QrCode <v-icon small color="primary--text">mdi-qrcode</v-icon></span> aberto</p>
                                    </v-col>
                                    <v-col cols="12" class=" d-flex justify-start">
                                        <p class="ml-3 TextSizeMinor">1 -Apresente o <span class="primary--text">QrCode</span> <v-icon small right
                                                color="primary">mdi-qrcode</v-icon> para o funcionário do estabelecimento. E informe quantas unidades
                                            gostaria de retirar.</p>
                                    </v-col>
                                    <v-col cols="12" class="d-flex justify-center pa-1">
                                        <p class="ml-3 TextSizeMinor">2 -Caso queira nota fiscal, peça ao estabelecimento.
                                        </p>
                                    </v-col>
                                    <v-col cols="12" class="d-flex justify-center align-center pa-1">
                                        <p class="ml-3 TextSizeMinor">Não usou  o QrCode? <br/> Você tem 1 semana para solicitar reembolso, mesmo se estiver em promoção.</p>
                                    </v-col>
                                </v-row>
                                </v-card>

                            <v-container fluid ma-0 pa-0>
                                <v-row>
                                    <v-col cols="6" class="d-flex align-center justify-start">
                                        <v-btn outlined @click="e1 = 2">Voltar</v-btn>
                                    </v-col>
                                    <v-col cols="6" class="d-flex align-center justify-center">
                                        <v-btn color="primary" class="elevation-6" @click="close()">Fechar</v-btn>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-stepper-content>
                    </v-stepper-items>
                </ve-stepper>
            </transition>

        </v-card>
    </transition>

</template>
<script>
import VeStepper from '../Cardapio/VeStepper/VeStepper'
import VeStepperStep from '../Cardapio/VeStepper/VeStepperStep/VeStepperStep.vue'
import { mapActions, mapGetters } from 'vuex';
//<v-btn outlined class="mr-6" @click="close()">Cancelar</v-btn>
export default {
    props: ["object"],
    components: {
        VeStepper,
        VeStepperStep,
    },
    data: () => ({
        e1: 1,
        showStepper: false,
        gifShow: require("../../img/navigation-gif.gif"),
    }),
    computed: mapGetters([
        "getResponseReport"
    ]),
    methods: {
        close() {
            this.$emit('close', false)
        }
    }
}
</script>

<style>
.TextSize {
    font-size: 1.5em !important;
}

.TextSizeMinor {
    font-size: 1.1em !important;
}

.slide-fade-enter-active {
    transition: all .3s ease;
}

.slide-fade-leave-active {
    transition: all 2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.slide-fade-enter,
.slide-fade-leave-to {
    transform: translateX(10px);
    opacity: 0;
}
</style>