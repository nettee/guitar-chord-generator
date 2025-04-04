import { roman_to_pitch, pitch_to_roman } from './degree.js';

describe('roman_to_pitch', () => {
  test('converts 1st degree to root chord in C major', () => {
    expect(roman_to_pitch('C', '1')).toBe('C');
  });

  test('converts 2nd degree to minor chord in C major', () => {
    expect(roman_to_pitch('C', '2')).toBe('Dm');
  });

  test('converts 3rd degree to minor chord in C major', () => {
    expect(roman_to_pitch('C', '3')).toBe('Em');
  });

  test('converts 4th degree in C major', () => {
    expect(roman_to_pitch('C', '4')).toBe('F');
  });

  test('converts 5th degree in C major', () => {
    expect(roman_to_pitch('C', '5')).toBe('G');
  });

  test('converts 6th degree to minor chord in C major', () => {
    expect(roman_to_pitch('C', '6')).toBe('Am');
  });

  test('converts 7th degree in C major', () => {
    expect(roman_to_pitch('C', '7')).toBe('B');
  });

  test('handles chord types correctly', () => {
    expect(roman_to_pitch('C', '3m7')).toBe('Em7');
    expect(roman_to_pitch('C', '4maj7')).toBe('Fmaj7');
    expect(roman_to_pitch('C', '57')).toBe('G7');
    expect(roman_to_pitch('C', '2m7b5')).toBe('Dm7b5');
    expect(roman_to_pitch('C', '1M')).toBe('C');
    expect(roman_to_pitch('C', '6M')).toBe('A');
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
  
  test('handles useMinorShorthand=false for 2, 3, 6 degrees', () => {
    // When useMinorShorthand is false, 2/3/6 should convert to D/E/A (not Dm/Em/Am)
    expect(roman_to_pitch('C', '2', false)).toBe('D');
    expect(roman_to_pitch('C', '3', false)).toBe('E');
    expect(roman_to_pitch('C', '6', false)).toBe('A');
    
    // Explicit minor chords should still convert correctly
    expect(roman_to_pitch('C', '2m', false)).toBe('Dm');
    expect(roman_to_pitch('C', '3m', false)).toBe('Em');
    expect(roman_to_pitch('C', '6m', false)).toBe('Am');
    
    // Major chords should still convert correctly
    expect(roman_to_pitch('C', '2M', false)).toBe('D');
    expect(roman_to_pitch('C', '3M', false)).toBe('E');
    expect(roman_to_pitch('C', '6M', false)).toBe('A');
  });
});

describe('pitch_to_roman', () => {
  test('converts root chord to 1st degree in C major', () => {
    expect(pitch_to_roman('C', 'C')).toBe('1');
  });

  test('converts minor chord to 2nd degree in C major', () => {
    expect(pitch_to_roman('C', 'Dm')).toBe('2');
  });

  test('converts minor chord to 3rd degree in C major', () => {
    expect(pitch_to_roman('C', 'Em')).toBe('3');
  });

  test('converts 4th degree chord in C major', () => {
    expect(pitch_to_roman('C', 'F')).toBe('4');
  });

  test('converts 5th degree chord in C major', () => {
    expect(pitch_to_roman('C', 'G')).toBe('5');
  });

  test('converts minor chord to 6th degree in C major', () => {
    expect(pitch_to_roman('C', 'Am')).toBe('6');
  });

  test('converts 7th degree chord in C major', () => {
    expect(pitch_to_roman('C', 'B')).toBe('7');
  });

  test('handles chord types correctly', () => {
    expect(pitch_to_roman('C', 'Em7')).toBe('3m7');
    expect(pitch_to_roman('C', 'Fmaj7')).toBe('4maj7');
    expect(pitch_to_roman('C', 'G7')).toBe('57');
    expect(pitch_to_roman('C', 'Dm7b5')).toBe('2m7b5');
  });

  test('works with different keys', () => {
    expect(pitch_to_roman('G', 'G')).toBe('1');
    expect(pitch_to_roman('G', 'Am')).toBe('2');
    expect(pitch_to_roman('G', 'Cmaj7')).toBe('4maj7');
    expect(pitch_to_roman('G', 'Dsus4')).toBe('5sus4');
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
  
  test('handles 2/3/6 major chords with useMinorShorthand=true', () => {
    // When useMinorShorthand is true, major 2/3/6 chords should convert to 2M/3M/6M
    expect(pitch_to_roman('C', 'D')).toBe('2M');
    expect(pitch_to_roman('C', 'E')).toBe('3M');
    expect(pitch_to_roman('C', 'A')).toBe('6M');
  });
  
  test('handles useMinorShorthand=false for all chords', () => {
    // Without minor shorthand, minor chords should keep the 'm'
    expect(pitch_to_roman('C', 'Dm', false)).toBe('2m');
    expect(pitch_to_roman('C', 'Em', false)).toBe('3m');
    expect(pitch_to_roman('C', 'Am', false)).toBe('6m');
    
    // Major chords should convert without adding 'M'
    expect(pitch_to_roman('C', 'D', false)).toBe('2');
    expect(pitch_to_roman('C', 'E', false)).toBe('3');
    expect(pitch_to_roman('C', 'A', false)).toBe('6');
  });
});

describe('bidirectional conversion works with useMinorShorthand', () => {
  test('works with useMinorShorthand=true', () => {
    const chords = ['C', 'Dm', 'Em', 'F', 'G', 'Am', 'B', 'D', 'E', 'A'];
    const key = 'C';

    chords.forEach(chord => {
      const roman = pitch_to_roman(key, chord, true);
      const backToChord = roman_to_pitch(key, roman, true);
      expect(backToChord).toBe(chord);
    });
  });

  test('works with useMinorShorthand=false', () => {
    const chords = ['C', 'Dm', 'Em', 'F', 'G', 'Am', 'B', 'D', 'E', 'A'];
    const key = 'C';

    chords.forEach(chord => {
      const roman = pitch_to_roman(key, chord, false);
      const backToChord = roman_to_pitch(key, roman, false);
      expect(backToChord).toBe(chord);
    });
  });
});