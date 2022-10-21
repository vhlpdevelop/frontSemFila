
<template>
    <section class="py-10 bg-gray-100 py-sm-16 py-lg-24">
        <div class="px-4 mx-auto px-sm-6 px-lg-8">
            <div class=" mx-auto text-center">
                <h2 class="text-md-h3 text-sm-h6 font-weight-bold">Números dizem nossa história</h2>
                <p class="mt-3 text-xl leading-relaxed text-gray-600 mt-md-8 text-body-1" style="color: #616161">Desde o começo, acompanhe abaixo o que conquistamos até agora.</p>
            </div>

            <v-row class="grid grid-cols-1 gap-8 mt-10 text-center lg:mt-24 sm:gap-x-8 md:grid-cols-3">
                <v-col cols="12" md="4" lg="4" xl="4">
                    <h3 class="font-weight-bold ">
                        <span class="text-h2 numberColor"> 1 </span>
                    </h3>
                    <p class="mt-4  font-weight-bold text-xl font-medium text-gray-900">Ano no mercado</p>
                    <p class="text-base mt-n1 text-body-2" style="color: #616161">Criando um caminho de sucesso</p>
                </v-col>

                <v-col cols="12" md="4" lg="4" xl="4">
                    <h3 class="font-weight-bold ">
                        <span class="text-h2 numberColor"> 30 </span>
                    </h3>
                    <p class="mt-4  font-weight-bold text-xl font-medium text-gray-900">Parceiros SemFila</p>
                    <p class="text-base mt-n1 text-body-2" style="color: #616161">E esse número continua crescendo</p>
                </v-col>

                <v-col cols="12" md="4" lg="4" xl="4">
                    <h3 class="font-weight-bold">
                        <span class="text-h2 numberColor"> 3 </span>
                    </h3>
                    <p class="mt-4  font-weight-bold text-xl font-medium text-gray-900">Membros da SemFila Tech</p>
                    <p class="text-base mt-n1 text-body-2" style="color: #616161">Trabalhando para seu sucesso</p>
                </v-col>
            </v-row>
        </div>
    </section>
</template>

<script>
    export default {
        name: 'Numbers',
    }
</script>
<style>
.numberColor{
    background: #CB60B3;
background: linear-gradient(to right, #CB60B3 0%, #C146A1 50%, #A80077 51%, #DB36A4 100%);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
}
</style>