import React, { useEffect, useState, useCallback } from 'react';

interface Firefly {
  id: number;
  size: number;
  top: string;
  left: string;
  animationDuration: string;
  delay: string;
  opacity: number;
  pattern: number;
}

const FirefliesEffect: React.FC = () => {
  const [fireflies, setFireflies] = useState<Firefly[]>([]);

  const generateFireflies = useCallback(() => {
    // Genera un número aleatorio entre 15 y 30 luciérnagas
    const numberOfFireflies = Math.floor(Math.random() * 16) + 15;
    const newFireflies: Firefly[] = [];

    for (let i = 0; i < numberOfFireflies; i++) {
      // Tamaño entre 2px y 5px
      const size = Math.random() * 3 + 2;
      
      // Posición aleatoria
      const top = `${Math.random() * 100}%`;
      const left = `${Math.random() * 100}%`;
      
      // Duración de animación entre 5s y 15s para movimiento más rápido
      const animationDuration = `${Math.random() * 10 + 5}s`;
      
      // Retraso aleatorio entre 0s y 3s para desincronizar las animaciones
      const delay = `${Math.random() * 3}s`;
      
      // Opacidad base más baja para que el apagado sea más notorio
      const opacity = Math.random() * 0.2 + 0.1;
      
      // Patrón de animación aleatorio (1-5)
      const pattern = Math.floor(Math.random() * 5) + 1;

      newFireflies.push({
        id: i,
        size,
        top,
        left,
        animationDuration,
        delay,
        opacity,
        pattern
      });
    }

    setFireflies(newFireflies);
  }, []);

  useEffect(() => {
    // Generar luciérnagas al montar el componente
    generateFireflies();

    // Regenerar luciérnagas solo cuando cambie el tamaño de la ventana
    window.addEventListener('resize', generateFireflies);
    
    return () => {
      window.removeEventListener('resize', generateFireflies);
    };
  }, [generateFireflies]);

  return (
    <div className="fireflies-container">
      {fireflies.map((firefly) => (
        <div
          key={firefly.id}
          className={`firefly pattern-${firefly.pattern}`}
          style={{
            width: `${firefly.size}px`,
            height: `${firefly.size}px`,
            top: firefly.top,
            left: firefly.left,
            animationDuration: firefly.animationDuration,
            animationDelay: firefly.delay,
          }}
        />
      ))}
    </div>
  );
};

export default FirefliesEffect; 