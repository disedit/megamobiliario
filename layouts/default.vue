<script setup>
const head = useLocaleHead({
  addDirAttribute: true,
  identifierAttribute: 'id',
  addSeoAttributes: true
})
</script>

<template>
  <div>
    <Html :lang="head.htmlAttrs.lang" :dir="head.htmlAttrs.dir" />
    <NuxtLoadingIndicator :color="false" />
    <div class="page">
      <slot />
    </div>
    <SiteFooter />
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