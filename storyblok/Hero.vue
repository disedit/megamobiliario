<script setup>
const props = defineProps({ blok: Object })

const img = useImage()
const backgroundStyle = computed(() => {
  if (!props.blok.background_image?.filename) return null
  const imgUrl = img(props.blok.background_image.filename)
  return { backgroundImage: `url('${imgUrl}')` }
})
</script>

<template>
  <section
    v-editable="blok"
    :class="[
      'hero', `bg-${blok.color}`, `text-${blok.text_color}`,
      { 'full-height': blok.full_height, 'large-heading': blok.large_heading, 'has-arrow': blok.show_arrow }
    ]"
    :style="backgroundStyle">
    <h1 v-if="blok.heading" class="hero-heading">
      <div class="hero-heading-content">{{ blok.heading }}</div>
    </h1>
    <p v-if="blok.subheading" class="hero-subheading">
      {{ blok.subheading }}
    </p>
    <div v-if="blok.show_arrow" class="hero-arrow">
      <IconArrowDown />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.hero {
  display: flex;
  background: $blue;
  background-size: cover;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;
  padding: calc(var(--navbar-safe-area) + var(--spacer-4) + 15vh) var(--site-padding) calc(var(--spacer-4) + 15vh) var(--site-padding);
  font-size: var(--text-xxl);

  &.full-height {
    min-height: 100vh;
    min-height: 100svh;
    padding-top: calc(var(--navbar-safe-area) + 15vh);
    padding-bottom: calc(var(--navbar-safe-area) + 15vh);
  }

  &.large-heading {
    font-size: var(--text-xxxl);
  }

  &.has-arrow:not(.full-height) {
    padding-bottom: calc(3rem + var(--spacer-4) + 15vh);
  }

  &-heading {
    font-family: var(--font-headline);
    font-weight: bold;
    letter-spacing: -.02em;
    margin: 0;
    font-size: inherit;
    text-align: center;
    line-height: 1.1;
    text-wrap: balance;

    &-content {
      white-space: pre-wrap;
    }
  }

  &-subheading {
    font-size: var(--text-lg);
    margin: 0;
    margin-top: .5em;
  }

  &-arrow {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    font-size: 1rem;
    display: flex;
    justify-content: center;
    padding: var(--site-padding);

    svg {
      height: 2.5rem;
      width: auto;
    }
  }
}
</style>