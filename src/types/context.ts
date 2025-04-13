/**
 * Context 类型定义
 */

/**
 * 和弦上下文类型
 */
export interface ChordContextType {
  /** 和弦名称列表 */
  chordNames: string[];
  /** 设置和弦名称列表 */
  setChordNames: (names: string[]) => void;
}

/**
 * 和弦上下文提供者 Props
 */
export interface ChordContextProviderProps {
  /** 子组件 */
  children: React.ReactNode;
}