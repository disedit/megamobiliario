<script setup>
const props = defineProps({
  modelValue: { type: String, required: true },
  name: { type: String, required: true },
  label: { type: String, required: true },
  required: { type: Boolean, default: false }
})

const emit = defineEmits(['update:modelValue'])

const value = computed({
  get () {
    return props.modelValue
  },
  set (value) {
    emit('update:modelValue', value)
  }
})
</script>

<template>
  <div class="form-input">
    <label
      :for="name"
      class="form-input-label visually-hidden"
    >
      {{ label }}
    </label>
    <textarea
      :id="name"
      :name="name"
      :required="required"
      class="form-input-field"
      v-model="value"
      :placeholder="label"
    />
  </div>
</template>

<style lang="scss" scoped>
.form-input {
  position: relative;

  &-field {
    display: block;
    border: 1.5px var(--white) solid;
    background: transparent;
    width: 100%;
    padding: var(--spacer-3);
    color: var(--white);
    font-family: inherit;
    font-size: var(--text-base);
    height: 10rem;

    &::placeholder {
      color: var(--white);
      font-size: var(--text-md);
    }

    &:focus {
      outline: 0;
    }

    &:autofill,
    &:-webkit-autofill {
      -webkit-box-shadow: 0 0 0 100px #6e4734 inset!important;
    }
  }
}
</style>