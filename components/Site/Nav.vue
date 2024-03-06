<script setup>
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
</script>
 
<template>
  <header class="header">
    <div class="header-navbar container">
      <NuxtLink to="/" class="header-logo">
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
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    font-size: var(--text-lg);
    align-items: center;

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
        margin: -2rem 0;
      }
    }
  }
</style>