<template>
  <div class="d-flex align-center justify-center">
    <div>
      <v-row id="big" class="d-none d-sm-flex" align="center" justify="center">
        <v-col cols="4" class="d-flex align-center justify-center">
          <v-card tile elevation="7" class="pa-2 flex-grow-1" style="overflow-y: hidden; overflow-x: hidden ; height: 100px">
            <v-row>
              <v-col cols="5">
                <v-avatar color="primary" size="72" tile>
                    <img
                    src="https://scontent-gru2-2.xx.fbcdn.net/v/t39.30808-1/295332568_548728433509105_6787476656143271065_n.jpg?stp=dst-jpg_p200x200&_nc_cat=105&ccb=1-7&_nc_sid=c6021c&_nc_ohc=u2HVEmrveqUAX-a3EEj&_nc_ht=scontent-gru2-2.xx&oh=00_AT_m9-Z9a-51dx6c_X4GoVmbmR7d9X-ZaCtCyuw-QqmWIA&oe=63588D5C"
                  />
                </v-avatar>
              </v-col>
              <v-col cols="7" class="mt-4"> <p class="pl-1 pr-1 text-center">
                    <span class="font-weight-bold">Estação Caxara</span> - Bonito MS
                </p></v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-col cols="4" class="d-flex align-center justify-center">
          <v-card tile elevation="7" class="pa-2 flex-grow-1"  style="overflow-y: hidden; overflow-x: hidden ; height: 100px">
            <v-row>
              <v-col cols="5">
                <v-avatar color="primary" size="72" tile>
                    <img
                  src="https://scontent-gru2-2.xx.fbcdn.net/v/t39.30808-6/297395243_590628309141978_4421262426022539959_n.jpg?stp=cp0_dst-jpg_e15_p64x64_q65&_nc_cat=106&ccb=1-7&_nc_sid=85a577&_nc_ohc=gTsdi1MUJMEAX9aMrLT&_nc_ht=scontent-gru2-2.xx&oh=00_AT-EFRqEiHRC1hrPWYMlup_bKpCbeAOEOUR8ubfTRV5QUQ&oe=6357E669"
                  />
                </v-avatar>
              </v-col>
              <v-col cols="7" class="mt-4"> <p class="pl-1 pr-1 text-center">
                <span class="font-weight-bold">Vila Rebuá Gastronomia</span> - Bonito MS
                </p></v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-col cols="4" class="d-flex align-center justify-center">
          <v-card tile elevation="7" class="pa-2 flex-grow-1"  style="overflow-y: hidden; overflow-x: hidden ; height: 100px">
            <v-row>
              <v-col cols="5">
                <v-avatar color="primary" size="72" tile></v-avatar>
              </v-col>
              <v-col cols="7" class="mt-4"> <p class="pl-1 pr-1 text-center">
                    <span class="font-weight-bold">???</span> - Bonito MS
                </p></v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <div>
      <v-row
        id="small"
        class="d-flex d-sm-none"
        align="center"
        justify="center"
      >
        <v-col cols="4" class="d-flex" style="flex-direction: column">
          <v-card tile elevation="7" style="overflow-y: auto; height: 160px">
            <v-row no-gutters>
              <v-col cols="12">
                <v-avatar class="mt-6 mb-2" color="primary" size="60" tile>
                  <img
                    src="https://scontent-gru2-2.xx.fbcdn.net/v/t39.30808-1/295332568_548728433509105_6787476656143271065_n.jpg?stp=dst-jpg_p200x200&_nc_cat=105&ccb=1-7&_nc_sid=c6021c&_nc_ohc=u2HVEmrveqUAX-a3EEj&_nc_ht=scontent-gru2-2.xx&oh=00_AT_m9-Z9a-51dx6c_X4GoVmbmR7d9X-ZaCtCyuw-QqmWIA&oe=63588D5C"
                  />
                </v-avatar>
              </v-col>
              <v-col cols="12" class="mt-1 text-caption">
                <p class="pl-1 pr-1 text-center">
                    <span class="font-weight-bold">Estação Caxara</span> - Bonito MS
                </p></v-col
              >
            </v-row>
          </v-card>
        </v-col>
        <v-col cols="4" class="d-flex" style="flex-direction: column">
          <v-card tile elevation="7" style="overflow-y: auto; height: 160px">
            <v-row no-gutters>
              <v-col cols="12">
                <v-avatar class="mt-6 mb-2" color="primary" size="60" tile>
                  <img
                  src="https://scontent-gru2-2.xx.fbcdn.net/v/t39.30808-6/297395243_590628309141978_4421262426022539959_n.jpg?stp=cp0_dst-jpg_e15_p64x64_q65&_nc_cat=106&ccb=1-7&_nc_sid=85a577&_nc_ohc=gTsdi1MUJMEAX9aMrLT&_nc_ht=scontent-gru2-2.xx&oh=00_AT-EFRqEiHRC1hrPWYMlup_bKpCbeAOEOUR8ubfTRV5QUQ&oe=6357E669"
                  />
                </v-avatar>
              </v-col>
              <v-col cols="12" class="mt-1 text-caption">
                <p class="pl-1 pr-1 text-center flex-grow-1">
                  <span class="font-weight-bold">Vila Rebuá Gastronomia</span> - Bonito MS
                </p></v-col
              >
            </v-row>
          </v-card>
        </v-col>
        <v-col cols="4" class="d-flex" style="flex-direction: column">
          <v-card tile elevation="7" style="overflow-y: auto; height: 160px">
            <v-row no-gutters>
              <v-col cols="12">
                <v-avatar class="mt-6 mb-2" color="primary" size="60" tile>
                  <img
                  />
                </v-avatar>
              </v-col>
              <v-col cols="12" class="mt-1 text-caption">
                <p class="pl-1 pr-1 text-center"><span class="font-weight-bold">???</span> - ???</p></v-col
              >
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>
<script></script>
<style></style>
