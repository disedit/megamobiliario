<script setup>
const props = defineProps({ blok: Object })

const id = computed(() => {
  return "posts-" + props.blok._uid
})

/* Fetch posts */
const { locale } = useI18n()
const version = useEnvironment()
const storyblokApi = useStoryblokApi()

const specificPosts = {
  by_uuids_ordered: props.blok.posts.join(',')
}

const autopopulate = {
  starts_with: props.blok.autopopulate,
  per_page: props.blok.autopopulate_limit || 3,
  sort_by: 'position:desc,sort_by_date,created_at:desc',
  is_startpage: false
}

const filter = props.blok.posts.length > 0 ? specificPosts : autopopulate

const { data: postsData } = await useAsyncData(
  'posts_' + props.blok._uid,
  async () => await storyblokApi.get(`cdn/stories`, {
    version,
    language: locale.value,
    excluding_fields: 'blocks,light_nav,nav_color_keywords,nav_color_mobile',
    ...filter
  })
)
const posts = computed(() => {
  return postsData.value.data.stories.map((post) => ({
    id: post.uuid,
    link: {
      id: post.uuid,
      linktype: 'story',
      cached_url: post.full_slug,
    },
    picture: post.content.post_thumbnail || post.content.seo_picture,
    picture_hover: post.content.post_thumbnail_hover,
    title: post.content.post_title || post.content.title,
    date: post.content.post_date,
    text: post.content.post_description || post.content.seo_description,
    arrow_on_hover: props.blok.arrow_on_hover
  }))
})

/* Animations */
const { $gsap } = useNuxtApp()

onMounted(() => {
  if (props.blok.animate) {
    $gsap.fromTo(`
      #${id.value} .picture-thumbnail,
      #${id.value} .picture-title,
      #${id.value} .picture-date,
      #${id.value} .picture-text
    `, {
      opacity: 0,
      y: '10%'
    }, {
      y: 0,
      opacity: 1,
      duration: 1,
      stagger: .2,
      ease: "power4.out",
      scrollTrigger: {
        trigger: `#${id.value}`,
        start: 'top center'
      }
    })
  }
})
</script>

<template>
  <section
    :id="id"
    v-editable="blok"
    :class="[
      'grid', `bg-${blok.background_color}`, `text-${blok.text_color}`, 'legoable',
      { 'aspect-11': blok.force_square }
    ]"
  >
    <div class="container">
      <header v-if="blok.header.length > 0" class="grid-header">
        <StoryblokComponent
          v-for="blok in blok.header"
          :key="blok._uid"
          :blok="blok" />
      </header>

      <div v-if="posts.length > 0" class="grid-content">
        <Picture
          v-for="post in posts"
          :key="post.id"
          :blok="post"
        />
      </div>
    </div>
  </section>
</template>
 
<style lang="scss" scoped>
.grid {
  padding: var(--spacer-10) 0 var(--spacer-14);

  &-content {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    column-gap: var(--site-padding);
    margin-top: calc(var(--site-padding) * -1);
  }

  &-item {
    margin-top: var(--site-padding);
  }
}

@include media('<lg') {
  .grid {
    &-content {
      grid-template-columns: 1fr;
    }
  }
}
</style>