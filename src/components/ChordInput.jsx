import React, { useState, useEffect } from 'react';
import { roman_to_pitch, pitch_to_roman } from '@/chorder/degree.js';
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useChordContext } from '@/contexts/ChordContext.jsx';

// 参考：https://github.com/aymanch-03/shadcn-pricing-page?tab=readme-ov-file
const InputTypeToggle = ({ inputType, onInputTypeChange }) => {
    return (
        <div className="flex w-fit rounded-md bg-gray-200 p-1 dark:bg-[#222]">
            <button 
                className="relative w-fit px-4 py-2 text-sm font-semibold capitalize text-foreground transition-colors"
                onClick={() => onInputTypeChange('roman')}
            >
                <span className="relative z-10">级数形式</span>
                {inputType === 'roman' && (
                    <span className="absolute inset-0 z-0 rounded-md bg-background shadow-sm" style={{ transform: 'none', transformOrigin: '50% 50% 0px' }}></span>
                )}
            </button>
            <button 
                className="relative w-fit px-4 py-2 text-sm font-semibold capitalize text-foreground transition-colors flex items-center justify-center gap-2.5"
                onClick={() => onInputTypeChange('chord')}
            >
                <span className="relative z-10">音名形式</span>
                {inputType === 'chord' && (
                    <span className="absolute inset-0 z-0 rounded-md bg-background shadow-sm" style={{ transform: 'none', transformOrigin: '50% 50% 0px' }}></span>
                )}
            </button>
        </div>
    );
};

const ChordInput = () => {
    const [selectedKey, setSelectedKey] = useState('C');
    const [inputType, setInputType] = useState('roman'); // 'roman' 为级数输入，'chord' 为和弦输入
    const [chordDescription, setChordDescription] = useState('4 5 3 6 2 5 1');
    const { setChordNames } = useChordContext();
    
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
    
    const updateChordNames = (selectedKey, inputType, chordDescription) => {
        console.log('updateChordNames: ', selectedKey, inputType, chordDescription);
        if (!chordDescription.trim()) {
            setChordNames([]);
            return;
        }

        if (inputType === 'roman') {
            const romanChordNames = chordDescription
                .trim()
                .split(/\s+/)
                .map(roman => roman.trim())
                .filter(roman => roman !== '');
            const pitchChordNames = romanChordNames.map(roman => roman_to_pitch(selectedKey, roman));
            setChordNames(pitchChordNames);
        } else {
            const pitchChordNames = chordDescription
                .trim()
                .split(/\s+/)
                .map(pitch => pitch.trim())
                .filter(pitch => pitch !== '');
            setChordNames(pitchChordNames);
        }
    };

    useEffect(() => {
        // Initial call to update context with default chord names array
        updateChordNames(selectedKey, inputType, chordDescription);
    }, []);

    const handleKeyChange = (key) => {
        setSelectedKey(key);
        updateChordNames(key, inputType, chordDescription);
    };

    const handleInputTypeChange = (type) => {
        setInputType(type);
        let newChordDescription = '';
        if (type === 'roman') {
            newChordDescription = chordDescription
                .trim()
                .split(/\s+/)
                .map(pitch => pitch_to_roman(selectedKey, pitch))
                .join(' ');
        } else {
            newChordDescription = chordDescription
                .trim()
                .split(/\s+/)
                .map(roman => roman_to_pitch(selectedKey, roman))
                .join(' ');
        }
        setChordDescription(newChordDescription);
        updateChordNames(selectedKey, type, newChordDescription);
    };

    const handleInputChange = (e) => {
        const newChordDescription = e.target.value;
        setChordDescription(newChordDescription);
        updateChordNames(selectedKey, inputType, newChordDescription);
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
            <div className='w-full flex flex-row gap-2'>
                <InputTypeToggle 
                    inputType={inputType} 
                    onInputTypeChange={handleInputTypeChange} 
                />
            </div>
            <div className="w-full flex flex-row gap-2">
                <div className="w-full h-full flex justify-center items-center">
                    <Textarea
                        className="p-2 text-base w-full h-auto min-h-28"
                        value={chordDescription} 
                        onChange={handleInputChange}
                                            />
                </div>
            </div>
        </div>
    );
};

export default ChordInput;