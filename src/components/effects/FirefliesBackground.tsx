import { useEffect, useState } from 'react';

interface Firefly {
  id: number;
  x: number;
  y: number;
  size: number;
  moveDuration: number;
  blinkDuration: number;
  moveDelay: number;
  blinkDelay: number;
  pattern: string;
}

const FirefliesBackground: React.FC = () => {
  const [fireflies, setFireflies] = useState<Firefly[]>([]);

  useEffect(() => {
    const createFireflies = () => {
      const newFireflies: Firefly[] = [];
      const numberOfFireflies = 15; // Reduced for performance

      for (let i = 0; i < numberOfFireflies; i++) {
        newFireflies.push({
          id: i,
          x: Math.random() * 100, // Percentage
          y: Math.random() * 100, // Percentage
          size: Math.random() * 4 + 3, // 3-7px (smaller for performance)
          moveDuration: Math.random() * 10 + 15, // 15-25 seconds movement
          blinkDuration: Math.random() * 2 + 2, // 2-4 seconds blink
          moveDelay: Math.random() * 5, // 0-5 seconds movement delay
          blinkDelay: Math.random() * 3, // 0-3 seconds blink delay
          pattern: `pattern-${(i % 5) + 1}` // pattern-1 to pattern-5
        });
      }
      setFireflies(newFireflies);
    };

    createFireflies();

    // Recreate fireflies less frequently for performance
    const interval = setInterval(createFireflies, 45000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fireflies-container">
      {fireflies.map((firefly) => (
        <div
          key={firefly.id}
          className={`firefly firefly-moving ${firefly.pattern}`}
          style={{
            left: `${firefly.x}%`,
            top: `${firefly.y}%`,
            width: `${firefly.size}px`,
            height: `${firefly.size}px`,
            '--move-duration': `${firefly.moveDuration}s`,
            '--blink-duration': `${firefly.blinkDuration}s`,
            '--move-delay': `${firefly.moveDelay}s`,
            '--blink-delay': `${firefly.blinkDelay}s`,
            animationName: `firefly-${firefly.pattern}, firefly-blink`,
            animationDuration: `var(--move-duration), var(--blink-duration)`,
            animationDelay: `var(--move-delay), var(--blink-delay)`,
            animationIterationCount: 'infinite, infinite',
            animationTimingFunction: 'ease-in-out, ease-in-out'
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
};

export default FirefliesBackground;