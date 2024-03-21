<script setup>
const props = defineProps({ blok: Object })

const id = computed(() => {
  return "bento-" + props.blok._uid
})

const { $gsap } = useNuxtApp()

onMounted(() => {
  if (props.blok.animate) {
    $gsap.fromTo(`#${id.value} .bento-item`, {
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
        start: 'top bottom'
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
      'bento',
      `bg-${blok.background_color}`,
      `text-${blok.text_color}`,
      'legoable',
      {
        'has-gap': blok.gap,
        'aspect-916': blok.force_portrait,
        'bento-overflows': blok.overflow,
        'bento-offset': blok.overflow && blok.offset
      }
    ]"
  >
    <div class="container bento-container">
      <header v-if="blok.header.length > 0" class="bento-header">
        <StoryblokComponent
          v-for="blok in blok.header"
          :key="blok._uid"
          :blok="blok" />
      </header>
      <div class="bento-rows">
        <StoryblokComponent
          v-for="blok in blok.rows"
          :key="blok._uid"
          :blok="blok" />
      </div>
    </div>
  </section>
</template>
 
<style lang="scss" scoped>
.bento {
  --bento-gap: var(--spacer-6);
  padding: var(--spacer-10) 0;

  &-header {
    margin-bottom: var(--site-padding);
  }

  &-rows {
    display: flex;
    flex-direction: column;
    gap: var(--bento-gap);
  }

  &.aspect-916 :deep(.bento-item img) {
    aspect-ratio: 9 / 16;
  }

  &-offset {
    overflow: hidden;

    .bento-row {
      margin: 0 -25%;
    }

    .bento-row:nth-child(even) {
      translate: 10% 0;
    }
  }
}

@include media('>=md') {
  .bento {
    &-overflows {
      .bento-header {
        max-width: var(--container-max-width);
        margin-left: auto;
        margin-right: auto;
        padding: 0 var(--site-padding);
      }

      .bento-container {
        max-width: 100%;
        padding-left: 0;
        padding-right: 0;
      }
    }
  }
}

@include media('<md') {
  .bento {
    padding: var(--spacer-4) 0;

    &-offset {
      .bento-row {
        margin: 0;
      }

      .bento-row:nth-child(even) {
        translate: 0 0;
      }
    }
  }
}
</style>