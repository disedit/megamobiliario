<script setup>
/* Load site config */
const config = await useConfig()

/* Load page */
const { locale } = useI18n()
const { slug } = useRoute().params
const version = useEnvironment()
const story = await useAsyncStoryblok(
  slug && slug.length > 0 ? slug.join('/') : 'home',
  { version, language: locale.value }
)
const page = story.value.content

if (!story.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page Not Found'
  })
}

/* SEO Metatags */
const siteName = config.site_name
const title = slug && slug.length > 0 ? `${page.title || page.name} - ${siteName}` : siteName
const ogTitle = page.seo_title || title
const description = page.seo_description || config.seo_description
const ogImage = page.seo_picture?.filename || config.seo_picture?.filename
const keywords = page.seo_keywords
const themeColor = page.theme_color?.value || config.theme_color?.value
const twitterSite = config.twitter_account
useServerSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description,
  ogImage,
  twitterCard: 'summary_large_image',
  keywords,
  ogSiteName: siteName,
  themeColor,
  twitterSite,
  ogType: 'website',
  ogLocale: locale
})
useHead({ title })
</script>

<template>
  <div>
    <SiteNav
      :light="story.content.light_nav"
      :color="story.content.nav_color"
    />
    <main>
      <StoryblokComponent
        v-if="story"
        :blok="story.content"
      />
    </main>
  </div>
</template>
