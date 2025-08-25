/**
 * Enhanced Component Showcase for MyntUI
 * Comprehensive display of all components with their variants, states, and interactions
 */

import '../src/components/my-button/my-button.js';
import '../src/components/my-input/my-input.js';
import '../src/components/my-icon/my-icon.js';
import '../src/components/my-checkbox/my-checkbox.js';
import '../src/components/my-toggle/my-toggle.js';
import '../src/components/my-radio/my-radio.js';
import '../src/components/my-radio-group/my-radio-group.js';
import '../src/components/my-progress/my-progress.js';
import '../src/components/my-gauge/my-gauge.js';
import '../src/components/my-sparkline/my-sparkline.js';
import '../src/components/my-dropdown/my-dropdown.js';
import '../src/components/my-tooltip/my-tooltip.js';
import '../src/components/my-modal/my-modal.js';
import '../src/components/my-notification/my-notification.js';
import '../src/components/my-data-table/my-data-table.js';

export default {
  title: 'Enhanced Showcase/Complete Component Gallery',
  parameters: {
    docs: {
      description: {
        component: 'A comprehensive showcase of all MyntUI components with enhanced styling, variants, and interactive demonstrations.',
      },
    },
    layout: 'fullscreen',
  },
};

// Create section wrapper with enhanced styling
const createSection = (title, description, content) => {
  const section = document.createElement('div');
  section.className = 'showcase-section';
  section.style.cssText = `
    margin: 32px 0;
    padding: 32px;
    background: linear-gradient(135deg, 
      var(--_global-color-surface-container-low) 0%, 
      var(--_global-color-surface-container) 100%);
    border: 1px solid var(--_global-color-outline-variant);
    border-radius: var(--_global-border-radius-lg);
    box-shadow: var(--_global-elevation-1);
    backdrop-filter: blur(10px);
    transition: all 400ms var(--_global-motion-easing-standard);
  `;

  const header = document.createElement('div');
  header.className = 'section-header';
  header.style.cssText = `
    margin-bottom: 24px;
    padding-bottom: 16px;
    border-bottom: 2px solid var(--_global-color-primary-container);
  `;

  const titleEl = document.createElement('h2');
  titleEl.textContent = title;
  titleEl.style.cssText = `
    margin: 0 0 8px 0;
    font: var(--_global-typography-headline-medium);
    color: var(--_global-color-primary);
    text-shadow: 0 1px 2px rgba(0,0,0,0.1);
  `;

  const descEl = document.createElement('p');
  descEl.textContent = description;
  descEl.style.cssText = `
    margin: 0;
    font: var(--_global-typography-body-medium);
    color: var(--_global-color-text-secondary);
    opacity: 0.9;
  `;

  header.appendChild(titleEl);
  header.appendChild(descEl);
  
  const contentEl = document.createElement('div');
  contentEl.className = 'section-content';
  contentEl.style.cssText = `
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
    align-items: flex-start;
  `;
  
  if (typeof content === 'function') {
    content(contentEl);
  } else {
    contentEl.appendChild(content);
  }

  section.appendChild(header);
  section.appendChild(contentEl);
  
  return section;
};

// Create demo card with hover effects
const createDemoCard = (title, content) => {
  const card = document.createElement('div');
  card.className = 'demo-card';
  card.style.cssText = `
    flex: 0 1 calc(33.333% - 16px);
    min-width: 280px;
    padding: 24px;
    background: var(--_global-color-surface-container-lowest);
    border: 1px solid var(--_global-color-outline-variant);
    border-radius: var(--_global-border-radius-md);
    box-shadow: var(--_global-elevation-1);
    transition: all 300ms var(--_global-motion-easing-emphasized);
    cursor: default;
  `;

  // Add hover effects
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-2px) scale(1.01)';
    card.style.boxShadow = 'var(--_global-elevation-3)';
    card.style.borderColor = 'var(--_global-color-primary)';
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0) scale(1)';
    card.style.boxShadow = 'var(--_global-elevation-1)';
    card.style.borderColor = 'var(--_global-color-outline-variant)';
  });

  const titleEl = document.createElement('h3');
  titleEl.textContent = title;
  titleEl.style.cssText = `
    margin: 0 0 16px 0;
    font: var(--_global-typography-title-medium);
    color: var(--_global-color-text-primary);
  `;

  const contentEl = document.createElement('div');
  contentEl.style.cssText = `
    display: flex;
    flex-direction: column;
    gap: 16px;
  `;

  card.appendChild(titleEl);
  card.appendChild(contentEl);
  
  if (typeof content === 'function') {
    content(contentEl);
  } else {
    contentEl.appendChild(content);
  }

  return card;
};

