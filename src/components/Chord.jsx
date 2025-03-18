import React, { useEffect, useRef } from 'react';
import { ChordBox } from '../chordbox.js';
import { chordData } from '../data/chords.js';

const Chord = ({ id, name }) => {
  // 用于获取 DOM 元素的引用，通过 chordRef.current 确认 DOM 元素是否已经挂载
  const chordRef = useRef(null);
  // 用于跟踪组件是否已经渲染过
  const hasRenderedRef = useRef(false); // 添加一个引用来跟踪是否已经渲染过
  
  useEffect(() => {
    // StrictMode 会导致组件渲染两次，如果已经渲染过，则不再重复渲染
    if (hasRenderedRef.current) {
      return;
    }
    
    console.log('组件挂载，name:', name);
    
    // TODO 将错误检查前移
    // 确保组件挂载后再渲染和弦图
    if (chordRef.current && chordData[name]) {
      console.log('开始渲染和弦图:', name, id);
      // TODO 使用 chordRef 获取 id，而不是直接传入 id
      const chordBox = new ChordBox(`#${id}`, {
        numFrets: 4,
      });
      chordBox.draw(chordData[name]);
      hasRenderedRef.current = true; // 标记为已渲染
    } else {
      console.error('无法渲染和弦图，原因:');
      if (!chordRef.current) console.error('- chordRef.current 为空');
      if (!chordData[name]) console.error(`- chordData["${name}"] 不存在`);
    }
  }, [id, name]);

  return (
    <div className="chord">
        <div id={id} className="chord-svg" ref={chordRef}></div>
        <div className="chord-caption">{name}</div>
    </div>
  );
};

export default Chord;
