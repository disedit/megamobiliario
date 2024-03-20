<script setup>
const props = defineProps({
  loading: { type: Boolean, default: false }
})
</script>

<template>
  <button class="button" :disabled="loading">
    <slot />
  </button>
</template>

<style lang="scss" scoped>
.button {
  appearance: none;
  border: 1.5px var(--white) solid;
  color: var(--white);
  background: transparent;
  padding: var(--spacer-3) var(--spacer-6);
  font-size: var(--text-md);
  transition: .25s ease;

  &:hover {
    cursor: pointer;
    background: rgba(255, 255, 255, .15);
  }
}
</style>