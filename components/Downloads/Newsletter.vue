<script setup>
defineProps({
  privacyPolicy: { type: Object, required: true }
})

const form = reactive({
  first_name: '',
  last_name: '',
  company: '',
  role: '',
  city: '',
  country: '',
  email: '',
  privacy: false
})
</script>

<template>
  <form class="downloads-form">
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
    <FormInput
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
}

.field-spans-2 {
  grid-column: span 2;
}

.checkbox-label {
  display: flex;
  gap: var(--spacer-3);
}

.checkbox-input {
  appearance: none;
  background-color: var(--white);
  margin: 0;
  font: inherit;
  color: var(--beige);
  width: 1.25em;
  height: 1.25em;
  border: 1.5px solid var(--beige);
  border-radius: 0;
  display: grid;
  place-content: center;
  flex-shrink: 0;

  &::before {
    content: "";
    width: 0.65em;
    height: 0.65em;
    transform: scale(0);
    transition: .25s transform ease-in-out;
    box-shadow: inset 1em 1em var(--beige);
    border-radius: 100%;
  }

  &:checked::before {
    transform: scale(1);
  }

  &:focus-visible {
    outline: 0;
    box-shadow: 0 0 0 2px var(--black);
  }
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