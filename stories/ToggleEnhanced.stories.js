import '../src/components/my-toggle/my-toggle-enhanced.js';

export default {
  title: 'Components/my-toggle-enhanced',
  parameters: {
    docs: {
      description: {
        component: 'Enhanced toggle component built using MyntUIBaseComponent, demonstrating improved consistency, error handling, accessibility, and performance monitoring.',
      },
    },
  },
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Toggle checked state',
    },
    disabled: {
      control: 'boolean', 
      description: 'Disable the toggle',
    },
    readonly: {
      control: 'boolean',
      description: 'Make toggle read-only',
    },
    required: {
      control: 'boolean',
      description: 'Mark as required field',
    },
    error: {
      control: 'boolean',
      description: 'Show error state',
    },
    label: {
      control: 'text',
      description: 'Toggle label text',
    },
    name: {
      control: 'text', 
      description: 'Form field name',
    },
    value: {
      control: 'text',
      description: 'Toggle value when checked',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Toggle size variant',
    },
    debug: {
      control: 'boolean',
      description: 'Enable debug logging',
    },
  },
};

const Template = (args) => {
  const container = document.createElement('div');
  container.style.cssText = 'padding: 24px; display: flex; flex-direction: column; gap: 16px;';
  
  const toggle = document.createElement('my-toggle-enhanced');
  
  // Set properties
  if (args.checked) toggle.setAttribute('checked', '');
  if (args.disabled) toggle.setAttribute('disabled', '');
  if (args.readonly) toggle.setAttribute('readonly', '');
  if (args.required) toggle.setAttribute('required', '');
  if (args.error) toggle.setAttribute('error', '');
  if (args.label) toggle.setAttribute('label', args.label);
  if (args.name) toggle.setAttribute('name', args.name);
  if (args.value) toggle.setAttribute('value', args.value);
  if (args.size && args.size !== 'md') toggle.setAttribute('size', args.size);
  if (args.debug) toggle.setAttribute('debug', '');
  
  // Add event listener to demonstrate enhanced events
  toggle.addEventListener('change', (event) => {
    console.log('Enhanced toggle changed:', event.detail);
  });
  
  toggle.addEventListener('focus', (event) => {
    console.log('Enhanced toggle focused:', event.detail);
  });
  
  toggle.addEventListener('error', (event) => {
    console.error('Enhanced toggle error:', event.detail);
  });
  
  const info = document.createElement('div');
  info.style.cssText = 'font-size: 14px; color: var(--_global-color-text-secondary);';
  info.textContent = 'Enhanced toggle with base component features: logging, validation, accessibility, performance monitoring';
  
  container.appendChild(info);
  container.appendChild(toggle);
  
  return container;
};

export const Default = Template.bind({});
Default.args = {
  checked: false,
  disabled: false,
  readonly: false,
  required: false,
  error: false,
  label: 'Enhanced Toggle',
  name: 'enhanced-toggle',
  value: 'on',
  size: 'md',
  debug: false,
};

