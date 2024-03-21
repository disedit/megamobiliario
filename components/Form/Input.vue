<script setup>
const props = defineProps({
  variant: { type: String, default: 'white' },
  modelValue: { type: String, required: true },
  name: { type: String, required: true },
  label: { type: String, required: true },
  type: { type: String, default: 'text' },
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

const focused = ref(false)

const active = computed(() => {
  return focused.value || value.value
})
</script>

<template>
  <div :class="['form-input', `variant-${variant}`, { active }]">
    <label
      :for="name"
      class="form-input-label"
    >
      {{ label }}
    </label>
    <input
      :id="name"
      :name="name"
      :type="type"
      :required="required"
      class="form-input-field"
      v-model="value"
      @focus="focused = true"
      @blur="focused = false"
    />
  </div>
</template>

<style lang="scss" scoped>
.form-input {
  position: relative;
  --variant-color: var(--white);
  --variant-autofill: #95502f;
  --variant-text: var(--white);

  &-label {
    appearance: none;
    position: absolute;
    font-size: var(--text-md);
    top: 1.15rem;
    left: var(--spacer-3);
    transition: all .25s ease;
    pointer-events: none;
    color: var(--variant-color);
  }

  &-field {
    display: block;
    border: 1.5px var(--variant-color) solid;
    background: transparent;
    width: 100%;
    padding: var(--spacer-7) var(--spacer-3) var(--spacer-3);
    color: var(--variant-text);
    font-family: inherit;
    font-size: var(--text-base);

    &:focus {
      outline: 0;
    }

    &:autofill,
    &:-webkit-autofill {
      -webkit-box-shadow: 0 0 0 100px var(--variant-autofill) inset !important;
    }
  }

  &.active {
    .form-input-label {
      font-size: var(--text-sm);
      top: .6rem;
    }
  }
}

.variant-beige {
  --variant-color: var(--beige);
  --variant-autofill: #f2f8ff;
  --variant-text: var(--black);
}
</style>