<template>
  <v-app>
    <v-container ma-0 pa-0 fluid class="backGroundQrCode">
      <v-dialog v-model="withDrawer"
      persistent 
      max-width="330">
        <QrCodeWithDraw v-if="withDrawer" @withDrawReq="widthDrawResponse(object_index)" @closeComponent="close" :object="object_Withdraw" :index="object_index"></QrCodeWithDraw>
      </v-dialog>
      
      <v-responsive width="100%">
        <v-container fluid ma-0 pa-0 fill-height class="d-flex">
          <v-row align="center" justify="center" class="mt-3">
            <v-card
              v-if="getQrcodes.length > 0"
              class="rounded-xl backGroundQrCode"
              elevation="0"
            >
              <v-row
                justify="start"
                class="mt-3 ma-1 d-flex align-center justify-center"
              >
                <v-card-title class="ml-6"
                  ><b class="textColorDefault">Meus QrCodes</b></v-card-title
                >
                <div v-if="getAuth">
                  <v-btn
                    class="textColorDefault"
                    fab
                    icon
                    large
                    :loading="refreshLoader"
                    @click="refreshQrcodes"
                    ><v-icon>mdi-refresh</v-icon></v-btn
                  >
                </div>
              </v-row>
              <v-divider></v-divider>
              <v-card-text>
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
                <v-data-iterator
                  :headers="headers"
                  :items="qrcodes"
                  hide-default-header
                  class="d-flex flex-column mh-100 ma-1"
                >
                  <template v-slot:default="props">
                    <v-row class="fill-height" id="container">
                      <v-col
                        v-for="(item, idx) in props.items"
                        :key="item._id"
                        :cols="12 / itemsPerRow"
                        class="py-1 mb-5"
                      >
                        <v-row no-gutters>
                          <v-col cols="12" class="d-flex align-end justify-end">
                          </v-col>
                          <v-col cols="12">
                            <v-card
                              outlined
                              elevation-7
                              class="fill-height ma-2"
                              style="background: #fbfbff !important"
                            >
                              <v-fade-transition>
                                <v-overlay
                                  :absolute="true"
                                  :value="item.overlay"
                                >
                                  <v-progress-circular
                                    indeterminate
                                    class="textColorDefault"
                                    :size="64"
                                  ></v-progress-circular>
                                </v-overlay>
                              </v-fade-transition>
                             
                              <v-fade-transition>
                                <v-overlay
                                  :absolute="true"
                                  v-if="item.withdraw"
                                >
                                  <v-container fluid>
                                    <v-card
                                      elevation="12"
                                      class="ma-5 rounded-xl"
                                    >
                                      <v-card-text>
                                        <p class="text-center white--text">
                                          Reembolso foi solicitado, aguarde 7
                                          dias. O valor será enviado para o
                                          destinatário pago.
                                        </p>
                                      </v-card-text>
                                    </v-card>
                                  </v-container>
                                </v-overlay>
                              </v-fade-transition>

                              <v-fade-transition>
                                <v-overlay
                                  :absolute="true"
                                  v-if="item.quantity == 0 || !item.state"
                                >
                                  <v-container fluid>
                                    <v-card
                                      elevation="12"
                                      class="ma-5 rounded-xl"
                                    >
                                      <v-card-text>
                                        <p class="text-center white--text">
                                          Este QrCode foi usado completamente,
                                          Já não possui mais uso.
                                        </p>
                                      </v-card-text>
                                      <v-card-actions
                                        class="d-flex align-center justify-center"
                                      >
                                        <v-btn
                                          color="red"
                                          @click="removeQrCode(item._id)"
                                        >
                                          Remove-lo
                                        </v-btn>
                                      </v-card-actions>
                                    </v-card>
                                  </v-container>
                                </v-overlay>
                              </v-fade-transition>

                              <v-card-title
                                style="word-break: break-word"
                                class="d-flex align-center justify-center text-center"
                              >
                                <v-row
                                  no-gutters
                                  class="d-flex align-center justify-center"
                                >
                                  <v-col
                                    cols="10"
                                    class="d-flex align-center justify-center mt-5"
                                  >
                                    <p
                                      class="text-truncate itemName"
                                      style="max-width: 300px"
                                    >
                                      {{ item.item.item_name }}
                                    </p>
                                  </v-col>
                                  <v-col
                                    cols="2"
                                    class="d-flex align-center justify-center"
                                  >
                                    <v-menu offset-y left class="d-flex">
                                      <template
                                        v-slot:activator="{ on, attrs }"
                                      >
                                        <v-btn
                                          class="buttonEditQrCode"
                                          dark
                                          icon
                                          fab
                                          v-bind="attrs"
                                          v-on="on"
                                        >
                                          <v-icon>mdi-menu-open</v-icon>
                                        </v-btn>
                                      </template>

                                      <v-list
                                        nav
                                        class="pl-6 text-end rounded-lg"
                                      >
                                        <v-list-item
                                          class="pl-12"
                                          @click="triggerOverlay(idx)"
                                        >
                                          <v-list-item-title
                                            class="pl-6 textColorDefault"
                                          >
                                            Atualizar QRCODE<v-icon
                                              class="mb-1 textColorDefault"
                                              >mdi-refresh</v-icon
                                            >
                                          </v-list-item-title>
                                        </v-list-item>
                                        <v-list-item class="pl-12" @click="popUpWithDraw(item, idx)">
                                          <v-list-item-title
                                            class="pl-6 red--text"
                                          >
                                            Solicitar Reembolso
                                            <v-icon class="mb-2 red--text"
                                              >mdi-cash-refund</v-icon
                                            >
                                          </v-list-item-title>
                                        </v-list-item>
                                      </v-list>
                                    </v-menu>
                                  </v-col>
                                  <v-col cols="12" class="text-center">
                                    <b>
                                      <span class="black--text">
                                        {{ item.store_name }}
                                      </span>
                                    </b>
                                  </v-col>
                                </v-row>
                                <v-row
                                  no-gutters
                                  class="d-flex align-center justify-center"
                                >
                                  <v-col
                                    cols="12"
                                    class="d-flex align-center justify-center"
                                  >
                                    <div
                                      class="d-col align-center justify-center"
                                    >
                                      <a
                                        @click="showQrCode(item)"
                                        class="text-center d-col align-center justify-center"
                                      >
                                        <v-subheader class="ml-5 mb-n5"
                                          >*Clique no QrCode para
                                          expandir.</v-subheader
                                        >
                                        <v-img
                                          class="d-none d-sm-flex"
                                          alt="Avatar"
                                          max-width="300px"
                                          max-height="300px"
                                          :src="
                                            'data:image/jpeg;base64,' +
                                            item.QrImage
                                          "
                                        ></v-img>
                                        <v-img
                                          class="d-flex d-sm-none"
                                          alt="Avatar"
                                          :src="
                                            'data:image/jpeg;base64,' +
                                            item.QrImage
                                          "
                                          width="300px"
                                          height="300px"
                                        ></v-img>
                                      </a>

                                      <div
                                        class="d-flex align-start justify-start ml-12 mt-n3"
                                      >
                                        <v-tooltip
                                          bottom
                                          v-if="item.item.destaques"
                                        >
                                          <template
                                            v-slot:activator="{ on, attrs }"
                                          >
                                            <v-avatar
                                              class="avatarColor mr-2"
                                              size="30"
                                            >
                                              <v-icon
                                                color="red"
                                                dark
                                                fab
                                                v-bind="attrs"
                                                v-on="on"
                                              >
                                                mdi-fire
                                              </v-icon>
                                            </v-avatar>
                                          </template>
                                          <span>Está em destaque</span>
                                        </v-tooltip>
                                        <v-tooltip
                                          bottom
                                          v-if="item.item.discount_status"
                                        >
                                          <template
                                            v-slot:activator="{ on, attrs }"
                                          >
                                            <v-avatar
                                              class="avatarColor mr-2"
                                              size="30"
                                            >
                                              <v-icon
                                                color="primary"
                                                dark
                                                fab
                                                v-bind="attrs"
                                                v-on:hover="on"
                                              >
                                                mdi-sale
                                              </v-icon>
                                            </v-avatar>
                                          </template>
                                          <span>Possui desconto</span>
                                        </v-tooltip>
                                        <v-tooltip
                                          bottom
                                          v-if="item.item.promotion"
                                        >
                                          <template
                                            v-slot:activator="{ on, attrs }"
                                          >
                                            <v-avatar
                                              class="avatarColor mr-2"
                                              size="30"
                                            >
                                              <v-icon
                                                color="yellow"
                                                dark
                                                fab
                                                v-bind="attrs"
                                                v-on="on"
                                              >
                                                mdi-lightning-bolt
                                              </v-icon>
                                            </v-avatar>
                                          </template>
                                          <span>Está em promoção</span>
                                        </v-tooltip>
                                      </div>
                                    </div>
                                  </v-col>
                                  <v-col cols="12" class="mt-2">
                                    <b class="">
                                      <span class="textColorDefault"
                                        >Quantidade: {{ item.quantity }}
                                      </span>
                                    </b>
                                  </v-col>
                                  <v-col
                                    cols="12"
                                    class="d-flex align-center justify-center"
                                  >
                                    <v-subheader
                                      class="text-truncate"
                                      style="max-width: 300px"
                                      >{{ item.item.description }}</v-subheader
                                    >
                                  </v-col>
                                  <v-col
                                    cols="12"
                                    class="d-flex align-center justify-center"
                                  >
                                  </v-col>
                                </v-row>
                              </v-card-title>
                              <v-divider></v-divider>
                              <v-container fluid>
                                <v-card-text>
                                  <v-row
                                    no-gutters
                                    justify="center"
                                    align="center"
                                  >
                                    <v-subheader class="">
                                      Expira em
                                      {{
                                        AssimilateTime(
                                          item.item.promotion_duration,
                                          item.createdAt
                                        )
                                      }}
                                    </v-subheader>
                                  </v-row>
                                </v-card-text>
                              </v-container>
                            </v-card>
                          </v-col>
                        </v-row>
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
                    >QrCode {{ QrCodeShow.item.item_name }}</v-toolbar-title
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
import QrCodeWithDraw from "./QrCode_withDrawRequest.vue";
export default {
  name: "CategoriaItem",
  components: {
    QrCodeWithDraw
  },
  props: ["object", "index"],
  data: () => ({
    snackErro: false,
    snackSucesso: false,
    timeout: 5000,
    withDrawer: false,
    object_Withdraw: null,
    object_index: "",
    refreshLoader: false,
    
    singleQrCode: "",
    ChangeQrCode: "",
 
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
  /*
  watch: {
    singleQrCode(item) {
      this.qrcodes[item].overlay = true;
      this.refreshSingle(this.qrcodes[item]._id, item)
    },
    ChangeQrCode(item){
    
      this.qrcodes[item].overlay = false;
      this.$nextTick( () => {
        console.log(this.qrcodes[item].overlay)
      });
     
    }
  },
  */

  methods: {
    ...mapActions([
      "MovetoCompra",
      "refreshQRCODEUser",
      "RSingleQrCode",
      "DeleteQrcodes",
    ]),
    widthDrawResponse(){
      if(this.getRespostaUser){
        this.$nextTick(() => {
            this.qrcodes[this.object_index].withdraw = true;
          });
        this.snackErro = false;
        this.snackSucesso = true;
     
      }else{
        this.snackErro = true;
        this.snackSucesso = false;
        this.close()
      
      }
      
    },  
    close(){
      this.object_Withdraw = {}
      this.object_index = "";
      this.withDrawer = false;
    },
    popUpWithDraw(object, index){
      this.object_Withdraw= object;
      this.object_index=index;
      this.withDrawer=true;
      

    },
    removeQrCode(key) {
      this.DeleteQrcodes(key).then(() => {});
    },
    triggerOverlay(key) {
      console.log(this.qrcodes[key].overlay);

      if (this.qrcodes[key].overlay) {
        this.qrcodes[key].overlay = false;
      } else {
        this.qrcodes[key].overlay = true;
        this.refreshSingle(this.qrcodes[key]._id, key);
      }
    },
    refreshSingle(id, index) {
      this.RSingleQrCode(id).then(() => {
        if (this.getRespostaUser) {
          this.$nextTick(() => {
            this.qrcodes[index].overlay = false;
          });


          this.snackErro = false;
          this.snackSucesso = true;
        } else {
          this.qrcodes[index].overlay = false;

          this.snackSucesso = false;
          this.snackErro = true;
        }
      });
    },
    refreshQrcodes() {
      this.refreshLoader = true;
      this.refreshQRCODEUser().then(() => {
        if (this.getRespostaUser) {
          this.qrcodes = this.getQrcodes;
          this.snackErro = false;
          this.snackSucesso = true;
          this.refreshLoader = false;
        } else {
          this.snackSucesso = false;
          this.snackErro = true;
          this.refreshLoader = false;
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
    ...mapGetters([
      "getQrcodes",
      "getRespostaUser",
      "getMessageUser",
      "getAuth",
    ]),
    itemsPerRow() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return 1;
        case "sm":
          return 2;
        case "md":
          return 3;
        case "lg":
          return 3;
        case "xl":
          return 3;
      }
    },
  },

  created() {
    if (this.getQrcodes.length > 0) {
      console.log(this.getQrcodes);
      this.qrcodes = this.getQrcodes;
    }
  },
};
</script>

<style>
.menuPosition {
  background-color: #ddd;
  position: relative !important;
  transform: translate(900%, 500%);
}
@import "./qrcodes.module.css";
</style>
