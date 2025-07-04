import { FaFacebook, FaTwitter, FaYoutube, FaTelegram, FaLinkedin, FaGithub } from 'react-icons/fa';
import {useLanguage} from "@hooks/useLanguage.tsx";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer id="footer" className="bg-gray-800 py-10 text-center border-t border-gray-700">
      <div className="container mx-auto px-4">
        <div className="social-media flex justify-center space-x-4 mb-6">
          <a 
            href="https://www.facebook.com/kevinbayter" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-primary transition-colors"
            aria-label="Facebook"
          >
            <FaFacebook size={24} />
          </a>
          <a 
            href="https://twitter.com/bayterx" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-primary transition-colors"
            aria-label="Twitter"
          >
            <FaTwitter size={24} />
          </a>
          <a 
            href="https://www.youtube.com/channel/UCU3PikXoGB2EU-0gwJDu_KQ" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-primary transition-colors"
            aria-label="YouTube"
          >
            <FaYoutube size={24} />
          </a>
          <a 
            href="https://t.me/BayterC" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-primary transition-colors"
            aria-label="Telegram"
          >
            <FaTelegram size={24} />
          </a>
          <a 
            href="https://www.linkedin.com/in/bcod3r/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-primary transition-colors"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={24} />
          </a>
          <a 
            href="https://www.github.com/kevinbayter" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-primary transition-colors"
            aria-label="GitHub"
          >
            <FaGithub size={24} />
          </a>
        </div>

        <p className="text-gray-400">&copy; {currentYear} Kevin Bayter. {t.allRightsReserved}</p>
        
        <div className="credits mt-2">
          <span className="text-gray-500">
            {t.designedBy}{" "}
            <a 
              href="https://github.com/kevinbayter" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary-dark transition-colors"
            >
              Bayter
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 