// Enhanced Button Showcase
export const EnhancedButtons = () => {
  const container = document.createElement('div');
  container.style.cssText = `
    padding: 20px;
    background: linear-gradient(135deg, var(--_global-color-surface) 0%, var(--_global-color-surface-container-low) 100%);
    min-height: 100vh;
  `;

  // Section 1: Material Design 3 Variants
  const buttonVariants = createSection(
    'Material Design 3 Button Variants',
    'Complete button variant system following Material Design 3 principles with enhanced visual hierarchy.',
    (contentEl) => {
      const variants = [
        { variant: 'filled', label: 'Filled', description: 'High emphasis button for primary actions' },
        { variant: 'filled-tonal', label: 'Filled Tonal', description: 'Medium emphasis alternative to filled' },
        { variant: 'elevated', label: 'Elevated', description: 'Elevated surface with subtle shadow' },
        { variant: 'outlined', label: 'Outlined', description: 'Medium emphasis with outlined border' },
        { variant: 'text', label: 'Text', description: 'Low emphasis for less important actions' }
      ];

      variants.forEach(({ variant, label, description }) => {
        const card = createDemoCard(label, (cardContent) => {
          const descEl = document.createElement('p');
          descEl.textContent = description;
          descEl.style.cssText = `
            margin: 0 0 16px 0;
            font-size: 14px;
            color: var(--_global-color-text-secondary);
          `;

          const buttonRow = document.createElement('div');
          buttonRow.style.cssText = 'display: flex; gap: 12px; flex-wrap: wrap; align-items: center;';

          // Normal button
          const normalBtn = document.createElement('my-button');
          normalBtn.setAttribute('variant', variant);
          normalBtn.setAttribute('label', 'Normal');

          // With icon
          const iconBtn = document.createElement('my-button');
          iconBtn.setAttribute('variant', variant);
          iconBtn.innerHTML = '<my-icon icon="favorite" slot="left"></my-icon>With Icon';

          // Loading state
          const loadingBtn = document.createElement('my-button');
          loadingBtn.setAttribute('variant', variant);
          loadingBtn.setAttribute('label', 'Loading');
          loadingBtn.setAttribute('loading', '');

          // Disabled state
          const disabledBtn = document.createElement('my-button');
          disabledBtn.setAttribute('variant', variant);
          disabledBtn.setAttribute('label', 'Disabled');
          disabledBtn.setAttribute('disabled', '');

          buttonRow.appendChild(normalBtn);
          buttonRow.appendChild(iconBtn);
          buttonRow.appendChild(loadingBtn);
          buttonRow.appendChild(disabledBtn);

          cardContent.appendChild(descEl);
          cardContent.appendChild(buttonRow);
        });
        contentEl.appendChild(card);
      });
    }
  );

  // Section 2: Button Sizes and Density
  const buttonSizes = createSection(
    'Size and Density System',
    'Comprehensive sizing system with density variants for different use cases.',
    (contentEl) => {
      const sizesCard = createDemoCard('Sizes', (cardContent) => {
        const sizes = ['xs', 'sm', 'md', 'lg', 'xl'];
        const sizeRow = document.createElement('div');
        sizeRow.style.cssText = 'display: flex; gap: 12px; align-items: center; flex-wrap: wrap;';

        sizes.forEach(size => {
          const btn = document.createElement('my-button');
          btn.setAttribute('size', size);
          btn.setAttribute('label', size.toUpperCase());
          sizeRow.appendChild(btn);
        });

        cardContent.appendChild(sizeRow);
      });

      const densityCard = createDemoCard('Density', (cardContent) => {
        const densities = [
          { density: 'default', label: 'Default' },
          { density: 'compact', label: 'Compact' }
        ];

        densities.forEach(({ density, label }) => {
          const header = document.createElement('h4');
          header.textContent = label;
          header.style.cssText = 'margin: 16px 0 8px 0; font-size: 14px; font-weight: 600;';

          const row = document.createElement('div');
          row.style.cssText = 'display: flex; gap: 8px; margin-bottom: 12px;';

          ['sm', 'md', 'lg'].forEach(size => {
            const btn = document.createElement('my-button');
            btn.setAttribute('size', size);
            btn.setAttribute('density', density);
            btn.setAttribute('label', size.toUpperCase());
            row.appendChild(btn);
          });

          if (density !== 'default') cardContent.appendChild(header);
          cardContent.appendChild(row);
        });
      });

      contentEl.appendChild(sizesCard);
      contentEl.appendChild(densityCard);
    }
  );

  // Section 3: Special Button Types
  const specialButtons = createSection(
    'Special Button Types',
    'Floating Action Buttons (FABs) and icon-only buttons with enhanced styling.',
    (contentEl) => {
      const fabCard = createDemoCard('Floating Action Buttons', (cardContent) => {
        const fabSizes = ['sm', 'md', 'lg', 'xl'];
        const fabRow = document.createElement('div');
        fabRow.style.cssText = 'display: flex; gap: 20px; align-items: center; flex-wrap: wrap;';

        fabSizes.forEach(size => {
          const wrapper = document.createElement('div');
          wrapper.style.cssText = 'display: flex; flex-direction: column; align-items: center; gap: 8px;';

          const fab = document.createElement('my-button');
          fab.setAttribute('fab', '');
          fab.setAttribute('size', size);
          fab.innerHTML = '<my-icon icon="add"></my-icon>';

          const label = document.createElement('span');
          label.textContent = size.toUpperCase();
          label.style.cssText = 'font-size: 12px; color: var(--_global-color-text-secondary);';

          wrapper.appendChild(fab);
          wrapper.appendChild(label);
          fabRow.appendChild(wrapper);
        });

        cardContent.appendChild(fabRow);
      });

      const iconCard = createDemoCard('Icon-Only Buttons', (cardContent) => {
        const variants = ['filled', 'outlined', 'text'];
        const icons = ['favorite', 'share', 'more_vert', 'settings'];

        const iconGrid = document.createElement('div');
        iconGrid.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fit, minmax(60px, 1fr)); gap: 12px;';

        variants.forEach(variant => {
          icons.forEach(icon => {
            const btn = document.createElement('my-button');
            btn.setAttribute('icon-only', '');
            btn.setAttribute('variant', variant);
            btn.innerHTML = `<my-icon icon="${icon}"></my-icon>`;
            iconGrid.appendChild(btn);
          });
        });

        cardContent.appendChild(iconGrid);
      });

      contentEl.appendChild(fabCard);
      contentEl.appendChild(iconCard);
    }
  );

  container.appendChild(buttonVariants);
  container.appendChild(buttonSizes);
  container.appendChild(specialButtons);

  return container;
};

