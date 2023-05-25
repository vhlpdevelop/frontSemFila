<template>
    <div class="d-flex align-center justify-center">
        <v-card class="pa-8">
            <v-card-title class="d-flex align-center justify-center">
                {{ object.store.name }}
            </v-card-title>
            <p>
                O quanto você gostou do nosso atendimento?
            </p>
            <div class="d-flex align-center justify-center">
                <v-rating empty-icon="mdi-star-outline" full-icon="mdi-star" half-icon="mdi-star-half-full" hover
                    length="5" size="32" v-model="rating"></v-rating>
            </div>
            <v-row no-gutters>
                <v-col cols="5">
                    <v-btn outlined small @click="close()">Voltar</v-btn>
                </v-col>
                <v-col cols="3">
                    <v-btn small :disabled="reported" outlined @click="sendReport()" :loading="buttonLoader"
                        color="red">
                        <span v-if="!reported">
                            {{ reportText }}
                        </span>
                        <span v-else>
                            <v-scroll-x-transition>
                                <v-icon color="red">
                                    mdi-check
                                </v-icon>
                            </v-scroll-x-transition>
                        </span>
                    </v-btn>
                    
                </v-col>
            </v-row>
            <p class="mt-2 red--text" v-if="error">
                        {{ errorMessage }}
                    </p>



        </v-card>
    </div>
</template>
<script>

import { mapActions, mapGetters } from 'vuex';

export default {
    props: ["object"],
    data: () => ({
        message: "",
        reportText: "Enviar Avaliação",
        buttonLoader: false,
        rating: 0,
        reported: false,
        error: false,
        errorMessage: ''
    }),
    computed: mapGetters([
        "getResponseCardapio",
        "getResponseMsgCardapio"
    ]),
    methods: {
        ...mapActions(["rateCardapio"]),
        sendReport() {
            this.error=false
            this.buttonLoader = true;
            //console.log(this.object)
            let construct = {
                menu_id: this.object.store._id,
                store_name: this.object.store.name,
                rating: this.rating
            }
            this.rateCardapio(construct).then(() => {
                if (this.getResponseCardapio) {
                    this.buttonLoader = false;
                    this.reported = true;

                    setTimeout(() => {
                        this.$emit('updateRate', true)
                        this.$emit('close', false);

                    }, 2000);
                } else {
                    this.buttonLoader = false
                    this.errorMessage=this.getResponseMsgCardapio
                    this.error=true

                }
            });
        },
        close() {
            this.$emit('close', false)
        }
    }
}
</script>