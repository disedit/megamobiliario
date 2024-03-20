<script setup>
const props = defineProps({
  content: {
    type: Object,
    required: true
  }
})

const renderedContent = computed(() => {
  return renderRichText(props.content)
})
</script>

<template>
  <div v-html="renderedContent" class="rich-text-rendered" />
</template>

<style lang="scss">
.rich-text-rendered {
  h1, h2, h3, h4, h5, h6 {
    line-height: 1.1;
  }

  a:hover {
    opacity: .6;
  }
}
</style>