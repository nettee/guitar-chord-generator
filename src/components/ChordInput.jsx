import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { roman_to_pitch, pitch_to_roman } from '@/chorder/degree.js';
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useChordContext } from '@/contexts/ChordContext.jsx';
import { Button } from './ui/button';
import { useToast } from '@/hooks/use-toast';

const InputTypeEnum = {
    ROMAN: 'roman',
    PITCH: 'pitch'
};

const InputTypeToggle = ({ inputType, onInputTypeChange }) => {
    const { t } = useTranslation();
    
    const inputTypeOptions = [
        { value: InputTypeEnum.ROMAN, label: t('inputType.roman') },
        { value: InputTypeEnum.PITCH, label: t('inputType.pitch') }
    ];
    
    return (
        <div className="flex w-fit rounded-md bg-gray-200 p-1 dark:bg-[#222]">
            {inputTypeOptions.map((option) => (
                <button 
                    key={option.value}
                    className="relative w-fit px-4 py-2 text-sm font-semibold text-foreground transition-colors"
                    onClick={() => onInputTypeChange(option.value)}
                >
                    <span className="relative z-10">{option.label}</span>
                    {inputType === option.value && (
                        <span className="absolute inset-0 z-0 rounded-md bg-background shadow-sm" style={{ transform: 'none', transformOrigin: '50% 50% 0px' }}></span>
                    )}
                </button>
            ))}
        </div>
    );
};

const KeySelect = ({ selectedKey, onKeyChange }) => {
    const { t } = useTranslation();
    
    const availableKeys = [
        { value: 'C', label: t('keySelect.C') },
        { value: 'G', label: t('keySelect.G') },
        { value: 'D', label: t('keySelect.D') },
        { value: 'A', label: t('keySelect.A') },
        { value: 'E', label: t('keySelect.E') }
    ];
    
    return (
        <Select 
            value={selectedKey}
            onValueChange={onKeyChange}
        >
            <SelectTrigger className="w-32">
                <SelectValue placeholder={t('keySelect.placeholder')} />
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
    );
};

const ChordPresetSelect = ({ onPresetSelected }) => {
    const { t } = useTranslation();
    
    const availableChordPresets = [
        { value: '1 6 4 5', label: t('chordPresets.1645') },
        { value: '1 6 2 5', label: t('chordPresets.1625') },
        { value: '1 5 6 3 4 1 2 5', label: t('chordPresets.canon') },
        { value: '4 5 3 6 2 5 1', label: t('chordPresets.4536251') },
        { value: '1 5 6 4', label: t('chordPresets.1564') },
        { value: '6 4 1 5', label: t('chordPresets.6415') },
    ];
    
    return (
        <Select
            value={''}
            onValueChange={onPresetSelected}
        >
            <SelectTrigger className="w-32">
                <SelectValue placeholder={t('chordPresets.placeholder')} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {availableChordPresets.map(preset => (
                        <SelectItem key={preset.value} value={preset.value}>
                            {preset.label}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

const ChordInput = () => {
    const { t } = useTranslation();
    const [selectedKey, setSelectedKey] = useState('C');
    const [inputType, setInputType] = useState(InputTypeEnum.ROMAN);
    const [chordDescription, setChordDescription] = useState('4 5 3 6 2 5 1');
    const { setChordNames } = useChordContext();
    const { toast } = useToast();
    
    const updateChordNames = (selectedKey, inputType, chordDescription) => {
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
        if (type === InputTypeEnum.ROMAN) {
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

    const handleChordDescriptionChange = (description) => {
        setChordDescription(description);
        updateChordNames(selectedKey, inputType, description);
    };

    const handlePresetSelected = (preset) => {
        const newChordDescription = chordDescription + ' ' + preset;
        setChordDescription(newChordDescription);
        updateChordNames(selectedKey, inputType, newChordDescription);
    };

    const handleCopyChordDescription = () => {
        navigator.clipboard.writeText(chordDescription);
        toast({
            description: t('buttons.copySuccess'),
        });
    };

    return (
        <div className="m-5 flex flex-col gap-4 items-center">
            <div className="w-full flex flex-row gap-2">
                <KeySelect 
                    selectedKey={selectedKey} 
                    onKeyChange={handleKeyChange} 
                />
            </div>
            <div className='w-full flex flex-row gap-2 items-center'>
                <div className="w-1/2 flex flex-row gap-2">
                    <InputTypeToggle 
                        inputType={inputType} 
                        onInputTypeChange={handleInputTypeChange} 
                    />
                </div>
                <div className="w-1/2 ml-auto flex flex-row-reverse gap-2 items-center">
                    <Button
                        variant="destructive"
                        className=""
                        onClick={() => handleChordDescriptionChange('')}
                    >
                        {t('buttons.clear')}
                    </Button>
                    <Button
                        variant="outline"
                        className=""
                        onClick={handleCopyChordDescription}
                    >
                        {t('buttons.copy')}
                    </Button>
                    <ChordPresetSelect 
                        onPresetSelected={handlePresetSelected}
                    />
                </div>
            </div>
            <div className="w-full flex justify-center items-center">
                <Textarea
                    className="p-2 text-base w-full h-auto min-h-28"
                    placeholder={t('textarea.placeholder')}
                    value={chordDescription} 
                    onChange={(e) => handleChordDescriptionChange(e.target.value)}
                />
            </div>
        </div>
    );
};

export default ChordInput;