<script setup>
defineProps({ blok: Object })
</script>

<template>
  <section v-editable="blok" class="hero">
    <NuxtImg
      class="hero-background"
      v-if="blok.background_image"
      :src="blok.background_image.filename"
      sizes="100vw sm:50vw md:400px"
      format="webp"
    />
  </section>
</template>

<style lang="scss" scoped>
.hero {
  background: $blue;
  min-height: 100vh;
}
</style>