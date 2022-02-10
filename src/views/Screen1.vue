<template lang="pug">
section.main-screen.s1(
  :class="{ 'active': $root.state.activeScreen === 1 }"
)
  .container-fluid
    .row
      .offset-md-2.col-md-5.first-half-page(
        :class="{ 'active': $root.state.isNavOpened }"
      )
        .fitscreen(:style="fitHeightStyles")
          .logo.d-flex.align-items-center
            .logo-container.svg-drawing
              Logo#oeLogo
            .logo-text.pull-left
              h1.texttl(
                data-in-effect="flipInY",
                data-in-delayscale="2",
                data-in-shuffle="true",
              )
                | ownego
              span.slogan.texttl(
                data-in-effect="flipInY",
                data-in-shuffle="true",
              )
                | {{ $t('screen1.slogan') }}
      .col-md-5.fitscreen(
        :style="fitHeightStyles"
      )
        .s-content
          h2.s-title {{ $t('screen1.title') }}
          h4.sub-title(
            :data-sub-content="$t('screen1.subHover')"
          )
            span {{ $t('screen1.subTitle') }}
          .desc(v-html="$t('screen1.desc')")
          .d-flex.d-md-none.justify-content-end
            button.link-only.next(
              type="button",
              @click="$root.switchScreen(2)",
            )
              span Next
              i.oeicon-arrow-right

</template>
<script>
import Logo from '../assets/logo.svg'

export default {
  components: {
    Logo
  },

  computed: {
    fitHeightStyles () {
      return {
        height: this.$root.state.screenHeight + 'px'
      }
    }
  }
}
</script>
