import '../src/components/my-input/my-input.js';
import '../src/components/my-icon/my-icon.js';
import { globalConfig } from '../src/config/global-config.js';

export default {
  title: 'Components/my-input',
  component: 'my-input',
  parameters: {
    docs: {
      description: {
        component: `
# my-input Component

A comprehensive, accessible input component with clean, Tailwind-inspired design. Features flat borders, subtle focus states, and clean typography while supporting all required HTML5 input types with full accessibility, validation, and conditional icon visibility.

## Key Features

- **18+ Input Types**: Supports all standard HTML5 input types plus custom types
- **Clean Design**: Tailwind-inspired flat borders and focus rings
- **Full Accessibility**: WCAG 2.1 compliant with proper ARIA attributes
- **Flexible Layouts**: Top, left, and floating label positions
- **Icon Support**: Automatic icon assignment with conditional visibility
- **Validation**: Built-in validation with custom error messages
- **Theming**: Light/dark theme support with CSS custom properties
- **Responsive**: Mobile-first responsive design

## Usage

\`\`\`html
<!-- Basic usage -->
<my-input 
  type="text" 
  label="Full Name" 
  placeholder="Enter your name"
  required>
</my-input>

<!-- With icon and helper text -->
<my-input 
  type="email" 
  label="Email Address" 
  placeholder="user@example.com"
  leading-icon="mail"
  helper-text="We'll never share your email"
  required>
</my-input>

<!-- Floating label variant -->
<my-input 
  type="password" 
  label="Password" 
  label-position="over"
  variant="filled"
  trailing-icon="visibility">
</my-input>
\`\`\`

## API Reference

### Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| \`type\` | string | 'text' | Input type (text, email, password, etc.) |
| \`label\` | string | '' | Label text |
| \`placeholder\` | string | '' | Placeholder text |
| \`value\` | string | '' | Input value |
| \`name\` | string | '' | Input name attribute |
| \`variant\` | 'outlined' \\| 'filled' | 'outlined' | Visual variant |
| \`size\` | 'small' \\| 'medium' \\| 'large' | 'medium' | Input size |
| \`label-position\` | 'top' \\| 'left' \\| 'over' | 'top' | Label position |
| \`leading-icon\` | string | '' | Leading icon name |
| \`trailing-icon\` | string | '' | Trailing icon name |
| \`helper-text\` | string | '' | Helper text below input |
| \`required\` | boolean | false | Mark as required |
| \`disabled\` | boolean | false | Disable input |
| \`readonly\` | boolean | false | Make read-only |
| \`character-count\` | boolean | false | Show character count |
| \`min\` | string | '' | Minimum value (for numbers/dates) |
| \`max\` | string | '' | Maximum value (for numbers/dates) |
| \`minlength\` | string | '' | Minimum length |
| \`maxlength\` | string | '' | Maximum length |
| \`pattern\` | string | '' | Validation pattern |
| \`step\` | string | '' | Step increment (for numbers) |
| \`autocomplete\` | string | '' | Autocomplete hint |

### Events

| Event | Detail | Description |
|-------|--------|-------------|
| \`input\` | \`{ value, valid, errors }\` | Fired on input change |
| \`change\` | \`{ value, valid, errors }\` | Fired on value change |
| \`focus\` | \`{ value }\` | Fired on focus |
| \`blur\` | \`{ value, valid, errors }\` | Fired on blur |

### CSS Custom Properties

| Property | Default | Description |
|----------|---------|-------------|
| \`--input-border-color\` | rgb(209 213 219) | Border color |
| \`--input-focus-color\` | rgb(59 130 246) | Focus border color |
| \`--input-error-color\` | rgb(239 68 68) | Error color |
| \`--input-background\` | rgb(255 255 255) | Background color |
| \`--input-text-color\` | rgb(17 24 39) | Text color |
| \`--input-placeholder-color\` | rgb(107 114 128) | Placeholder color |
| \`--input-label-color\` | rgb(75 85 99) | Label color |
| \`--input-helper-color\` | rgb(107 114 128) | Helper text color |
        `,
      },
    },
  },
  argTypes: {
    type: {
      control: { type: 'select' },
      options: [
        'text', 'email', 'password', 'url', 'tel', 'search',
        'number', 'integer', 'pattern',
        'date', 'datetime-local', 'time', 'date-of-birth',
        'textarea', 'select', 'dynamic-select',
        'checkbox', 'radio'
      ],
      description: 'The type of input field',
      table: {
        category: 'Content',
        type: { summary: 'string' },
        defaultValue: { summary: 'text' },
      },
    },
    label: {
      control: 'text',
      description: 'The label text for the input',
      table: {
        category: 'Content',
        type: { summary: 'string' },
      },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text shown when input is empty',
      table: {
        category: 'Content',
        type: { summary: 'string' },
      },
    },
    value: {
      control: 'text',
      description: 'The current value of the input',
      table: {
        category: 'Content',
        type: { summary: 'string' },
      },
    },
    variant: {
      control: { type: 'select' },
      options: ['outlined', 'filled'],
      description: 'Visual style variant',
      table: {
        category: 'Appearance',
        type: { summary: "'outlined' | 'filled'" },
        defaultValue: { summary: 'outlined' },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Size of the input',
      table: {
        category: 'Appearance',
        type: { summary: "'small' | 'medium' | 'large'" },
        defaultValue: { summary: 'medium' },
      },
    },
    labelPosition: {
      control: { type: 'select' },
      options: ['top', 'left', 'over'],
      description: 'Position of the label',
      table: {
        category: 'Layout',
        type: { summary: "'top' | 'left' | 'over'" },
        defaultValue: { summary: 'top' },
      },
    },
    leadingIcon: {
      control: 'text',
      description: 'Icon name for leading icon',
      table: {
        category: 'Icons',
        type: { summary: 'string' },
      },
    },
    trailingIcon: {
      control: 'text',
      description: 'Icon name for trailing icon',
      table: {
        category: 'Icons',
        type: { summary: 'string' },
      },
    },
    helperText: {
      control: 'text',
      description: 'Helper text shown below the input',
      table: {
        category: 'Content',
        type: { summary: 'string' },
      },
    },
    required: {
      control: 'boolean',
      description: 'Whether the field is required',
      table: {
        category: 'Validation',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
      table: {
        category: 'State',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    readonly: {
      control: 'boolean',
      description: 'Whether the input is read-only',
      table: {
        category: 'State',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    characterCount: {
      control: 'boolean',
      description: 'Show character count',
      table: {
        category: 'Features',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
};

// Helper function to create input element
const createInput = (args) => {
  const input = document.createElement('my-input');
  
  // Map all properties
  Object.entries(args).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      if (typeof value === 'boolean') {
        if (value) {
          input.setAttribute(key === 'labelPosition' ? 'label-position' : 
                           key === 'leadingIcon' ? 'leading-icon' :
                           key === 'trailingIcon' ? 'trailing-icon' :
                           key === 'helperText' ? 'helper-text' :
                           key === 'characterCount' ? 'character-count' : key, '');
        }
      } else {
        input.setAttribute(key === 'labelPosition' ? 'label-position' : 
                         key === 'leadingIcon' ? 'leading-icon' :
                         key === 'trailingIcon' ? 'trailing-icon' :
                         key === 'helperText' ? 'helper-text' : key, value);
      }
    }
  });

  // Add event listeners for demo purposes
  input.addEventListener('input', (e) => {
    console.log('Input changed:', e.detail);
  });
  
  input.addEventListener('change', (e) => {
    console.log('Value changed:', e.detail);
  });

  return input;
};

// Default interactive example
export const Default = {
  args: {
    type: 'text',
    label: 'Full Name',
    placeholder: 'Enter your full name',
    helperText: 'This field is required for account setup',
    required: true,
  },
  render: (args) => createInput(args),
};

// Documentation showcase - comprehensive overview
export const Documentation = {
  render: () => {
    const container = document.createElement('div');
    container.style.cssText = `
      max-width: 1200px;
      padding: 24px;
      background: rgb(249 250 251);
      border-radius: 12px;
      border: 1px solid rgb(229 231 235);
    `;
    
    container.innerHTML = `
      <div style="margin-bottom: 32px;">
        <h2 style="margin: 0 0 16px 0; font-size: 24px; font-weight: 700; color: rgb(17 24 39);">
          📝 my-input Documentation
        </h2>
        <p style="margin: 0 0 24px 0; font-size: 16px; color: rgb(107 114 128); line-height: 1.6;">
          A comprehensive input component featuring clean, Tailwind-inspired design with extensive functionality and accessibility features.
        </p>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; margin-bottom: 24px;">
          <div style="padding: 16px; background: rgb(255 255 255); border: 1px solid rgb(229 231 235); border-radius: 8px;">
            <h4 style="margin: 0 0 8px 0; font-size: 14px; font-weight: 600; color: rgb(59 130 246);">✨ Features</h4>
            <ul style="margin: 0; padding-left: 16px; font-size: 14px; color: rgb(75 85 99); line-height: 1.5;">
              <li>18+ input types supported</li>
              <li>Clean, flat design</li>
              <li>Full accessibility (WCAG 2.1)</li>
              <li>Icon support with auto-assignment</li>
              <li>Built-in validation</li>
            </ul>
          </div>
          
          <div style="padding: 16px; background: rgb(255 255 255); border: 1px solid rgb(229 231 235); border-radius: 8px;">
            <h4 style="margin: 0 0 8px 0; font-size: 14px; font-weight: 600; color: rgb(16 185 129);">🎨 Design</h4>
            <ul style="margin: 0; padding-left: 16px; font-size: 14px; color: rgb(75 85 99); line-height: 1.5;">
              <li>Tailwind-inspired aesthetics</li>
              <li>Consistent spacing & typography</li>
              <li>Subtle focus rings</li>
              <li>Light/dark theme support</li>
              <li>Responsive design</li>
            </ul>
          </div>
          
          <div style="padding: 16px; background: rgb(255 255 255); border: 1px solid rgb(229 231 235); border-radius: 8px;">
            <h4 style="margin: 0 0 8px 0; font-size: 14px; font-weight: 600; color: rgb(245 158 11);">⚙️ Flexibility</h4>
            <ul style="margin: 0; padding-left: 16px; font-size: 14px; color: rgb(75 85 99); line-height: 1.5;">
              <li>Multiple layout options</li>
              <li>Customizable via CSS props</li>
              <li>Framework agnostic</li>
              <li>Global configuration</li>
              <li>Event-driven architecture</li>
            </ul>
          </div>
        </div>
        
        <div style="padding: 16px; background: rgb(254 249 195); border: 1px solid rgb(251 191 36); border-radius: 8px; border-left: 4px solid rgb(245 158 11);">
          <h4 style="margin: 0 0 8px 0; font-size: 14px; font-weight: 600; color: rgb(146 64 14);">💡 Quick Start</h4>
          <p style="margin: 0; font-size: 14px; color: rgb(146 64 14); line-height: 1.5;">
            Explore the stories below to see all input types, states, and configuration options in action. 
            Each story demonstrates specific features with interactive examples and code snippets.
          </p>
        </div>
      </div>
    `;
    
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Complete documentation overview with features, design principles, and quick start guide.',
      },
    },
  },
};

// ========================================
// INPUT TYPES SHOWCASE
// ========================================

// Text Input Types
export const TextInputTypes = {
  render: () => {
    const container = document.createElement('div');
    container.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 24px; max-width: 1200px;';
    
    const textTypes = [
      {
        type: 'text',
        label: 'Text Input',
        placeholder: 'Enter any text...',
        helperText: 'Basic text input for general text data',
        icon: 'text_fields'
      },
      {
        type: 'search',
        label: 'Search Input',
        placeholder: 'Search for anything...',
        helperText: 'Optimized for search queries with auto-assigned search icon',
        leadingIcon: 'search'
      },
      {
        type: 'pattern',
        label: 'Pattern Input',
        placeholder: 'ABC123',
        pattern: '[A-Z]{3}[0-9]{3}',
        helperText: 'Text input with pattern validation (format: ABC123)',
        maxlength: '6'
      },
    ];
    
    // Add header
    const header = document.createElement('div');
    header.style.cssText = 'grid-column: 1 / -1; margin-bottom: 16px;';
    header.innerHTML = `
      <h3 style="margin: 0 0 8px 0; font-size: 18px; font-weight: 600; color: rgb(17 24 39);">📝 Text Input Types</h3>
      <p style="margin: 0; font-size: 14px; color: rgb(107 114 128);">Basic text inputs for general text data entry and search functionality.</p>
    `;
    container.appendChild(header);
    
    textTypes.forEach(({ type, label, placeholder, helperText, pattern, maxlength, leadingIcon }) => {
      const wrapper = document.createElement('div');
      wrapper.style.cssText = 'padding: 20px; background: rgb(255 255 255); border: 1px solid rgb(229 231 235); border-radius: 8px;';
      
      const input = createInput({ 
        type, 
        label, 
        placeholder, 
        helperText, 
        pattern, 
        maxlength,
        leadingIcon 
      });
      
      const code = document.createElement('pre');
      code.style.cssText = 'margin: 16px 0 0 0; padding: 12px; background: rgb(249 250 251); border: 1px solid rgb(229 231 235); border-radius: 6px; font-size: 12px; color: rgb(75 85 99); overflow-x: auto;';
      code.textContent = `<my-input
  type="${type}"
  label="${label}"
  placeholder="${placeholder}"${pattern ? `\n  pattern="${pattern}"` : ''}${maxlength ? `\n  maxlength="${maxlength}"` : ''}${leadingIcon ? `\n  leading-icon="${leadingIcon}"` : ''}
  helper-text="${helperText}">
</my-input>`;
      
      wrapper.appendChild(input);
      wrapper.appendChild(code);
      container.appendChild(wrapper);
    });
    
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Text-based input types including basic text, search, and pattern validation inputs.',
      },
    },
  },
};

// Contact Input Types
export const ContactInputTypes = {
  render: () => {
    const container = document.createElement('div');
    container.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 24px; max-width: 1200px;';
    
    const contactTypes = [
      {
        type: 'email',
        label: 'Email Address',
        placeholder: 'user@example.com',
        helperText: 'Enter a valid email address',
        leadingIcon: 'mail',
        required: true
      },
      {
        type: 'tel',
        label: 'Phone Number',
        placeholder: '+1 (555) 123-4567',
        helperText: 'Enter phone number with country code',
        leadingIcon: 'phone'
      },
      {
        type: 'url',
        label: 'Website URL',
        placeholder: 'https://example.com',
        helperText: 'Enter a valid URL starting with http:// or https://',
        leadingIcon: 'link'
      },
    ];
    
    // Add header
    const header = document.createElement('div');
    header.style.cssText = 'grid-column: 1 / -1; margin-bottom: 16px;';
    header.innerHTML = `
      <h3 style="margin: 0 0 8px 0; font-size: 18px; font-weight: 600; color: rgb(17 24 39);">📞 Contact Input Types</h3>
      <p style="margin: 0; font-size: 14px; color: rgb(107 114 128);">Specialized inputs for contact information with built-in validation and automatic icon assignment.</p>
    `;
    container.appendChild(header);
    
    contactTypes.forEach(({ type, label, placeholder, helperText, leadingIcon, required }) => {
      const wrapper = document.createElement('div');
      wrapper.style.cssText = 'padding: 20px; background: rgb(255 255 255); border: 1px solid rgb(229 231 235); border-radius: 8px;';
      
      const input = createInput({ 
        type, 
        label, 
        placeholder, 
        helperText, 
        leadingIcon,
        required 
      });
      
      const code = document.createElement('pre');
      code.style.cssText = 'margin: 16px 0 0 0; padding: 12px; background: rgb(249 250 251); border: 1px solid rgb(229 231 235); border-radius: 6px; font-size: 12px; color: rgb(75 85 99); overflow-x: auto;';
      code.textContent = `<my-input
  type="${type}"
  label="${label}"
  placeholder="${placeholder}"
  leading-icon="${leadingIcon}"${required ? `\n  required` : ''}
  helper-text="${helperText}">
</my-input>`;
      
      wrapper.appendChild(input);
      wrapper.appendChild(code);
      container.appendChild(wrapper);
    });
    
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Contact-related input types with automatic validation and icon assignment for email, phone, and URL inputs.',
      },
    },
  },
};

