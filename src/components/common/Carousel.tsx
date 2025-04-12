import { useState, useEffect, useRef, ReactNode } from 'react';

interface CarouselProps {
  children: ReactNode[];
  autoPlay?: boolean;
  interval?: number;
  showControls?: boolean;
  showIndicators?: boolean;
  className?: string;
  slidesToShow?: number;
  infinite?: boolean;
}

const Carousel = ({
  children,
  autoPlay = true,
  interval = 3000,
  showControls = false,
  showIndicators = true,
  className = '',
  slidesToShow = 1
                  }: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const totalSlides = children.length;
  const maxIndex = Math.max(0, Math.ceil(totalSlides / slidesToShow) - 1);

  // Configurar el autoplay - siempre activo
  useEffect(() => {
    if (autoPlay) {
      resetTimeout();
      timeoutRef.current = setTimeout(() => {
        nextSlide();
      }, interval);
    }
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [currentIndex, autoPlay, interval]);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const nextSlide = () => {
    setCurrentIndex(prevIndex => {
      return prevIndex >= maxIndex ? 0 : prevIndex + 1;
    });
  };

  const prevSlide = () => {
    setCurrentIndex(prevIndex => {
      return prevIndex <= 0 ? maxIndex : prevIndex - 1;
    });
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Verificar si hay elementos para mostrar
  if (!children || children.length === 0) {
    return null;
  }

  // Calcular cuántos elementos mostrar a la vez
  const visibleCount = Math.min(slidesToShow, totalSlides);

  // Calcula el ancho total de los slides
  const slideWidth = 100 / visibleCount;

  // Calcula el desplazamiento
  const offset = currentIndex * slideWidth;

  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      {/* Slides */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(-${offset}%)`,
          width: `${100 * (totalSlides / visibleCount)}%`
        }}
      >
        {children.map((item, index) => (
          <div
            key={index}
            className="px-2"
            style={{
              flex: `0 0 ${slideWidth}%`,
              maxWidth: `${slideWidth}%`,
            }}
          >
            {item}
          </div>
        ))}
      </div>

      {/* Controles de navegación - ocultos por defecto */}
      {showControls && (
        <div className="absolute top-1/2 w-full flex justify-between items-center transform -translate-y-1/2 px-4">
          <button
            onClick={prevSlide}
            className="bg-black bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 text-white transition-all"
            aria-label="Previous"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="bg-black bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 text-white transition-all"
            aria-label="Next"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}

      {/* Indicadores */}
      {showIndicators && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                currentIndex === index ? 'bg-primary w-4' : 'bg-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;