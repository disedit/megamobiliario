<script setup>
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'

defineProps({ blok: Object })
</script>

<template>
  <div
    v-editable="blok"
    :class="['carousel-wrapper', `color-${blok.color}`, { 'full-width': blok.full_width }]"
  >
    <ClientOnly>
      <Carousel
        :items-to-show="1"
        :wrap-around="!!blok.infinite"
        :autoplay="blok.autoplay * 1000"
        :class="{ 'carousel-desktop': blok.pictures_sm?.length > 0 }">
        <Slide v-for="picture in blok.pictures" :key="picture._uid">
          <NuxtPicture
            v-if="picture.filename"
            format="avif,webp"
            :src="picture.filename"
            :img-attrs="{ alt: picture.alt, class: 'carousel__picture' }"
            sizes="100vw md:750px lg:1200px"
            preload
          />
        </Slide>

        <template #addons>
          <Navigation v-if="blok.show_nav_buttons" />
          <Pagination v-if="blok.show_pagination" />
        </template>
      </Carousel>
      <Carousel
        v-if="blok.pictures_sm?.length > 0"
        :items-to-show="1"
        :wrap-around="!!blok.infinite"
        :autoplay="blok.autoplay * 1000"
        class="carousel-mobile">
        <Slide v-for="picture in blok.pictures_sm" :key="picture._uid">
          <NuxtPicture
            v-if="picture.filename"
            format="avif,webp"
            :src="picture.filename"
            :img-attrs="{ alt: picture.alt, class: 'carousel__picture' }"
            sizes="100vw md:750px lg:1200px"
            preload
          />
        </Slide>

        <template #addons>
          <Navigation v-if="blok.show_nav_buttons" />
          <Pagination v-if="blok.show_pagination" />
        </template>
      </Carousel>
    </ClientOnly>
  </div>
</template>

<style lang="scss">
.carousel {
  --vc-clr-primary: var(--text-color);
  --vc-clr-secondary: var(--text-color);
  --vc-nav-color: var(--text-color);
  --vc-nav-color-hover: var(--text-color);
  --vc-pgn-background-color: var(--text-color);
  --vc-pgn-active-color: var(--text-color);
  --vc-icn-width: 5em;
  --vc-nav-width: 5rem;
  --vc-nav-height: 5rem;
  --vc-pgn-width: 15px;
  --vc-pgn-height: 7px;
  --vc-pgn-margin: 7px;
  position: realtive;
  background-color: var(--bg-color);

  &__picture {
    display: block;
    height: calc(100vh - var(--site-padding) * 2);
    height: calc(100svh - var(--site-padding) * 2);
    width: 100%;
    object-fit: cover;
  }

  &__track {
    margin: 0;
  }

  &__pagination {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: var(--site-padding);
  }

  &-mobile {
    display: none;
  }
}

@include media('<md') {
  .carousel-desktop {
    display: none;
  }

  .carousel-mobile {
    display: block;
  }
}

.full-width .carousel {
  --vc-clr-primary: var(--white);
  --vc-clr-secondary: #{rgba(#fff, .5)};
  --vc-nav-color: var(--white);
  --vc-nav-color-hover: #{rgba(#fff, .5)};
  --vc-pgn-background-color: #{rgba(#fff, .5)};
  --vc-pgn-active-color: var(--white);

  picture {
    width: 100%;
    background-color: var(--black);
  }

  &__picture {
    width: 100%;
  }
}
</style>