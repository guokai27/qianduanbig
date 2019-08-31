<template>
  <div>
    <div v-show="tab === 1">
      <basic-settings :activeElement="activeElement" />
    </div>
  </div>
</template>

<script>
import BasicSettings from '../../CommonModule/BasicSettings'
export default {
  name: 'BraidPictureStyle',
  components: {
    BasicSettings
  },
  props: ['activeElement', 'tab']
}
</script>
