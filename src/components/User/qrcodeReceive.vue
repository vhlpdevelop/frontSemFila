<template>
    <v-app>
        <v-container fluid class="d-flex align-center justify-center white--text mt-6">
            <v-row class="fill-height" align-content="center" justify="center">
                <v-col cols="12" class="text-center">
                    <h1>{{ msg }}</h1>
                </v-col>
                <v-col cols="6" class="d-flex align-center justify-center">
                    <v-container class="d-flex align-center justify-center">
                        <v-progress-linear v-if="!loaded" color="yellow" indeterminate rounded
                            height="6"></v-progress-linear>
                    </v-container>

                </v-col>
                <v-col cols="12" v-if="failed" class="text-center white--text">
                    <p>Infelizmente este QRCODE que está tentando recuperar se encontra vazio.</p>
                    <p>Em caso de dúvida, por favor entre em contato conosco usando o email abaixo.</p>
                    <p>contato@semfila.tech ou envie direto pelo whatsapp (67) 99131-2906</p>
                </v-col>
            </v-row>


        </v-container>
    </v-app>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
    name: "qrcodeReceive",
    props: ["id"],
    data: () => ({
        msg: "Avaliando seu Qrcode...",
        status: false,
        loaded: false,
        failed: false,
    }),
    methods: {
        ...mapActions([
            "fetchQrCode",
        ]),
    },
    computed: {
        ...mapGetters([
            "getQrcodes",
            "getMessageUser",
            "getnewQrCode",
        ]),
    },
    created() {
        if (this.id) {
            var store_url = this.id.slice(0, this.id.indexOf("-"))
            var code = this.id.slice(this.id.indexOf("-") + 1, this.id.length)
            this.fetchQrCode(code).then(() => {
                this.loaded = true;
                if (this.getnewQrCode) {
                    this.status = true;
                    this.msg = "QrCode encontrado, redirecionando..."
                    setTimeout(function (router) {
                        router.push({
                            name: "qrcodesOnCardapio", params: {
                                id: store_url
                            }
                        })
                    }, 3000, this.$router)
                } else {
                    this.failed = true;
                    this.status = false;
                    this.msg = this.getMessageUser
                }
            });

        }

    }
}
</script>