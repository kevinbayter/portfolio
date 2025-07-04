import { FaFacebook, FaTwitter, FaYoutube, FaTelegram, FaLinkedin, FaGithub, FaHeart, FaCode } from 'react-icons/fa';
import { useLanguage } from "@hooks/useLanguage.tsx";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t, language } = useLanguage();

  const socialLinks = [
    {
      href: "https://www.github.com/kevinbayter",
      icon: FaGithub,
      label: "GitHub",
      color: "hover:text-primary"
    },
    {
      href: "https://www.linkedin.com/in/bcod3r/",
      icon: FaLinkedin,
      label: "LinkedIn", 
      color: "hover:text-secondary"
    },
    {
      href: "https://twitter.com/bayterx",
      icon: FaTwitter,
      label: "Twitter",
      color: "hover:text-accent"
    },
    {
      href: "https://www.youtube.com/channel/UCU3PikXoGB2EU-0gwJDu_KQ",
      icon: FaYoutube,
      label: "YouTube",
      color: "hover:text-red-500"
    },
    {
      href: "https://t.me/BayterC",
      icon: FaTelegram,
      label: "Telegram",
      color: "hover:text-blue-400"
    },
    {
      href: "https://www.facebook.com/kevinbayter",
      icon: FaFacebook,
      label: "Facebook",
      color: "hover:text-blue-600"
    }
  ];

  return (
    <footer className="relative bg-gradient-to-br from-background via-background-light to-background-lighter border-t border-primary/20 mt-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(139, 92, 246, 0.15) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="relative">
        {/* Main Footer Content */}
        <div className="container mx-auto px-4 py-16">
          {/* Top Section */}
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-4">
              Kevin Bayter
            </h3>
            <p className="text-text-secondary max-w-2xl mx-auto mb-8">
              {language === 'en' 
                ? "Full Stack Developer & Software Architect passionate about creating innovative digital solutions and scalable systems."
                : "Desarrollador Full Stack y Arquitecto de Software apasionado por crear soluciones digitales innovadoras y sistemas escalables."
              }
            </p>

            {/* Social Links */}
            <div className="flex justify-center items-center space-x-6 mb-8">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group p-3 bg-card-bg-light rounded-full border border-dark-300/50 text-text-muted transition-all duration-300 hover:border-primary/50 hover:bg-card-bg hover:shadow-glow transform hover:scale-110 ${social.color}`}
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>

            {/* Contact CTA */}
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-6 border border-primary/20 mb-8">
              <h4 className="text-lg font-semibold text-text-primary mb-2">
                {language === 'en' ? 'Ready to start a project?' : '¿Listo para comenzar un proyecto?'}
              </h4>
              <p className="text-text-secondary mb-4">
                {language === 'en' 
                  ? "Let's work together to bring your ideas to life."
                  : "Trabajemos juntos para hacer realidad tus ideas."
                }
              </p>
              <a
                href="#contact"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-medium hover:from-primary-dark hover:to-secondary-dark transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-glow"
              >
                {language === 'en' ? 'Get in Touch' : 'Contáctame'}
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h5 className="text-text-primary font-semibold mb-3">
                {language === 'en' ? 'Navigation' : 'Navegación'}
              </h5>
              <ul className="space-y-2">
                {['Home', 'About', 'Portfolio', 'Projects'].map((item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase()}`}
                      className="text-text-secondary hover:text-primary transition-colors duration-200"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h5 className="text-text-primary font-semibold mb-3">
                {language === 'en' ? 'Technologies' : 'Tecnologías'}
              </h5>
              <ul className="space-y-2">
                {['React', 'Node.js', 'TypeScript', 'Python'].map((tech) => (
                  <li key={tech}>
                    <span className="text-text-secondary">
                      {tech}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h5 className="text-text-primary font-semibold mb-3">
                {language === 'en' ? 'Services' : 'Servicios'}
              </h5>
              <ul className="space-y-2">
                {[
                  language === 'en' ? 'Web Development' : 'Desarrollo Web',
                  language === 'en' ? 'Mobile Apps' : 'Apps Móviles',
                  language === 'en' ? 'API Design' : 'Diseño APIs',
                  language === 'en' ? 'DevOps' : 'DevOps'
                ].map((service) => (
                  <li key={service}>
                    <span className="text-text-secondary">
                      {service}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h5 className="text-text-primary font-semibold mb-3">
                {language === 'en' ? 'Contact' : 'Contacto'}
              </h5>
              <ul className="space-y-2">
                <li>
                  <a
                    href="mailto:kevin@bcod3r.com"
                    className="text-text-secondary hover:text-primary transition-colors duration-200"
                  >
                    kevin@bcod3r.com
                  </a>
                </li>
                <li>
                  <span className="text-text-secondary">
                    {language === 'en' ? 'Available for projects' : 'Disponible para proyectos'}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-dark-300/50 bg-card-bg/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
              <div className="mb-4 md:mb-0">
                <p className="text-text-secondary text-sm">
                  &copy; {currentYear} Kevin Bayter. {t.allRightsReserved}
                </p>
              </div>
              
              <div className="flex items-center space-x-4 text-sm">
                <span className="text-text-muted flex items-center">
                  {t.designedBy} 
                  <FaHeart className="mx-1 text-red-500 animate-pulse" size={12} />
                  <FaCode className="mr-1 text-primary" size={12} />
                  <a 
                    href="https://github.com/kevinbayter" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary-light transition-colors font-medium"
                  >
                    Bayter
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 