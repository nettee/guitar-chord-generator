import React, { useState, useEffect } from 'react';
import { roman_to_pitch } from '@/degree.js';
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


const ChordInput = ({ onChordNamesChange }) => {
    const [selectedKey, setSelectedKey] = useState('C');
    const [chordDescription, setChordDescription] = useState('4 5 3 6 2 5 1');
    
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
            onChordNamesChange([]);
            return;
        }

        const romanChordNames = chordDescription
            .trim()
            .split(/\s+/)
            .map(roman => roman.trim())
            .filter(roman => roman !== '');
        const pitchChordNames = romanChordNames.map(roman => roman_to_pitch(selectedKey, roman));
        onChordNamesChange(pitchChordNames);
    };

    useEffect(() => {
        // Initial call to parent with default chord names array
        redraw(selectedKey, chordDescription);
    }, []);

    const handleKeyChange = (key) => {
        setSelectedKey(key);
        redraw(key, chordDescription);
    };

    const handleInputChange = (e) => {
        const newChordDescription = e.target.value;
        setChordDescription(newChordDescription);
        redraw(selectedKey, newChordDescription);
    };

    return (
        <div className="input-container">
            <div className="chord-input-line-1">
                <Select 
                    value={selectedKey}
                    onValueChange={handleKeyChange}
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="选择调式" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {availableKeys.map(key => (
                                <SelectItem key={key.value} value={key.value}>
                                    {key.label}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div className='chord-input-line-2'>
                <div className="chord-description-input">
                    <Textarea 
                        value={chordDescription} 
                        onChange={handleInputChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default ChordInput;