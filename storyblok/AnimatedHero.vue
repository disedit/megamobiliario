<script setup>
const props = defineProps({ blok: Object })

const currentSlide = ref(0)
const totalSlides = computed(() => props.blok.slides.length)
let interval

onMounted(() => {
  interval = setInterval(() => {
    currentSlide.value = (currentSlide.value >= totalSlides.value - 1) ? 0 : currentSlide.value + 1
  }, props.blok.interval || 2000)
})

onUnmounted(() => {
  clearInterval(interval)
})
</script>

<template>
  <div v-editable="blok" class="animated-hero">
    <template v-for="(slide, i) in blok.slides" :key="slide._uid">
      <StoryblokComponent :blok="slide" :class="['contained-hero', { current: i === currentSlide }]" />
    </template>
  </div>
</template>

<style lang="scss" scoped>
.animated-hero {
  position: relative;
  min-height: 100vh;
  min-height: 100svh;

  .contained-hero {
    position: absolute;
    inset: 0;
    opacity: 0;
    transition: 1s ease;

    &.current {
      opacity: 1;
    }
  }
}
</style>