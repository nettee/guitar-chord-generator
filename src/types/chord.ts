/**
 * 和弦按法数据类型定义
 */

/**
 * 大横按定义
 */
export interface Barre {
  /** 大横按起始弦 */
  fromString: number;
  /** 大横按结束弦 */
  toString: number;
  /** 大横按品格位置 */
  fret: number;
}

/**
 * 单个弦的按法定义
 * 格式: [弦号, 品格位置, 可选标签]
 * 例如: [1, 0] 表示1弦空弦
 *      [2, 1] 表示2弦1品
 *      [6, 'x'] 表示6弦不发音
 */
export type StringFret = [number, number | 'x', string?];

/**
 * 和弦数据结构
 */
export interface ChordDefinition {
  /** 和弦按法，每一项代表一根弦的按法 */
  chord: StringFret[];
  /** 可选，定义高把位和弦位置，例如: 4 表示和弦图从第4品开始 */
  position?: number;
  /** 可选，和弦图位置文本，通常为position相同，但有时需要单独设置 */
  positionText?: number;
  /** 可选，定义大横按，一个和弦可以有多个大横按 */
  barres?: Barre[];
  /** 可选，调音，默认为标准调音 ['E', 'A', 'D', 'G', 'B', 'E'] */
  tuning?: string[];
}

/**
 * 和弦集合，键为和弦名称，值为和弦定义
 */
export interface ChordDictionary {
  [chordName: string]: ChordDefinition;
}