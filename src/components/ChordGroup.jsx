import React from 'react';
import Chord from './Chord.jsx';

const ChordGroup = ({ chordNames }) => {
    return (
        <div className="chord-group">
            {chordNames.map((chordName, index) => (
                <Chord 
                    key={`${index}-${chordName}`} 
                    name={chordName} 
                />
            ))}
        </div>
    );
};

export default ChordGroup;