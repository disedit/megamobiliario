<script setup>
const props = defineProps({ blok: Object })

const content = computed(() => {
  return renderRichText(props.blok.text)
})
</script>

<template>
  <section
    v-editable="blok"
    :class="['rich-text', `color-${blok.color}`, { 'centered': blok.centered }]"
  >
    <div class="container">
      <div v-html="content" class="rich-text-content" />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.rich-text {
  font-size: var(--text-base);
  background-color: var(--bg-color);
  color: var(--text-color);

  &-content {
    max-width: 70ch;
  }

  &.centered {
    .rich-text-content {
      margin: 0 auto;
    }
  }
}
</style>