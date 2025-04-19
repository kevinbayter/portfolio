import { render, screen } from '@testing-library/react';
import { ContactInfoPanel } from '@components/sections/ContactInfoPanel';
import { contactInfoData } from '@components/sections/ContactInfoData';
import { useLanguage } from '@hooks/useLanguage';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { translations } from '@utils/i18n';

// Mock del hook useLanguage
vi.mock('@hooks/useLanguage', () => ({
    useLanguage: vi.fn()
}));

describe('ContactInfoPanel', () => {
    beforeEach(() => {
        vi.mocked(useLanguage).mockReturnValue({
            t: translations.en,
            language: 'en',
            setLanguage: vi.fn()
        });
    });

    it('renders contact information title', () => {
        render(<ContactInfoPanel />);
        expect(screen.getByText(translations.en.contactInfo)).toBeInTheDocument();
    });

    it('renders all contact methods with correct information', () => {
        render(<ContactInfoPanel />);
        
        contactInfoData.forEach(info => {
            // Verifica que se muestre la etiqueta del método de contacto
            expect(screen.getByText(info.label)).toBeInTheDocument();
            
            // Verifica que se muestre el valor del contacto
            expect(screen.getByText(info.value)).toBeInTheDocument();
            
            // Verifica que el enlace tenga el href correcto
            const escapedValue = info.value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const link = screen.getByRole('link', { name: new RegExp(escapedValue) });
            expect(link).toHaveAttribute('href', info.link);
            expect(link).toHaveAttribute('target', '_blank');
            expect(link).toHaveAttribute('rel', 'noopener noreferrer');
        });
    });

    it('renders availability status', () => {
        render(<ContactInfoPanel />);
        
        // Verifica que se muestre el subtítulo de contacto
        expect(screen.getByText(translations.en.contactSubtitle)).toBeInTheDocument();
        
        // Verifica que se muestre el estado de disponibilidad
        expect(screen.getByText(translations.en.availableForProjects)).toBeInTheDocument();
        
        // Verifica que exista el indicador de disponibilidad (punto verde)
        const availabilityIndicator = document.querySelector('.bg-green-500');
        expect(availabilityIndicator).toBeInTheDocument();
        expect(availabilityIndicator).toHaveClass('animate-pulse');
    });

    it('applies hover styles to contact method cards', () => {
        render(<ContactInfoPanel />);
        
        const contactCards = screen.getAllByRole('link');
        contactCards.forEach(card => {
            expect(card).toHaveClass(
                'flex',
                'items-center',
                'gap-4',
                'p-4',
                'rounded-lg',
                'bg-gray-800/50',
                'hover:bg-primary/10',
                'transition-all',
                'group'
            );
        });
    });

    it('renders in Spanish when language is set to es', () => {
        vi.mocked(useLanguage).mockReturnValue({
            t: translations.es,
            language: 'es',
            setLanguage: vi.fn()
        });

        render(<ContactInfoPanel />);
        
        expect(screen.getByText(translations.es.contactInfo)).toBeInTheDocument();
        expect(screen.getByText(translations.es.contactSubtitle)).toBeInTheDocument();
        expect(screen.getByText(translations.es.availableForProjects)).toBeInTheDocument();
    });
}); 