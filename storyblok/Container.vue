<script setup>
defineProps({ blok: Object })
</script>

<template>
  <section
    v-editable="blok"
    :class="[
      'container-component', `bg-${blok.background_color}`,
      { 'full-height': blok.full_height }
    ]"
  >
    <div class="container">
      <StoryblokComponent
        v-for="blok in blok.blocks"
        :key="blok._uid"
        :blok="blok" />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.full-height :deep(img) {
  height: calc(100vh - var(--site-padding) * 2) !important;
  height: calc(100svh - var(--site-padding) * 2) !important;
}
</style>