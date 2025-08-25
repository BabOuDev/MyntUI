import '../src/components/my-button/my-button.js';
import '../src/components/my-icon/my-icon.js';

export default {
  title: 'Components/my-button',
  parameters: {
    docs: {
      description: {
        component: 'A Material Design 3 button component with enhanced state layers, accessibility, and consistency. Supports multiple variants, sizes, and states.',
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Button text content',
    },
    variant: {
      control: { type: 'select' },
      options: ['filled', 'filled-tonal', 'elevated', 'outlined', 'text', 'primary', 'secondary', 'ghost', 'success', 'error', 'danger'],
      description: 'Button variant style',
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Button size',
    },
    density: {
      control: { type: 'select' },
      options: ['default', 'compact'],
      description: 'Button density for spacing',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the button',
    },
    loading: {
      control: 'boolean',
      description: 'Show loading spinner',
    },
    fab: {
      control: 'boolean',
      description: 'Floating Action Button style',
    },
    iconOnly: {
      control: 'boolean',
      description: 'Icon-only button (circular)',
    },
    elevated: {
      control: 'boolean',
      description: 'Add elevation shadow',
    },
    filledTonal: {
      control: 'boolean',
      description: 'Use filled tonal variant',
    },
  },
};

const Template = (args) => {
  const button = document.createElement('my-button');
  
  // Set properties
  if (args.label) button.setAttribute('label', args.label);
  if (args.variant && args.variant !== 'filled') button.setAttribute('variant', args.variant);
  if (args.size && args.size !== 'md') button.setAttribute('size', args.size);
  if (args.density && args.density !== 'default') button.setAttribute('density', args.density);
  if (args.disabled) button.setAttribute('disabled', '');
  if (args.loading) button.setAttribute('loading', '');
  if (args.fab) button.setAttribute('fab', '');
  if (args.iconOnly) button.setAttribute('icon-only', '');
  if (args.elevated) button.setAttribute('elevated', '');
  if (args.filledTonal) button.setAttribute('filled-tonal', '');

  // Add event listener for demonstration
  button.addEventListener('click', () => {
    console.log('Button clicked!', args);
  });

  return button;
};

// Default story
export const Default = Template.bind({});
Default.args = {
  label: 'Button',
  variant: 'filled',
  size: 'md',
  density: 'default',
  disabled: false,
  loading: false,
  fab: false,
  iconOnly: false,
  elevated: false,
  filledTonal: false,
};

// Variant showcase
export const Variants = () => {
  const container = document.createElement('div');
  container.style.cssText = 'display: flex; gap: 16px; flex-wrap: wrap; align-items: center;';
  
  const variants = ['filled', 'filled-tonal', 'elevated', 'outlined', 'text', 'secondary', 'ghost', 'success', 'error'];
  
  variants.forEach(variant => {
    const button = document.createElement('my-button');
    button.setAttribute('label', variant);
    button.setAttribute('variant', variant);
    container.appendChild(button);
  });
  
  return container;
};
Variants.parameters = {
  docs: {
    description: {
      story: 'All available button variants following Material Design 3 principles.',
    },
  },
};

// Size showcase
export const Sizes = () => {
  const container = document.createElement('div');
  container.style.cssText = 'display: flex; gap: 16px; align-items: center;';
  
  const sizes = ['xs', 'sm', 'md', 'lg', 'xl'];
  
  sizes.forEach(size => {
    const button = document.createElement('my-button');
    button.setAttribute('label', size.toUpperCase());
    button.setAttribute('size', size);
    container.appendChild(button);
  });
  
  return container;
};
Sizes.parameters = {
  docs: {
    description: {
      story: 'Button sizes from extra small to extra large.',
    },
  },
};

// States showcase
export const States = () => {
  const container = document.createElement('div');
  container.style.cssText = 'display: flex; gap: 16px; align-items: center; flex-wrap: wrap;';
  
  // Normal
  const normal = document.createElement('my-button');
  normal.setAttribute('label', 'Normal');
  container.appendChild(normal);
  
  // Disabled
  const disabled = document.createElement('my-button');
  disabled.setAttribute('label', 'Disabled');
  disabled.setAttribute('disabled', '');
  container.appendChild(disabled);
  
  // Loading
  const loading = document.createElement('my-button');
  loading.setAttribute('label', 'Loading');
  loading.setAttribute('loading', '');
  container.appendChild(loading);
  
  return container;
};
States.parameters = {
  docs: {
    description: {
      story: 'Different button states: normal, disabled, and loading.',
    },
  },
};

// FAB showcase
export const FloatingActionButtons = () => {
  const container = document.createElement('div');
  container.style.cssText = 'display: flex; gap: 16px; align-items: center;';
  
  const sizes = ['sm', 'md', 'lg'];
  
  sizes.forEach(size => {
    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'display: flex; flex-direction: column; align-items: center; gap: 8px;';
    
    const button = document.createElement('my-button');
    button.setAttribute('fab', '');
    button.setAttribute('size', size);
    button.innerHTML = '<my-icon icon="add"></my-icon>';
    
    const label = document.createElement('span');
    label.textContent = `FAB ${size.toUpperCase()}`;
    label.style.fontSize = '12px';
    label.style.color = 'var(--_global-color-text-secondary)';
    
    wrapper.appendChild(button);
    wrapper.appendChild(label);
    container.appendChild(wrapper);
  });
  
  return container;
};
FloatingActionButtons.parameters = {
  docs: {
    description: {
      story: 'Floating Action Button (FAB) variants in different sizes.',
    },
  },
};

// Icon-only buttons
export const IconOnly = () => {
  const container = document.createElement('div');
  container.style.cssText = 'display: flex; gap: 16px; align-items: center; flex-wrap: wrap;';
  
  const variants = ['filled', 'outlined', 'text'];
  const icons = ['favorite', 'share', 'more_vert'];
  
  variants.forEach((variant, index) => {
    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'display: flex; flex-direction: column; align-items: center; gap: 8px;';
    
    const button = document.createElement('my-button');
    button.setAttribute('icon-only', '');
    button.setAttribute('variant', variant);
    button.innerHTML = `<my-icon icon="${icons[index]}"></my-icon>`;
    
    const label = document.createElement('span');
    label.textContent = variant;
    label.style.fontSize = '12px';
    label.style.color = 'var(--_global-color-text-secondary)';
    
    wrapper.appendChild(button);
    wrapper.appendChild(label);
    container.appendChild(wrapper);
  });
  
  return container;
};
IconOnly.parameters = {
  docs: {
    description: {
      story: 'Icon-only buttons in different variants.',
    },
  },
};

// Density comparison
export const Density = () => {
  const container = document.createElement('div');
  container.style.cssText = 'display: flex; gap: 24px; align-items: center;';
  
  const densities = ['default', 'compact'];
  
  densities.forEach(density => {
    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'display: flex; flex-direction: column; gap: 12px; align-items: center;';
    
    const title = document.createElement('h4');
    title.textContent = `${density.charAt(0).toUpperCase()}${density.slice(1)}`;
    title.style.margin = '0';
    title.style.fontSize = '14px';
    title.style.color = 'var(--_global-color-text-secondary)';
    
    const buttons = document.createElement('div');
    buttons.style.cssText = 'display: flex; gap: 8px;';
    
    ['sm', 'md', 'lg'].forEach(size => {
      const button = document.createElement('my-button');
      button.setAttribute('label', size.toUpperCase());
      button.setAttribute('size', size);
      button.setAttribute('density', density);
      buttons.appendChild(button);
    });
    
    wrapper.appendChild(title);
    wrapper.appendChild(buttons);
    container.appendChild(wrapper);
  });
  
  return container;
};
Density.parameters = {
  docs: {
    description: {
      story: 'Comparison between default and compact button densities.',
    },
  },
};

// With icons and content
export const WithIcons = () => {
  const container = document.createElement('div');
  container.style.cssText = 'display: flex; gap: 16px; align-items: center; flex-wrap: wrap;';
  
  // Button with left icon
  const leftIcon = document.createElement('my-button');
  leftIcon.setAttribute('label', 'Download');
  leftIcon.innerHTML = '<my-icon icon="download" slot="left"></my-icon>Download';
  
  // Button with right icon
  const rightIcon = document.createElement('my-button');
  rightIcon.setAttribute('variant', 'outlined');
  rightIcon.innerHTML = 'Next <my-icon icon="arrow_forward" slot="right"></my-icon>';
  
  // Button with both icons
  const bothIcons = document.createElement('my-button');
  bothIcons.setAttribute('variant', 'text');
  bothIcons.innerHTML = '<my-icon icon="favorite" slot="left"></my-icon>Like<my-icon icon="thumb_up" slot="right"></my-icon>';
  
  container.appendChild(leftIcon);
  container.appendChild(rightIcon);
  container.appendChild(bothIcons);
  
  return container;
};
WithIcons.parameters = {
  docs: {
    description: {
      story: 'Buttons with icons using slot positioning.',
    },
  },
};