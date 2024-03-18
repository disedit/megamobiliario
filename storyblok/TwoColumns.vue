<script setup>
defineProps({ blok: Object })
</script>

<template>
  <section
    v-editable="blok"
    :class="['two-columns', `color-${blok.color}`]"
  >
      <div class="container">
        <div class="two-columns-grid">
          <StoryblokComponent
            v-for="blok in blok.blocks"
            :key="blok._uid"
            :blok="blok"
          />
        </div>
      </div>
    </section>
</template>

<style lang="scss" scoped>
.two-columns {
  background: var(--bg-color);

  .container {
    width: fit-content;
  }

  :deep(.rich-text .container) {
    padding: 0;

    h3 {
      font-size: var(--text-lg);
      font-family: var(--font-headline);
      margin: 0;
      margin-bottom: var(--spacer-4);
    }

    p {
      font-family: var(--text-md);
    }
  }

  &-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: calc(var(--site-padding) * 2);
  }
}

@include media('<md') {
  .two-columns {
    .container {
      width: 100%;
    }

    &-grid {
      grid-template-columns: 1fr;
      gap: var(--site-padding);
    }
  }
}
</style>