import React, { useState } from 'react';
import ChordGroup from './components/ChordGroup.jsx';
import ChordInput from './components/ChordInput.jsx';

const App = () => {
    const [chordNames, setChordNames] = useState(['F', 'G', 'Em', 'Am', 'Dm', 'G', 'C']);
    
    const handlePitchChordDescriptionChange = (pitchChordDescription) => {
        if (!pitchChordDescription.trim()) {
            setChordNames([]);
            return;
        }
        
        // Update the chord names based on the pitch chord description
        const newChordNames = pitchChordDescription.trim().split(/\s+/);
        setChordNames(newChordNames);
    };

    return (
        <div>
            <ChordInput onPitchChordDescriptionChange={handlePitchChordDescriptionChange} />
            <ChordGroup chordNames={chordNames} />
        </div>
    );
};

export default App;