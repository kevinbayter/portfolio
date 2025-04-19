import { FaServer, FaLightbulb, FaPalette, FaMobile, FaChartLine, FaCode } from 'react-icons/fa';
import { useLanguage } from '../../hooks/useLanguage';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const ServiceCard = ({ icon, title, description }: ServiceCardProps) => {
  return (
    <div className="bg-gray-800 shadow-lg border border-gray-700 rounded-lg p-6 hover:shadow-xl transition-all hover:translate-y-[-5px] group">
      <div className="text-primary text-3xl mb-4 group-hover:text-white transition-colors">{icon}</div>
      <h3 className="text-lg font-semibold mb-3 text-gray-200">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
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
    <section id="services" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-serif text-center mb-12 text-gray-100">{t.myServices}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services; 