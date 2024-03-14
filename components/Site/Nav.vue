<script setup>
defineProps({
  light: {
    type: Boolean,
    default: false
  },
  color: {
    type: String,
    default: 'white'
  }
})

/* Load nav items */
const config = await useConfig()
const { slug } = useRoute().params
const localePath = useLocalePath()
function isActive (link) {
  return link.story?.slug === slug[0]
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
      <nav v-if="config.header_menu" class="header-menu">
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
    </div>
  </header>
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
  }

  @include media('<md') {
    .header {
      display: none;
    }
  }
</style>