import '../services/jquery.lettering'
import 'textillate'

const store = {
  state: {
    isNavOpened: false,
    screenHeight: 0,
    activeScreen: 0,
    chainEffect: false,
    screenHashes: [
      'home',
      'products',
      'services'
    ]
  },

  toggleNav () {
    this.state.isNavOpened = !this.state.isNavOpened
  },

  setScreenHeight () {
    this.state.screenHeight = window.innerHeight
  },

  getHashIndex (hash) {
    return this.state.screenHashes.indexOf(hash)
  },

  switchScreen (targetScreen) {
    if (this.state.activeScreen === targetScreen) return

    this.state.activeScreen = targetScreen
    document.body.setAttribute('data-active-screen', targetScreen)

    window.location.hash = `#${this.state.screenHashes[targetScreen - 1]}`

    // Scroll to top
    setTimeout(() => {
      $('body, html').scrollTop(0)
    }, 200)

    // Effects
    if (targetScreen === 1) {
      // Logo effect
      $('#oeLogo').oeSvgDrawing({
        colorCurrent: [255, 255, 255]
      })

      $('.texttl').textillate({
        initialDelay: 500
      })
    } else if (targetScreen === 2) {
      // Founders signature effect
      setTimeout(function () {
        $('#foundersSign').oeSvgDrawing({
          framesTotal: 150,
          colorCurrent: [51, 51, 51],
          colorTarget: [255, 255, 255],
          colorStroke: [255, 255, 255]
        })
      }, 1000)
    }

    if (targetScreen === 3) {
      setTimeout(() => {
        this.state.chainEffect = true
      }, 800)
    } else {
      this.state.chainEffect = false
    }

    this.$ga.event({
      eventCategory: 'layout',
      eventAction: 'Switch to screen' + targetScreen,
      eventLabel: 'Switch to screen' + targetScreen
    })
  }
}

export default store
