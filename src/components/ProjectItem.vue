<template lang="pug">
.punchs.project-item.d-flex.align-items-center.flex-md-row-reverse
  .bounding-box
    a(
      :href="project.url",
      target="_blank",
    )
      img.main-avt(
        :src="project.avatar",
        width="80",
        height="80",
        :alt="project.shortname",
      )
      img.hover-avt(
        :src="project.avatarHover",
        width="80",
        height="80",
        :alt="project.shortname",
      )
  .bounding-info
    h4
      a(
        :href="project.url",
        target="_blank",
      )
        | {{ project.shortname }}
    span(v-html="project.desc")
</template>
<script>
export default {
  props: {
    project: {
      type: Object,
      required: true
    }
  }
}
</script>
