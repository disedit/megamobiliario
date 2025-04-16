<script setup>
defineProps({ blok: Object })
</script>

<template>
  <section
    v-editable="blok"
    :class="['full-width-picture', { 'full-height': blok.full_height }]"
    :style="{
      '--picture-height': blok.fixed_height,
      '--picture-align': blok.align
    }"
  >
    <NuxtPicture
      v-if="blok.picture?.filename"
      format="avif,webp"
      :src="blok.picture.filename"
      :img-attrs="{ alt: blok.picture.alt, class: blok.picture_sm?.filename ? 'full-width-picture-img full-width-picture-img-desktop' : 'full-width-picture-img' }"
      sizes="100vw md:750px lg:1200px"
      preload
     />
     <NuxtPicture
      v-if="blok.picture_sm?.filename"
      format="avif,webp"
      :src="blok.picture_sm.filename"
      :img-attrs="{ alt: blok.picture_sm.alt, class: 'full-width-picture-img full-width-picture-img-mobile' }"
      sizes="900px"
      preload
     />
  </section>
</template>

<style lang="scss">
.full-width-picture {
  picture {
    width: 100%;
    display: flex;
  }

  img {
    display: block;
    width: 100%;
    object-fit: cover;
    height: var(--picture-height, auto);
    object-position: var(--picture-align);
  }

  &.full-height {
    img {
      height: 100vh;
    }
  }
}
</style>