import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { LanguageProvider } from '@hooks/useLanguage';
import LanguageSelector from '@/components/common/LanguageSelector';
import Navbar from '@/components/layout/Navbar';

// Componente de prueba que combina varios elementos
const TestApp = () => {
  return (
    <LanguageProvider>
      <div>
        <Navbar />
        <div className="language-selector-container">
          <LanguageSelector />
        </div>
      </div>
    </LanguageProvider>
  );
};

describe('Language Integration', () => {
  // Limpiar localStorage antes de cada test
  beforeEach(() => {
    localStorage.clear();
  });
  
  it('should change language across components when selector is clicked', () => {
    render(<TestApp />);
    
    // Verificar que inicialmente el navbar está en inglés
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About me')).toBeInTheDocument();
    expect(screen.getByText('Portfolio')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
    
    // Verificar que el selector de idioma muestra 'EN'
    const languageSelector = screen.getByText('EN');
    expect(languageSelector).toBeInTheDocument();
    
    // Cambiar el idioma haciendo clic en el selector
    fireEvent.click(languageSelector);
    
    // Verificar que el navbar ahora está en español
    expect(screen.getByText('Inicio')).toBeInTheDocument();
    expect(screen.getByText('Sobre mí')).toBeInTheDocument();
    expect(screen.getByText('Portfolio')).toBeInTheDocument();
    expect(screen.getByText('Proyectos')).toBeInTheDocument();
    expect(screen.getByText('Contacto')).toBeInTheDocument();
    
    // Verificar que el selector de idioma muestra 'ES'
    expect(screen.getByText('ES')).toBeInTheDocument();
    
    // Cambiar el idioma de nuevo a inglés
    fireEvent.click(screen.getByText('ES'));
    
    // Verificar que el navbar vuelve a estar en inglés
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About me')).toBeInTheDocument();
    expect(screen.getByText('Portfolio')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });
  
  it('should persist language preference in localStorage', () => {
    const { unmount } = render(<TestApp />);
    
    // Por defecto debería ser inglés
    expect(screen.getByText('EN')).toBeInTheDocument();
    expect(localStorage.getItem('language')).toBe('en');
    
    // Cambiar a español
    fireEvent.click(screen.getByText('EN'));
    expect(screen.getByText('ES')).toBeInTheDocument();
    expect(localStorage.getItem('language')).toBe('es');
    
    // Desmontar y volver a montar el componente
    unmount();
    render(<TestApp />);
    
    // El idioma debería seguir siendo español
    expect(screen.getByText('ES')).toBeInTheDocument();
    expect(screen.getByText('Inicio')).toBeInTheDocument();
  });
  
  it('should use English as default when no language is saved', () => {
    // Asegurarse de que localStorage está vacío
    localStorage.removeItem('language');
    
    render(<TestApp />);
    
    // Debería usar inglés por defecto
    expect(screen.getByText('EN')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
  });
}); 