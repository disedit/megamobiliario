<script setup>
const props = defineProps({ blok: Object })

/* Link */
const tag = computed(() => {
  return props.blok.link?.cached_url ?
    props.blok.link.linktype === 'story' ? resolveComponent('NuxtLink') : 'a'
    : 'article'
})
const { internalLink } = useLinks()

/* Date */
const date = useDate(props.blok.date)

/* Arrow on hover */
const target = ref(null)
const { isOutside } = useMouseInElement(target)
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
    :class="['picture', { 'arrow-on-hover': blok.arrow_on_hover }]"
    v-editable="blok"
  >
    <div class="picture-thumbnail" ref="target">
      <NuxtImg
        v-if="blok.picture?.filename"
        :src="blok.picture.filename"
        :alt="blok.picture.alt"
        :class="['picture-thumbnail-default', { 'dims': !blok.picture_hover?.filename }]"
      />
      <NuxtImg
        v-if="blok.picture_hover?.filename"
        :src="blok.picture_hover.filename"
        :alt="blok.picture_hover.alt"
        class="picture-thumbnail-hover"
      />
    </div>
    <h3 v-if="blok.title" class="picture-title">
      {{ blok.title }}
    </h3>
    <p v-if="blok.date" class="picture-date">
      {{ date.human }}
    </p>
    <p v-if="blok.text" class="picture-text">
      {{ blok.text }}
    </p>
    <Transition name="arrow">
      <div
        v-if="blok.arrow_on_hover && !isOutside"
        class="picture-arrow"
        :style="computedArrowPosition"
        aria-hidden="true">
        <IconArrowDown />
      </div>
    </Transition>
  </component>
</template>

<style lang="scss" scoped>
  .picture {
    display: grid;
    grid-template-rows: subgrid;
    grid-row: span 4;
    gap: var(--spacer-2);
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
      margin-top: var(--spacer-6);
      font-size: var(--text-lg);
      font-family: var(--font-headline);
    }

    &-date {
      margin: 0;
      font-size: var(--text-base);
    }

    &-text {
      margin: 0;
      font-size: var(--text-md);
      line-height: 1.1;
    }

    &-arrow {
      position: fixed;
      width: 8vw;
      z-index: 1000;
      pointer-events: none;
      transform: rotate(-90deg) translate(-50%, -50%);
      transform-origin: top left;
      transition: opacity .25s ease;

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
</style>