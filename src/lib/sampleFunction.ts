import { VoiceEntry, ProcessedResult } from './types.js'
import { ExtractedTask } from './types.js'  
/**
 * processEntries
 * --------------
 * PURE function — no IO, no mutation, deterministic.
 */
export interface SplitPerspective {
  original_text: string
  conflict_detected: boolean
  perspectives: {voice_label: string, text: string}[]
}
export function processEntries(entries: VoiceEntry[]): ProcessedResult & {}{
  const tagFrequencies: Record<string, number> = {}
  for (const e of entries) {
    for (const tag of e.tags_user) {
      tagFrequencies[tag] = (tagFrequencies[tag] || 0) + 1
    }
  }
  return {
    summary: `Analysed ${entries.length} entries`,
    tagFrequencies,
  }
}
  export function splitConflictingPerspectives(text: string): SplitPerspective {
    const conflitWords = [
    'but',
    'however',
    'although',
    'even though',
    'don\'t',
    'think',
    'on the other hand',
    'want',
    'fear',
    'afraid',
    'guilty',
    'yet',
    'however'
    ]
  
    for (const word of conflitWords) {
      const index = text.toLowerCase().indexOf(word)
    if (index !== -1) {
      const part1 = text.slice(0, index).trim()
      const part2 = text.slice(index + word.length).trim()
      return {
        original_text: text,
        conflict_detected: true,
        perspectives: [
          {voice_label: 'Voice of Rational', text: part1},
          {voice_label: 'Voice of Emotion', text: part2},
        ],
      }
    }
  }
  return {
    original_text: text,
    conflict_detected: false,
    perspectives: [{voice_label: 'Original Voice', text: text}],
  }
}
  


export default processEntries 