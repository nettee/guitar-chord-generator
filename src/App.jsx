import React, { useState } from 'react';
import ChordOutput from './components/ChordOutput.jsx';
import ChordInput from './components/ChordInput.jsx';

const App = () => {
    const [chordNames, setChordNames] = useState(['F', 'G', 'Em', 'Am', 'Dm', 'G', 'C']);
    
    const handleChordNamesChange = (newChordNames) => {
        setChordNames(newChordNames);
    };

    return (
        <div>
            <ChordInput onChordNamesChange={handleChordNamesChange} />
            <ChordOutput chordNames={chordNames} />
        </div>
    );
};

export default App;