<script setup>
defineProps({ blok: Object })
</script>

<template>
  <section
    v-editable="blok"
    :class="['featured-text', `bg-${blok.background}`, `text-${blok.text_color}`, `text-${blok.text_size}`]"
  >
    <div class="container">
      <p class="featured-text-content">
        {{ blok.text }}
      </p>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.featured-text {
  display: flex;
  background-size: cover;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 10vh 0;

  p {
    max-width: 70ch;
    text-align: center;
    text-wrap: balance;
    font-size: var(--text-size);
  }
}
</style>