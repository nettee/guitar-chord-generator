import React, { useState } from 'react';
import ChordGroup from './components/ChordGroup.jsx';
import { roman_to_pitch } from './degree.js';

const App = () => {
    const [selectedKey, setSelectedKey] = useState('C');
    const [chordDescription, setChordDescription] = useState('4 5 3 6 2 5 1');
    const [pitchChordDescription, setPitchChordDescription] = useState('F G Em Am Dm G C');
    const [chordNames, setChordNames] = useState(['F', 'G', 'Em', 'Am', 'Dm', 'G', 'C']);
    
    // Define available keys
    const availableKeys = [
        { value: 'C', label: 'C大调' },
        { value: 'G', label: 'G大调' },
        { value: 'D', label: 'D大调' },
        { value: 'A', label: 'A大调' },
        { value: 'E', label: 'E大调' }
    ];
    
    const redraw = (selectedKey, chordDescription) => {
        if (!chordDescription.trim()) {
            setPitchChordDescription('');
            setChordNames([]);
            return;
        }

        const romanChordNames = chordDescription
            .trim()
            .split(' ')
            .map(roman => roman.trim())
            .filter(roman => roman !== '');
        const pitchChordNames = romanChordNames.map(roman => roman_to_pitch(selectedKey, roman));
        setPitchChordDescription(pitchChordNames.join(' '));
        setChordNames(pitchChordNames);
    };

    const handleKeyChange = (e) => {
        const selectedKey = e.target.value;
        setSelectedKey(selectedKey);

        redraw(selectedKey, chordDescription);
    };

    const handleInputChange = (e) => {
        const chordDescription = e.target.value;
        setChordDescription(chordDescription);

        redraw(selectedKey, chordDescription);
    };

    return (
        <div>
            <div className="input-container">
                <div className="key-selector">
                    {availableKeys.map(key => (
                        <div className="key-option" key={key.value}>
                            <input 
                                type="radio" 
                                id={`key-${key.value.toLowerCase()}`} 
                                name="key" 
                                value={key.value} 
                                checked={selectedKey === key.value} 
                                onChange={handleKeyChange} 
                            />
                            <label htmlFor={`key-${key.value.toLowerCase()}`}>{key.label}</label>
                        </div>
                    ))}
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
