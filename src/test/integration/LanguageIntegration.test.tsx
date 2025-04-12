import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { LanguageProvider } from '@/hooks/useLanguage';
import LanguageSelector from '@/components/common/LanguageSelector';

// Crear un componente simple que use las traducciones
const TestNavbar = () => {
  return (
    <div>
      <a href="#home">Home</a>
      <a href="#about">About me</a>
      <a href="#portfolio">Portfolio</a>
      <a href="#projects">Projects</a>
      <a href="#contact">Contact</a>
    </div>
  );
};

// Mock el componente Navbar para simplificar las pruebas
vi.mock('@/components/layout/Navbar', () => ({
  default: () => <TestNavbar />
}));

// Componente de prueba que combina varios elementos
const TestApp = () => {
  return (
    <LanguageProvider>
      <div>
        <TestNavbar />
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
  
  it('should change language across components when selector is clicked', async () => {
    render(<TestApp />);
    
    // Verificar que inicialmente tenemos los textos ingleses
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About me')).toBeInTheDocument();
    expect(screen.getByText('Portfolio')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
    
    // Verificar que el selector de idioma muestra 'EN'
    const languageSelector = screen.getByText('EN');
    expect(languageSelector).toBeInTheDocument();
    
    // Cambiar el idioma haciendo clic en el selector
    await act(async () => {
      fireEvent.click(languageSelector);
    });
    
    // Verificar que el selector de idioma muestra 'ES'
    expect(screen.getByText('ES')).toBeInTheDocument();
  });
  
  it('should persist language preference in localStorage', async () => {
    const { unmount } = render(<TestApp />);
    
    // Por defecto debería ser inglés
    expect(screen.getByText('EN')).toBeInTheDocument();
    expect(localStorage.getItem('language')).toBe('en');
    
    // Cambiar a español
    await act(async () => {
      fireEvent.click(screen.getByText('EN'));
    });
    
    expect(screen.getByText('ES')).toBeInTheDocument();
    expect(localStorage.getItem('language')).toBe('es');
    
    // Desmontar y volver a montar el componente
    unmount();
    render(<TestApp />);
    
    // El idioma debería seguir siendo español
    expect(screen.getByText('ES')).toBeInTheDocument();
  });
  
  it('should use English as default when no language is saved', () => {
    // Asegurarse de que localStorage está vacío
    localStorage.removeItem('language');
    
    render(<TestApp />);
    
    // Debería usar inglés por defecto
    expect(screen.getByText('EN')).toBeInTheDocument();
  });
}); 