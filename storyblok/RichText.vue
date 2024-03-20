<script setup>
defineProps({ blok: Object })
</script>

<template>
  <section
    v-editable="blok"
    :class="['rich-text', `color-${blok.color}`, { 'centered': blok.centered }]"
  >
    <div class="container">
      <UtilRichText :content="blok.text" class="rich-text-content" />
    </div>
  </section>
</template>

<style lang="scss">
.rich-text {
  font-size: var(--text-base);
  background-color: var(--bg-color);
  color: var(--text-color);

  &-content {
    max-width: 70ch;
    line-height: 1.5;
  }

  &.centered {
    .rich-text-content {
      margin: 0 auto;
    }
  }
}
</style>