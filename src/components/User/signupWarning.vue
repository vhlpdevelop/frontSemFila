<template>
    <v-card class="pa-5">
        <div >
            <v-card-title class="d-flex align-center justify-center">
            {{ object.message }}
        </v-card-title>
        <p class="d-flex align-center justify-center">
            {{ object.subtitle }}
        </p>
        </div>
        
        <v-row class="d-flex align-center justify-center">
            <v-col cols="6"  md="4" xl="4" lg="4"  class="d-flex align-center justify-center">
                <v-btn @click="close()">Cancelar</v-btn>
            </v-col>
            <v-col cols="6" md="4" xl="4" lg="4" class="d-flex align-center justify-center">
                <v-btn outlined color="red" @click="redirect()">Criar conta</v-btn>
            </v-col>
        </v-row>
    </v-card>
</template>
<script>
export default{
    props:["object"], //message, subtitle, action
    methods: {
        close(){
            this.$emit('close', false)
        },
        redirect(){
            this.$emit('close', false)
            this.$emit('redirect')
            
        }
    }
}
</script>