// Enhanced features showcase
export const EnhancedFeatures = () => {
  const container = document.createElement('div');
  container.style.cssText = 'padding: 24px; display: flex; flex-direction: column; gap: 24px;';
  
  const title = document.createElement('h3');
  title.textContent = 'Enhanced Features Demo';
  title.style.cssText = 'margin: 0 0 16px 0;';
  
  // Performance monitoring demo
  const perfSection = document.createElement('div');
  perfSection.innerHTML = `
    <h4 style="margin: 0 0 12px 0;">Performance Monitoring</h4>
    <p style="margin: 0 0 12px 0; font-size: 14px; color: var(--_global-color-text-secondary);">
      Enable debug mode and check console for performance measurements
    </p>
  `;
  
  const perfToggle = document.createElement('my-toggle-enhanced');
  perfToggle.setAttribute('label', 'Debug Mode Toggle');
  perfToggle.setAttribute('debug', '');
  perfToggle.setAttribute('name', 'performance-demo');
  
  // Validation demo
  const validationSection = document.createElement('div');
  validationSection.innerHTML = `
    <h4 style="margin: 0 0 12px 0;">Enhanced Validation</h4>
    <p style="margin: 0 0 12px 0; font-size: 14px; color: var(--_global-color-text-secondary);">
      Required toggle with automatic validation on blur
    </p>
  `;
  
  const validationToggle = document.createElement('my-toggle-enhanced');
  validationToggle.setAttribute('label', 'Required Setting');
  validationToggle.setAttribute('required', '');
  validationToggle.setAttribute('name', 'validation-demo');
  
  // Accessibility demo
  const a11ySection = document.createElement('div');
  a11ySection.innerHTML = `
    <h4 style="margin: 0 0 12px 0;">Enhanced Accessibility</h4>
    <p style="margin: 0 0 12px 0; font-size: 14px; color: var(--_global-color-text-secondary);">
      Screen reader announcements, keyboard navigation (Left/Right arrows), focus management
    </p>
  `;
  
  const a11yToggle = document.createElement('my-toggle-enhanced');
  a11yToggle.setAttribute('label', 'Accessibility Features');
  a11yToggle.setAttribute('name', 'accessibility-demo');
  
  // Error handling demo
  const errorSection = document.createElement('div');
  errorSection.innerHTML = `
    <h4 style="margin: 0 0 12px 0;">Error Handling</h4>
    <p style="margin: 0 0 12px 0; font-size: 14px; color: var(--_global-color-text-secondary);">
      Error state with enhanced visual feedback
    </p>
  `;
  
  const errorToggle = document.createElement('my-toggle-enhanced');
  errorToggle.setAttribute('label', 'Error State Demo');
  errorToggle.setAttribute('error', '');
  errorToggle.setAttribute('name', 'error-demo');
  
  // Event listeners for demos
  [perfToggle, validationToggle, a11yToggle, errorToggle].forEach(toggle => {
    toggle.addEventListener('change', (event) => {
      console.log(`Enhanced toggle [${event.detail.name}] changed:`, event.detail);
    });
    
    toggle.addEventListener('focus', (event) => {
      console.log(`Enhanced toggle [${event.detail.name}] focused:`, event.detail);
    });
    
    toggle.addEventListener('blur', (event) => {
      console.log(`Enhanced toggle [${event.detail.name}] blurred:`, event.detail);
    });
    
    toggle.addEventListener('error', (event) => {
      console.error(`Enhanced toggle error:`, event.detail);
    });
  });
  
  container.appendChild(title);
  container.appendChild(perfSection);
  perfSection.appendChild(perfToggle);
  container.appendChild(validationSection);
  validationSection.appendChild(validationToggle);
  container.appendChild(a11ySection);
  a11ySection.appendChild(a11yToggle);
  container.appendChild(errorSection);
  errorSection.appendChild(errorToggle);
  
  return container;
};

// Size variants with enhanced styling
export const Sizes = () => {
  const container = document.createElement('div');
  container.style.cssText = 'padding: 24px; display: flex; gap: 24px; align-items: center; flex-wrap: wrap;';
  
  const sizes = ['sm', 'md', 'lg'];
  
  sizes.forEach(size => {
    const section = document.createElement('div');
    section.style.cssText = 'display: flex; flex-direction: column; gap: 8px; align-items: center;';
    
    const toggle = document.createElement('my-toggle-enhanced');
    toggle.setAttribute('label', `${size.toUpperCase()} Toggle`);
    toggle.setAttribute('size', size);
    toggle.setAttribute('name', `size-${size}`);
    toggle.setAttribute('debug', '');
    
    const label = document.createElement('div');
    label.textContent = size.toUpperCase();
    label.style.cssText = 'font-size: 12px; color: var(--_global-color-text-secondary);';
    
    section.appendChild(toggle);
    section.appendChild(label);
    container.appendChild(section);
  });
  
  return container;
};

