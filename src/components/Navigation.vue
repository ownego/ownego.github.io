<template lang="pug">
.site-nav-wrapper
  .site-nav
    .nav-items-wrapper
      a.nav-items(
        v-for="nav, index in navigator",
        :key="index",
        :href="nav.href ? nav.href : '#'",
        :target="nav.href ? '_blank' : ''",
        @click="!nav.href ? switchScreen($event, nav.screen) : undefined",
      )
        span
          | {{ nav.title }}
          i.oeicon-arrow-right
        span.nav-sub-text {{ nav.subTitle }}
</template>
<script>
export default {
  data () {
    return {
      navigator: [
        {
          title: 'Home',
          subTitle: 'Who we are',
          screen: 1
        },
        {
          title: 'Projects',
          subTitle: 'Read our story',
          screen: 2
        },
        {
          title: 'About Us',
          subTitle: 'To know us better',
          href: 'https://blog.ownego.com'
        },
        {
          title: 'Get in Touch',
          subTitle: 'Let\'s talk business!',
          screen: 3
        }
      ]
    }
  },

  methods: {
    switchScreen (e, targetScreen) {
      e.preventDefault()
      this.$root.switchScreen(targetScreen)
    }
  }
}
</script>