// Enhanced Form Components Showcase
export const EnhancedFormComponents = () => {
  const container = document.createElement('div');
  container.style.cssText = `
    padding: 20px;
    background: linear-gradient(135deg, var(--_global-color-surface) 0%, var(--_global-color-surface-container-low) 100%);
    min-height: 100vh;
  `;

  // Input Components Section
  const inputSection = createSection(
    'Enhanced Input Components',
    'Comprehensive input system with Material Design 3 styling and advanced validation.',
    (contentEl) => {
      const inputTypesCard = createDemoCard('Input Types', (cardContent) => {
        const inputs = [
          { type: 'text', label: 'Full Name', placeholder: 'Enter your full name' },
          { type: 'email', label: 'Email', placeholder: 'user@example.com', leadingIcon: 'mail' },
          { type: 'password', label: 'Password', placeholder: 'Enter password', trailingIcon: 'visibility' },
          { type: 'number', label: 'Age', placeholder: '25' },
          { type: 'tel', label: 'Phone', placeholder: '+1 (555) 123-4567', leadingIcon: 'phone' },
          { type: 'search', label: 'Search', placeholder: 'Search...', leadingIcon: 'search' }
        ];

        const inputContainer = document.createElement('div');
        inputContainer.style.cssText = 'display: flex; flex-direction: column; gap: 20px; max-width: 400px;';

        inputs.forEach(({ type, label, placeholder, leadingIcon, trailingIcon }) => {
          const input = document.createElement('my-input');
          input.setAttribute('type', type);
          input.setAttribute('label', label);
          input.setAttribute('placeholder', placeholder);
          if (leadingIcon) input.setAttribute('leading-icon', leadingIcon);
          if (trailingIcon) input.setAttribute('trailing-icon', trailingIcon);
          inputContainer.appendChild(input);
        });

        cardContent.appendChild(inputContainer);
      });

      const inputVariantsCard = createDemoCard('Input Variants & States', (cardContent) => {
        const variants = ['outlined', 'filled'];
        
        variants.forEach(variant => {
          const variantHeader = document.createElement('h4');
          variantHeader.textContent = `${variant.charAt(0).toUpperCase()}${variant.slice(1)} Variant`;
          variantHeader.style.cssText = 'margin: 16px 0 12px 0; font-size: 14px; font-weight: 600;';

          const variantContainer = document.createElement('div');
          variantContainer.style.cssText = 'display: flex; flex-direction: column; gap: 16px; margin-bottom: 24px;';

          const states = [
            { label: 'Normal', props: {} },
            { label: 'With Value', props: { value: 'Sample text' } },
            { label: 'Disabled', props: { disabled: true } },
            { label: 'Required', props: { required: true, helperText: 'This field is required' } }
          ];

          states.forEach(({ label, props }) => {
            const input = document.createElement('my-input');
            input.setAttribute('variant', variant);
            input.setAttribute('label', label);
            input.setAttribute('placeholder', `${label} input`);
            
            Object.entries(props).forEach(([key, value]) => {
              if (typeof value === 'boolean' && value) {
                input.setAttribute(key, '');
              } else if (typeof value === 'string') {
                input.setAttribute(key, value);
              }
            });

            variantContainer.appendChild(input);
          });

          if (variant !== 'outlined') cardContent.appendChild(variantHeader);
          cardContent.appendChild(variantContainer);
        });
      });

      const inputSizesCard = createDemoCard('Input Sizes', (cardContent) => {
        const sizes = ['small', 'medium', 'large'];
        const sizeContainer = document.createElement('div');
        sizeContainer.style.cssText = 'display: flex; flex-direction: column; gap: 16px;';

        sizes.forEach(size => {
          const input = document.createElement('my-input');
          input.setAttribute('size', size);
          input.setAttribute('label', `${size.charAt(0).toUpperCase()}${size.slice(1)} Size`);
          input.setAttribute('placeholder', `${size} input field`);
          sizeContainer.appendChild(input);
        });

        cardContent.appendChild(sizeContainer);
      });

      contentEl.appendChild(inputTypesCard);
      contentEl.appendChild(inputVariantsCard);
      contentEl.appendChild(inputSizesCard);
    }
  );

  container.appendChild(inputSection);
  return container;
};

