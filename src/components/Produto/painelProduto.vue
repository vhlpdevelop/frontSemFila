<template>
<v-container>
    <v-flex>
      <v-toolbar class="my-5 cyan darken-1 white--text">
        <v-btn icon @click="voltar()" class="white--text">
          <v-icon>arrow_back</v-icon>
        </v-btn>

        <v-toolbar-title class="layout row justify-center"
          >PRODUTOS</v-toolbar-title
        >

        <v-btn text @click="novo()" class="white--text">
          <v-icon dark>mdi-plus</v-icon> Novo Produto
        </v-btn>
      </v-toolbar>
    </v-flex>

    <v-card class="pa-5">
      <v-flex pa-5>
        <sub>*Clique no nome do produto para abrir*</sub>
        <v-text-field
          v-model="search"
          append-icon="search"
          label="Procurar"
          single-line
          hide-details
        />
      </v-flex>
      <v-dialog v-model="dialogRemove" persistent max-width="600px">
        <deleteProduto
          :object="object"
          @confRemover="actiondelete"
          @fechar="fecharRemove()"
        />
      </v-dialog>
      <v-data-table
        class="datatable"
        :headers="headers"
        :items="getProduct"
        :search="search"
        item-key="_id"
      >
        <template v-slot:item.image="props">  
          <v-avatar size="56" tile>
            <v-img :src="props.item.image[0]" height="100px"></v-img>
          </v-avatar>
        </template>
        <template v-slot:item.acao="props">
          <v-btn icon @click="editPainel(props.item)">
            <v-icon small>mdi-pencil</v-icon>
          </v-btn>
          <v-btn icon @click="OpenPainel(props.item)">
            <v-icon small>delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>

    <v-snackbar v-model="snackSucesso" color="success">
      <v-layout justify-space-around align-center>Produtos carregados</v-layout>
    </v-snackbar>
    <v-snackbar v-model="snackErro" color="error">
      <v-layout justify-space-around align-center>Erro ao carregar</v-layout>
    </v-snackbar>
  </v-container>
</template>



<script>
import { mapActions, mapGetters } from "vuex";
import VisualizarProduto from "../Produto/VisualizarProduto";
import deleteProduto from "../Produto/deleteProduto";
import editarProduto from "../Produto/editarProduto";
export default {
  components: {
    VisualizarProduto,
    deleteProduto,
    editarProduto,
  },

  data: () => ({
    snackErro: false,
    snackSucesso: false,
    timeout: 5000,
    dialog: false,
    search: "",
    dialogRemove: false,
    object: {
      desc: "",
      preco: "",
      _id: "",
      produto: "",
      image: [],
    },
    dialog: false,
    headers: [
      { text: "Img", align: "left", value: "image", width: "1%" },

      {
        text: "Produto",
        align: "left",
        value: "produto",
        width: "1%",
      },
      { text: "Linha", align: "left", value: "linha", width: "1%" },
      { text: "Tipo", align: "left", value: "tipo", width: "1%" },
      {
        text: "Preço",
        align: "left",
        value: "preco",
        width: "1%",
      },
      {
        text: "",
        align: "left",
        value: "acao",
        width: "1%",
        sortable: false,
      },
    ],
  }),

  methods: {
    ...mapActions([
      "fetchProdutos",
      "DeleteProduto",
    ]),
    auxiliar(value) {
      this.VisualizarProduto(value);
    },
    voltar() {
      this.$router.push("/dashboard");
    },
    OpenPainel(e) {
      this.object = JSON.parse(JSON.stringify(e));
      console.log(this.object)
      this.dialogRemove = true;
    },
    editPainel(props) {
      this.$router.push({
        name: "Editar Produto",
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
      this.DeleteProduto(JSON.parse(JSON.stringify(e._id))).then((response) => {
        if (this.getRespostaProduct) {
          this.snackSucesso = true;
          this.fecharRemove();
        } else {
          this.snackErro = true;
        }
      });
    },
    async fetcher(){
      await this.fetchProdutos().then(() => {
      if (this.getRespostaProduct) {
        console.log(this.getProduct)
        this.snackSucesso = true;
      } else {
        this.snackErro = true;
      }
    });
    }
  },
  computed: mapGetters(["getProduct", "getRespostaProduct"]),

  created() {
    this.fetcher()
  },
};
</script>

<style lang="scss">
.datatable {
  tr:hover {
    border-width: 1px;
    border-style: solid;
    background-color: #bbdefb !important;
    border-color: orange !important;
    font-weight: bold;
  }
}
</style>