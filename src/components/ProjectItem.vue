<template lang="pug">
.punchs.project-item
  .bounding-box
    a(
      href="javascript:;",
      data-toggle="modal",
      :data-target="`#${project.modalid}`",
    )
      img.main-avt(
        :src="project.avatar",
        width="100",
        height="100",
        :alt="project.shortname",
      )
      img.hover-avt(
        :src="project.avatarHover",
        width="100",
        height="100",
        :alt="project.shortname",
      )
  .bounding-info
    h4
      a(
        href="javascript:;",
        data-toggle="modal",
        :data-target="`#${project.modalid}`",
      )
        | {{ project.shortname }}
    span {{ project.desc }}
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
