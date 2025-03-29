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

  test('throws error for invalid key', () => {
    expect(() => {
      roman_to_pitch('H', '1');
    }).toThrow('未知的调式: H');
  });
});

describe('pitch_to_roman', () => {
  test('converts root chord to 1st degree in C major', () => {
    expect(pitch_to_roman('C', 'C')).toBe('1');
  });

  test('converts minor chord to 2nd degree in C major', () => {
    expect(pitch_to_roman('C', 'Dm')).toBe('2m');
  });

  test('converts minor chord to 3rd degree in C major', () => {
    expect(pitch_to_roman('C', 'Em')).toBe('3m');
  });

  test('converts 4th degree chord in C major', () => {
    expect(pitch_to_roman('C', 'F')).toBe('4');
  });

  test('converts 5th degree chord in C major', () => {
    expect(pitch_to_roman('C', 'G')).toBe('5');
  });

  test('converts minor chord to 6th degree in C major', () => {
    expect(pitch_to_roman('C', 'Am')).toBe('6m');
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
    expect(pitch_to_roman('G', 'Am')).toBe('2m');
    expect(pitch_to_roman('G', 'Cmaj7')).toBe('4maj7');
    expect(pitch_to_roman('G', 'Dsus4')).toBe('5sus4');
  });

  test('works with sharp keys', () => {
    expect(pitch_to_roman('F#', 'F#')).toBe('1');
    expect(pitch_to_roman('F#', 'B')).toBe('4');
    expect(pitch_to_roman('F#', 'C#')).toBe('5');
  });

  test('throws error for invalid key', () => {
    expect(() => {
      pitch_to_roman('H', 'C');
    }).toThrow('未知的调式: H');
  });

  test('throws error for invalid root pitch', () => {
    expect(() => {
      pitch_to_roman('C', 'H');
    }).toThrow('未知的根音: H');
  });

  test('throws error for non-diatonic chord', () => {
    expect(() => {
      pitch_to_roman('C', 'C#');
    }).toThrow('无法确定和弦的度数');
  });
}); 