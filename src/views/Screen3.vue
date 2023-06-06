<template lang="pug">
section.main-screen.s3(
  :class="{ 'active': $root.state.activeScreen === 3 }",
)
  .container-fluid
    .row
      .col-lg-7.col-md-6.fitscreen.first-half-page(
        :style="fitHeightStyles",
        :class="{ 'active': $root.state.isNavOpened }"
      )
        .s-content
          h2.s-title {{ $t('screen3.title') }}
          h4.sub-title(:data-sub-content="$t('screen3.subHover')")
            span {{ $t('screen3.subTitle') }}
          .desc.my-3
            .row
              .col
                .achievement-list(v-html="$t('screen3.desc')")
            .row
              .col-md-7
                p.mt-4
                  strong.headline.text-white Info
                  a.font-xs(href="mailto:contact@ownego.com") contact@ownego.com
                  span.d-block.mt-3.font-xs.extra-lh
                    | 18th Floor, CLand Tower,
                    br
                    | 156 Xa Dan 2, Nam Dong, Dong Da,
                    br
                    | Hanoi, Vietnam
                    a.location-pin(
                      href="https://goo.gl/maps/QtHbTA9MZ9V3i9Az8",
                      target="_blank",
                    )
                      Pin.location-pin-icon.ml-1
              .col-md-5
                p.mt-4
                  strong.headline.text-white Links
                  a.d-block.mb-2.font-xs(href="https://blog.ownego.com")
                    strong Blog
                  a.d-block.mb-2.font-xs(href="https://blog.ownego.com/collections/all") Careers
                  a.d-block.mb-2.font-xs(href="https://blog.ownego.com/pages/our-values") Our Values
                  a.d-block.mb-2.font-xs(href="https://blog.ownego.com/pages/about-us") More About Us

            .row
              .col-md-6.mt-3
                a.btn.btn-primary-inverse(
                  href="https://blog.ownego.com",
                  target="_blank",
                ) Join Us
      .col-lg-4.offset-lg-0.ml-lg-5.col-md-5.offset-md-1.fitscreen(
        :style="fitHeightStyles"
      )
        .s-form
          h2.s-title {{ $t('screen3.msgTitle') }}
          .desc(v-html="$t('screen3.msgDesc')")
          form#messageForm(
            novalidate,
            @submit.prevent="sendMessage"
          )
            .row
              .form-group.col-md-12
                .input-wrapper
                  input#msgName.input-normal(
                    :class="{ error: error === 'name'}"
                    type="text",
                    name="name",
                    ref="name",
                    placeholder="Your name",
                    v-model="msg.name",
                    maxlength="50",
                  )
                  InputBorder
              .form-group.col-md-12
                .input-wrapper
                  input#msgEmail.input-normal(
                    :class="{ error: error === 'email' || error === 'email-invalid' }"
                    type="email",
                    name="email",
                    ref="email",
                    placeholder="Email",
                    v-model="msg.email",
                    maxlength="50",
                  )
                  InputBorder
              .form-group.col-md-12
                .input-wrapper
                  textarea#msgMessage.input-normal.form-text-area(
                    :class="{ error: error === 'message'}"
                    name="message",
                    ref="message",
                    v-model="msg.message",
                    placeholder="How can we help",
                  )
                  InputBorder
            .row
              .col-md-7.col-lg-8
                small#errorContainer.form-caution(
                  :class="{ 'red': error, 'success': success }"
                )
                  span(v-if="!error")
                    template(v-if="!success") {{ $t('screen3.msgSub') }}
                    template(v-else) {{ $t('screen3.msgSuccess') }}
                  span#errorMes(v-else)
                    template(v-if="error === 'name'")
                      | {{ $t('screen3.errorNameRequired') }}
                    template(v-if="error === 'email'")
                      | {{ $t('screen3.errorEmailRequired') }}
                    template(v-if="error === 'email-invalid'")
                      | {{ $t('screen3.errorEmailInvalid') }}
                    template(v-if="error === 'message'")
                      | {{ $t('screen3.errorMessageRequired') }}
                    template(v-if="error === 'response'")
                      | {{ $t('screen3.errorResponse') }}

              .col-md-5.col-lg-4
                .input-wrapper
                  button#submitbtn.btn.btn-primary.form-submit(
                    type="submit",
                    :class="{ 'sending': isSending }"
                    :disabled="isSending"
                  )
                    span(data-sending="Sending...") Send
                    i.oeicon-fly
                  InputBorder

</template>
<script>
import InputBorder from '../assets/input-border.svg'
import Pin from '../assets/pin.svg'
import ServiceItem from '../components/ServiceItem'

export default {
  components: {
    Pin,
    InputBorder,
    ServiceItem
  },

  data () {
    return {
      msg: {},
      error: '',
      success: false,
      isSending: false,
      services: [
        {
          icon: '<i class="oeicon-paint"></i>',
          title: 'Shopify Expert'
        },
        {
          icon: '<i class="oeicon-wrench"></i>',
          title: '50k+ customers'
        },
        {
          icon: '<i class="oeicon-rocket"></i>',
          title: 'SaaS'
        }
      ]
    }
  },

  computed: {
    fitHeightStyles () {
      return {
        height: this.$root.state.screenHeight + 'px'
      }
    }
  },

  methods: {
    sendMessage () {
      this.isSending = true
      this.error = ''
      this.success = false

      if (this.validateForm()) {
        const formData = Object.keys(this.msg).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(this.msg[key])}`).join('&')

        fetch('https://api.ownego.com/API/validation', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
          },
          body: formData
        })
          .then(response => response.json())
          .then(data => {
            if (data.success) {
              this.success = true
              this.error = ''
              this.msg = {}
            } else {
              this.error = 'response'
            }

            this.isSending = false
          })
      } else {
        this.isSending = false
      }
    },

    validateForm () {
      // Validate name
      if (!this.msg.name) {
        this.error = 'name'
        this.$refs.name.focus()
        return false
      }

      // Validate email
      if (!this.msg.email) {
        this.error = 'email'
        this.$refs.email.focus()
        return false
      }

      if (!this.validateEmail(this.msg.email)) {
        this.error = 'email-invalid'
        this.$refs.email.focus()
        return false
      }

      // Validate message
      if (!this.msg.message) {
        this.error = 'message'
        this.$refs.message.focus()
        return false
      }

      return true
    },

    validateEmail (email) {
      return String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    }
  }
}
</script>
