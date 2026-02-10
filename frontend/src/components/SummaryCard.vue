<script setup lang="ts">
const props = defineProps<{
  summary: string
}>()
</script>

<template>
  <div v-if="props.summary" class="rounded-xl border p-5 shadow-sm" :class="'border-sky bg-ice/60'">
    <h2 class="mb-2 text-lg font-bold" :class="'text-primary'">Summary</h2>
    <p class="whitespace-pre-line leading-relaxed">{{ props.summary }}</p>
  </div>
</template>
