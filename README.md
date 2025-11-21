# Marketplace App

A modern e-commerce marketplace application for RewardClan built with React, TypeScript, and Vite.

## Features

- **Product Browsing & Details**: View a list of products and detailed information for each item.
- **Shopping Cart Management**: Add items to cart, update quantities, and remove items.
- **Wishlist Functionality**: Save favorite items for later.
- **User Authentication**: Sign up and log in to access personalized features.
- **Checkout Process**: streamlined checkout flow.

## Tech Stack

- **Core**: [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Vite](https://vitejs.dev/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand), [React Query](https://tanstack.com/query/latest)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/), [Radix UI](https://www.radix-ui.com/), [Lucide React](https://lucide.dev/)
- **Forms**: [React Hook Form](https://react-hook-form.com/), [Zod](https://zod.dev/)
- **Routing**: [React Router DOM](https://reactrouter.com/)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/RewardClan/marketplace.git
   ```
2. Navigate to the project directory:
   ```bash
   cd marketplace
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Running the App

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

## Project Structure

- `src/features`: Contains feature-specific code (components, hooks, services).
- `src/components`: Shared UI components.
- `src/store`: Global state management stores.
- `src/context`: React Context providers.
- `src/lib`: Utility functions and configurations.

## Scripts

- `npm run dev`: Start the development server.
- `npm run build`: Build the application for production.
- `npm run lint`: Run ESLint to check for code quality issues.
- `npm run preview`: Preview the production build locally.
