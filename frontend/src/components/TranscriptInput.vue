<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  modelValue: string
  id?: string
  disabled?: boolean
  placeholder?: string
  ariaBusy?: boolean
}>(), {
  id: 'transcript',
  disabled: false,
  placeholder: 'Paste transcript here...'
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
    <label :for="props.id" class="mb-2 block font-medium" :class="'text-primary'">Transcript</label>
    <textarea
      :id="props.id"
      v-model="value"
      :disabled="props.disabled"
      class="w-full min-h-40 resize-y rounded-lg border p-3 focus:outline-none focus:ring-2 bg-muted/30 text-slate-900 placeholder-slate-500"
      :class="'border-sky focus:ring-primary/60'"
      :placeholder="props.placeholder"
      :aria-busy="props.ariaBusy ? 'true' : 'false'"
    />
  </div>
</template>