// Enhanced Boolean Input Components
export const EnhancedBooleanInputs = () => {
  const container = document.createElement('div');
  container.style.cssText = `
    padding: 20px;
    background: linear-gradient(135deg, var(--_global-color-surface) 0%, var(--_global-color-surface-container-low) 100%);
    min-height: 100vh;
  `;

  const booleanSection = createSection(
    'Enhanced Boolean Input Components',
    'Toggle switches, checkboxes, and radio buttons with improved Material Design 3 styling.',
    (contentEl) => {
      const toggleCard = createDemoCard('Toggle Switches', (cardContent) => {
        const toggleContainer = document.createElement('div');
        toggleContainer.style.cssText = 'display: flex; flex-direction: column; gap: 16px;';

        const toggleStates = [
          { label: 'Default Toggle', checked: false },
          { label: 'Checked Toggle', checked: true },
          { label: 'Disabled Toggle', checked: false, disabled: true },
          { label: 'Disabled Checked', checked: true, disabled: true }
        ];

        toggleStates.forEach(({ label, checked, disabled }) => {
          const wrapper = document.createElement('div');
          wrapper.style.cssText = 'display: flex; align-items: center; gap: 12px;';

          const toggle = document.createElement('my-toggle');
          if (checked) toggle.setAttribute('checked', '');
          if (disabled) toggle.setAttribute('disabled', '');

          const labelEl = document.createElement('span');
          labelEl.textContent = label;
          labelEl.style.cssText = `color: ${disabled ? 'var(--_global-color-text-muted)' : 'var(--_global-color-text-primary)'};`;

          wrapper.appendChild(toggle);
          wrapper.appendChild(labelEl);
          toggleContainer.appendChild(wrapper);
        });

        cardContent.appendChild(toggleContainer);
      });

      const checkboxCard = createDemoCard('Checkboxes', (cardContent) => {
        const checkboxContainer = document.createElement('div');
        checkboxContainer.style.cssText = 'display: flex; flex-direction: column; gap: 16px;';

        const checkboxStates = [
          { label: 'Accept terms and conditions', checked: false },
          { label: 'Subscribe to newsletter', checked: true },
          { label: 'Indeterminate state', indeterminate: true },
          { label: 'Disabled checkbox', checked: false, disabled: true }
        ];

        checkboxStates.forEach(({ label, checked, indeterminate, disabled }) => {
          const checkbox = document.createElement('my-checkbox');
          checkbox.setAttribute('label', label);
          if (checked) checkbox.setAttribute('checked', '');
          if (indeterminate) checkbox.setAttribute('indeterminate', '');
          if (disabled) checkbox.setAttribute('disabled', '');
          checkboxContainer.appendChild(checkbox);
        });

        cardContent.appendChild(checkboxContainer);
      });

      const radioCard = createDemoCard('Radio Groups', (cardContent) => {
        // Vertical Radio Group
        const verticalGroup = document.createElement('my-radio-group');
        verticalGroup.setAttribute('name', 'payment-method');
        verticalGroup.setAttribute('value', 'credit-card');

        const radioOptions = [
          { value: 'credit-card', label: 'Credit Card' },
          { value: 'paypal', label: 'PayPal' },
          { value: 'bank-transfer', label: 'Bank Transfer' }
        ];

        radioOptions.forEach(({ value, label }) => {
          const radio = document.createElement('my-radio');
          radio.setAttribute('value', value);
          radio.setAttribute('label', label);
          verticalGroup.appendChild(radio);
        });

        // Horizontal Radio Group
        const horizontalGroup = document.createElement('div');
        horizontalGroup.style.cssText = 'display: flex; gap: 20px; margin-top: 20px; flex-wrap: wrap;';

        const sizeOptions = [
          { value: 'small', label: 'Small' },
          { value: 'medium', label: 'Medium' },
          { value: 'large', label: 'Large' }
        ];

        sizeOptions.forEach(({ value, label }) => {
          const radio = document.createElement('my-radio');
          radio.setAttribute('name', 'size');
          radio.setAttribute('value', value);
          radio.setAttribute('label', label);
          if (value === 'medium') radio.setAttribute('checked', '');
          horizontalGroup.appendChild(radio);
        });

        const groupLabel = document.createElement('h4');
        groupLabel.textContent = 'Vertical Radio Group';
        groupLabel.style.cssText = 'margin: 0 0 12px 0; font-size: 14px; font-weight: 600;';

        const horizontalLabel = document.createElement('h4');
        horizontalLabel.textContent = 'Horizontal Radio Group';
        horizontalLabel.style.cssText = 'margin: 20px 0 12px 0; font-size: 14px; font-weight: 600;';

        cardContent.appendChild(groupLabel);
        cardContent.appendChild(verticalGroup);
        cardContent.appendChild(horizontalLabel);
        cardContent.appendChild(horizontalGroup);
      });

      contentEl.appendChild(toggleCard);
      contentEl.appendChild(checkboxCard);
      contentEl.appendChild(radioCard);
    }
  );

  container.appendChild(booleanSection);
  return container;
};

