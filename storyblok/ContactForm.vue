<script setup>
defineProps({ blok: Object })
</script>

<template>
  <section v-editable="blok" :class="['contact', `color-${blok.color}`]">
      <div class="container">
        <h2 class="contact-heading">{{ blok.headline }}</h2>
        <div class="contact-grid">
          <div class="contact-text">          
            <p>{{ blok.text }}</p>
          </div>
          <ContactFormFields class="contact-form" :submitted-text="blok.text_on_submitted" />
        </div>
      </div>
    </section>
</template>

<style lang="scss" scoped>
.contact {
  background: var(--bg-color);
  color: var(--text-color);

  .container {
    max-width: 1500px;
    padding: var(--spacer-16) 0;
  }

  &-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--site-padding);
  }

  &-heading {
    font-family: var(--font-headline);
    text-align: center;
    font-weight: bold;
    letter-spacing: -0.02em;
    margin: 0;
    font-size: var(--text-xxl);
    line-height: 1.1;
    margin-bottom: var(--spacer-12);
  }

  &-text {
    max-width: 50ch;
    line-height: 1.5;

    p {
      margin: 0;
    }
  }
}

@include media('<lg') {
  .contact {
    &-grid {
      grid-template-columns: 1fr;
    }
  }
}
</style>