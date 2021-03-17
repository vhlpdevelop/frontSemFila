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
                  {{ object.title }}
                </v-col>
                <v-col cols="12" md="12">
                  <div class="grey--text">Quantidade</div>
                  {{ object.quantity }}
                </v-col>
                <v-col cols="12" md="12">
                  <div class="grey--text">Valor</div>
                  R${{ object.unit_price }}
                </v-col>
                <v-col cols="12" md="12">
                  <div class="grey--text">Tamanho</div>
                  {{ object.category_id }}
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
                    <td class="pl-2 pr-5">Envio do produto
                        <div v-if="object.envio">
                            <v-icon small color="green">mdi-alpha-e-circle-outline</v-icon>
                            <b>Codigo: {{object.id_rastreamento}}</b>
                        </div>
                        <div v-else>
                            <v-icon small color="red">mdi-alpha-e-circle-outline</v-icon>
                        </div>
                    </td>
                    <td class="pl-2 pr-5">
                        Preference id: {{object.preference_id}}
                    </td>
                  </tr>
                  <tr>
                      <td class="pl-2 pr-5">Valor do Frete: R${{object.frete}}</td>
                      <td class="pl-2 pr-5">Order id: {{object.order_id}}</td>
                  </tr>
                  <tr>
                      <td class="pl-2 pr-5">Id Pagamento: {{object.payment_id}}</td>
                      <td class="pl-2 pr-5"><b>Endereço </b>
                      <p>
                          <sub>{{object.endereco.rua}}</sub>
                          <sub> {{object.endereco.cidade}}</sub>
                          <sub> {{object.endereco.estado}}</sub>
                          <sub> {{object.endereco.num}}</sub>
                          <sub> Complemento: {{object.endereco.complemento}}</sub>
                          <sub> Cep: {{object.endereco.cep}}</sub>
                      </p>
                      </td>
                  </tr>
                  <tr>
                     <td class="pl-2 pr-5">Sub Total: R$<b>{{subTotal}}</b></td>
                     <td class="pl-2 pr-5">Total: R$<b class="pr-5">{{total}}</b> Qtd items: <b>{{object.items.length}}</b></td>
                  </tr>
              </tbody>
            </template>
        </v-simple-table>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  props: ["object"],
  data: () => ({
    objects: "",
    total: 0,
    subTotal: 0,
  }),

  methods: {},
  created() {
    console.log(this.object);
    if(this.object !== undefined){
        for(let i=0; i< this.object.items.length; i++){
            this.subTotal += parseFloat(this.object.items[i].unit_price)
        }
        this.total = this.subTotal + parseFloat(this.object.frete)
    }
  },
};
</script>
