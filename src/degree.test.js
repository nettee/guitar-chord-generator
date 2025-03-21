import { roman_to_pitch } from './degree';

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