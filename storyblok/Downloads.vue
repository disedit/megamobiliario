<script setup>
const props = defineProps({ blok: Object })

/* Rudimentaly login system */
/* Security is not important here */
const accessAllowed = ref(false)
const showDownloads = computed(() => {
  const storedPassword = (typeof localStorage !== 'undefined') ? localStorage.getItem('downloads_pass') : false
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
        v-for="component in blok.pre_password"
        :key="component._uid"
        :blok="component"
        :password="blok.password"
      />
    </div>
    <div v-else>
      <StoryblokComponent
        v-for="component in blok.downloads"
        :key="component._uid"
        :blok="component"
      />
    </div>
  </div>
</template>
