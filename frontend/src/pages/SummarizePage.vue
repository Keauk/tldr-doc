<script setup lang="ts">
import {ref, onMounted, watch} from 'vue'
import TranscriptInput from '../components/TranscriptInput.vue'
import LanguageSelect from '../components/LanguageSelect.vue'
import SubmitButton from '../components/SubmitButton.vue'
import ErrorAlert from '../components/ErrorAlert.vue'
import SummaryCard from '../components/SummaryCard.vue'
import {summarize} from '../services/summarizeApi'

const text = ref('')
const language = ref('en')
const loading = ref(false)
const error = ref<string | null>(null)
const summary = ref('')

const SUMMARY_KEY = 'tldr-summary'

onMounted(() => {
  try {
    const saved = localStorage.getItem(SUMMARY_KEY)
    if (saved) summary.value = saved
  } catch (_) {
  }
})

watch(summary, (val) => {
  try {
    if (val) {
      localStorage.setItem(SUMMARY_KEY, val)
    } else {
      localStorage.removeItem(SUMMARY_KEY)
    }
  } catch (_) {
  }
})

async function onSubmit() {
  if (!text.value || loading.value) return
  loading.value = true
  error.value = null
  summary.value = ''
  try {
    summary.value = await summarize(text.value, language.value || undefined)
  } catch (e: any) {
    error.value = e?.message ?? 'Unexpected error'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <main class="min-h-screen w-full bg-ice text-slate-800 py-10">
    <div class="mx-auto max-w-3xl px-4">
      <header class="mb-8 text-center">
        <h1 class="text-3xl font-extrabold" :class="'text-primary'">TLDR Doctor</h1>
        <p class="mt-2 text-sm" :class="'text-slate-800'">Paste your transcript, choose a language, and generate a concise
          summary.</p>
      </header>

      <section class="rounded-2xl border p-6 shadow-sm" :class="'border-accent bg-white'">
        <div class="mb-4">
          <TranscriptInput v-model="text" :aria-busy="loading" id="transcript"/>
        </div>

        <div class="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div class="sm:col-span-2">
            <LanguageSelect v-model="language" id="language"/>
          </div>
          <div class="flex items-end">
            <SubmitButton :loading="loading" :disabled="!text" @click="onSubmit"/>
          </div>
        </div>

        <div aria-live="polite" class="space-y-4">
          <ErrorAlert v-if="error" :message="error"/>
          <SummaryCard v-if="summary" :summary="summary"/>
        </div>
      </section>
    </div>
  </main>
</template>

