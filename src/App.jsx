import React from 'react';
import { useTranslation } from 'react-i18next';
import ChordOutput from '@/components/ChordOutput.jsx';
import ChordInput from '@/components/ChordInput.jsx';
import LanguageSwitcher from '@/components/LanguageSwitcher.jsx';
import { ChordProvider } from '@/contexts/ChordContext.jsx';
import { Toaster } from "@/components/ui/toaster";

const App = () => {
    const { t } = useTranslation();
    
    return (
        <ChordProvider>
            <div className="m-5 p-4 max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold text-center">{t('appTitle')}</h1>
                    <LanguageSwitcher />
                </div>
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