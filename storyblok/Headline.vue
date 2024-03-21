<script setup>
defineProps({ blok: Object })
</script>

<template>
  <div
    v-editable="blok"
    :class="['headline', `text-${blok.text_size}`]"
  >
    <component :is="blok.level" class="headline-text">
      <UtilAnimatedText v-if="blok.animate_text" :text="blok.headline" />
      <span v-else>{{ blok.headline }}</span>
    </component>
  </div>
</template>

<style lang="scss" scoped>
  .headline {
    text-align: center;
    font-family: var(--font-headline);

    &-text {
      font-size: var(--text-size);
      margin: 0 0 var(--spacer-14) 0;
    }
  }
</style>
