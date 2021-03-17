import Vue from 'vue'
import Vuetify from 'vuetify/lib'

import pt from 'vuetify/es5/locale/pt'

Vue.use(Vuetify)

Vue.component('my-component', {
  methods: {
    changeLocale () {
      this.$vuetify.lang.current = 'pt'
    }
  }
})

export default new Vuetify({
  icons: {
    iconfont: 'mdi'
  },
  lang: {
    locales: { pt },
    current: 'pt'
  }
})