// Password and Security Input Types
export const PasswordInputTypes = {
  render: () => {
    const container = document.createElement('div');
    container.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 24px; max-width: 1200px;';
    
    const passwordTypes = [
      {
        type: 'password',
        label: 'Password',
        placeholder: 'Enter your password',
        helperText: 'Password will be hidden for security',
        trailingIcon: 'visibility',
        required: true
      },
      {
        type: 'password',
        label: 'Confirm Password',
        placeholder: 'Confirm your password',
        helperText: 'Re-enter your password to confirm',
        trailingIcon: 'visibility_off',
        required: true
      },
    ];
    
    // Add header
    const header = document.createElement('div');
    header.style.cssText = 'grid-column: 1 / -1; margin-bottom: 16px;';
    header.innerHTML = `
      <h3 style="margin: 0 0 8px 0; font-size: 18px; font-weight: 600; color: rgb(17 24 39);">🔒 Password Input Types</h3>
      <p style="margin: 0; font-size: 14px; color: rgb(107 114 128);">Secure password inputs with visibility toggle icons and proper security attributes.</p>
    `;
    container.appendChild(header);
    
    passwordTypes.forEach(({ type, label, placeholder, helperText, trailingIcon, required }) => {
      const wrapper = document.createElement('div');
      wrapper.style.cssText = 'padding: 20px; background: rgb(255 255 255); border: 1px solid rgb(229 231 235); border-radius: 8px;';
      
      const input = createInput({ 
        type, 
        label, 
        placeholder, 
        helperText, 
        trailingIcon,
        required 
      });
      
      const code = document.createElement('pre');
      code.style.cssText = 'margin: 16px 0 0 0; padding: 12px; background: rgb(249 250 251); border: 1px solid rgb(229 231 235); border-radius: 6px; font-size: 12px; color: rgb(75 85 99); overflow-x: auto;';
      code.textContent = `<my-input
  type="${type}"
  label="${label}"
  placeholder="${placeholder}"
  trailing-icon="${trailingIcon}"${required ? `\n  required` : ''}
  helper-text="${helperText}">
</my-input>`;
      
      wrapper.appendChild(input);
      wrapper.appendChild(code);
      container.appendChild(wrapper);
    });
    
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Password input types with proper security attributes and visibility toggle functionality.',
      },
    },
  },
};

