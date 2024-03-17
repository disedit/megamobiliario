<script setup>
defineProps({ blok: Object })
</script>

<template>
  <section v-editable="blok" class="newsletter-form">
    <UtilRichText :content="blok.text" />
    <DownloadsNewsletter />
  </section>
</template>
