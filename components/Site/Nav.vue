<script setup>
const props = defineProps({
  light: {
    type: Boolean,
    default: false
  },
  color: {
    type: String,
    default: 'white'
  },
  colorMobile: {
    type: String,
    default: 'brown'
  }
})

/* Load nav items */
const config = await useConfig()
const { slug } = useRoute().params
const localePath = useLocalePath()
function isActive (link) {
  return link.story?.slug === slug[0]
}

/* Mobile menu */
const menuOpen = ref(false)
const navColor = useColor(props.color)
const navColorMobile = useColor(props.colorMobile)

const showMenu = () => {
  menuOpen.value = true
  document.documentElement.classList.add('menu-open')
  document.querySelector('meta[name="theme-color"]').setAttribute('content', navColorMobile)
}
const hideMenu = () => {
  menuOpen.value = false
  document.documentElement.classList.remove('menu-open')
  document.querySelector('meta[name="theme-color"]').setAttribute('content', navColor)
}

/* Menu animations */
const { $gsap } = useNuxtApp()
let timeline

function beforeEnter(el) {
  $gsap.set(el, { y: '-100%' })
}

function onEnter(el, done) {
  $gsap.set('.header-mobile-menu .animate', { y: '100%', opacity: 0 })
  timeline = $gsap.timeline()

  timeline.to(el, {
    y: 0,
    duration: .5,
    ease: 'power4.out',
  }).to('.header-mobile-menu .animate', {
    y: 0,
    opacity: 1,
    duration: .25,
    ease: 'power4.out',
    stagger: .1,
    onComplete: done
  }, '-=.3')
}

function onLeave (el, done) {
  timeline = $gsap.timeline()
  timeline.to('.header-mobile-menu .animate', {
    y: '100%',
    opacity: 0,
    duration: .25,
    stagger: {
      amount: .25,
      from: 'end'
    },
  }).to(el, {
    y: '-100%',
    duration: .5,
    ease: 'power4.in',
    onComplete: done
  }, '-=.3')
}

function onEnterCancelled() {
  timeline && timeline.kill()
}

function onLeaveCancelled() {
  timeline && timeline.kill()
}

/* Hide/Show nav bar on scorll */
const { y } = useWindowScroll()
const showNavbar = ref(true)
const lastScrollPosition = ref(0)

watch(y, (currentScrollPosition) => {
  if (currentScrollPosition < 0 || Math.abs(currentScrollPosition - lastScrollPosition.value) < 60) {
    return
  }
  showNavbar.value = currentScrollPosition < lastScrollPosition.value
  lastScrollPosition.value = currentScrollPosition
})
</script>
 
<template>
  <header
    ref="nav"
    :class="[
      'header', `color-${color}`,
      {
        'header--light': light,
        'header--hidden': !showNavbar,
        'header--scrolled': y > 300
      }
    ]"
  >
    <div class="header-navbar container">
      <NuxtLink :to="localePath('/')" class="header-logo">
        <span class="visually-hidden">Megamobiliario</span>
        <SiteLogo />
      </NuxtLink>
      <nav v-if="config.header_menu" class="header-menu" aria-label="Main navigation">
        <ul>
          <li v-for="blok in config.header_menu" :key="blok._uid">
            <SiteUnderlinedLink
              v-if="blok.link?.id && blok.link?.story"
              :to="localePath(`/${blok.link?.story?.url}`)"
              :class="{ 'active': isActive(blok.link) }">
              {{ blok.label }}
            </SiteUnderlinedLink>
          </li>
        </ul>
      </nav>
      <SiteLanguage class="header-language" />
      <button
        class="header-burger"
        @click="showMenu"
        aria-label="Abrir menú"
        aria-controls="mainNav"
        :aria-expanded="menuOpen ? 'true' : 'false'"
      >
        <IconBurger />
      </button>
    </div>
  </header>
  <Teleport to="#teleports">
    <Transition
      @before-enter="beforeEnter"
      @enter="onEnter"
      @enter-cancelled="onEnterCancelled"
      @leave="onLeave"
      @leave-cancelled="onLeaveCancelled"
    >
      <nav
        id="mainNav"
        v-if="menuOpen"
        :class="['header-mobile-menu', `color-${colorMobile}`]"
        aria-label="Main navigation"
      >
        <button
            class="header-burger"
            @click="hideMenu"
            aria-label="Cerrar menú"
            aria-controls="mainNav"
            :aria-expanded="menuOpen ? 'true' : 'false'"
          >
          <IconClose />
        </button>
        <ul>
          <li v-for="blok in config.header_menu" :key="blok._uid" class="animate">
            <NuxtLink
              v-if="blok.link?.id && blok.link?.story"
              :to="localePath(`/${blok.link?.story?.url}`)"
              :class="{ 'active': isActive(blok.link) }"
              @click="hideMenu"
            >
              {{ blok.label }}
            </NuxtLink>
          </li>
        </ul>
        <SiteLanguage class="header-language animate" @change="hideMenu" />
      </nav>
    </Transition>
  </Teleport>
</template>

<style lang="scss" scoped>
  .header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    font-size: var(--text-base);
    align-items: center;
    z-index: 1000;
    color: var(--black);
    transition: .25s all ease-out;

    &--light:not(.header--scrolled) {
      color: var(--white);
    }

    &--hidden {
      transform: translate3d(0, -100%, 0);
    }

    &--scrolled {
      background-color: var(--bg-color);
      color: var(--text-color);
      
      .container {
        padding-top: var(--spacer-5);
        padding-bottom: var(--spacer-5);
      }
    }

    .container {
      transition: padding .25s ease;
    }

    &-logo {
      svg {
        transform: translateY(.15em);
        height: 3.5rem;
      }
    }
    
    &-navbar {
      display: flex;
    }

    &-menu {
      margin-left: auto;

      ul {
        display: flex;
        list-style: none;
      }

      a {
        padding: 2rem;
        margin: -2rem -.5rem;
        color: inherit;
      }
    }

    &-mobile-menu {
      display: flex;
      position: fixed;
      inset: 0;
      background: var(--bg-color);
      z-index: 1100;
      padding: var(--site-padding);
      flex-direction: column;
      justify-content: center;
      overflow: auto;
      -webkit-overflow-scrolling: touch;
      color: var(--text-color);

      ul {
        margin: 0;
        padding: 0;
      }

      li {
        list-style-type: none;
        padding: 0;
        margin: 0;

        a {
          display: block;
          text-align: center;
          text-decoration: none;
          color: inherit;
          font-size: var(--text-lg);
          padding: var(--spacer-3);
        }
      }

      .header-burger {
        position: absolute;
        top: var(--site-padding);
        right: var(--site-padding);

        svg {
          height: 1.5rem;
        }
      }

      .header-language {
        margin: var(--spacer-5) auto 0 auto;
      }
    }

    &-burger {
      appearance: none;
      background-color: transparent;
      border: 0;
      padding: var(--spacer-4);
      margin: 0 calc(var(--spacer-4) * -1);
      color: inherit;
      cursor: pointer;

      svg {
        width: 2em;
      }
    }
  }

  @include media('>=xl') {
    .header {
      &-burger {
        display: none;
      }

      &-mobile-menu {
        display: none;
      }
    }
  }

  @include media('<xl') {
    .header {
      &-logo svg {
        height: 2rem;
      }

      &-navbar {
        align-items: center;
      }

      &-menu {
        display: none;
      }

      &-language {
        margin-left: auto;
        padding-left: 0;
        margin-right: var(--spacer-7);
      }

      &--scrolled {
        --spacer-5: .5rem;
      }
    }
  }
</style>