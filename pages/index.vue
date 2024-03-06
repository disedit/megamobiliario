<script setup>
const { locale } = useI18n()
const version = useEnvironment()
const home = await useAsyncStoryblok("home", {
  language: locale.value,
  version
})

/* SEO Metatags */
const title = home.value.content.seo_title
const description = home.value.content.seo_description
useServerSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description,
  ogImage: home.value.content.seo_picture,
  twitterCard: 'summary_large_image',
  keywords: home.value.content.seo_keywords
})

useHead({ title })
</script>

<template>
  <main class="page">
    <StoryblokComponent
      v-for="blok in home.content.blocks"
      :key="blok._uid"
      :blok="blok"
    />
  </main>
</template>
