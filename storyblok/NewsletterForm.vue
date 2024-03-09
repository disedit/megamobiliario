<script setup>
defineProps({ blok: Object })
</script>

<template>
  <section v-editable="blok" class="newsletter-form">
    <DownloadsNewsletter />
  </section>
</template>
