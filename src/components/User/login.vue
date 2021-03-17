<template>
  <v-app>
    <v-layout align-center justify-center>
      <v-layout column align-center justify-center>
        <v-card pa-5>
          <v-alert type="error" outlined :value="erroForm"
            >Verifique seus dados e tente novamente.</v-alert
          >
          <v-alert type="error" outlined :value="erro"
            >{{this.getMessageLogin}}</v-alert
          >
          <v-form ref="form" @submit.prevent="onSubmit">
            <v-layout column>
              <v-container xs12 md12>
                <v-text-field
                  class="blue--text"
                  v-model="user"
                  label="Email"
                  name="email"
                  prepend-icon="mdi-email"
                  type="text"
                  outlined
                />
              </v-container>
              <!-- CAMPOS SENHA -->
              <v-container xs20 md12>
                <v-text-field
                  class="blue--text"
                  id="senha"
                  v-model="pss"
                  label="Senha"
                  name="senha"
                  prepend-icon="mdi-lock"
                  type="password"
                  outlined
                />
              </v-container>
            </v-layout>
          </v-form>
          <v-card-actions class="green">
            <v-layout justify-center>
              <v-btn
                text
                class="white--text"
                v-show="!loading"
                @click="handleSubmit"
                >Entrar</v-btn
              >
              <v-progress-circular
                v-show="loading"
                indeterminate
                color="primary"
              />
            </v-layout>
          </v-card-actions>
        </v-card>
      </v-layout>
    </v-layout>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data: () => ({
    user: "",
    pss: "",
    remember: false,
    cancelled: false,
    isLoggedIn: false,
    erro: false,
    erroForm: false,
    loading: false,
    validacao: [(v) => v.length > 4 || "Campo inválido"],
  }),
  computed: mapGetters(["getAuth", "getMessageLogin"]),
  methods: {
    ...mapActions(["FazerLogin"]),
    async handleSubmit() {
      if (this.$refs.form.validate()) {
        try {
          this.loading = true;
          let data = {
            user: this.user,
            pss: this.pss,
          };
          this.FazerLogin(data).then((response) => {
            if (this.getAuth) {
                this.$router.push({
                  name: "dashboard",
                  params: {
                    isLoggedIn: !this.isLoggedIn,
                  },
                });
            } else {
              this.erro = true;
              this.loading = false;
            }
          });
        } catch (error) {
          this.loading = false;
          this.erro = true;
          throw error;
        }
      } else {
        this.erroForm = true;
      }
    }
  },
};
</script>


