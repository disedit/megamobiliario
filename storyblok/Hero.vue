<script setup>
const props = defineProps({ blok: Object })

const { y: scrollY } = useWindowScroll()

function scrollPage () {
  scrollY.value = window.innerHeight
}
</script>

<template>
  <section
    v-editable="blok"
    :class="[
      'hero', `bg-${blok.color}`, `text-${blok.text_color}`,
      { 'full-height': blok.full_height, 'large-heading': blok.large_heading, 'has-arrow': blok.show_arrow }
    ]"
    :style="{
      '--background-align': blok.background_align,
      '--background-align-mobile': blok.background_align_mobile
    }"
  >
    <h1 v-if="blok.heading" class="hero-heading">
      <div
        v-if="!blok.animate_text"
        class="hero-heading-content"
      >
        {{ blok.heading }}
      </div>
      <UtilAnimatedText
        v-else
        :id="blok._uid"
        :text="blok.heading"
        class="hero-heading-animated"
      />
    </h1>
    <p v-if="blok.subheading" class="hero-subheading">
      {{ blok.subheading }}
    </p>
    <div v-if="blok.show_arrow" class="hero-arrow" aria-hidden="true">
      <button @click="scrollPage">
        <IconArrowDown />
      </button>
    </div>
    <div class="hero-background">
      <NuxtImg
        v-if="blok.background_image?.filename"
        :src="blok.background_image.filename"
        :img-attrs="{ alt: blok.background_image.alt, class: 'hero-background-img hero-background-img-desktop' }"
        sizes="900px md:1300px xl:1750px"
        preload
      />
      <NuxtImg
        v-if="blok.background_image_sm?.filename"
        :src="blok.background_image_sm.filename"
        :img-attrs="{ alt: blok.background_image_sm.alt, class: 'hero-background-img hero-background-img-mobile' }"
        sizes="900px"
        preload
      />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.hero {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;
  padding: calc(var(--navbar-safe-area) + var(--spacer-4) + 6vh) var(--site-padding) calc(var(--spacer-4) + 5vh) var(--site-padding);
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
    position: relative;
    font-family: var(--font-headline);
    font-weight: bold;
    letter-spacing: -.02em;
    margin: 0;
    font-size: inherit;
    text-align: center;
    line-height: 1.1;
    text-wrap: balance;
    z-index: 10;

    &-content {
      white-space: pre-wrap;
    }
  }

  &-subheading {
    position: relative;
    font-size: var(--text-lg);
    margin: 0;
    margin-top: .25em;
    text-align: center;
    z-index: 10;
  }

  &-background {
    display: flex;
    position: absolute;
    pointer-events: none;
    inset: 0;
    z-index: 1;

    :deep(picture) {
      display: flex;
      width: 100%;
      height: 100%;
    }

    :deep(img) {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: var(--background-align, center);
    }

    &-img-desktop {
      display: block;
    }

    &-img-mobile {
      display: none;
    }
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
    animation: arrow 3s infinite;
    z-index: 2;

    svg {
      height: 2.5rem;
      width: auto;
    }

    button {
      appearance: none;
      background: transparent;
      border: 0;
      color: inherit;
      cursor: pointer;
    }
  }
}

@include media('<md') {
  .hero {
    &-subheading {
      font-size: var(--text-md);
      margin-top: var(--spacer-4);
    }

    &-background {
      :deep(img) {
        object-position: var(--background-align-mobile, center);
      }

      &-img-desktop {
        display: none;
      }

      &-img-mobile {
        display: block;
      }
    }
  }
}

@keyframes arrow {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(20%);
  }
  100% {
    transform: translateY(0);
  }
}
</style>