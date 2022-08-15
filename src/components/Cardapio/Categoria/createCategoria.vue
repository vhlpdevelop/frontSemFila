<template>
  <v-container fluid>
    <v-list three-line subheader>
      <v-subheader>Categoria</v-subheader>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>Insira o nome da Categoria</v-list-item-title>
          <v-text-field
            label="Exemplo: Bebidas, drinks, ingressos..."
            v-model="category_name"
          ></v-text-field>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-list three-line subheader>
      <v-subheader class="d-none">Inserir Items</v-subheader>
      <v-list-item>
        <v-data-table
          item-key="name"
          show-select
          class="elevation-1 d-none"
          v-model="selected"
          :headers="headers"
          :items="items"
          :loading="loadingTable"
          :loading-text="loadingMessage"
        ></v-data-table>
      </v-list-item>
      <v-list-item>
        <v-row justify="end">
          <v-btn class="ma-5 buttonCategory white--text" @click="addCategoria">Criar Categoria</v-btn>
        </v-row>
      </v-list-item>
    </v-list>
    <v-snackbar v-model="snackSucesso" color="success">
      <v-layout justify-space-around align-center>{{getResponseMsgCategoria}}</v-layout>
    </v-snackbar>
    <v-snackbar v-model="snackErro" color="error">
      <v-layout justify-space-around align-center>{{getResponseMsgCategoria}}</v-layout>
    </v-snackbar>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  components: {},
  props: ["object"],
  data: () => ({
    snackErro: false,
    snackSucesso: false,
    timeout: 5000,
    loadingTable: true, //CASO ENVIE TUDO A TABELA FICA PRONTA
    loadingMessage: "Carregando os items...", //CASO OCORRA ERRO DEVE MUDAR
    dialog: false,
    items: [],
    selected: [],
    category_name: '',
    dialogRemove: false,

    headers: [
      {
        text: "Imagem",
        align: "left",
        value: "img",
        width: "20%",
        sortable: false,
      },
      { text: "Item", align: "left", value: "name", width: "20%" },
      { text: "Valor", align: "left", value: "preco", width: "20%" },
      {
        text: "",
        align: "left",
        value: "acao",
        width: "10%",
        sortable: false,
      },
    ],
  }),

  methods: {
    ...mapActions(["newCategoria", "updateNewCategoria"]),
    addCategoria(){
      this.newCategoria(this.category_name).then( (response) => {
        if(this.getResponseCategoria){
         this.snackSucesso = true;
         if(this.getCategoria !== ""){
          //console.log(this.getCardapio)
          let data ={
            itemData: this.getCategoria,
            listData: this.getCardapio
          }
            this.updateNewCategoria(data).then((response)=>{
              //console.log("Categorias atualizadas")
            })
         }
        }else{
          this.snackErro = true;
        }
      });
    },
  },
  computed: mapGetters(["getCategoria","getResponseCategoria", "getResponseMsgCategoria", "getCardapio"]),

  created() {},
};
</script>

<style scoped>
@import "./categoria.module.css";
</style>
