<template lang="pug">
MainLayout
  Screen1
  Screen2(ref="screen2")
  Screen3
  .rectangle.st(
    :class="{'eff-chain': $root.state.chainEffect}",
  )
  .bgs1
</template>

<script>
import MainLayout from './layouts/Main'
import Screen1 from './Screen1'
import Screen2 from './Screen2'
import Screen3 from './Screen3'

export default {
  components: {
    MainLayout,
    Screen1,
    Screen2,
    Screen3
  },

  data () {
    return {
      isSwitchingScreen: false
    }
  },

  mounted () {
    document.addEventListener('keyup', this.keyUpHandler)

    if (window.innerWidth > 1023) {
      $(window).on('mousewheel DOMMouseScroll wheel MozMousePixelScroll', this.scrollHandler)
      window.addEventListener('mousewheel DOMMouseScroll wheel MozMousePixelScroll', this.scrollHandler)
      document.addEventListener('scroll', this.scrollHandler)
    }
  },

  beforeDestroy () {
    document.removeEventListener('keyup', this.keyUpHandler)

    if (window.innerWidth > 1023) {
      window.removeEventListener('mousewheel DOMMouseScroll wheel MozMousePixelScroll', this.scrollHandler)
      document.removeEventListener('scroll', this.scrollHandler)
    }
  },

  methods: {
    keyUpHandler (e) {
      switch (e.key) {
        case 'ArrowLeft':
        case 'ArrowUp':
          this.movePrev()
          break
        case 'ArrowRight':
        case 'ArrowDown':
          this.moveNext()
          break
      }
    },

    scrollHandler (e) {
      if (!this.isSwitchingScreen) {
        this.isSwitchingScreen = true

        if (window.lethargy.check(e) === 1) { // Scroll Up
          this.movePrev()
        } else if (window.lethargy.check(e) === -1) { // Scroll Down
          this.moveNext()
        }

        setTimeout(() => {
          this.isSwitchingScreen = false
        }, 2000)
      }
    },

    moveNext () {
      const activeScreen = this.$root.state.activeScreen
      const {
        activeGroup,
        projectGroups,
        switchGroupNext
      } = this.$refs.screen2

      if (activeScreen === 2 && activeGroup < projectGroups.length - 1) {
        switchGroupNext()
      } else {
        if (activeScreen < 3) {
          this.$root.switchScreen(activeScreen + 1)
        }
      }
    },

    movePrev () {
      const activeScreen = this.$root.state.activeScreen
      const {
        activeGroup,
        switchGroupPrev
      } = this.$refs.screen2

      if (activeScreen === 2 && activeGroup > 0) {
        switchGroupPrev()
      } else {
        if (activeScreen > 1) {
          this.$root.switchScreen(activeScreen - 1)
        }
      }
    }
  }
}
</script>
