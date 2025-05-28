import { FaServer, FaLightbulb, FaPalette, FaMobile, FaChartLine, FaCode } from 'react-icons/fa';
import { useLanguage } from '../../hooks/useLanguage';
import { motion } from 'framer-motion';

// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { EffectCoverflow, Pagination, Navigation, A11y } from 'swiper/modules';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.5, staggerChildren: 0.1 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const cardHoverProps = {
  y: -8,
  scale: 1.03,
  boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
  transition: { duration: 0.3, ease: "easeOut" }
};

const ServiceCard = ({ icon, title, description }: ServiceCardProps) => {
  return (
    <motion.div
      className="bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-700 h-full flex flex-col group"
      variants={cardVariants} // Applied for individual card entrance if section staggers
      whileHover={cardHoverProps}
    >
      <div className="relative aspect-video bg-gray-700/50 flex items-center justify-center overflow-hidden">
        {/* Icon prominently displayed */}
        <div className="text-primary text-5xl md:text-6xl group-hover:text-white transition-colors duration-300">
          {icon}
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold mb-3 text-gray-200 group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>
        <p className="text-gray-400 text-sm flex-grow">{description}</p>
      </div>
    </motion.div>
  );
};

const Services = () => {
  const { t } = useLanguage();
  
  const services = [
    {
      icon: <FaServer />,
      title: t.backend,
      description: t.backendDesc
    },
    {
      icon: <FaLightbulb />,
      title: t.brandIdentity,
      description: t.brandIdentityDesc
    },
    {
      icon: <FaPalette />,
      title: t.webDesign,
      description: t.webDesignDesc
    },
    {
      icon: <FaMobile />,
      title: t.mobileApps,
      description: t.mobileAppsDesc
    },
    {
      icon: <FaChartLine />,
      title: t.analytics,
      description: t.analyticsDesc
    },
    {
      icon: <FaCode />,
      title: t.softwareArchitecture,
      description: t.softwareArchitectureDesc
    }
  ];

  return (
    <motion.section 
      id="services" 
      className="py-20 overflow-hidden"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-3xl md:text-4xl font-serif text-center mb-12 text-gray-100"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {t.myServices}
        </motion.h2>
        
        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          slidesPerView={3} 
          coverflowEffect={{
            rotate: 30,       
            stretch: 0,       
            depth: 200,       
            modifier: 1,      
            slideShadows: true 
          }}
          pagination={{ clickable: true }}
          navigation={true}
          modules={[EffectCoverflow, Pagination, Navigation, A11y]}
          breakpoints={{
            300: {
              slidesPerView: 1,
              coverflowEffect: {
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
              }
            },
            768: {
              slidesPerView: 2,
              coverflowEffect: {
                rotate: 40,
                stretch: 0,
                depth: 150,
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
          className="mySwiper w-full py-10"
        >
          {services.map((service, index) => (
            <SwiperSlide key={index} className="h-auto bg-transparent group">
              {/* motion.div for card animation can be inside SwiperSlide if needed,
                  or Swiper's own transitions might be sufficient. 
                  For consistency with About.tsx, let's wrap ServiceCard in motion.div 
                  if SwiperSlide itself doesn't directly support variants. 
                  However, Swiper often handles its slide animations. 
                  Let's apply variants directly to ServiceCard which is already a motion component.
              */}
              <ServiceCard
                icon={service.icon}
                title={service.title}
                description={service.description}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </motion.section>
  );
};

export default Services; 