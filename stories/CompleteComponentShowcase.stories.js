/**
 * Complete MyntUI Component Showcase
 * Comprehensive demonstration of all components with all variants and states
 * This showcases every component mentioned in CONTRIBUTING.md requirements
 */

// Import all MyntUI components
import '../src/components/my-input/my-input.js';
import '../src/components/my-button/my-button.js';
import '../src/components/my-checkbox/my-checkbox.js';
import '../src/components/my-toggle/my-toggle.js';
import '../src/components/my-radio-group/my-radio-group.js';
import '../src/components/my-radio/my-radio.js';
import '../src/components/my-dropdown/my-dropdown.js';
import '../src/components/my-tooltip/my-tooltip.js';
import '../src/components/my-modal/my-modal.js';
import '../src/components/my-drawer/my-drawer.js';
import '../src/components/my-notification/my-notification.js';
import '../src/components/my-data-list/my-data-list.js';
import '../src/components/my-data-table/my-data-table.js';
import '../src/components/my-data-chart/my-data-chart.js';
import '../src/components/my-gauge/my-gauge.js';
import '../src/components/my-progress/my-progress.js';
import '../src/components/my-sparkline/my-sparkline.js';
import '../src/components/my-icon/my-icon.js';

export default {
  title: 'Complete Showcase/All Components',
  parameters: {
    docs: {
      description: {
        component: 'Complete showcase of all MyntUI components with all variants, states, and input types as specified in CONTRIBUTING.md. This demonstrates the entire component library in action.',
      },
    },
    layout: 'fullscreen',
  },
};

