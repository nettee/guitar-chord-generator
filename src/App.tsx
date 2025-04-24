import React from 'react';
import { useTranslation } from 'react-i18next';
import { Guitar } from 'lucide-react';
import ChordOutput from '@/components/ChordOutput';
import ChordInput from '@/components/ChordInput';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { ChordProvider } from '@/contexts/ChordContext';
import { Toaster } from "@/components/ui/toaster";

const App = () => {
    const { t } = useTranslation();
    
    return (
        <ChordProvider>
            <div className="max-w-4xl mx-auto">
                <div className="flex flex-col mb-2">
                    <div className="mx-5 my-3 flex justify-between items-center ">
                        <div className="flex items-center gap-2">
                            <Guitar className="h-6 w-6" />
                            <h1 className="text-2xl font-bold">{t('appTitle')}</h1>
                        </div>
                        <LanguageSwitcher />
                    </div>
                    <div className="h-px bg-gray-200 w-full"></div>
                </div>
                <div className="p-4 mx-auto space-y-6">
                    <ChordInput />
                    <div className="h-px bg-gray-200 w-full"></div>
                    <ChordOutput />
                </div>
            </div>
            <Toaster />
        </ChordProvider>
    );
};

export default App;