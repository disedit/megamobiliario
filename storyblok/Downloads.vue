<script setup>
const props = defineProps({ blok: Object })

/* Rudimentaly login system */
/* Security is not important here */
const accessAllowed = ref(false)
const showDownloads = computed(() => {
  const storedPassword = localStorage.getItem('downloads_pass')
  return storedPassword === props.blok.password || accessAllowed.value
})
</script>

<template>
  <div>
    <StoryblokComponent
      v-for="blok in blok.common"
      :key="blok._uid"
      :blok="blok"
    />
    <div v-if="!showDownloads">
      <DownloadsPassword
        :password="blok.password"
        @allowed="accessAllowed = true"
      />
      <StoryblokComponent
        v-for="blok in blok.pre_password"
        :key="blok._uid"
        :blok="blok"
      />
    </div>
    <div v-else>
      <StoryblokComponent
        v-for="blok in blok.downloads"
        :key="blok._uid"
        :blok="blok"
      />
    </div>
  </div>
</template>
