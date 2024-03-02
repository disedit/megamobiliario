<script setup>
const { locale } = useI18n()
const { slug } = useRoute().params
const version = useEnvironment()

const story = await useAsyncStoryblok(
  slug && slug.length > 0 ? slug.join('/') : 'home',
  { version, language: locale.value }
)
</script>

<template>
  <div>
    <h1>{{ story.name }}</h1>
    <StoryblokComponent v-if="story" :blok="story.content" />
  </div>
</template>
