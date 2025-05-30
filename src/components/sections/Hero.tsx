import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { FaFacebook, FaTwitter, FaYoutube, FaTelegram, FaLinkedin, FaGithub } from 'react-icons/fa';
import bgImage from '../../assets/images/Bg-bosques.webp';
import { useLanguage } from '@hooks/useLanguage.tsx';
import { TypeAnimation } from 'react-type-animation';

const Hero: React.FC = () => {
  const { t } = useLanguage();

  const typeAnimationSequence = useMemo(() => [
    'Kevin Bayter', 2000, 
    t.softwareEngineer, 2000, 
    t.physicist, 2000
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
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80 z-[0]"></div>
      <div className="container mx-auto px-4 text-center relative z-[2]">
        <div className="max-w-2xl mx-auto">
          <motion.h1
            className="text-5xl md:text-7xl font-serif mb-6 font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-primary"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t.iAm}{' '}
            <TypeAnimation
              sequence={typeAnimationSequence}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="text-white"
            />
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl mb-10 opacity-90 font-light text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {t.subtitle}
          </motion.p>
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <motion.a
              href="#contact" 
              className="bg-primary hover:bg-primary-dark text-white hover:text-white px-8 py-3 rounded-md mr-4 inline-block transition-all shadow-lg shadow-primary/20"
              whileHover={{ y: -3, scale: 1.05, boxShadow: "0px 10px 20px rgba(var(--color-primary-rgb), 0.3)" }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {t.contactMe}
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/kevinbayter/" 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-transparent border-2 border-white/50 hover:border-primary hover:text-primary text-white px-8 py-3 rounded-md inline-block transition-all"
              whileHover={{ y: -3, scale: 1.05, borderColor: "rgba(var(--color-primary-rgb), 1)", color: "rgba(var(--color-primary-rgb), 1)" }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              LinkedIn
            </motion.a>
          </motion.div>
          <div className="flex justify-center space-x-4 mt-12">
            <a href="https://www.facebook.com/KevinBayter" target="_blank" rel="noopener noreferrer" className="text-white hover:text-primary transition-colors bg-black/30 p-3 rounded-full inline-block hover:bg-black/50 border border-white/10 hover:border-primary/50" aria-label="Facebook"><FaFacebook size={20} /></a>
            <a href="https://twitter.com/KevinBayter" target="_blank" rel="noopener noreferrer" className="text-white hover:text-primary transition-colors bg-black/30 p-3 rounded-full inline-block hover:bg-black/50 border border-white/10 hover:border-primary/50" aria-label="Twitter"><FaTwitter size={20} /></a>
            <a href="https://www.youtube.com/@KevinBayter" target="_blank" rel="noopener noreferrer" className="text-white hover:text-primary transition-colors bg-black/30 p-3 rounded-full inline-block hover:bg-black/50 border border-white/10 hover:border-primary/50" aria-label="YouTube"><FaYoutube size={20} /></a>
            <a href="https://t.me/KevinBayter" target="_blank" rel="noopener noreferrer" className="text-white hover:text-primary transition-colors bg-black/30 p-3 rounded-full inline-block hover:bg-black/50 border border-white/10 hover:border-primary/50" aria-label="Telegram"><FaTelegram size={20} /></a>
            <a href="https://www.linkedin.com/in/kevinbayter/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-primary transition-colors bg-black/30 p-3 rounded-full inline-block hover:bg-black/50 border border-white/10 hover:border-primary/50" aria-label="LinkedIn"><FaLinkedin size={20} /></a>
            <a href="https://github.com/KevinBayter" target="_blank" rel="noopener noreferrer" className="text-white hover:text-primary transition-colors bg-black/30 p-3 rounded-full inline-block hover:bg-black/50 border border-white/10 hover:border-primary/50" aria-label="GitHub"><FaGithub size={20} /></a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
