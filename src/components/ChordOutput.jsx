import React from 'react';
import Chord from '@/components/Chord.jsx';
import { Textarea } from '@/components/ui/textarea';

const ChordOutput = ({ chordNames }) => {
    return (
        <div>
            <div className="w-full h-full flex justify-center items-center">
                <Textarea 
                    className="p-2 text-base w-full h-auto min-h-12 bg-gray-200"
                    value={chordNames.join(' ')}
                    readOnly
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