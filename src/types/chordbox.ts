/**
 * ChordBox 组件类型定义
 */

/**
 * ChordBox 构造函数参数
 */
export interface ChordBoxParams {
  /** 弦数 */
  numStrings?: number;
  /** 品格数量 */
  numFrets?: number;
  /** X坐标偏移 */
  x?: number;
  /** Y坐标偏移 */
  y?: number;
  /** 宽度 */
  width?: number;
  /** 高度 */
  height?: number;
  /** 线条宽度 */
  strokeWidth?: number;
  /** 是否显示调音信息 */
  showTuning?: boolean;
  /** 默认颜色 */
  defaultColor?: string;
  /** 背景颜色 */
  bgColor?: string;
  /** 标签颜色 */
  labelColor?: string;
  /** 弦色 */
  stringColor?: string;
  /** 品格颜色 */
  fretColor?: string;
  /** 琴桥颜色 */
  bridgeColor?: string;
  /** 线条颜色 */
  strokeColor?: string;
  /** 文本颜色 */
  textColor?: string;
  /** 弦线宽度 */
  stringWidth?: number;
  /** 品格线宽度 */
  fretWidth?: number;
  /** 字体家族 */
  fontFamily?: string;
  /** 字体大小 */
  fontSize?: number;
  /** 字体样式 */
  fontStyle?: string;
  /** 字体粗细 */
  fontWeight?: string;
  /** 标签粗细 */
  labelWeight?: string;
  /** 索引签名，允许访问任意键 */
  [key: string]: any;
}

/**
 * 和弦图光带参数
 */
export interface LightUpParams {
  /** 弦号 */
  string: number;
  /** 品格 */
  fret: number | 'x';
  /** 可选标签 */
  label?: string;
}

/**
 * 文本绘制属性
 */
export interface TextAttrs {
  /** 字体家族 */
  family?: string;
  /** 字体大小 */
  size?: number;
  /** 字体样式 */
  style?: string;
  /** 字体粗细 */
  weight?: string;
}