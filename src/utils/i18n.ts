export type Language = 'en' | 'es';

export interface Translations {
  // Navbar
  home: string;
  about: string;
  portfolio: string;
  projects: string;
  contact: string;
  
  // Hero
  iAm: string;
  developer: string;
  softwareEngineer: string;
  physicist: string;
  subtitle: string;
  contactMe: string;
  
  // About
  aboutMe: string;
  aboutDescription1: string;
  aboutDescription2: string;
  viewResume: string;
  
  // Services
  myServices: string;
  backend: string;
  brandIdentity: string;
  webDesign: string;
  mobileApps: string;
  analytics: string;
  softwareArchitecture: string;
  backendDesc: string;
  brandIdentityDesc: string;
  webDesignDesc: string;
  mobileAppsDesc: string;
  analyticsDesc: string;
  softwareArchitectureDesc: string;
  
  // Portfolio - Modern Software Development Categories
  myPortfolio: string;
  all: string;
  webApplications: string;
  mobileAppsPortfolio: string;
  apiDesign: string;
  aiMachineLearning: string;
  cloudArchitecture: string;
  devOpsInfrastructure: string;
  viewDetails: string;
  liveDemo: string;
  sourceCode: string;
  techStack: string;
  
  // Legacy Portfolio Categories (kept for compatibility)
  branding: string;
  beauty: string;
  nature: string;
  lifestyle: string;
  photography: string;
  viewImage: string;
  
  // Projects
  myProjects: string;
  viewProject: string;
  
  // Contact
  contactTitle: string;
  contactSubtitle: string;
  contactInfo: string;
  sendMessage: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  sending: string;
  send: string;
  successMessage: string;
  errorMessage: string;
  connectionError: string;
  availableForProjects: string;
  
  // Footer
  allRightsReserved: string;
  designedBy: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    // Navbar
    home: 'Home',
    about: 'About me',
    portfolio: 'Portfolio',
    projects: 'Projects',
    contact: 'Contact',
    
    // Hero
    iAm: 'I am',
    developer: 'Full Stack Developer | Physicist | Designer',
    softwareEngineer: 'Software Engineer',
    physicist: 'Physicist',
    subtitle: 'Full Stack Developer | Physicist | Designer',
    contactMe: 'Contact me',
    
    // About
    aboutMe: 'About me',
    aboutDescription1: 'I am a Colombian passionate about software development and astrophysics.',
    aboutDescription2: 'Every day I wake up thinking about what I can do today that will be useful tomorrow, and that answer was physics and software development. It wasn\'t easy, but now I can tell my mother: "Look mom, I am a programmer and physicist."',
    viewResume: 'View Resume',
    
    // Services
    myServices: 'My Services',
    backend: 'BACKEND',
    brandIdentity: 'BRAND IDENTITY',
    webDesign: 'WEB DESIGN',
    mobileApps: 'MOBILE APPS',
    analytics: 'ANALYTICS',
    softwareArchitecture: 'SOFTWARE ARCHITECTURE',
    backendDesc: 'I can only say that this is my favorite skill.',
    brandIdentityDesc: 'I have my own style and design pattern, using the MERN stack.',
    webDesignDesc: 'I have knowledge in CSS/SASS, Figma and other tools for web design.',
    mobileAppsDesc: 'I started in the mobile programming industry with React Native.',
    analyticsDesc: 'I can position your brand using the most powerful analytics.',
    softwareArchitectureDesc: 'I design scalable and maintainable software architectures following best practices and design patterns.',
    
    // Portfolio - Modern Software Development Categories
    myPortfolio: 'Software Development Portfolio',
    all: 'All Projects',
    webApplications: 'Web Applications',
    mobileAppsPortfolio: 'Mobile Apps',
    apiDesign: 'API Design',
    aiMachineLearning: 'AI & Machine Learning',
    cloudArchitecture: 'Cloud Architecture',
    devOpsInfrastructure: 'DevOps & Infrastructure',
    viewDetails: 'View Details',
    liveDemo: 'Live Demo',
    sourceCode: 'Source Code',
    techStack: 'Tech Stack',
    
    // Legacy Portfolio Categories (kept for compatibility)
    branding: 'Branding',
    beauty: 'Beauty',
    nature: 'Nature',
    lifestyle: 'Lifestyle',
    photography: 'Photography',
    viewImage: 'View image',
    
    // Projects
    myProjects: 'My Projects',
    viewProject: 'View project',
    
