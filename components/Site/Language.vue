<script setup>
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const emit = defineEmits(['change'])
</script>

<template>
  <ul class="language" aria-label="Idioma / Language">
    <li v-for="lang in locales" :key="lang">
      <SiteUnderlinedLink
        :to="switchLocalePath(lang.code)"
        :title="lang.name"
        :class="{ 'active': locale === lang.code }"
        @click="emit('change')"
      >
        {{ lang.code }}
      </SiteUnderlinedLink>
    </li>
  </ul>
</template>
 
<style lang="scss" scoped>
.language {
  display: flex;
  list-style: none;
  text-transform: uppercase;

  li:first-child::after {
    content: '/';
    margin: 0 .25rem;
  }
  
  a {
    text-decoration: none;

    &.active {
      font-weight: 900;
    }
  }
}
</style>