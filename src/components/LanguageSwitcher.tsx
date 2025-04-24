import React from 'react';
import { useTranslation } from 'react-i18next';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Languages } from "lucide-react";

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
      <SelectTrigger className="w-auto min-w-0 px-2">
        <Languages className="h-5 w-5" />
        <span className="sr-only">{i18n.language === 'en' ? t('switchLang.en') : t('switchLang.zh')}</span>
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