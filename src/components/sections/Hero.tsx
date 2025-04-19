import { TypeAnimation } from 'react-type-animation';
import { FaFacebook, FaTwitter, FaYoutube, FaTelegram, FaLinkedin, FaGithub } from 'react-icons/fa';
import bgImage from '../../assets/images/Bg-bosques.webp';
import { useLanguage } from '@hooks/useLanguage.tsx';
import { useMemo, useEffect, useState } from 'react';

const Hero = () => {
  const { t, language } = useLanguage();
  const [key, setKey] = useState(0);

  // Forzar el reinicio de la animación cuando cambie el idioma
  useEffect(() => {
    setKey(prev => prev + 1);
  }, [language]);

  const sequence = useMemo(() => [
    'Kevin Bayter',
    2000,
    t.softwareEngineer,
    2000,
    t.physicist,
    2000,
  ], [t.softwareEngineer, t.physicist]);

  return (
    <section 
      id="header" 
      className="min-h-screen flex items-center justify-center text-white relative overflow-hidden"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#1a201f',
      }}
    >
      {/* Overlay para oscurecer la imagen de fondo */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80 z-0"></div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-serif mb-6 font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-primary">
            {t.iAm}{' '}
            <TypeAnimation
              key={key}
              sequence={sequence}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="text-white"
            />
          </h1>
          
          <p className="text-xl md:text-2xl mb-10 opacity-90 font-light text-gray-300">
            {t.subtitle}
          </p>
          
          <div className="mt-8">
            <a 
              href="#contact" 
              className="bg-primary hover:bg-primary-dark text-white hover:text-white px-8 py-3 rounded-md mr-4 inline-block transition-all hover:translate-y-[-2px] shadow-lg shadow-primary/20"
            >
              {t.contactMe}
            </a>
            <a 
              href="https://www.linkedin.com/in/bcod3r/" 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-transparent border-2 border-white/50 hover:border-primary hover:text-primary text-white px-8 py-3 rounded-md inline-block transition-all hover:translate-y-[-2px]"
            >
              LinkedIn
            </a>
          </div>
          
          <div className="flex justify-center space-x-4 mt-12">
            <a 
              href="https://www.facebook.com/kevinbayter" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-primary transition-colors bg-black/30 p-3 rounded-full inline-block hover:bg-black/50 border border-white/10 hover:border-primary/50"
              aria-label="Facebook"
            >
              <FaFacebook size={20} />
            </a>
            <a 
              href="https://twitter.com/bayterx" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-primary transition-colors bg-black/30 p-3 rounded-full inline-block hover:bg-black/50 border border-white/10 hover:border-primary/50"
              aria-label="Twitter"
            >
              <FaTwitter size={20} />
            </a>
            <a 
              href="https://www.youtube.com/channel/UCU3PikXoGB2EU-0gwJDu_KQ" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-primary transition-colors bg-black/30 p-3 rounded-full inline-block hover:bg-black/50 border border-white/10 hover:border-primary/50"
              aria-label="YouTube"
            >
              <FaYoutube size={20} />
            </a>
            <a 
              href="https://t.me/BayterC" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-primary transition-colors bg-black/30 p-3 rounded-full inline-block hover:bg-black/50 border border-white/10 hover:border-primary/50"
              aria-label="Telegram"
            >
              <FaTelegram size={20} />
            </a>
            <a 
              href="https://www.linkedin.com/in/bcod3r/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-primary transition-colors bg-black/30 p-3 rounded-full inline-block hover:bg-black/50 border border-white/10 hover:border-primary/50"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={20} />
            </a>
            <a 
              href="https://www.github.com/kevinbayter" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-primary transition-colors bg-black/30 p-3 rounded-full inline-block hover:bg-black/50 border border-white/10 hover:border-primary/50"
              aria-label="GitHub"
            >
              <FaGithub size={20} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 