import { ChordBox, ChordBoxParams } from './chordbox';
import { ChordDefinition } from '@/types';

/**
 * 绘制和弦图的工具函数
 * 
 * @param container DOM元素，和弦图将渲染在此元素内
 * @param options ChordBox配置参数
 * @param chordDefinition 和弦定义数据
 * @returns ChordBox实例，允许链式调用
 */
export function drawChord(
  container: HTMLElement,
  chordDefinition: ChordDefinition,
  options: ChordBoxParams = {},
): void {
  // 创建默认选项
  const defaultOptions: ChordBoxParams = {
    numFrets: 4,
    showTuning: false,
  };

  // 合并默认选项和用户提供的选项
  const mergedOptions = { ...defaultOptions, ...options };

  // 创建ChordBox实例
  const chordBox = new ChordBox(mergedOptions);
  
  // 提取和弦定义的属性，并提供默认值
  const { 
    chord,
    position = 0,
    barres = [],
    positionText = position, // 默认与position相同
    tuning
  } = chordDefinition;
  
  // 绘制和弦图
  chordBox.draw(container, {
    chord,
    position,
    barres,
    positionText,
    tuning
  });
}