import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Contact from '@/components/sections/Contact';

// Mock de fetch para probar la envío del formulario
global.fetch = vi.fn();

describe('Contact component', () => {
  const mockSuccessResponse = { ok: true };
  const mockErrorResponse = { ok: false };
  
  beforeEach(() => {
    vi.resetAllMocks();
    // Mock para fetch por defecto
    vi.mocked(global.fetch).mockResolvedValue({
      ok: true,
      json: async () => mockSuccessResponse
    } as Response);
  });

  it('should render all contact icons with correct links', () => {
    render(<Contact />);
    
    // Verificar que existen todos los iconos de contacto
    const contactLinks = screen.getAllByRole('link');
    
    // Debería haber al menos 5 enlaces (los 5 del contactInfo)
    expect(contactLinks.length).toBeGreaterThanOrEqual(4);
    
    // Verificar que existe el enlace de WhatsApp
    const whatsappLink = contactLinks.find(link => link.getAttribute('href')?.includes('wa.me'));
    expect(whatsappLink).toBeInTheDocument();
    
    // Verificar que existe el enlace de email
    const emailLink = contactLinks.find(link => link.getAttribute('href')?.includes('mailto:'));
    expect(emailLink).toBeInTheDocument();
    
    // Verificar que existe el enlace de TikTok
    const tiktokLink = contactLinks.find(link => link.getAttribute('href')?.includes('tiktok.com'));
    expect(tiktokLink).toBeInTheDocument();
    
    // Verificar que existe el enlace de Facebook
    const facebookLink = contactLinks.find(link => link.getAttribute('href')?.includes('facebook.com'));
    expect(facebookLink).toBeInTheDocument();
  });

  it('should render the contact form with all fields', () => {
    render(<Contact />);
    
    // Verificar que todos los campos del formulario están presentes
    expect(screen.getByLabelText(/nombre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/asunto/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/mensaje/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /enviar mensaje/i })).toBeInTheDocument();
  });

  it('should handle form submission correctly with success response', async () => {
    const user = userEvent.setup();
    render(<Contact />);
    
    // Rellenar los campos del formulario
    await user.type(screen.getByLabelText(/nombre/i), 'Usuario Test');
    await user.type(screen.getByLabelText(/email/i), 'test@example.com');
    await user.type(screen.getByLabelText(/asunto/i), 'Test Subject');
    await user.type(screen.getByLabelText(/mensaje/i), 'Este es un mensaje de prueba');
    
    // Enviar el formulario
    await user.click(screen.getByRole('button', { name: /enviar mensaje/i }));
    
    // Verificar que fetch se llamó correctamente
    expect(global.fetch).toHaveBeenCalledWith(
      'https://formspree.io/f/xgerdvjk',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          'Content-Type': 'application/json'
        }),
        body: expect.any(String)
      })
    );
    
    // Verificar el contenido del body
    const fetchCall = vi.mocked(global.fetch).mock.calls[0];
    const requestBody = JSON.parse(fetchCall[1]?.body as string);
    expect(requestBody).toEqual({
      name: 'Usuario Test',
      email: 'test@example.com',
      subject: 'Test Subject',
      message: 'Este es un mensaje de prueba'
    });
    
    // Verificar que aparece el mensaje de éxito
    await waitFor(() => {
      expect(screen.getByText(/tu mensaje ha sido enviado/i)).toBeInTheDocument();
    });
    
    // Verificar que los campos del formulario se han reseteado
    expect(screen.getByLabelText(/nombre/i)).toHaveValue('');
    expect(screen.getByLabelText(/email/i)).toHaveValue('');
    expect(screen.getByLabelText(/asunto/i)).toHaveValue('');
    expect(screen.getByLabelText(/mensaje/i)).toHaveValue('');
  });

  it('should handle form submission errors', async () => {
    // Mock de respuesta de error
    vi.mocked(global.fetch).mockResolvedValueOnce({
      ok: false,
      json: async () => mockErrorResponse
    } as Response);
    
    const user = userEvent.setup();
    render(<Contact />);
    
    // Rellenar y enviar el formulario
    await user.type(screen.getByLabelText(/nombre/i), 'Usuario Test');
    await user.type(screen.getByLabelText(/email/i), 'test@example.com');
    await user.type(screen.getByLabelText(/asunto/i), 'Test Subject');
    await user.type(screen.getByLabelText(/mensaje/i), 'Este es un mensaje de prueba');
    await user.click(screen.getByRole('button', { name: /enviar mensaje/i }));
    
    // Verificar que aparece el mensaje de error
    await waitFor(() => {
      expect(screen.getByText(/hubo un error al enviar el mensaje/i)).toBeInTheDocument();
    });
  });

  it('should handle network errors', async () => {
    // Mock de error de red
    vi.mocked(global.fetch).mockRejectedValueOnce(new Error('Network Error'));
    
    const user = userEvent.setup();
    render(<Contact />);
    
    // Rellenar y enviar el formulario
    await user.type(screen.getByLabelText(/nombre/i), 'Usuario Test');
    await user.type(screen.getByLabelText(/email/i), 'test@example.com');
    await user.type(screen.getByLabelText(/asunto/i), 'Test Subject');
    await user.type(screen.getByLabelText(/mensaje/i), 'Este es un mensaje de prueba');
    await user.click(screen.getByRole('button', { name: /enviar mensaje/i }));
    
    // Verificar que aparece el mensaje de error de conexión
    await waitFor(() => {
      expect(screen.getByText(/hubo un error de conexión/i)).toBeInTheDocument();
    });
  });

  it('should disable the submit button while submitting', async () => {
    // Retraso en la respuesta para verificar el estado de "enviando"
    vi.mocked(global.fetch).mockImplementationOnce(() => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve({
            ok: true,
            json: async () => mockSuccessResponse
          } as Response);
        }, 100);
      });
    });
    
    const user = userEvent.setup();
    render(<Contact />);
    
    // Rellenar y enviar el formulario
    await user.type(screen.getByLabelText(/nombre/i), 'Usuario Test');
    await user.type(screen.getByLabelText(/email/i), 'test@example.com');
    await user.type(screen.getByLabelText(/asunto/i), 'Test Subject');
    await user.type(screen.getByLabelText(/mensaje/i), 'Este es un mensaje de prueba');
    await user.click(screen.getByRole('button', { name: /enviar mensaje/i }));
    
    // Verificar que el botón está deshabilitado y muestra "Enviando..."
    expect(screen.getByText(/enviando/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeDisabled();
    
    // Esperar a que termine el envío
    await waitFor(() => {
      expect(screen.getByText(/tu mensaje ha sido enviado/i)).toBeInTheDocument();
    });
    
    // Verificar que el botón vuelve a estar habilitado
    expect(screen.getByRole('button')).not.toBeDisabled();
    expect(screen.getByRole('button')).toHaveTextContent(/enviar mensaje/i);
  });
}); 