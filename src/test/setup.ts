import '@testing-library/jest-dom';
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

// Extiende las aserciones de Vitest con las de jest-dom
expect.extend(matchers);

// Limpia automáticamente después de cada test
afterEach(() => {
  cleanup();
}); 