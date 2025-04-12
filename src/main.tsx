import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {HelmetProvider} from 'react-helmet-async';
import {LanguageProvider} from './hooks/useLanguage';
import './styles/index.scss';

const rootElement = document.getElementById('root');
if (!rootElement) {
    throw new Error('Failed to find the root element');
}
ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
        <HelmetProvider>
            <LanguageProvider>
                <App/>
            </LanguageProvider>
        </HelmetProvider>
    </React.StrictMode>,
); 