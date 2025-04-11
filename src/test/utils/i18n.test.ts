import { describe, it, expect } from 'vitest';
import { translations, Language } from '@/utils/i18n';

describe('i18n translations', () => {
  it('should have translations for both English and Spanish', () => {
    // Verificar que existen las traducciones para ambos idiomas
    expect(translations).toHaveProperty('en');
    expect(translations).toHaveProperty('es');
  });

  it('should have the same keys in both language objects', () => {
    // Obtener las claves de ambos objetos de traducción
    const englishKeys = Object.keys(translations.en);
    const spanishKeys = Object.keys(translations.es);
    
    // Verificar que las claves son las mismas
    expect(englishKeys.sort()).toEqual(spanishKeys.sort());
    
    // Verificar que ninguna clave está vacía
    englishKeys.forEach(key => {
      expect(translations.en[key as keyof typeof translations.en]).not.toBe('');
    });
    
    spanishKeys.forEach(key => {
      expect(translations.es[key as keyof typeof translations.es]).not.toBe('');
    });
  });

  it('should have different translations for each language', () => {
    // Verificar algunos textos clave para asegurarse de que son diferentes en cada idioma
    expect(translations.en.home).toBe('Home');
    expect(translations.es.home).toBe('Inicio');
    
    expect(translations.en.about).toBe('About me');
    expect(translations.es.about).toBe('Sobre mí');
    
    expect(translations.en.contactMe).toBe('Contact me');
    expect(translations.es.contactMe).toBe('Contáctame');
  });

  it('should have all navbar items translated', () => {
    const navbarItems = ['home', 'about', 'portfolio', 'projects', 'contact'];
    
    // Verificar que todos los items del navbar están traducidos
    navbarItems.forEach(item => {
      expect(translations.en).toHaveProperty(item);
      expect(translations.es).toHaveProperty(item);
      expect(translations.en[item as keyof typeof translations.en]).not.toBe('');
      expect(translations.es[item as keyof typeof translations.es]).not.toBe('');
    });
  });

  it('should have all contact form items translated', () => {
    const contactItems = [
      'contactTitle', 'contactSubtitle', 'name', 'email', 
      'subject', 'message', 'send', 'sending', 
      'successMessage', 'errorMessage', 'connectionError'
    ];
    
    // Verificar que todos los items del formulario de contacto están traducidos
    contactItems.forEach(item => {
      expect(translations.en).toHaveProperty(item);
      expect(translations.es).toHaveProperty(item);
      expect(translations.en[item as keyof typeof translations.en]).not.toBe('');
      expect(translations.es[item as keyof typeof translations.es]).not.toBe('');
    });
  });

  it('should have all section headings translated', () => {
    const sectionHeadings = [
      'aboutMe', 'myServices', 'myPortfolio', 'myProjects'
    ];
    
    // Verificar que todos los títulos de secciones están traducidos
    sectionHeadings.forEach(heading => {
      expect(translations.en).toHaveProperty(heading);
      expect(translations.es).toHaveProperty(heading);
      expect(translations.en[heading as keyof typeof translations.en]).not.toBe('');
      expect(translations.es[heading as keyof typeof translations.es]).not.toBe('');
    });
  });
}); 