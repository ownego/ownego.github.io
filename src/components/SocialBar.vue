<template lang="pug">
.social-bar
  a.social-icon(
    v-for="(item, index) in socials",
    :key="index",
    :href="item.link",
    :title="item.title",
    target="_blank",
    v-tooltip="item.title",
  )
    i(:class="item.icon")
</template>
<script>
export default {
  data () {
    return {
      socials: [
        {
          link: 'https://www.facebook.com/ownego',
          title: 'Follow us',
          icon: 'oeicon-social-facebook'
        },
        {
          link: 'https://github.com/ownego/ownego.github.io',
          title: 'View sources on Github',
          icon: 'oeicon-github'
        }
      ]
    }
  }
}
</script>
