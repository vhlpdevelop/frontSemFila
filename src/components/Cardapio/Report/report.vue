<template>
    <div class="d-flex align-center justify-center">
        <v-card class="pa-5">
            <v-card-title>
                Reportar cardapio {{ object.store.name }}
            </v-card-title>
            <p>
                Nos diga qual o problema deste cardapio.
            </p>
            <v-textarea counter="200" v-model="message" label="Digite qual o problema" auto-grow filled>

            </v-textarea>
            <v-btn outlined class="mr-6" @click="close()">Cancelar</v-btn>
            <v-btn :disabled="reported" outlined @click="sendReport()" :loading="buttonLoader" color="red">
                <span v-if="!reported">
                    {{ reportText }}
                </span>
                <span v-else>
                    <v-scroll-x-transition>
                        <v-icon color="success">
                            mdi-check
                        </v-icon>
                    </v-scroll-x-transition>
                </span>
            </v-btn>


        </v-card>
    </div>
</template>
<script>

import { mapActions, mapGetters } from 'vuex';

export default {
    props: ["object"],
    data: () => ({
        message: "",
        reportText: "Reportar",
        buttonLoader: false,

        reported: false,

    }),
    computed: mapGetters([
        "getResponseReport"
    ]),
    methods: {
        ...mapActions(["report"]),
        sendReport() {
            this.buttonLoader = true;
            //console.log(this.object)
            let construct = {
                idCardapio: this.object.store._id,
                store_name: this.object.store.name,
                message: this.message,
                company_id: this.object.store.company_id
            }
            this.report(construct).then(() => {
                if (this.getResponseReport) {
                    this.buttonLoader = false;
                    this.reported = true;

                    setTimeout(() => {
                        this.$emit('close', false);

                    }, 2000);
                } else {
                    this.buttonLoader = false
                }
            });
        },
        close() {
            this.$emit('close', false)
        }
    }
}
</script>