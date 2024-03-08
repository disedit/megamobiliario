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
  <div v-html="text" />
</template>
