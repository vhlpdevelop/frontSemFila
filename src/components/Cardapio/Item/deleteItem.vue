<template>
  <v-container fluid>
    <div class="text-center">
      <v-dialog v-model="dialog">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="red lighten-2" class="d-flex d-sm-none" icon v-bind="attrs" v-on="on">
            <v-icon>delete</v-icon>
          </v-btn>
          <v-btn color="red lighten-2" class="d-none d-sm-flex" icon v-bind="attrs" v-on="on">
            <v-icon small>delete</v-icon>
          </v-btn>
        </template>

        <v-card>
          <v-card-title class="text-h6 pinkyBackground white--text lighten-2">
            Deletar este produto?
          </v-card-title>
          <v-card-subtitle
            class="text-h7 pinkyBackground white--text lighten-2"
          >
            Produto {{ item.item_name }}
          </v-card-subtitle>

          <v-card-text class="mt-3">
            Ao deletar este item, não haverá volta. Mas felizmente você pode
            criar denovo com as mesmas configurações.
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-btn color="red" text @click="deleteAction()">
              Deletar
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="dialog = false">
              Cancelar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <v-snackbar v-model="snackSucesso" color="success">
      <v-layout justify-space-around align-center>{{
        getResponseMsgCategoria
      }}</v-layout>
    </v-snackbar>
    <v-snackbar v-model="snackErro" color="error">
      <v-layout justify-space-around align-center>{{
        getResponseMsgCategoria
      }}</v-layout>
    </v-snackbar>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  components: {},
  props: ["object", "index"],
  data: () => ({
    snackErro: false,
    snackSucesso: false,
    timeout: 3000,
    dialog: false,
    deleteConfirm: false,
    item: "",
  }),

  methods: {
    ...mapActions(["deleteItem", "deleteItemFromCategoria"]),
    deleteAction() {
      if (this.object !== null) {
        if (this.index > -1) {
          this.deleteItem(this.object).then((response) => {
            if (this.getResponseItem) {
              this.snackSucesso = true;
              if (this.getItem !== "") {
                //console.log(this.getCardapio)
                let data = {
                  itemData: this.object,
                  index: this.index,
                };
                this.deleteItemFromCategoria(data).then((response) => {
                  //console.log("Categorias atualizadas")
                  
                  setTimeout(() => {
                    this.dialog = false;
                    this.$destroy;
                  }, "3000");
                  
                });
              }
            } else {
              this.snackErro = true;
            }
          });
        }
      }
    },
  },
  computed: mapGetters([
    "getItem",
    "getResponseCategoria",
    "getResponseMsgCategoria",
    "getResponseItem",
    "getResponseMsgCategoria",
  ]),

  created() {
    this.item = this.object;
  },
};
</script>

<style scoped>
@import "./item.module.css";
</style>