// Complete showcase with all components and variants
export const CompleteShowcase = () => {
  const container = document.createElement('div');
  container.style.cssText = `
    padding: 32px;
    display: flex;
    flex-direction: column;
    gap: 48px;
    max-width: 1400px;
    margin: 0 auto;
    font-family: var(--_global-font-family-sans, 'Inter', system-ui, sans-serif);
  `;

  // Title
  const title = document.createElement('h1');
  title.textContent = 'MyntUI Complete Component Showcase';
  title.style.cssText = `
    text-align: center;
    font-size: 2.5rem;
    font-weight: var(--_global-font-weight-bold, 700);
    color: var(--_global-color-text-primary, #1a1a1a);
    margin: 0;
  `;

  // Subtitle
  const subtitle = document.createElement('p');
  subtitle.textContent = 'A comprehensive display of all components, variants, and input types';
  subtitle.style.cssText = `
    text-align: center;
    font-size: 1.125rem;
    color: var(--_global-color-text-secondary, #666);
    margin: 0;
  `;

  container.appendChild(title);
  container.appendChild(subtitle);

  // Input Components Section - All Required Input Types
  const inputSection = createSection('Input Components - All Types', 'Complete showcase of all 17 required input types from CONTRIBUTING.md');
  const inputGrid = document.createElement('div');
  inputGrid.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 24px;';

  const inputTypes = [
    { type: 'text', label: 'Text Input', placeholder: 'Enter text here', helperText: 'Basic text input' },
    { type: 'pattern', label: 'Pattern Input', placeholder: 'ABC123', pattern: '[A-Z]{3}[0-9]{3}', helperText: 'Format: ABC123' },
    { type: 'number', label: 'Number Input', placeholder: '42', min: '0', max: '100', helperText: 'Numeric values only' },
    { type: 'integer', label: 'Integer Input', placeholder: '25', min: '1', step: '1', helperText: 'Whole numbers only' },
    { type: 'date', label: 'Date Input', helperText: 'Select a date' },
    { type: 'datetime-local', label: 'DateTime Input', helperText: 'Date and time' },
    { type: 'time', label: 'Time Input', helperText: 'Time selection' },
    { type: 'date-of-birth', label: 'Date of Birth', helperText: 'Special date picker for DOB' },
    { type: 'email', label: 'Email Input', placeholder: 'user@example.com', helperText: 'Valid email address' },
    { type: 'password', label: 'Password Input', placeholder: 'Enter password', helperText: 'Secure password' },
    { type: 'url', label: 'URL Input', placeholder: 'https://example.com', helperText: 'Valid URL' },
    { type: 'tel', label: 'Phone Input', placeholder: '+1 (555) 123-4567', helperText: 'Phone number' },
    { type: 'textarea', label: 'Textarea', placeholder: 'Multiple lines of text...', helperText: 'Multi-line text input' },
    {
      type: 'select',
      label: 'Select Input',
      helperText: 'Choose an option',
      options: [
        { label: 'Option 1', value: 'opt1' },
        { label: 'Option 2', value: 'opt2' },
        { label: 'Option 3', value: 'opt3' }
      ]
    },
    { type: 'dynamic-select', label: 'Dynamic Select', placeholder: 'Start typing...', helperText: 'Searchable select' },
    { type: 'checkbox', label: 'Agree to terms', helperText: 'Checkbox input' },
    { type: 'radio', label: 'Radio option', helperText: 'Single radio input' }
  ];

  inputTypes.forEach(input => {
    const inputCard = createInputCard(input);
    inputGrid.appendChild(inputCard);
  });

  inputSection.appendChild(inputGrid);
  container.appendChild(inputSection);

  // Button Components Section
  const buttonSection = createSection('Button Components', 'Various button variants and states');
  const buttonGrid = document.createElement('div');
  buttonGrid.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 24px; align-items: start;';

  const buttonVariants = [
    { label: 'Primary Button', variant: 'primary' },
    { label: 'Secondary Button', variant: 'secondary' },
    { label: 'Tertiary Button', variant: 'tertiary' },
    { label: 'Ghost Button', variant: 'ghost' },
    { label: 'Disabled Button', variant: 'primary', disabled: true },
    { label: 'Loading Button', variant: 'primary', loading: true }
  ];

  buttonVariants.forEach(btn => {
    const button = document.createElement('my-button');
    button.setAttribute('label', btn.label);
    if (btn.variant) button.setAttribute('variant', btn.variant);
    if (btn.disabled) button.setAttribute('disabled', '');
    if (btn.loading) button.setAttribute('loading', '');
    
    const buttonCard = createCard(btn.label);
    buttonCard.appendChild(button);
    buttonGrid.appendChild(buttonCard);
  });

  buttonSection.appendChild(buttonGrid);
  container.appendChild(buttonSection);

  // Boolean Input Components Section
  const booleanSection = createSection('Boolean Input Components', 'Toggles, checkboxes, and radio groups');
  const booleanGrid = document.createElement('div');
  booleanGrid.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px;';

  // Toggle examples
  const toggleCard = createCard('Toggle Switches');
  const toggles = [
    { label: 'Enable notifications', checked: true },
    { label: 'Dark mode', checked: false },
    { label: 'Auto-save', checked: true, disabled: true },
    { label: 'Disabled toggle', checked: false, disabled: true }
  ];

  toggles.forEach(toggle => {
    const toggleEl = document.createElement('my-toggle');
    toggleEl.setAttribute('label', toggle.label);
    if (toggle.checked) toggleEl.setAttribute('checked', '');
    if (toggle.disabled) toggleEl.setAttribute('disabled', '');
    toggleEl.style.marginBottom = '12px';
    toggleCard.appendChild(toggleEl);
  });
  booleanGrid.appendChild(toggleCard);

  // Checkbox examples
  const checkboxCard = createCard('Checkboxes');
  const checkboxes = [
    { label: 'Accept terms', checked: true },
    { label: 'Subscribe to newsletter', checked: false },
    { label: 'Indeterminate state', indeterminate: true },
    { label: 'Disabled checkbox', checked: false, disabled: true }
  ];

  checkboxes.forEach(checkbox => {
    const checkboxEl = document.createElement('my-checkbox');
    checkboxEl.setAttribute('label', checkbox.label);
    if (checkbox.checked) checkboxEl.setAttribute('checked', '');
    if (checkbox.indeterminate) checkboxEl.setAttribute('indeterminate', '');
    if (checkbox.disabled) checkboxEl.setAttribute('disabled', '');
    checkboxEl.style.marginBottom = '12px';
    checkboxCard.appendChild(checkboxEl);
  });
  booleanGrid.appendChild(checkboxCard);

  // Radio Group examples
  const radioCard = createCard('Radio Groups');
  
  // Vertical radio group
  const verticalRadioGroup = document.createElement('my-radio-group');
  verticalRadioGroup.setAttribute('label', 'Choose size');
  verticalRadioGroup.setAttribute('name', 'size-group');
  verticalRadioGroup.setAttribute('value', 'medium');
  
  ['Small', 'Medium', 'Large'].forEach(size => {
    const radio = document.createElement('my-radio');
    radio.setAttribute('value', size.toLowerCase());
    radio.setAttribute('label', size);
    verticalRadioGroup.appendChild(radio);
  });
  
  radioCard.appendChild(verticalRadioGroup);
  
  // Horizontal radio group
  const horizontalRadioGroup = document.createElement('my-radio-group');
  horizontalRadioGroup.setAttribute('label', 'Choose color');
  horizontalRadioGroup.setAttribute('name', 'color-group');
  horizontalRadioGroup.setAttribute('layout', 'horizontal');
  horizontalRadioGroup.setAttribute('value', 'blue');
  horizontalRadioGroup.style.marginTop = '24px';
  
  ['Red', 'Green', 'Blue'].forEach(color => {
    const radio = document.createElement('my-radio');
    radio.setAttribute('value', color.toLowerCase());
    radio.setAttribute('label', color);
    horizontalRadioGroup.appendChild(radio);
  });
  
  radioCard.appendChild(horizontalRadioGroup);
  booleanGrid.appendChild(radioCard);

  booleanSection.appendChild(booleanGrid);
  container.appendChild(booleanSection);

  // Interactive Components Section
  const interactiveSection = createSection('Interactive Components', 'Dropdowns, tooltips, and modals');
  const interactiveGrid = document.createElement('div');
  interactiveGrid.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 24px;';

  // Dropdown
  const dropdownCard = createCard('Dropdown Menu');
  const dropdown = document.createElement('my-dropdown');
  dropdown.setAttribute('label', 'Options Menu');
  const dropdownOptions = [
    { label: 'Edit', value: 'edit' },
    { label: 'Delete', value: 'delete' },
    { label: 'Share', value: 'share' }
  ];
  dropdown.options = dropdownOptions;
  dropdownCard.appendChild(dropdown);
  interactiveGrid.appendChild(dropdownCard);

  // Tooltip
  const tooltipCard = createCard('Tooltip');
  const tooltipWrapper = document.createElement('my-tooltip');
  tooltipWrapper.setAttribute('text', 'This is a helpful tooltip message');
  const tooltipButton = document.createElement('my-button');
  tooltipButton.setAttribute('label', 'Hover for tooltip');
  tooltipButton.setAttribute('variant', 'secondary');
  tooltipWrapper.appendChild(tooltipButton);
  tooltipCard.appendChild(tooltipWrapper);
  interactiveGrid.appendChild(tooltipCard);

  // Modal trigger
  const modalCard = createCard('Modal Dialog');
  const modalButton = document.createElement('my-button');
  modalButton.setAttribute('label', 'Open Modal');
  modalButton.setAttribute('variant', 'primary');
  modalButton.addEventListener('click', () => {
    const modal = document.createElement('my-modal');
    modal.setAttribute('title', 'Example Modal');
    modal.setAttribute('open', '');
    modal.innerHTML = `
      <div slot="body">
        <p>This is modal content. Modals are injected into the document body for proper layering.</p>
      </div>
      <div slot="footer">
        <my-button variant="text" onclick="this.closest('my-modal').remove()">Cancel</my-button>
        <my-button variant="primary" onclick="this.closest('my-modal').remove()">OK</my-button>
      </div>
    `;
    document.body.appendChild(modal);
  });
  modalCard.appendChild(modalButton);
  interactiveGrid.appendChild(modalCard);

  interactiveSection.appendChild(interactiveGrid);
  container.appendChild(interactiveSection);

  // Data Visualization Section
  const dataSection = createSection('Data Visualization Components', 'Progress bars, gauges, and sparklines');
  const dataGrid = document.createElement('div');
  dataGrid.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px;';

  // Progress bars
  const progressCard = createCard('Progress Indicators');
  const progressTypes = [
    { label: 'Basic Progress', value: 75 },
    { label: 'Success Progress', value: 100, variant: 'success' },
    { label: 'Warning Progress', value: 60, variant: 'warning' },
    { label: 'Error Progress', value: 30, variant: 'error' }
  ];

  progressTypes.forEach(progress => {
    const progressEl = document.createElement('my-progress');
    progressEl.setAttribute('label', progress.label);
    progressEl.setAttribute('value', progress.value.toString());
    if (progress.variant) progressEl.setAttribute('variant', progress.variant);
    progressEl.style.marginBottom = '16px';
    progressCard.appendChild(progressEl);
  });
  dataGrid.appendChild(progressCard);

  // Gauges
  const gaugeCard = createCard('Gauge Components');
  const gauges = [
    { label: 'CPU Usage', value: 65, min: 0, max: 100 },
    { label: 'Memory', value: 45, min: 0, max: 100 },
    { label: 'Disk Space', value: 85, min: 0, max: 100 }
  ];

  gauges.forEach(gauge => {
    const gaugeEl = document.createElement('my-gauge');
    gaugeEl.setAttribute('label', gauge.label);
    gaugeEl.setAttribute('value', gauge.value.toString());
    gaugeEl.setAttribute('min', gauge.min.toString());
    gaugeEl.setAttribute('max', gauge.max.toString());
    gaugeEl.style.marginBottom = '16px';
    gaugeCard.appendChild(gaugeEl);
  });
  dataGrid.appendChild(gaugeCard);

  // Sparklines
  const sparklineCard = createCard('Sparkline Trends');
  const sparklineData = [12, 19, 3, 5, 2, 3, 20, 15, 8, 10, 25, 18, 22];
  const sparkline = document.createElement('my-sparkline');
  sparkline.data = sparklineData;
  sparkline.setAttribute('color', 'var(--_global-color-primary, #6366f1)');
  sparklineCard.appendChild(sparkline);
  
  const sparkline2 = document.createElement('my-sparkline');
  sparkline2.data = [5, 8, 12, 15, 10, 8, 12, 18, 20, 15, 12, 8, 10];
  sparkline2.setAttribute('color', 'var(--_global-color-success, #10b981)');
  sparkline2.style.marginTop = '12px';
  sparklineCard.appendChild(sparkline2);
  dataGrid.appendChild(sparklineCard);

  dataSection.appendChild(dataGrid);
  container.appendChild(dataSection);

  // Icon Components Section
  const iconSection = createSection('Icon Components', 'Material Icons showcase');
  const iconGrid = document.createElement('div');
  iconGrid.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 16px; text-align: center;';

  const iconNames = [
    'home', 'settings', 'favorite', 'star', 'info', 'warning', 'error', 'check_circle',
    'person', 'group', 'mail', 'phone', 'location_on', 'event', 'work', 'school',
    'shopping_cart', 'payment', 'account_circle', 'notifications', 'visibility', 'edit',
    'delete', 'add', 'remove', 'search', 'menu', 'close'
  ];

  iconNames.forEach(iconName => {
    const iconCard = document.createElement('div');
    iconCard.style.cssText = `
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      padding: 16px;
      background: var(--_global-color-surface, white);
      border: 1px solid var(--_global-color-outline, #e5e5e5);
      border-radius: var(--_global-border-radius-md, 8px);
    `;

    const icon = document.createElement('my-icon');
    icon.setAttribute('icon', iconName);
    icon.style.fontSize = '24px';

    const label = document.createElement('span');
    label.textContent = iconName;
    label.style.cssText = 'font-size: 12px; color: var(--_global-color-text-secondary, #666);';

    iconCard.appendChild(icon);
    iconCard.appendChild(label);
    iconGrid.appendChild(iconCard);
  });

  iconSection.appendChild(iconGrid);
  container.appendChild(iconSection);

  return container;
};

