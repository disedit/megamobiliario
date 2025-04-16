<script setup>
defineProps({ blok: Object })
</script>

<template>
  <section
    v-editable="blok"
    :class="['featured-text', `bg-${blok.background}`, `text-${blok.text_color}`, `text-${blok.text_size}`]"
  >
    <div class="container">
      <p v-if="blok.text && !blok.animate_text" class="featured-text-content">
        {{ blok.text }}
      </p>
      <UtilAnimatedText
        v-else-if="blok.text && blok.animate_text"
        :id="blok._uid"
        :text="blok.text"
        :duration="1"
        class="featured-text-content animated"
      />
      <UtilRichText v-else :content="blok.rich_text" class="featured-text-content balanced" />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.featured-text {
  display: flex;
  background-size: cover;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 10vh 0;

  &-content {
    max-width: 1750px;
    text-align: center;
    font-size: var(--text-size);
    font-family: var(--font-headline);

    &.animated {
      margin: var(--spacer-9) 0;
    }

    &.balanced {
      text-wrap: balance;
    }
  }
}
</style>