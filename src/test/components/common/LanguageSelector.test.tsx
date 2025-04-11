import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import LanguageSelector from '@/components/common/LanguageSelector';
import { useLanguage, LanguageProvider } from '@/hooks/useLanguage';

// Mock del hook useLanguage
vi.mock('../../../../hooks/useLanguage', async () => {
  const actual = await vi.importActual('../../../../hooks/useLanguage');
  return {
    ...actual,
    useLanguage: vi.fn()
  };
});

describe('LanguageSelector component', () => {
  it('should render with current language', () => {
    // Mock implementation para inglés
    vi.mocked(useLanguage).mockReturnValue({
      language: 'en',
      setLanguage: vi.fn(),
      t: {} as any
    });
    
    render(<LanguageSelector />);
    
    // Verificar que se muestra EN
    expect(screen.getByText('EN')).toBeInTheDocument();
  });
  
  it('should render with Spanish language', () => {
    // Mock implementation para español
    vi.mocked(useLanguage).mockReturnValue({
      language: 'es',
      setLanguage: vi.fn(),
      t: {} as any
    });
    
    render(<LanguageSelector />);
    
    // Verificar que se muestra ES
    expect(screen.getByText('ES')).toBeInTheDocument();
  });
  
  it('should toggle language when clicked', () => {
    const setLanguageMock = vi.fn();
    
    // Inicialmente en inglés
    vi.mocked(useLanguage).mockReturnValue({
      language: 'en',
      setLanguage: setLanguageMock,
      t: {} as any
    });
    
    render(<LanguageSelector />);
    
    // Hacer clic en el botón
    fireEvent.click(screen.getByRole('button'));
    
    // Verificar que se llama a setLanguage con 'es'
    expect(setLanguageMock).toHaveBeenCalledWith('es');
  });
  
  it('should toggle from Spanish to English when clicked', () => {
    const setLanguageMock = vi.fn();
    
    // Inicialmente en español
    vi.mocked(useLanguage).mockReturnValue({
      language: 'es',
      setLanguage: setLanguageMock,
      t: {} as any
    });
    
    render(<LanguageSelector />);
    
    // Hacer clic en el botón
    fireEvent.click(screen.getByRole('button'));
    
    // Verificar que se llama a setLanguage con 'en'
    expect(setLanguageMock).toHaveBeenCalledWith('en');
  });
  
  it('should accept and apply additional className', () => {
    vi.mocked(useLanguage).mockReturnValue({
      language: 'en',
      setLanguage: vi.fn(),
      t: {} as any
    });
    
    render(<LanguageSelector className="test-class" />);
    
    // Verificar que la clase adicional se aplica correctamente
    expect(screen.getByRole('button')).toHaveClass('test-class');
  });
  
  // Test de integración con el provider real
  it('should work with actual LanguageProvider', () => {
    // Restauramos la implementación real para esta prueba
    vi.unmock('../../../../hooks/useLanguage');
    
    render(
      <LanguageProvider>
        <LanguageSelector />
      </LanguageProvider>
    );
    
    // Inicialmente en inglés (default)
    expect(screen.getByText('EN')).toBeInTheDocument();
    
    // Cambiar a español
    fireEvent.click(screen.getByRole('button'));
    
    // Ahora debería mostrar ES
    expect(screen.getByText('ES')).toBeInTheDocument();
    
    // Cambiar de nuevo a inglés
    fireEvent.click(screen.getByRole('button'));
    
    // Debería volver a mostrar EN
    expect(screen.getByText('EN')).toBeInTheDocument();
  });
}); 