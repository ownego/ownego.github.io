<template lang="pug">
#loader.loading(v-if="loading")
  .load-content
    vue-easy-pie-chart#loadingCircle.chart(
      :class="{ 'done': !loading }"
      :percent="pieStep",
      bar-color="#5c5c5c",
      track-color="#ebebeb",
      scale-color="#fff",
      line-cap="square",
      :size="100",
      :animate="100",
    )
      span#startBtn(data-finish='Cool!') {{ percentLabel }}%
    .load-hint.d-none.d-md-block
      p.near
        span.key-btn
          i.oeicon-key-up
      p.pb
        span.key-btn
          i.oeicon-key-left
        span.key-btn
          i.oeicon-key-down
        span.key-btn
          i.oeicon-key-right
      p(v-html="$t('loading.desktop')")
    .load-hint.d-md-none(v-html="$t('loading.mobile')")
</template>

<script>
import VueEasyPieChart from 'vue-easy-pie-chart'
import WebFontLoader from 'webfontloader'

export default {
  components: {
    VueEasyPieChart
  },

  props: {
    imageLoaded: {
      type: Number,
      default: 0
    },
    imageCount: {
      type: Number,
      default: 0
    },
    loading: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      pieStep: 0,
      checkpoint: 0,
      percentLabel: 0,
      loadingSteps: [],
      fontLoaded: 0
    }
  },

  computed: {
    imagePercentValue () {
      return Math.floor(60 / this.imageCount) || 60
    }
  },

  watch: {
    imageLoaded (newVal) {
      const imageLoadedTotal = newVal * this.imagePercentValue
      this.pushValue(this.imagePercentValue)

      if (newVal === this.imageCount) {
        this.pushValue(60 - imageLoadedTotal)
        this.fontLoader()
      }
    }
  },

  mounted () {
    if (this.imageCount === 0) {
      this.pushValue(60)
      this.fontLoader()
    }

    // First time updating, trigger the clock.
    this.updateValue()
  },

  methods: {
    fontLoader () {
      WebFontLoader.load({
        google: {
          families: ['Raleway:700:latin', 'Lato:400,400italic,700,300:latin']
        },
        active: () => {
          const val = 40 - this.fontLoaded
          this.pushValue(val)
        },
        fontactive: (family, fvd) => {
          var rand = Math.floor((Math.random() * 8) + 1)
          this.fontLoaded += rand
          this.pushValue(rand)
        }
      })
    },

    numberIncreasedAnimate (target) {
      const timer = setInterval(() => {
        if (this.percentLabel < target) {
          this.percentLabel += 1
        } else {
          clearInterval(timer)
        }
      }, 100 / (target - this.percentLabel))
    },

    pushValue (value) {
      this.checkpoint += value
      this.loadingSteps.push(this.checkpoint)
    },

    updateValue () {
      // Animations take much time to completed.
      //      these lines were used to make sure the pie animation runs smoothly
      const timer = setInterval(() => {
        if (this.loadingSteps.length) {
          this.pieStep = this.loadingSteps[0]
          this.loadingSteps.shift()
          this.numberIncreasedAnimate(this.pieStep)
          return
        }

        // if everything loaded
        //      (100%)
        if (this.pieStep >= 100) {
          clearInterval(timer)
          this.finish()
        }
      }, 200)
    },

    finish () {
      setTimeout(() => {
        this.$emit('finished')
      }, 1000)

      this.$ga.event({
        eventCategory: 'layout',
        eventAction: 'Start button',
        eventLabel: 'Start button'
      })
    }
  }
}
</script>
