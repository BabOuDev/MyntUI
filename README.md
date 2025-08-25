# MyntUI - Web Component Library

A library-agnostic web component library built with native Web APIs following the KISS principle.

## Features

- Framework-agnostic (works with any framework or vanilla JavaScript)
- Built with native Web Components (Custom Elements, Shadow DOM)
- No external dependencies (except D3.js for charts)
- Two-level CSS variable system for consistent theming
- Comprehensive input validation and form handling

## Getting Started

### Development Server

```bash
npm run dev
```

This starts a local development server on http://localhost:8080

### Project Structure

```
src/
├── components/          # Individual web components
├── styles/             # Global CSS variables and design system
└── index.js           # Main entry point
examples/               # Test pages and usage examples
```

## Components

- `my-icon` - Material Icons
- `my-input` - Universal input field with schema validation
- `my-button` - Customizable buttons with variants
- `my-toggle`, `my-checkbox`, `my-radio` - Boolean inputs
- `my-tooltip` - Contextual tooltips
- `my-dropdown` - Dropdown menus
- `my-modal`, `my-drawer`, `my-notification` - Overlay components
- `my-data-list`, `my-data-table`, `my-data-chart` - Data display components
- `my-gauge`, `my-progress`, `my-sparkline` - Data visualization

## Usage

Import components individually:

```html
<script type="module" src="./src/components/my-button/my-button.js"></script>
<my-button label="Click me" variant="primary"></my-button>
```

Or import all components:

```html
<script type="module" src="./src/index.js"></script>
```

## Development Guidelines

See [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed development guidelines and specifications.