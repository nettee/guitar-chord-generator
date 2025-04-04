import { roman_to_pitch, pitch_to_roman } from './degree.js';

describe('roman_to_pitch', () => {
  test('C major scale, with shorthand', () => {
    expect(roman_to_pitch('C', '1')).toBe('C');
    expect(roman_to_pitch('C', '2')).toBe('Dm');
    expect(roman_to_pitch('C', '3')).toBe('Em');
    expect(roman_to_pitch('C', '4')).toBe('F');
    expect(roman_to_pitch('C', '5')).toBe('G');
    expect(roman_to_pitch('C', '6')).toBe('Am');
    expect(roman_to_pitch('C', '7')).toBe('Bdim');
  });

  test('C major scale, with no shorthand', () => {
    expect(roman_to_pitch('C', '1')).toBe('C');
    expect(roman_to_pitch('C', '2m')).toBe('Dm');
    expect(roman_to_pitch('C', '3m')).toBe('Em');
    expect(roman_to_pitch('C', '4')).toBe('F');
    expect(roman_to_pitch('C', '5')).toBe('G');
    expect(roman_to_pitch('C', '6m')).toBe('Am');
    expect(roman_to_pitch('C', '7dim')).toBe('Bdim');
  });

  test('handles chord types correctly', () => {
    expect(roman_to_pitch('C', '3m7')).toBe('Em7');
    expect(roman_to_pitch('C', '4maj7')).toBe('Fmaj7');
    expect(roman_to_pitch('C', '57')).toBe('G7');
    expect(roman_to_pitch('C', '2m7b5')).toBe('Dm7b5');
    expect(roman_to_pitch('C', '1M')).toBe('C');
    expect(roman_to_pitch('C', '6M')).toBe('A');
    expect(roman_to_pitch('C', '7M')).toBe('B');
    expect(roman_to_pitch('C', '7dim')).toBe('Bdim');
  });

  test('handles shorthand for 2, 3, 6, 7 degrees', () => {
    // When useMinorShorthand is true, 2/3/6/7 should convert to Dm/Em/Am/Bdim
    expect(roman_to_pitch('C', '2', true)).toBe('Dm');
    expect(roman_to_pitch('C', '3', true)).toBe('Em');
    expect(roman_to_pitch('C', '6', true)).toBe('Am');
    expect(roman_to_pitch('C', '7', true)).toBe('Bdim');

    // Major chords should still convert correctly
    expect(roman_to_pitch('C', '2M', true)).toBe('D');
    expect(roman_to_pitch('C', '3M', true)).toBe('E');
    expect(roman_to_pitch('C', '6M', true)).toBe('A');
    expect(roman_to_pitch('C', '7M', true)).toBe('B');

    // When useMinorShorthand is false, 2/3/6/7 should convert to D/E/A/B (not Dm/Em/Am/Bdim)
    expect(roman_to_pitch('C', '2', false)).toBe('D');
    expect(roman_to_pitch('C', '3', false)).toBe('E');
    expect(roman_to_pitch('C', '6', false)).toBe('A');
    expect(roman_to_pitch('C', '7', false)).toBe('B');
    
    // Explicit minor chords should still convert correctly
    expect(roman_to_pitch('C', '2m', false)).toBe('Dm');
    expect(roman_to_pitch('C', '3m', false)).toBe('Em');
    expect(roman_to_pitch('C', '6m', false)).toBe('Am');
    expect(roman_to_pitch('C', '7dim', false)).toBe('Bdim');
  });

  test('works with different keys', () => {
    expect(roman_to_pitch('G', '1')).toBe('G');
    expect(roman_to_pitch('G', '2')).toBe('Am');
    expect(roman_to_pitch('G', '4maj7')).toBe('Cmaj7');
    expect(roman_to_pitch('G', '5sus4')).toBe('Dsus4');
  });

  test('works with sharp keys', () => {
    expect(roman_to_pitch('F#', '1')).toBe('F#');
    expect(roman_to_pitch('F#', '4')).toBe('B');
    expect(roman_to_pitch('F#', '5')).toBe('C#');
  });

  test('returns original input for invalid key', () => {
    expect(roman_to_pitch('H', '1')).toBe('1');
  });

  test('already pitch', () => {
    expect(roman_to_pitch('G', 'F')).toBe('F');
  });
});

