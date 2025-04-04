/**
 * 处理级数和弦与音高和弦之间的转换。
 */
class DegreeTranslator {
    constructor(useMinorShorthand = true) {
        // 所有音高
        this.pitches = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
        
        // 自然大调的音程关系（半音数）
        this.majorScaleIntervals = [0, 2, 4, 5, 7, 9, 11];
        
        // 是否使用小和弦简写（2/3/6 表示 Dm/Em/Am）
        this.useMinorShorthand = useMinorShorthand;
    }

    /**
     * 将级数和弦转换为音高和弦。
     * @param {string} key - 调式，如 C
     * @param {string} roman - 级数和弦，如 2m7
     * @returns {string} 音高和弦，如 Dm7
     */
    romanToPitch(key, roman) {
        // 从级数中提取度数（1-7）
        const degree = parseInt(roman.charAt(0));
        
        // 如果degree不是合法数字，抛出异常
        if (isNaN(degree)) {
            throw new Error(`无效的级数: ${roman}`);
        }
        
        // 获取和弦类型（去掉第一个字符后的所有内容）
        let chordType = roman.substring(1);
        
        // 特殊情况处理：
        // 当开启小和弦简写时，2, 3, 6 单独出现时为小和弦
        // 当开启小和弦简写时，7 单独出现时为减和弦
        if (chordType === '' && this.useMinorShorthand) {
            if (degree === 2 || degree === 3 || degree === 6) {
                chordType = 'm';
            } else if (degree === 7) {
                chordType = 'dim';
            }
        } else if (chordType === 'M') {
            // M 表示大和弦，不添加任何后缀
            chordType = '';
        }
        
        // 找到起始音高在pitches中的索引
        const keyIndex = this.pitches.indexOf(key);
        if (keyIndex === -1) {
            throw new Error(`未知的调式: ${key}`);
        }
        
        // 计算目标音高的索引
        const targetIndex = (keyIndex + this.majorScaleIntervals[(degree - 1) % 7]) % 12;
        
        // 获取目标音高
        const targetPitch = this.pitches[targetIndex];
        
        // 返回最终的和弦名称
        return targetPitch + chordType;
    }

    /**
     * 将音高和弦转换为级数和弦。
     * @param {string} key - 调式，如 C
     * @param {string} chord - 音高和弦，如 Dm7
     * @returns {string} 级数和弦，如 2m7
     */
    pitchToRoman(key, chord) {
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
        const keyIndex = this.pitches.indexOf(key);
        const rootIndex = this.pitches.indexOf(rootPitch);
        
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
        for (let i = 0; i < this.majorScaleIntervals.length; i++) {
            if (this.majorScaleIntervals[i] === semitoneDistance) {
                degree = i + 1;
                break;
            }
        }
        
        if (degree === -1) {
            throw new Error(`无法确定和弦的度数: ${chord} 在 ${key} 调中`);
        }
        
        // 根据小和弦简写规则处理和弦类型
        if (this.useMinorShorthand) {
            // 当启用小和弦简写时：
            // 1. 如果是2/3/6度的小和弦(m)，转换为简写形式(无后缀)
            // 2. 如果是2/3/6度的大和弦(无后缀)，需要明确标记为大和弦(M)
            // 3. 如果是7度的减和弦(dim)，转换为简写形式(无后缀)
            if (degree === 2 || degree === 3 || degree === 6) {
                if (chordType === 'm') {
                    chordType = '';
                } else if (chordType === '') {
                    chordType = 'M';
                }
            } else if (degree === 7) {
                if (chordType === 'dim') {
                    chordType = '';
                } else if (chordType === '') {
                    chordType = 'M';
                }
            }
        }
        
        // 返回最终的级数和弦
        return degree + chordType;
    }
}

/**
 * 将级数和弦转换为音高和弦。
 * @param {string} key - 调式，如 C
 * @param {string} roman - 级数和弦，如 2m7
 * @param {boolean} useMinorShorthand - 是否使用小和弦简写，默认为true
 * @returns {string} 音高和弦，如 Dm7，如果转换失败则返回原始入参roman
 */
function roman_to_pitch(key, roman, useMinorShorthand = true) {
    try {
        const localTranslator = new DegreeTranslator(useMinorShorthand);
        return localTranslator.romanToPitch(key, roman);
    } catch (error) {
        return roman;
    }
}

/**
 * 将音高和弦转换为级数和弦。
 * @param {string} key - 调式，如 C
 * @param {string} chord - 音高和弦，如 Dm7
 * @param {boolean} useMinorShorthand - 是否使用小和弦简写，默认为true
 * @returns {string} 级数和弦，如 2m7，如果转换失败则返回原始入参chord
 */
function pitch_to_roman(key, chord, useMinorShorthand = true) {
    try {
        const localTranslator = new DegreeTranslator(useMinorShorthand);
        return localTranslator.pitchToRoman(key, chord);
    } catch (error) {
        return chord;
    }
}

export { roman_to_pitch, pitch_to_roman };