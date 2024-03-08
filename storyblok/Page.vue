<script setup>
defineProps({ blok: Object })
</script>

<template>
  <div v-editable="blok">
    <StoryblokComponent
      v-for="blok in blok.blocks"
      :key="blok._uid"
      :blok="blok" />
  </div>
</template>
