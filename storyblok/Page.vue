<script setup>
defineProps({ blok: Object })
</script>

<template>
  <div v-editable="blok" class="px-4">
    <h3>PAge</h3>
    <StoryblokComponent v-for="blok in blok.body" :key="blok._uid" :blok="blok" />
  </div>
</template>
