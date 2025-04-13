import React, { createContext, useState, useContext } from 'react';

interface ChordContextType {
  chordNames: string[];
  setChordNames: React.Dispatch<React.SetStateAction<string[]>>;
}

const ChordContext = createContext<ChordContextType | undefined>(undefined);

export const useChordContext = (): ChordContextType => {
    const context = useContext(ChordContext);
    if (!context) {
        throw new Error('useChordContext must be used within a ChordProvider');
    }
    return context;
};

export const ChordProvider = ({ children }: { children: React.ReactNode }) => {
    const [chordNames, setChordNames] = useState<string[]>(['F', 'G', 'Em', 'Am', 'Dm', 'G', 'C']);

    return (
        <ChordContext.Provider value={{ chordNames, setChordNames }}>
            {children}
        </ChordContext.Provider>
    );
};