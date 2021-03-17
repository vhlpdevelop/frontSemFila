<template>
  <v-container>
    <div class="row">
      <div class="col-md-5 col-sm-5 col-xs-12">
        <v-carousel>
          <v-carousel-item v-for="(img, i) in item.image" :key="i" :src="img">
              <v-btn style="align-left" @click="openEditer(i, item.image)">editar</v-btn>
              <v-btn style="align-right" @click="openAdd()">Add</v-btn>
              <v-btn style="align-right" @click="RemoveImage(i)">Delete</v-btn>
          </v-carousel-item>
        </v-carousel>
      </div>
      <div class="col-md-7 col-sm-7 col-xs-12">
        <div class="pl-6">
          <p class="display-1 mb-0">
            Nome do produto
            <v-text-field
              v-model="item.produto"
              outlined
              single-line
              type="text"
              style="width: 100px"
              dense
            ></v-text-field>
          </p>
          <v-card-actions class="pa-0">
            <p class="headline font-weight-light pa-3">
              Valor do produto R$
              <v-text-field
                v-model="item.preco"
                outlined
                single-line
                type="text"
                style="width: 100px"
                dense
              ></v-text-field>
            </p>
            <p class="headline font-weight-light pa-3">
              Linha do produto
              <v-text-field
                v-model="item.linha"
                outlined
                single-line
                type="text"
                style="width: 100px"
                dense
              ></v-text-field>
            </p>
            <p class="headline font-weight-light pa-3">
              Tipo do produto
              <v-text-field
                v-model="item.tipo"
                outlined
                single-line
                type="text"
                style="width: 100px"
                dense
              ></v-text-field>
            </p>
            
          </v-card-actions>
          <p class="subtitle-1 font-weight-thin">
            <v-textarea
              clearable
              clear-icon="mdi-close-circle"
              label="Descrição do produto"
              :value="item.desc"
              v-model="item.desc"
            ></v-textarea>
          </p>

          <v-btn
            @click="saveProduct()"
            class="primary white--text"
            outlined
            tile
            dense
            ><v-icon>mdi-cart</v-icon> Criar Produto</v-btn
          >
        </div>
      </div>
    </div>
    <v-dialog v-model="openDialogAdd" persistent max-width="600px">
        <v-card>
            <v-btn @click="openDialogAdd = false">Fechar</v-btn>
            <v-card-title>
                Adicionar nova imagem
            </v-card-title>
            <v-card-text>
                Url:
                <v-text-field
                v-model="addImage"
                outlined
                single-line
                type="text"
                dense
              ></v-text-field>
            </v-card-text>
            <v-card-actions>
                <v-btn @click="newImage()">Adicionar imagem</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <v-dialog v-model="openDialogEdit" persistent max-width="600px">
        <v-card>
            <v-btn @click="openDialogEdit = false">Fechar</v-btn>
            <v-card-title>
                Editar imagem
            </v-card-title>
            <v-card-text>
                Numero da imagem:<b> {{editer.index}} </b>
                Url Atual: <a :href="editer.url_actual">Abrir imagem</a>
                <v-text-field
                v-model="editer.url"
                outlined
                single-line
                type="text"
                dense
              ></v-text-field>
            </v-card-text>
            <v-card-actions>
                <v-btn @click="editImage(editer.index)">Salvar imagem</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
        <v-snackbar v-model="snackSucesso" color="success">
      <v-layout justify-space-around align-center>Produto Criado</v-layout>
    </v-snackbar>
    <v-snackbar v-model="snackErro" color="error">
      <v-layout justify-space-around align-center>Erro ao Editar!</v-layout>
    </v-snackbar>
  </v-container>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data: () => ({
    rules: {
      required: (value) => !!value || "Required.",
      counter: (value) => value >= 1 || "mínimo é 1",
    },
    snackErro: false,
    snackSucesso: false,
    timeout: 5000,
    openDialogEdit: false,
    openDialogAdd: false,
    addImage: '',
    editer: {
        index: 0,
        url: '',
        url_actual:''
    },
    item: {
      //Exemplo de item
      desc: "",
      preco: "",
      produto: "",
      image: [ "0"],
    },
  }),
  methods: {
    ...mapActions([
      "addProduto",
    ]),
    saveProduct() {

        this.addProduto(this.item).then( () => {
            if(this.getRespostaProduct){
                console.log("Saved")
                this.snackErro=false
                this.snackSucesso = true
            }else{
              this.snackSucesso = false
              this.snackErro=true
            }
        });
    },
    openEditer(i, img_array){
        //console.log(img_array[i])
        this.editer.index = i
        this.editer.url_actual = img_array[i]
        this.openDialogEdit = true
    },
    editImage(i){
        this.item.image[i] = JSON.parse(JSON.stringify(this.editer.url))
       this.editer.url = ''
        console.log("saved")
    },
    RemoveImage(i){
        if(i !== 0){
        this.item.image.splice(i, 1);
        console.log("deleted")
        }
    },
    openAdd(){
        this.openDialogAdd = true
    },
    newImage(){
        this.item.image.push(JSON.parse(JSON.stringify(this.addImage)))
        this.addImage = ''
        console.log("saved")
    },
    
  },
  computed: mapGetters(["getRespostaProduct"]),
};
</script>