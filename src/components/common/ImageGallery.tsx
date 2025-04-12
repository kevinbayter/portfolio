import { useState, useEffect } from 'react';

// Interfaces separadas y bien definidas
interface Image {
    src: string;
    alt: string;
}

interface ImageGalleryProps {
    images: Image[];
    initialIndex?: number;
    isOpen: boolean;
    onClose: () => void;
}

// Hook personalizado para extraer la lógica de navegación
function useGalleryNavigation(images: Image[], initialIndex: number) {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);

    const navigateToPrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : images.length - 1));
    };

    const navigateToNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex < images.length - 1 ? prevIndex + 1 : 0));
    };

    // Reseteo del índice
    const resetIndex = (index: number) => {
        setCurrentIndex(index);
    };

    return {
        currentIndex,
        navigateToPrevious,
        navigateToNext,
        resetIndex,
        currentImage: images[currentIndex]
    };
}

// Hook personalizado para manejar eventos y efectos secundarios
function useGalleryEffects(isOpen: boolean, onClose: () => void, navigateToPrevious: () => void, navigateToNext: () => void) {
    useEffect(() => {
        if (!isOpen) return;

        const keyActionMap = {
            'Escape': onClose,
            'ArrowLeft': navigateToPrevious,
            'ArrowRight': navigateToNext
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            const action = keyActionMap[e.key as keyof typeof keyActionMap];
            if (action) action();
        };

        // Configurar listeners
        window.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden';

        // Limpiar listeners
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'auto';
        };
    }, [isOpen, onClose, navigateToPrevious, navigateToNext]);
}

// Componentes de UI simples y pequeños
const ImageCounter = ({ current, total }: { current: number, total: number }) => (
    <div className="absolute bottom-4 left-0 right-0 text-center text-white text-sm">
        {current} / {total}
    </div>
);

const NavigationButton = ({
                              direction,
                              onClick
                          }: {
    direction: 'left' | 'right',
    onClick: () => void
}) => {
    const isRight = direction === 'right';
    const position = isRight ? 'right-2' : 'left-2';
    const path = isRight
        ? "M9 5l7 7-7 7"
        : "M15 19l-7-7 7-7";
    const label = isRight ? "Next" : "Previous";

    return (
        <button
            onClick={onClick}
            className={`absolute ${position} top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 text-white transition-all`}
            aria-label={label}
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={path} />
            </svg>
        </button>
    );
};

const CloseButton = ({ onClick }: { onClick: () => void }) => (
    <button
        onClick={onClick}
        className="absolute top-2 right-2 bg-black bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 text-white transition-all"
        aria-label="Close"
    >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
    </button>
);

// Componente principal simplificado
const ImageGallery = ({ images, initialIndex = 0, isOpen, onClose }: ImageGalleryProps) => {
    const {
        currentIndex,
        navigateToPrevious,
        navigateToNext,
        resetIndex,
        currentImage
    } = useGalleryNavigation(images, initialIndex);

    // Uso del hook para manejar efectos secundarios
    useGalleryEffects(isOpen, onClose, navigateToPrevious, navigateToNext);

    // Resetear el índice cuando cambia isOpen o initialIndex
    useEffect(() => {
        if (isOpen) {
            resetIndex(initialIndex);
        }
    }, [isOpen, initialIndex, resetIndex]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4"
            onClick={onClose}
        >
            <div
                className="relative max-w-4xl w-full bg-gray-900 rounded-lg overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="relative">
                    <img
                        src={currentImage.src}
                        alt={currentImage.alt}
                        className="w-full h-auto max-h-[80vh] object-contain"
                    />

                    <ImageCounter current={currentIndex + 1} total={images.length} />
                    <NavigationButton direction="left" onClick={navigateToPrevious} />
                    <NavigationButton direction="right" onClick={navigateToNext} />
                    <CloseButton onClick={onClose} />
                </div>
            </div>
        </div>
    );
};

export default ImageGallery;
