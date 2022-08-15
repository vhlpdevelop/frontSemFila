<template>
  <v-container>
    <v-container fluid fill-height class="justify-center align-center">
      <v-row justify="center">
        <v-dialog
          v-model="dialogUpdate"
          fullscreen
          hide-overlay
          transition="dialog-bottom-transition"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn class="d-flex d-sm-none" icon v-bind="attrs" v-on="on">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn class="d-none d-sm-flex" icon v-bind="attrs" v-on="on">
              <v-icon small>mdi-pencil</v-icon>
            </v-btn>
            
          </template>
          <v-card class="">
            <v-toolbar class="toolbarColor white--text">
              <v-btn icon dark @click="dialogUpdate = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
              <v-toolbar-title>Atualizar Item <b>{{this.object.item_name}}</b></v-toolbar-title>
            </v-toolbar>
            <v-row no-gutters class="d-flex">
              <v-col cols="12" md="6" sm="6">
                <v-list three-line subheader>
                  <v-subheader>Novo item/produto</v-subheader>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title
                        >Categoria deste Item</v-list-item-title
                      >
                      <v-text-field
                        disabled
                        v-model="category_name"
                      ></v-text-field>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title
                        >Insira o nome do item</v-list-item-title
                      >
                      <v-text-field
                        label="Exemplo: Cerveja, Ingresso show, Hot-dog"
                        v-model="newitem.item_name"
                        :rules="CampoObrigatorio"
                        :counter="30"
                        required
                      ></v-text-field>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title
                        >Descrição do seu produto</v-list-item-title
                      >
                      <v-textarea
                        outlined
                        name="input-7-1"
                        counter="200"
                        v-model="newitem.description"
                        hint="Crie uma boa descrição, isso ajudara na venda do seu produto."
                      ></v-textarea>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-col>
              <v-col cols="12" md="6" sm="6">
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title
                      >Imagem do item
                      <v-dialog v-model="dialogDica" width="300">
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            small
                            v-bind="attrs"
                            v-on="on"
                            text
                            class="buttonBackground white--text"
                          >
                            dica de imagem
                            <v-icon small>mdi-lightning-bolt-outline</v-icon>
                          </v-btn>
                        </template>

                        <v-card>
                          <v-card-title class="text-h5 toolbarColor white--text">
                            Como tirar a foto?
                          </v-card-title>

                          <v-card-text class="mt-2 text-h6">
                            <p class="colorStrongText">Utilize um fundo branco para apenas mostrar seu produto, concentre-se na utilização de luzes.</p>
                            <p class="colorStrongText"> Ilumine bem sem deixar sombras e utilize uma boa camera. A de seu celular pode servir.</p>
                            <p><b>Atenção, não toleramos imagens pertubadoras, nudez e conteúdo explicito!.</b></p>
                          </v-card-text>

                          <v-divider></v-divider>

                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                              color="primary"
                              text
                              @click="dialogDica = false"
                            >
                              Entendi
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </v-list-item-title>
                    <v-subheader
                      >Aparece na listagem e no seu cardapio.</v-subheader
                    >
                    <v-row class="justify-center">
                      <v-img
                        contain
                        :src="newitem.image_url"
                        max-width="300"
                        max-height="275"
                      >
                      </v-img>
                    </v-row>
                  </v-list-item-content>
                </v-list-item>
                <v-container fluid class="ma-1">
                  <v-file-input
                    outlined
                    rounded
                    accept="image/*"
                    prepend-icon="mdi-camera"
                    class="buttonText-Color ma-1"
                    v-model="imageModel"
                    @change="newImage"
                  >
                    <template v-slot:label>
                      <span class="buttonText-Color ">Escolher imagem</span>
                    </template>
                  </v-file-input>
                </v-container>
                <v-container fluid class="text-center mt-n12">
                  <b>Formatos: JPEG, JPG, PNG e HEIC.</b>
                  <p><b>Peso máximo: 20 MB.</b></p>
                  <p class="mt-n4"><b>Resolução mínima: 300x275</b></p>
                </v-container>
              </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-row no-gutters>
              <v-col cols="12" md="6" sm="6">
                <v-list three-line subheader>
                  <v-subheader>Customize seu produto</v-subheader>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>PREÇO - Obrigatório</v-list-item-title>
                      <v-text-field
                        v-money="money"
                        v-model.lazy="newitem.price"
                        :rules="CampoObrigatorio"
                      ></v-text-field>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>Promoção</v-list-item-title>
                      <v-select
                        name="select Promoção"
                        :items="promotion"
                        label="Este item entrará na lista de promoção?"
                        outlined
                        :menu-props="{ down: true, offsetY: true }"
                        return-object
                        v-model="newitem.promotion"
                        @change="select_value"
                        item-text="text"
                        item-value="value"
                      >
                      </v-select>
                      <v-subheader class="mt-n5"
                        >Ao inserir um item em promoção, você o insere direto no
                        cardapio das promoções.
                      </v-subheader>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title
                        >Destacar no Cardapio</v-list-item-title
                      >
                      <v-select
                        name="select Promoção"
                        :items="destaques"
                        label="Destacar este produto?"
                        outlined
                        :menu-props="{ down: true, offsetY: true }"
                        return-object
                        @change="select_destaque"
                        v-model="selectedPromotion"
                        item-text="text"
                      >
                      </v-select>
                      <v-subheader class="mt-n5"
                        >O destaque no seu cardapio são os primeiros produtos
                        que você deseja mostrar, como pratos principais ou
                        bebidas mais pedidas!. Recomendamos poucos items.
                      </v-subheader>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-col>
              <v-col cols="12" md="6" sm="6">
                <v-list three-line subheader class="mt-3">
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>Desconto</v-list-item-title>
                      <v-select
                        name="select desconto"
                        :items="desconto"
                        label="Este item possuirá desconto?"
                        outlined
                        :menu-props="{ down: true, offsetY: true }"
                        return-object
                        v-model="newitem.discount_status"
                        @change="select_desconto"
                        item-text="text"
                        item-value="value"
                      >
                      </v-select>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>Valor desconto</v-list-item-title>
                      <v-text-field
                        :disabled="!newitem.discount_status"
                        v-model="newitem.discount_value"
                        prefix="R$"
                      ></v-text-field>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>Duração do desconto</v-list-item-title>
                      <v-select
                        name="select desconto"
                        :items="descontoDuration"
                        :disabled="!newitem.discount_status"
                        label="Duração do desconto"
                        outlined
                        :menu-props="{ down: true, offsetY: true }"
                        return-object
                        v-model="newitem.discount_value"
                        @change="select_duration_desconto"
                        item-text="text"
                        item-value="value"
                      >
                      </v-select>
                      <v-subheader class="mt-n2"
                        >Atenção, a duração é o tempo de existência do QRCODE
                        comprado. Um produto com desconto não tem tempo limite,
                        para retirar o desconto deve-se alterar direto no
                        cardapio selecionando ele
                      </v-subheader>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-col>
              <v-col cols="12" md="12" sm="12">
                <v-row align="center" justify="center">
                  <v-btn
                    :loading="loading"
                    block
                    class="ma-5 buttonCategory white--text"
                    @click="confirmar"
                    >Salvar item</v-btn
                  >
                </v-row>
              </v-col>
            </v-row>
          </v-card>
        </v-dialog>
      </v-row>
    </v-container>

    <v-snackbar v-model="snackSucesso" color="success">
      <v-layout justify-space-around align-center>{{ snackMessage }}</v-layout>
    </v-snackbar>
    <v-snackbar v-model="snackErro" color="error">
      <v-layout justify-space-around align-center>{{ snackMessage }}</v-layout>
    </v-snackbar>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { VMoney } from "v-money";
