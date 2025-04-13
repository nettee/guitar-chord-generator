import React from 'react';
import { useTranslation } from 'react-i18next';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Globe } from "lucide-react";

const LanguageSwitcher = () => {
  const { t, i18n } = useTranslation();
  
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Select
      value={i18n.language}
      onValueChange={changeLanguage}
    >
      <SelectTrigger className="w-auto min-w-28">
        <Globe className="mr-2 h-4 w-4" />
        <SelectValue>
          {i18n.language === 'en' ? t('switchLang.en') : t('switchLang.zh')}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="en">{t('switchLang.en')}</SelectItem>
          <SelectItem value="zh">{t('switchLang.zh')}</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default LanguageSwitcher;