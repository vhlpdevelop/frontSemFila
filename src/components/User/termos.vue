<template>
  <v-app>
    <div>
      <v-toolbar class="grey white--text">
        <v-layout align-center justify-center>
          <v-toolbar-title>
            <router-link to="/" tag="span" style="cursor: pointer">Lob</router-link>
          </v-toolbar-title>
        </v-layout>
      </v-toolbar>
    </div>

    <section id="hero">
        <v-row no-gutters>
          <v-img
            :min-height="'calc(100vh - ' + $vuetify.application.top + 'px)'"
            src="https://image.freepik.com/vetores-gratis/diagrama-de-circuito-de-tecnologia-azul-com-luzes-de-linha-brilhante_1017-17266.jpg"
          >
            <v-theme-provider dark>
              <v-container fill-height>
                <v-row
                  align="center"
                  class="white--text mx-auto"
                  justify="center"
                >
                  <v-col
                    class="white--text text-center"
                    cols="12"
                    tag="h1"
                  >
                    <span
                      :class="[$vuetify.breakpoint.smAndDown ? 'display-3': 'display-4']"
                      class="font-weight-black"
                    >
                      TERMOS DE SERVIÇO
                    </span>

                  </v-col>

                  <v-btn
                    class="align-self-end"
                    fab
                    outlined
                    @click="$vuetify.goTo('#termos')"
                  >
                    <v-icon class="white--text">mdi-chevron-double-down</v-icon>
                  </v-btn>
                </v-row>
              </v-container>
            </v-theme-provider>
          </v-img>
        </v-row>
      </section>
      <section id="termos">
        <div class="py-12"></div>

        <v-container class="text-center">
          <h2 class="display-2 font-weight-bold mb-3">TERMOS DE SERVIÇO E POLÍTICA DE PRIVACIDADE</h2>

          <v-responsive
            class="mx-auto mb-8"
            width="56"
          >
            <v-divider class="mb-1"></v-divider>

            <v-divider></v-divider>
          </v-responsive>

          <v-responsive
            class="mx-auto title font-weight-light mb-8"
            max-width="1080"
          >
          Lob Counter é um sistema feito para arquitetos desenvolverem seus projetos e atingirem a melhor produção, desempenho e valor no seu trabalho. Através de medições você poderá saber quanto está ganhando por cada projeto de cada tipo, assim valorizando seus projetos e seu tempo. Quanto mais projetos medidos, maior a precisão do seu valor. Se você possui uma empresa ou divide os projetos com outros arquitetos, também é possível fazer essa medição conjunta, assim administrando tudo.
          </v-responsive>

          <div></div>
        </v-container>

        <div class="py-12"></div>
      </section>
  </v-app>
</template>
<script>
export default {};
</script>