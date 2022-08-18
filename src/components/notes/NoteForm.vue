<script setup>
import { vAutofocus } from '@/directives/vAutofocus'

const props = defineProps({
  modelValue: {
    type: String,
    required: true
  },
  placeholder: {
    type: String,
    default: ''
  },
  maxlength: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <form @submit.prevent="" class="form">
    <h2><slot /></h2>
    <textarea
      v-model="modelValue"
      @input="emit('update:modelValue', modelValue)"
      :placeholder="placeholder"
      :maxlength="maxlength"
      rows="5"
      v-autofocus
    />
    <div class="form-actions">
      <slot name="buttons" />
    </div>
  </form>
</template>

<style scoped>
textarea {
  padding: var(--size-3) var(--size-4);
}
</style>
