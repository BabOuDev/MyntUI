import '../src/components/my-radio-group/my-radio-group.js';
import '../src/components/my-radio/my-radio.js';

export default {
  title: 'Components/my-radio & my-radio-group',
  parameters: {
    docs: {
      description: {
        component: 'Radio components for single-choice selections. my-radio-group manages a set of my-radio components, ensuring only one can be selected at a time.',
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Radio group label',
    },
    value: {
      control: 'text',
      description: 'Selected radio value',
    },
    name: {
      control: 'text',
      description: 'Radio group name',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Radio size',
    },
    layout: {
      control: { type: 'select' },
      options: ['vertical', 'horizontal'],
      description: 'Radio group layout',
    },
    required: {
      control: 'boolean',
      description: 'Mark as required field',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable entire radio group',
    },
    error: {
      control: 'boolean',
      description: 'Show error state',
    },
  },
};

const Template = (args) => {
  const container = document.createElement('div');
  container.style.cssText = 'padding: 24px; max-width: 400px;';
  
  const radioGroup = document.createElement('my-radio-group');
  
  // Set properties
  if (args.label) radioGroup.setAttribute('label', args.label);
  if (args.value) radioGroup.setAttribute('value', args.value);
  if (args.name) radioGroup.setAttribute('name', args.name);
  if (args.size && args.size !== 'md') radioGroup.setAttribute('size', args.size);
  if (args.layout && args.layout !== 'vertical') radioGroup.setAttribute('layout', args.layout);
  if (args.required) radioGroup.setAttribute('required', '');
  if (args.disabled) radioGroup.setAttribute('disabled', '');
  if (args.error) radioGroup.setAttribute('error', '');

  // Add sample radio options
  const options = [
    { value: 'option1', label: 'First Option' },
    { value: 'option2', label: 'Second Option' },
    { value: 'option3', label: 'Third Option' },
  ];
  
  options.forEach(option => {
    const radio = document.createElement('my-radio');
    radio.setAttribute('value', option.value);
    radio.setAttribute('label', option.label);
    radioGroup.appendChild(radio);
  });
  
  // Add event listener for demonstration
  radioGroup.addEventListener('change', (event) => {
    console.log('Radio group changed:', event.detail);
  });
  
  container.appendChild(radioGroup);
  
  return container;
};

// Default story
export const Default = Template.bind({});
Default.args = {
  label: 'Choose an option',
  value: 'option1',
  name: 'default-radio-group',
  size: 'md',
  layout: 'vertical',
  required: false,
  disabled: false,
  error: false,
};

// Layout variants
export const Layouts = () => {
  const container = document.createElement('div');
  container.style.cssText = 'padding: 24px; display: flex; flex-direction: column; gap: 32px;';
  
  // Vertical layout
  const verticalGroup = document.createElement('my-radio-group');
  verticalGroup.setAttribute('label', 'Vertical Layout');
  verticalGroup.setAttribute('name', 'vertical-group');
  verticalGroup.setAttribute('value', 'vertical2');
  
  ['Vertical Option 1', 'Vertical Option 2', 'Vertical Option 3'].forEach((label, index) => {
    const radio = document.createElement('my-radio');
    radio.setAttribute('value', `vertical${index + 1}`);
    radio.setAttribute('label', label);
    verticalGroup.appendChild(radio);
  });
  
  // Horizontal layout
  const horizontalGroup = document.createElement('my-radio-group');
  horizontalGroup.setAttribute('label', 'Horizontal Layout');
  horizontalGroup.setAttribute('name', 'horizontal-group');
  horizontalGroup.setAttribute('layout', 'horizontal');
  horizontalGroup.setAttribute('value', 'horizontal1');
  
  ['Option A', 'Option B', 'Option C'].forEach((label, index) => {
    const radio = document.createElement('my-radio');
    radio.setAttribute('value', `horizontal${index + 1}`);
    radio.setAttribute('label', label);
    horizontalGroup.appendChild(radio);
  });
  
  container.appendChild(verticalGroup);
  container.appendChild(horizontalGroup);
  
  return container;
};
Layouts.parameters = {
  docs: {
    description: {
      story: 'Radio groups can be arranged vertically or horizontally.',
    },
  },
};

// Size variants
export const Sizes = () => {
  const container = document.createElement('div');
  container.style.cssText = 'padding: 24px; display: flex; flex-direction: column; gap: 32px;';
  
  const sizes = [
    { size: 'sm', label: 'Small Size' },
    { size: 'md', label: 'Medium Size' },
    { size: 'lg', label: 'Large Size' },
  ];
  
  sizes.forEach(({ size, label }) => {
    const radioGroup = document.createElement('my-radio-group');
    radioGroup.setAttribute('label', label);
    radioGroup.setAttribute('name', `${size}-group`);
    radioGroup.setAttribute('size', size);
    radioGroup.setAttribute('value', `${size}2`);
    
    ['First', 'Second', 'Third'].forEach((optionLabel, index) => {
      const radio = document.createElement('my-radio');
      radio.setAttribute('value', `${size}${index + 1}`);
      radio.setAttribute('label', `${optionLabel} ${label.split(' ')[0]} Option`);
      radioGroup.appendChild(radio);
    });
    
    container.appendChild(radioGroup);
  });
  
  return container;
};
Sizes.parameters = {
  docs: {
    description: {
      story: 'Radio components come in three sizes: small, medium, and large.',
    },
  },
};

// States showcase
export const States = () => {
  const container = document.createElement('div');
  container.style.cssText = 'padding: 24px; display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 32px;';
  
  // Normal state
  const normalGroup = document.createElement('my-radio-group');
  normalGroup.setAttribute('label', 'Normal State');
  normalGroup.setAttribute('name', 'normal-group');
  normalGroup.setAttribute('value', 'normal2');
  
  ['Option 1', 'Option 2', 'Option 3'].forEach((label, index) => {
    const radio = document.createElement('my-radio');
    radio.setAttribute('value', `normal${index + 1}`);
    radio.setAttribute('label', label);
    normalGroup.appendChild(radio);
  });
  
  // Required state
  const requiredGroup = document.createElement('my-radio-group');
  requiredGroup.setAttribute('label', 'Required State');
  requiredGroup.setAttribute('name', 'required-group');
  requiredGroup.setAttribute('required', '');
  
  ['Required Option 1', 'Required Option 2', 'Required Option 3'].forEach((label, index) => {
    const radio = document.createElement('my-radio');
    radio.setAttribute('value', `required${index + 1}`);
    radio.setAttribute('label', label);
    requiredGroup.appendChild(radio);
  });
  
  // Error state
  const errorGroup = document.createElement('my-radio-group');
  errorGroup.setAttribute('label', 'Error State');
  errorGroup.setAttribute('name', 'error-group');
  errorGroup.setAttribute('error', '');
  errorGroup.setAttribute('value', 'error1');
  
  ['Error Option 1', 'Error Option 2', 'Error Option 3'].forEach((label, index) => {
    const radio = document.createElement('my-radio');
    radio.setAttribute('value', `error${index + 1}`);
    radio.setAttribute('label', label);
    errorGroup.appendChild(radio);
  });
  
  // Disabled state
  const disabledGroup = document.createElement('my-radio-group');
  disabledGroup.setAttribute('label', 'Disabled State');
  disabledGroup.setAttribute('name', 'disabled-group');
  disabledGroup.setAttribute('disabled', '');
  disabledGroup.setAttribute('value', 'disabled2');
  
  ['Disabled Option 1', 'Disabled Option 2', 'Disabled Option 3'].forEach((label, index) => {
    const radio = document.createElement('my-radio');
    radio.setAttribute('value', `disabled${index + 1}`);
    radio.setAttribute('label', label);
    disabledGroup.appendChild(radio);
  });
  
  container.appendChild(normalGroup);
  container.appendChild(requiredGroup);
  container.appendChild(errorGroup);
  container.appendChild(disabledGroup);
  
  return container;
};
States.parameters = {
  docs: {
    description: {
      story: 'Different states: normal, required, error, and disabled.',
    },
  },
};

// Individual radio buttons
export const IndividualRadios = () => {
  const container = document.createElement('div');
  container.style.cssText = 'padding: 24px; display: flex; flex-direction: column; gap: 24px;';
  
  const info = document.createElement('div');
  info.innerHTML = `
    <h3 style="margin: 0 0 8px 0;">Individual Radio Buttons</h3>
    <p style="margin: 0 0 16px 0; color: var(--_global-color-text-secondary);">
      Individual radio buttons can be used outside of radio groups when you need manual control.
    </p>
  `;
  
  const radioContainer = document.createElement('div');
  radioContainer.style.cssText = 'display: flex; flex-direction: column; gap: 12px;';
  
  // Individual radios with different states
  const radioStates = [
    { label: 'Normal Radio', checked: false, disabled: false },
    { label: 'Checked Radio', checked: true, disabled: false },
    { label: 'Disabled Radio', checked: false, disabled: true },
    { label: 'Disabled Checked Radio', checked: true, disabled: true },
  ];
  
  radioStates.forEach(({ label, checked, disabled }, index) => {
    const radio = document.createElement('my-radio');
    radio.setAttribute('label', label);
    radio.setAttribute('value', `individual${index + 1}`);
    radio.setAttribute('name', 'individual-radios');
    if (checked) radio.setAttribute('checked', '');
    if (disabled) radio.setAttribute('disabled', '');
    
    radio.addEventListener('change', (event) => {
      console.log('Individual radio changed:', event.detail);
    });
    
    radioContainer.appendChild(radio);
  });
  
  container.appendChild(info);
  container.appendChild(radioContainer);
  
  return container;
};
IndividualRadios.parameters = {
  docs: {
    description: {
      story: 'Individual radio buttons with various states for manual control scenarios.',
    },
  },
};

// Dynamic radio groups
export const DynamicRadioGroups = () => {
  const container = document.createElement('div');
  container.style.cssText = 'padding: 24px; max-width: 500px;';
  
  const info = document.createElement('div');
  info.innerHTML = `
    <h3 style="margin: 0 0 8px 0;">Dynamic Radio Group</h3>
    <p style="margin: 0 0 16px 0; color: var(--_global-color-text-secondary);">
      This example demonstrates dynamically adding and removing radio options.
    </p>
  `;
  
  const radioGroup = document.createElement('my-radio-group');
  radioGroup.setAttribute('label', 'Dynamic Options');
  radioGroup.setAttribute('name', 'dynamic-group');
  
  // Initial options
  const initialOptions = [
    { value: 'dynamic1', label: 'Initial Option 1' },
    { value: 'dynamic2', label: 'Initial Option 2' },
  ];
  
  let optionCounter = 3;
  
  initialOptions.forEach(option => {
    const radio = document.createElement('my-radio');
    radio.setAttribute('value', option.value);
    radio.setAttribute('label', option.label);
    radioGroup.appendChild(radio);
  });
  
  const controls = document.createElement('div');
  controls.style.cssText = 'display: flex; gap: 12px; margin-top: 16px; flex-wrap: wrap;';
  
  // Add option button
  const addButton = document.createElement('button');
  addButton.textContent = 'Add Option';
  addButton.style.cssText = 'padding: 8px 16px; background: var(--_global-color-primary); color: var(--_global-color-on-primary); border: none; border-radius: var(--_global-border-radius-md); cursor: pointer;';
  
  addButton.addEventListener('click', () => {
    const radio = document.createElement('my-radio');
    radio.setAttribute('value', `dynamic${optionCounter}`);
    radio.setAttribute('label', `Added Option ${optionCounter}`);
    radioGroup.appendChild(radio);
    optionCounter++;
  });
  
  // Remove option button
  const removeButton = document.createElement('button');
  removeButton.textContent = 'Remove Last Option';
  removeButton.style.cssText = 'padding: 8px 16px; background: var(--_global-color-error); color: var(--_global-color-on-error); border: none; border-radius: var(--_global-border-radius-md); cursor: pointer;';
  
  removeButton.addEventListener('click', () => {
    const radios = radioGroup.querySelectorAll('my-radio');
    if (radios.length > 1) {
      radios[radios.length - 1].remove();
    }
  });
  
  controls.appendChild(addButton);
  controls.appendChild(removeButton);
  
  // Selection display
  const selectionDisplay = document.createElement('div');
  selectionDisplay.style.cssText = 'margin-top: 16px; padding: 12px; background: var(--_global-color-surface-container); border-radius: var(--_global-border-radius-md);';
  selectionDisplay.innerHTML = '<strong>Selected:</strong> <span id="selected-value">None</span>';
  
  radioGroup.addEventListener('change', (event) => {
    const selectedSpan = selectionDisplay.querySelector('#selected-value');
    selectedSpan.textContent = event.detail.value || 'None';
  });
  
  container.appendChild(info);
  container.appendChild(radioGroup);
  container.appendChild(controls);
  container.appendChild(selectionDisplay);
  
  return container;
};
DynamicRadioGroups.parameters = {
  docs: {
    description: {
      story: 'Dynamic radio group demonstration with add/remove functionality.',
    },
  },
};

// Keyboard navigation
export const KeyboardNavigation = () => {
  const container = document.createElement('div');
  container.style.cssText = 'padding: 24px; max-width: 500px;';
  
  const info = document.createElement('div');
  info.innerHTML = `
    <h3 style="margin: 0 0 8px 0;">Keyboard Navigation</h3>
    <div style="margin: 0 0 16px 0; color: var(--_global-color-text-secondary);">
      <p style="margin: 0 0 8px 0;">Try these keyboard shortcuts:</p>
      <ul style="margin: 0; line-height: 1.6;">
        <li><strong>Arrow Keys:</strong> Navigate between options</li>
        <li><strong>Space:</strong> Select focused option</li>
        <li><strong>Home:</strong> Go to first option</li>
        <li><strong>End:</strong> Go to last option</li>
      </ul>
    </div>
  `;
  
  const radioGroup = document.createElement('my-radio-group');
  radioGroup.setAttribute('label', 'Use keyboard to navigate');
  radioGroup.setAttribute('name', 'keyboard-group');
  radioGroup.setAttribute('value', 'keyboard2');
  
  const keyboardOptions = [
    'First keyboard option',
    'Second keyboard option', 
    'Third keyboard option',
    'Fourth keyboard option',
    'Fifth keyboard option'
  ];
  
  keyboardOptions.forEach((label, index) => {
    const radio = document.createElement('my-radio');
    radio.setAttribute('value', `keyboard${index + 1}`);
    radio.setAttribute('label', label);
    radioGroup.appendChild(radio);
  });
  
  // Focus the radio group for immediate keyboard interaction
  setTimeout(() => {
    const firstRadio = radioGroup.querySelector('my-radio');
    if (firstRadio) {
      firstRadio.focus();
    }
  }, 100);
  
  const selectionDisplay = document.createElement('div');
  selectionDisplay.style.cssText = 'margin-top: 16px; padding: 12px; background: var(--_global-color-surface-container); border-radius: var(--_global-border-radius-md);';
  selectionDisplay.innerHTML = '<strong>Selected:</strong> <span id="kb-selected-value">keyboard2</span>';
  
  radioGroup.addEventListener('change', (event) => {
    const selectedSpan = selectionDisplay.querySelector('#kb-selected-value');
    selectedSpan.textContent = event.detail.value;
  });
  
  container.appendChild(info);
  container.appendChild(radioGroup);
  container.appendChild(selectionDisplay);
  
  return container;
};
KeyboardNavigation.parameters = {
  docs: {
    description: {
      story: 'Comprehensive keyboard navigation support with arrow keys, space, home, and end.',
    },
  },
};

// Accessibility features
export const Accessibility = () => {
  const container = document.createElement('div');
  container.style.cssText = 'padding: 24px; max-width: 600px;';
  
  const info = document.createElement('div');
  info.innerHTML = `
    <h3 style="margin: 0 0 8px 0;">Accessibility Features</h3>
    <ul style="margin: 0 0 24px 0; color: var(--_global-color-text-secondary); line-height: 1.6;">
      <li>Proper ARIA roles and attributes</li>
      <li>Keyboard navigation support</li>
      <li>Screen reader announcements</li>
      <li>Focus management</li>
      <li>High contrast mode support</li>
      <li>Reduced motion preferences</li>
    </ul>
  `;
  
  const radioGroup = document.createElement('my-radio-group');
  radioGroup.setAttribute('label', 'Accessibility Test Group');
  radioGroup.setAttribute('name', 'accessibility-group');
  radioGroup.setAttribute('required', '');
  
  const accessibilityOptions = [
    'Screen reader friendly option',
    'Keyboard navigation test',
    'Focus management demo',
    'ARIA attributes test'
  ];
  
  accessibilityOptions.forEach((label, index) => {
    const radio = document.createElement('my-radio');
    radio.setAttribute('value', `a11y${index + 1}`);
    radio.setAttribute('label', label);
    radioGroup.appendChild(radio);
  });
  
  container.appendChild(info);
  container.appendChild(radioGroup);
  
  return container;
};
Accessibility.parameters = {
  docs: {
    description: {
      story: 'Comprehensive accessibility features for inclusive user experience.',
    },
  },
};