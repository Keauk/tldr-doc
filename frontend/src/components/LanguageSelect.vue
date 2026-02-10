<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  modelValue: string
  id?: string
  disabled?: boolean
}>(), {
  id: 'language',
  disabled: false,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const value = computed({
  get: () => props.modelValue,
  set: (v: string) => emit('update:modelValue', v),
})
</script>

<template>
  <div>
    <label :for="props.id" class="mb-2 block font-medium" :class="'text-primary'">Language</label>
    <select
      :id="props.id"
      v-model="value"
      :disabled="props.disabled"
      class="w-full rounded-lg border p-3 shadow-sm focus:outline-none focus:ring-2"
      :class="['border-sky focus:ring-primary/60 bg-white']"
    >
      <option value="" disabled>Select language (placeholder)</option>
      <option value="en">English (placeholder)</option>
      <option value="es">Spanish (placeholder)</option>
      <option value="fr">French (placeholder)</option>
    </select>
  </div>
</template>
