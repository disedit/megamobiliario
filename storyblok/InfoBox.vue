<script setup>
const props = defineProps({ blok: Object })

const tag = computed(() => {
  return props.blok.link?.cached_url ?
    props.blok.link.linktype === 'story' ? resolveComponent('NuxtLink') : 'a'
    : 'div'
})
</script>

<template>
  <article
    v-editable="blok"
    :class="['info-box', `color-${blok.color}`, `align-${blok.align}`]"
  >
    <component
      :is="tag"
      :href="blok.link?.linktype === 'url' ? blok.link?.cached_url : null"
      :to="blok.link?.linktype === 'story' ? blok.link?.cached_url : null"
      :target="blok.link?.target">
      <div class="container">
        <div class="info-box-grid">
          <div class="info-box-content">
            <p v-if="blok.overtitle" class="info-box-overtitle">
              {{ blok.overtitle }}
            </p>
            <h2 v-if="blok.title" class="info-box-title">
              <span class="hover-underline">{{ blok.title }}</span>
            </h2>
            <div v-if="blok.text" class="info-box-text">
              <UtilMarked :content="blok.text" />
            </div>
          </div>
          <div v-if="blok.thumbnail?.filename" class="info-box-picture">
            <NuxtImg
              :src="blok.thumbnail.filename"
              :alt="blok.thumbnail.alt"
            />
          </div>
        </div>
      </div>
    </component>
  </article>
</template>

<style lang="scss" scoped>
.info-box {
  background-color: var(--bg-color);
  color: var(--text-color);

  a {
    text-decoration: none;

    .hover-underline {
      position: relative;

      &::before {
        content: '';
        position: absolute;
        height: 2px;
        background: currentColor;
        left: 0;
        right: 0;
        bottom: -.25rem;
        transform: scaleX(0);
        transition: .25s ease;
        transform-origin: left;
      }
    }

    &:hover {
      .hover-underline::before {
        transform: scaleX(1);
      }
    }
  }

  .container {
    padding: calc(var(--site-padding) + var(--spacer-2)) var(--site-padding);
  }

  &-grid {
    display: grid;
    grid-template-columns: 5fr 1fr;
    gap: var(--site-padding);
    grid-template-areas: "content picture";
  }

  &-content {
    grid-area: content;
    align-self: center;
  }

  &-overtitle {
    margin: 0;
    margin-bottom: var(--spacer-2);
    font-size: var(--text-md);
  }

  &-title {
    margin: 0;
    margin-bottom: var(--spacer-8);
    font-size: var(--text-lg);
    font-family: var(--font-headline);
  }

  &-text {
    max-width: 50ch;
    line-height: 1.25;
  }

  &-picture {
    grid-area: picture;
    display: flex;

    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &.align-right {
    .info-box-grid {
      grid-template-columns: 1fr 5fr;
      grid-template-areas: "picture content";
    }

    .info-box-content {
      margin-left: auto;
    }

    .info-box-text {
      text-wrap: initial;
    }
  }
}

@include media('<sm') {
  .info-box {
    &-grid {
      grid-template-columns: 1fr;
      grid-template-areas: "picture" "content";
    }

    &.align-right {
      .info-box-grid {
        grid-template-columns: 1fr;
        grid-template-areas: "picture" "content";
      }

      .info-box-content {
        margin-left: auto;
      }

      .info-box-text {
        text-wrap: initial;
      }
    }
  }
}
</style>