// Enhanced Data Visualization Components
export const EnhancedDataVisualization = () => {
  const container = document.createElement('div');
  container.style.cssText = `
    padding: 20px;
    background: linear-gradient(135deg, var(--_global-color-surface) 0%, var(--_global-color-surface-container-low) 100%);
    min-height: 100vh;
  `;

  const dataVizSection = createSection(
    'Enhanced Data Visualization Components',
    'Progress bars, gauges, and sparklines with improved styling and interactivity.',
    (contentEl) => {
      const progressCard = createDemoCard('Progress Bars', (cardContent) => {
        const progressTypes = [
          { value: 25, label: '25% - Basic Progress', variant: 'default' },
          { value: 50, label: '50% - Primary Progress', variant: 'primary' },
          { value: 75, label: '75% - Success Progress', variant: 'success' },
          { value: 90, label: '90% - Warning Progress', variant: 'warning' }
        ];

        const progressContainer = document.createElement('div');
        progressContainer.style.cssText = 'display: flex; flex-direction: column; gap: 20px;';

        progressTypes.forEach(({ value, label, variant }) => {
          const wrapper = document.createElement('div');
          wrapper.style.cssText = 'display: flex; flex-direction: column; gap: 8px;';

          const labelEl = document.createElement('span');
          labelEl.textContent = label;
          labelEl.style.cssText = 'font-size: 14px; font-weight: 500; color: var(--_global-color-text-primary);';

          const progress = document.createElement('my-progress');
          progress.setAttribute('value', value.toString());
          progress.setAttribute('variant', variant);

          wrapper.appendChild(labelEl);
          wrapper.appendChild(progress);
          progressContainer.appendChild(wrapper);
        });

        // Different sizes
        const sizeHeader = document.createElement('h4');
        sizeHeader.textContent = 'Progress Sizes';
        sizeHeader.style.cssText = 'margin: 24px 0 12px 0; font-size: 14px; font-weight: 600;';

        const sizeContainer = document.createElement('div');
        sizeContainer.style.cssText = 'display: flex; flex-direction: column; gap: 12px;';

        const sizes = ['small', 'medium', 'large'];
        sizes.forEach(size => {
          const progress = document.createElement('my-progress');
          progress.setAttribute('value', '65');
          progress.setAttribute('size', size);
          progress.setAttribute('label', `${size.charAt(0).toUpperCase()}${size.slice(1)} size`);
          sizeContainer.appendChild(progress);
        });

        progressContainer.appendChild(sizeHeader);
        progressContainer.appendChild(sizeContainer);
        cardContent.appendChild(progressContainer);
      });

      const gaugeCard = createDemoCard('Gauge Components', (cardContent) => {
        const gaugeContainer = document.createElement('div');
        gaugeContainer.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px;';

        const gaugeData = [
          { value: 65, label: 'CPU Usage', min: 0, max: 100, variant: 'primary' },
          { value: 45, label: 'Memory', min: 0, max: 100, variant: 'info' },
          { value: 85, label: 'System Load', min: 0, max: 100, variant: 'warning' },
          { value: 30, label: 'Success Rate', min: 0, max: 100, variant: 'success' }
        ];

        gaugeData.forEach(({ value, label, min, max, variant }) => {
          const gauge = document.createElement('my-gauge');
          gauge.setAttribute('value', value.toString());
          gauge.setAttribute('label', label);
          gauge.setAttribute('min', min.toString());
          gauge.setAttribute('max', max.toString());
          gauge.setAttribute('variant', variant);
          gaugeContainer.appendChild(gauge);
        });

        cardContent.appendChild(gaugeContainer);
      });

      const sparklineCard = createDemoCard('Sparklines', (cardContent) => {
        const sparklineContainer = document.createElement('div');
        sparklineContainer.style.cssText = 'display: flex; flex-direction: column; gap: 16px;';

        const sparklineData = [
          { data: [1, 3, 2, 5, 4, 6, 5, 8, 7, 9, 8, 10], label: 'Revenue Trend', color: 'var(--_global-color-success)' },
          { data: [10, 8, 9, 7, 8, 6, 7, 5, 6, 4, 5, 3], label: 'User Activity', color: 'var(--_global-color-primary)' },
          { data: [2, 4, 3, 6, 5, 7, 6, 9, 8, 10, 9, 12], label: 'System Load', color: 'var(--_global-color-warning)' }
        ];

        sparklineData.forEach(({ data, label, color }) => {
          const wrapper = document.createElement('div');
          wrapper.style.cssText = 'display: flex; align-items: center; gap: 16px; padding: 12px; border: 1px solid var(--_global-color-outline-variant); border-radius: var(--_global-border-radius-sm);';

          const labelEl = document.createElement('span');
          labelEl.textContent = label;
          labelEl.style.cssText = 'font-weight: 500; min-width: 100px;';

          const sparkline = document.createElement('my-sparkline');
          sparkline.setAttribute('data', JSON.stringify(data));
          sparkline.setAttribute('color', color);

          wrapper.appendChild(labelEl);
          wrapper.appendChild(sparkline);
          sparklineContainer.appendChild(wrapper);
        });

        cardContent.appendChild(sparklineContainer);
      });

      contentEl.appendChild(progressCard);
      contentEl.appendChild(gaugeCard);
      contentEl.appendChild(sparklineCard);
    }
  );

  container.appendChild(dataVizSection);
  return container;
};

