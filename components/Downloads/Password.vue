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
  <section class="downloads-password">
    <div class="container">
      <form @submit.prevent="checkPassword" class="downloads-password-form">
        <div>
          <label for="password" class="visually-hidden">
            {{ $t('password.label') }}
          </label>
          <input
            ref="passwordInput"
            type="password"
            id="password"
            class="downloads-password-input"
            v-model="password"
            :placeholder="$t('password.label')"
            :aria-describedby="error ? 'passwordError' : false"
            required
          />
        </div>
        <div class="downloads-password-col">
          <button type="submit" class="downloads-password-button">
            <IconArrowRight />
            <span class="visually-hidden">{{ $t('password.button') }}</span>
          </button>
        </div>
        <div class="downloads-password-error" v-if="error" id="passwordError">
          {{ $t('password.error') }}
        </div>
      </form>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.downloads-password {
  .container {
    max-width: 1500px;
  }

  &-form {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: var(--spacer-12);
  }

  &-input {
    appearance: none;
    border: 1.5px var(--beige) solid;
    font-family: var(--font-headline);
    color: var(--beige);
    font-size: var(--text-lg);
    padding: var(--spacer-4) var(--spacer-6);
    width: 100%;

    &::placeholder {
      color: var(--beige);
      text-transform: uppercase;
    }

    &:focus {
      outline: 0;
      box-shadow: 0 0 0 .1rem var(--beige);
    }
  }

  &-button {
    appearance: none;
    background: transparent;
    border: 0;
    color: var(--blue);
    cursor: pointer;
    transition: .25s ease;

    &:hover {
      opacity: .5;
    }

    svg {
      height: 2em;
    }
  }

  &-error {
    background: var(--beige);
    font-size: var(--text-base);
    padding: var(--spacer-4) var(--spacer-6);
  }

  &-col {
    display: flex;
    align-items: center;
  }
}

@include media-lt-md {
  .downloads-password {
    &-form {
      grid-template-columns: 1fr auto;
      gap: var(--spacer-4);
    }
  }
}
</style>