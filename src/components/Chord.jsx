import React from 'react';

const Chord = ({ name }) => {
    return (
        <div className="chord">
            <div className="chord-svg"></div>
            <div className="chord-caption">{name}</div>
        </div>
    );
};

export default Chord;