// Input types showcase focused story
export const AllInputTypes = () => {
  const container = document.createElement('div');
  container.style.cssText = `
    padding: 32px;
    display: flex;
    flex-direction: column;
    gap: 32px;
    max-width: 1200px;
    margin: 0 auto;
  `;

  const title = document.createElement('h1');
  title.textContent = 'All 17 Required Input Types';
  title.style.cssText = 'text-align: center; margin: 0 0 16px 0; font-size: 2rem; font-weight: 700;';

  const subtitle = document.createElement('p');
  subtitle.textContent = 'Complete implementation of all input types specified in CONTRIBUTING.md';
  subtitle.style.cssText = 'text-align: center; color: #666; margin: 0 0 32px 0;';

  const grid = document.createElement('div');
  grid.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 24px;';

  // All required input types from CONTRIBUTING.md
  const allInputTypes = [
    { type: 'text', label: 'Text Input', placeholder: 'Enter your name', value: 'Sample text' },
    { type: 'pattern', label: 'Pattern Input', placeholder: 'ABC123', pattern: '[A-Z]{3}[0-9]{3}', helperText: 'Format: ABC123' },
    { type: 'number', label: 'Number Input', placeholder: '42.5', min: '0', max: '100' },
    { type: 'integer', label: 'Integer Input', placeholder: '25', min: '1', step: '1' },
    { type: 'date', label: 'Date Input', value: '2024-01-15' },
    { type: 'datetime-local', label: 'DateTime Local', value: '2024-01-15T10:30' },
    { type: 'time', label: 'Time Input', value: '14:30' },
    { type: 'date-of-birth', label: 'Date of Birth', helperText: 'Special DOB picker' },
    { type: 'email', label: 'Email Input', placeholder: 'user@example.com', value: 'test@example.com' },
    { type: 'password', label: 'Password Input', placeholder: 'Enter password' },
    { type: 'url', label: 'URL Input', placeholder: 'https://example.com', value: 'https://github.com' },
    { type: 'tel', label: 'Telephone Input', placeholder: '+1 (555) 123-4567', value: '+1 555 123 4567' },
    { type: 'textarea', label: 'Textarea Input', placeholder: 'Multi-line text...', value: 'This is a multi-line\\ntext area example.' },
    {
      type: 'select',
      label: 'Select Input',
      options: [
        { label: 'United States', value: 'US' },
        { label: 'Canada', value: 'CA' },
        { label: 'United Kingdom', value: 'UK' },
        { label: 'Australia', value: 'AU' }
      ],
      value: 'CA'
    },
    { type: 'dynamic-select', label: 'Dynamic Select', placeholder: 'Start typing city...', helperText: 'Searchable dropdown' },
    { type: 'checkbox', label: 'Checkbox Input', value: 'true' },
    { type: 'radio', label: 'Radio Input', value: 'true' }
  ];

  allInputTypes.forEach(input => {
    const inputCard = createInputCard(input);
    grid.appendChild(inputCard);
  });

  container.appendChild(title);
  container.appendChild(subtitle);
  container.appendChild(grid);

  return container;
};

