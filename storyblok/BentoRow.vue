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

@include media('<md') {
  .bento-row {
    flex-shrink: 0;
    overflow: scroll;
    margin: 0 calc(var(--site-padding) * -1);
    padding: 0 var(--site-padding);
    scroll-snap-type: x mandatory;
  }

  .bento-item {
    flex-shrink: 0;
    width: 60vw;
    scroll-snap-align: center;
  }
}
</style>