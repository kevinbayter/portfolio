import { FaGlobe } from 'react-icons/fa';
import { useLanguage } from '../../hooks/useLanguage';

interface LanguageSelectorProps {
  className?: string;
}

const LanguageSelector = ({ className = '' }: LanguageSelectorProps) => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'es' : 'en');
  };

  return (
      <button
          onClick={toggleLanguage}
          aria-label={`Change language to ${language === 'en' ? 'Spanish' : 'English'}`}
          title={`Change language to ${language === 'en' ? 'Spanish' : 'English'}`}
          className={`flex items-center space-x-1 px-2 py-1 rounded-full bg-gray-700/50 hover:bg-gray-600 transition-colors ${className}`}
      >
        <FaGlobe className="text-gray-300"/>
        <span className="text-gray-200 text-sm uppercase font-medium">{language === 'en' ? 'EN' : 'ES'}</span>
      </button>
  );
};

export default LanguageSelector; 