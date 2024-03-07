<script setup>
const { locale } = useI18n()
const { slug } = useRoute().params
const version = useEnvironment()

const story = await useAsyncStoryblok(
  slug && slug.length > 0 ? slug.join('/') : 'home',
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
  twitterCard: 'summary_large_image',
  keywords: story.value.content.seo_keywords
})

useHead({ title })
</script>

<template>
  <main>
    <SiteNav :light="story.content.light_nav" :color="story.content.nav_color" />
    <StoryblokComponent v-if="story" :blok="story.content" />
  </main>
</template>
