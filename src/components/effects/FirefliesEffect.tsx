import { useEffect, useState } from 'react';

interface FireflyProps {
  id: number;
  top: number;
  left: number;
  animationDelay: number;
  size: number;
}

interface FirefliesEffectProps {
  count: number;
}

const FirefliesEffect = ({ count }: FirefliesEffectProps) => {
  const [fireflies, setFireflies] = useState<FireflyProps[]>([]);

  useEffect(() => {
    const newFireflies = Array.from({ length: count }).map((_, index) => ({
      id: index,
      top: Math.random() * 100,
      left: Math.random() * 100,
      animationDelay: Math.random() * 2,
      size: Math.random() * 2 + 2,
    }));

    setFireflies(newFireflies);
  }, [count]);

  return (
    <div className="fireflies-container fixed inset-0 w-full h-full z-10 pointer-events-none">
      {fireflies.map((firefly) => (
        <div
          key={firefly.id}
          className="firefly"
          style={{
            top: `${firefly.top}%`,
            left: `${firefly.left}%`,
            animationDelay: `${firefly.animationDelay}s`,
            width: `${firefly.size}px`,
            height: `${firefly.size}px`,
            opacity: 0.8,
          }}
        />
      ))}
    </div>
  );
};

export default FirefliesEffect; 