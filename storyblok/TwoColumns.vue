<script setup>
defineProps({ blok: Object })
</script>

<template>
  <section
    v-editable="blok"
    :class="['two-columns', `color-${blok.color}`]"
  >
      <div class="container">
        <div class="two-columns-grid">
          <StoryblokComponent
            v-for="blok in blok.blocks"
            :key="blok._uid"
            :blok="blok"
          />
        </div>
      </div>
    </section>
</template>

<style lang="scss" scoped>
.two-columns {
  background: var(--bg-color);
}
</style>