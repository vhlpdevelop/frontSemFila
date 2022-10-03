<template>
  <v-app>
    <v-toolbar flat class="backgroundB elevation-5">
      <topSkeleton></topSkeleton>
      <v-container ma-0 pa-0 fluid v-if="loaded" class="d-flex">
        <v-app-bar-nav-icon
          class="hidden-md-and-up"
          @click.stop="drawer = !drawer"
        />
        <v-row class="align-center justify-space-around">
          <v-app-bar-nav-icon
            class="d-none d-sm-none d-md-flex d-lg-flex d-xl-flex"
            @click.stop="drawer = !drawer"
          />
          <v-btn
            @click="toLink('destaques')"
            small
            text
            class="d-none d-sm-none d-md-flex d-lg-flex d-xl-flex navText"
            >Destaques</v-btn
          >
          <h1 v-if="!storeHasImage" class="navTitle" @click="toHome">{{ store.name }}</h1>
          <v-btn
            small
            text
            @click="toLink('promocoes')"
            class="d-none d-sm-none d-md-flex d-lg-flex d-xl-flex navText"
            >Promoções</v-btn
          >
          <v-btn
            icon
            fab
            @click="toLink('homeCardapio')"
            color="primary"
            class="d-none d-sm-none d-md-flex d-lg-flex d-xl-flex"
            ><v-icon>mdi-account</v-icon></v-btn
          >
          <v-menu class="d-none d-sm-none d-md-flex d-lg-flex d-xl-flex">
            <template v-slot:activator="{ on }">
              <v-btn text v-on="on">
                <v-badge
                  :content="getCartSize.toString()"
                  value="2"
                  color="green"
                  overlap
                >
                  <v-icon>mdi-cart</v-icon>
                </v-badge>
              </v-btn>
            </template>
            <v-list shaped>
              <v-list-item-group>
                <v-list-item @click="toLink('checkout')" color="primary">
                  <v-list-item-icon
                    ><v-icon
                      color="primary"
                      v-text="'mdi-cart-arrow-right'"
                    ></v-icon
                  ></v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title v-text="'Checkout'"></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-divider></v-divider>
              </v-list-item-group>
              <v-list nav dense>
                <v-list-item-group>
                  <v-list-item v-for="item in getCart" :key="item._id">
                    <v-list-item-avatar>
                      <v-img :src="item.image_url"></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title>{{ item.item_name }}</v-list-item-title>
                      <v-list-item-subtitle
                        >Qtd:
                        {{ item.qtd }}</v-list-item-subtitle
                      >
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-btn icon x-small @click="cartEdit(item)">
                        <v-icon color="green lighten-1">mdi-pen</v-icon>
                      </v-btn>
                    </v-list-item-action>
                    <v-list-item-action>
                      <v-btn icon x-small @click="cartRemove(item)">
                        <v-icon color="red lighten-1">mdi-delete</v-icon>
                      </v-btn>
                    </v-list-item-action>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-list>
          </v-menu>
        </v-row>
      </v-container>
    </v-toolbar>
    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
      width="300"
      class="mx-auto"
    >
      <v-list class="">
        <v-list-item @click="toHome" class="mb-1">
          <v-list-item-icon>
            <v-icon fab style="color: rgb(55, 80, 92) !important;"
              >mdi-home</v-icon
            >
          </v-list-item-icon>
          <h1 class="navTitle">{{ store.name }}</h1>
        </v-list-item>
        <v-divider />
        <v-list-item @click="toLink('qrcodesOnCardapio')" class="mb-1 text-center">
        <h1 class="navSubMenu ">Meus QrCodes</h1>
          <v-list-item-icon>
            <v-badge
                  :content="getQrcodesSize.toString()"
                  value="2"
                  color="green"
                  overlap
                >
                  <v-icon>mdi-qrcode</v-icon>
                </v-badge>
          </v-list-item-icon>
          
        </v-list-item>
        <v-menu>
        <template v-slot:activator="{ on }">
        <v-list-item v-on="on" class="mb-1 text-center">
        <h1 class="navSubMenu ">Meu carrinho - </h1>
          <v-list-item-icon>
            <v-badge
              :content="getCartSize.toString()"
              value="2"
              color="green"
              overlap
            >
              <v-icon>mdi-cart</v-icon>
            </v-badge>
          </v-list-item-icon>
          
        </v-list-item>
        </template>
        <v-list shaped>
          <v-list-item-group>
            <v-list-item @click="toLink('checkout')" color="primary">
              <v-list-item-icon
                ><v-icon
                  color="primary"
                  v-text="'mdi-cart-arrow-right'"
                ></v-icon
              ></v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="'Checkout'"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
          </v-list-item-group>
          <v-list nav dense>
            <v-list-item-group>
              <v-list-item v-for="item in getCart" :key="item._id">
                <v-list-item-avatar>
                  <v-img :src="item.image_url"></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>{{ item.item_name }}</v-list-item-title>
                  <v-list-item-subtitle
                    > Qtd:
                    {{ item.qtd }}</v-list-item-subtitle
                  >
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn icon x-small @click="cartEdit(item)">
                    <v-icon color="green lighten-1">mdi-pen</v-icon>
                  </v-btn>
                </v-list-item-action>
                <v-list-item-action>
                  <v-btn icon x-small @click="cartRemove(item)">
                    <v-icon color="red lighten-1">mdi-delete</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-list>
      </v-menu>
        <v-divider />
        <v-list-item
          v-for="(item, index) in subMenu"
          :key="item.title"
          @click="toLink(item.to)"
        >
          <v-list-item-title class="pinkColorText">{{
            item.title
          }}<v-icon :color="item.color">{{item.icon}}</v-icon></v-list-item-title>
        </v-list-item>

        <v-list-item
          v-for="(item, index) in cardapio"
          :key="item.category_name"
          @click="toLinkCategoria(item)"
        >
          <v-list-item-title class="pinkColorText">{{
            item.category_name
          }}</v-list-item-title>
        </v-list-item>

        <v-divider />
        <v-menu>
        <template v-slot:activator="{ on }">
          <v-list-item v-show="logged" v-on="on">
            <v-list-item-title class="navSubMenu">{{getPerfil}} <v-icon left color="green">mdi-account</v-icon></v-list-item-title>
          </v-list-item>
          <v-list-item @click="pushToLogin" v-show="!logged">
            <v-list-item-title class="navSubMenu">Entrar</v-list-item-title>
          </v-list-item>
        </template>
        <v-list shaped>
          <v-list-item-group>
            <v-list-item @click="moveToSettings()">
              <v-list-item-icon
                ><v-icon v-text="'mdi-cog'"></v-icon
              ></v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="'Configurações'"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>

            <v-list-item @click="accountLogOut()">
              <v-list-item-icon>
                <v-icon v-text="'mdi-logout'"></v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="'Sair'"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>
        <v-list-item
          v-for="(item, index) in staticMenu"
          :key="item.title"
          @click="toLink(item.path)"
        >
          <v-list-item-title class="textColorDefault">{{
            item.title
          }}</v-list-item-title>
        </v-list-item>
      </v-list>
      
      
    </v-navigation-drawer>
    <v-container v-if="loaded" ma-0 pr-0 pl-0 pt-3 fluid class="mx-auto " >
      <transition name="slide-fade">
        <router-view class="view" />
      </transition>
    </v-container>
    <v-container
      fluid
      ma-0
      pa-0
      mt-10
      class="d-flex align-center justify-center"
    >
      <bodySkeleton></bodySkeleton>
    </v-container>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import topSkeleton from "./TopcardapioSkeletonLoader.vue";
