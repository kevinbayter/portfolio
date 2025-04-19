import bayterWebp from '../../assets/images/Bayter.webp';
import bayterJpg from '../../assets/images/Bayter.jpg';
import { useLanguage } from '../../hooks/useLanguage';

const About = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-5/12 mb-10 md:mb-0">
            <div className="bg-gray-800 p-3 rounded-lg shadow-xl">
              <div className="overflow-hidden rounded">
                <picture>
                  <source srcSet={bayterWebp} type="image/webp" />
                  <img 
                    src={bayterJpg} 
                    alt="Kevin Bayter" 
                    className="w-full h-auto rounded transform hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </picture>
              </div>
            </div>
          </div>
          
          <div className="md:w-6/12">
            <div className="about-content">
              <h2 className="text-3xl md:text-4xl font-serif mb-6 text-gray-100">{t.aboutMe}</h2>
              
              <p className="text-xl font-medium text-gray-300 mb-6">
                {t.aboutDescription1}
              </p>
              
              <p className="text-gray-400 mb-8">
                {t.aboutDescription2}
              </p>
              
              <a 
                href="https://drive.google.com/file/d/1SIH1aAatiMFuViJ6ks1lNCqkaQ_RbqMA/view?usp=sharing" 
                target="_blank"
                rel="noopener noreferrer" 
                className="inline-block bg-primary hover:bg-primary-dark text-white hover:text-white py-3 px-6 rounded-md transition-all hover:translate-y-[-2px] shadow-lg shadow-primary/20"
              >
                {t.viewResume}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 