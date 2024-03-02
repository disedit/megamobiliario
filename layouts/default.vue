<template>
  <div>
    <NuxtLoadingIndicator :color="false" />
    <SiteNav />
    <slot />
    <SiteFooter />
  </div>
</template>

<style lang="scss">
.page {
  min-height: calc(100vh - var(--navbar-safe-area));
}

.nuxt-loading-indicator {
  background: var(--primary);
  top: var(--navbar-safe-area) !important;
}
</style>