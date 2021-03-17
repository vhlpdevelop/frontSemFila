<template>
  <v-card>
    <v-card-title>
      <span class="headline">Remover Produto?</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-text-field v-model="object.produto" readonly></v-text-field>
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
    CampoObrigatorio: [v => !!v || "Campo obrigatório!"]
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
