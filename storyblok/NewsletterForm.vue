<script setup>
defineProps({ blok: Object })
</script>

<template>
  <section v-editable="blok" class="newsletter-form">
    <div class="container newsletter-form-grid">
      <UtilRichText :content="blok.text" />
      <DownloadsNewsletter />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.newsletter-form {
  .container {
    max-width: 1500px;
  }

  &-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--spacer-12);
  }
}
</style>