// Numeric Input Types
export const NumericInputTypes = {
  render: () => {
    const container = document.createElement('div');
    container.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 24px; max-width: 1200px;';
    
    const numericTypes = [
      {
        type: 'number',
        label: 'Decimal Number',
        placeholder: '25.99',
        min: '0',
        max: '999.99',
        step: '0.01',
        helperText: 'Enter a decimal number (0-999.99)'
      },
      {
        type: 'integer',
        label: 'Whole Number',
        placeholder: '42',
        min: '1',
        max: '1000',
        step: '1',
        helperText: 'Enter a whole number (1-1000)'
      },
    ];
    
    // Add header
    const header = document.createElement('div');
    header.style.cssText = 'grid-column: 1 / -1; margin-bottom: 16px;';
    header.innerHTML = `
      <h3 style="margin: 0 0 8px 0; font-size: 18px; font-weight: 600; color: rgb(17 24 39);">🔢 Numeric Input Types</h3>
      <p style="margin: 0; font-size: 14px; color: rgb(107 114 128);">Numeric inputs with range validation and step control for decimal and integer values.</p>
    `;
    container.appendChild(header);
    
    numericTypes.forEach(({ type, label, placeholder, min, max, step, helperText }) => {
      const wrapper = document.createElement('div');
      wrapper.style.cssText = 'padding: 20px; background: rgb(255 255 255); border: 1px solid rgb(229 231 235); border-radius: 8px;';
      
      const input = createInput({ 
        type, 
        label, 
        placeholder, 
        min, 
        max, 
        step,
        helperText 
      });
      
      const code = document.createElement('pre');
      code.style.cssText = 'margin: 16px 0 0 0; padding: 12px; background: rgb(249 250 251); border: 1px solid rgb(229 231 235); border-radius: 6px; font-size: 12px; color: rgb(75 85 99); overflow-x: auto;';
      code.textContent = `<my-input
  type="${type}"
  label="${label}"
  placeholder="${placeholder}"
  min="${min}"
  max="${max}"
  step="${step}"
  helper-text="${helperText}">
</my-input>`;
      
      wrapper.appendChild(input);
      wrapper.appendChild(code);
      container.appendChild(wrapper);
    });
    
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Numeric input types with range validation and step control for precise number entry.',
      },
    },
  },
};

