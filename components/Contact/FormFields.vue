<script setup>
const submitting = ref(false)
const submitted = ref(false)
const error = ref(false)

const form = reactive({
  name: '',
  email: '',
  message: ''
})

const submit = async () => {
  submitting.value = true

  try {
    const formData = new FormData()
    formData.append('name', form.name)
    formData.append('email', form.email)
    formData.append('message', form.message)

    await fetch('https://services.disedit.com/api/megamobiliario/contact', {
        method: 'post',
        body: formData,
    })

    submitted.value = true
  } catch(e) {
    error.value = true
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <div>
    <label>Name</label>
    <input type="text" v-model="form.name" />
  </div>
</template>

<style>

</style>