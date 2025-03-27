import React, { createContext, useState, useContext } from 'react';

const ChordContext = createContext();

export const useChordContext = () => {
    const context = useContext(ChordContext);
    if (!context) {
        throw new Error('useChordContext must be used within a ChordProvider');
    }
    return context;
};

export const ChordProvider = ({ children }) => {
    const [chordNames, setChordNames] = useState(['F', 'G', 'Em', 'Am', 'Dm', 'G', 'C']);

    return (
        <ChordContext.Provider value={{ chordNames, setChordNames }}>
            {children}
        </ChordContext.Provider>
    );
}; 