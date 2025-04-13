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
   * 将级数和弦转换为音名和弦
   * @param key 调
   * @param degree 级数和弦
   * @returns 音名和弦
   */
  export function degree_to_name(key: string, degree: string): string;
  
  /**
   * 将音名和弦转换为级数和弦
   * @param key 调
   * @param name 音名和弦
   * @returns 级数和弦
   */
  export function name_to_degree(key: string, name: string): string;
}