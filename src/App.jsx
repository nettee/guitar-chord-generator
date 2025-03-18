import React from 'react';
import Chord from './components/Chord.jsx';
import { chordSequence } from './data/chords.js';

const App = () => {
    return (
        <div className="chord-group">
            {chordSequence.map((chordName, index) => (
                <Chord 
                    key={index} 
                    name={chordName} 
                />
            ))}
        </div>
    );
};

export default App;
