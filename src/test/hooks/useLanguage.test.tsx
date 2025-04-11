import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useLanguage, LanguageProvider } from '@/hooks/useLanguage';
import { ReactNode } from 'react';

const wrapper = ({ children }: { children: ReactNode }) => (
  <LanguageProvider>{children}</LanguageProvider>
);

describe('useLanguage hook', () => {
  // Mock localStorage
  const localStorageMock = (() => {
    let store: Record<string, string> = {};
    return {
      getItem: vi.fn((key: string) => store[key] || null),
      setItem: vi.fn((key: string, value: string) => {
        store[key] = value;
      }),
      clear: vi.fn(() => {
        store = {};
      }),
    };
  })();

  // Replace global localStorage with our mock
  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
      writable: true,
    });
    localStorageMock.clear();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should use English as default language', () => {
    const { result } = renderHook(() => useLanguage(), { wrapper });
    expect(result.current.language).toBe('en');
    expect(localStorageMock.setItem).toHaveBeenCalledWith('language', 'en');
  });

  it('should load language from localStorage if available', () => {
    localStorageMock.getItem.mockReturnValueOnce('es');
    const { result } = renderHook(() => useLanguage(), { wrapper });
    expect(result.current.language).toBe('es');
  });

  it('should change language when setLanguage is called', () => {
    const { result } = renderHook(() => useLanguage(), { wrapper });
    
    // Default is English
    expect(result.current.language).toBe('en');
    
    // Change to Spanish
    act(() => {
      result.current.setLanguage('es');
    });
    
    expect(result.current.language).toBe('es');
    expect(localStorageMock.setItem).toHaveBeenCalledWith('language', 'es');
    
    // Change back to English
    act(() => {
      result.current.setLanguage('en');
    });
    
    expect(result.current.language).toBe('en');
    expect(localStorageMock.setItem).toHaveBeenCalledWith('language', 'en');
  });

  it('should provide translations for the current language', () => {
    const { result } = renderHook(() => useLanguage(), { wrapper });
    
    // Check English translations
    expect(result.current.t.home).toBe('Home');
    expect(result.current.t.about).toBe('About me');
    
    // Change to Spanish and check translations
    act(() => {
      result.current.setLanguage('es');
    });
    
    expect(result.current.t.home).toBe('Inicio');
    expect(result.current.t.about).toBe('Sobre mí');
  });

  it('should throw error when used outside of LanguageProvider', () => {
    // Suppress error in console during test
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    expect(() => {
      renderHook(() => useLanguage());
    }).toThrow('useLanguage must be used within a LanguageProvider');
    
    consoleSpy.mockRestore();
  });
}); 