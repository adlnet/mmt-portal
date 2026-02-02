# MMT Portal

A modern web portal for managing Modernized Military Transcript (MMT) operations. Built with Next.js, React, and Tailwind CSS, this application provides a comprehensive solution for transcript management, academic institution administration, and user tracking. This is purely they front end Application and relies on the MMT Backend to function. 

## Table of Contents

- [Prerequisites](#prerequisites)
- [Features](#features)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Testing](#testing)
- [Docker](#docker)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [Learn More](#learn-more)

## Prerequisites

Before you begin, ensure you have the following installed:

- **[Node.js](https://nodejs.org/)** (version 14.x or higher)
- **[Yarn](https://yarnpkg.com/)** package manager
- **[Docker](https://www.docker.com/)** (optional, for containerized deployment)

Running the MMT Backend with this application is mandatory for the features and functionalities to work. 
To see how to run the backend application, follow the link below:

- **[MMT Backend](https://github.com/adlnet/mmt-backend)** github link 

## Features

**Note:** MMT Backend must be running for these features to work.

- **Transcript Management**: Create, track, and manage military transcripts
- **Academic Institute Administration**: Manage academic institutions and their associated data
- **User Management**: Admin dashboard for user administration and access control
- **Search & Filtering**: Advanced search capabilities across transcripts and institutions
- **Announcements System**: Centralized announcements and updates management
- **Responsive Design**: Mobile-first design approach using Tailwind CSS
- **Real-time Updates**: Live data updates using React Query
- **Accessibility**: WCAG compliant interface components 

## Getting Started

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd mmt-portal
```

2. Install dependencies:
```bash
yarn install
```

This command will:
- Install all dependencies listed in `package.json`
- Create a `node_modules` directory with all required packages
- Generate a `yarn.lock` file for consistent dependency versions

3. Configure environment variables (see [Environment Variables](#environment-variables))

### Development

Start the development server:

```bash
yarn dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

Features in development mode:
- Hot module reloading (HMR)
- Detailed error messages
- Automatic code linting
- Fast refresh for React components

### Production Build

1. Create an optimized production build:
```bash
yarn build
```

2. Start the production server:
```bash
yarn start
```

The production build includes:
- Optimized and minified bundles
- Static HTML generation for improved performance
- Automatic code splitting
- Image optimization

## Available Scripts

### `yarn dev`
Runs the Next.js app in development mode with hot-reloading enabled.

### `yarn build`
Builds the app for production to the `.next` folder with optimized bundles.

### `yarn start`
Starts the production server using the custom `server.js` configuration.

### `yarn lint`
Runs Next.js linting to check for code quality issues.

### `yarn test`
Launches Jest test runner with coverage reporting (single worker mode).

### `yarn coverage`
Runs tests in watch mode with detailed coverage reporting.

### `yarn test:e2e-ci`
Runs Cypress end-to-end tests in CI mode using Chrome browser.

## Project Structure

```
mmt-portal/
├── src/
│   ├── __mocks__/          # Mock data and configurations for testing
│   ├── __tests__/          # Test files organized by feature
│   ├── components/         # Reusable React components
│   │   ├── layouts/        # Layout components
│   │   └── modals/         # Modal components
│   ├── config/             # Application configuration
│   ├── contexts/           # React Context providers
│   ├── hooks/              # Custom React hooks
│   ├── pages/              # Next.js pages and routes
│   │   ├── academicInstitute/
│   │   └── modernMilitaryTranscript/
│   ├── public/             # Public assets and icons
│   ├── styles/             # Global styles and CSS
│   └── utils/              # Utility functions and helpers
├── cypress/                # E2E tests and configurations
├── public/                 # Static files served at root
├── Dockerfile              # Docker configuration
├── next.config.js          # Next.js configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── jest.config.js          # Jest testing configuration
└── package.json            # Project dependencies and scripts
```

### Key Directories

- **`src/pages/`**: Next.js file-based routing. Each file becomes a route
- **`src/components/`**: Reusable UI components (Buttons, Tables, Forms, etc.)
- **`src/hooks/`**: Custom React hooks for data fetching and state management
- **`src/contexts/`**: React Context for global state (e.g., AuthContext)
- **`src/utils/`**: Helper functions for common operations
- **`cypress/e2e/`**: End-to-end test specifications

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) 14.x
- **UI Library**: [React](https://reactjs.org/) 18.x
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: 
  - [Material-UI](https://mui.com/)
  - [Headless UI](https://headlessui.com/)
  - [Flowbite React](https://flowbite-react.com/)
  - [Heroicons](https://heroicons.com/)
- **State Management**: [React Query](https://react-query.tanstack.com/)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Testing**: 
  - [Jest](https://jestjs.io/) for unit/integration testing
  - [Cypress](https://www.cypress.io/) for end-to-end testing
  - [React Testing Library](https://testing-library.com/react)
- **Excel Export**: [SheetJS (xlsx)](https://sheetjs.com/)

## Testing

### Unit & Integration Tests

Run all unit tests with coverage:
```bash
yarn test:unit
```

Run tests in watch mode:
```bash
yarn coverage
```

### End-to-End Tests

Run Cypress E2E tests:
```bash
yarn test:e2e-ci
```

For interactive testing with Cypress UI:
```bash
npx cypress open
```

### Test Coverage

The project maintains test coverage for:
- React components (UI rendering and interactions)
- Custom hooks (data fetching and state management)
- Utility functions
- Page-level integration tests

## Docker

Build and run the application using Docker:

```bash
# Build the Docker image
docker build -t mmt-portal .

# Run the container
docker run -p 3000:3000 mmt-portal
```

## Environment Variables

Create a `.env.local` file in the root directory to configure environment-specific variables:

```env
# API Configuration
NEXT_PUBLIC_API_BASE_URL=your_api_base_url
```

NEXT_PUBLIC_API_BASE_URL is a link to where the MMT Backend application is being hosted. It is required and used to connected to the backend where data is stored. 

## Learn More

### Next.js Documentation
- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API
- [Learn Next.js](https://nextjs.org/learn) - Interactive Next.js tutorial
- [Next.js GitHub](https://github.com/vercel/next.js/) - Source code and examples

### React Resources
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [React Hooks](https://reactjs.org/docs/hooks-intro.html)
- [React Query Documentation](https://react-query.tanstack.com/)

### Tailwind CSS
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Tailwind UI Components](https://tailwindui.com/)

### Testing
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Cypress Documentation](https://docs.cypress.io/)
