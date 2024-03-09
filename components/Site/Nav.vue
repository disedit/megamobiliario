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

const { locale } = useI18n()
const version = useEnvironment()
const storyblokApi = useStoryblokApi()
const { data: config } = await useAsyncData(
  'config_' + locale.value,
  async () => await storyblokApi.get('cdn/stories/config', {
    version,
    resolve_links: 'url',
    language: locale.value
  }),
  { watch: [locale] }
)

const headerMenu = computed(() => {
  return config.value.data.story.content.header_menu
})

const localePath = useLocalePath()

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
      <nav v-if="headerMenu" class="header-menu">
        <ul>
          <li v-for="blok in headerMenu" :key="blok._uid">
            <SiteUnderlinedLink :to="localePath(`/${blok.link.story.url}`)">
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
</style>