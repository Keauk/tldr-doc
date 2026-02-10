<script setup lang="ts">
import {computed, ref, onMounted, nextTick} from 'vue'

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

const textareaRef = ref<HTMLTextAreaElement | null>(null)

onMounted(async () => {
  if (props.disabled) return
  await nextTick()
  textareaRef.value?.focus()
})
</script>

<template>
  <div>
    <label :for="props.id" class="mb-2 block font-medium" :class="'text-primary'">Transcript</label>
    <textarea
      ref="textareaRef"
      :id="props.id"
      v-model="value"
      :disabled="props.disabled"
      class="w-full min-h-40 resize-y rounded-lg border p-3
         bg-slate-50 text-slate-900 placeholder-slate-500 border-sky
         focus:outline-none focus:ring-2 focus:ring-primary/60"
      :placeholder="props.placeholder"
      :aria-busy="props.ariaBusy ? 'true' : 'false'"
    />
  </div>
</template>
