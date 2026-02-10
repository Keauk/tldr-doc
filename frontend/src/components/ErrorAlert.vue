<script setup lang="ts">
const props = defineProps<{
  message: string
}>()
</script>

<template>
  <div v-if="props.message" class="rounded-lg border p-4" :class="'border-primary/30 bg-primary/10 text-primary'">
    {{ props.message }}
  </div>
</template>