// Date and Time Input Types
export const DateTimeInputTypes = {
  render: () => {
    const container = document.createElement('div');
    container.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 24px; max-width: 1200px;';
    
    const dateTimeTypes = [
      {
        type: 'date',
        label: 'Date Picker',
        helperText: 'Select a date using the date picker',
        leadingIcon: 'event'
      },
      {
        type: 'datetime-local',
        label: 'Date & Time',
        helperText: 'Select both date and time',
        leadingIcon: 'schedule'
      },
      {
        type: 'time',
        label: 'Time Picker',
        helperText: 'Select a time value',
        leadingIcon: 'access_time'
      },
      {
        type: 'date-of-birth',
        label: 'Date of Birth',
        helperText: 'Special date picker optimized for birth dates',
        leadingIcon: 'cake',
        max: '2006-01-01'
      },
    ];
    
    // Add header
    const header = document.createElement('div');
    header.style.cssText = 'grid-column: 1 / -1; margin-bottom: 16px;';
    header.innerHTML = `
      <h3 style="margin: 0 0 8px 0; font-size: 18px; font-weight: 600; color: rgb(17 24 39);">📅 Date & Time Input Types</h3>
      <p style="margin: 0; font-size: 14px; color: rgb(107 114 128);">Specialized inputs for date and time selection with automatic icon assignment.</p>
    `;
    container.appendChild(header);
    
    dateTimeTypes.forEach(({ type, label, helperText, leadingIcon, max }) => {
      const wrapper = document.createElement('div');
      wrapper.style.cssText = 'padding: 20px; background: rgb(255 255 255); border: 1px solid rgb(229 231 235); border-radius: 8px;';
      
      const input = createInput({ 
        type, 
        label, 
        helperText, 
        leadingIcon,
        max 
      });
      
      const code = document.createElement('pre');
      code.style.cssText = 'margin: 16px 0 0 0; padding: 12px; background: rgb(249 250 251); border: 1px solid rgb(229 231 235); border-radius: 6px; font-size: 12px; color: rgb(75 85 99); overflow-x: auto;';
      code.textContent = `<my-input
  type="${type}"
  label="${label}"
  leading-icon="${leadingIcon}"${max ? `\n  max="${max}"` : ''}
  helper-text="${helperText}">
</my-input>`;
      
      wrapper.appendChild(input);
      wrapper.appendChild(code);
      container.appendChild(wrapper);
    });
    
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Date and time input types with specialized pickers and validation for different temporal data needs.',
      },
    },
  },
};

