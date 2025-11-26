import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('i18nextLng', lng);
  };

  return (
    <div className="language-switcher">
      <span className="language-label">{t('language')}:</span>
      <button
        onClick={() => changeLanguage('en')}
        className={`lang-btn ${i18n.language === 'en' ? 'active' : ''}`}
      >
        {t('en')}
      </button>
      <button
        onClick={() => changeLanguage('hi')}
        className={`lang-btn ${i18n.language === 'hi' ? 'active' : ''}`}
      >
        {t('hi')}
      </button>
    </div>
  );
};

export default LanguageSwitcher;