// Master Showcase - All Components
export const MasterComponentShowcase = () => {
  const container = document.createElement('div');
  container.style.cssText = `
    padding: 40px;
    background: linear-gradient(135deg, 
      var(--_global-color-surface) 0%, 
      var(--_global-color-surface-container-low) 30%,
      var(--_global-color-surface-container) 70%,
      var(--_global-color-surface-container-high) 100%);
    min-height: 100vh;
  `;

  // Header
  const header = document.createElement('div');
  header.style.cssText = `
    text-align: center;
    margin-bottom: 48px;
    padding: 32px;
    background: var(--_global-color-surface-container-lowest);
    border-radius: var(--_global-border-radius-xl);
    box-shadow: var(--_global-elevation-2);
    backdrop-filter: blur(20px);
  `;

  const title = document.createElement('h1');
  title.textContent = 'MyntUI Component Library';
  title.style.cssText = `
    font: var(--_global-typography-display-small);
    color: var(--_global-color-primary);
    margin: 0 0 16px 0;
    text-shadow: 0 2px 4px rgba(0,0,0,0.1);
  `;

  const subtitle = document.createElement('p');
  subtitle.textContent = 'A beautiful, framework-agnostic web component library blending Material Design 3, with modern aesthetics and premium interactions.';
  subtitle.style.cssText = `
    font: var(--_global-typography-body-large);
    color: var(--_global-color-text-secondary);
    margin: 0;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  `;

  header.appendChild(title);
  header.appendChild(subtitle);

  // Quick showcase grid
  const showcase = document.createElement('div');
  showcase.style.cssText = `
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 24px;
    margin-bottom: 48px;
  `;

  // Component categories
  const categories = [
    {
      title: 'Interactive Buttons',
      description: 'Material Design 3 buttons with ripple effects',
      content: (cardContent) => {
        const buttonRow = document.createElement('div');
        buttonRow.style.cssText = 'display: flex; gap: 12px; flex-wrap: wrap;';

        ['filled', 'outlined', 'text'].forEach(variant => {
          const btn = document.createElement('my-button');
          btn.setAttribute('variant', variant);
          btn.setAttribute('label', variant);
          buttonRow.appendChild(btn);
        });

        cardContent.appendChild(buttonRow);
      }
    },
    {
      title: 'Form Inputs',
      description: 'Enhanced input fields with validation',
      content: (cardContent) => {
        const input1 = document.createElement('my-input');
        input1.setAttribute('label', 'Email Address');
        input1.setAttribute('type', 'email');
        input1.setAttribute('placeholder', 'user@example.com');
        input1.setAttribute('leading-icon', 'mail');

        const input2 = document.createElement('my-input');
        input2.setAttribute('label', 'Search');
        input2.setAttribute('type', 'search');
        input2.setAttribute('placeholder', 'Search...');
        input2.setAttribute('leading-icon', 'search');

        cardContent.style.gap = '16px';
        cardContent.appendChild(input1);
        cardContent.appendChild(input2);
      }
    },
    {
      title: 'Boolean Inputs',
      description: 'Toggles, checkboxes, and radio buttons',
      content: (cardContent) => {
        const toggle = document.createElement('my-toggle');
        toggle.setAttribute('checked', '');

        const checkbox = document.createElement('my-checkbox');
        checkbox.setAttribute('label', 'Accept terms');
        checkbox.setAttribute('checked', '');

        const radio = document.createElement('my-radio');
        radio.setAttribute('label', 'Option A');
        radio.setAttribute('checked', '');

        cardContent.style.gap = '12px';
        cardContent.appendChild(toggle);
        cardContent.appendChild(checkbox);
        cardContent.appendChild(radio);
      }
    },
    {
      title: 'Data Visualization',
      description: 'Progress bars, gauges, and charts',
      content: (cardContent) => {
        const progress = document.createElement('my-progress');
        progress.setAttribute('value', '75');
        progress.setAttribute('variant', 'success');

        const gauge = document.createElement('my-gauge');
        gauge.setAttribute('value', '65');
        gauge.setAttribute('label', 'Performance');
        gauge.setAttribute('variant', 'primary');

        cardContent.appendChild(progress);
        cardContent.appendChild(gauge);
      }
    }
  ];

  categories.forEach(({ title, description, content }) => {
    const card = createDemoCard(title, content);
    showcase.appendChild(card);
  });

  container.appendChild(header);
  container.appendChild(showcase);

  return container;
};