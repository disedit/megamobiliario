<script setup>
defineProps({ blok: Object })
</script>

<template>
  <article
    v-editable="blok"
    class="picture"
  >
    <NuxtImg
      v-if="blok.picture?.filename"
      :src="blok.picture.filename"
      :alt="blok.picture.alt"
    />
    <h3>{{ blok.title }}</h3>
  </article>
</template>

<style lang="scss" scoped>
  .picture {
    img {
      width: 100%;
    }
  }
</style>