// Multi-line and Complex Input Types
export const ComplexInputTypes = {
  render: () => {
    const container = document.createElement('div');
    container.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 24px; max-width: 1200px;';
    
    // Add header
    const header = document.createElement('div');
    header.style.cssText = 'grid-column: 1 / -1; margin-bottom: 16px;';
    header.innerHTML = `
      <h3 style="margin: 0 0 8px 0; font-size: 18px; font-weight: 600; color: rgb(17 24 39);">📄 Complex Input Types</h3>
      <p style="margin: 0; font-size: 14px; color: rgb(107 114 128);">Multi-line text areas and selection inputs for complex data entry.</p>
    `;
    container.appendChild(header);
    
    // Textarea
    const textareaWrapper = document.createElement('div');
    textareaWrapper.style.cssText = 'padding: 20px; background: rgb(255 255 255); border: 1px solid rgb(229 231 235); border-radius: 8px;';
    
    const textarea = createInput({
      type: 'textarea',
      label: 'Multi-line Text',
      placeholder: 'Enter your message here...',
      helperText: 'This is a textarea for longer text input',
      characterCount: true,
      maxlength: '500'
    });
    
    const textareaCode = document.createElement('pre');
    textareaCode.style.cssText = 'margin: 16px 0 0 0; padding: 12px; background: rgb(249 250 251); border: 1px solid rgb(229 231 235); border-radius: 6px; font-size: 12px; color: rgb(75 85 99); overflow-x: auto;';
    textareaCode.textContent = `<my-input
  type="textarea"
  label="Multi-line Text"
  placeholder="Enter your message here..."
  maxlength="500"
  character-count
  helper-text="This is a textarea for longer text input">
</my-input>`;
    
    textareaWrapper.appendChild(textarea);
    textareaWrapper.appendChild(textareaCode);
    container.appendChild(textareaWrapper);
    
    // Select dropdown
    const selectWrapper = document.createElement('div');
    selectWrapper.style.cssText = 'padding: 20px; background: rgb(255 255 255); border: 1px solid rgb(229 231 235); border-radius: 8px;';
    
    const select = document.createElement('my-input');
    select.setAttribute('type', 'select');
    select.setAttribute('label', 'Select Options');
    select.setAttribute('helper-text', 'Choose from predefined options');
    select.setAttribute('schema', JSON.stringify({
      type: 'select',
      label: 'Select Options',
      options: [
        { label: 'Option 1', value: '1' },
        { label: 'Option 2', value: '2' },
        { label: 'Option 3', value: '3' },
      ]
    }));
    
    const selectCode = document.createElement('pre');
    selectCode.style.cssText = 'margin: 16px 0 0 0; padding: 12px; background: rgb(249 250 251); border: 1px solid rgb(229 231 235); border-radius: 6px; font-size: 12px; color: rgb(75 85 99); overflow-x: auto;';
    selectCode.textContent = `<my-input
  type="select"
  label="Select Options"
  schema='{"options":[
    {"label":"Option 1","value":"1"},
    {"label":"Option 2","value":"2"},
    {"label":"Option 3","value":"3"}
  ]}'
  helper-text="Choose from predefined options">
</my-input>`;
    
    selectWrapper.appendChild(select);
    selectWrapper.appendChild(selectCode);
    container.appendChild(selectWrapper);
    
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Complex input types including multi-line textarea with character counting and select dropdown with options.',
      },
    },
  },
};

// Boolean Input Types
export const BooleanInputTypes = {
  render: () => {
    const container = document.createElement('div');
    container.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 24px; max-width: 1200px;';
    
    const booleanTypes = [
      {
        type: 'checkbox',
        label: 'Accept Terms',
        value: 'false',
        helperText: 'Check to accept the terms and conditions'
      },
      {
        type: 'radio',
        label: 'Newsletter Subscription',
        value: 'false',
        helperText: 'Select to subscribe to our newsletter'
      },
    ];
    
    // Add header
    const header = document.createElement('div');
    header.style.cssText = 'grid-column: 1 / -1; margin-bottom: 16px;';
    header.innerHTML = `
      <h3 style="margin: 0 0 8px 0; font-size: 18px; font-weight: 600; color: rgb(17 24 39);">☑️ Boolean Input Types</h3>
      <p style="margin: 0; font-size: 14px; color: rgb(107 114 128);">Checkbox and radio inputs for boolean selections and single-choice options.</p>
    `;
    container.appendChild(header);
    
    booleanTypes.forEach(({ type, label, value, helperText }) => {
      const wrapper = document.createElement('div');
      wrapper.style.cssText = 'padding: 20px; background: rgb(255 255 255); border: 1px solid rgb(229 231 235); border-radius: 8px;';
      
      const input = createInput({ 
        type, 
        label, 
        value,
        helperText 
      });
      
      const code = document.createElement('pre');
      code.style.cssText = 'margin: 16px 0 0 0; padding: 12px; background: rgb(249 250 251); border: 1px solid rgb(229 231 235); border-radius: 6px; font-size: 12px; color: rgb(75 85 99); overflow-x: auto;';
      code.textContent = `<my-input
  type="${type}"
  label="${label}"
  value="${value}"
  helper-text="${helperText}">
</my-input>`;
      
      wrapper.appendChild(input);
      wrapper.appendChild(code);
      container.appendChild(wrapper);
    });
    
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Boolean input types for checkbox and radio button selections.',
      },
    },
  },
};

// ========================================
// INPUT STATES SHOWCASE
// ========================================

