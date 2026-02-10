<script setup lang="ts">
const props = withDefaults(defineProps<{
  loading?: boolean
  disabled?: boolean
}>(), {
  loading: false,
  disabled: false,
})

const emit = defineEmits<{
  (e: 'click'): void
}>()
</script>

<template>
  <button
    type="button"
    @click="emit('click')"
    :disabled="props.disabled || props.loading"
    class="inline-flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
    :class="props.loading ? 'bg-accent text-white' : 'bg-primary text-white hover:brightness-110'"
  >
    <svg v-if="props.loading" class="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
    </svg>
    <span>{{ props.loading ? 'Summarizing…' : 'Generate summary' }}</span>
  </button>
</template>
