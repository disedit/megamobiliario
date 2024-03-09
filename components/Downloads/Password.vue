<script setup>
const props = defineProps({
  password: { type: String, required: true }
})

const emit = defineEmits(['allowed'])
const password = ref('')
const passwordInput = ref(null)
const error = ref(false)

function checkPassword () {
  if (password.value === props.password) {
    emit('allowed', true)
    localStorage.setItem('downloads_pass', props.password)
  } else {
    error.value = true
    password.value = ''
    passwordInput.value.focus()
  }
}
</script>

<template>
  <form @submit.prevent="checkPassword">
    <div class="error" v-if="error">
      {{ $t('password.error') }}
    </div>
    <label for="password">
      {{ $t('password.label') }}
    </label>
    <input
      ref="passwordInput"
      type="password"
      id="password"
      v-model="password"
      required />
    <button type="submit">
      {{ $t('password.button') }}
    </button>
  </form>
</template>

<style>

</style>