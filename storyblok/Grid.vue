<script setup>
defineProps({ blok: Object })
</script>

<template>
  <section
    v-editable="blok"
    :class="[
      'grid', `bg-${blok.background_color}`, `text-${blok.text_color}`,
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

      <div v-if="blok.blocks.length > 0" class="grid-content">
        <StoryblokComponent
          v-for="blok in blok.blocks"
          :key="blok._uid"
          :blok="blok" />
      </div>
    </div>
  </section>
</template>
 
<style lang="scss" scoped>
.grid {
  &-content {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--site-padding);
  }
}

@include media('<md') {
  .grid {
    &-content {
      grid-template-columns: 1fr;
    }
  }
}
</style>