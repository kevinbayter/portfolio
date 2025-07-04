import { useState } from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { EffectCoverflow, Pagination, Navigation, Autoplay } from 'swiper/modules';

type FilterCategory = 'all' | 'webApplications' | 'mobileAppsPortfolio' | 'apiDesign' | 'aiMachineLearning' | 'cloudArchitecture' | 'devOpsInfrastructure';

interface PortfolioProject {
  id: number;
  title: string;
  description: string;
  image: string;
  categories: FilterCategory[];
  techStack: string[];
  demoUrl?: string;
  codeUrl?: string;
  featured: boolean;
}

const Portfolio = () => {
  const { t, language } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');

  // Professional software development projects with high-quality images from the internet
  const portfolioProjects: PortfolioProject[] = [
    {
      id: 1,
      title: language === 'en' ? 'E-Commerce Platform with AI Recommendations' : 'Plataforma E-Commerce con Recomendaciones IA',
      description: language === 'en' 
        ? 'Full-stack e-commerce platform with AI-powered product recommendations, real-time inventory management, and advanced analytics dashboard.'
        : 'Plataforma e-commerce full-stack con recomendaciones de productos impulsadas por IA, gestión de inventario en tiempo real y dashboard de analíticas avanzadas.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      categories: ['all', 'webApplications', 'aiMachineLearning'],
      techStack: ['React', 'Node.js', 'Python', 'TensorFlow', 'MongoDB', 'Redis'],
      featured: true
    },
    {
      id: 2,
      title: language === 'en' ? 'Real-Time Trading Mobile App' : 'App Móvil de Trading en Tiempo Real',
      description: language === 'en'
        ? 'Cross-platform mobile application for cryptocurrency trading with real-time data streams, advanced charting, and secure wallet integration.'
        : 'Aplicación móvil multiplataforma para trading de criptomonedas con streams de datos en tiempo real, gráficos avanzados e integración segura de wallet.',
      image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      categories: ['all', 'mobileAppsPortfolio', 'apiDesign'],
      techStack: ['React Native', 'TypeScript', 'GraphQL', 'WebSocket', 'Firebase'],
      featured: true
    },
    {
      id: 3,
      title: language === 'en' ? 'Microservices API Gateway' : 'Gateway de APIs con Microservicios',
      description: language === 'en'
        ? 'Scalable API gateway with rate limiting, authentication, load balancing, and comprehensive monitoring for microservices architecture.'
        : 'Gateway de APIs escalable con limitación de velocidad, autenticación, balanceador de carga y monitoreo integral para arquitectura de microservicios.',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      categories: ['all', 'apiDesign', 'cloudArchitecture'],
      techStack: ['Node.js', 'Docker', 'Kubernetes', 'AWS', 'Redis', 'PostgreSQL'],
      featured: false
    },
    {
      id: 4,
      title: language === 'en' ? 'Machine Learning Data Pipeline' : 'Pipeline de Datos con Machine Learning',
      description: language === 'en'
        ? 'Automated ML pipeline for data processing, model training, and deployment with real-time monitoring and A/B testing capabilities.'
        : 'Pipeline ML automatizado para procesamiento de datos, entrenamiento de modelos y despliegue con monitoreo en tiempo real y capacidades de pruebas A/B.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      categories: ['all', 'aiMachineLearning', 'devOpsInfrastructure'],
      techStack: ['Python', 'TensorFlow', 'Apache Airflow', 'MLflow', 'Docker', 'AWS SageMaker'],
      featured: true
    },
    {
      id: 5,
      title: language === 'en' ? 'Cloud-Native Social Platform' : 'Plataforma Social Cloud-Native',
      description: language === 'en'
        ? 'Serverless social media platform with real-time messaging, content moderation AI, and elastic scaling for millions of users.'
        : 'Plataforma de redes sociales serverless con mensajería en tiempo real, IA de moderación de contenido y escalado elástico para millones de usuarios.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      categories: ['all', 'webApplications', 'cloudArchitecture'],
      techStack: ['Next.js', 'Serverless', 'DynamoDB', 'Lambda', 'CloudFront', 'Elasticsearch'],
      featured: false
    },
    {
      id: 6,
      title: language === 'en' ? 'DevOps Automation Suite' : 'Suite de Automatización DevOps',
      description: language === 'en'
        ? 'Complete CI/CD automation platform with infrastructure as code, automated testing, security scanning, and deployment orchestration.'
        : 'Plataforma completa de automatización CI/CD con infraestructura como código, testing automatizado, escaneo de seguridad y orquestación de despliegues.',
      image: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      categories: ['all', 'devOpsInfrastructure', 'cloudArchitecture'],
      techStack: ['Jenkins', 'Terraform', 'Ansible', 'Prometheus', 'Grafana', 'ArgoCD'],
      featured: false
    },
    {
      id: 7,
      title: language === 'en' ? 'IoT Data Analytics Platform' : 'Plataforma de Analíticas IoT',
      description: language === 'en'
        ? 'Real-time IoT data processing platform with edge computing, predictive analytics, and interactive dashboards for industrial monitoring.'
        : 'Plataforma de procesamiento de datos IoT en tiempo real con edge computing, analíticas predictivas y dashboards interactivos para monitoreo industrial.',
      image: 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      categories: ['all', 'webApplications', 'aiMachineLearning'],
      techStack: ['React', 'Apache Kafka', 'InfluxDB', 'Python', 'D3.js', 'MQTT'],
      featured: true
    },
    {
      id: 8,
      title: language === 'en' ? 'Blockchain DeFi Protocol' : 'Protocolo DeFi Blockchain',
      description: language === 'en'
        ? 'Decentralized finance protocol with smart contracts, yield farming, liquidity pools, and comprehensive security auditing.'
        : 'Protocolo de finanzas descentralizadas con contratos inteligentes, yield farming, pools de liquidez y auditoría integral de seguridad.',
      image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      categories: ['all', 'webApplications', 'apiDesign'],
      techStack: ['Solidity', 'Web3.js', 'React', 'Hardhat', 'IPFS', 'The Graph'],
      featured: false
    }
  ];

  const filters = [
    { id: 'all', label: t.all },
    { id: 'webApplications', label: t.webApplications },
    { id: 'mobileAppsPortfolio', label: t.mobileAppsPortfolio },
    { id: 'apiDesign', label: t.apiDesign },
    { id: 'aiMachineLearning', label: t.aiMachineLearning },
    { id: 'cloudArchitecture', label: t.cloudArchitecture },
    { id: 'devOpsInfrastructure', label: t.devOpsInfrastructure }
  ];

  const filteredProjects = portfolioProjects.filter(project =>
    activeFilter === 'all' ? true : project.categories.includes(activeFilter)
  );

  const swiperKey = activeFilter + '-' + filteredProjects.map(project => project.id).join(',');

  return (
    <section id="portfolio" className="py-20 bg-gradient-to-br from-background via-background-light to-background-lighter">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif mb-6 bg-gradient-to-r from-primary-light via-primary to-secondary bg-clip-text text-transparent">
            {t.myPortfolio}
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            {language === 'en' 
              ? 'Explore my latest software development projects featuring cutting-edge technologies, innovative solutions, and scalable architectures.'
              : 'Explora mis últimos proyectos de desarrollo de software con tecnologías de vanguardia, soluciones innovadoras y arquitecturas escalables.'
            }
          </p>
        </div>

        {/* Filters */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-3">
            {filters.map(filter => (
              <button
                key={filter.id}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                  activeFilter === filter.id
                    ? 'bg-gradient-to-r from-primary to-primary-dark text-white shadow-glow'
                    : 'bg-card-bg-light text-text-secondary hover:bg-card-bg-lighter hover:text-text-primary border border-dark-300'
                }`}
                onClick={() => setActiveFilter(filter.id as FilterCategory)}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Carousel */}
        <Swiper
          key={swiperKey}
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={'auto'}
          loop={filteredProjects.length > 1}
          coverflowEffect={{
            rotate: 30,
            stretch: 0,
            depth: 200,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={{ 
            clickable: true,
            dynamicBullets: true
          }}
          navigation={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
          breakpoints={{
            320: {
              slidesPerView: 1,
              coverflowEffect: {
                rotate: 45,
                stretch: 0,
                depth: 150,
                modifier: 1,
              }
            },
            768: {
              slidesPerView: 2,
              coverflowEffect: {
                rotate: 35,
                stretch: 0,
                depth: 175,
                modifier: 1,
              }
            },
            1024: {
              slidesPerView: 3,
              coverflowEffect: {
                rotate: 30,
                stretch: 0,
                depth: 200,
                modifier: 1,
              }
            }
          }}
          className="mySwiper w-full py-12"
        >
          {filteredProjects.map((project) => (
            <SwiperSlide key={project.id} className="w-[350px] md:w-[400px] lg:w-[450px]">
              <div className="group relative bg-gradient-to-br from-card-bg to-card-bg-light rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 transform hover:-translate-y-2 border border-dark-300/50">
                {/* Project Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
                  
                  {/* Featured Badge */}
                  {project.featured && (
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-accent to-accent-dark text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                      ⭐ Featured
                    </div>
                  )}
                  
                  {/* Overlay Actions */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="flex gap-3">
                      {project.demoUrl && (
                        <button className="px-4 py-2 bg-primary/90 text-white rounded-lg hover:bg-primary transition-colors duration-200 backdrop-blur-sm">
                          {t.liveDemo}
                        </button>
                      )}
                      {project.codeUrl && (
                        <button className="px-4 py-2 bg-secondary/90 text-white rounded-lg hover:bg-secondary-dark transition-colors duration-200 backdrop-blur-sm">
                          {t.sourceCode}
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-text-primary mb-3 group-hover:text-primary transition-colors duration-200">
                    {project.title}
                  </h3>
                  
                  <p className="text-text-secondary mb-4 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="mb-4">
                    <span className="text-sm font-medium text-text-muted block mb-2">{t.techStack}:</span>
                    <div className="flex flex-wrap gap-1">
                      {project.techStack.map((tech, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md border border-primary/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Button */}
                  <button className="w-full py-3 bg-gradient-to-r from-primary to-primary-dark text-white rounded-lg font-medium hover:from-primary-dark hover:to-primary transform hover:scale-[1.02] transition-all duration-200 shadow-md hover:shadow-glow">
                    {t.viewDetails}
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 border border-primary/20">
            <h3 className="text-2xl font-bold text-text-primary mb-4">
              {language === 'en' ? 'Ready to Build Something Amazing?' : '¿Listo para Construir Algo Increíble?'}
            </h3>
            <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
              {language === 'en' 
                ? "Let's collaborate on your next software project. I bring expertise in modern technologies and best practices to deliver exceptional results."
                : "Colaboremos en tu próximo proyecto de software. Aporto experiencia en tecnologías modernas y mejores prácticas para entregar resultados excepcionales."
              }
            </p>
            <a
              href="#contact"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-medium hover:from-primary-dark hover:to-secondary-dark transform hover:scale-105 transition-all duration-200 shadow-glow"
            >
              {t.contactMe} 
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;