/**
 * 第三方库类型声明
 */

declare module '@/chorder/chordbox' {
  import { ChordDefinition, ChordBoxParams } from '@/types';
  
  export class ChordBox {
    /**
     * 创建一个和弦盒子
     * @param selector CSS选择器或DOM元素
     * @param params 配置参数
     */
    constructor(selector: string, params?: ChordBoxParams);
    
    /**
     * 绘制和弦图
     * @param data 和弦数据
     */
    draw(data: ChordDefinition): void;
  }
}

declare module '@/chorder/degree' {
  /**
   * 将罗马数字度数转换为音高和弦名
   * @param key 调
   * @param roman 罗马数字度数
   * @returns 音高和弦名
   */
  export function roman_to_pitch(key: string, roman: string): string;
  
  /**
   * 将音高和弦名转换为罗马数字度数
   * @param key 调
   * @param pitch 音高和弦名
   * @returns 罗马数字度数
   */
  export function pitch_to_roman(key: string, pitch: string): string;
}