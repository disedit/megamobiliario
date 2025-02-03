<script setup>
defineProps({ blok: Object, password: String })
</script>

<template>
  <section v-editable="blok" class="newsletter-form">
    <div class="container newsletter-form-grid">
      <UtilRichText :content="blok.text" class="text" />
      <DownloadsNewsletter
        :submitted-text="blok.submitted"
        :privacy-policy="blok.privacy_policy"
        :password="password" />
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

  .text {
    :deep(p:first-child) {
      margin-top: 0;
    }
  }
}

@include media-lt-md {
  .newsletter-form {
    &-grid {
      grid-template-columns: 1fr;
      gap: var(--spacer-4);
    }
  }
}
</style>
