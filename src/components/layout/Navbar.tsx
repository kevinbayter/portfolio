import { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import logoImage from '@assets/images/logo.svg';
import { useLanguage } from '@hooks/useLanguage.tsx';
import LanguageSelector from '../common/LanguageSelector';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-gray-800/95 shadow-xl backdrop-blur-sm py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="logo">
          <a href="#header">
            <img 
              src={logoImage} 
              alt="Kevin Bayter" 
              className="h-10"
            />
          </a>
        </div>

        <div className="md:hidden flex items-center gap-2">
          <LanguageSelector />
          <button 
            onClick={toggleMenu}
            className={`${isScrolled ? 'text-gray-200' : 'text-white'} hover:text-primary transition-colors`}
            aria-label="Toggle menu"
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        <ul className={`
          md:flex md:space-x-6 items-center
          ${isOpen 
            ? 'absolute top-full left-0 w-full bg-gray-800 shadow-md p-4 flex flex-col space-y-4' 
            : 'hidden'
          }
          md:static md:bg-transparent md:shadow-none md:p-0 md:space-y-0
        `}>
          <li>
            <a 
              href="#header" 
              className={`${isScrolled ? 'text-gray-200' : 'text-white'} hover:text-primary transition-colors`}
              onClick={closeMenu}
            >
              {t.home}
            </a>
          </li>
          <li>
            <a 
              href="#about" 
              className={`${isScrolled ? 'text-gray-200' : 'text-white'} hover:text-primary transition-colors`}
              onClick={closeMenu}
            >
              {t.about}
            </a>
          </li>
          <li>
            <a 
              href="#portfolio" 
              className={`${isScrolled ? 'text-gray-200' : 'text-white'} hover:text-primary transition-colors`}
              onClick={closeMenu}
            >
              {t.portfolio}
            </a>
          </li>
          <li>
            <a 
              href="#projects" 
              className={`${isScrolled ? 'text-gray-200' : 'text-white'} hover:text-primary transition-colors`}
              onClick={closeMenu}
            >
              {t.projects}
            </a>
          </li>
          <li>
            <a 
              href="#contact" 
              className={`${isScrolled ? 'text-gray-200' : 'text-white'} hover:text-primary transition-colors`}
              onClick={closeMenu}
            >
              {t.contact}
            </a>
          </li>
          <li className="hidden md:block">
            <LanguageSelector />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar; 