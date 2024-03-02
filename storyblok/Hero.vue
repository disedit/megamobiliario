<script setup>
defineProps({ blok: Object })
</script>

<template>
  <div
    v-editable="blok"
    class="container"
  >
   Hero: <pre>{{ blok.headline }}</pre>
  </div>
</template>
 
