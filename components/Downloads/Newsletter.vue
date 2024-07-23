<script setup>
const props = defineProps({
  privacyPolicy: { type: Object, required: true },
  submittedText: { type: Object, required: true },
  password: { type: String, required: true }
})

const submitting = ref(false)
const submitted = ref(false)
const error = ref(false)

const form = reactive({
  first_name: '',
  last_name: '',
  company: '',
  role: '',
  city: '',
  country: 'ES',
  email: '',
  privacy: false,
  message: ''
})

const submit = async () => {
  submitting.value = true

  try {
    const formData = new FormData()
    formData.append('first_name', form.first_name)
    formData.append('last_name', form.last_name)
    formData.append('company', form.company)
    formData.append('role', form.role)
    formData.append('city', form.city)
    formData.append('country', form.country)
    formData.append('email', form.email)
    formData.append('message', form.message)
    formData.append('password', props.password)

    await fetch('https://services.disedit.com/api/megamobiliario/register', {
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
    :class="['downloads-form', { submitting }]"
  >
    <FormInput
      name="first_name"
      :label="$t('fields.first_name')"
      required
      variant="beige"
      v-model="form.first_name"
    />
    <FormInput
      name="last_name"
      :label="$t('fields.last_name')"
      required
      variant="beige"
      v-model="form.last_name"
    />
    <FormInput
      name="company"
      :label="$t('fields.company')"
      required
      variant="beige"
      v-model="form.company"
    />
    <FormInput
      name="role"
      :label="$t('fields.role')"
      required
      variant="beige"
      v-model="form.role"
    />
    <FormInput
      name="city"
      :label="$t('fields.city')"
      required
      variant="beige"
      v-model="form.city"
    />
    <FormCountrySelect
      name="country"
      :label="$t('fields.country')"
      required
      variant="beige"
      v-model="form.country"
    />
    <FormInput
      name="email"
      :label="$t('fields.email')"
      type="email"
      required
      class="field-spans-2"
      variant="beige"
      v-model="form.email"
    />
    <FormTextarea
      name="message"
      :label="$t('fields.message')"
      v-model="form.message"
      class="visually-hidden"
    />
    <div class="downloads-form-gdpr field-spans-2">
      <label class="checkbox-label">
        <input
          type="checkbox"
          name="MMERGE3"
          value="I have read and agree to the Terms and Conditions."
          class="checkbox-input"
          required
        />
        <span>
          {{ $t('fields.privacy_before') }}
          <a :href="privacyPolicy.cached_url" target="_blank" class="link-black-underlined terms">
            {{ $t('fields.privacy_policy') }}
          </a>
          {{ $t('fields.privacy_after') }}
        </span>
      </label>
    </div>
    <div class="downloads-form-actions field-spans-2">
      <FormButton type="submit" variant="blue">
        {{ $t('fields.signup') }}
      </FormButton>
    </div>
  </form>
  <div v-else class="downloads-form-message">
    <UtilRichText :content="submittedText" class="field-spans-2" />
  </div>
</template>

<style lang="scss">
.downloads-form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacer-4);

  &-gdpr {
    font-size: var(--text-base);
    margin-bottom: var(--spacer-4);
  }

  &-message {
    border: 1.5px var(--beige) solid;
    padding: var(--spacer-6);

    :deep(p) {
      margin: 0;
      margin-bottom: var(--spacer-3);
    }

    :deep(p:last-child) {
      margin-bottom: 0;
    }
  }

  &.submitting {
    opacity: .5;
  }
}

.field-spans-2 {
  grid-column: span 2;
}

@include media('<md') {
  .downloads-form {
    grid-template-columns: 1fr;
  }

  .field-spans-2 {
    grid-column: span 1;
  }
}
</style>