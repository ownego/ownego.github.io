<template lang="pug">
section.main-screen.s2(
  :class="{ 'active': $root.state.activeScreen === 2 }",
)
  .container-fluid
    .row
      .col-lg-5.col-md-6.fitscreen.order-md-2(:style="fitHeightStyles")
        .s-content
          h2.s-title {{ $t('screen2.title') }}
          h4.sub-title(
            :data-sub-content="$t('screen2.subHover')",
          )
            span {{ $t('screen2.subTitle') }}
          .desc
            div(v-html="$t('screen2.desc')")
            .svg-drawing.team-signature
              FoundersSignature#foundersSign
      .col-lg-7.col-md-6.fitscreen.first-half-page.order-md-1(
        :style="fitHeightStyles",
        :class="{ 'active': $root.state.isNavOpened }",
      )
        h3.s-title.d-md-none {{ $t('screen2.productTitle') }}
        .punchs-wrapper
          .punchs-group(
            v-for="group, groupIndex in projectGroups",
            :key="groupIndex",
            :class="{ 'active': groupIndex === activeGroup }",
          )
            .punchs-group-title
              h4.s-title.d-none.d-md-block {{ $t('screen2.productTitle') }}
            ProjectItem(
              v-for="project, index in group",
              :key="index",
              :project="project",
            )
            .desc.prev-works.text-md-right
              span.d-block {{ $t('screen2.prevWorks') }}
              a(
                href="https://ownego.com/portfolio.pdf",
                target="_blank"
              )
                | We keep 'em here
                i.oeicon-arrow-right
          #punchsControl.punchs-control
            a.punchs-dot(
              v-for="dot, index in projectGroups.length > 1",
              href="javascript:;",
              @click.prevent="switchGroup(index)",
              :class="{ 'active': activeGroup === index }",
            ) &nbsp;

        .d-flex.d-md-none.justify-content-between
          button.link-only.back(
            type="button",
            @click="$root.switchScreen(1)",
          )
            i.oeicon-arrow-left
            span Back
          button.link-only.next(
            type="button",
            @click="$root.switchScreen(3)",
          )
            span Next
            i.oeicon-arrow-right
</template>
<script>
import ProjectItem from '../components/ProjectItem'
import FoundersSignature from '../assets/founders-signature.svg'

export default {
  components: {
    FoundersSignature,
    ProjectItem
  },

  data () {
    return {
      activeGroup: 0,
      projects: [
        {
          name: 'qikify',
          shortname: 'qikify',
          desc: 'quick & optimized solutions<br>for Shopify stores',
          url: 'https://qikify.com',
          avatar: 'https://cdn.ownego.com/images/qikify.png?v=1',
          avatarHover: 'https://cdn.ownego.com/images/qikify-hover.png?v=1'
        },
        {
          name: 'teeinblue',
          shortname: 'teeinblue',
          desc: 'Shopify product personalize app',
          url: 'https://teeinblue.com',
          avatar: 'https://cdn.ownego.com/images/tib.png?v=1',
          avatarHover: 'https://cdn.ownego.com/images/tib-hover.png?v=1'
        },
        {
          name: 'tepo',
          shortname: 'tepo',
          desc: 'Shopify product options app',
          url: 'https://tepo.app',
          avatar: 'https://cdn.ownego.com/images/tepo.png?v=1',
          avatarHover: 'https://cdn.ownego.com/images/tepo-hover.png?v=1'
        }
      ]
    }
  },

  computed: {
    fitHeightStyles () {
      return {
        height: this.$root.state.screenHeight + 'px'
      }
    },

    projectGroups () {
      const groups = []

      this.projects.forEach((project, index) => {
        const groupIndex = Math.floor(index / 4)
        if (!groups[groupIndex]) {
          groups[groupIndex] = []
        }
        groups[groupIndex].push(project)
      })

      return groups
    }
  },

  methods: {
    switchGroup (groupIndex) {
      this.activeGroup = groupIndex
    },

    switchGroupPrev () {
      if (this.activeGroup > 0) {
        this.activeGroup--
      }
    },

    switchGroupNext () {
      if (this.activeGroup < this.projectGroups.length - 1) {
        this.activeGroup++
      }
    }
  }
}
</script>
