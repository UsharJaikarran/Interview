// eslint-disable-next-line import/no-extraneous-dependencies
// '@ts-expect-error vitest types are provided via tsconfig "types"

import { describe, it, expect } from 'vitest'
import { mockVoiceEntries } from '../src/lib/mockData.js'
import processEntries, { splitConflictingPerspectives } from '../src/lib/sampleFunction.js'


describe('processEntries', () => {
  it('counts reflection tag correctly', () => {
    const result = processEntries(mockVoiceEntries)
    expect(result.tagFrequencies.reflection).toBe(mockVoiceEntries.length)
  })
})
describe('splitConflictingPerspectives', () => {
  const entries = [
    "I kind of don't want to go to the party, but I also don't want them to think I'm avoiding them",
    "I turned down that opportunity. I think it was the right call, but there's still a small part of me that wonders.",
    "I know I should sleep earlier, but I always end up scrolling late into the night.",
    "He made some good points, but I can't help feeling like I'm still right.",
    "I said I'd help her out, and now I'm swamped. I don't want to back out, but I'm overwhelmed.",
    "I planned to work out today, but I was exhausted from work.",
    "I told myself this was a smart long-term move, but honestly I think I just didn't want to deal with the current situation.",
    "This relationship makes me happy, but there's always this quiet anxiety underneath.",
    "I know he's not right for me, but I still want to give it one more try",
    "I said it doesn't bother me, but it actually does, more than I expected.",
    "I'm not sure if I should go to the party, but I'm also not sure if I should stay home.",
    "I'm not feeling well, but I'm also not sure if I should stay home.",
    
  ]

  it('detects and splits conflicting perspectives correctly', () => {
    entries.forEach((entry, index) => {
      const result = splitConflictingPerspectives(entry)
      console.log(`Entry #${index + 1}:`, result)
      expect(result).toHaveProperty('original_text')
      expect(result).toHaveProperty('conflict_detected')
      expect(result).toHaveProperty('perspectives')
      expect(Array.isArray(result.perspectives)).toBe(true)
    })
  })
  })