// Component states showcase
export const ComponentStates = () => {
  const container = document.createElement('div');
  container.style.cssText = `
    padding: 32px;
    display: flex;
    flex-direction: column;
    gap: 32px;
    max-width: 1200px;
    margin: 0 auto;
  `;

  const title = document.createElement('h1');
  title.textContent = 'Component States & Variants';
  title.style.cssText = 'text-align: center; margin: 0 0 32px 0; font-size: 2rem; font-weight: 700;';

  // Input states
  const inputStatesSection = createSection('Input States', 'All input states and variants');
  const inputStatesGrid = document.createElement('div');
  inputStatesGrid.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px;';

  const inputStates = [
    { state: 'Normal', props: { label: 'Normal State', placeholder: 'Enter text' } },
    { state: 'Filled', props: { label: 'Filled State', value: 'Sample value' } },
    { state: 'Focused', props: { label: 'Focused State', placeholder: 'Focused input', autofocus: true } },
    { state: 'Required', props: { label: 'Required Field', placeholder: 'Required input', required: true } },
    { state: 'Disabled', props: { label: 'Disabled State', placeholder: 'Cannot edit', disabled: true } },
    { state: 'Read Only', props: { label: 'Read Only', value: 'Read only value', readonly: true } },
    { state: 'With Helper', props: { label: 'With Helper Text', placeholder: 'Input with help', helperText: 'This is helper text' } },
    { state: 'Character Count', props: { label: 'Character Count', placeholder: 'Type here...', maxlength: '50', characterCount: true } }
  ];

  inputStates.forEach(({ state, props }) => {
    const card = createCard(state + ' Input');
    const input = document.createElement('my-input');
    
    Object.entries(props).forEach(([key, value]) => {
      if (typeof value === 'boolean' && value) {
        input.setAttribute(key.replace(/([A-Z])/g, '-$1').toLowerCase(), '');
      } else if (typeof value === 'string') {
        input.setAttribute(key.replace(/([A-Z])/g, '-$1').toLowerCase(), value);
      }
    });

    card.appendChild(input);
    inputStatesGrid.appendChild(card);
  });

  inputStatesSection.appendChild(inputStatesGrid);
  container.appendChild(inputStatesSection);

  return container;
};

