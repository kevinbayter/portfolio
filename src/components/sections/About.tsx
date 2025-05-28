import { motion } from 'framer-motion';
import bayterWebp from '../../assets/images/Bayter.webp';
import bayterJpg from '../../assets/images/Bayter.jpg';
import { useLanguage } from '../../hooks/useLanguage';

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.5, staggerChildren: 0.2 }
  }
};

const columnLeftVariant = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const columnRightVariant = {
  hidden: { opacity: 0, x: 50 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.2, delayChildren: 0.2 }
  }
};

const textItemVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const imageCardHoverProps = {
  y: -8,
  scale: 1.03,
  boxShadow: "0px 15px 25px rgba(0, 0, 0, 0.2)",
  transition: { duration: 0.3, ease: "easeOut" }
};

const buttonHoverProps = {
  y: -4,
  scale: 1.05,
  boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.15)",
  transition: { duration: 0.2, ease: "easeOut" }
};

const columnRightHoverProps = {
  scale: 1.03,
  rotateY: 4, 
  boxShadow: "0px 10px 30px rgba(0,0,0,0.1)", 
  transition: { duration: 0.4, ease: "circOut" }
};

const About = () => {
  const { t } = useLanguage();

  return (
    <motion.section 
      id="about" 
      className="py-20 overflow-hidden" 
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <motion.div 
            className="md:w-5/12 mb-10 md:mb-0"
            variants={columnLeftVariant}
          >
            <motion.div 
              className="bg-gray-800 p-3 rounded-lg shadow-xl"
              whileHover={imageCardHoverProps}
            >
              <div className="overflow-hidden rounded">
                <picture>
                  <source srcSet={bayterWebp} type="image/webp" />
                  <motion.img 
                    src={bayterJpg} 
                    alt="Kevin Bayter" 
                    className="w-full h-auto rounded" 
                    loading="lazy"
                  />
                </picture>
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="md:w-6/12"
            variants={columnRightVariant}
            whileHover={columnRightHoverProps}
          >
            <div className="about-content p-4 md:p-6 rounded-lg" style={{ transformStyle: 'preserve-3d' }}>
              <motion.h2 
                className="text-3xl md:text-4xl font-serif mb-6 text-gray-100"
                variants={textItemVariant}
              >
                {t.aboutMe}
              </motion.h2>
              
              <motion.p 
                className="text-xl font-medium text-gray-300 mb-6"
                variants={textItemVariant}
              >
                {t.aboutDescription1}
              </motion.p>
              
              <motion.p 
                className="text-gray-400 mb-8"
                variants={textItemVariant}
              >
                {t.aboutDescription2}
              </motion.p>
              
              <motion.a 
                href="https://drive.google.com/file/d/1SIH1aAatiMFuViJ6ks1lNCqkaQ_RbqMA/view?usp=sharing" 
                target="_blank"
                rel="noopener noreferrer" 
                className="inline-block bg-primary hover:bg-primary-dark text-white hover:text-white py-3 px-6 rounded-md transition-colors duration-300"
                variants={textItemVariant}
                whileHover={buttonHoverProps}
              >
                {t.viewResume}
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default About; 