// All Input States
export const InputStates = {
  render: () => {
    const container = document.createElement('div');
    container.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 24px; max-width: 1200px;';
    
    const states = [
      {
        label: 'Normal State',
        props: {
          type: 'text',
          label: 'Normal Input',
          placeholder: 'This is a normal input',
          helperText: 'Default state with normal styling'
        },
        description: 'Default input state with standard border and colors'
      },
      {
        label: 'Focused State',
        props: {
          type: 'text',
          label: 'Focused Input',
          placeholder: 'Click to see focus state',
          helperText: 'Focus state shows blue border and ring'
        },
        description: 'Interactive focus state with blue border and focus ring'
      },
      {
        label: 'Disabled State',
        props: {
          type: 'text',
          label: 'Disabled Input',
          placeholder: 'This input is disabled',
          helperText: 'Disabled inputs cannot be interacted with',
          disabled: true
        },
        description: 'Non-interactive state with reduced opacity'
      },
      {
        label: 'Read-only State',
        props: {
          type: 'text',
          label: 'Read-only Input',
          value: 'This value cannot be changed',
          helperText: 'Read-only inputs display data but prevent editing',
          readonly: true
        },
        description: 'Display-only state that shows data but prevents editing'
      },
      {
        label: 'Error State',
        props: {
          type: 'email',
          label: 'Email with Error',
          value: 'invalid-email',
          helperText: 'This email address is invalid',
          required: true
        },
        description: 'Error state with red border and error messaging',
        customSetup: (input) => {
          // Manually trigger validation to show error state
          setTimeout(() => {
            input.dispatchEvent(new Event('blur', { bubbles: true }));
          }, 100);
        }
      },
      {
        label: 'Required State',
        props: {
          type: 'text',
          label: 'Required Field',
          placeholder: 'This field is required',
          helperText: 'Required fields show an asterisk (*) indicator',
          required: true
        },
        description: 'Required fields display with asterisk indicator'
      }
    ];
    
    // Add header
    const header = document.createElement('div');
    header.style.cssText = 'grid-column: 1 / -1; margin-bottom: 16px;';
    header.innerHTML = `
      <h3 style="margin: 0 0 8px 0; font-size: 18px; font-weight: 600; color: rgb(17 24 39);">🎭 Input States</h3>
      <p style="margin: 0; font-size: 14px; color: rgb(107 114 128);">All available input states showing different interaction and validation modes.</p>
    `;
    container.appendChild(header);
    
    states.forEach(({ label, props, description, customSetup }) => {
      const wrapper = document.createElement('div');
      wrapper.style.cssText = 'padding: 20px; background: rgb(255 255 255); border: 1px solid rgb(229 231 235); border-radius: 8px;';
      
      // State title
      const title = document.createElement('h4');
      title.style.cssText = 'margin: 0 0 8px 0; font-size: 14px; font-weight: 600; color: rgb(17 24 39);';
      title.textContent = label;
      wrapper.appendChild(title);
      
      // Description
      const desc = document.createElement('p');
      desc.style.cssText = 'margin: 0 0 16px 0; font-size: 12px; color: rgb(107 114 128);';
      desc.textContent = description;
      wrapper.appendChild(desc);
      
      const input = createInput(props);
      
      // Apply custom setup if provided
      if (customSetup) {
        customSetup(input);
      }
      
      const code = document.createElement('pre');
      code.style.cssText = 'margin: 16px 0 0 0; padding: 12px; background: rgb(249 250 251); border: 1px solid rgb(229 231 235); border-radius: 6px; font-size: 12px; color: rgb(75 85 99); overflow-x: auto;';
      
      const codeAttributes = Object.entries(props)
        .filter(([key, value]) => value !== undefined && value !== '' && value !== false)
        .map(([key, value]) => {
          if (typeof value === 'boolean') {
            return key === 'labelPosition' ? `  label-position` : 
                   key === 'leadingIcon' ? `  leading-icon` :
                   key === 'trailingIcon' ? `  trailing-icon` :
                   key === 'helperText' ? `  helper-text` :
                   key === 'characterCount' ? `  character-count` : `  ${key}`;
          }
          return key === 'labelPosition' ? `  label-position="${value}"` : 
                 key === 'leadingIcon' ? `  leading-icon="${value}"` :
                 key === 'trailingIcon' ? `  trailing-icon="${value}"` :
                 key === 'helperText' ? `  helper-text="${value}"` : `  ${key}="${value}"`;
        })
        .join('\n');
        
      code.textContent = `<my-input\n${codeAttributes}>
</my-input>`;
      
      wrapper.appendChild(input);
      wrapper.appendChild(code);
      container.appendChild(wrapper);
    });
    
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Comprehensive showcase of all input states including normal, focused, disabled, read-only, error, and required states.',
      },
    },
  },
};

// Variants Showcase
export const Variants = {
  render: () => {
    const container = document.createElement('div');
    container.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 24px; max-width: 1200px;';
    
    // Add header
    const header = document.createElement('div');
    header.style.cssText = 'grid-column: 1 / -1; margin-bottom: 16px;';
    header.innerHTML = `
      <h3 style="margin: 0 0 8px 0; font-size: 18px; font-weight: 600; color: rgb(17 24 39);">🎨 Input Variants</h3>
      <p style="margin: 0; font-size: 14px; color: rgb(107 114 128);">Visual style variants with clean, Tailwind-inspired design.</p>
    `;
    container.appendChild(header);
    
    const variants = [
      {
        variant: 'outlined',
        label: 'Outlined Variant (Default)',
        description: 'Clean flat border design with focus rings',
        helperText: 'Default variant with clean borders and subtle styling'
      },
      {
        variant: 'filled',
        label: 'Filled Variant',
        description: 'Subtle background fill with bottom indicator',
        helperText: 'Filled variant with background color and bottom line'
      }
    ];
    
    variants.forEach(({ variant, label, description, helperText }) => {
      const wrapper = document.createElement('div');
      wrapper.style.cssText = 'padding: 20px; background: rgb(255 255 255); border: 1px solid rgb(229 231 235); border-radius: 8px;';
      
      // Variant title
      const title = document.createElement('h4');
      title.style.cssText = 'margin: 0 0 8px 0; font-size: 14px; font-weight: 600; color: rgb(17 24 39);';
      title.textContent = label;
      wrapper.appendChild(title);
      
      // Description
      const desc = document.createElement('p');
      desc.style.cssText = 'margin: 0 0 16px 0; font-size: 12px; color: rgb(107 114 128);';
      desc.textContent = description;
      wrapper.appendChild(desc);
      
      const input = createInput({
        type: 'text',
        label: `${variant.charAt(0).toUpperCase() + variant.slice(1)} Input`,
        placeholder: `This is a ${variant} input`,
        variant,
        helperText
      });
      
      const code = document.createElement('pre');
      code.style.cssText = 'margin: 16px 0 0 0; padding: 12px; background: rgb(249 250 251); border: 1px solid rgb(229 231 235); border-radius: 6px; font-size: 12px; color: rgb(75 85 99); overflow-x: auto;';
      code.textContent = `<my-input
  type="text"
  label="${variant.charAt(0).toUpperCase() + variant.slice(1)} Input"
  placeholder="This is a ${variant} input"
  variant="${variant}"
  helper-text="${helperText}">
</my-input>`;
      
      wrapper.appendChild(input);
      wrapper.appendChild(code);
      container.appendChild(wrapper);
    });
    
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Visual variants showing outlined (default) and filled styles with clean, flat design.',
      },
    },
  },
};

