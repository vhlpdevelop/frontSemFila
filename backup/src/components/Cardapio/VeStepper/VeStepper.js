import { VStepper } from 'vuetify/lib'
export default {
  // name is in dash-case, as Vuetify uses that
  // we might need this "conformity"
  // eslint-disable-next-line
  name: 've-stepper',
  extends: VStepper,
  methods: {
    register(item) {
      if (
        item.$options.name === 've-stepper-step' ||
        item.$options.name === 'v-stepper-step'
      ) {
        this.steps.push(item)
      } else if (item.$options.name === 'v-stepper-content') {
        item.isVertical = this.vertical
        this.content.push(item)
      }
    },

    unregister(item) {
      if (
        item.$options.name === 've-stepper-step' ||
        item.$options.name === 'v-stepper-step'
      ) {
        this.steps = this.steps.filter(i => i !== item)
      } else if (item.$options.name === 'v-stepper-content') {
        item.isVertical = this.vertical
        this.content = this.content.filter(i => i !== item)
      }
    },
  },
}
