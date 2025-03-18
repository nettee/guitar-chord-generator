import React, { useEffect, useRef } from 'react';
import { ChordBox } from '../chordbox.js';
import { chordData } from '../data/chords.js';

// TODO 不再传入 id，而是自动生成
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
    
    if (!chordRef.current) {
      // 确保组件挂载后再渲染和弦图
      console.error('无法渲染和弦图，原因: chordRef.current 为空');
      return;
    }
    if (!chordData[name]) {
      console.error(`无法渲染和弦图，原因: chordData["${name}"] 不存在`);
      return;
    }

    const elementId = chordRef.current.id;
    const chordBox = new ChordBox(`#${elementId}`, {
      numFrets: 4,
    });
    chordBox.draw(chordData[name]);
    hasRenderedRef.current = true; // 标记为已渲染
    
  }, [id, name]);

  return (
    <div className="chord">
        <div id={id} className="chord-svg" ref={chordRef}></div>
        <div className="chord-caption">{name}</div>
    </div>
  );
};

export default Chord;
