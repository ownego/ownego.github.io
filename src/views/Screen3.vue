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
        .heading-wrapper
          h2.s-title {{ $t('screen3.title') }}
          h4.sub-title(:data-sub-content="$t('screen3.subHover')")
            span {{ $t('screen3.subTitle') }}
        .punchs-wrapper
          ServiceItem(
            v-for="(service, index) in services",
            :key="index",
            :service="service"
          )
      .col-lg-5.offset-lg-0.col-md-5.offset-md-1.fitscreen(
        :style="fitHeightStyles"
      )
        .s-content
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
import ServiceItem from '../components/ServiceItem'

export default {
  components: {
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
          title: 'Web Design',
          modalid: 'modalServices'
        },
        {
          icon: '<i class="oeicon-wrench"></i>',
          title: 'Front-end Development',
          modalid: 'modalServices'
        },
        {
          icon: '<i class="oeicon-rocket"></i>',
          title: 'Web Services',
          modalid: 'modalServices'
        },
        {
          icon: '<i class="oeicon-devices"></i>',
          title: 'Mobile Applications',
          modalid: 'modalServices'
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

  mounted () {
    document.querySelectorAll('.input-normal').forEach(input => {
      input.addEventListener('keyup', () => {
        return false
      })
    })
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
