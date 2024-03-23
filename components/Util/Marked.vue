<script  setup>
import { marked } from 'marked'

const props = defineProps({
  content: {
    type: String,
    required: true
  }
})

const text = computed(() => {
  return marked.parse(props.content)
})
</script>

<template>
  <div class="marked-text-rendered" v-html="text" />
</template>

<style lang="scss">
.marked-text-rendered {
  h1, h2, h3, h4, h5, h6 {
    line-height: 1.1;
  }

  a:hover {
    opacity: .6;
  }
}
</style>