describe('pitch_to_roman', () => {
  test('C major scale, with shorthand', () => {
    expect(pitch_to_roman('C', 'C')).toBe('1');
    expect(pitch_to_roman('C', 'Dm')).toBe('2');
    expect(pitch_to_roman('C', 'Em')).toBe('3');
    expect(pitch_to_roman('C', 'F')).toBe('4');
    expect(pitch_to_roman('C', 'G')).toBe('5');
    expect(pitch_to_roman('C', 'Am')).toBe('6');
    expect(pitch_to_roman('C', 'Bdim')).toBe('7');
  });
  
  test('C major scale, with no shorthand', () => {
    expect(pitch_to_roman('C', 'C', false)).toBe('1');
    expect(pitch_to_roman('C', 'Dm', false)).toBe('2m');
    expect(pitch_to_roman('C', 'Em', false)).toBe('3m');
    expect(pitch_to_roman('C', 'F', false)).toBe('4');
    expect(pitch_to_roman('C', 'G', false)).toBe('5');
    expect(pitch_to_roman('C', 'A', false)).toBe('6');
    expect(pitch_to_roman('C', 'B', false)).toBe('7');
  });

  test('handles chord types correctly', () => {
    expect(pitch_to_roman('C', 'Em7')).toBe('3m7');
    expect(pitch_to_roman('C', 'Fmaj7')).toBe('4maj7');
    expect(pitch_to_roman('C', 'G7')).toBe('57');
    expect(pitch_to_roman('C', 'Dm7b5')).toBe('2m7b5');
  });

  test('handles shorthand for 2, 3, 6, 7 degrees', () => {
    // When useMinorShorthand is true, Dm/Em/Am/Bdim should convert to 2/3/6/7
    expect(pitch_to_roman('C', 'Dm', true)).toBe('2');
    expect(pitch_to_roman('C', 'Em', true)).toBe('3');
    expect(pitch_to_roman('C', 'Am', true)).toBe('6');
    expect(pitch_to_roman('C', 'Bdim', true)).toBe('7');

    // Major chords should convert to 2M/3M/6M/7M
    expect(pitch_to_roman('C', 'D', true)).toBe('2M');
    expect(pitch_to_roman('C', 'E', true)).toBe('3M');
    expect(pitch_to_roman('C', 'A', true)).toBe('6M');
    expect(pitch_to_roman('C', 'B', true)).toBe('7M');

    // When useMinorShorthand is false, D/E/A/B should convert to 2/3/6/7
    expect(pitch_to_roman('C', 'D', false)).toBe('2');
    expect(pitch_to_roman('C', 'E', false)).toBe('3');
    expect(pitch_to_roman('C', 'A', false)).toBe('6');
    expect(pitch_to_roman('C', 'B', false)).toBe('7');

    // Minor chords should convert to 2m/3m/6m/7dim
    expect(pitch_to_roman('C', 'Dm', false)).toBe('2m');
    expect(pitch_to_roman('C', 'Em', false)).toBe('3m');
    expect(pitch_to_roman('C', 'Am', false)).toBe('6m');
    expect(pitch_to_roman('C', 'Bdim', false)).toBe('7dim');
  });

  test('works with different keys', () => {
    expect(pitch_to_roman('G', 'G')).toBe('1');
    expect(pitch_to_roman('G', 'Am')).toBe('2');
    expect(pitch_to_roman('G', 'Cmaj7')).toBe('4maj7');
    expect(pitch_to_roman('G', 'Dsus4')).toBe('5sus4');
    expect(pitch_to_roman('G', 'F#dim')).toBe('7');
  });

  test('works with sharp keys', () => {
    expect(pitch_to_roman('F#', 'F#')).toBe('1');
    expect(pitch_to_roman('F#', 'B')).toBe('4');
    expect(pitch_to_roman('F#', 'C#')).toBe('5');
  });

  test('returns original input for invalid key', () => {
    expect(pitch_to_roman('H', 'C')).toBe('C');
  });

  test('returns original input for invalid root pitch', () => {
    expect(pitch_to_roman('C', 'H')).toBe('H');
  });

  test('returns original input for non-diatonic chord', () => {
    expect(pitch_to_roman('C', 'C#')).toBe('C#');
  });
});

describe('bidirectional conversion works with useMinorShorthand', () => {
  test('pitch to roman to pitch, with useMinorShorthand=true', () => {
    const chords = ['C', 'Dm', 'Em', 'F', 'G', 'Am', 'Bdim', 'D', 'E', 'A', 'B'];
    const key = 'C';

    chords.forEach(chord => {
      const roman = pitch_to_roman(key, chord, true);
      const backToChord = roman_to_pitch(key, roman, true);
      expect(backToChord).toBe(chord);
    });
  });

  test('pitch to roman to pitch, with useMinorShorthand=false', () => {
    const chords = ['C', 'Dm', 'Em', 'F', 'G', 'Am', 'B', 'D', 'E', 'A', 'Bdim'];
    const key = 'C';

    chords.forEach(chord => {
      const roman = pitch_to_roman(key, chord, false);
      const backToChord = roman_to_pitch(key, roman, false);
      expect(backToChord).toBe(chord);
    });
  });

  test('roman to pitch to roman, with useMinorShorthand=true', () => {
    const chords = ['1', '2', '3', '4', '5', '6', '7', '2M', '3M', '6M', '7M'];
    const key = 'C';

    chords.forEach(chord => {
      const roman = roman_to_pitch(key, chord, true);
      const backToChord = pitch_to_roman(key, roman, true);
      expect(backToChord).toBe(chord);
    });
  });

  test('roman to pitch to roman, with useMinorShorthand=false', () => {
    const chords = ['1', '2', '3', '4', '5', '6', '7', '2m', '3m', '6m', '7dim'];
    const key = 'C';

    chords.forEach(chord => {
      const roman = roman_to_pitch(key, chord, false);
      const backToChord = pitch_to_roman(key, roman, false);
      expect(backToChord).toBe(chord);
    });
  });
});