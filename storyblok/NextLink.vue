<script setup>
const props = defineProps({ blok: Object })

const { locale, t } = useI18n()
const { slug } = useRoute().params
const version = useEnvironment()
const { internalLink } = useLinks()

// Definitions
// The key must be the first element in slug
const types = {
  nosotros: {
    root: 'novedades',
    label: t('next.post'),
    slug: 2
  },
  colecciones: {
    root: 'colecciones',
    label: t('next.collection'),
    slug: 1
  },
  proyectos: {
    root: 'proyectos',
    label: t('next.project'),
    slug: 1
  },
}

// Type
const type = computed(() => {
  if (props.custom_type) {
    return {
      root: props.custom_type,
      label: t('next.generic'),
      slug: 1
    }
  }

  return types[slug[0]]
})

// Fetch next page
const storyblokApi = useStoryblokApi()
const { data } = await useAsyncData('next' + type.value.root, async () => await storyblokApi.get(`cdn/stories`, {
    starts_with: type.value.root + '/',
    sort_by: 'sort_by_date:desc,created_at:desc',
    excluding_fields: 'blocks,seo_title,seo_picture,seo_description,seo_keywords,light_nav,nav_color',
    is_startpage: 0,
    language: locale.value,
    version
}))
const orderedPages = data.value.data.stories
const currentIndex = orderedPages.findIndex(page => slug[type.value.slug] === page.slug)
const nextPage = computed(() => {
  if (currentIndex + 1 >= orderedPages.length) {
    return orderedPages[0]
  }
  return orderedPages[currentIndex + 1]
})

const nextLink = computed(() => {
  if (props.blok.custom_link.id) {
    return props.blok.custom_link.linktype === 'story'
      ? internalLink(props.blok.custom_link.cached_url)
      : props.blok.custom_link.cached_url
  }

  return internalLink(nextPage.value.full_slug)
})

const nextLabel = computed(() => {
  if (props.blok.label) {
    return props.blok.label
  }

  return type.value.label
})
</script>

<template>
  <NuxtLink
    :to="nextLink"
    :class="['next-link', `color-${blok.color}`]"
  >
    <div class="container">
      {{ nextLabel }}
      <span class="arrow"><IconArrowRight /></span>
    </div>
  </NuxtLink>
</template>

<style lang="scss" scoped>
  .next-link {
    display: block;
    padding: var(--spacer-10) 0;
    background: var(--bg-color);
    color: var(--text-color);
    font-size: var(--text-md);
    font-weight: bold;
    font-family: var(--font-headline);
    text-decoration: none;
    
    .container {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: var(--spacer-2);
    }

    .arrow {
      max-width: 0;
      opacity: 0;
      overflow: clip;
      transition: .25s ease;

      svg {
        display: block;
        height: 1em;
      }
    }

    &:hover {
      .arrow {
        max-width: 2em;
        opacity: 1;
      }
    }
  }
</style>
