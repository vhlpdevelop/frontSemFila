<template>
<v-container>
    <v-flex>
      <v-toolbar class="my-5 cyan darken-1 white--text">
        <v-btn icon @click="voltar()" class="white--text">
          <v-icon>arrow_back</v-icon>
        </v-btn>

        <v-toolbar-title class="layout row justify-center"
          >PEDIDOS</v-toolbar-title
        >

        <v-btn text @click="novo()" class="white--text">
          <v-icon dark>mdi-plus</v-icon> Criar Pedido
        </v-btn>
      </v-toolbar>
    </v-flex>

    <v-card class="pa-5">
      <v-flex pa-5>
        <v-text-field
          v-model="search"
          append-icon="search"
          label="Procurar"
          single-line
          hide-details
        />
      </v-flex>
      <v-dialog v-model="dialogRemove" persistent max-width="600px">
        <deletePedido
          :object="object"
          @confRemover="actiondelete"
          @fechar="fecharRemove()"
        />
      </v-dialog>
      <v-data-table
        class="datatable"
        :headers="headers"
        :items="getPedidos"
        :search="search"
        sort-by="createdAt"
        sort-desc="false"
        item-key="_id"
      >
        <template v-slot:item.createdAt="props">  
          <b>{{new Date(props.item.createdAt).toLocaleString()}}</b>
        </template>
        <template v-slot:item.items="props">  
          <b>{{props.item.items.length}}</b>
        </template>
        <template v-slot:item.acao="props">
          <v-btn icon @click="auxiliar(props.item)">
            <v-icon small>mdi-magnify</v-icon>
          </v-btn>
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
      <v-layout justify-space-around align-center>Pedidos carregados</v-layout>
    </v-snackbar>
    <v-snackbar v-model="snackErro" color="error">
      <v-layout justify-space-around align-center>Erro ao carregar</v-layout>
    </v-snackbar>
  </v-container>
</template>



<script>
import { mapActions, mapGetters } from "vuex";
import deletePedido from "../Pedido/deletePedido";
import editarPedido from "../Pedido/editarPedido";
export default {
  components: {
    deletePedido,
    editarPedido,
  },

  data: () => ({
    snackErro: false,
    snackSucesso: false,
    timeout: 5000,
    dialog: false,
    search: "",
    dialogRemove: false,
    object: {
      createdAt: '',
      _id: '',
      user: {
        firstName: '',
      }
    },
    dialog: false,
    headers: [
      {
        text: "N pedido",
        align: "left",
        value: "_id",
        width: "1%",
      },
      { text: "Usuario", align: "left", value: "user.firstName", width: "1%" },
      { text: "Email", align: "left", value: "user.email", width: "1%" },
      { text: "Data", align: "left", value: "createdAt", width: "1%" },
      { text: "Envio", align: "left", value: "envio", width: "1%" },
      {
        text: "Qtd items",
        align: "left",
        value: "items",
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
      "fetchPedidos",
      "DeletePedido",
    ]),
    auxiliar(value) {
      console.log(value)
      this.$router.push({
        name: 'Visualizar Pedido',
        params: {
          object: value
        }
      })
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
    async fetcher(){
      await this.fetchPedidos().then(() => {
      if (this.getResponsePedido) {
        //console.log(this.getPedidos)
        this.snackSucesso = true;
      } else {
        this.snackErro = true;
      }
    });
    }
  },
  computed: mapGetters(["getPedidos", "getResponsePedido"]),

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