import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { degree_to_name, name_to_degree } from '@/chorder/degree';
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useChordContext } from '@/contexts/ChordContext';
import { Button } from './ui/button';
import { useToast } from '@/hooks/use-toast';
import { LucideIcon, Music, SwitchCamera, Trash2, ClipboardCopy, SquareDashedBottomCode } from 'lucide-react';

const InputTypeEnum = {
    DEGREE: 'degree',
    NAME: 'name'
};

const GenericSelect = ({ 
    value, 
    onValueChange, 
    options, 
    placeholder,
    className = "",
    icon: Icon
}: { 
    value: string, 
    onValueChange: (value: string) => void, 
    options: {value: string, label: string}[],
    placeholder: string,
    className?: string,
    icon?: LucideIcon
}) => {
    return (
        <Select 
            value={value}
            onValueChange={onValueChange}
        >
            <SelectTrigger className={`w-auto ${className}`}>
                {Icon && <Icon className="mr-2 h-4 w-4" />}
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {options.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

const ChordPresetSelect = ({ onPresetSelected }: { onPresetSelected: (preset: string) => void }) => {
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
        <GenericSelect
            value={''}
            onValueChange={onPresetSelected}
            options={availableChordPresets}
            placeholder={t('chordPresets.placeholder')}
            icon={SquareDashedBottomCode}
        />
    );
};



const ChordInput = () => {
    const { t } = useTranslation();
    const [selectedKey, setSelectedKey] = useState('C');
    const [inputType, setInputType] = useState(InputTypeEnum.DEGREE);
    const [chordDescription, setChordDescription] = useState('4 5 3 6 2 5 1');
    const { setChordNames } = useChordContext();
    const { toast } = useToast();
    
    const updateChordNames = (selectedKey: string, inputType: string, chordDescription: string) => {
        if (!chordDescription.trim()) {
            setChordNames([]);
            return;
        }

        if (inputType === InputTypeEnum.DEGREE) {
            const degreeChordNames = chordDescription
                .trim()
                .split(/\s+/)
                .map((degreeChord: string) => degreeChord.trim())
                .filter((degreeChord: string) => degreeChord !== '');
            const nameChordNames = degreeChordNames.map((degreeChord: string) => degree_to_name(selectedKey, degreeChord));
            setChordNames(nameChordNames);
        } else {
            const nameChordNames = chordDescription
                .trim()
                .split(/\s+/)
                .map((nameChord: string) => nameChord.trim())
                .filter((nameChord: string) => nameChord !== '');
            setChordNames(nameChordNames);
        }
    };

    useEffect(() => {
        // Initial call to update context with default chord names array
        updateChordNames(selectedKey, inputType, chordDescription);
    }, []);

    const handleKeyChange = (key: string) => {
        setSelectedKey(key);
        updateChordNames(key, inputType, chordDescription);
    };

    const handleInputTypeChange = (type: string) => {
        setInputType(type);
        let newChordDescription = '';
        if (type === InputTypeEnum.DEGREE) {
            newChordDescription = chordDescription
                .trim()
                .split(/\s+/)
                .map((nameChord: string) => name_to_degree(selectedKey, nameChord))
                .join(' ');
        } else {
            newChordDescription = chordDescription
                .trim()
                .split(/\s+/)
                .map((degreeChord: string) => degree_to_name(selectedKey, degreeChord))
                .join(' ');
        }
        setChordDescription(newChordDescription);
        updateChordNames(selectedKey, type, newChordDescription);
    };

    const handleChordDescriptionChange = (description: string) => {
        setChordDescription(description);
        updateChordNames(selectedKey, inputType, description);
    };

    const handlePresetSelected = (preset: string) => {
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

    const keyOptions = [
        { value: 'C', label: t('keySelect.C') },
        { value: 'G', label: t('keySelect.G') },
        { value: 'D', label: t('keySelect.D') },
        { value: 'A', label: t('keySelect.A') },
        { value: 'E', label: t('keySelect.E') }
    ];

    const inputTypeOptions = [
        { value: InputTypeEnum.DEGREE, label: t('inputType.byDegree') },
        { value: InputTypeEnum.NAME, label: t('inputType.byName') }
    ];

    return (
        <div className="flex flex-col gap-4">
            <div className="w-full sm:w-80 flex flex-row gap-2">
                {[
                    {
                        label: t('keySelect.label'),
                        value: selectedKey,
                        onValueChange: handleKeyChange,
                        options: keyOptions,
                        placeholder: t('keySelect.placeholder'),
                        icon: Music
                    },
                    {
                        label: t('inputType.label'),
                        value: inputType,
                        onValueChange: handleInputTypeChange,
                        options: inputTypeOptions,
                        placeholder: t('inputType.placeholder'),
                        icon: SwitchCamera,
                    }
                ].map((selectConfig, index) => (
                    <div key={index} className="flex flex-1 items-center justify-between">
                        <GenericSelect 
                            value={selectConfig.value}
                            onValueChange={selectConfig.onValueChange}
                            className='w-full'
                            options={selectConfig.options}
                            placeholder={selectConfig.placeholder}
                            icon={selectConfig.icon}
                        />
                    </div>
                ))}
            </div>
            <div className="w-full flex justify-center items-center">
                <Textarea
                    className="p-2 text-base w-full h-auto min-h-28"
                    placeholder={t('textarea.placeholder')}
                    value={chordDescription} 
                    onChange={(e) => handleChordDescriptionChange(e.target.value)}
                />
            </div>
            <div className="flex w-full ml-auto flex-row-reverse gap-2 items-center">
                <Button
                    variant="destructive"
                    className="px-3 h-9 sm:px-4"
                    onClick={() => handleChordDescriptionChange('')}
                >
                    <Trash2 className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline-block sm:ml-2">{t('buttons.clear')}</span>
                </Button>
                <Button
                    variant="outline"
                    className="px-3 h-9 sm:px-4"
                    onClick={handleCopyChordDescription}
                >
                    <ClipboardCopy className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline-block sm:ml-2">{t('buttons.copy')}</span>
                </Button>
                <ChordPresetSelect 
                    onPresetSelected={handlePresetSelected}
                />
            </div>
            
        </div>
    );
};

export default ChordInput;