// Sizes Showcase
export const Sizes = {
  render: () => {
    const container = document.createElement('div');
    container.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 24px; max-width: 1200px;';
    
    // Add header
    const header = document.createElement('div');
    header.style.cssText = 'grid-column: 1 / -1; margin-bottom: 16px;';
    header.innerHTML = `
      <h3 style="margin: 0 0 8px 0; font-size: 18px; font-weight: 600; color: rgb(17 24 39);">📏 Input Sizes</h3>
      <p style="margin: 0; font-size: 14px; color: rgb(107 114 128);">Different size options with consistent spacing and typography.</p>
    `;
    container.appendChild(header);
    
    const sizes = [
      {
        size: 'small',
        height: '36px',
        fontSize: '14px',
        description: 'Compact size for dense layouts'
      },
      {
        size: 'medium',
        height: '40px',
        fontSize: '16px',
        description: 'Default size for most use cases'
      },
      {
        size: 'large',
        height: '44px',
        fontSize: '18px',
        description: 'Larger size for emphasis or accessibility'
      }
    ];
    
    sizes.forEach(({ size, height, fontSize, description }) => {
      const wrapper = document.createElement('div');
      wrapper.style.cssText = 'padding: 20px; background: rgb(255 255 255); border: 1px solid rgb(229 231 235); border-radius: 8px;';
      
      // Size title
      const title = document.createElement('h4');
      title.style.cssText = 'margin: 0 0 8px 0; font-size: 14px; font-weight: 600; color: rgb(17 24 39);';
      title.textContent = `${size.charAt(0).toUpperCase() + size.slice(1)} Size`;
      wrapper.appendChild(title);
      
      // Description with specs
      const desc = document.createElement('p');
      desc.style.cssText = 'margin: 0 0 16px 0; font-size: 12px; color: rgb(107 114 128);';
      desc.textContent = `${description} (Height: ${height}, Font: ${fontSize})`;
      wrapper.appendChild(desc);
      
      const input = createInput({
        type: 'text',
        label: `${size.charAt(0).toUpperCase() + size.slice(1)} Input`,
        placeholder: `This is a ${size} sized input`,
        size,
        helperText: `${size.charAt(0).toUpperCase() + size.slice(1)} size with appropriate spacing and typography`
      });
      
      const code = document.createElement('pre');
      code.style.cssText = 'margin: 16px 0 0 0; padding: 12px; background: rgb(249 250 251); border: 1px solid rgb(229 231 235); border-radius: 6px; font-size: 12px; color: rgb(75 85 99); overflow-x: auto;';
      code.textContent = `<my-input
  type="text"
  label="${size.charAt(0).toUpperCase() + size.slice(1)} Input"
  placeholder="This is a ${size} sized input"
  size="${size}"
  helper-text="${size.charAt(0).toUpperCase() + size.slice(1)} size with appropriate spacing">
</my-input>`;
      
      wrapper.appendChild(input);
      wrapper.appendChild(code);
      container.appendChild(wrapper);
    });
    
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Size variations showing small, medium (default), and large inputs with proportional spacing.',
      },
    },
  },
};

// Label Positions Showcase
export const LabelPositions = {
  render: () => {
    const container = document.createElement('div');
    container.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 24px; max-width: 1200px;';
    
    // Add header
    const header = document.createElement('div');
    header.style.cssText = 'grid-column: 1 / -1; margin-bottom: 16px;';
    header.innerHTML = `
      <h3 style="margin: 0 0 8px 0; font-size: 18px; font-weight: 600; color: rgb(17 24 39);">🏷️ Label Positions</h3>
      <p style="margin: 0; font-size: 14px; color: rgb(107 114 128);">Different label positioning options for flexible layout design.</p>
    `;
    container.appendChild(header);
    
    const positions = [
      {
        position: 'top',
        label: 'Top Position (Default)',
        description: 'Label positioned above the input field',
        helperText: 'Standard layout with label above input'
      },
      {
        position: 'left',
        label: 'Left Position',
        description: 'Label positioned to the left of the input field',
        helperText: 'Horizontal layout for compact forms'
      },
      {
        position: 'over',
        label: 'Floating Position',
        description: 'Label floats over the input and moves on focus',
        helperText: 'Material Design floating label style'
      }
    ];
    
    positions.forEach(({ position, label, description, helperText }) => {
      const wrapper = document.createElement('div');
      wrapper.style.cssText = 'padding: 20px; background: rgb(255 255 255); border: 1px solid rgb(229 231 235); border-radius: 8px;';
      
      // Position title
      const title = document.createElement('h4');
      title.style.cssText = 'margin: 0 0 8px 0; font-size: 14px; font-weight: 600; color: rgb(17 24 39);';
      title.textContent = label;
      wrapper.appendChild(title);
      
      // Description
      const desc = document.createElement('p');
      desc.style.cssText = 'margin: 0 0 16px 0; font-size: 12px; color: rgb(107 114 128);';
      desc.textContent = description;
      wrapper.appendChild(desc);
      
      const input = createInput({
        type: 'text',
        label: `${position.charAt(0).toUpperCase() + position.slice(1)} Label`,
        placeholder: `Label positioned ${position}`,
        labelPosition: position,
        helperText
      });
      
      const code = document.createElement('pre');
      code.style.cssText = 'margin: 16px 0 0 0; padding: 12px; background: rgb(249 250 251); border: 1px solid rgb(229 231 235); border-radius: 6px; font-size: 12px; color: rgb(75 85 99); overflow-x: auto;';
      code.textContent = `<my-input
  type="text"
  label="${position.charAt(0).toUpperCase() + position.slice(1)} Label"
  placeholder="Label positioned ${position}"
  label-position="${position}"
  helper-text="${helperText}">
</my-input>`;
      
      wrapper.appendChild(input);
      wrapper.appendChild(code);
      container.appendChild(wrapper);
    });
    
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Label positioning options including top (default), left, and floating over positions.',
      },
    },
  },
};