// States showcase with enhanced feedback
export const States = () => {
  const container = document.createElement('div');
  container.style.cssText = 'padding: 24px; display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 24px;';
  
  const states = [
    { label: 'Normal', props: {} },
    { label: 'Checked', props: { checked: true } },
    { label: 'Disabled', props: { disabled: true } },
    { label: 'Disabled Checked', props: { disabled: true, checked: true } },
    { label: 'Required', props: { required: true } },
    { label: 'Read-only', props: { readonly: true, checked: true } },
    { label: 'Error State', props: { error: true } },
    { label: 'Debug Mode', props: { debug: true, checked: true } },
  ];
  
  states.forEach(({ label, props }) => {
    const section = document.createElement('div');
    section.style.cssText = 'display: flex; flex-direction: column; gap: 12px; padding: 16px; border: 1px solid var(--_global-color-outline-variant); border-radius: var(--_global-border-radius-md);';
    
    const title = document.createElement('h4');
    title.textContent = label;
    title.style.cssText = 'margin: 0; font-size: 16px;';
    
    const toggle = document.createElement('my-toggle-enhanced');
    toggle.setAttribute('label', `${label} Toggle`);
    toggle.setAttribute('name', `state-${label.toLowerCase().replace(/\s+/g, '-')}`);
    
    // Apply state properties
    Object.entries(props).forEach(([key, value]) => {
      if (value === true) {
        toggle.setAttribute(key, '');
      } else if (value !== false) {
        toggle.setAttribute(key, value);
      }
    });
    
    section.appendChild(title);
    section.appendChild(toggle);
    container.appendChild(section);
  });
  
  return container;
};

// API demonstration
export const APIDemonstration = () => {
  const container = document.createElement('div');
  container.style.cssText = 'padding: 24px; max-width: 600px;';
  
  const title = document.createElement('h3');
  title.textContent = 'Enhanced API Demonstration';
  title.style.cssText = 'margin: 0 0 16px 0;';
  
  const toggle = document.createElement('my-toggle-enhanced');
  toggle.setAttribute('label', 'API Demo Toggle');
  toggle.setAttribute('name', 'api-demo');
  toggle.setAttribute('debug', '');
  
  const controls = document.createElement('div');
  controls.style.cssText = 'display: flex; flex-wrap: wrap; gap: 12px; margin: 16px 0;';
  
  // API method buttons
  const methods = [
    { label: 'Toggle', action: () => toggle.toggle() },
    { label: 'Check', action: () => toggle.check() },
    { label: 'Uncheck', action: () => toggle.uncheck() },
    { label: 'Validate', action: () => console.log('Valid:', toggle.validateState()) },
    { label: 'Focus', action: () => toggle.focusFirstElement() },
    { label: 'Toggle Required', action: () => toggle.required = !toggle.required },
    { label: 'Toggle Error', action: () => toggle.error = !toggle.error },
    { label: 'Announce', action: () => toggle.announceToScreenReader('API method called', 'assertive') },
  ];
  
  methods.forEach(({ label, action }) => {
    const button = document.createElement('button');
    button.textContent = label;
    button.style.cssText = `
      padding: 8px 12px;
      border: 1px solid var(--_global-color-outline);
      border-radius: var(--_global-border-radius-sm);
      background: var(--_global-color-surface);
      color: var(--_global-color-on-surface);
      cursor: pointer;
      font-size: 14px;
    `;
    
    button.addEventListener('click', action);
    controls.appendChild(button);
  });
  
  const status = document.createElement('div');
  status.style.cssText = 'margin-top: 16px; padding: 12px; background: var(--_global-color-surface-container); border-radius: var(--_global-border-radius-md); font-family: monospace; font-size: 14px;';
  
  // Update status display
  const updateStatus = () => {
    status.innerHTML = `
      <strong>Current State:</strong><br>
      Checked: ${toggle.checked}<br>
      Disabled: ${toggle.disabled}<br>
      Required: ${toggle.required}<br>
      Error: ${toggle.error}<br>
      Name: ${toggle.name}<br>
      Value: ${toggle.value}
    `;
  };
  
  toggle.addEventListener('change', updateStatus);
  toggle.addEventListener('blur', updateStatus);
  updateStatus();
  
  container.appendChild(title);
  container.appendChild(toggle);
  container.appendChild(controls);
  container.appendChild(status);
  
  return container;
};