/**
 * 为 JavaScript 库添加类型声明
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