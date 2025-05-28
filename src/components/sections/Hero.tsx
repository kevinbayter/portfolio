import { useMemo, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import * as PIXI from 'pixi.js';
import { FaFacebook, FaTwitter, FaYoutube, FaTelegram, FaLinkedin, FaGithub } from 'react-icons/fa';
import bgImage from '../../assets/images/Bg-bosques.webp';
import { useLanguage } from '@hooks/useLanguage.tsx';
import { TypeAnimation } from 'react-type-animation';

interface Bird extends PIXI.Graphics {
  vx: number;
  vy_drift_speed: number; 
  initialY: number;
  amplitude: number;
  frequency: number;
  time: number;
  originalColor: number;
  z: number;
  vz: number;
  baseScale: number;
}

const Hero: React.FC = () => {
  const { t } = useLanguage();
  const pixiContainerRef = useRef<HTMLDivElement>(null);
  const pixiAppRef = useRef<PIXI.Application | null>(null);

  useEffect(() => {
    if (!pixiContainerRef.current || pixiAppRef.current) {
      return;
    }
    console.log('PixiJS Version:', PIXI.VERSION);

    const app = new PIXI.Application();
    app.init({
      width: pixiContainerRef.current.clientWidth,
      height: pixiContainerRef.current.clientHeight,
      backgroundAlpha: 0,
      antialias: true,
      resolution: window.devicePixelRatio ?? 1,
      autoDensity: true,
    }).then(() => {
      if (pixiContainerRef.current && !pixiContainerRef.current.querySelector('canvas')) {
        pixiContainerRef.current.appendChild(app.canvas);
        console.log('PixiJS canvas appended.');
      } else if (pixiContainerRef.current?.querySelector('canvas')) {
        console.log('PixiJS canvas already exists.');
      }
      pixiAppRef.current = app;
      app.stage.sortableChildren = true;

      const birds: Bird[] = [];
      const NUM_BIRDS = 30; 
      const BIRD_COLOR = 0x222222;

      const Z_FAR_PLANE = 200;         
      const Z_NEAR_RESET_THRESHOLD = -75; 
      const Z_REAPPEAR_FAR = 180;       
      const Z_REAPPEAR_NEAR = -50;      
      const PERSPECTIVE_FACTOR = 100;   

      for (let i = 0; i < NUM_BIRDS; i++) {
        const bird = new PIXI.Graphics() as Bird;
        bird.originalColor = BIRD_COLOR;

        bird.moveTo(0, 0); 
        bird.lineTo(-15, 5); 
        bird.lineTo(-15, -5); 
        bird.closePath();
        bird.fill(bird.originalColor);

        bird.x = Math.random() * app.screen.width;
        bird.initialY = Math.random() * app.screen.height;
        bird.y = bird.initialY;

        bird.vx = (Math.random() - 0.5) * 2.5 + (Math.random() < 0.5 ? -0.5 : 0.5); 
        bird.vy_drift_speed = (Math.random() - 0.5) * 0.8; 
        bird.rotation = bird.vx > 0 ? 0 : Math.PI;
        
        bird.amplitude = Math.random() * 15 + 10; 
        bird.frequency = Math.random() * 0.04 + 0.03; 
        bird.time = Math.random() * 100;

        bird.z = Math.random() * Z_FAR_PLANE; 
        bird.vz = (Math.random() > 0.5 ? 1 : -1) * (0.1 + Math.random() * 0.3); 
        bird.baseScale = 0.3 + Math.random() * 0.5; 

        birds.push(bird);
        app.stage.addChild(bird);
      }
      console.log(`${NUM_BIRDS} birds created.`);

      app.ticker.add((ticker) => {
        const delta = ticker.deltaTime;

        birds.forEach(b => {
          b.time += delta;

          b.z += b.vz * delta;

          let scale = b.baseScale * (PERSPECTIVE_FACTOR / (Math.max(1, PERSPECTIVE_FACTOR + b.z)));
          scale = Math.max(0.05, Math.min(scale, 4)); 
          b.scale.set(scale);
          b.alpha = Math.max(0.15, Math.min(1, (PERSPECTIVE_FACTOR * 1.2) / (Math.max(1, PERSPECTIVE_FACTOR + b.z))));
          b.zIndex = Math.floor(Z_FAR_PLANE - b.z); 

          const effectiveSpeedFactor = scale / b.baseScale; 
          b.x += b.vx * effectiveSpeedFactor * delta;
          b.initialY += b.vy_drift_speed * effectiveSpeedFactor * delta;
          b.y = b.initialY + Math.sin(b.time * b.frequency) * b.amplitude; 

          const scaledWidth = 15 * scale; 
          const scaledHeight = 10 * scale; 

          if (b.x > app.screen.width + scaledWidth) {
            b.x = -scaledWidth;
            b.initialY = Math.random() * app.screen.height; 
          } else if (b.x < -scaledWidth) {
            b.x = app.screen.width + scaledWidth;
            b.initialY = Math.random() * app.screen.height;
          }

          if (b.y > app.screen.height + scaledHeight) {
            b.y = -scaledHeight;
            b.initialY = -scaledHeight - (Math.sin(b.time * b.frequency) * b.amplitude);
            b.x = Math.random() * app.screen.width;
          } else if (b.y < -scaledHeight) {
            b.y = app.screen.height + scaledHeight;
            b.initialY = (app.screen.height + scaledHeight) - (Math.sin(b.time * b.frequency) * b.amplitude);
            b.x = Math.random() * app.screen.width;
          }

          if (b.vz < 0 && b.z < Z_NEAR_RESET_THRESHOLD) { 
            b.z = Z_REAPPEAR_FAR; 
            b.vz = -(0.1 + Math.random() * 0.2); 
            b.x = Math.random() * app.screen.width;
            b.initialY = Math.random() * app.screen.height;
          } else if (b.vz > 0 && b.z > Z_FAR_PLANE) { 
            b.z = Z_REAPPEAR_NEAR; 
            b.vz = (0.1 + Math.random() * 0.2); 
            b.x = Math.random() * app.screen.width;
            b.initialY = Math.random() * app.screen.height;
          }
        });
      });

    }).catch(err => console.error('PixiJS app.init error:', err));

    const handleResize = () => {
      if (pixiContainerRef.current && pixiAppRef.current?.renderer) {
        const newWidth = pixiContainerRef.current.clientWidth;
        const newHeight = pixiContainerRef.current.clientHeight;
        pixiAppRef.current.renderer.resize(newWidth, newHeight);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (pixiAppRef.current) {
        pixiAppRef.current.destroy(true, { children: true, texture: true });
        pixiAppRef.current = null;
        console.log('PixiJS app destroyed.');
      }
    };
  }, []);

  const typeAnimationSequence = useMemo(() => [
    'Kevin Bayter', 2000, 
    t.softwareEngineer, 2000, 
    t.physicist, 2000
  ], [t.softwareEngineer, t.physicist]);

  return (
    <section
      id="header" 
      className="min-h-screen flex items-center justify-center text-white relative overflow-hidden"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#1a201f', 
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80 z-[0]"></div>
      <div 
        ref={pixiContainerRef} 
        className="absolute inset-0 z-[1]"
      ></div>
      <div className="container mx-auto px-4 text-center relative z-[2]">
        <div className="max-w-2xl mx-auto">
          <motion.h1
            className="text-5xl md:text-7xl font-serif mb-6 font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-primary"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t.iAm}{' '}
            <TypeAnimation
              sequence={typeAnimationSequence}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="text-white"
            />
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl mb-10 opacity-90 font-light text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {t.subtitle}
          </motion.p>
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <motion.a
              href="#contact" 
              className="bg-primary hover:bg-primary-dark text-white hover:text-white px-8 py-3 rounded-md mr-4 inline-block transition-all shadow-lg shadow-primary/20"
              whileHover={{ y: -3, scale: 1.05, boxShadow: "0px 10px 20px rgba(var(--color-primary-rgb), 0.3)" }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {t.contactMe}
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/kevinbayter/" 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-transparent border-2 border-white/50 hover:border-primary hover:text-primary text-white px-8 py-3 rounded-md inline-block transition-all"
              whileHover={{ y: -3, scale: 1.05, borderColor: "rgba(var(--color-primary-rgb), 1)", color: "rgba(var(--color-primary-rgb), 1)" }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              LinkedIn
            </motion.a>
          </motion.div>
          <div className="flex justify-center space-x-4 mt-12">
            <a href="https://www.facebook.com/KevinBayter" target="_blank" rel="noopener noreferrer" className="text-white hover:text-primary transition-colors bg-black/30 p-3 rounded-full inline-block hover:bg-black/50 border border-white/10 hover:border-primary/50" aria-label="Facebook"><FaFacebook size={20} /></a>
            <a href="https://twitter.com/KevinBayter" target="_blank" rel="noopener noreferrer" className="text-white hover:text-primary transition-colors bg-black/30 p-3 rounded-full inline-block hover:bg-black/50 border border-white/10 hover:border-primary/50" aria-label="Twitter"><FaTwitter size={20} /></a>
            <a href="https://www.youtube.com/@KevinBayter" target="_blank" rel="noopener noreferrer" className="text-white hover:text-primary transition-colors bg-black/30 p-3 rounded-full inline-block hover:bg-black/50 border border-white/10 hover:border-primary/50" aria-label="YouTube"><FaYoutube size={20} /></a>
            <a href="https://t.me/KevinBayter" target="_blank" rel="noopener noreferrer" className="text-white hover:text-primary transition-colors bg-black/30 p-3 rounded-full inline-block hover:bg-black/50 border border-white/10 hover:border-primary/50" aria-label="Telegram"><FaTelegram size={20} /></a>
            <a href="https://www.linkedin.com/in/kevinbayter/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-primary transition-colors bg-black/30 p-3 rounded-full inline-block hover:bg-black/50 border border-white/10 hover:border-primary/50" aria-label="LinkedIn"><FaLinkedin size={20} /></a>
            <a href="https://github.com/KevinBayter" target="_blank" rel="noopener noreferrer" className="text-white hover:text-primary transition-colors bg-black/30 p-3 rounded-full inline-block hover:bg-black/50 border border-white/10 hover:border-primary/50" aria-label="GitHub"><FaGithub size={20} /></a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;