import React, { useState } from 'react';
import ChordGroup from './components/ChordGroup.jsx';
import { roman_to_pitch } from './degree.js';

const App = () => {
    const [selectedKey, setSelectedKey] = useState('C');
    const [chordDescription, setChordDescription] = useState('4 5 3 6 2 5 1');
    const [pitchChordDescription, setPitchChordDescription] = useState('F G Em Am Dm G C');
    const [chordNames, setChordNames] = useState(['F', 'G', 'Em', 'Am', 'Dm', 'G', 'C']);
    
    const handleKeyChange = (e) => {
        setSelectedKey(e.target.value);
    };

    const handleInputChange = (e) => {
        const romanChordDescription = e.target.value;
        setChordDescription(romanChordDescription);

        if (!romanChordDescription.trim()) {
            setPitchChordDescription('');
            setChordNames([]);
            return;
        }

        const romanChordNames = romanChordDescription.trim().split(' ');
        const pitchChordNames = romanChordNames.map(roman => roman_to_pitch(selectedKey, roman));
        setPitchChordDescription(pitchChordNames.join(' '));
        setChordNames(pitchChordNames);
    };

    return (
        <div>
            <div className="input-container">
                <div className="key-selector">
                    <div className="key-option">
                        <input type="radio" id="key-c" name="key" value="C" checked={selectedKey === 'C'} onChange={handleKeyChange} />
                        <label htmlFor="key-c">C大调</label>
                    </div>
                    <div className="key-option">
                        <input type="radio" id="key-g" name="key" value="G" checked={selectedKey === 'G'} onChange={handleKeyChange} />
                        <label htmlFor="key-g">G大调</label>
                    </div>
                    <div className="key-option">
                        <input type="radio" id="key-d" name="key" value="D" checked={selectedKey === 'D'} onChange={handleKeyChange} />
                        <label htmlFor="key-d">D大调</label>
                    </div>
                    <div className="key-option">
                        <input type="radio" id="key-a" name="key" value="A" checked={selectedKey === 'A'} onChange={handleKeyChange} />
                        <label htmlFor="key-a">A大调</label>
                    </div>
                    <div className="key-option">
                        <input type="radio" id="key-e" name="key" value="E" checked={selectedKey === 'E'} onChange={handleKeyChange} />
                        <label htmlFor="key-e">E大调</label>
                    </div>
                </div>
                <div className="chord-input">
                    <textarea 
                        value={chordDescription} 
                        onChange={handleInputChange}
                    />
                    <textarea 
                        value={pitchChordDescription} 
                        readOnly
                        style={{ backgroundColor: '#f0f0f0' }}
                    />
                </div>
            </div>
            <ChordGroup chordNames={chordNames} />
        </div>
    );
};

export default App;
