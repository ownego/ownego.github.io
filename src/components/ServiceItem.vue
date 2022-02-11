<template lang="pug">
.punchs
  .bounding-box.box-border
    a(
      href="javascript:;",
      v-html="service.icon"
    )
  .bounding-info
    h4
      a(href="javascript:;") {{ service.title }}

</template>
<script>
export default {
  props: {
    service: {
      type: Object,
      required: true
    }
  }
}
</script>
