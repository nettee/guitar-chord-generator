import React, { useState, useEffect } from 'react';
import { roman_to_pitch } from '../degree.js';

const ChordInput = ({ onPitchChordDescriptionChange }) => {
    const [selectedKey, setSelectedKey] = useState('C');
    const [chordDescription, setChordDescription] = useState('4 5 3 6 2 5 1');
    const [pitchChordDescription, setPitchChordDescription] = useState('F G Em Am Dm G C');
    
    // Define available keys
    const availableKeys = [
        { value: 'C', label: 'C大调' },
        { value: 'G', label: 'G大调' },
        { value: 'D', label: 'D大调' },
        { value: 'A', label: 'A大调' },
        { value: 'E', label: 'E大调' }
    ];
    
    // Define available chord presets
    const availableChordPresets = [
        { value: '1 6 4 5', label: '1645' },
        { value: '1 6 2 5', label: '1625' },
        { value: '1 5 6 3 4 1 2 5', label: '15634125 (卡农)' },
        { value: '4 5 3 6 2 5 1', label: '4536251' },
        { value: '1 5 6 4', label: '1564' },
        { value: '6 4 1 5', label: '6415' },
        // 可以在这里添加更多和弦预设
    ];
    
    const redraw = (selectedKey, chordDescription) => {
        if (!chordDescription.trim()) {
            setPitchChordDescription('');
            onPitchChordDescriptionChange('');
            return;
        }

        const romanChordNames = chordDescription
            .trim()
            .split(/\s+/)
            .map(roman => roman.trim())
            .filter(roman => roman !== '');
        const pitchChordNames = romanChordNames.map(roman => roman_to_pitch(selectedKey, roman));
        const newPitchChordDescription = pitchChordNames.join(' ');
        setPitchChordDescription(newPitchChordDescription);
        onPitchChordDescriptionChange(newPitchChordDescription);
    };

    useEffect(() => {
        // Initial call to parent with default value
        onPitchChordDescriptionChange(pitchChordDescription);
    }, []);

    const handleKeyChange = (e) => {
        const newSelectedKey = e.target.value;
        setSelectedKey(newSelectedKey);
        redraw(newSelectedKey, chordDescription);
    };

    const handleInputChange = (e) => {
        const newChordDescription = e.target.value;
        setChordDescription(newChordDescription);
        redraw(selectedKey, newChordDescription);
    };

    return (
        <div className="input-container">
            <div className="chord-input-line-1">
                <div className="key-selector">
                    <select 
                        value={selectedKey} 
                        onChange={handleKeyChange}
                    >
                        {availableKeys.map(key => (
                            <option key={key.value} value={key.value}>
                                {key.label}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='chord-preset-selector'>
                    <select 
                        // 和弦预设直接更新 chordDescription
                        value={chordDescription} 
                        onChange={handleInputChange}
                    >
                        {availableChordPresets.map(preset => (
                            <option key={preset.value} value={preset.value}>
                                {preset.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className='chord-input-line-2'>
                <div className="chord-description-input">
                    <textarea 
                        value={chordDescription} 
                        onChange={handleInputChange}
                    />
                </div>
            </div>
            <div className="chord-description-output">
                <textarea 
                    value={pitchChordDescription} 
                    readOnly
                />
            </div>
        </div>
    );
};

export default ChordInput;