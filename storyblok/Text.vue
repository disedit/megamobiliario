<script setup>
const props = defineProps({ blok: Object })
const date = useDate(props.blok.date)
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
          <p v-if="blok.subheading || blok.date" class="text-subheading">
            {{ date.human }} {{ blok.subheading }}
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
    margin-bottom: var(--spacer-8);
    line-height: 1.1;
    font-size: var(--text-lg);
    font-family: var(--font-headline);

    & + .text-subheading {
      margin-top: calc(var(--spacer-5) * -1);
    }
  }

  &-subheading {
    font-size: var(--text-base);
    margin-bottom: var(--spacer-8);
  }

  &-content {
    font-size: var(--text-md);

    :deep(p) {
      margin: 0;
      margin-bottom: var(--spacer-6);
      line-height: 1.5;
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

    :deep(p) {
      margin-top: 0;
    }
  }
}

.legoable .text,
.legoable .text .container {
  padding-left: 0;
  padding-right: 0;
  padding-top: 0;
}

@include media-lt-md {
  .text-grid {
    grid-template-columns: 1fr;
  }
}
</style>