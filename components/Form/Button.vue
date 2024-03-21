<script setup>
const props = defineProps({
  variant: { type: String, default: 'white' },
  loading: { type: Boolean, default: false }
})
</script>

<template>
  <button :class="['button', `variant-${variant}`]" :disabled="loading">
    <slot />
  </button>
</template>

<style lang="scss" scoped>
.button {
  --border-color: var(--white);
  --background-color: transparent;
  --text-color: var(--white);
  --hover-background-color: rgba(255, 255, 255, .15);

  appearance: none;
  border: 1.5px var(--border-color) solid;
  color: var(--text-color);
  background: var(--background-color);
  padding: var(--spacer-3) var(--spacer-6);
  font-size: var(--text-md);
  transition: .25s ease;

  &:hover {
    cursor: pointer;
    background: var(--hover-background-color);
  }

  &.variant-blue {
    --border-color: var(--blue);
    --background-color: var(--blue);
    --text-color: var(--white);
    --hover-background-color: var(--blue);
  }
}
</style>