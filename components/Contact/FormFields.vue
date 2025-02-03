<script setup>
defineProps({
  submittedText: { type: String, required: true },
  legal: { type: String, required: true },
})

const submitting = ref(false)
const submitted = ref(false)
const error = ref(false)

const form = reactive({
  name: '',
  city: '',
  country: 'ES',
  email: '',
  message: '',
  company: ''
})

const submit = async () => {
  submitting.value = true

  try {
    const formData = new FormData()
    formData.append('name', form.name)
    formData.append('city', form.city)
    formData.append('country', form.country)
    formData.append('email', form.email)
    formData.append('message', form.message)
    formData.append('company', form.company)

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
    :class="['contact-form', { submitting }]"
  >
    <FormInput
      name="name"
      :label="$t('fields.name')"
      required
      v-model="form.name"
      class="field-spans-2"
    />
    <FormInput
      name="city"
      :label="$t('fields.city')"
      required
      v-model="form.city"
    />
    <FormCountrySelect
      name="country"
      :label="$t('fields.country')"
      required
      v-model="form.country"
    />
    <FormInput
      name="email"
      :label="$t('fields.email')"
      type="email"
      required
      v-model="form.email"
      class="field-spans-2"
    />
    <FormInput
      name="company"
      :label="$t('fields.company')"
      v-model="form.company"
      class="visually-hidden"
    />
    <FormTextarea
      name="message"
      :label="$t('fields.message')"
      required
      v-model="form.message"
      class="field-spans-2"
    />
    <div class="contact-form-gdpr field-spans-2">
      <div class="contact-form-legal">
        <UtilMarked :content="legal" />
      </div>
      <label class="checkbox-label">
        <input
          type="checkbox"
          name="MMERGE3"
          value="I have read and agree to the Terms and Conditions."
          class="checkbox-input"
          required
        />
        <span>
          {{ $t('fields.data_processing') }}
        </span>
      </label>
    </div>
    <div class="contact-form-actions field-spans-2">
      <FormButton
        :loading="submitting"
        type="submit"
      >
        {{ $t('fields.submit') }}
      </FormButton>
    </div>
  </form>
  <div v-else-if="error" class="contact-form-message">
    <div class="field-spans-2">
      {{ $t('fields.error') }}
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

  &-message {
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

  &-gdpr {
    font-size: var(--text-base);
    margin-bottom: var(--spacer-4);
  }

  &-legal {
    font-size: var(--text-sm);
    margin-bottom: var(--spacer-6);
  }

  &.submitting {
    opacity: .5;
  }
}

.checkbox-input {
  background-color: var(--brown);
  color: var(--white);
  border-color: var(--white);

  &::before {
    box-shadow: inset 1em 1em var(--white);
  }
}

.field-spans-2 {
  grid-column: span 2;
}

@include media-gt-lg {
  .contact-form {
    &-legal {
      display: none;
    }
  }
}
</style>