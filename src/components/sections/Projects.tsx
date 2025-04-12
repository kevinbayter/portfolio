import { useLanguage } from '../../hooks/useLanguage';
import Carousel from '../common/Carousel';
import { useEffect, useState } from 'react';

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
  link: string;
  viewText: string;
}

const ProjectCard = ({ image, title, description, link, viewText }: ProjectCardProps) => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all border border-gray-700 hover:translate-y-[-5px] h-full">
      <a href={link} target="_blank" rel="noopener noreferrer">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover"
          loading="lazy"
        />
      </a>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-3">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-200 hover:text-primary transition-colors"
          >
            {title}
          </a>
        </h3>
        <p className="text-gray-400 mb-4">{description}</p>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary font-medium hover:text-primary-dark flex items-center"
        >
          {viewText} <span className="ml-1">→</span>
        </a>
      </div>
    </div>
  );
};

const Projects = () => {
  const { t, language } = useLanguage();
  const [slidesToShow, setSlidesToShow] = useState(3);

  // Ajustar el número de slides según el tamaño de la pantalla
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSlidesToShow(1);
      } else if (window.innerWidth < 1024) {
        setSlidesToShow(3);
      } else {
        setSlidesToShow(4);
      }
    };

    // Inicializar
    handleResize();

    // Actualizar al cambiar el tamaño de la ventana
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Definición de proyectos con diferentes descripciones para inglés y español
  const projectsData = {
    en: [
      {
        image: imgBaytershop,
        title: "BayterShop",
        description: "A minimalist e-commerce built with React, Redux, and Firebase. You can find the source code for this project on my GitHub profile.",
        link: "https://baytershop.vercel.app/"
      },
      {
        image: imgBlogCafe,
        title: "Coffee Blog",
        description: "The best coffee courses around the world. Get one of our courses and specialize in the preparation and export of the best coffee in the world.",
        link: "https://bcodercafe.netlify.app"
      },
      {
        image: imgGifApp,
        title: "GifApp",
        description: "A responsive application built with React using fetch for Giphy API requests. You can try this project and also find it in my GitHub repository.",
        link: "https://zgifs-app.netlify.app"
      },
      {
        image: imgFlappyMan,
        title: "FlappyMan",
        description: "This is my own version of the famous Flappy Bird game made only with HTML, CSS and JavaScript. Later I will work on the Backend for the integration of the leaderboard.",
        link: "https://flappyman.netlify.app"
      },
      {
        image: imgBlackJack,
        title: "Blackjack 21",
        description: "An online version of the classic blackjack 21 card game. Ask for cards without going over 21 points, stop when you want to stop asking for cards, then it will be the computer's turn.",
        link: "https://blackjackbt.netlify.app/"
      },
      {
        image: imgLogin,
        title: "Login",
        description: "A beautiful and minimalist login template that you can easily adapt to your website. You can find this template in my Github repository.",
        link: "https://cod3rlogin.netlify.app/"
      }
    ],
    es: [
      {
        image: imgBaytershop,
        title: "BayterShop",
        description: "Un ecommerce minimalista hecho con React, Redux y Firebase. Puedes encontrar el código fuente de este proyecto en mi perfil de GitHub.",
        link: "https://baytershop.vercel.app/"
      },
      {
        image: imgBlogCafe,
        title: "Coffee Blog",
        description: "Los mejores cursos de café alrededor del mundo. Adquiere uno de nuestros cursos y especialízate en la preparación y exportación del mejor café del mundo.",
        link: "https://bcodercafe.netlify.app"
      },
      {
        image: imgGifApp,
        title: "GifApp",
        description: "Una aplicación responsiva construida con React usando fetch para solicitudes a la API de Giphy. Puedes probar este proyecto y también puedes encontrarlo en mi repositorio de GitHub.",
        link: "https://zgifs-app.netlify.app"
      },
      {
        image: imgFlappyMan,
        title: "FlappyMan",
        description: "Esta es mi propia versión del famoso juego Flappy Bird hecho solo con HTML, CSS y JavaScript. Más adelante trabajaré en el Backend para la integración de la tabla de calificaciones.",
        link: "https://flappyman.netlify.app"
      },
      {
        image: imgBlackJack,
        title: "Blackjack 21",
        description: "Un juego en línea del clásico juego de cartas blackjack 21. Pide cartas sin pasarte de 21 puntos, da un stop cuando quieras dejar de pedir cartas, luego será el turno de la computadora.",
        link: "https://blackjackbt.netlify.app/"
      },
      {
        image: imgLogin,
        title: "Login",
        description: "Una hermosa y minimalista plantilla de inicio de sesión que puedes adaptar fácilmente a tu sitio web. Puedes encontrar esta plantilla en mi repositorio de Github.",
        link: "https://cod3rlogin.netlify.app/"
      }
    ]
  };

  // Seleccionar proyectos según el idioma actual
  const projects = language === 'en' ? projectsData.en : projectsData.es;

  // Crear los componentes de las tarjetas de proyectos
  const projectCards = projects.map((project, index) => (
    <div key={index} className="px-2">
      <ProjectCard
        image={project.image}
        title={project.title}
        description={project.description}
        link={project.link}
        viewText={t.viewProject}
      />
    </div>
  ));

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-serif text-center mb-12 text-gray-100">{t.myProjects}</h2>

        {projectCards.length > 0 && (
          <Carousel
            showControls={false}
            showIndicators={true}
            autoPlay={true}
            interval={3000}
            slidesToShow={slidesToShow}
            className="pb-12"
          >
            {projectCards}
          </Carousel>
        )}
      </div>
    </section>
  );
};

export default Projects;