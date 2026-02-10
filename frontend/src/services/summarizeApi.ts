export type SummarizeResponse = { summary: string }

/**
 * Call the backend summarize endpoint and return the summary text.
 * Encapsulates fetch + error parsing so UI components stay focused on UI concerns.
 */
export async function summarize(text: string, language?: string): Promise<string> {
  const res = await fetch('/summarize', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, language }),
  })

  if (!res.ok) {
    let message = `Request failed with status ${res.status}`
    try {
      const data = await res.json() as any
      if (data?.message && typeof data.message === 'string') {
        message = data.message
      }
    } catch {
      // ignore JSON parse errors; fall back to default message
    }
    throw new Error(message)
  }

  const data = (await res.json()) as SummarizeResponse
  return data.summary
}
