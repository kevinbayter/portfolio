import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import LanguageSelector from '@/components/common/LanguageSelector';
import * as useLanguageModule from '@/hooks/useLanguage';
import { Translations } from '@/utils/i18n';

// Spying on the useLanguage hook
const useLanguageSpy = vi.spyOn(useLanguageModule, 'useLanguage');

describe('LanguageSelector component', () => {
  it('should render with current language', () => {
    // Mock implementation para inglés
    useLanguageSpy.mockReturnValue({
      language: 'en',
      setLanguage: vi.fn(),
      t: {} as Translations
    });
    
    render(<LanguageSelector />);
    
    // Verificar que se muestra EN
    expect(screen.getByText('EN')).toBeInTheDocument();
  });
  
  it('should render with Spanish language', () => {
    // Mock implementation para español
    useLanguageSpy.mockReturnValue({
      language: 'es',
      setLanguage: vi.fn(),
      t: {} as Translations
    });
    
    render(<LanguageSelector />);
    
    // Verificar que se muestra ES
    expect(screen.getByText('ES')).toBeInTheDocument();
  });
  
  it('should toggle language when clicked', () => {
    const setLanguageMock = vi.fn();
    
    // Inicialmente en inglés
    useLanguageSpy.mockReturnValue({
      language: 'en',
      setLanguage: setLanguageMock,
      t: {} as Translations
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
    useLanguageSpy.mockReturnValue({
      language: 'es',
      setLanguage: setLanguageMock,
      t: {} as Translations
    });
    
    render(<LanguageSelector />);
    
    // Hacer clic en el botón
    fireEvent.click(screen.getByRole('button'));
    
    // Verificar que se llama a setLanguage con 'en'
    expect(setLanguageMock).toHaveBeenCalledWith('en');
  });
  
  it('should accept and apply additional className', () => {
    useLanguageSpy.mockReturnValue({
      language: 'en',
      setLanguage: vi.fn(),
      t: {} as Translations
    });
    
    render(<LanguageSelector className="test-class" />);
    
    // Verificar que la clase adicional se aplica correctamente
    expect(screen.getByRole('button')).toHaveClass('test-class');
  });
  
  // Test de integración con el provider real
  it('should work with actual LanguageProvider', async () => {
    // Restaurar la implementación real
    useLanguageSpy.mockRestore();
    
    render(
      <useLanguageModule.LanguageProvider>
        <LanguageSelector />
      </useLanguageModule.LanguageProvider>
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