/**
 * 处理级数和弦与音名和弦之间的转换。
 */
class DegreeTranslator {
    // 所有音名
    private names: string[];
    
    // 自然大调的音程关系（半音数）
    private majorScaleIntervals: number[];
    
    // 是否使用小和弦简写（2/3/6 表示 Dm/Em/Am, 7 表示 Bdim）
    private useMinorShorthand: boolean;

    constructor(useMinorShorthand: boolean = true) {
        this.names = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
        this.majorScaleIntervals = [0, 2, 4, 5, 7, 9, 11];
        this.useMinorShorthand = useMinorShorthand;
    }

    /**
     * 将级数和弦转换为音名和弦。
     * @param {string} key - 调式，如 C
     * @param {string} degreeChord - 级数和弦，如 2m7
     * @returns {string} 音名和弦，如 Dm7
     */
    degreeToName(key: string, degreeChord: string): string {
        // 从级数中提取度数（1-7）
        const degreeNumber = parseInt(degreeChord.charAt(0));
        
        // 如果degree不是合法数字，抛出异常
        if (isNaN(degreeNumber)) {
            throw new Error(`无效的级数: ${degreeChord}`);
        }
        
        // 获取和弦类型（去掉第一个字符后的所有内容）
        let chordType = degreeChord.substring(1);
        
        // 特殊情况处理：
        // 当开启小和弦简写时，2, 3, 6 单独出现时为小和弦
        // 当开启小和弦简写时，7 单独出现时为减和弦
        if (chordType === '' && this.useMinorShorthand) {
            if (degreeNumber === 2 || degreeNumber === 3 || degreeNumber === 6) {
                chordType = 'm';
            } else if (degreeNumber === 7) {
                chordType = 'dim';
            }
        } else if (chordType === 'M') {
            // M 表示大和弦，不添加任何后缀
            chordType = '';
        }
        
        // 找到起始音高在 names 中的索引
        const keyIndex = this.names.indexOf(key);
        if (keyIndex === -1) {
            throw new Error(`未知的调式: ${key}`);
        }
        
        // 计算目标音高的索引
        const targetIndex = (keyIndex + this.majorScaleIntervals[(degreeNumber - 1) % 7]) % 12;
        
        // 获取目标音高
        const targetName = this.names[targetIndex];
        
        // 返回最终的和弦名称
        return targetName + chordType;
    }

    /**
     * 将音名和弦转换为级数和弦。
     * @param {string} key - 调式，如 C
     * @param {string} nameChord - 音名和弦，如 Dm7
     * @returns {string} 级数和弦，如 2m7
     */
    nameToDegree(key: string, nameChord: string): string {
        // 提取和弦根音和类型
        // 假设和弦的第一个字符是根音
        let rootName = nameChord.charAt(0);
        let chordType = nameChord.substring(1);
        
        // 处理带有升降号的根音（如C#, Bb等）
        if (nameChord.length > 1 && (nameChord.charAt(1) === '#' || nameChord.charAt(1) === 'b')) {
            rootName = nameChord.substring(0, 2);
            chordType = nameChord.substring(2);
        }
        
        // 找到调式和根音在 names 中的索引
        const keyIndex = this.names.indexOf(key);
        const rootIndex = this.names.indexOf(rootName);
        
        if (keyIndex === -1) {
            throw new Error(`未知的调式: ${key}`);
        }
        
        if (rootIndex === -1) {
            throw new Error(`未知的根音: ${rootName}`);
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
            throw new Error(`无法确定和弦的度数: ${nameChord} 在 ${key} 调中`);
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
 * 将级数和弦转换为音名和弦。
 * @param {string} key - 调式，如 C
 * @param {string} degreeChord - 级数和弦，如 2m7
 * @param {boolean} useMinorShorthand - 是否使用小和弦简写，默认为 true
 * @returns {string} 音名和弦，如 Dm7，如果转换失败则返回原始入参 degreeChord
 */
function degree_to_name(key: string, degreeChord: string, useMinorShorthand: boolean = true): string {
    try {
        const localTranslator = new DegreeTranslator(useMinorShorthand);
        return localTranslator.degreeToName(key, degreeChord);
    } catch (error) {
        return degreeChord;
    }
}

/**
 * 将音名和弦转换为级数和弦。
 * @param {string} key - 调式，如 C
 * @param {string} nameChord - 音名和弦，如 Dm7
 * @param {boolean} useMinorShorthand - 是否使用小和弦简写，默认为 true
 * @returns {string} 级数和弦，如 2m7，如果转换失败则返回原始入参 nameChord
 */
function name_to_degree(key: string, nameChord: string, useMinorShorthand: boolean = true): string {
    try {
        const localTranslator = new DegreeTranslator(useMinorShorthand);
        return localTranslator.nameToDegree(key, nameChord);
    } catch (error) {
        return nameChord;
    }
}

export { degree_to_name, name_to_degree };