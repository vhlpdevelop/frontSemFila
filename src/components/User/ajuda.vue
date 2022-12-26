<template>
  <v-app>
    
      <section id="ajuda">
        
        <div class="py-6"></div>
            <v-container fluid class="text-center">
                <h2 class="font-weight-bold mb-5">Estamos aqui para ajudar</h2>
                <v-row>
                    <v-col cols="4"  v-for="(item, id) in cards" 
                        :key="id"
                        :cols="12"
                        sm="6"
                        md="4"
                        lg="4"
                        xl="3"                        
                        class="py-5 flex d-flex flex-column">
                        <v-card elevation-12 rounded :color="item.color" class="flex d-flex flex-column" @click="openHelper(item)">
                            <v-container class="d-column">
                                <v-icon color="white" large>{{item.icon}}</v-icon>
                                <div class="text-center white--text">{{item.title}}</div>
                                <v-card-text class="text-center white--text">{{item.description}}</v-card-text>
                            </v-container>
                            
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
      </section>
  </v-app>
</template>
<script>
export default {
  name: "ajuda",
  data: () => ({
    cards: [
        {color:'pink accent-2', url:"ajuda-MeuNegocio", icon:'mdi-cube-outline',title: 'Quero incluir meu negócio', description: 'Como registrar uma conta e iniciar essa lindeza sem fila'},
        {color:'pink accent-2', url:"ajuda-ComoComeçar", icon:'mdi-led-on',title: 'Como começar?', description: 'Se existe dúvida de como usar a SemFila, esta seção é pra você'},
        {color:'primary',url:"ajuda-Pagamento", icon:'mdi-cash-fast',title: 'Pagamento', description: 'Nosso método de pagamento e toda informação relacionada a dinheiro.'},
        {color:'pink accent-2',url:"ajuda-NossoProduto", icon:'mdi-laptop',title: 'Nosso Produto ', description: 'Toda a informação de como nosso produto funciona'},
        {color:'primary',url:"ajuda-Afiliados", icon:'mdi-rocket-launch-outline',title: 'Afiliados', description: 'Aprenda como afiliar conosco.'},
        {color:'red',url:"ajuda-Problema", icon:'mdi-alert-box-outline',title: 'Tive um Problema', description: 'Se você não encontrou seu problema nas nossas seções de ajuda, use este'},
    ]
  }),
  methods: {
    openHelper(item){
        //console.log(item);
        this.$router.push({
        name: "helperComponent",
        params: {
          id:item.url
        },
      });
    }
  },
};
</script>