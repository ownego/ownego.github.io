<template lang="pug">
.main-wrapper(
  v-images-loaded:on.progress="imageProgress"
  v-images-loaded:on.always="imageAlways"
)
  main
    slot

  //- Navigation trigger button
  button#btnNav.btn-nav(
    @click.stop="toggleNav",
    aria-label='Toggle Navigation',
  )
    span.lines-button.arrow.arrow-left(
      :class="{ close: $root.state.isNavOpened }"
    )
      span.lines

  Navigation(:class="{ 'active': $root.state.isNavOpened }")
  SocialBar
  Copyright
  Loader(
    v-if="triggerLoading",
    :loading="loading",
    :img-count="imageCount",
    :img-loaded="imageLoaded",
    @finished="loadingFinished"
  )
</template>

<script>
import imagesLoaded from 'vue-images-loaded'
import Navigation from '../../components/Navigation'
import SocialBar from '../../components/SocialBar'
import Copyright from '../../components/Copyright'
import Loader from '../../components/Loader'
import Config from '../../config'

export default {
  components: {
    Navigation,
    SocialBar,
    Copyright,
    Loader
  },

  directives: {
    imagesLoaded
  },

  data () {
    return {
      loading: true,
      imageLoaded: 0,
      imageCount: 0
    }
  },

  mounted () {
    // Check loading
    const lastVer = localStorage.getItem('oe-last-version')
    if (!lastVer || lastVer !== Config.version) {
      this.triggerLoading = true

      // Not loading next time
      localStorage.setItem('oe-last-version', Config.version)
    } else {
      this.loadingFinished()
    }

    // Image lazy
    this.imageCount = document.querySelectorAll('img[src]').length

    // Toggle Nav
    document.body.addEventListener('click', (e) => {
      if (this.$root.state.isNavOpened) {
        this.toggleNav()
      }
    })
  },

  methods: {
    imageProgress () {
      this.imageLoaded += 1
    },

    imageAlways () {
      this.imageLoaded = this.imageCount
    },

    loadingFinished () {
      // Quick link to screen via hash on url
      const hash = window.location.hash.replace('#', '')
      const hashIndex = this.$root.getHashIndex(hash)
      const targetScreen = hashIndex < 0 ? 1 : hashIndex + 1

      this.$root.switchScreen(targetScreen)

      this.loading = false
    },

    toggleNav () {
      this.$root.toggleNav()
    }
  }
}
</script>