// Helper function to create a section
function createSection(title, description) {
  const section = document.createElement('section');
  section.style.cssText = 'display: flex; flex-direction: column; gap: 24px;';

  const header = document.createElement('div');
  header.style.cssText = 'text-align: center;';

  const titleEl = document.createElement('h2');
  titleEl.textContent = title;
  titleEl.style.cssText = `
    font-size: 1.75rem;
    font-weight: var(--_global-font-weight-bold, 700);
    color: var(--_global-color-text-primary, #1a1a1a);
    margin: 0 0 8px 0;
  `;

  const descEl = document.createElement('p');
  descEl.textContent = description;
  descEl.style.cssText = `
    font-size: 1rem;
    color: var(--_global-color-text-secondary, #666);
    margin: 0;
  `;

  header.appendChild(titleEl);
  header.appendChild(descEl);
  section.appendChild(header);

  return section;
}

// Helper function to create a card
function createCard(title) {
  const card = document.createElement('div');
  card.style.cssText = `
    padding: 24px;
    background: var(--_global-color-surface, white);
    border: 1px solid var(--_global-color-outline, #e5e5e5);
    border-radius: var(--_global-border-radius-lg, 12px);
    display: flex;
    flex-direction: column;
    gap: 16px;
  `;

  const cardTitle = document.createElement('h3');
  cardTitle.textContent = title;
  cardTitle.style.cssText = `
    font-size: 1.125rem;
    font-weight: var(--_global-font-weight-medium, 600);
    color: var(--_global-color-text-primary, #1a1a1a);
    margin: 0;
  `;

  card.appendChild(cardTitle);
  return card;
}

