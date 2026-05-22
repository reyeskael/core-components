# core-components

A modern React component library built with **Storybook**, **Material-UI**, and **TypeScript**. This library provides reusable, well-tested UI components for building consistent applications.

## Available Scripts

### Development

- `yarn storybook` - Start the Storybook development server on port 6006
- `yarn start` - Start the React development server

### Build & Deployment

- `yarn build` - Build the production-optimized bundle
- `yarn build-storybook` - Build static Storybook for deployment

### Testing

- `yarn test` - Run Jest test suite with coverage report

## Viewing Built Storybook

After running `yarn build-storybook`, you can view the static build locally by serving it with an HTTP server:

```bash
cd storybook-static
npx http-server
```

Then open `http://localhost:8080` in your browser.

**Note:** Do not open the `index.html` file directly in your browser (using `file://` protocol) as this will cause CORS errors. Always serve the files over HTTP.

## Requirements

- Node.js 24.16.0 or higher
- Yarn (for package management)

## Getting Started

1. Install dependencies:
   ```
   yarn install
   ```

2. Start Storybook to view all components:
   ```
   yarn storybook
   ```

3. View component stories at `http://localhost:6006`

## Development Workflow

1. Components are located in `src/components/`
2. Each component includes:
   - `.tsx` - Component implementation
   - `.stories.ts` - Storybook stories for documentation
   - `.test.tsx` - Unit tests
   - `index.ts` - Export interface

3. Build components with TypeScript strict mode enabled
4. Ensure tests pass before submitting changes
