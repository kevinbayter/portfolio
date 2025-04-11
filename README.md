# Kevin Bayter's Portfolio

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![SASS](https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white)](https://sass-lang.com/)

## 📝 Description

This is the official portfolio website for Kevin Bayter, a Full Stack Developer and Physicist from Colombia. The site showcases my projects, skills, and contact information.

## ✨ Features

- Modern and responsive design with dark theme
- Attractive animations and visual effects including a firefly animation background
- Multilingual support (English and Spanish)
- Portfolio, projects, and services sections
- Icon-based social media contact links
- SEO optimized
- Performance optimized
- Dynamic language switching with context API

## 🚀 Technologies Used

- **React** - JavaScript library for building user interfaces
- **TypeScript** - Statically typed JavaScript superset
- **Vite** - Ultra-fast development environment
- **TailwindCSS** - Utility-first CSS framework
- **SASS** - CSS preprocessor
- **React Router** - Routing for React applications
- **React Icons** - Popular icon library for React
- **React Helmet** - Document head management
- **Context API** - For state management and internationalization
- **ESLint** - Static analysis tool for identifying problematic patterns
- **Prettier** - Code formatter

## 📋 Prerequisites

Make sure you have installed:

- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher) or yarn (v1.22.0 or higher)

## 🛠️ Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/kevinbayter/portfolio.git
   cd portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. The site will be available at `http://localhost:5173`

## 📦 Project Structure

```
portfolio/
├── public/               # Public static files
├── src/                  # Source code
│   ├── assets/           # Images, fonts, and other files
│   │   └── images/       # Image resources
│   ├── components/       # React components
│   │   ├── layout/       # Layout components (Header, Footer, Navbar)
│   │   └── sections/     # Page sections (Hero, About, Services, etc.)
│   ├── context/          # React context for state management
│   ├── hooks/            # Custom React hooks
│   ├── i18n/             # Internationalization files
│   ├── styles/           # SCSS style files
│   ├── types/            # TypeScript type definitions
│   ├── utils/            # Utility functions
│   ├── App.tsx           # Main application component
│   └── main.tsx          # Entry point
├── .eslintrc.json        # ESLint configuration
├── .gitignore            # Files and folders ignored by Git
├── index.html            # HTML template
├── package.json          # Dependencies and scripts
├── postcss.config.js     # PostCSS configuration
├── README.md             # Project documentation
├── tailwind.config.js    # TailwindCSS configuration
├── tsconfig.json         # TypeScript configuration
└── vite.config.ts        # Vite configuration
```

## 🔧 Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build
- `npm run lint` - Run the linter to find problems in the code
- `npm run format` - Format the code using Prettier
- `npm run typecheck` - Check TypeScript types without compiling
- `npm run test` - Run all unit tests
- `npm run test:watch` - Run tests in watch mode during development
- `npm run test:coverage` - Run tests and generate coverage report

## 🧪 Testing

The project includes comprehensive unit and integration tests for critical functionality:

- **Component Tests** - Testing UI components like Contact form, LanguageSelector
- **Hook Tests** - Testing custom hooks like useLanguage
- **Utility Tests** - Testing utility functions and i18n translations
- **Integration Tests** - Testing interactions between components, like language switching

Test Structure:

```
src/test/
├── setup.ts             # Test setup configuration
├── components/          # Component tests
├── hooks/               # Hook tests
├── utils/               # Utility function tests
└── integration/         # Integration tests
```

Coverage includes:
- Language system and internationalization
- Form validation and submission
- UI component rendering and interactions
- State management
- Error handling

The testing stack includes:
- **Vitest** - Modern, fast testing framework that works well with Vite
- **React Testing Library** - Testing React components
- **Jest DOM** - DOM testing assertions
- **MSW** - Mocking API requests for form submission tests

## 🌎 Internationalization

The portfolio supports both English and Spanish languages. The language system is implemented using React Context API and custom hooks:

- `LanguageContext` - Provides language state and translation functions
- `useLanguage` - Custom hook for accessing translations and language switching
- Translation files are stored in the i18n directory

## 🎨 UI/UX Features

- Dark theme with blue accent colors
- Responsive design that works on all device sizes
- Animated elements for enhanced user experience
- Card-based design for projects and services
- Category filtering for portfolio items
- Icon-based contact links for better visual experience
- Animated background elements

## 🌐 Deployment

To create an optimized version ready for production:

```bash
npm run build
# or
yarn build
```

The generated files will be in the `dist` directory and are ready to be deployed to any static server or hosting service.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 Author

- **Kevin Bayter** - [GitHub](https://github.com/kevinbayter) - [LinkedIn](https://www.linkedin.com/in/bcod3r/) 