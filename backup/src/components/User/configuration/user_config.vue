<template>
    <v-app>
        <v-container fluid v-if="loading" class="d-flex align-center justify-center mt-12">
            <v-progress-circular v-show="progressStatus" indeterminate color="primary" :size="200">
                <p>{{ loadingMsg }}</p>
            </v-progress-circular>
        </v-container>
        <v-container mt-10 fluid v-else>
            <v-row no-gutters class="d-flex align-center justify-center">
                <v-col cols="12" class="d-flex align-center justify-center">
                    <h1 class="white--text">{{ getUser.name }}</h1>
                </v-col>
                <v-col cols="12" class="d-flex align-center justify-center">
                    <h2 class="white--text">{{ getUser.email }}</h2>
                </v-col>
            </v-row>
            <v-card>
                <v-row class="mt-6 d-flex align-center justify-center">
                    <v-col cols="12" class="d-flex align-center justify-center">
                        <v-row>
                            <v-col cols="12" md="4" lg="4" xl="4" class="d-flex align-center justify-center">
                                <span class="mt-n4">CPF</span>
                                <v-container fluid ma-0 ml-2 pa-0 style="width:200px">
                                    <v-text-field v-model="user.cpf" dense outlined></v-text-field>
                                </v-container>

                            </v-col>
                            <v-col cols="12" md="4" lg="4" xl="4" class="d-flex align-center justify-center">
                                <span class="mt-n4">Telefone</span>
                                <v-container fluid ma-0 ml-2 pa-0 style="width:200px">
                                    <v-text-field label="(DD) 00000-0000" v-model="user.phone" dense
                                        outlined></v-text-field>
                                </v-container>
                            </v-col>
                            <v-col cols="12" md="4" lg="4" xl="4" class="d-flex align-center justify-center">
                                <span class="mt-n4">Nome</span>
                                <v-container fluid ma-0 ml-2 pa-0 style="width:200px">
                                    <v-text-field v-model="user.name" dense outlined></v-text-field>
                                </v-container>
                            </v-col>
                        </v-row>

                    </v-col>
                    <v-col cols="12" class="d-flex align-center justify-center">
                        <v-row class="d-flex align-center justify-center">
                            <v-col cols="6" class="d-flex align-center justify-center">
                                <v-btn outlined small @click="dialogPss = true" >Alterar senha</v-btn>
                            </v-col>
                            <v-col cols="6" class="d-flex align-center justify-center">
                                <v-btn outlined small :loading="saveBtnLoader" color="primary" @click="saveData()">Salvar</v-btn>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
                <v-snackbar v-model="snackSucesso" color="success">
                    <v-layout justify-space-around align-center>{{
                        getMessageUser
                    }}</v-layout>
                </v-snackbar>
                <v-snackbar v-model="snackErro" color="error">
                    <v-layout justify-space-around align-center>{{
                        getMessageUser
                    }}</v-layout>
                </v-snackbar>
            </v-card>
            <v-dialog v-model="dialogPss" persistent>
                <v-card class="pa-5">
                    <v-card-title class="d-flex align-center justify-center">
                        Tem certeza?
                    </v-card-title>
                    <p>Iremos enviar um email para prosseguir a alteração da senha.</p>
                    <p>Clique em Continuar para alterar sua senha.</p>
                    <v-card-actions>
                        <v-btn outlined @click="dialogPss = false">Cancelar</v-btn>
                        <v-spacer></v-spacer>
                        <v-btn outlined @click="sendPssReset()" :loading="pssBtnLoader"
                            color="primary">Continuar</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-container>
    </v-app>
</template>
<script>

import { mapActions, mapGetters } from "vuex";
export default {
    data: () => ({
        pssBtnLoader: false,
        saveBtnLoader: false,
        timeout: 5000,
        snackErro: false,
        snackSucesso: false,
        loadingMsg: "Carregando seus dados",
        progressStatus: true,
        dialogPss: false,
        user_rules: [],
        loading: true,
        user: {}
    }),
    methods: {
        ...mapActions(["getProfile", "saveProfile", "sendRecoveryPssToken"]),
        sendPssReset() {
            this.pssBtnLoader = true;
            this.sendRecoveryPssToken(this.user).then(() => {
                this.pssBtnLoader = false;
                if (this.getRespostaUser) {
                    this.snackErro = false;
                    this.snackSucesso = true;
                } else {
                    this.snackSucesso = false;
                    this.snackErro = true;
                }
                this.dialogPss=false;
            });
        },
        saveData() {
            this.saveBtnLoader = true;
            this.saveProfile(this.user).then(() => {
                this.saveBtnLoader = false;
                if (this.getRespostaUser) {
                    this.user = JSON.parse(JSON.stringify(this.getUser))
                    this.snackErro = false;
                    this.snackSucesso = true;
                } else {
                    this.snackSucesso = false;
                    this.snackErro = true;
                }
            });
        }
    },
    computed: mapGetters(["getUser", "getAuth", "getRespostaUser", "getMessageUser"]),
    created() {
        if (this.getAuth) {
            this.getProfile().then(() => {
                this.progressStatus = false;
                if (this.getRespostaUser) {
                    this.user = JSON.parse(JSON.stringify(this.getUser))
                    //console.log(this.user)
                    this.loading = false;
                } else {
                    //console.log(this.getMessageUser)
                    this.loadingMsg = this.getMessageUser;
                    setTimeout(function (router) {
                        router.go(-1)
                    }, 5000, this.$router)
                }
            });
        } else {
            this.progressStatus = false;
            this.loadingMsg = 'Você não entrou na conta'
            setTimeout(function (router) {
                router.go(-1)
            }, 3000, this.$router)
        }
    }
}
</script>