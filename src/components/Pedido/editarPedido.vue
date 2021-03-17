<template>
  <v-container fluid class="pa-5">
    <v-row no-gutters justify="center">
      <v-col cols="12" md="6">
        <v-card>
          <v-card>
            <v-card-title>Informações dos produtos</v-card-title>
            <v-card-subtitle
              >Produto pedido em
              {{ new Date(object.createdAt).toLocaleString() }}</v-card-subtitle
            >
            <v-row class="pa-5">
              <div v-for="(object, y) in object.items" :key="y">
                <v-col cols="12" md="12">
                  <v-avatar tile class="elevation-10 mb-12" size="128">
                    <v-img :src="object.picture_url"></v-img>
                  </v-avatar>
                </v-col>
                <v-col cols="12" md="12">
                  <div class="grey--text">Produto</div>
                  <v-text-field
                    v-model="object.title"
                    outlined
                    single-line
                    type="text"
                    dense
                  />
                </v-col>
                <v-col cols="12" md="12">
                  <div class="grey--text">Quantidade</div>
                  <v-text-field
                    v-model="object.quantity"
                    outlined
                    single-line
                    type="text"
                    dense
                  />
                </v-col>
                <v-col cols="12" md="12">
                  <div class="grey--text">Valor</div>
                  <v-text-field
                    v-model="object.unit_price"
                    outlined
                    single-line
                    type="text"
                    dense
                  />
                </v-col>
                <v-col cols="12" md="12">
                  <div class="grey--text">Tamanho</div>
                  <v-text-field
                    v-model="object.category_id"
                    outlined
                    single-line
                    type="text"
                    dense
                  />
                </v-col>
                <v-spacer></v-spacer>
              </div>
            </v-row>
          </v-card>
        </v-card>
      </v-col>
      <v-col
        class="pa-3"
        :cols="12"
        md="4"
        sm="12"
        style="background-color: lightgray"
      >
        <p class="headline">Dados Essenciais</p>
        <v-simple-table>
          <template v-slot:default>
            <tbody>
              <tr>
                <td class="pl-2 pr-5">
                  <sub>Enviado</sub>
                  <v-text-field
                    v-model="object.envio"
                    outlined
                    single-line
                    type="text"
                    label="Envio S/N"
                    dense
                  />
                </td>
                <td class="pl-2 pr-5">
                  <sub>id rastreador</sub>
                  <v-text-field
                    v-model="object.id_rastreamento"
                    outlined
                    single-line
                    type="text"
                    label="id rastreador"
                    dense
                  />
                </td>
                <td class="pl-2 pr-5">
                  <sub>Prefence id</sub>
                  <v-text-field
                    v-model="object.preference_id"
                    outlined
                    single-line
                    type="text"
                    dense
                    label="Prefence id"
                  />
                </td>
              </tr>
              <tr>
                <td class="pl-2 pr-5">
                  <sub>Frete</sub>
                  <v-text-field
                    v-model="object.frete"
                    outlined
                    single-line
                    type="text"
                    label="Frete"
                    dense
                  />
                </td>
                <td class="pl-2 pr-5">
                  <sub>Order id:</sub>
                  <v-text-field
                    v-model="object.order_id"
                    outlined
                    single-line
                    type="text"
                    label="order_id"
                    dense
                  />
                </td>
                <td></td>
              </tr>
              <tr>
                <td class="pl-2 pr-5">
                  <sub>id Pagamento:</sub>
                  <v-text-field
                    v-model="object.payment_id"
                    outlined
                    single-line
                    type="text"
                    label="payment_id"
                    dense
                  />
                </td>
                <td></td>
                <td class="">
                  <sub>Endereço</sub>
                  <p>
                    <v-text-field
                      v-model="object.endereco.rua"
                      outlined
                      single-line
                      type="text"
                      label="Rua"
                      dense
                    />
                    <sub>Cidade</sub>
                    <v-text-field
                      v-model="object.endereco.cidade"
                      outlined
                      single-line
                      type="text"
                      label="cidade"
                      dense
                    />
                    <sub>Estado</sub>
                    <v-text-field
                      v-model="object.endereco.estado"
                      outlined
                      single-line
                      type="text"
                      label="estado"
                      dense
                    />
                    <sub>Numero</sub>
                    <v-text-field
                      v-model="object.endereco.num"
                      outlined
                      single-line
                      type="text"
                      label="num"
                      dense
                    />
                    <sub>Complemento</sub>
                    <v-text-field
                      v-model="object.endereco.complemento"
                      outlined
                      single-line
                      type="text"
                      label="complemento"
                      dense
                    />
                    <sub>CEP</sub>
                    <v-text-field
                      v-model="object.endereco.cep"
                      outlined
                      single-line
                      type="text"
                      label="cep"
                      dense
                    />
                  </p>
                </td>
                <td></td>
              </tr>
              <tr>
                <td class="pl-2 pr-5">
                  Sub Total: R$<b>{{ subTotal }}</b>
                </td>
                <td class="pl-2 pr-5">
                  Total: R$<b class="pr-5">{{ total }}</b> Qtd items:
                  <b>{{ object.items.length }}</b>
                </td>
                <td class="pl-2">
                  <v-btn @click="save"> Salvar </v-btn>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>
    <v-snackbar v-model="snackSucesso" color="success">
      <v-layout justify-space-around align-center>Pedido alterado</v-layout>
    </v-snackbar>
    <v-snackbar v-model="snackErro" color="error">
      <v-layout justify-space-around align-center>Erro ao Editar!</v-layout>
    </v-snackbar>
  </v-container>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["object"],
  data: () => ({
    objects: "",
    total: 0,
    subTotal: 0,
        snackErro: false,
    snackSucesso: false,
    timeout: 5000,
  }),

  methods: {
    ...mapActions(["updatePedido"]),
    save() {
      if (this.object.envio === "true") this.object.envio = true;
      if (this.object.envio === "false") this.object.envio = false;
      console.log("ola")
      this.updatePedido(JSON.parse(JSON.stringify(this.object))).then( () => {
          if(this.getResponsePedido){
                this.snackErro=false
                this.snackSucesso = true
            }else{
              this.snackSucesso = false
              this.snackErro=true
            }
      })
    },
  },
  computed: mapGetters(["getResponsePedido"]),
  created() {
    console.log(this.object);
    if (this.object !== undefined) {
      for (let i = 0; i < this.object.items.length; i++) {
        this.subTotal += parseFloat(this.object.items[i].unit_price);
      }
      this.total = this.subTotal + parseFloat(this.object.frete);
    }
  },
};
</script>
