<template>
  <div>
    <SiteNav />
    <main class="error-page">
      <h1>Error 404</h1>
    </main>
    <SiteFooter />
  </div>
</template>

<style lang="scss">
.error-page {
  min-height: 100vh;
  min-height: 100svh;
  display: grid;
  place-items: center;

  h1 {
    font-family: var(--font-headline);
    font-weight: 900;
    font-size: var(--text-xxl);
  }
}
</style>