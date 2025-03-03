import React, { useEffect } from 'react';
import Chord from './components/Chord.jsx';
import { draw_4536251 } from './main.js';

const App = () => {
    // TODO 与 vite HMR 结合工作
    useEffect(() => {
        // 确保在组件渲染后调用
        draw_4536251();
      }, []);

    const chords = ['F', 'G', 'Em', 'Am', 'Dm', 'G', 'C'];

    return (
        <div className="chord-group">
            {chords.map((chord, index) => (
                <Chord key={index} name={chord} />
            ))}
        </div>
    );
};

export default App;