export default {
  name: "updatingItem",
  directives: { money: VMoney },
  components: {},
  props: ["object", "index", "name"],
  data: () => ({
    snackErro: false,
    snackSucesso: false,
    snackMessage: "",
    dialogUpdate: false,
    dialogDica: false,
    timeout: 3000,
    money: {
      decimal: ",",
      thousands: ".",
      prefix: "R$ ",
      suffix: "",
      precision: 2,
      masked: false,
    },
    CampoObrigatorio: [
      (v) => !!v || "Campo obrigatório!",
      (v) => (v && v.length >= 5) || "Poucos digitos",
      (v) => (v && v.length <= 25) || "Tamanho excedido!",
    ],
    CampoObrigatorioValor: [(v) => !!v || "Campo obrigatório!"],
    dialog: false,
    items: [],
    category: "",
    descontoTrigger: null,
    desconto: [
      { text: "Sim, possuirá desconto", value: true },
      { text: "Não, sem desconto", value: false },
    ],
    descontoDuration: [
      { text: "1 Dia de Desconto - No QRCODE durará 24h", value: "1" },
      { text: "2 Dias de Desconto - No QRCODE durará 48h", value: "2" },
      { text: "3 Dias de Desconto - No QRCODE durará 72h", value: "3" },
      { text: "4 Dias de Desconto - No QRCODE durará 96h", value: "4" },
      { text: "5 Dias de Desconto - No QRCODE durará 120h", value: "5" },
      { text: "6 Dias de Desconto - No QRCODE durará 144h", value: "6" },
      { text: "7 Dias de Desconto - No QRCODE durará 172h", value: "7" },
    ],

    selectedDesconto: null,
    selectedPromotion: true,
    selected: [],
    selectedDestaque: null,
    loading: false,
    category_name: "",
    promotion: [
      { text: "Em promoção", value: true },
      { text: "Fora da promoção", value: false },
    ],
    destaques: [
      { text: "Sim, destacar este item", value: true },
      { text: "Não destacar", value: false },
    ],
    lazy_url: "../../../img/default-placeholder.png",
    newitem: {
      item_name: "",
      description: "",
      type: "",
      image_url: "",
      price: "",
      status: "",
      category_id: "",
      company_id: "",
      promotion: "",
      discount_status: "",
      discount_value: "",
      discount_duration: "",
      destaques: "",
    },
    imageModel: null,
    defaultImage: require("../../../img/default-placeholder.png"),
    image_size: 0,
    image_size_helper: "",
    discount_duration: null,
  }),

  methods: {
    ...mapActions(["updateItem", "updateItemFromCategoria"]),
    newImage() {
      var totalBytes = this.imageModel.size;
      if (totalBytes < 1000000) {
        this.image_size_helper = Math.floor(totalBytes / 1000) + "KB";
        this.image_size = Math.floor(totalBytes / 1000000);
      } else {
        this.image_size = Math.floor(totalBytes / 1000000);
        this.image_size_helper = Math.floor(totalBytes / 1000000) + "MB";
      }
      this.newitem.image_url = this.imageModel;
      this.defaultImage = URL.createObjectURL(this.imageModel);
    },
    select_destaque(e) {
      this.newitem.destaques = e.value;
    },
    select_duration_desconto(e) {
      this.newitem.discount_value = e.value;
    },
    select_value(e) {
      this.newitem.promotion = e.value;
    },
    select_desconto(e) {
      this.newitem.discount_status = e.value;
      if (!this.newitem.discount_status) {
        this.newitem.discount_value = "1.1";
        this.newitem.discount_duration = "0";
      }
    },
    upItem() {
      if (this.image_size > 20000000) {
        this.snackMessage = "Imagem maior que 20MB";
        this.snackErro = true;
      } else {
        try {
          this.updateItem(this.newitem).then((response) => {
            if (this.getResponseItem) {
              //console.log(this.getItem)
              let aux = this.getItem;
              this.updateItemFromCategoria(aux).then((response) => {
                this.loading = false;
                this.snackSucesso = true;
                this.snackMessage = this.getResponseMsgItem;
              });
            } else {
              this.loading = false;
              this.snackErro = true;
              this.snackMessage = this.getResponseMsgItem;
            }
          });
        } catch (e) {
          this.loading = false;
          this.snackErro = true;
          this.snackMessage = e.message;
          console.log(e);
        }
      }
    },
    popError(msg) {
      this.snackMessage = msg;
      this.snackErro = true;
      this.loading = false;
    },
    confirmar() {
      this.loading = true;
      if (this.newitem.item_name !== "") {
        if (this.newitem.item_name.length <= 30) {
          let aux = this.newitem.price.replace(/[^0-9,]/g, "");
          aux = aux.replace(/,/g, ".");
          //console.log(aux)
          if (aux > 1) {
            if (this.newitem.description.length < 200) {
              if (this.newitem.promotion !== null) {
                if (this.newitem.destaques !== null) {
                  if (this.newitem.discount_status !== null) {
                    if (this.newitem.discount_value !== null) {
                      let aux = this.newitem.discount_value.replace(
                        /[^0-9,]/g,
                        ""
                      );
                      aux = aux.replace(/,/g, ".");
                      if (aux !== "") {
                        let aux = this.newitem.discount_value.replace(
                          /[^0-9,]/g,
                          ""
                        );
                        aux = aux.replace(/,/g, ".");
                        if (aux > 0.5) {
                          this.upItem();
                        } else {
                          this.popError(
                            "Valor do desconto muito baixo. Min: R$ 0.50"
                          );
                        }
                      } else {
                        //console.log(this.newitem.discount);
                        //console.log(this.descontoTrigger);
                        this.popError("Não inseriu o valor do desconto");
                      }
                    } else {
                      this.popError("Não selecionou a duração do desconto");
                    }
                  } else {
                    this.popError("Não selecionou o desconto");
                  }
                } else {
                  //console.log(this.newitem.destaques);
                  this.popError("Não selecionou o destaque");
                }
              } else {
                this.popError("Não selecionou a promoção");
              }
            } else {
              this.popError("Descrição maior que o permitido");
            }
          } else {
            this.popError("Preço do item muito baixo");
          }
        } else {
          this.popError("Nome do item muito grande");
        }
      } else {
        this.popError("Nome do item vazio");
      }
    },
  },
  computed: mapGetters([
    "getItem",
    "getResponseCategoria",
    "getResponseMsgCategoria",
    "getResponseMsgItem",
    "getResponseItem",
  ]),

  created() {
    this.newitem = this.object;
    this.category_name = this.name;
    //console.log(this.newitem);
  },
};
</script>

<style scoped>
@import "./item.module.css";
</style>
