<template>
  <v-card>
    <v-card-title>
      <span class="headline">Remover Pedido?</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12">
            <p>Pedido do {{object.user.firstName}}</p>
            <p>Data: <b>{{new Date(object.createdAt).toLocaleString()}}</b></p>
            <p>Quantidade de itens: <b>{{object.items.length}}</b></p>
          </v-col>
        </v-row>
      </v-container>
      <small>*Após a remoção, não terá retorno</small>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" text @click="fechar()">Cancelar</v-btn>
      <v-btn color="red darken-1" text @click="confRemover()">Deletar</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  props: ["object"],
  data: () => ({
    objects: "",
    showModal: false,
    timeout: 5000,
  }),

  methods: {
    fechar() {
      this.$emit("fechar");
    },
    confRemover() {
      console.log("entrou")
      this.$emit("confRemover", this.object);
    }
  },
  created(){
      console.log(this.object)
  }
};
</script>
