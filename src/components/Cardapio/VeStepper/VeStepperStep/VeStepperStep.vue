<script>
import { VStepperStep } from 'vuetify/lib/components/VStepper'
export default {
  // eslint-disable-next-line
  name: 've-stepper-step',
  extends: VStepperStep,
  methods: {
    genStepContent() {
      const children = []
      if (this.hasError) {
        children.push(this.genIcon(this.errorIcon))
      } else if (this.complete) {
        if (this.editable) {
          children.push(this.genIcon(this.editIcon))
        } else {
          children.push(this.genIcon(this.completeIcon))
        }
      } else if (this.$attrs.icon) {
        // this "else if" branch is added,
        // so the step can display custom
        // Vuetify icons
        children.push(this.genIcon(this.$attrs.icon))
      } else {
        children.push(String(this.step))
      }

      return children
    },
  },
}
</script>
