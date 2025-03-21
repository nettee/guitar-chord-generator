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

// 导出函数，使其可以在测试文件中导入
export { roman_to_pitch };