import bodySkeleton from "./BodycardapioSkeletonLoader.vue";
import { EventBus } from "./EventBus";
import topCardapio from "./topCardapio.vue";
export default {
  components: {
    topSkeleton,
    bodySkeleton,
    topCardapio,
  },
  props: ["id"],
  data: () => ({
    snackErro: false,
    snackSucesso: false,
    timeout: 5000,
    tab: null,
    drawer: false,
    storeHasImage: false,
    store: "",
    cardapio: "",
    StoreImg: "",
    logged: false,
    StoreName: "",
    skeletonLoading: true,
    loaded: false,
    staticMenu: [
      { title: "Termos de Uso", path: "termos" },
      { title: "Privacidade", path: "privacidade" },
      { title: "Ajuda", path: "ajuda" },
    ],
    subMenu: [
      { title: "Destaques", to: "destaques" , icon: "mdi-fire", color:"red"},
      { title: "Promoções", to: "promocoes", icon: "mdi-lightning-bolt", color:"yellow" },
    ],
  }),

  methods: {
    ...mapActions(["LoadStore", "routeToCategoria", "DeleteItem", "LogOut", "checkToken","MovetoCompra", "autoLogin"]),
    pushToLogin() {
      this.$router.push({
        name: "entrar",
        params: {
          object: this.id,
        },
      });
    },
    moveToSettings() {
      this.$router.push({
        name: "settings",
      });
    },
    accountLogOut() {
      //Realizar logout
      this.LogOut().then((response) => {
        this.logged = false;
      });
    },
      cartEdit(item) {
      //Função editar produto
      this.MovetoCompra(item).then( () => {
        this.$router.push({
          //arrumar os props
          name: "compra",
        });
      });
    },
    cartRemove(item) {
      //Função remover item do cart
      this.DeleteItem(item);
    },
    toLinkCategoria(name) {
      let index = this.getCardapio.cardapio
        .map((e) => e.category_name)
        .indexOf(name.category_name);
      this.routeToCategoria(index).then(() => {
        this.$router.push({
          //arrumar os props
          name: "categoria",
          params: { id2: name.category_name },
        });
      });
    },
    toLink(name) {
      ////console.log(name);
      this.$router.push({
        //arrumar os props
        name: name,
        params: this.id,
      });
    },
    toHome() {
      this.$router.push({
        //arrumar os props
        name: "homeCardapio",
        params: this.id,
      });
    },
    auxiliar(value) {
      ////console.log(value);
      this.$router.push({
        name: "Visualizar Pedido",
        params: {
          object: value,
        },
      });
    },
    voltar() {
      this.$router.push("/dashboard");
    },
    OpenPainel(e) {
      this.object = JSON.parse(JSON.stringify(e));
      ////console.log(this.object);
      this.dialogRemove = true;
    },
    editPainel(props) {
      this.$router.push({
        name: "Editar Pedido",
        params: {
          object: props,
        },
      });
    },
    novo() {
      this.$router.push({
        name: "Novo Produto",
      });
    },
    fecharRemove() {
      this.object = {};
      this.dialogRemove = false;
    },
    actiondelete(e) {
      this.DeletePedido(JSON.parse(JSON.stringify(e._id))).then((response) => {
        if (this.getResponsePedido) {
          this.snackSucesso = true;
          this.fecharRemove();
        } else {
          this.snackErro = true;
        }
      });
    },
    async fetcher() {
      await this.fetchCardapio().then(() => {
        if (this.getResponseCardapio) {
          //////console.log(this.getCardapio)
          this.snackSucesso = true;
        } else {
          this.snackErro = true;
        }
      });
    },
  },
  computed: mapGetters([
    "getResponseMsgCardapio, getResponseCardapio",
    "getCardapio",
    "getLoaded",
    "getCart",
    "getCartSize",
    "getnewQrCode",
    "getQrcodes",
    "getQrcodesSize",
    "getAuth",
    "getPerfil",
    "getCheckToken",
  ]),

  created() {
    ////console.log(JSON.parse(JSON.stringify(this.getQrcodes)))
    ////console.log(this.getQrcodes[0])
    ////console.log(this.id);
    
    this.LoadStore(this.id).then((response) => {
      ////console.log(this.getLoaded);
      if (this.getLoaded) {
        ////console.log(this.getCardapio);
        if (this.getCardapio !== "") {
          this.StoreName = this.getCardapio.store.name;
          document.title = this.StoreName
          this.StoreImg = this.getCardapio.store.store_img;
          let aux = this.getCardapio.store.store_img;
          if (aux.length !== 0) {
            this.storeHasImage = true;
          }
          this.store = this.getCardapio.store;
          this.cardapio = this.getCardapio.cardapio;
          this.loaded = true;
        }
        this.autoLogin().then( () => {
          if(this.getAuth){
            this.logged = true
          }
        });
      } else {
        this.$router.push({
          name: "dashboard",
        });
      }
    });
  },
};
</script>

<style>
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
@import "./cardapio.module.css";
</style>
