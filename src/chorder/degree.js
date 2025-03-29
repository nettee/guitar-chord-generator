/**
 * 将级数和弦转换为音高和弦。
 * @param {string} key - 调式，如 C
 * @param {string} roman - 级数和弦，如 2m7
 * @returns {string} 音高和弦，如 Dm7
 */
function roman_to_pitch(key, roman) {
    // 所有音高
    const pitches = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    
    // 自然大调的音程关系（半音数）
    const majorScaleIntervals = [0, 2, 4, 5, 7, 9, 11];
    
    // 从级数中提取度数（1-7）
    const degree = parseInt(roman.charAt(0));
    
    // 获取和弦类型（去掉第一个字符后的所有内容）
    let chordType = roman.substring(1);
    
    // 特殊情况处理：2, 3, 6 单独出现时为小和弦
    if (chordType === '' && (degree === 2 || degree === 3 || degree === 6)) {
        chordType = 'm';
    }
    
    // 找到起始音高在pitches中的索引
    const keyIndex = pitches.indexOf(key);
    if (keyIndex === -1) {
        throw new Error(`未知的调式: ${key}`);
    }
    
    // 计算目标音高的索引
    const targetIndex = (keyIndex + majorScaleIntervals[(degree - 1) % 7]) % 12;
    
    // 获取目标音高
    const targetPitch = pitches[targetIndex];
    
    // 返回最终的和弦名称
    return targetPitch + chordType;
}

/**
 * 将音高和弦转换为级数和弦。
 * @param {string} key - 调式，如 C
 * @param {string} chord - 音高和弦，如 Dm7
 * @returns {string} 级数和弦，如 2m7
 */
function pitch_to_roman(key, chord) {
    // 所有音高
    const pitches = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    
    // 自然大调的音程关系（半音数）
    const majorScaleIntervals = [0, 2, 4, 5, 7, 9, 11];
    
    // 提取和弦根音和类型
    // 假设和弦的第一个字符是根音
    let rootPitch = chord.charAt(0);
    let chordType = chord.substring(1);
    
    // 处理带有升降号的根音（如C#, Bb等）
    if (chord.length > 1 && (chord.charAt(1) === '#' || chord.charAt(1) === 'b')) {
        rootPitch = chord.substring(0, 2);
        chordType = chord.substring(2);
    }
    
    // 找到调式和根音在pitches中的索引
    const keyIndex = pitches.indexOf(key);
    const rootIndex = pitches.indexOf(rootPitch);
    
    if (keyIndex === -1) {
        throw new Error(`未知的调式: ${key}`);
    }
    
    if (rootIndex === -1) {
        throw new Error(`未知的根音: ${rootPitch}`);
    }
    
    // 计算根音相对于调式的半音距离
    const semitoneDistance = (rootIndex - keyIndex + 12) % 12;
    
    // 在自然大调音程关系中找到对应的度数
    let degree = -1;
    for (let i = 0; i < majorScaleIntervals.length; i++) {
        if (majorScaleIntervals[i] === semitoneDistance) {
            degree = i + 1;
            break;
        }
    }
    
    if (degree === -1) {
        throw new Error(`无法确定和弦的度数: ${chord} 在 ${key} 调中`);
    }
    
    // 返回最终的级数和弦
    return degree + chordType;
}

// 导出函数，使其可以在测试文件中导入
export { roman_to_pitch, pitch_to_roman };