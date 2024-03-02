<script setup>
const localePath = useLocalePath()
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
 
const availableLocales = computed(() => {
  return (locales.value).filter(i => i.code !== locale.value)
})
</script>

<template>
  <ul>
    <li v-for="lang in availableLocales" :key="lang">
      <NuxtLink :to="switchLocalePath(lang.code)">
        {{ lang.name }}
      </NuxtLink>
    </li>
  </ul>
</template>
 
 