import React from 'react';
import Chord from './Chord.jsx';
import { Textarea } from '@/components/ui/textarea';

const ChordOutput = ({ chordNames }) => {
    return (
        <div className='chord-output'>
            <div className="chord-description-output">
                <Textarea 
                    value={chordNames.join(' ')}
                    readOnly
                />
            </div>
            <div className="chord-group">
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