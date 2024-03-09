<script setup>
const { locale } = useI18n()
const version = useEnvironment()

const story = await useAsyncStoryblok(
  'descargas',
  { version, language: locale.value }
)

/* SEO Metatags */
const title = `${story.value.content.seo_title} - Megamobiliario`
const description = story.value.content.seo_description
useServerSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description,
  ogImage: story.value.content.seo_picture,
  twitterCard: 'summary_large_image'
})

useHead({ title })

/* Rudimentaly login system */
/* Security is not important here */
const accessAllowed = ref(false)
const showDownloads = computed(() => {
  const storedPassword = localStorage.getItem('downloads_pass')
  return storedPassword === story.value.content.password || accessAllowed.value
})
</script>

<template>
  <main>
    <SiteNav :light="story.content.light_nav" :color="story.content.nav_color" />
    <StoryblokComponent
      v-for="blok in story.content.common"
      :key="blok._uid"
      :blok="blok"
    />
    <div v-if="!showDownloads">
      <StoryblokComponent
        v-for="blok in story.content.pre_password"
        :key="blok._uid"
        :blok="blok"
      />
      <DownloadsPassword
        :password="story.content.password"
        @allowed="accessAllowed = true"
      />
    </div>
    <div v-else>
      <StoryblokComponent
        v-for="blok in story.content.downloads"
        :key="blok._uid"
        :blok="blok"
      />
    </div>
  </main>
</template>