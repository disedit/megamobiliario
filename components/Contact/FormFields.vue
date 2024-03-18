<script setup>
defineProps({
  submittedText: { type: String, required: true }
})

const submitting = ref(false)
const submitted = ref(false)
const error = ref(false)

const form = reactive({
  name: '',
  city: '',
  country: '',
  email: '',
  message: ''
})

const submit = async () => {
  submitting.value = true

  try {
    const formData = new FormData()
    formData.append('name', form.name)
    formData.append('city', form.name)
    formData.append('country', form.name)
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
  <form
    v-if="!submitted"
    @submit.prevent="submit"
    class="contact-form"
  >
    <FormInput
      name="name"
      :label="$t('contact.name')"
      required
      v-model="form.name"
      class="field-spans-2"
    />
    <FormInput
      name="city"
      :label="$t('contact.city')"
      required
      v-model="form.city"
    />
    <FormInput
      name="country"
      :label="$t('contact.country')"
      required
      v-model="form.country"
    />
    <FormInput
      name="email"
      :label="$t('contact.email')"
      type="email"
      required
      v-model="form.email"
      class="field-spans-2"
    />
    <FormTextarea
      name="message"
      :label="$t('contact.message')"
      required
      v-model="form.message"
      class="field-spans-2"
    />
    <div class="contact-form-actions field-spans-2">
      <FormButton
        :loading="submitting"
        type="submit"
      >
        {{ $t('contact.submit') }}
      </FormButton>
    </div>
  </form>
  <div v-else-if="error" class="contact-form-message">
    <div class="field-spans-2">
      {{ $t('contact.error') }}
    </div>
  </div>
  <div v-else class="contact-form-message">
    <UtilMarked :content="submittedText" class="field-spans-2" />
  </div>
</template>

<style lang="scss" scoped>
.contact-form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacer-4);

  &-actions {
    text-align: right;
  }

  &-submitted {
    border: 1.5px var(--white) solid;
    padding: var(--spacer-6);

    :deep(p) {
      margin: 0;
      margin-bottom: var(--spacer-3);
    }

    :deep(p:last-child) {
      margin-bottom: 0;
    }
  }
}

.field-spans-2 {
  grid-column: span 2;
}
</style>