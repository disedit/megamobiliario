<script setup>
const localePath = useLocalePath()
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
</script>

<template>
  <ul class="language">
    <li v-for="lang in locales" :key="lang">
      <NuxtLink :to="switchLocalePath(lang.code)" :title="lang.name">
        {{ lang.code }}
      </NuxtLink>
    </li>
  </ul>
</template>
 
<style lang="scss" scoped>
.language {
  display: flex;
  list-style: none;
  text-transform: uppercase;

  li:first-child::after {
    content: ' / ';
  }
}
</style>