<script setup>defineProps({ blok: Object })
</script>

<template>
  <section
    v-editable="blok"
    :class="[
      'two-column-pictures', `bg-${blok.background_color}`, `text-${blok.text_color}`,
      { 'full-height': blok.full_height, 'invert': blok.invert, 'even-columns': blok.even_columns }
    ]"
  >
      <div class="container">
        <div class="two-column-pictures-grid">
          <div class="column-picture left-column-picture">
            <NuxtPicture
              v-if="blok.left_column_picture?.filename"
              format="avif,webp"
              :src="blok.left_column_picture.filename"
              sizes="100vw md:500px lg:900px"
              :img-attrs="{ alt: blok.left_column_picture.alt }"
              preload
            />
          </div>
          <div
            v-if="blok.right_column_block.length > 0"
            :class="[
              'column-blocks',
              { 'md:hidden': blok.hide_right_column_on_mobile }
            ]"
          >
            <StoryblokComponent :blok="blok.right_column_block[0]" />
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
              sizes="100vw md:350px lg:500px"
              preload
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

  .column-blocks {
    display: flex;
    padding-right: var(--spacer-4);
  }

  &.full-height {
    .column-picture :deep(img) {
      height: calc(100vh - var(--site-padding) * 2 - var(--spacer-6) * 2);
    }
  }

  &.invert {
    .two-column-pictures-grid {
      grid-template-columns: 1fr 2fr;
    }

    .left-column-picture {
      grid-column: 2;
      grid-row: 1;
    }
    
    .right-column-picture,
    .right-column-text {
      grid-column: 1;
      grid-row: 1;
    }
  }
}

@include media-gt-md {
  .two-column-pictures.even-columns {
    .two-column-pictures-grid {
      grid-template-columns: 1fr 1fr;
    }
  }
}

@include media-lt-md {
  .two-column-pictures {
    &-grid {
      grid-template-columns: 1fr;
    }

    &.invert {
      .two-column-pictures-grid {
        grid-template-columns: 1fr;

        .left-column-picture {
          grid-column: 1;
          grid-row: 1;
        }
        
        .right-column-picture,
        .right-column-text {
          grid-column: 1;
          grid-row: 2;
        }
      }
    }
  }
}
</style>