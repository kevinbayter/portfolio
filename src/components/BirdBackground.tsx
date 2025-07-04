import { useEffect, useState } from 'react';

interface Firefly {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  pattern: string;
}

const BirdBackground: React.FC = () => {
  const [fireflies, setFireflies] = useState<Firefly[]>([]);

  useEffect(() => {
    const createFireflies = () => {
      const newFireflies: Firefly[] = [];
      const numberOfFireflies = 25;

      for (let i = 0; i < numberOfFireflies; i++) {
        newFireflies.push({
          id: i,
          x: Math.random() * 100, // Percentage
          y: Math.random() * 100, // Percentage
          size: Math.random() * 6 + 3, // 3-9px
          duration: Math.random() * 8 + 15, // 15-23 seconds
          delay: Math.random() * 5, // 0-5 seconds delay
          pattern: `pattern-${(i % 5) + 1}` // pattern-1 to pattern-5
        });
      }
      setFireflies(newFireflies);
    };

    createFireflies();

    // Recreate fireflies periodically to add variety
    const interval = setInterval(createFireflies, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fireflies-container">
      {fireflies.map((firefly) => (
        <div
          key={firefly.id}
          className={`firefly ${firefly.pattern}`}
          style={{
            left: `${firefly.x}%`,
            top: `${firefly.y}%`,
            width: `${firefly.size}px`,
            height: `${firefly.size}px`,
            animationDuration: `${firefly.duration}s, 3s`,
            animationDelay: `${firefly.delay}s, ${firefly.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

export default BirdBackground;
