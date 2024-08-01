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
const siteName = config.value.site_name
const title = slug && slug.length > 0 ? `${page.title || page.name} - ${siteName}` : siteName
const ogTitle = page.seo_title || title
const description = page.seo_description || page.post_description || config.value.seo_description
const ogImage = page.seo_picture?.filename || page.post_thumbnail?.filename || config.value.seo_picture?.filename
const keywords = page.seo_keywords
const themeColor = page.theme_color?.value || useColor(page.nav_color || 'white')
const twitterSite = config.value.twitter_account
useServerSeoMeta({
  title,
  ogTitle,
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
      :color-mobile="story.content.nav_color_mobile"
    />
    <main>
      <StoryblokComponent
        v-if="story"
        :blok="story.content"
      />
    </main>
    <SiteFooter />
  </div>
</template>
