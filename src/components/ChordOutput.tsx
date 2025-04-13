import React from 'react';
import Chord from '@/components/Chord';
import { Textarea } from '@/components/ui/textarea';
import { useChordContext } from '@/contexts/ChordContext';

const ChordOutput = () => {
    const { chordNames } = useChordContext();
    
    return (
        <div>
            <div className="w-full h-full flex justify-center items-center">
                <Textarea 
                    className="p-2 text-base w-full h-auto min-h-12 bg-gray-200"
                    value={chordNames.join(' ')}
                    readOnly
                    style={{ display: 'none' }}
                />
            </div>
            <div className="flex flex-row flex-wrap gap-2 justify-center items-start">
                {chordNames.map((chordName, index) => (
                    <Chord 
                        key={`${index}-${chordName}`} 
                        name={chordName} 
                    />
                ))}
            </div>
        </div>
    );
};

export default ChordOutput;