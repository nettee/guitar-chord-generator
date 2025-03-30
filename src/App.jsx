import React from 'react';
import ChordOutput from '@/components/ChordOutput.jsx';
import ChordInput from '@/components/ChordInput.jsx';
import { ChordProvider } from '@/contexts/ChordContext.jsx';
import { Toaster } from "@/components/ui/toaster";

const App = () => {
    return (
        <ChordProvider>
            <div className="p-4 max-w-4xl mx-auto">
                <h1 className="text-2xl font-bold mb-4 text-center">Guitar Chord Generator</h1>
                <div className="space-y-12">
                    <ChordInput />
                    <ChordOutput />
                </div>
            </div>
            <Toaster />
        </ChordProvider>
    );
};

export default App;