<template>
  <v-app>
    <v-container ma-0 pa-0 fluid class="backGroundQrCode">
      <v-responsive width="100%">
        <v-container fluid ma-0 pa-0 fill-height class="d-flex">
          <v-row align="center" justify="center" class="mt-3">
            <v-card v-if="getQrcodes.length > 0" class="rounded-xl backGroundQrCode" elevation="0">
              <v-row justify="start" class="mt-3 ma-1 d-flex align-center justify-center">
                <v-card-title class="ml-6 "
                  ><b class="primary--text">Meus QrCodes</b></v-card-title
                >
                <v-btn color="primary" fab icon large :loading="refreshLoader" @click="refreshQrcodes"><v-icon>mdi-refresh</v-icon></v-btn>
              </v-row>

              <v-card-text>
                <v-snackbar v-model="snackSucesso" color="success">
      <v-layout justify-space-around align-center>{{ getMessageUser }}</v-layout>
    </v-snackbar>
    <v-snackbar v-model="snackErro" color="error">
      <v-layout justify-space-around align-center>{{ getMessageUser }}</v-layout>
    </v-snackbar>
                <v-data-iterator
                  :headers="headers"
                  :items="qrcodes"
                  hide-default-header
                  
                  class="d-flex flex-column mh-100 ma-1"
                >
                  <template v-slot:default="props">
                    <v-row class="fill-height overflow-auto" id="container">
                      <v-col
                        v-for="(item, idx) in props.items"
                        :key="item._id"
                        :cols="12 / itemsPerRow"
                        class="py-1 mb-5"
                      >
                        <v-card
                          outlined
                          elevation-7
                          class="fill-height ma-2"
                          @click="showQrCode(item)"
                        >
                          <v-card-title style="word-break: break-word">
                            <v-row no-gutters>
                              <v-col cols="8">
                                <p class="text-truncate" style="max-width: 300px">
                                  {{ item.item.item_name }}
                                </p>
                              </v-col>
                              <v-col cols="4">
                                <div>
                                  <v-img
                                    class="d-none d-sm-flex"
                                    alt="Avatar"
                                    :src="
                                      'data:image/jpeg;base64,' + item.QrImage
                                    "
                                  ></v-img>
                                  <v-img
                                    class="d-flex d-sm-none"
                                    alt="Avatar"
                                    :src="
                                      'data:image/jpeg;base64,' + item.QrImage
                                    "
                                    width="80px"
                                    height="60px"
                                  ></v-img>
                                </div>
                              </v-col>
                            </v-row>
                            <v-row no-gutters>
                                  <v-col cols="12">
                                    <v-subheader class="text-truncate" style="max-width: 300px">{{
                                  item.item.description
                                }}</v-subheader>
                                  </v-col>
                                  <v-col cols="12">
                                    <v-subheader class="">
                                      Expira em
                                      {{
                                        AssimilateTime(
                                          item.item.promotion_duration,
                                          item.createdAt
                                        )
                                      }}
                                    </v-subheader>
                                  </v-col>
                                </v-row>
                          </v-card-title>
                          <v-divider></v-divider>
                          <v-container fluid>
                            <v-card-text>
                              <v-row no-gutters justify="center" align="center">
                                <v-col
                                  cols="12"
                                  md="12"
                                  sm="12"
                                  lg="12"
                                  xl="12"
                                >
                                  <b class="">
                                    <span class="ml-6 textColorDefault"
                                      >Quantidade:
                                      {{ item.quantity }}</span
                                    >
                                  </b>
                                </v-col>
                                <v-col cols="11" md="6" sm="6" xl="6" lg="6">
                                  <b>
                                    <span class="ml-6">
                                      {{ item.store_name }}
                                    </span>
                                  </b>
                                </v-col>
                                <v-col cols="1" md="6" sm="6" xl="6" lg="6">
                                  <v-tooltip
                                    bottom
                                    v-if="item.item.destaques"
                                  >
                                    <template v-slot:activator="{ on, attrs }">
                                      <v-icon
                                        color="red"
                                        dark
                                        v-bind="attrs"
                                        v-on="on"
                                      >
                                        mdi-fire
                                      </v-icon>
                                    </template>
                                    <span>Está em destaque</span>
                                  </v-tooltip>
                                  <v-tooltip
                                    bottom
                                    v-if="item.item.discount_status"
                                  >
                                    <template v-slot:activator="{ on, attrs }">
                                      <v-icon
                                        color="primary"
                                        dark
                                        v-bind="attrs"
                                        v-on:hover="on"
                                      >
                                        mdi-sale
                                      </v-icon>
                                    </template>
                                    <span>Possui desconto</span>
                                  </v-tooltip>
                                  <v-tooltip
                                    bottom
                                    v-if="item.item.promotion"
                                  >
                                    <template v-slot:activator="{ on, attrs }">
                                      <v-icon
                                        color="yellow"
                                        dark
                                        v-bind="attrs"
                                        v-on="on"
                                      >
                                        mdi-lightning-bolt
                                      </v-icon>
                                    </template>
                                    <span>Está em promoção</span>
                                  </v-tooltip>
                                </v-col>
                              </v-row>
                            </v-card-text>
                          </v-container>
                        </v-card>
                      </v-col>
                    </v-row>
                  </template>
                </v-data-iterator>
              </v-card-text>
            </v-card>

            <v-card class="pa-5" v-else> Sem QrCodes para mostrar </v-card>
            <v-dialog
              v-if="dialog"
              v-model="dialog"
              fullscreen
              hide-overlay
              transition="dialog-bottom-transition"
            >
              <v-card class="">
                <v-toolbar class="toolbarColor white--text">
                  <v-btn icon dark @click="dialog = false">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                  <v-toolbar-title
                    >QrCode
                    {{ QrCodeShow.item.item_name }}</v-toolbar-title
                  >
                </v-toolbar>
                <v-container fluid fill-height mt-12>
                  <v-row justify="center" align="center">
                    <v-img
                      :src="'data:image/jpeg;base64,' + QrCodeShow.QrImage"
                      max-width="300"
                      max-height="300"
                      class=""
                    ></v-img>
                  </v-row>
                </v-container>
                <v-container fluid fill-height>
                  <v-row justify="center" align="center">
                    <h1 class="pa-5 text-justify">
                      Aproxime-se de um atendente do local para aprovar seu
                      QrCode. Mostre o QrCode. O Atendente deve escanea-lo com o
                      celular e aprovar quantas unidades você quer retirar.
                    </h1>
                  </v-row>
                </v-container>
              </v-card>
            </v-dialog>
          </v-row>
        </v-container>
      </v-responsive>
    </v-container>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import moment from "moment";
