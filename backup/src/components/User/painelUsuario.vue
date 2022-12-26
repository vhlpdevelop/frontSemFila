<template>
  <v-container>
    <v-flex>
      <v-toolbar class="my-5 cyan darken-1 white--text">
        <v-btn icon @click="voltar()" class="white--text">
          <v-icon>arrow_back</v-icon>
        </v-btn>
        <v-toolbar-title class="layout row justify-center"
          >Painel de Usuários</v-toolbar-title
        >
        <template>
          <v-btn text @click="convidarNovoUsuario()" class="white--text">
            <v-icon dark>mdi-plus</v-icon>NOVO USUÁRIO
          </v-btn>
        </template>
      </v-toolbar>
    </v-flex>
    <v-card class="pa-5">
      <v-row class="pa-4" justify="space-between">
        <v-col cols="5">
          <v-treeview
            :active.sync="active"
            :items="items"
            :load-children="fetchUsers"
            :open.sync="open"
            activatable
            color="warning"
            open-on-click
            transition
          >
            <template v-slot:prepend="{ item }">
              <v-icon v-if="!item.children"> mdi-account </v-icon>
            </template>
          </v-treeview>
        </v-col>

        <v-divider vertical></v-divider>

        <v-col class="d-flex text-center">
          <v-scroll-y-transition mode="out-in">
            <div
              v-if="!selected"
              class="title grey--text text--lighten-1 font-weight-light"
              style="align-self: center"
            >
              Selecione um usuário
            </div>

            <v-card
              v-else
              :key="selected.id"
              class="pt-6 mx-auto"
              flat
              max-width="400"
            >
              <v-card-actions>
                <v-layout align-end justify-end>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        color="primary"
                        dark
                        v-bind="attrs"
                        v-on="on"
                        icon
                        @click="EditarUser()"
                      >
                        <v-icon dark>mdi-account-edit</v-icon>
                      </v-btn>
                    </template>
                    <span>Editar Usuário</span>
                  </v-tooltip>
                </v-layout>
              </v-card-actions>
              <v-card-text>
                <v-avatar v-if="avatar" size="88">
                  <v-img
                    :src="`https://avataaars.io/${avatar}`"
                    class="mb-6"
                  ></v-img>
                </v-avatar>
                <h3 class="headline mb-2">
                  {{ selected.email }}
                </h3>
                <div class="blue--text mb-2">
                  {{ selected.name }}
                </div>
              </v-card-text>
              <v-divider></v-divider>
              <v-row class="text-left" tag="v-card-text">
                <v-col class="text-right mr-4 mb-2" tag="strong" cols="5">
                  Cargo:
                </v-col>
                <v-col>{{ selected.cargo }}</v-col>
                <v-col class="text-right mr-4 mb-2" tag="strong" cols="5">
                  Perfil:
                </v-col>
                <v-col>
                  {{ selected.profile }}
                </v-col>
                <v-col class="text-right mr-4 mb-2" tag="strong" cols="5">
                  Telefone:
                </v-col>
                <v-col>{{ selected.telefone }}</v-col>
              </v-row>
            </v-card>
          </v-scroll-y-transition>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>



<script>
import { mapState, mapActions, mapGetters } from "vuex";
import axios from "axios";
import removerUsuario from "../User/removerUsuario";
const avatars = [
  "?accessoriesType=Blank&avatarStyle=Circle&clotheColor=PastelGreen&clotheType=ShirtScoopNeck&eyeType=Wink&eyebrowType=UnibrowNatural&facialHairColor=Black&facialHairType=MoustacheMagnum&hairColor=Platinum&mouthType=Concerned&skinColor=Tanned&topType=Turban",
  "?accessoriesType=Sunglasses&avatarStyle=Circle&clotheColor=Gray02&clotheType=ShirtScoopNeck&eyeType=EyeRoll&eyebrowType=RaisedExcited&facialHairColor=Red&facialHairType=BeardMagestic&hairColor=Red&hatColor=White&mouthType=Twinkle&skinColor=DarkBrown&topType=LongHairBun",
  "?accessoriesType=Prescription02&avatarStyle=Circle&clotheColor=Black&clotheType=ShirtVNeck&eyeType=Surprised&eyebrowType=Angry&facialHairColor=Blonde&facialHairType=Blank&hairColor=Blonde&hatColor=PastelOrange&mouthType=Smile&skinColor=Black&topType=LongHairNotTooLong",
  "?accessoriesType=Round&avatarStyle=Circle&clotheColor=PastelOrange&clotheType=Overall&eyeType=Close&eyebrowType=AngryNatural&facialHairColor=Blonde&facialHairType=Blank&graphicType=Pizza&hairColor=Black&hatColor=PastelBlue&mouthType=Serious&skinColor=Light&topType=LongHairBigHair",
  "?accessoriesType=Kurt&avatarStyle=Circle&clotheColor=Gray01&clotheType=BlazerShirt&eyeType=Surprised&eyebrowType=Default&facialHairColor=Red&facialHairType=Blank&graphicType=Selena&hairColor=Red&hatColor=Blue02&mouthType=Twinkle&skinColor=Pale&topType=LongHairCurly",
];
const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
export default {
  components: {
    removerUsuario,
  },
  data: () => ({
    snackErro: false,
    snackSucesso: false,
    timeout: 5000,
    dialog: false,
    dialogRemove: false,
    objeto: {
      nome: {
        type: String,
      },
    },
    dialog: false,
    active: [],
    avatar: null,
    open: [],
    users: [],
  }),

  methods: {
    ...mapActions(["searchUsers", "deleteUser", "editUser"]),
    EditarUser() {},
    OpenPainel() {},
    actionRemoveUser() {},
    convidarNovoUsuario() {
      this.$router.push({
        name: "Convidar Usuario",
      });
    },
    async fetchUsers(item) {
      await pause(1500);
      return await axios
        .get("http://localhost:3000/empresa/" + "getUsers")
        .then(function (response) {
          if (response.data.ok) {
            //console.log(response.data)
            item.children.push(...response.data.object);
          }
        })
        .catch((err) => console.warn(err));
      /*
      return fetch("https://jsonplaceholder.typicode.com/users")
        .then((res) => res.json())
        .then((json) => item.children.push(...json))
        .catch((err) => console.warn(err));
      */
    },

    randomAvatar() {
      this.avatar = avatars[Math.floor(Math.random() * avatars.length)];
    },
  },
  computed: mapGetters([
    "getEmpresaUsers",
    "getRespostaEmpresa",
    "getMessageEmpresa",
  ]),
  computed: {
    items() {
      //console.log(this.users)
      return [
        {
          name: "Usuários",
          children: this.users,
        },
      ];
    },
    selected() {
      if (!this.active.length) return undefined;
      const id = this.active[0];
      return this.users.find((user) => user.id === id);
    },
  },
  watch: {
    selected: "randomAvatar",
  },
};
</script>
