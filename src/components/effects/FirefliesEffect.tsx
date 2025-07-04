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
    const numberOfFireflies = Math.floor(Math.random() * 16) + 15; // 15-30
    const newFireflies: Firefly[] = [];

    for (let i = 0; i < numberOfFireflies; i++) {
      const size = Math.random() * 3 + 2; // 2-5px
      const top = `${Math.random() * 100}%`;
      const left = `${Math.random() * 100}%`;
      const animationDuration = `${Math.random() * 10 + 5}s`; // 5-15s
      const delay = `${Math.random() * 3}s`;
      const opacity = Math.random() * 0.2 + 0.1;
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
    generateFireflies();
    window.addEventListener('resize', generateFireflies);
    return () => window.removeEventListener('resize', generateFireflies);
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
            opacity: firefly.opacity,
          }}
        />
      ))}
    </div>
  );
};

export default FirefliesEffect; 