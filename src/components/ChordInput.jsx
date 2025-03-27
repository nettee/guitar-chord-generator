import React, { useState, useEffect } from 'react';
import { roman_to_pitch } from '@/chorder/degree.js';
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useChordContext } from '@/contexts/ChordContext.jsx';

const ChordInput = () => {
    const { setChordNames } = useChordContext();
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
    
    const updateChordNames = (selectedKey, chordDescription) => {
        if (!chordDescription.trim()) {
            setChordNames([]);
            return;
        }

        const romanChordNames = chordDescription
            .trim()
            .split(/\s+/)
            .map(roman => roman.trim())
            .filter(roman => roman !== '');
        const pitchChordNames = romanChordNames.map(roman => roman_to_pitch(selectedKey, roman));
        setChordNames(pitchChordNames);
    };

    useEffect(() => {
        // Initial call to update context with default chord names array
        updateChordNames(selectedKey, chordDescription);
    }, []);

    const handleKeyChange = (key) => {
        setSelectedKey(key);
        updateChordNames(key, chordDescription);
    };

    const handleInputChange = (e) => {
        const newChordDescription = e.target.value;
        setChordDescription(newChordDescription);
        updateChordNames(selectedKey, newChordDescription);
    };

    return (
        <div className="m-5 flex flex-col gap-4 items-center">
            <div className="w-full flex flex-row gap-2">
                <Select 
                    value={selectedKey}
                    onValueChange={handleKeyChange}
                >
                    <SelectTrigger className="w-32">
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
            <div className="w-full flex flex-row gap-2">
                <div className="w-full h-full flex justify-center items-center">
                    <Textarea
                        className="p-2 text-base w-full h-auto min-h-12"
                        value={chordDescription} 
                        onChange={handleInputChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default ChordInput;