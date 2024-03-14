<script setup>
const config = await useConfig()
</script>

<template>
  <footer class="footer">
    <div class="container">
      Footer
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  background-color: var(--lightgray);
  font-size: var(--text-base);
}
</style>