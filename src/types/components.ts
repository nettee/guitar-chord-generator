/**
 * 组件 Props 类型定义
 */

/**
 * 和弦组件参数
 */
export interface ChordProps {
  /** 和弦名称 */
  name: string;
}

/**
 * 和弦输入组件选择器参数
 */
export interface InputTypeToggleProps {
  /** 当前输入类型 */
  inputType: string;
  /** 输入类型变更处理函数 */
  onInputTypeChange: (type: string) => void;
}

/**
 * 调性选择组件参数
 */
export interface KeySelectProps {
  /** 当前选中的调 */
  selectedKey: string;
  /** 调变更处理函数 */
  onKeyChange: (key: string) => void;
}

/**
 * 和弦预设选择组件参数
 */
export interface ChordPresetSelectProps {
  /** 预设选择处理函数 */
  onPresetSelected: (preset: string) => void;
}

/**
 * 和弦输出组件参数
 */
export interface ChordOutputProps {
  /** 和弦名称列表 */
  chordNames: string[];
}