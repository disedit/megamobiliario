<script setup>
const head = useLocaleHead({
  addDirAttribute: true,
  identifierAttribute: 'id',
  addSeoAttributes: true
})

useHead({
  htmlAttrs: { lang: head.value.htmlAttrs.lang, dir: head.value.htmlAttrs.dir },
  link: head.value.link,
  meta: head.value.meta
})
</script>

<template>
  <div>
    <NuxtLoadingIndicator :color="false" />
    <div class="page">
      <slot />
    </div>
  </div>
</template>

<style lang="scss">
.page {
  min-height: 100vh;
  min-height: 100svh;
}

.nuxt-loading-indicator {
  background: var(--black);
  top: 0;
}
</style>