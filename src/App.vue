<template lang="pug">
#app
  router-view
</template>

<script>
export default {
  mounted () {
    this.$root.setScreenHeight()
  }
}
</script>

<style lang="scss">
  @import './scss/app.scss';
</style>
