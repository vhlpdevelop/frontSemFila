<template>
    
    <div class="d-flex align-center justify-center">
        
            <v-card  v-if="loading" class="d-flex align-center justify-center overflow-hidden pa-12">
                <v-progress-circular
      :size="120"
      color="primary"
      indeterminate
    ></v-progress-circular>
            </v-card>
            
      
        <v-card v-if="!loading">
            <v-container fluid fill-height ma-0 pa-0 class="overflow-hidden">
                <v-card-title class="text-h5 " style="word-break: break-word">
          Gostaria de solicitar o reembolso deste QrCode?
        </v-card-title>
        <v-card-text>
            O valor será reembolsado para a conta que efetuou o pagamento.
            <ul class="text-caption mt-2 text-justify">
                <li class="text-justify">
                    O valor será reembolsado totalmente.
                </li>
                <li class="mt-1 text-justify">
                    Somente quando um QrCode expirar a solicitação de reembolso será liberada.
                </li>
                <li class="mt-1 text-justify">
                    Em caso de impossibilidade de reembolso pela conta pagante será possível pedir reembolso enviando um Email de suporte para SemFila Tech.
                </li>
            </ul>
            
            <p class="mt-2 text-center">
                Poderá solicitar o reembolso até
                <p class="text-center mt-n3">
                    {{
                        AssimilateTime(
                        object.createdAt
                        )
                    }}
                </p>
                <p class="text-caption">Art. 49 - O consumidor pode desistir da compra, no prazo de 7 dias. </p>
            </p>
            <p class="text-center mt-5 red--text">Valor estornado: R${{ (object.item.price * object.quantity).toFixed(2)}}</p>
        </v-card-text>
        <v-card-actions class="mt-n2">
          <v-btn
            color="yellow darken-3"
            text
            
            @click="closePopUp()"
          >
            Cancelar
          </v-btn>
          <v-btn
            color="red darken-1"
            text
            
            @click="startWithDraw()"
          >
            Pedir o reembolso
          </v-btn>
        </v-card-actions>
            </v-container>
        
      </v-card>
    </div>
       
   
    
  
   
</template>
<script>
//:disabled="ready"
import { mapActions, mapGetters } from "vuex";
import moment from "moment";

export default {
  name: "QrCodeWithDraw",

  props: ["object", "index", "close", "popUp"],
  data: () => ({
    dialog:false,
    ready: true,
    duration: "",
    loading:false,

  }),
  

  methods: {
    ...mapActions([
        "RWithDraw"
    ]),
    startWithDraw(){
        this.loading=true;
        this.RWithDraw(this.object).then( () => {
            console.log("Aqui")
            this.$emit("withDrawReq") 
        })
    },  
    closePopUp(){
      
        this.$emit("closeComponent")        
    },
    unlockWithDraw(time){
        let today = new Date(Date.now())
        if(time > today){
            this.ready = false;
        }    
    },
    AssimilateTime(createdAt) {
        const d = new Date(createdAt);
       
        var seconds = d.getTime() / 1000;
        var expire = seconds + ((7 * 24) * 3600);
        var date_expire = new Date(expire * 1000);
        moment.locale("pt-br");
        this.unlockWithDraw(date_expire)
        let data_show = moment(date_expire).format("lll");
        return data_show;
    },
  },
  computed: {
    ...mapGetters([
      "getQrcodes",
      "getRespostaUser",
      "getMessageUser",
    ]),

  },

  created() {
    
   
    
  },
};
</script>