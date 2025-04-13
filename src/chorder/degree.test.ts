import { degree_to_name, name_to_degree } from './degree';
import { describe, expect, test } from '@jest/globals';

describe('degree_to_name', () => {
  test('C major scale, with shorthand', () => {
    expect(degree_to_name('C', '1')).toBe('C');
    expect(degree_to_name('C', '2')).toBe('Dm');
    expect(degree_to_name('C', '3')).toBe('Em');
    expect(degree_to_name('C', '4')).toBe('F');
    expect(degree_to_name('C', '5')).toBe('G');
    expect(degree_to_name('C', '6')).toBe('Am');
    expect(degree_to_name('C', '7')).toBe('Bdim');
  });

  test('C major scale, with no shorthand', () => {
    expect(degree_to_name('C', '1')).toBe('C');
    expect(degree_to_name('C', '2m')).toBe('Dm');
    expect(degree_to_name('C', '3m')).toBe('Em');
    expect(degree_to_name('C', '4')).toBe('F');
    expect(degree_to_name('C', '5')).toBe('G');
    expect(degree_to_name('C', '6m')).toBe('Am');
    expect(degree_to_name('C', '7dim')).toBe('Bdim');
  });

  test('handles chord types correctly', () => {
    expect(degree_to_name('C', '3m7')).toBe('Em7');
    expect(degree_to_name('C', '4maj7')).toBe('Fmaj7');
    expect(degree_to_name('C', '57')).toBe('G7');
    expect(degree_to_name('C', '2m7b5')).toBe('Dm7b5');
    expect(degree_to_name('C', '1M')).toBe('C');
    expect(degree_to_name('C', '6M')).toBe('A');
    expect(degree_to_name('C', '7M')).toBe('B');
    expect(degree_to_name('C', '7dim')).toBe('Bdim');
  });

  test('handles shorthand for 2, 3, 6, 7 degrees', () => {
    // When useMinorShorthand is true, 2/3/6/7 should convert to Dm/Em/Am/Bdim
    expect(degree_to_name('C', '2', true)).toBe('Dm');
    expect(degree_to_name('C', '3', true)).toBe('Em');
    expect(degree_to_name('C', '6', true)).toBe('Am');
    expect(degree_to_name('C', '7', true)).toBe('Bdim');

    // Major chords should still convert correctly
    expect(degree_to_name('C', '2M', true)).toBe('D');
    expect(degree_to_name('C', '3M', true)).toBe('E');
    expect(degree_to_name('C', '6M', true)).toBe('A');
    expect(degree_to_name('C', '7M', true)).toBe('B');

    // When useMinorShorthand is false, 2/3/6/7 should convert to D/E/A/B (not Dm/Em/Am/Bdim)
    expect(degree_to_name('C', '2', false)).toBe('D');
    expect(degree_to_name('C', '3', false)).toBe('E');
    expect(degree_to_name('C', '6', false)).toBe('A');
    expect(degree_to_name('C', '7', false)).toBe('B');
    
    // Explicit minor chords should still convert correctly
    expect(degree_to_name('C', '2m', false)).toBe('Dm');
    expect(degree_to_name('C', '3m', false)).toBe('Em');
    expect(degree_to_name('C', '6m', false)).toBe('Am');
    expect(degree_to_name('C', '7dim', false)).toBe('Bdim');
  });

  test('works with different keys', () => {
    expect(degree_to_name('G', '1')).toBe('G');
    expect(degree_to_name('G', '2')).toBe('Am');
    expect(degree_to_name('G', '4maj7')).toBe('Cmaj7');
    expect(degree_to_name('G', '5sus4')).toBe('Dsus4');
  });

  test('works with sharp keys', () => {
    expect(degree_to_name('F#', '1')).toBe('F#');
    expect(degree_to_name('F#', '4')).toBe('B');
    expect(degree_to_name('F#', '5')).toBe('C#');
  });

  test('returns original input for invalid key', () => {
    expect(degree_to_name('H', '1')).toBe('1');
  });

  test('already name chord', () => {
    expect(degree_to_name('G', 'F')).toBe('F');
  });
});

