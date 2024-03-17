<script setup>
defineProps({ blok: Object })
</script>

<template>
  <section v-editable="blok" :class="['contact', `color-${blok.color}`]">
      <div class="container">
        <h2>{{ blok.headline }}</h2>
        <p>{{ blok.text }}</p>
        <ContactFormFields />
      </div>
    </section>
</template>

<style lang="scss" scoped>
.contact {
  background: var(--bg-color);
}
</style>