import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLang = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('i18nextLng', lng); // remember choice
  };

  return (
    <div style={{ textAlign: 'right', marginBottom: '1rem' }}>
      <button
        onClick={() => changeLang('en')}
        style={{
          margin: '0 4px',
          padding: '6px 12px',
          background: i18n.language === 'en' ? '#007bff' : '#e9ecef',
          color: i18n.language === 'en' ? 'white' : 'black',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        {i18n.t('en')}
      </button>
      <button
        onClick={() => changeLang('hi')}
        style={{
          margin: '0 4px',
          padding: '6px 12px',
          background: i18n.language === 'hi' ? '#007bff' : '#e9ecef',
          color: i18n.language === 'hi' ? 'white' : 'black',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        {i18n.t('hi')}
      </button>
    </div>
  );
}