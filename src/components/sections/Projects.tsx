import { useLanguage } from '../../hooks/useLanguage';

// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { EffectCoverflow, Pagination, Navigation, A11y, Autoplay } from 'swiper/modules';

// Importar imágenes
import imgBaytershop from '../../assets/images/baytershop.webp';
import imgBlogCafe from '../../assets/images/Blog-cafe.webp';
import imgGifApp from '../../assets/images/GifApp.webp';
import imgFlappyMan from '../../assets/images/flappyman.webp';
import imgBlackJack from '../../assets/images/BlackJack.webp';
import imgLogin from '../../assets/images/login.webp';

interface ProjectCardProps {
  image: string;
  title: string;
  description: string;
  technologies: string[];
  link: string;
  githubUrl?: string;
  featured?: boolean;
  viewText: string;
}

const ProjectCard = ({ image, title, description, technologies, link, githubUrl, featured, viewText }: ProjectCardProps) => {
  return (
    <div className="bg-gradient-to-br from-card-bg to-card-bg-light rounded-2xl shadow-card hover:shadow-card-hover overflow-hidden border border-dark-300/50 h-full flex flex-col transition-all duration-500 transform hover:-translate-y-2 group">
      {/* Project Image */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
        
        {/* Featured Badge */}
        {featured && (
          <div className="absolute top-4 right-4 bg-gradient-to-r from-accent to-accent-dark text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
            ⭐ Featured
          </div>
        )}
        
        {/* Overlay Actions */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="flex gap-3">
            <button 
              onClick={() => window.open(link, '_blank')}
              className="px-4 py-2 bg-primary/90 text-white rounded-lg hover:bg-primary transition-colors duration-200 backdrop-blur-sm font-medium"
            >
              🌐 Live Demo
            </button>
            {githubUrl && (
              <button 
                onClick={() => window.open(githubUrl, '_blank')}
                className="px-4 py-2 bg-secondary/90 text-white rounded-lg hover:bg-secondary-dark transition-colors duration-200 backdrop-blur-sm font-medium"
              >
                💻 GitHub
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Project Info */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold mb-3 text-text-primary group-hover:text-primary transition-colors duration-200">
          {title}
        </h3>
        
        <p className="text-text-secondary mb-4 flex-grow leading-relaxed">
          {description}
        </p>

        {/* Technologies */}
        <div className="mb-4">
          <span className="text-sm font-medium text-text-muted block mb-2">Technologies:</span>
          <div className="flex flex-wrap gap-1">
            {technologies.map((tech, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md border border-primary/20 font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <button 
          onClick={() => window.open(link, '_blank')}
          className="w-full py-3 bg-gradient-to-r from-primary to-primary-dark text-white rounded-lg font-medium hover:from-primary-dark hover:to-primary transform hover:scale-[1.02] transition-all duration-200 shadow-md hover:shadow-glow flex items-center justify-center gap-2"
        >
          {viewText}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-1M14 6L16 8M20 4L8 16L3 20L7 16L20 4Z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

const Projects = () => {
  const { t, language } = useLanguage();

  // Definición de proyectos con tecnologías y descripciones mejoradas
  const projectsData = {
    en: [
      {
        image: imgBaytershop,
        title: "BayterShop - E-Commerce Platform",
        description: "A modern e-commerce platform built with React, Redux Toolkit for state management, and Firebase for real-time data. Features include user authentication, shopping cart, product filtering, and responsive design. The project demonstrates proficiency in modern React patterns and Firebase integration.",
        technologies: ["React", "Redux Toolkit", "Firebase", "CSS3", "JavaScript ES6+"],
        link: "https://baytershop.vercel.app/",
        githubUrl: "https://github.com/kevinbayter/baytershop",
        featured: true
      },
      {
        image: imgBlogCafe,
        title: "Coffee Blog - Static Website",
        description: "A beautifully designed coffee blog showcasing the best coffee courses worldwide. Built with semantic HTML5, modern CSS Grid and Flexbox layouts, and optimized for performance. Features responsive design, smooth animations, and excellent SEO practices.",
        technologies: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "SEO"],
        link: "https://bcodercafe.netlify.app",
        featured: false
      },
      {
        image: imgGifApp,
        title: "GifApp - React SPA",
        description: "A responsive single-page application for searching and displaying GIFs using the Giphy API. Built with React hooks, custom hooks for API management, and modern ES6+ features. Includes search functionality, infinite scroll, and optimized performance with lazy loading.",
        technologies: ["React", "Hooks", "Giphy API", "CSS3", "Custom Hooks"],
        link: "https://zgifs-app.netlify.app",
        githubUrl: "https://github.com/kevinbayter/gif-expert-app",
        featured: true
      },
      {
        image: imgFlappyMan,
        title: "FlappyMan - Browser Game",
        description: "A creative recreation of the classic Flappy Bird game using vanilla JavaScript, HTML5 Canvas, and CSS3. Features smooth animations, collision detection, score tracking, and responsive controls. Demonstrates game development fundamentals and DOM manipulation skills.",
        technologies: ["JavaScript", "HTML5 Canvas", "CSS3", "Game Logic", "Animation"],
        link: "https://flappyman.netlify.app",
        featured: false
      },
      {
        image: imgBlackJack,
        title: "Blackjack 21 - Card Game",
        description: "An interactive online version of the classic Blackjack card game. Features game logic implementation, DOM manipulation, card deck management, and AI opponent behavior. Built with vanilla JavaScript showcasing algorithmic thinking and game state management.",
        technologies: ["JavaScript", "HTML5", "CSS3", "Game Logic", "Algorithm Design"],
        link: "https://blackjackbt.netlify.app/",
        featured: false
      },
      {
        image: imgLogin,
        title: "Modern Login Template",
        description: "A sleek and minimalist login interface template with modern design principles. Features gradient backgrounds, smooth transitions, form validation, and responsive design. Perfect for integration into any web application requiring user authentication.",
        technologies: ["HTML5", "CSS3", "JavaScript", "Form Validation", "UI/UX Design"],
        link: "https://cod3rlogin.netlify.app/",
        githubUrl: "https://github.com/kevinbayter/login-template",
        featured: false
      }
    ],
    es: [
      {
        image: imgBaytershop,
        title: "BayterShop - Plataforma E-Commerce",
        description: "Una plataforma de comercio electrónico moderna construida con React, Redux Toolkit para manejo de estado, y Firebase para datos en tiempo real. Incluye autenticación de usuarios, carrito de compras, filtrado de productos y diseño responsivo. El proyecto demuestra competencia en patrones modernos de React e integración con Firebase.",
        technologies: ["React", "Redux Toolkit", "Firebase", "CSS3", "JavaScript ES6+"],
        link: "https://baytershop.vercel.app/",
        githubUrl: "https://github.com/kevinbayter/baytershop",
        featured: true
      },
      {
        image: imgBlogCafe,
        title: "Coffee Blog - Sitio Web Estático",
        description: "Un blog de café hermosamente diseñado que muestra los mejores cursos de café del mundo. Construido con HTML5 semántico, layouts modernos de CSS Grid y Flexbox, y optimizado para rendimiento. Incluye diseño responsivo, animaciones suaves y excelentes prácticas de SEO.",
        technologies: ["HTML5", "CSS3", "JavaScript", "Diseño Responsivo", "SEO"],
        link: "https://bcodercafe.netlify.app",
        featured: false
      },
      {
        image: imgGifApp,
        title: "GifApp - SPA React",
        description: "Una aplicación de página única responsiva para buscar y mostrar GIFs usando la API de Giphy. Construida con React hooks, hooks personalizados para manejo de API, y características modernas de ES6+. Incluye funcionalidad de búsqueda, scroll infinito y rendimiento optimizado con lazy loading.",
        technologies: ["React", "Hooks", "Giphy API", "CSS3", "Custom Hooks"],
        link: "https://zgifs-app.netlify.app",
        githubUrl: "https://github.com/kevinbayter/gif-expert-app",
        featured: true
      },
      {
        image: imgFlappyMan,
        title: "FlappyMan - Juego de Navegador",
        description: "Una recreación creativa del clásico juego Flappy Bird usando JavaScript vanilla, HTML5 Canvas y CSS3. Incluye animaciones suaves, detección de colisiones, seguimiento de puntuación y controles responsivos. Demuestra fundamentos de desarrollo de juegos y habilidades de manipulación del DOM.",
        technologies: ["JavaScript", "HTML5 Canvas", "CSS3", "Lógica de Juego", "Animación"],
        link: "https://flappyman.netlify.app",
        featured: false
      },
      {
        image: imgBlackJack,
        title: "Blackjack 21 - Juego de Cartas",
        description: "Una versión interactiva en línea del clásico juego de cartas Blackjack. Incluye implementación de lógica de juego, manipulación del DOM, manejo de mazos de cartas y comportamiento de oponente IA. Construido con JavaScript vanilla mostrando pensamiento algorítmico y manejo de estado del juego.",
        technologies: ["JavaScript", "HTML5", "CSS3", "Lógica de Juego", "Diseño de Algoritmos"],
        link: "https://blackjackbt.netlify.app/",
        featured: false
      },
      {
        image: imgLogin,
        title: "Plantilla de Login Moderna",
        description: "Una plantilla de interfaz de inicio de sesión elegante y minimalista con principios de diseño moderno. Incluye fondos con gradientes, transiciones suaves, validación de formularios y diseño responsivo. Perfecta para integración en cualquier aplicación web que requiera autenticación de usuarios.",
        technologies: ["HTML5", "CSS3", "JavaScript", "Validación de Formularios", "Diseño UI/UX"],
        link: "https://cod3rlogin.netlify.app/",
        githubUrl: "https://github.com/kevinbayter/login-template",
        featured: false
      }
    ]
  };

  // Seleccionar proyectos según el idioma actual
  const projects = language === 'en' ? projectsData.en : projectsData.es;

  return (
    <section id="projects" className="py-20 bg-gradient-to-br from-background-light via-background to-background-lighter">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif mb-6 bg-gradient-to-r from-secondary-light via-secondary to-primary bg-clip-text text-transparent">
            {t.myProjects}
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            {language === 'en' 
              ? 'A collection of my web development projects showcasing different technologies, design patterns, and problem-solving approaches.'
              : 'Una colección de mis proyectos de desarrollo web que muestran diferentes tecnologías, patrones de diseño y enfoques de resolución de problemas.'
            }
          </p>
        </div>

        {/* Projects Carousel */}
        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          slidesPerView={3} 
          coverflowEffect={{
            rotate: 25,       
            stretch: 0,       
            depth: 150,       
            modifier: 1,      
            slideShadows: true 
          }}
          pagination={{ 
            clickable: true,
            dynamicBullets: true
          }}
          navigation={true}
          modules={[EffectCoverflow, Pagination, Navigation, A11y, Autoplay]}
          speed={800} 
          autoplay={{
            delay: 4000, 
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            300: {
              slidesPerView: 1,
              coverflowEffect: {
                rotate: 45,
                stretch: 0,
                depth: 120,
                modifier: 1,
              }
            },
            768: {
              slidesPerView: 2,
              coverflowEffect: {
                rotate: 35,
                stretch: 0,
                depth: 135,
                modifier: 1,
              }
            },
            1024: {
              slidesPerView: 3,
              coverflowEffect: {
                rotate: 25,
                stretch: 0,
                depth: 150,
                modifier: 1,
              }
            }
          }}
          className="mySwiper w-full py-12"
        >
          {projects.map((project, index) => (
            <SwiperSlide key={index} className="h-auto bg-transparent w-[350px] md:w-[400px] lg:w-[450px]"> 
              <ProjectCard
                image={project.image}
                title={project.title}
                description={project.description}
                technologies={project.technologies}
                link={project.link}
                githubUrl={project.githubUrl}
                featured={project.featured}
                viewText={t.viewProject}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-secondary/10 to-primary/10 rounded-2xl p-8 border border-secondary/20">
            <h3 className="text-2xl font-bold text-text-primary mb-4">
              {language === 'en' ? 'Interested in My Work?' : '¿Te Interesa Mi Trabajo?'}
            </h3>
            <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
              {language === 'en' 
                ? "These projects represent my journey in web development. I'm always working on new ideas and technologies. Let's discuss how I can help with your next project."
                : "Estos proyectos representan mi trayecto en el desarrollo web. Siempre estoy trabajando en nuevas ideas y tecnologías. Hablemos sobre cómo puedo ayudar con tu próximo proyecto."
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-medium hover:from-primary-dark hover:to-secondary-dark transform hover:scale-105 transition-all duration-200 shadow-glow"
              >
                {t.contactMe}
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.955 8.955 0 01-4.434-1.203L3 21l1.203-5.566A8.955 8.955 0 011 12c0-4.418 3.582-8 8-8s8 3.582 8 8z" />
                </svg>
              </a>
              <a
                href="https://github.com/kevinbayter"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 bg-card-bg-light text-text-primary rounded-lg font-medium hover:bg-card-bg-lighter border border-dark-300 hover:border-primary transform hover:scale-105 transition-all duration-200"
              >
                {language === 'en' ? 'View GitHub' : 'Ver GitHub'}
                <svg className="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;