import React, { useState } from 'react';
import ChordOutput from './components/ChordOutput.jsx';
import ChordInput from './components/ChordInput.jsx';
import { Button } from './components/ui/button.jsx';

const App = () => {
    const [chordNames, setChordNames] = useState(['F', 'G', 'Em', 'Am', 'Dm', 'G', 'C']);
    
    const handleChordNamesChange = (newChordNames) => {
        setChordNames(newChordNames);
    };

    return (
        <div className="p-4 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Guitar Chord Generator</h1>
            <div className="space-y-4">
                <ChordInput onChordNamesChange={handleChordNamesChange} />
                <ChordOutput chordNames={chordNames} />
            </div>
        </div>
    );
};

export default App;