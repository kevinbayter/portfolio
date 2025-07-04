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
  boxShadow: "0px 15px 25px rgba(139, 92, 246, 0.2)",
  transition: { duration: 0.3, ease: "easeOut" }
};

const buttonHoverProps = {
  y: -4,
  scale: 1.02,
  boxShadow: "0px 8px 20px rgba(139, 92, 246, 0.4)",
  transition: { duration: 0.2, ease: "easeOut" }
};

const columnRightHoverProps = {
  scale: 1.02,
  rotateY: 2, 
  boxShadow: "0px 10px 30px rgba(139, 92, 246, 0.1)", 
  transition: { duration: 0.4, ease: "circOut" }
};

const About = () => {
  const { t } = useLanguage();

  return (
    <motion.section 
      id="about" 
      className="py-20 overflow-hidden bg-gradient-to-br from-background via-background-light to-background-lighter" 
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <motion.div 
            className="md:w-5/12 mb-10 md:mb-0"
            variants={columnLeftVariant}
          >
            <motion.div 
              className="bg-gradient-to-br from-card-bg to-card-bg-light p-4 rounded-2xl shadow-card border border-dark-300/50"
              whileHover={imageCardHoverProps}
            >
              <div className="overflow-hidden rounded-xl">
                <picture>
                  <source srcSet={bayterWebp} type="image/webp" />
                  <motion.img 
                    src={bayterJpg} 
                    alt="Kevin Bayter" 
                    className="w-full h-auto rounded-xl transition-transform duration-500 hover:scale-105" 
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
            <div className="about-content p-6 md:p-8 rounded-2xl bg-gradient-to-br from-card-bg/50 to-card-bg-light/50 backdrop-blur-sm border border-dark-300/30" style={{ transformStyle: 'preserve-3d' }}>
              <motion.h2 
                className="text-4xl md:text-5xl font-serif mb-6 bg-gradient-to-r from-primary-light via-primary to-secondary bg-clip-text text-transparent"
                variants={textItemVariant}
              >
                {t.aboutMe}
              </motion.h2>
              
              <motion.p 
                className="text-xl font-medium text-text-secondary mb-6 leading-relaxed"
                variants={textItemVariant}
              >
                {t.aboutDescription1}
              </motion.p>
              
              <motion.p 
                className="text-text-muted mb-8 leading-relaxed"
                variants={textItemVariant}
              >
                {t.aboutDescription2}
              </motion.p>
              
              <motion.a 
                href="https://drive.google.com/file/d/1SIH1aAatiMFuViJ6ks1lNCqkaQ_RbqMA/view?usp=sharing" 
                target="_blank"
                rel="noopener noreferrer" 
                className="w-full block text-center bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white py-4 px-8 rounded-xl font-semibold text-lg transition-all duration-300 shadow-glow hover:shadow-glow-lg transform hover:scale-[1.02] border border-primary/20 hover:border-primary/40"
                variants={textItemVariant}
                whileHover={buttonHoverProps}
              >
                <span className="flex items-center justify-center gap-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  {t.viewResume}
                  <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-1M14 6l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default About; 