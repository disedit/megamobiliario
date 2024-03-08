<script setup>defineProps({ blok: Object })
</script>

<template>
  <section
    v-editable="blok"
    :class="['text', `color-${blok.color}`]"
  >
      <div class="container">
        <div class="text-front">
          <h2 v-if="blok.heading" class="text-heading">
            {{ blok.heading }}
          </h2>
          <p v-if="blok.subheading" class="text-subheading">
            {{ blok.subheading }}
          </p>
        </div>
        <div class="text-grid">
          <div class="text-content">
            <UtilMarked v-if="blok.text" :content="blok.text" />
          </div>
          <div v-if="blok.details" class="text-details">
            <UtilMarked :content="blok.details" />
          </div>
        </div>
      </div>
    </section>
</template>

<style lang="scss" scoped>
.text {
  background-color: var(--bg-color);
  color: var(--text-color);
  padding: var(--spacer-6) 0;

  &-grid {
    display: grid;
    grid-template-columns: 3fr 1fr;
    gap: var(--site-padding);
  }

  &-content,
  &-front {
    max-width: 60ch;
  }

  &-heading {
    margin: 0;
    margin-bottom: var(--spacer-1);
    line-height: 1;
    font-size: var(--text-lg);
  }

  &-subheading {
    font-size: var(--text-base);
    margin-top: var(--spacer-4);
    margin-bottom: var(--spacer-8);
  }

  &-content {
    font-size: var(--text-md);

    :deep(p) {
      margin: 0;
      margin-bottom: var(--spacer-6);
      line-height: 1.25;
    }

    :deep(p:last-child) {
      margin-bottom: 0;
    }
  }

  &-details {
    font-size: var(--text-md);

    :deep(ul) {
      margin: 0;
      padding: 0;
      list-style-type: none;

      li {
        margin-bottom: var(--spacer-2);
        line-height: 1;
      }
    }
  }
}

@include media('<md') {
  .text-grid {
    grid-template-columns: 1fr;
  }
}
</style>