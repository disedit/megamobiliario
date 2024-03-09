<script setup>
const localePath = useLocalePath()
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
</script>

<template>
  <ul class="language">
    <li v-for="lang in locales" :key="lang">
      <SiteUnderlinedLink
        :to="switchLocalePath(lang.code)"
        :title="lang.name"
        :class="{ 'active': locale === lang.code }"
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