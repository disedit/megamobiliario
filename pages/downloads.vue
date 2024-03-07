<script setup>
const { locale } = useI18n()
const version = useEnvironment()

const story = await useAsyncStoryblok(
  'downloads',
  { version, language: locale.value }
)

/* SEO Metatags */
const title = story.value.content.seo_title
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

const showDownloads = ref(false)
</script>

<template>
  <main>
    <SiteNav :light="story.content.light_nav" />
    <div v-if="!showDownloads">
      <DownloadsNewsletter />
      <DownloadsPassword @allowed="showDownloads = true" />
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