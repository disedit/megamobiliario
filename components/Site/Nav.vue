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
  <header>
    <div>
      <NuxtLink to="/">
        <h1 class="visually-hidden">Megamobiliario</h1>
        <SiteLogo />
      </NuxtLink>
      <nav v-if="headerMenu">
        <ul>
          <li v-for="blok in headerMenu" :key="blok._uid">
            <NuxtLink :to="localePath(`/${blok.link.story.url}`)">
              {{ blok.label }}
            </NuxtLink>
          </li>
        </ul>
      </nav>
      <SiteLanguage />
    </div>
  </header>
</template>