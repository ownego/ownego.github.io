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
        h3.s-title.d-md-none Our projects
        .punchs-wrapper
          .punchs-group(
            v-for="group, groupIndex in projectGroups",
            :key="groupIndex",
            :class="{ 'active': groupIndex === activeGroup }",
          )
            ProjectItem(
              v-for="project, index in group",
              :key="index",
              :project="project",
            )
          #punchsControl.punchs-control
            a.punchs-dot(
              v-for="dot, index in projectGroups.length",
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
import FoundersSignature from '../assets/founders-signature.svg'
import ProjectItem from '../components/ProjectItem'

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
          name: 'Toong Co-working Mobile App',
          shortname: 'Toong App',
          desc: 'co-working place in Vietnam',
          modalid: 'projectModal9',
          link: 'https://invis.io/TJHN1BUX3CK',
          shortcontent: 'A characteristic mobile-app design for Toong, a popular co-working space, to simplify its booking process and connect its own community.',
          avatar: 'https://via.placeholder.com/200x200',
          avatarHover: 'https://via.placeholder.com/200x200',

          modal: {
            screenshot: [
              {
                img: 'https://via.placeholder.com/200x200',
                title: 'Toong Mobile App Design'
              },
              {
                img: 'https://via.placeholder.com/200x200',
                title: 'Toong co-working space'
              }
            ]
          }
        },

        {
          name: 'Chasing Sound Music School',
          shortname: 'Chasing Sound',
          desc: 'music school single page',
          modalid: 'projectModal8',
          link: 'www.chasingsound.com.au',
          shortcontent: 'Chasing Sound is a locally-own and operating hub for all things music education. They needed an one-page website with colorful interface for parents and kids to feel their rhymth, so... we made it.',
          avatar: 'https://via.placeholder.com/200x200',
          avatarHover: 'https://via.placeholder.com/200x200',

          modal: {
            screenshot: [
              {
                img: 'https://via.placeholder.com/200x200',
                title: 'Chasing Sound Music School'
              },
              {
                img: 'https://via.placeholder.com/200x200',
                title: 'Single Page Website'
              },
              {
                img: 'https://via.placeholder.com/200x200',
                title: 'Chasing Sound Web design'
              },
              {
                img: 'https://via.placeholder.com/200x200',
                title: 'Chasing Sound responsive'
              }
            ]
          }
        },

        {
          name: 'Thomsen Apartment - Iceland apartments for rent',
          shortname: 'Thomsen',
          desc: 'live like a local',
          modalid: 'projectModal7',
          link: 'http://demo.ownego.com/website/thomsen/',
          shortcontent: 'Although the project Thomsen Apartment cannot meet the day of going live, we still give it a spot in the demonstration. It would be a shame not to show a project with so many passion and ambition in it.',
          avatar: 'https://via.placeholder.com/200x200',
          avatarHover: 'https://via.placeholder.com/200x200',

          modal: {
            screenshot: [
              {
                img: 'https://via.placeholder.com/200x200',
                title: 'Thomsen Apartment - Iceland apartments for rent'
              },
              {
                img: 'https://via.placeholder.com/200x200',
                title: 'Thomsen Apartment - Iceland apartments for rent'
              },
              {
                img: 'https://via.placeholder.com/200x200',
                title: 'Thomsen Apartment - Iceland apartments for rent'
              },
              {
                img: 'https://via.placeholder.com/200x200',
                title: 'Thomsen Apartment - Iceland apartments for rent'
              },
              {
                img: 'https://via.placeholder.com/200x200',
                title: 'Thomsen Apartment - Iceland apartments for rent'
              }
            ]
          }
        },
        {
          name: 'Nosbyn - Another form of simplicity',
          shortname: 'Nosbyn',
          desc: 'fashion e-commerce store',
          modalid: 'projectModal6',
          shortcontent: 'We always want to bring the best experiences to our customer. So Nosbyn site was born in different way with another e-commerce websites. It is another project that makes us proud of. Let try the new e-commerce experience.',
          avatar: 'https://via.placeholder.com/200x200',
          avatarHover: 'https://via.placeholder.com/200x200',

          modal: {
            screenshot: [
              {
                img: 'https://via.placeholder.com/200x200',
                title: 'Nosbyn - Another form of simplicity'
              },
              {
                img: 'https://via.placeholder.com/200x200',
                title: 'Nosbyn - Another form of simplicity'
              },
              {
                img: 'https://via.placeholder.com/200x200',
                title: 'Nosbyn - Responsive'
              },
              {
                img: 'https://via.placeholder.com/200x200',
                title: 'Nosbyn - Another form of simplicity'
              },
              {
                img: 'https://via.placeholder.com/200x200',
                title: 'Nosbyn - Design'
              },
              {
                img: 'https://via.placeholder.com/200x200',
                title: 'Nosbyn - Ecommerce'
              }
            ]
          }
        },
        {
          name: 'AIA Vietnam Lighthouse',
          shortname: 'AIA Lighthouse',
          desc: 'interactive single page',
          modalid: 'projectModal5',
          link: 'http://demo.ownego.com/website/aia/',
          shortcontent: 'This is a really interesting project. SaigonLab has made a beautiful design and we really enjoy working together as a team. We both want this site to be a story telling site about AIA Lighthouse... and voila, every little thing in this room tells different aspects of AIA. Pretty solid, right?',
          avatar: 'https://via.placeholder.com/200x200',
          avatarHover: 'https://via.placeholder.com/200x200',

          modal: {
            screenshot: [
              {
                img: 'https://via.placeholder.com/200x200',
                title: 'AIA Vietnam Lighthouse Landing page'
              },
              {
                img: 'https://via.placeholder.com/200x200',
                title: 'AIA Vietnam Lighthouse Lounge room'
              },
              {
                img: 'https://via.placeholder.com/200x200',
                title: 'AIA Vietnam Lighthouse News Centre room'
              }
            ]
          }
        },

        {
          name: 'Shoot - Multi purpose HTML Template',
          shortname: 'Shoot Template',
          desc: 'multi-purpose HTML template',
          modalid: 'projectModal4',
          link: 'http://theme.ownego.com/shoot/',
          partner: {
            name: 'ThemeMove',
            link: 'http://themeforest.net/user/thememove'
          },
          shortcontent: 'This is our first template that we built and sell on ThemeForest. The first time is always hard, and this theme may not be finished without tremendous passion. We double checked every animation, every pixel, every little things we could get our hands on, over and over again, trying to make them perfect... Although some minor bugs still exist, the theme has been being a trending one on ThemeForest for a month.',
          avatar: 'https://via.placeholder.com/200x200',
          avatarHover: 'https://via.placeholder.com/200x200',

          modal: {
            screenshot: [
              {
                img: 'https://via.placeholder.com/200x200',
                title: 'Shoot - multi-purpose html template'
              },
              {
                img: 'https://via.placeholder.com/200x200',
                title: 'Shoot - multi-purpose html template'
              },
              {
                img: 'https://via.placeholder.com/200x200',
                title: 'Shoot - multi-purpose html template'
              },
              {
                img: 'https://via.placeholder.com/200x200',
                title: 'Shoot - multi-purpose html template'
              },
              {
                img: 'https://via.placeholder.com/200x200',
                title: 'Shoot - multi-purpose html template'
              }
            ]
          }
        },

        {
          name: 'Mapa Cafe',
          shortname: 'Mapa Cafe',
          desc: 'cafe, restaurant stores from UK',
          modalid: 'projectModal3',
          link: 'http://demo.ownego.com/website/mapa/html/dist/production',
          shortcontent: 'A website we made for MAPA, a coffee shop chain in London. To prepare for this project, we have researched thoroughly the coffee shop&#39;s franchise model and tried to provide the users a modern, friendly interface. In the near future, we will update the design for even better look.',
          avatar: 'https://via.placeholder.com/200x200',
          avatarHover: 'https://via.placeholder.com/200x200',

          modal: {
            screenshot: [
              {
                img: 'https://via.placeholder.com/200x200',
                title: 'Mapa cafe - restaurant, cafe, breakfast'
              },
              {
                img: 'https://via.placeholder.com/200x200',
                title: 'Mapa cafe - restaurant, cafe, breakfast'
              },
              {
                img: 'https://via.placeholder.com/200x200',
                title: 'Mapa cafe - restaurant, cafe, breakfast'
              },
              {
                img: 'https://via.placeholder.com/200x200',
                title: 'Mapa cafe - restaurant, cafe, breakfast'
              }
            ]
          }
        },

        {
          name: 'Voglia Di Mare',
          shortname: 'Voglia Di Mare',
          desc: 'boat rentals in ajaccio in corisa',
          modalid: 'projectModal1',
          link: 'http://demo.ownego.com/website/vogliadimare/',
          shortcontent: 'A boat rentals service website. Simple and friendly. A rented boat is just a few clicks away from the users.<br/><span class="text-grey-light">(We are sorry that the boat rentals function is locked in this demo. Please contact us for more informations.)</span>',
          avatar: 'https://via.placeholder.com/200x200',
          avatarHover: 'https://via.placeholder.com/200x200',

          modal: {
            screenshot: [
              {
                img: 'https://via.placeholder.com/200x200',
                title: 'Voglia Di Mare - boat rentals in ajaccio in corisa'
              },
              {
                img: 'https://via.placeholder.com/200x200',
                title: 'Voglia Di Mare - boat rentals in ajaccio in corisa'
              },
              {
                img: 'https://via.placeholder.com/200x200',
                title: 'Voglia Di Mare - boat rentals in ajaccio in corisa'
              },
              {
                img: 'https://via.placeholder.com/200x200',
                title: 'Voglia Di Mare - boat rentals in ajaccio in corisa'
              }
            ]
          }
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