// Icons Showcase
export const Icons = {
  render: () => {
    const container = document.createElement('div');
    container.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 24px; max-width: 1200px;';
    
    // Add header
    const header = document.createElement('div');
    header.style.cssText = 'grid-column: 1 / -1; margin-bottom: 16px;';
    header.innerHTML = `
      <h3 style="margin: 0 0 8px 0; font-size: 18px; font-weight: 600; color: rgb(17 24 39);">🎯 Icon Support</h3>
      <p style="margin: 0; font-size: 14px; color: rgb(107 114 128);">Leading and trailing icons with automatic assignment based on input type.</p>
    `;
    container.appendChild(header);
    
    const iconExamples = [
      {
        type: 'email',
        label: 'Leading Icon',
        placeholder: 'user@example.com',
        leadingIcon: 'mail',
        helperText: 'Icons appear on the left side of the input'
      },
      {
        type: 'password',
        label: 'Trailing Icon',
        placeholder: 'Enter password',
        trailingIcon: 'visibility',
        helperText: 'Icons appear on the right side of the input'
      },
      {
        type: 'search',
        label: 'Both Icons',
        placeholder: 'Search something...',
        leadingIcon: 'search',
        trailingIcon: 'clear',
        helperText: 'Inputs can have both leading and trailing icons'
      },
      {
        type: 'text',
        label: 'Auto-assigned Icons',
        placeholder: 'Icons assigned automatically',
        helperText: 'Some input types get icons automatically (email, search, etc.)'
      }
    ];
    
    iconExamples.forEach(({ type, label, placeholder, leadingIcon, trailingIcon, helperText }) => {
      const wrapper = document.createElement('div');
      wrapper.style.cssText = 'padding: 20px; background: rgb(255 255 255); border: 1px solid rgb(229 231 235); border-radius: 8px;';
      
      // Icon title
      const title = document.createElement('h4');
      title.style.cssText = 'margin: 0 0 8px 0; font-size: 14px; font-weight: 600; color: rgb(17 24 39);';
      title.textContent = label;
      wrapper.appendChild(title);
      
      // Description
      const desc = document.createElement('p');
      desc.style.cssText = 'margin: 0 0 16px 0; font-size: 12px; color: rgb(107 114 128);';
      desc.textContent = helperText;
      wrapper.appendChild(desc);
      
      const input = createInput({
        type,
        label,
        placeholder,
        leadingIcon,
        trailingIcon,
        helperText: `${type} input with ${leadingIcon ? 'leading' : ''}${leadingIcon && trailingIcon ? ' and ' : ''}${trailingIcon ? 'trailing' : ''} icon${leadingIcon || trailingIcon ? 's' : ' (auto-assigned)'}`
      });
      
      const code = document.createElement('pre');
      code.style.cssText = 'margin: 16px 0 0 0; padding: 12px; background: rgb(249 250 251); border: 1px solid rgb(229 231 235); border-radius: 6px; font-size: 12px; color: rgb(75 85 99); overflow-x: auto;';
      code.textContent = `<my-input
  type="${type}"
  label="${label}"
  placeholder="${placeholder}"${leadingIcon ? `\n  leading-icon="${leadingIcon}"` : ''}${trailingIcon ? `\n  trailing-icon="${trailingIcon}"` : ''}
  helper-text="${helperText}">
</my-input>`;
      
      wrapper.appendChild(input);
      wrapper.appendChild(code);
      container.appendChild(wrapper);
    });
    
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Icon support including leading icons, trailing icons, and automatic icon assignment for specific input types.',
      },
    },
  },
};

// Validation and Features Showcase
export const ValidationFeatures = {
  render: () => {
    const container = document.createElement('div');
    container.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 24px; max-width: 1200px;';
    
    // Add header
    const header = document.createElement('div');
    header.style.cssText = 'grid-column: 1 / -1; margin-bottom: 16px;';
    header.innerHTML = `
      <h3 style="margin: 0 0 8px 0; font-size: 18px; font-weight: 600; color: rgb(17 24 39);">✅ Validation & Features</h3>
      <p style="margin: 0; font-size: 14px; color: rgb(107 114 128);">Advanced features including validation, character counting, and input constraints.</p>
    `;
    container.appendChild(header);
    
    const features = [
      {
        title: 'Character Counting',
        input: {
          type: 'textarea',
          label: 'Message with Character Count',
          placeholder: 'Type your message...',
          maxlength: '150',
          characterCount: true,
          helperText: 'Character counter shows current/max length'
        },
        description: 'Real-time character counting with max length validation'
      },
      {
        title: 'Pattern Validation',
        input: {
          type: 'text',
          label: 'Product Code',
          placeholder: 'ABC123',
          pattern: '[A-Z]{3}[0-9]{3}',
          maxlength: '6',
          helperText: 'Must match pattern: 3 letters + 3 numbers'
        },
        description: 'Custom pattern validation with real-time feedback'
      },
      {
        title: 'Min/Max Length',
        input: {
          type: 'password',
          label: 'Secure Password',
          placeholder: 'Enter secure password',
          minlength: '8',
          maxlength: '50',
          trailingIcon: 'visibility',
          helperText: 'Password must be between 8-50 characters'
        },
        description: 'Length constraints with validation feedback'
      },
      {
        title: 'Numeric Range',
        input: {
          type: 'number',
          label: 'Age',
          placeholder: '25',
          min: '18',
          max: '120',
          step: '1',
          helperText: 'Age must be between 18 and 120'
        },
        description: 'Numeric inputs with min/max range validation'
      }
    ];
    
    features.forEach(({ title, input, description }) => {
      const wrapper = document.createElement('div');
      wrapper.style.cssText = 'padding: 20px; background: rgb(255 255 255); border: 1px solid rgb(229 231 235); border-radius: 8px;';
      
      // Feature title
      const titleEl = document.createElement('h4');
      titleEl.style.cssText = 'margin: 0 0 8px 0; font-size: 14px; font-weight: 600; color: rgb(17 24 39);';
      titleEl.textContent = title;
      wrapper.appendChild(titleEl);
      
      // Description
      const desc = document.createElement('p');
      desc.style.cssText = 'margin: 0 0 16px 0; font-size: 12px; color: rgb(107 114 128);';
      desc.textContent = description;
      wrapper.appendChild(desc);
      
      const inputEl = createInput(input);
      
      const code = document.createElement('pre');
      code.style.cssText = 'margin: 16px 0 0 0; padding: 12px; background: rgb(249 250 251); border: 1px solid rgb(229 231 235); border-radius: 6px; font-size: 12px; color: rgb(75 85 99); overflow-x: auto;';
      
      const codeAttributes = Object.entries(input)
        .filter(([key, value]) => value !== undefined && value !== '' && value !== false)
        .map(([key, value]) => {
          if (typeof value === 'boolean') {
            return key === 'characterCount' ? `  character-count` : `  ${key}`;
          }
          return key === 'trailingIcon' ? `  trailing-icon="${value}"` :
                 key === 'helperText' ? `  helper-text="${value}"` : `  ${key}="${value}"`;
        })
        .join('\n');
        
      code.textContent = `<my-input\n${codeAttributes}>
</my-input>`;
      
      wrapper.appendChild(inputEl);
      wrapper.appendChild(code);
      container.appendChild(wrapper);
    });
    
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Advanced validation and feature examples including character counting, pattern validation, and input constraints.',
      },
    },
  },
};