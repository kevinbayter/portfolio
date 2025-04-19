import React, { PropsWithChildren } from 'react';
import { render } from '@testing-library/react';
import { LanguageProvider } from '@hooks/useLanguage';

export function renderWithProviders(
    ui: React.ReactElement,
    {
        ...renderOptions
    } = {}
) {
    function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
        return (
            <LanguageProvider>
                {children}
            </LanguageProvider>
        );
    }

    return {
        ...render(ui, {
            wrapper: Wrapper,
            ...renderOptions,
        }),
    };
} 