export default {
  name: "CategoriaItem",

  props: ["object", "index"],
  data: () => ({
    snackErro: false,
    refreshLoader: false,
    snackSucesso: false,
    timeout: 5000,
    qrcodes: [],
    QrCodeShow: "",
    dialog: false,
    headers: [
      { align: "center", value: "qrcode" },
      {
        align: "center",
        value: "data.item.item_name",
      },
      { align: "center", value: "data.item.quantity" },
      { value: "tags" },
      ,
    ],
  }),

  methods: {
    ...mapActions(["MovetoCompra","refreshQRCODEUser"]),
    refreshQrcodes(){
      this.refreshLoader = true;
      this.refreshQRCODEUser().then( () => {
        if(this.getRespostaUser){
          this.qrcodes = this.getQrcodes;
          this.snackErro=false;
          this.snackSucesso = true;
          this.refreshLoader = false
        }else{
          this.snackSucesso=false;
          this.snackErro=true;
          this.refreshLoader = false
        }
      });
    },
    AssimilateTime(time, createdAt) {
      if (time === undefined) {
        const d = new Date(createdAt);
        var seconds = d.getTime() / 1000;
        var expire = seconds + 6 * 730 * 3600;
        var date_expire = new Date(expire * 1000);
        moment.locale("pt-br");
        let data_show = moment(date_expire).format("lll");
        return data_show;
      } else {
        const d = new Date(createdAt);
        var seconds = d.getTime() / 1000;
        var expire = seconds + time * 24 * 3600;
        var date_expire = new Date(expire * 1000);
        moment.locale("pt-br");
        let data_show = moment(date_expire).format("lll");
        return data_show;
      }
    },
    showQrCode(item) {
      this.QrCodeShow = item;
      this.dialog = true;
    },
  },
  computed: {
    ...mapGetters(["getQrcodes","getRespostaUser","getMessageUser"]),
    itemsPerRow() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return 1;
        case "sm":
          return 1;
        case "md":
          return 2;
        case "lg":
          return 2;
        case "xl":
          return 2;
      }
    },
  },

  created() {
    if (this.getQrcodes.length > 0) {
      //console.log(this.getQrcodes)
      this.qrcodes = this.getQrcodes;
    }
  },
};
</script>

<style>
@import "./qrcodes.module.css";
</style>
