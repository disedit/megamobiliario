<template>
  <div>
    <NuxtLoadingIndicator :color="false" />
    <div class="page">
      <slot />
    </div>
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