// Helper function to create input cards
function createInputCard(input) {
  const card = createCard(`${input.type.charAt(0).toUpperCase() + input.type.slice(1)} Input`);
  
  const inputEl = document.createElement('my-input');
  inputEl.setAttribute('type', input.type);
  inputEl.setAttribute('label', input.label);
  
  if (input.placeholder) inputEl.setAttribute('placeholder', input.placeholder);
  if (input.value) inputEl.setAttribute('value', input.value);
  if (input.helperText) inputEl.setAttribute('helper-text', input.helperText);
  if (input.pattern) inputEl.setAttribute('pattern', input.pattern);
  if (input.min) inputEl.setAttribute('min', input.min);
  if (input.max) inputEl.setAttribute('max', input.max);
  if (input.step) inputEl.setAttribute('step', input.step);
  if (input.maxlength) inputEl.setAttribute('maxlength', input.maxlength);
  if (input.required) inputEl.setAttribute('required', '');
  if (input.disabled) inputEl.setAttribute('disabled', '');
  if (input.readonly) inputEl.setAttribute('readonly', '');

  if (input.options) {
    const schema = {
      type: input.type,
      label: input.label,
      options: input.options,
      placeholder: input.placeholder,
      helperText: input.helperText
    };
    inputEl.setAttribute('schema', JSON.stringify(schema));
  }

  card.appendChild(inputEl);
  return card;
}