<script setup>
const props = defineProps({
  blok: { type: Object, required: true },
  arrowOnHover: { type: Boolean, default: false },
  large: { type: Boolean, default: false }
})

/* Link */
const tag = computed(() => {
  return props.blok.link?.id ?
    props.blok.link.linktype === 'story' ? resolveComponent('NuxtLink') : 'a'
    : 'article'
})
const { internalLink } = useLinks()
const hasLink = computed(() => !!props.blok.link.id)

/* Date */
const date = useDate(props.blok.date)

/* Arrow on hover */
const hovering = ref(false)
const { x, y } = useMouse({ type: 'client' })
const computedArrowPosition = computed(() => {
  return {
    left: `${x.value}px`,
    top: `${y.value}px`
  }
})
</script>

<template>
  <component
    :is="tag"
    :href="blok.link?.linktype === 'url' ? blok.link?.cached_url : null"
    :to="blok.link?.linktype === 'story' ? internalLink(blok.link?.cached_url) : null"
    :target="blok.link?.target"
    :class="['picture', { 'arrow-on-hover': (arrowOnHover || blok.arrow_on_hover) && hasLink }]"
    v-editable="blok"
  >
    <div class="picture-thumbnail" @mouseenter="hovering = true" @mouseleave="hovering = false">
      <NuxtImg
        v-if="blok.picture?.filename"
        :src="blok.picture.filename"
        :alt="blok.picture.alt"
        :width="large ? 1500 : 750"
        :class="['picture-thumbnail-default', { 'dims': !blok.picture_hover?.filename && blok.link?.id, 'picture-desktop': !!blok.picture_sm?.filename }]"
        preload
      />
      <NuxtImg
        v-if="blok.picture_sm?.filename"
        :src="blok.picture_sm.filename"
        :alt="blok.picture.alt"
        :width="large ? 1500 : 750"
        :class="['picture-thumbnail-default picture-mobile', { 'dims': !blok.picture_hover?.filename && blok.link?.id }]"
        preload
      />
      <NuxtImg
        v-if="blok.picture_hover?.filename"
        :src="blok.picture_hover.filename"
        :alt="blok.picture_hover.alt"
        :width="large ? 1500 : 750"
        class="picture-thumbnail-hover"
        preload
      />
    </div>
    <h3 v-if="blok.title" :class="['picture-title', { 'visually-hidden': blok.details_sr_only }]">
      {{ blok.title }}
    </h3>
    <p v-if="blok.date" :class="['picture-date', { 'visually-hidden': blok.details_sr_only }]">
      {{ date.human }}
    </p>
    <p v-if="blok.text" :class="['picture-text', { 'visually-hidden': blok.details_sr_only }]">
      {{ blok.text }}
    </p>
    <Transition name="arrow">
      <div
        v-if="(arrowOnHover || blok.arrow_on_hover) && hasLink && hovering"
        class="picture-arrow"
        :style="computedArrowPosition"
        aria-hidden="true">
        <IconArrowLong />
      </div>
    </Transition>
  </component>
</template>

<style lang="scss" scoped>
  .picture {
    display: grid;
    grid-template-rows: subgrid;
    grid-row: span 4;
    gap: 0;
    text-decoration: none;

    &-thumbnail {
      display: flex;
      position: relative;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: .25s ease;
      }

      &-hover {
        position: absolute;
        inset: 0;
        opacity: 0;
      }
    }

    &-title {
      margin: 0;
      margin-top: var(--spacer-8);
      font-size: calc(var(--text-lg) * .75);
      font-family: var(--font-headline);
    }

    &-date {
      margin: 0;
      margin-top: var(--spacer-1);
      font-size: var(--text-sm);
    }

    &-text {
      margin: 0;
      margin-top: var(--spacer-4);
      font-size: var(--text-base);
      line-height: 1.1;
    }

    &-arrow {
      position: fixed;
      width: 8vw;
      z-index: 1000;
      pointer-events: none;
      transform: translate(-50%, -50%);
      transform-origin: top left;
      transition: opacity .25s ease;
      color: var(--white);

      svg {
        height: auto;
        width: 100%;
        transition: .25s ease;
      }
    }

    &:hover {
      .picture-thumbnail-hover {
        opacity: 1;
      }

      .picture-thumbnail-default.dims {
        opacity: .5;
      }
    }

    &:active {
      .picture-arrow svg {
        scale: .75;
      }
    }

    &.arrow-on-hover {
      .picture-thumbnail {
        cursor: none;
      }
    }
    
    &-desktop {
      display: block !important;
    }

    &-mobile {
      display: none !important;
    }
  }

  .aspect-11 {
    .picture-thumbnail img {
      aspect-ratio: 1;
    }
  }

  .arrow-enter-active,
  .arrow-leave-active {
    transition: opacity 0.5s ease;

    svg {
      translate: 0 0;
    }
  }

  .arrow-enter-from {
    opacity: 0;

    svg {
      translate: 0 -25%;
    }
  }

  .arrow-leave-to {
    opacity: 0;

    svg {
      translate: 0 25%;
    }
  }

  @include media('<lg') {
    .picture {
      &-thumbnail {
        img {
          height: var(--fixed-height-mobile, 100%);
        }
      }

      &-desktop {
        display: none !important;
      }

      &-mobile {
        display: block !important;
      }

      &:not(:last-child) {
        margin-bottom: var(--spacer-5);
      }

      &-title {
        margin: var(--spacer-5) 0 0;
      }
    }
  }

  @media (hover: none) {
    .picture-arrow {
      display: none;
    }
  }
</style>
