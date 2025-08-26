import '../src/components/my-input/my-input.js';
import '../src/components/my-icon/my-icon.js';

export default {
  title: 'Components/my-input',
  parameters: {
    docs: {
      description: {
        component: 'A Material Design 3 input component with enhanced state layers, floating labels, validation, and accessibility. Supports both outlined and filled variants.',
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