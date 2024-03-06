<script setup>
defineProps({ blok: Object })
</script>

<template>
  <article v-editable="blok">
    <h2>{{ blok.name }}</h2>
    <a :href="blok.url.url" target="_blank">{{ blok.download_cta }}</a>
  </article>
</template>