    // Contact
    contactTitle: 'Contact',
    contactSubtitle: 'Do you have any questions or proposals? Feel free to contact me.',
    contactInfo: 'Contact Information',
    sendMessage: 'Send me a message',
    name: 'Name',
    email: 'Email',
    subject: 'Subject',
    message: 'Message',
    sending: 'Sending...',
    send: 'Send message',
    successMessage: 'Your message has been sent! Thank you.',
    errorMessage: 'There was an error sending the message. Please try again.',
    connectionError: 'There was a connection error. Please try again.',
    availableForProjects: 'Available for new projects',
    
    // Footer
    allRightsReserved: 'All rights reserved',
    designedBy: 'Designed by'
  },
  es: {
    // Navbar
    home: 'Inicio',
    about: 'Sobre mí',
    portfolio: 'Portfolio',
    projects: 'Proyectos',
    contact: 'Contacto',
    
    // Hero
    iAm: 'Soy',
    developer: 'Desarrollador Full Stack',
    softwareEngineer: 'Ingeniero de Software',
    physicist: 'Físico',
    subtitle: 'Desarrollador Full Stack | Físico | Diseñador',
    contactMe: 'Contáctame',
    
    // About
    aboutMe: 'Sobre mí',
    aboutDescription1: 'Soy un colombiano apasionado por el desarrollo de software y la astrofísica.',
    aboutDescription2: 'Cada día me despierto pensando en qué puedo hacer hoy que me será útil mañana, y esa respuesta fue la física y el desarrollo de software. No fue fácil, pero ahora puedo decirle a mi madre: "Mira mamá, ya soy programador y físico".',
    viewResume: 'Ver Currículum',
    
    // Services
    myServices: 'Mis Servicios',
    backend: 'BACKEND',
    brandIdentity: 'IDENTIDAD DE MARCA',
    webDesign: 'DISEÑO WEB',
    mobileApps: 'APLICACIONES MÓVILES',
    analytics: 'ANALYTICS',
    softwareArchitecture: 'ARQUITECTURA DE SOFTWARE',
    backendDesc: 'Solo puedo decir que esta es mi habilidad favorita.',
    brandIdentityDesc: 'Tengo mi propio estilo y patrón de diseño, utilizando el stack MERN.',
    webDesignDesc: 'Tengo conocimientos en CSS/SASS, Figma y otras herramientas para diseño web.',
    mobileAppsDesc: 'Comencé en la industria de programación móvil con React Native.',
    analyticsDesc: 'Puedo posicionar tu marca utilizando las analíticas más potentes.',
    softwareArchitectureDesc: 'Diseño arquitecturas de software escalables y mantenibles siguiendo las mejores prácticas y patrones de diseño.',
    
    // Portfolio - Modern Software Development Categories
    myPortfolio: 'Portfolio de Desarrollo de Software',
    all: 'Todos los Proyectos',
    webApplications: 'Aplicaciones Web',
    mobileAppsPortfolio: 'Apps Móviles',
    apiDesign: 'Diseño de APIs',
    aiMachineLearning: 'IA y Machine Learning',
    cloudArchitecture: 'Arquitectura en la Nube',
    devOpsInfrastructure: 'DevOps e Infraestructura',
    viewDetails: 'Ver Detalles',
    liveDemo: 'Demo en Vivo',
    sourceCode: 'Código Fuente',
    techStack: 'Stack Tecnológico',
    
    // Legacy Portfolio Categories (kept for compatibility)
    branding: 'Branding',
    beauty: 'Belleza',
    nature: 'Naturaleza',
    lifestyle: 'Estilo de vida',
    photography: 'Fotografía',
    viewImage: 'Ver imagen',
    
    // Projects
    myProjects: 'Mis Proyectos',
    viewProject: 'Ver proyecto',
    
    // Contact
    contactTitle: 'Contacto',
    contactSubtitle: '¿Tienes alguna pregunta o propuesta? No dudes en contactarme.',
    contactInfo: 'Información de contacto',
    sendMessage: 'Envíame un mensaje',
    name: 'Nombre',
    email: 'Email',
    subject: 'Asunto',
    message: 'Mensaje',
    sending: 'Enviando...',
    send: 'Enviar mensaje',
    successMessage: '¡Tu mensaje ha sido enviado! Gracias.',
    errorMessage: 'Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo.',
    connectionError: 'Hubo un error de conexión. Por favor, inténtalo de nuevo.',
    availableForProjects: 'Disponible para nuevos proyectos',
    
    // Footer
    allRightsReserved: 'Todos los derechos reservados',
    designedBy: 'Diseñado por'
  }
}; 