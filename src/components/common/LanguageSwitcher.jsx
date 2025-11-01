import React from 'react';
import { useTranslation } from 'react-i18next';
import './LanguageSwitcher.css';

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="language-switcher">
      <span className="language-label">{t('language')}:</span>
      <button
        onClick={() => changeLanguage('en')}
        className={`lang-btn ${i18n.language === 'en' ? 'active' : ''}`}
      >
        {t('english')}
      </button>
      <button
        onClick={() => changeLanguage('hi')}
        className={`lang-btn ${i18n.language === 'hi' ? 'active' : ''}`}
      >
        {t('hindi')}
      </button>
    </div>
  );
};

export default LanguageSwitcher;