<script setup>
defineProps({ blok: Object })
</script>

<template>
  <div v-editable="blok" class="bento-row">
    <StoryblokComponent
      v-for="blok in blok.blocks"
      :key="blok._uid"
      :blok="blok"
      class="bento-item" />
  </div>
</template>
 
<style lang="scss" scoped>
.bento-row {
  display: flex;
}

.bento-item {
  flex-grow: 1;
}

.has-gap .bento-row {
  gap: var(--bento-gap);
}
</style>