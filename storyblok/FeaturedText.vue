<script setup>
defineProps({ blok: Object })
</script>

<template>
  <section
    v-editable="blok"
    :class="['featured-text', `bg-${blok.background}`, `text-${blok.text_color}`]"
  >
    <p class="featured-text-content">
      {{ blok.text }}
    </p>
  </section>
</template>

<style lang="scss" scoped>
.featured-text {
  display: flex;
  background-size: cover;
  align-items: center;
  justify-content: center;
  position: relative;
}
</style>