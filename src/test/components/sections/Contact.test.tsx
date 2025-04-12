import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, RenderOptions } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { ReactElement } from 'react';

import Contact from '@/components/sections/Contact';
import { LanguageProvider } from '@/hooks/useLanguage';
import { translations } from '@/utils/i18n';

global.fetch = vi.fn();
const t = translations.en;

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
      <LanguageProvider>
        {children}
      </LanguageProvider>
  );
};

const renderWithProviders = (
    ui: ReactElement,
    options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options });


describe('Contact component', () => {
  const mockSuccessResponse = { ok: true };
  const mockErrorResponse = { ok: false };
  const defaultFormData = {
    name: 'Usuario Test',
    email: 'test@example.com',
    subject: 'Test Subject',
    message: 'Este es un mensaje de prueba',
  };

  beforeEach(() => {
    vi.resetAllMocks();
    localStorage.clear();
    vi.mocked(global.fetch).mockResolvedValue({
      ok: true,
      json: async () => mockSuccessResponse,
    } as Response);
  });

  const contactLinksInfo = [
    { name: 'WhatsApp', hrefPart: 'wa.me' },
    { name: 'Email', hrefPart: 'mailto:' },
    { name: 'TikTok', hrefPart: 'tiktok.com' },
    { name: 'Facebook', hrefPart: 'facebook.com' },
  ];

  it.each(contactLinksInfo)('should render the $name link', ({ hrefPart }) => {
    renderWithProviders(<Contact />);
    const allLinks = screen.getAllByRole('link');
    const specificLink = allLinks.find(link => link.getAttribute('href')?.includes(hrefPart));
    expect(specificLink).toBeInTheDocument();
    expect(specificLink).toHaveAttribute('href', expect.stringContaining(hrefPart));
  });

  it('should render the contact form with all fields', () => {
    renderWithProviders(<Contact />);
    expect(screen.getByLabelText(t.name)).toBeInTheDocument();
    expect(screen.getByLabelText(t.email)).toBeInTheDocument();
    expect(screen.getByLabelText(t.subject)).toBeInTheDocument();
    expect(screen.getByLabelText(t.message)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: t.send })).toBeInTheDocument();
  });

  const fillAndSubmitForm = async (user: ReturnType<typeof userEvent.setup>, data = defaultFormData) => {
    await user.type(screen.getByLabelText(t.name), data.name);
    await user.type(screen.getByLabelText(t.email), data.email);
    await user.type(screen.getByLabelText(t.subject), data.subject);
    await user.type(screen.getByLabelText(t.message), data.message);
    await user.click(screen.getByRole('button', { name: t.send }));
  };

  const submissionTestCases = [
    {
      testName: 'handle successful submission and reset form',
      mockSetup: () => { /* Default mock */ },
      assertion: async () => {
        await waitFor(() => {
          expect(screen.getByText(t.successMessage)).toBeInTheDocument();
        });
        expect(screen.getByLabelText(t.name)).toHaveValue('');
        expect(screen.getByLabelText(t.email)).toHaveValue('');
        expect(screen.getByLabelText(t.subject)).toHaveValue('');
        expect(screen.getByLabelText(t.message)).toHaveValue('');
      },
      checkFetchCall: true,
    },
    {
      testName: 'handle form submission HTTP errors',
      mockSetup: () => vi.mocked(global.fetch).mockResolvedValueOnce({
        ok: false,
        json: async () => mockErrorResponse,
      } as Response),
      assertion: async () => {
        await waitFor(() => {
          expect(screen.getByText(t.errorMessage)).toBeInTheDocument();
        });
      },
      checkFetchCall: false,
    },
    {
      testName: 'handle form submission network errors',
      mockSetup: () => vi.mocked(global.fetch).mockRejectedValueOnce(new Error('Network Error')),
      assertion: async () => {
        await waitFor(() => {
          expect(screen.getByText(t.connectionError)).toBeInTheDocument();
        });
      },
      checkFetchCall: false,
    },
  ];

  it.each(submissionTestCases)('should $testName', async ({ mockSetup, assertion, checkFetchCall }) => {
    mockSetup();
    const user = userEvent.setup();
    renderWithProviders(<Contact />);
    await fillAndSubmitForm(user);

    if (checkFetchCall) {
      expect(global.fetch).toHaveBeenCalledWith(
          expect.stringContaining('formspree.io'),
          expect.objectContaining({
            method: 'POST',
            headers: expect.objectContaining({ 'Content-Type': 'application/json' }),
            body: JSON.stringify(defaultFormData)
          })
      );
    } else {
      expect(global.fetch).toHaveBeenCalled();
    }
    await assertion();
  });


  it('should disable the submit button while submitting', async () => {
    vi.mocked(global.fetch).mockImplementationOnce(() => {
      return new Promise<Response>(resolve => {
        setTimeout(() => {
          resolve({ ok: true, json: async () => mockSuccessResponse } as Response);
        }, 100);
      });
    });

    const user = userEvent.setup();
    renderWithProviders(<Contact />);

    await user.type(screen.getByLabelText(t.name), defaultFormData.name);
    await user.type(screen.getByLabelText(t.email), defaultFormData.email);
    await user.type(screen.getByLabelText(t.subject), defaultFormData.subject);
    await user.type(screen.getByLabelText(t.message), defaultFormData.message);

    const submitButton = screen.getByRole('button', { name: t.send });

    await user.click(submitButton);

    await waitFor(() => {
      expect(submitButton).toBeDisabled();
      expect(submitButton).toHaveTextContent(t.sending);
    });

    await waitFor(() => {
      expect(screen.getByText(t.successMessage)).toBeInTheDocument();
    });

    expect(submitButton).not.toBeDisabled();
    expect(submitButton).toHaveTextContent(t.send);
  });
});
