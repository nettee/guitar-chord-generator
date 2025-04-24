import { useEffect, useRef } from 'react';
import { drawChord } from '@/chorder/drawChord';
import { chordData } from '@/data/chords';

const Chord = ({ name }) => {
  // 用于获取 DOM 元素的引用，通过 chordRef.current 确认 DOM 元素是否已经挂载
  const chordRef = useRef(null);
  // 用于跟踪组件是否已经渲染过
  const hasRenderedRef = useRef(false); // 添加一个引用来跟踪是否已经渲染过
  
  useEffect(() => {
    // StrictMode 会导致组件渲染两次，如果已经渲染过，则不再重复渲染
    if (hasRenderedRef.current) {
      return;
    }
    
    if (!chordRef.current) {
      // 确保组件挂载后再渲染和弦图
      console.error('无法渲染和弦图，原因: chordRef.current 为空');
      return;
    }
    if (!chordData[name]) {
      console.error(`无法渲染和弦图，原因: chordData["${name}"] 不存在`);
      return;
    }

    // 绘制和弦图
    drawChord(chordRef.current, chordData[name]);
    
    hasRenderedRef.current = true; // 标记为已渲染
    
  }, [name]);

  return (
    <div className="flex flex-col gap-0 items-center">
        <div className="w-[100px] h-[120px] flex justify-center items-center" ref={chordRef}></div>
        <div className="font-sans text-sm text-gray-500 text-center mt-auto">{name}</div>
    </div>
  );
};

export default Chord;