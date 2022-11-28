import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import './changes.sass'
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
  },
  theme: {
    themes: {
      light: {
        primary: '#F24236',
        secondary: '#FFD800',
        anchor: '#100C08',
      },
    },
  }
})
