<script setup>
defineProps({ blok: Object })
</script>

<template>
  <div
    v-editable="blok"
    :class="['headline', `text-${blok.text_size}`]"
  >
    <component :is="blok.level" class="headline-text">{{ blok.headline }}</component>
  </div>
</template>

<style lang="scss" scoped>
  .headline {
    text-align: center;
    font-family: var(--font-headline);

    &-text {
      font-size: var(--text-size);
      margin: var(--spacer-6) 0 var(--spacer-10) 0;
    }
  }
</style>
