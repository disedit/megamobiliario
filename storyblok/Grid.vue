<script setup>
const props = defineProps({ blok: Object })

const id = computed(() => {
  return "grid-" + props.blok._uid
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
    :style="{
      '--fixed-height-mobile': blok.fixed_height_mobile
    }"
  >
    <div class="container">
      <header v-if="blok.header.length > 0" class="grid-header">
        <StoryblokComponent
          v-for="component in blok.header"
          :key="component._uid"
          :blok="component" />
      </header>

      <div v-if="blok.blocks.length > 0" class="grid-content">
        <StoryblokComponent
          v-for="picture in blok.blocks"
          :key="picture._uid"
          :blok="picture"
          :arrow-on-hover="blok.arrow_on_hover"
          class="grid-item" />
          {{ blok.arrow_on_hover }}
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
    padding: var(--spacer-8) 0;

    &-content {
      grid-template-columns: 1fr;
    }
  }
}
</style>