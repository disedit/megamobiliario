<script setup>defineProps({ blok: Object })
</script>

<template>
  <section
    v-editable="blok"
    :class="[
      'two-column-pictures', `bg-${blok.background_color}`, `text-${blok.text_color}`,
      { 'full-height': blok.full_height }
    ]"
  >
      <div class="container">
        <div class="two-column-pictures-grid">
          <div class="column-picture left-column-picture">
            <NuxtPicture
              v-if="blok.left_column_picture?.filename"
              format="avif,webp"
              :src="blok.left_column_picture.filename"
              :img-attrs="{ alt: blok.left_column_picture.alt }"
              placeholder
            />
          </div>
          <div
            v-if="blok.right_column_text"
            :class="[
              'column-text', `text-${blok.text_size}`,
              { 'md:hidden': blok.hide_right_column_on_mobile }
            ]"
          >
            {{ blok.right_column_text }}
          </div>
          <div
            v-else-if="blok.right_column_picture?.filename"
            :class="[
              'column-picture', 'right-column-picture',
              { 'md:hidden': blok.hide_right_column_on_mobile }
            ]"
          >
            <NuxtPicture
              format="avif,webp"
              :src="blok.right_column_picture.filename"
              :img-attrs="{ alt: blok.right_column_picture.alt }"
              placeholder
            />
          </div>
        </div>
      </div>
    </section>
</template>

<style lang="scss" scoped>
.two-column-pictures {
  padding: var(--spacer-6) 0;

  &-grid {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: var(--spacer-8);
  }

  .column-picture {
    :deep(img) {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .column-text {
    display: flex;
    font-weight: bold;
    font-family: var(--font-headline);
    font-size: var(--text-size);
    line-height: 1;
    align-items: end;
    white-space: pre-wrap;
  }

  &.full-height {
    .column-picture :deep(img) {
      height: calc(100vh - var(--site-padding) * 2 - var(--spacer-6) * 2);
    }
  }
}

@include media('<md') {
  .two-column-pictures {
    &-grid {
      grid-template-columns: 1fr;
    }
  }
}
</style>