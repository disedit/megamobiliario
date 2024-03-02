<script setup>
defineProps({ blok: Object })
</script>

<template>
  <div v-editable="blok">
    <h3>Contact</h3>
    <pre>{{ blok.headline }}</pre>
  </div>
</template>