describe('name_to_degree', () => {
  test('C major scale, with shorthand', () => {
    expect(name_to_degree('C', 'C')).toBe('1');
    expect(name_to_degree('C', 'Dm')).toBe('2');
    expect(name_to_degree('C', 'Em')).toBe('3');
    expect(name_to_degree('C', 'F')).toBe('4');
    expect(name_to_degree('C', 'G')).toBe('5');
    expect(name_to_degree('C', 'Am')).toBe('6');
    expect(name_to_degree('C', 'Bdim')).toBe('7');
  });
  
  test('C major scale, with no shorthand', () => {
    expect(name_to_degree('C', 'C', false)).toBe('1');
    expect(name_to_degree('C', 'Dm', false)).toBe('2m');
    expect(name_to_degree('C', 'Em', false)).toBe('3m');
    expect(name_to_degree('C', 'F', false)).toBe('4');
    expect(name_to_degree('C', 'G', false)).toBe('5');
    expect(name_to_degree('C', 'A', false)).toBe('6');
    expect(name_to_degree('C', 'B', false)).toBe('7');
  });

  test('handles chord types correctly', () => {
    expect(name_to_degree('C', 'Em7')).toBe('3m7');
    expect(name_to_degree('C', 'Fmaj7')).toBe('4maj7');
    expect(name_to_degree('C', 'G7')).toBe('57');
    expect(name_to_degree('C', 'Dm7b5')).toBe('2m7b5');
  });

  test('handles shorthand for 2, 3, 6, 7 degrees', () => {
    // When useMinorShorthand is true, Dm/Em/Am/Bdim should convert to 2/3/6/7
    expect(name_to_degree('C', 'Dm', true)).toBe('2');
    expect(name_to_degree('C', 'Em', true)).toBe('3');
    expect(name_to_degree('C', 'Am', true)).toBe('6');
    expect(name_to_degree('C', 'Bdim', true)).toBe('7');

    // Major chords should convert to 2M/3M/6M/7M
    expect(name_to_degree('C', 'D', true)).toBe('2M');
    expect(name_to_degree('C', 'E', true)).toBe('3M');
    expect(name_to_degree('C', 'A', true)).toBe('6M');
    expect(name_to_degree('C', 'B', true)).toBe('7M');

    // When useMinorShorthand is false, D/E/A/B should convert to 2/3/6/7
    expect(name_to_degree('C', 'D', false)).toBe('2');
    expect(name_to_degree('C', 'E', false)).toBe('3');
    expect(name_to_degree('C', 'A', false)).toBe('6');
    expect(name_to_degree('C', 'B', false)).toBe('7');

    // Minor chords should convert to 2m/3m/6m/7dim
    expect(name_to_degree('C', 'Dm', false)).toBe('2m');
    expect(name_to_degree('C', 'Em', false)).toBe('3m');
    expect(name_to_degree('C', 'Am', false)).toBe('6m');
    expect(name_to_degree('C', 'Bdim', false)).toBe('7dim');
  });

  test('works with different keys', () => {
    expect(name_to_degree('G', 'G')).toBe('1');
    expect(name_to_degree('G', 'Am')).toBe('2');
    expect(name_to_degree('G', 'Cmaj7')).toBe('4maj7');
    expect(name_to_degree('G', 'Dsus4')).toBe('5sus4');
    expect(name_to_degree('G', 'F#dim')).toBe('7');
  });

  test('works with sharp keys', () => {
    expect(name_to_degree('F#', 'F#')).toBe('1');
    expect(name_to_degree('F#', 'B')).toBe('4');
    expect(name_to_degree('F#', 'C#')).toBe('5');
  });

  test('returns original input for invalid key', () => {
    expect(name_to_degree('H', 'C')).toBe('C');
  });

  test('returns original input for invalid root name', () => {
    expect(name_to_degree('C', 'H')).toBe('H');
  });

  test('returns original input for non-diatonic chord', () => {
    expect(name_to_degree('C', 'C#')).toBe('C#');
  });
});

describe('bidirectional conversion works with useMinorShorthand', () => {
  test('name to degree to name, with useMinorShorthand=true', () => {
    const chords = ['C', 'Dm', 'Em', 'F', 'G', 'Am', 'Bdim', 'D', 'E', 'A', 'B'];
    const key = 'C';

    chords.forEach(chord => {
      const degree = name_to_degree(key, chord, true);
      const backToChord = degree_to_name(key, degree, true);
      expect(backToChord).toBe(chord);
    });
  });

  test('name to degree to name, with useMinorShorthand=false', () => {
    const chords = ['C', 'Dm', 'Em', 'F', 'G', 'Am', 'B', 'D', 'E', 'A', 'Bdim'];
    const key = 'C';

    chords.forEach(chord => {
      const degree = name_to_degree(key, chord, false);
      const backToChord = degree_to_name(key, degree, false);
      expect(backToChord).toBe(chord);
    });
  });

  test('name to degree to name, with useMinorShorthand=true', () => {
    const chords = ['1', '2', '3', '4', '5', '6', '7', '2M', '3M', '6M', '7M'];
    const key = 'C';

    chords.forEach(chord => {
      const name = degree_to_name(key, chord, true);
      const backToChord = name_to_degree(key, name, true);
      expect(backToChord).toBe(chord);
    });
  });

  test('name to degree to name, with useMinorShorthand=false', () => {
    const chords = ['1', '2', '3', '4', '5', '6', '7', '2m', '3m', '6m', '7dim'];
    const key = 'C';

    chords.forEach(chord => {
      const name = degree_to_name(key, chord, false);
      const backToChord = name_to_degree(key, name, false);
      expect(backToChord).toBe(chord);
    });
  });
});