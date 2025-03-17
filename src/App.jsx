import React from 'react';
import Chord from './components/Chord.jsx';
import { chordSequence } from './data/chords.js';

const App = () => {
    return (
        <div className="chord-group">
            {chordSequence.map((chordName, index) => (
                <Chord 
                    key={index} 
                    id={`chord-svg-${chordName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${index}`}
                    name={chordName} 
                />
            ))}
        </div>
    );
};

export default App;
