<template>
  <v-container fluid>
    <v-row no-gutters class="d-flex">
      <v-col cols="12" md="6" sm="6">
        <v-list three-line subheader>
          <v-subheader>Novo item/produto</v-subheader>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Categoria deste Item</v-list-item-title>
              <v-text-field
                disabled
                v-model="category.category_name"
              ></v-text-field>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Insira o nome do item</v-list-item-title>
              <v-text-field
                label="Exemplo: Cerveja, Ingresso show, Hot-dog"
                v-model="newitem.item_name"
                :rules="CampoObrigatorio"
                required
              ></v-text-field>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Descrição do seu produto</v-list-item-title>
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
                    <p class="colorStrongText">
                      Utilize um fundo branco para apenas mostrar seu produto,
                      concentre-se na utilização de luzes.
                    </p>
                    <p class="colorStrongText">
                      Ilumine bem sem deixar sombras e utilize uma boa camera. A
                      de seu celular pode servir.
                    </p>
                    <p>
                      <b
                        >Atenção, não toleramos imagens pertubadoras, nudez e
                        conteúdo explicito!.</b
                      >
                    </p>
                  </v-card-text>

                  <v-divider></v-divider>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click="dialogDica = false">
                      Entendi
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-list-item-title>
            <v-subheader>Aparece na listagem e no seu cardapio.</v-subheader>
            <v-row class="justify-center">
              <v-img
                contain
                :src="defaultImage"
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
                @change="select_value"
                item-text="text"
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
              <v-list-item-title>Destacar no Cardapio</v-list-item-title>
              <v-select
                name="select Promoção"
                :items="destaques"
                label="Destacar este produto?"
                outlined
                :menu-props="{ down: true, offsetY: true }"
                return-object
                @change="select_destaque"
                item-text="text"
              >
              </v-select>
              <v-subheader class="mt-n5"
                >O destaque no seu cardapio são os primeiros produtos que você
                deseja mostrar, como pratos principais ou bebidas mais pedidas!.
                Recomendamos poucos items.
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
                @change="select_desconto"
                item-text="text"
              >
              </v-select>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Valor desconto</v-list-item-title>
              <v-text-field
                :disabled="!descontoTrigger"
                v-model="newitem.discount"
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
                :disabled="!descontoTrigger"
                label="Duração do desconto"
                outlined
                :menu-props="{ down: true, offsetY: true }"
                return-object
                @change="select_duration_desconto"
                item-text="text"
              >
              </v-select>
              <v-subheader class="mt-n5"
                >Atenção, a duração é o tempo de existência do QRCODE comprado.
                Um produto com desconto não tem tempo limite, para retirar o
                desconto deve-se alterar direto no cardapio selecionando ele
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
  name: "createItem",
  directives: { money: VMoney },
  components: {},
  props: ["object"],
  data: () => ({
    snackErro: false,
    snackSucesso: false,
    snackMessage: "",
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
    selectedPromotion: null,
    selected: [],
    selectedDestaque: null,
    loading: false,
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
      price: 0,
      discountDuration: "",
      discount: "",
      description: "Cerveja de xxx ml, acompanha 15 unidades.",
      image_url: null,
    },
    imageModel: null,
    defaultImage: require("../../../img/default-placeholder.png"),
    image_size: 0,
    image_size_helper: "",
    discount_duration: null,
  }),

  methods: {
    ...mapActions(["addnewItem", "updateNewItem"]),
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
      this.selectedDestaque = e.value;
    },
    select_duration_desconto(e) {
      this.discount_duration = e.value;
    },
    select_value(e) {
      this.selectedPromotion = e.value;
    },
    select_desconto(e) {
      this.descontoTrigger = e.value;
      if (!this.descontoTrigger) {
        this.discount_duration = 0;
        this.newitem.discount = "1.1";
      }
    },
    addItem() {
      if (this.image_size > 20000000) {
        this.snackMessage = "Imagem maior que 20MB";
        this.snackErro = true;
      } else {
        let dataToSend = {
          category_id: this.object._id,
          item: this.newitem,
          promotion: this.selectedPromotion,
          discount: this.descontoTrigger,
          status: false,
          type: "",
          discount_value: this.newitem.discount,
          discount_duration: this.discount_duration,
          destaque: this.selectedDestaque,
        };
        try {
          this.addnewItem(dataToSend).then((response) => {
            if (this.getResponseItem) {
              //console.log(this.getItem)
              let aux = this.getItem;
              this.updateNewItem(aux).then((response) => {
                this.loading = false;
                this.snackSucesso = true;
                this.snackMessage = this.getResponseMsgItem;
              });
            } else {
              this.snackErro = true;
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
        if (this.newitem.item_name.length < 30) {
          let aux = this.newitem.price.replace(/[^0-9,]/g, "");
          aux = aux.replace(/,/g, ".");
          //console.log(aux)
          if (aux > 1) {
            if (this.newitem.description.length < 200) {
              if (this.selectedPromotion !== null) {
                if (this.selectedDestaque !== null) {
                  if (this.descontoTrigger !== null) {
                    if (this.discount_duration !== null) {
                      let aux = this.newitem.discount.replace(/[^0-9,]/g, "");
                      aux = aux.replace(/,/g, ".");
                      if (aux !== "") {
                        let aux = this.newitem.discount.replace(/[^0-9,]/g, "");
                        aux = aux.replace(/,/g, ".");
                        if (aux > 0.5) {
                          this.addItem();
                        } else {
                          this.popError(
                            "Valor do desconto muito baixo. Min: R$ 1"
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
    this.category = this.object;
  },
};
</script>

<style scoped>
@import "./item.module.css";
</style>
