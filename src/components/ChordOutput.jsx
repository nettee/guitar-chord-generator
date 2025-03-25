import React from 'react';
import Chord from './Chord.jsx';

const ChordOutput = ({ chordNames }) => {
    return (
        <div className='chord-output'>
            <div className="chord-description-output">
                <textarea 
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