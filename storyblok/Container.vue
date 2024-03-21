<script setup>
defineProps({ blok: Object })
</script>

<template>
  <section
    v-editable="blok"
    :class="['container-component', `bg-${blok.background_color}`]"
  >
    <div class="container">
      <StoryblokComponent
        v-for="blok in blok.blocks"
        :key="blok._uid"
        :blok="blok" />
    </div>
  </section>
</template>
