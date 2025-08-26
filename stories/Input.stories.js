import '../src/components/my-input/my-input.js';
import '../src/components/my-icon/my-icon.js';
import { globalConfig } from '../src/config/global-config.js';

export default {
  title: 'Components/my-input',
  parameters: {
    docs: {
      description: {
        component: 'A comprehensive Material Design 3 input component with enhanced state layers, floating labels, validation, accessibility, and conditional icon visibility. Supports all required input types from CONTRIBUTING.md with full light/dark theme compatibility and grid system integration.',
      },
    },
  },
  argTypes: {
    type: {
      control: { type: 'select' },
      options: [
        'text', 'pattern', 'number', 'integer', 'date', 'datetime-local', 
        'time', 'date-of-birth', 'select', 'dynamic-select', 'textarea', 
        'checkbox', 'radio', 'email', 'password', 'url', 'tel', 'search'
      ],
      description: 'Input type',
    },
    label: {
      control: 'text',
      description: 'Input label',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    value: {
      control: 'text',
      description: 'Input value',
    },
    variant: {
      control: { type: 'select' },
      options: ['outlined', 'filled'],
      description: 'Input variant style',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Input size',
    },
    labelPosition: {
      control: { type: 'select' },
      options: ['top', 'left', 'over'],
      description: 'Label position',
    },
    required: {
      control: 'boolean',
      description: 'Mark as required field',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the input',
    },
    readonly: {
      control: 'boolean',
      description: 'Make input read-only',
    },
    helperText: {
      control: 'text',
      description: 'Helper text below input',
    },
    leadingIcon: {
      control: 'text',
      description: 'Leading icon name',
    },
    trailingIcon: {
      control: 'text',
      description: 'Trailing icon name',
    },
    characterCount: {
      control: 'boolean',
      description: 'Show character count',
    },
  },
};

const Template = (args) => {
  const input = document.createElement('my-input');
  
  // Set properties
  if (args.type && args.type !== 'text') input.setAttribute('type', args.type);
  if (args.label) input.setAttribute('label', args.label);
  if (args.placeholder) input.setAttribute('placeholder', args.placeholder);
  if (args.value) input.setAttribute('value', args.value);
  if (args.variant && args.variant !== 'outlined') input.setAttribute('variant', args.variant);
  if (args.size && args.size !== 'medium') input.setAttribute('size', args.size);
  if (args.labelPosition && args.labelPosition !== 'top') input.setAttribute('label-position', args.labelPosition);
  if (args.helperText) input.setAttribute('helper-text', args.helperText);
  if (args.leadingIcon) input.setAttribute('leading-icon', args.leadingIcon);
  if (args.trailingIcon) input.setAttribute('trailing-icon', args.trailingIcon);
  if (args.required) input.setAttribute('required', '');
  if (args.disabled) input.setAttribute('disabled', '');
  if (args.readonly) input.setAttribute('readonly', '');
  if (args.characterCount) input.setAttribute('character-count', '');

  // Add event listeners for demonstration
  input.addEventListener('input', (e) => {
    console.log('Input event:', e.detail);
  });
  
  input.addEventListener('change', (e) => {
    console.log('Change event:', e.detail);
  });

  return input;
};

// Default story
export const Default = Template.bind({});
Default.args = {
  label: 'Email',
  type: 'email',
  placeholder: 'Enter your email',
  variant: 'outlined',
  size: 'medium',
  labelPosition: 'top',
  required: false,
  disabled: false,
  readonly: false,
  characterCount: false,
};

// Comprehensive Input types showcase
export const Types = () => {
  const container = document.createElement('div');
  container.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 24px; max-width: 1200px;';
  
  const types = [
    { type: 'text', label: 'Full Name', placeholder: 'Enter your full name' },
    { type: 'pattern', label: 'Pattern Input', placeholder: 'ABC123', pattern: '[A-Z]{3}[0-9]{3}', helperText: 'Format: ABC123' },
    { type: 'number', label: 'Age', placeholder: '25', min: '0', max: '120' },
    { type: 'integer', label: 'Quantity', placeholder: '10', min: '1', helperText: 'Whole numbers only' },
    { type: 'date', label: 'Birth Date', helperText: 'Select your birth date' },
    { type: 'datetime-local', label: 'Appointment', helperText: 'Select date and time' },
    { type: 'time', label: 'Preferred Time', helperText: 'Select time' },
    { type: 'date-of-birth', label: 'Date of Birth', helperText: 'Special date picker for DOB' },
    { type: 'email', label: 'Email Address', placeholder: 'user@example.com' },
    { type: 'password', label: 'Password', placeholder: 'Enter password' },
    { type: 'url', label: 'Website', placeholder: 'https://example.com' },
    { type: 'tel', label: 'Phone Number', placeholder: '+1 (555) 123-4567' },
    { type: 'search', label: 'Search', placeholder: 'Search...' },
    { type: 'textarea', label: 'Description', placeholder: 'Enter detailed description...' },
    { 
      type: 'select', 
      label: 'Country', 
      helperText: 'Select your country',
      options: [
        { label: 'United States', value: 'US' },
        { label: 'Canada', value: 'CA' },
        { label: 'United Kingdom', value: 'UK' },
        { label: 'Australia', value: 'AU' },
      ]
    },
    { type: 'dynamic-select', label: 'City', placeholder: 'Start typing city name...', helperText: 'Dynamic searchable select' },
    { type: 'checkbox', label: 'I agree to terms', value: 'false' },
    { type: 'radio', label: 'Newsletter subscription', value: 'false' },
  ];
  
  types.forEach(({ type, label, placeholder, pattern, min, max, helperText, options, value }) => {
    const input = document.createElement('my-input');
    input.setAttribute('type', type);
    input.setAttribute('label', label);
    if (placeholder) input.setAttribute('placeholder', placeholder);
    if (pattern) input.setAttribute('pattern', pattern);
    if (min) input.setAttribute('min', min);
    if (max) input.setAttribute('max', max);
    if (helperText) input.setAttribute('helper-text', helperText);
    if (value) input.setAttribute('value', value);
    if (options) {
      // For select type, we need to pass options as schema
      const schema = { type, label, options, placeholder, helperText };
      input.setAttribute('schema', JSON.stringify(schema));
    }
    container.appendChild(input);
  });
  
  return container;
};
Types.parameters = {
  docs: {
    description: {
      story: 'Comprehensive showcase of all supported input types including text, pattern, number, integer, date/time variants, select, dynamic-select, textarea, checkbox, and radio inputs. This covers all input types specified in the CONTRIBUTING.md requirements.',
    },
  },
};

// Variants showcase
export const Variants = () => {
  const container = document.createElement('div');
  container.style.cssText = 'display: flex; flex-direction: column; gap: 32px; max-width: 400px;';
  
  const variants = ['outlined', 'filled'];
  
  variants.forEach(variant => {
    const section = document.createElement('div');
    section.style.cssText = 'display: flex; flex-direction: column; gap: 16px;';
    
    const title = document.createElement('h3');
    title.textContent = `${variant.charAt(0).toUpperCase()}${variant.slice(1)} Variant`;
    title.style.cssText = 'margin: 0; font-size: 16px; font-weight: var(--_global-font-weight-medium);';
    
    const inputsContainer = document.createElement('div');
    inputsContainer.style.cssText = 'display: flex; flex-direction: column; gap: 16px;';
    
    // Normal
    const normal = document.createElement('my-input');
    normal.setAttribute('variant', variant);
    normal.setAttribute('label', 'Normal');
    normal.setAttribute('placeholder', 'Enter text');
    
    // With value
    const withValue = document.createElement('my-input');
    withValue.setAttribute('variant', variant);
    withValue.setAttribute('label', 'With Value');
    withValue.setAttribute('value', 'Sample value');
    
    // Disabled
    const disabled = document.createElement('my-input');
    disabled.setAttribute('variant', variant);
    disabled.setAttribute('label', 'Disabled');
    disabled.setAttribute('placeholder', 'Disabled input');
    disabled.setAttribute('disabled', '');
    
    inputsContainer.appendChild(normal);
    inputsContainer.appendChild(withValue);
    inputsContainer.appendChild(disabled);
    
    section.appendChild(title);
    section.appendChild(inputsContainer);
    container.appendChild(section);
  });
  
  return container;
};
Variants.parameters = {
  docs: {
    description: {
      story: 'Outlined and filled variants with different states.',
    },
  },
};

// Sizes showcase
export const Sizes = () => {
  const container = document.createElement('div');
  container.style.cssText = 'display: flex; flex-direction: column; gap: 24px; max-width: 400px;';
  
  const sizes = ['small', 'medium', 'large'];
  
  sizes.forEach(size => {
    const input = document.createElement('my-input');
    input.setAttribute('size', size);
    input.setAttribute('label', `Size ${size}`);
    input.setAttribute('placeholder', `${size} input`);
    container.appendChild(input);
  });
  
  return container;
};
Sizes.parameters = {
  docs: {
    description: {
      story: 'Different input sizes: small, medium, and large.',
    },
  },
};

// Label positions
export const LabelPositions = () => {
  const container = document.createElement('div');
  container.style.cssText = 'display: flex; flex-direction: column; gap: 32px; max-width: 500px;';
  
  const positions = [
    { position: 'top', label: 'Top Label' },
    { position: 'left', label: 'Left Label' },
    { position: 'over', label: 'Over Label (Floating)' }
  ];
  
  positions.forEach(({ position, label }) => {
    const input = document.createElement('my-input');
    input.setAttribute('label-position', position);
    input.setAttribute('label', label);
    input.setAttribute('placeholder', `Label position: ${position}`);
    container.appendChild(input);
  });
  
  return container;
};
LabelPositions.parameters = {
  docs: {
    description: {
      story: 'Different label positioning options.',
    },
  },
};

// With icons
export const WithIcons = () => {
  const container = document.createElement('div');
  container.style.cssText = 'display: flex; flex-direction: column; gap: 24px; max-width: 400px;';
  
  const iconInputs = [
    { label: 'Search', type: 'search', leadingIcon: 'search', placeholder: 'Search...' },
    { label: 'Email', type: 'email', leadingIcon: 'mail', placeholder: 'user@example.com' },
    { label: 'Password', type: 'password', trailingIcon: 'visibility', placeholder: 'Enter password' },
    { label: 'Phone', type: 'tel', leadingIcon: 'phone', trailingIcon: 'contact_phone', placeholder: '+1 (555) 123-4567' },
  ];
  
  iconInputs.forEach(({ label, type, leadingIcon, trailingIcon, placeholder }) => {
    const input = document.createElement('my-input');
    input.setAttribute('type', type);
    input.setAttribute('label', label);
    input.setAttribute('placeholder', placeholder);
    if (leadingIcon) input.setAttribute('leading-icon', leadingIcon);
    if (trailingIcon) input.setAttribute('trailing-icon', trailingIcon);
    container.appendChild(input);
  });
  
  return container;
};
WithIcons.parameters = {
  docs: {
    description: {
      story: 'Inputs with leading and trailing icons to enhance UX.',
    },
  },
};

// Validation states
export const ValidationStates = () => {
  const container = document.createElement('div');
  container.style.cssText = 'display: flex; flex-direction: column; gap: 24px; max-width: 400px;';
  
  // Required field
  const required = document.createElement('my-input');
  required.setAttribute('label', 'Required Field');
  required.setAttribute('placeholder', 'This field is required');
  required.setAttribute('required', '');
  required.setAttribute('helper-text', 'This field is required');
  
  // With validation
  const email = document.createElement('my-input');
  email.setAttribute('type', 'email');
  email.setAttribute('label', 'Email Validation');
  email.setAttribute('placeholder', 'Enter valid email');
  email.setAttribute('value', 'invalid-email');
  email.setAttribute('helper-text', 'Please enter a valid email address');
  
  // Character count
  const withCount = document.createElement('my-input');
  withCount.setAttribute('label', 'Description');
  withCount.setAttribute('placeholder', 'Enter description...');
  withCount.setAttribute('maxlength', '100');
  withCount.setAttribute('character-count', '');
  withCount.setAttribute('helper-text', 'Maximum 100 characters');
  
  container.appendChild(required);
  container.appendChild(email);
  container.appendChild(withCount);
  
  return container;
};
ValidationStates.parameters = {
  docs: {
    description: {
      story: 'Input validation states including required fields, validation messages, and character counting.',
    },
  },
};

// States showcase
export const States = () => {
  const container = document.createElement('div');
  container.style.cssText = 'display: flex; flex-direction: column; gap: 24px; max-width: 400px;';
  
  const states = [
    { name: 'Normal', props: { label: 'Normal State', placeholder: 'Enter text' } },
    { name: 'Focused', props: { label: 'Focused State', placeholder: 'Click to focus', value: 'Sample text' } },
    { name: 'Disabled', props: { label: 'Disabled State', placeholder: 'Cannot edit', disabled: true } },
    { name: 'Read Only', props: { label: 'Read Only', value: 'Read only value', readonly: true } },
    { name: 'Error', props: { label: 'Error State', placeholder: 'Invalid input', 'helper-text': 'This field has an error' } },
  ];
  
  states.forEach(({ name, props }) => {
    const input = document.createElement('my-input');
    Object.entries(props).forEach(([key, value]) => {
      if (typeof value === 'boolean' && value) {
        input.setAttribute(key, '');
      } else if (typeof value === 'string') {
        input.setAttribute(key, value);
      }
    });
    container.appendChild(input);
  });
  
  return container;
};
States.parameters = {
  docs: {
    description: {
      story: 'Different input states including normal, focused, disabled, read-only, and error states.',
    },
  },
};

// Textarea
export const Textarea = () => {
  const container = document.createElement('div');
  container.style.cssText = 'display: flex; flex-direction: column; gap: 24px; max-width: 400px;';
  
  const textarea = document.createElement('my-input');
  textarea.setAttribute('type', 'textarea');
  textarea.setAttribute('label', 'Description');
  textarea.setAttribute('placeholder', 'Enter a detailed description...');
  textarea.setAttribute('helper-text', 'Provide as much detail as possible');
  textarea.setAttribute('character-count', '');
  textarea.setAttribute('maxlength', '500');
  
  container.appendChild(textarea);
  
  return container;
};
Textarea.parameters = {
  docs: {
    description: {
      story: 'Textarea input for multi-line text input.',
    },
  },
};

// Comprehensive showcase with automatic icon assignment and conditional visibility
export const ConditionalIconShowcase = () => {
  const container = document.createElement('div');
  container.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 24px; max-width: 1200px;';
  
  // Header
  const header = document.createElement('div');
  header.style.cssText = 'grid-column: 1 / -1; margin-bottom: 16px;';
  header.innerHTML = `
    <h3 style="margin: 0 0 8px 0; font-size: 18px; color: var(--_global-color-primary);">
      Conditional Icon Visibility & Auto-Assignment
    </h3>
    <p style="margin: 0; font-size: 14px; color: var(--_global-color-on-surface-variant);">
      Icons are automatically assigned based on input type and only shown when relevant. This follows the Material Design guidelines and global config settings.
    </p>
  `;
  container.appendChild(header);
  
  const inputTypesWithIcons = [
    { type: 'email', label: 'Email Address', placeholder: 'user@example.com', expectedIcon: 'mail' },
    { type: 'password', label: 'Password', placeholder: 'Enter password', expectedIcon: 'lock' },
    { type: 'search', label: 'Search', placeholder: 'Search...', expectedIcon: 'search' },
    { type: 'date', label: 'Date', expectedIcon: 'event' },
    { type: 'datetime-local', label: 'Date & Time', expectedIcon: 'schedule' },
    { type: 'time', label: 'Time', expectedIcon: 'access_time' },
    { type: 'date-of-birth', label: 'Date of Birth', expectedIcon: 'cake' },
    { type: 'tel', label: 'Phone Number', placeholder: '+1 (555) 123-4567', expectedIcon: 'phone' },
    { type: 'url', label: 'Website', placeholder: 'https://example.com', expectedIcon: 'link' },
    { type: 'number', label: 'Amount', placeholder: '100', expectedIcon: 'tag' },
    { type: 'text', label: 'Plain Text', placeholder: 'No automatic icon', expectedIcon: null },
    { type: 'textarea', label: 'Description', placeholder: 'No automatic icon', expectedIcon: null },
  ];
  
  inputTypesWithIcons.forEach(({ type, label, placeholder, expectedIcon }) => {
    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'display: flex; flex-direction: column; gap: 8px;';
    
    const input = document.createElement('my-input');
    input.setAttribute('type', type);
    input.setAttribute('label', label);
    if (placeholder) input.setAttribute('placeholder', placeholder);
    
    // Add helper text explaining the expected behavior
    const helperText = expectedIcon 
      ? `Auto-assigned icon: ${expectedIcon}` 
      : 'No automatic icon assigned';
    input.setAttribute('helper-text', helperText);
    
    wrapper.appendChild(input);
    container.appendChild(wrapper);
  });
  
  return container;
};
ConditionalIconShowcase.parameters = {
  docs: {
    description: {
      story: 'Demonstrates automatic icon assignment based on input type with conditional visibility. Icons are only shown when they provide meaningful context to the user, following Material Design principles and the global configuration settings.',
    },
  },
};

// Grid system integration showcase
export const GridSystemShowcase = () => {
  const container = document.createElement('div');
  container.style.cssText = 'max-width: 1200px; display: flex; flex-direction: column; gap: 32px;';
  
  // Header
  const header = document.createElement('div');
  header.innerHTML = `
    <h3 style="margin: 0 0 16px 0; font-size: 18px; color: var(--_global-color-primary);">
      Grid System Integration
    </h3>
    <p style="margin: 0 0 24px 0; font-size: 14px; color: var(--_global-color-on-surface-variant);">
      MyntUI inputs work seamlessly with the built-in grid system utilities for responsive layouts.
    </p>
  `;
  container.appendChild(header);
  
  // Simple 2-column grid
  const grid2Col = document.createElement('div');
  grid2Col.className = 'u-display-grid u-grid-cols-2 u-gap-md';
  grid2Col.style.cssText = 'margin-bottom: 32px;';
  
  const grid2Title = document.createElement('h4');
  grid2Title.textContent = '2-Column Grid Layout';
  grid2Title.style.cssText = 'grid-column: 1 / -1; margin: 0 0 16px 0; font-size: 16px;';
  grid2Col.appendChild(grid2Title);
  
  ['First Name', 'Last Name'].forEach((label, index) => {
    const input = document.createElement('my-input');
    input.setAttribute('label', label);
    input.setAttribute('placeholder', `Enter your ${label.toLowerCase()}`);
    input.setAttribute('required', '');
    grid2Col.appendChild(input);
  });
  
  container.appendChild(grid2Col);
  
  // Responsive 3-column grid
  const grid3Col = document.createElement('div');
  grid3Col.className = 'u-display-grid u-grid-cols-1 u-md-grid-cols-3 u-gap-md';
  grid3Col.style.cssText = 'margin-bottom: 32px;';
  
  const grid3Title = document.createElement('h4');
  grid3Title.textContent = 'Responsive 3-Column Grid (1 col on mobile, 3 cols on tablet+)';
  grid3Title.style.cssText = 'grid-column: 1 / -1; margin: 0 0 16px 0; font-size: 16px;';
  grid3Col.appendChild(grid3Title);
  
  [
    { type: 'email', label: 'Email', placeholder: 'user@example.com' },
    { type: 'tel', label: 'Phone', placeholder: '+1 (555) 123-4567' },
    { type: 'date', label: 'Birth Date' }
  ].forEach(({ type, label, placeholder }) => {
    const input = document.createElement('my-input');
    input.setAttribute('type', type);
    input.setAttribute('label', label);
    if (placeholder) input.setAttribute('placeholder', placeholder);
    grid3Col.appendChild(input);
  });
  
  container.appendChild(grid3Col);
  
  // Mixed span grid
  const gridMixed = document.createElement('div');
  gridMixed.className = 'u-display-grid u-grid-cols-4 u-gap-md';
  gridMixed.style.cssText = 'margin-bottom: 32px;';
  
  const gridMixedTitle = document.createElement('h4');
  gridMixedTitle.textContent = 'Mixed Column Spans';
  gridMixedTitle.style.cssText = 'grid-column: 1 / -1; margin: 0 0 16px 0; font-size: 16px;';
  gridMixed.appendChild(gridMixedTitle);
  
  // Full width input
  const fullInput = document.createElement('my-input');
  fullInput.className = 'u-col-span-full';
  fullInput.setAttribute('type', 'textarea');
  fullInput.setAttribute('label', 'Full Width Description');
  fullInput.setAttribute('placeholder', 'This textarea spans all 4 columns...');
  gridMixed.appendChild(fullInput);
  
  // Two half-width inputs
  const halfInput1 = document.createElement('my-input');
  halfInput1.className = 'u-col-span-2';
  halfInput1.setAttribute('label', 'Half Width 1');
  halfInput1.setAttribute('placeholder', 'Spans 2 columns');
  gridMixed.appendChild(halfInput1);
  
  const halfInput2 = document.createElement('my-input');
  halfInput2.className = 'u-col-span-2';
  halfInput2.setAttribute('label', 'Half Width 2');
  halfInput2.setAttribute('placeholder', 'Spans 2 columns');
  gridMixed.appendChild(halfInput2);
  
  container.appendChild(gridMixed);
  
  return container;
};
GridSystemShowcase.parameters = {
  docs: {
    description: {
      story: 'Demonstrates how MyntUI inputs integrate with the grid system utilities for responsive layouts. Uses utility classes like u-grid-cols-2, u-md-grid-cols-3, u-col-span-full, etc.',
    },
  },
};

// Theme compatibility showcase
export const ThemeCompatibilityShowcase = () => {
  const container = document.createElement('div');
  container.style.cssText = 'max-width: 800px;';
  
  // Theme controls
  const controls = document.createElement('div');
  controls.style.cssText = 'margin-bottom: 32px; padding: 16px; background: var(--_global-color-surface-container); border-radius: var(--_global-border-radius-md);';
  controls.innerHTML = `
    <h4 style="margin: 0 0 16px 0; font-size: 16px;">Theme Controls</h4>
    <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;">
      <button id="light-theme" style="padding: 8px 16px; border: 1px solid var(--_global-color-outline); border-radius: var(--_global-border-radius-sm); background: var(--_global-color-surface); color: var(--_global-color-on-surface); cursor: pointer;">
        Light Theme
      </button>
      <button id="dark-theme" style="padding: 8px 16px; border: 1px solid var(--_global-color-outline); border-radius: var(--_global-border-radius-sm); background: var(--_global-color-surface); color: var(--_global-color-on-surface); cursor: pointer;">
        Dark Theme
      </button>
      <button id="auto-theme" style="padding: 8px 16px; border: 1px solid var(--_global-color-outline); border-radius: var(--_global-border-radius-sm); background: var(--_global-color-surface); color: var(--_global-color-on-surface); cursor: pointer;">
        Auto (System)
      </button>
    </div>
  `;
  container.appendChild(controls);
  
  // Theme demonstration grid
  const themeDemo = document.createElement('div');
  themeDemo.className = 'u-display-grid u-grid-cols-2 u-gap-md';
  themeDemo.style.cssText = 'padding: 24px; background: var(--_global-color-surface); border: 1px solid var(--_global-color-outline-variant); border-radius: var(--_global-border-radius-md);';
  
  [
    { type: 'email', label: 'Email Address', variant: 'outlined' },
    { type: 'password', label: 'Password', variant: 'filled' },
    { type: 'search', label: 'Search', variant: 'outlined' },
    { type: 'date', label: 'Date', variant: 'filled' }
  ].forEach(({ type, label, variant }) => {
    const input = document.createElement('my-input');
    input.setAttribute('type', type);
    input.setAttribute('label', label);
    input.setAttribute('variant', variant);
    input.setAttribute('helper-text', `${variant} variant in current theme`);
    themeDemo.appendChild(input);
  });
  
  container.appendChild(themeDemo);
  
  // Add theme switching functionality
  setTimeout(() => {
    const lightBtn = container.querySelector('#light-theme');
    const darkBtn = container.querySelector('#dark-theme');
    const autoBtn = container.querySelector('#auto-theme');
    
    lightBtn?.addEventListener('click', () => {
      document.documentElement.setAttribute('data-color-scheme', 'light');
      globalConfig.set('theme.colorScheme', 'light');
    });
    
    darkBtn?.addEventListener('click', () => {
      document.documentElement.setAttribute('data-color-scheme', 'dark');
      globalConfig.set('theme.colorScheme', 'dark');
    });
    
    autoBtn?.addEventListener('click', () => {
      document.documentElement.removeAttribute('data-color-scheme');
      globalConfig.set('theme.colorScheme', 'auto');
    });
  }, 100);
  
  return container;
};
ThemeCompatibilityShowcase.parameters = {
  docs: {
    description: {
      story: 'Demonstrates light/dark theme compatibility. Use the theme controls to switch between light, dark, and auto (system preference) themes. All input variants and states work correctly across themes.',
    },
  },
};

// Enhanced showcase demonstrating all new features
export const EnhancedFeatureShowcase = () => {
  const container = document.createElement('div');
  container.style.cssText = 'max-width: 1200px;';
  
  // Header with description
  const header = document.createElement('div');
  header.innerHTML = `
    <h3 style="margin: 0 0 16px 0; font-size: 20px; color: var(--_global-color-primary);">
      Enhanced Input Component Features
    </h3>
    <p style="margin: 0 0 32px 0; font-size: 14px; color: var(--_global-color-on-surface-variant); line-height: 1.5;">
      This showcase demonstrates all the enhanced features: automatic icon assignment from global config, 
      conditional icon visibility, theme switching support, and comprehensive input type coverage.
    </p>
  `;
  container.appendChild(header);
  
  // Feature grid
  const featuresGrid = document.createElement('div');
  featuresGrid.className = 'u-display-grid u-grid-cols-2 u-gap-lg';
  
  const features = [
    { 
      title: 'Automatic Icons', 
      description: 'Icons automatically assigned based on input type',
      inputs: [
        { type: 'email', label: 'Email (auto mail icon)' },
        { type: 'password', label: 'Password (auto lock icon)' },
        { type: 'search', label: 'Search (auto search icon)' },
        { type: 'date', label: 'Date (auto event icon)' }
      ]
    },
    { 
      title: 'Theme Compatibility', 
      description: 'All inputs work perfectly in light and dark themes',
      inputs: [
        { type: 'text', label: 'Text Input', variant: 'outlined' },
        { type: 'email', label: 'Email Input', variant: 'filled' },
        { type: 'number', label: 'Number Input', variant: 'outlined' },
        { type: 'textarea', label: 'Textarea', variant: 'filled' }
      ]
    },
    { 
      title: 'All Input Types', 
      description: 'Complete support for all required input types',
      inputs: [
        { type: 'tel', label: 'Phone Number' },
        { type: 'url', label: 'Website URL' },
        { type: 'datetime-local', label: 'Date & Time' },
        { type: 'time', label: 'Time Only' }
      ]
    },
    { 
      title: 'Grid Integration', 
      description: 'Seamless integration with utility grid system',
      inputs: [
        { type: 'text', label: 'First Name', placeholder: 'John' },
        { type: 'text', label: 'Last Name', placeholder: 'Doe' },
        { type: 'email', label: 'Email', placeholder: 'john@example.com' },
        { type: 'tel', label: 'Phone', placeholder: '+1 234 567 8900' }
      ]
    }
  ];
  
  features.forEach(({ title, description, inputs }) => {
    const featureSection = document.createElement('div');
    featureSection.style.cssText = 'padding: 24px; background: var(--_global-color-surface-container-low); border-radius: var(--_global-border-radius-md); border: 1px solid var(--_global-color-outline-variant);';
    
    const header = document.createElement('div');
    header.innerHTML = `
      <h4 style="margin: 0 0 8px 0; font-size: 16px; font-weight: var(--_global-font-weight-medium); color: var(--_global-color-primary);">${title}</h4>
      <p style="margin: 0 0 20px 0; font-size: 13px; color: var(--_global-color-on-surface-variant); line-height: 1.4;">${description}</p>
    `;
    featureSection.appendChild(header);
    
    const inputsContainer = document.createElement('div');
    inputsContainer.style.cssText = 'display: flex; flex-direction: column; gap: 16px;';
    
    inputs.forEach(({ type, label, variant, placeholder }) => {
      const input = document.createElement('my-input');
      input.setAttribute('type', type);
      input.setAttribute('label', label);
      if (variant) input.setAttribute('variant', variant);
      if (placeholder) input.setAttribute('placeholder', placeholder);
      inputsContainer.appendChild(input);
    });
    
    featureSection.appendChild(inputsContainer);
    featuresGrid.appendChild(featureSection);
  });
  
  container.appendChild(featuresGrid);
  
  return container;
};
EnhancedFeatureShowcase.parameters = {
  docs: {
    description: {
      story: 'Comprehensive demonstration of all enhanced input features including automatic icon assignment, theme compatibility, complete input type support, and grid system integration.',
    },
  },
};

// Global configuration showcase
export const GlobalConfigShowcase = () => {
  const container = document.createElement('div');
  container.style.cssText = 'max-width: 1000px;';
  
  // Configuration controls
  const configControls = document.createElement('div');
  configControls.style.cssText = 'margin-bottom: 32px; padding: 20px; background: var(--_global-color-surface-container); border-radius: var(--_global-border-radius-md);';
  configControls.innerHTML = `
    <h4 style="margin: 0 0 20px 0; font-size: 16px; color: var(--_global-color-primary);">Global Configuration Controls</h4>
    
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 20px;">
      <div>
        <label style="display: block; margin-bottom: 8px; font-weight: var(--_global-font-weight-medium);">Default Label Position:</label>
        <select id="label-position" style="width: 100%; padding: 8px; border: 1px solid var(--_global-color-outline-variant); border-radius: var(--_global-border-radius-sm); background: var(--_global-color-surface); color: var(--_global-color-on-surface);">
          <option value="top">Top</option>
          <option value="left">Left</option>
          <option value="over">Over (Floating)</option>
        </select>
      </div>
      
      <div>
        <label style="display: block; margin-bottom: 8px; font-weight: var(--_global-font-weight-medium);">Default Size:</label>
        <select id="default-size" style="width: 100%; padding: 8px; border: 1px solid var(--_global-color-outline-variant); border-radius: var(--_global-border-radius-sm); background: var(--_global-color-surface); color: var(--_global-color-on-surface);">
          <option value="small">Small</option>
          <option value="medium" selected>Medium</option>
          <option value="large">Large</option>
        </select>
      </div>
      
      <div>
        <label style="display: block; margin-bottom: 8px; font-weight: var(--_global-font-weight-medium);">Default Variant:</label>
        <select id="default-variant" style="width: 100%; padding: 8px; border: 1px solid var(--_global-color-outline-variant); border-radius: var(--_global-border-radius-sm); background: var(--_global-color-surface); color: var(--_global-color-on-surface);">
          <option value="outlined" selected>Outlined</option>
          <option value="filled">Filled</option>
        </select>
      </div>
    </div>
    
    <button id="apply-config" style="padding: 12px 24px; background: var(--_global-color-primary); color: var(--_global-color-on-primary); border: none; border-radius: var(--_global-border-radius-sm); cursor: pointer; font-weight: var(--_global-font-weight-medium);">
      Apply Configuration
    </button>
  `;
  container.appendChild(configControls);
  
  // Sample inputs that will reflect the configuration
  const sampleInputs = document.createElement('div');
  sampleInputs.id = 'sample-inputs';
  sampleInputs.className = 'u-display-grid u-grid-cols-2 u-gap-lg';
  sampleInputs.style.cssText = 'padding: 24px; background: var(--_global-color-surface); border: 1px solid var(--_global-color-outline-variant); border-radius: var(--_global-border-radius-md);';
  
  const renderSampleInputs = () => {
    sampleInputs.innerHTML = '';
    
    const inputConfig = globalConfig.get('components.input') || {};
    const themeConfig = globalConfig.get('theme') || {};
    
    [
      { type: 'text', label: 'Sample Text Input', placeholder: 'Using global config...' },
      { type: 'email', label: 'Sample Email', placeholder: 'user@example.com' },
      { type: 'password', label: 'Sample Password', placeholder: 'Password...' },
      { type: 'textarea', label: 'Sample Textarea', placeholder: 'Multi-line text...' }
    ].forEach(({ type, label, placeholder }) => {
      const input = document.createElement('my-input');
      input.setAttribute('type', type);
      input.setAttribute('label', label);
      input.setAttribute('placeholder', placeholder);
      input.setAttribute('label-position', themeConfig.labelPosition || inputConfig.labelPosition || 'top');
      input.setAttribute('size', inputConfig.size || 'medium');
      input.setAttribute('variant', inputConfig.variant || 'outlined');
      input.setAttribute('helper-text', `Using: ${input.getAttribute('label-position')} label, ${input.getAttribute('size')} size, ${input.getAttribute('variant')} variant`);
      sampleInputs.appendChild(input);
    });
  };
  
  renderSampleInputs();
  container.appendChild(sampleInputs);
  
  // Add configuration change functionality
  setTimeout(() => {
    const applyBtn = container.querySelector('#apply-config');
    const labelPosSelect = container.querySelector('#label-position');
    const sizeSelect = container.querySelector('#default-size');
    const variantSelect = container.querySelector('#default-variant');
    
    applyBtn?.addEventListener('click', () => {
      // Update global configuration
      globalConfig.set('theme.labelPosition', labelPosSelect.value);
      globalConfig.set('components.input.size', sizeSelect.value);
      globalConfig.set('components.input.variant', variantSelect.value);
      
      // Re-render sample inputs
      renderSampleInputs();
    });
  }, 100);
  
  return container;
};
GlobalConfigShowcase.parameters = {
  docs: {
    description: {
      story: 'Demonstrates the global configuration system. Change the default settings and see how new inputs automatically use the updated configuration. This showcases centralized control over themes, component behavior, and API contracts.',
    },
  },
};