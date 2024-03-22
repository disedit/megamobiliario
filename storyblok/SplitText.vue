<script setup>
defineProps({ blok: Object })
</script>

<template>
  <div v-editable="blok" class="split-text">
    <div v-if="blok.text_above" :class="['split-text-above', `text-${blok.text_above_color}`, `text-${blok.text_above_size}`]">
      {{ blok.text_above }}
    </div>
    <div v-if="blok.text_below" :class="['split-text-below', `text-${blok.text_below_color}`, `text-${blok.text_below_size}`]">
      {{ blok.text_below }}
    </div>
  </div>
</template>

<style lang="scss">
.split-text {
  display: flex;
  flex-direction: column;
  white-space: pre-wrap;
  gap: var(--site-padding);

  & > div {
    font-size: var(--text-size);
    line-height: 1.5;
  }

  :is(.text-xl, .text-xxl, .text-xxl) {
    font-weight: bold;
    font-family: var(--font-headline);
    line-height: 1;
  }

  &-below {
    margin-top: auto;
  }
}
</style>