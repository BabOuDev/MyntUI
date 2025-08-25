import '../src/components/my-icon/my-icon.js';

export default {
  title: 'Components/my-icon',
  parameters: {
    docs: {
      description: {
        component: 'A component for rendering scalable vector icons with built-in SVG library and optional Material Icons fallback.',
      },
    },
  },
  argTypes: {
    icon: {
      control: 'text',
      description: 'Icon name (uses built-in SVG library or Material Icons)',
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Icon size',
    },
    color: {
      control: 'color',
      description: 'Icon color',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the icon',
    },
    interactive: {
      control: 'boolean',
      description: 'Make icon interactive (clickable)',
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'filled', 'outlined'],
      description: 'Icon variant',
    },
    useFontFallback: {
      control: 'boolean',
      description: 'Use Material Icons font fallback for unknown icons',
    },
  },
};

const Template = (args) => {
  const icon = document.createElement('my-icon');
  
  // Set properties
  if (args.icon) icon.setAttribute('icon', args.icon);
  if (args.size && args.size !== 'md') icon.setAttribute('size', args.size);
  if (args.color) icon.setAttribute('color', args.color);
  if (args.variant && args.variant !== 'default') icon.setAttribute('variant', args.variant);
  if (args.disabled) icon.setAttribute('disabled', '');
  if (args.interactive) icon.setAttribute('interactive', '');
  if (args.useFontFallback) icon.setAttribute('use-font-fallback', '');

  // Add event listener for demonstration
  if (args.interactive) {
    icon.addEventListener('click', () => {
      console.log('Icon clicked!', args);
    });
  }

  return icon;
};

// Default story
export const Default = Template.bind({});
Default.args = {
  icon: 'home',
  size: 'md',
  disabled: false,
  interactive: false,
  variant: 'default',
  useFontFallback: false,
};

// Built-in icons showcase
export const BuiltInIcons = () => {
  const container = document.createElement('div');
  container.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 24px; align-items: center;';
  
  const icons = [
    // Navigation
    'home', 'menu', 'arrow_back', 'arrow_forward', 'close', 'expand_more', 'expand_less',
    // Actions
    'search', 'add', 'delete', 'edit', 'check',
    // User
    'person', 'settings',
    // Status
    'favorite', 'star', 'visibility', 'visibility_off',
    // Feedback
    'error', 'warning', 'info', 'success'
  ];
  
  icons.forEach(iconName => {
    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 12px; border-radius: var(--_global-border-radius-md); background: var(--_global-color-surface-container);';
    
    const icon = document.createElement('my-icon');
    icon.setAttribute('icon', iconName);
    icon.setAttribute('size', 'lg');
    
    const label = document.createElement('span');
    label.textContent = iconName;
    label.style.cssText = 'font-size: 12px; color: var(--_global-color-text-secondary); text-align: center; word-break: break-word;';
    
    wrapper.appendChild(icon);
    wrapper.appendChild(label);
    container.appendChild(wrapper);
  });
  
  return container;
};
BuiltInIcons.parameters = {
  docs: {
    description: {
      story: 'All available built-in SVG icons in the component library.',
    },
  },
};

// Size showcase
export const Sizes = () => {
  const container = document.createElement('div');
  container.style.cssText = 'display: flex; gap: 24px; align-items: center;';
  
  const sizes = ['xs', 'sm', 'md', 'lg', 'xl'];
  
  sizes.forEach(size => {
    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'display: flex; flex-direction: column; align-items: center; gap: 8px;';
    
    const icon = document.createElement('my-icon');
    icon.setAttribute('icon', 'star');
    icon.setAttribute('size', size);
    
    const label = document.createElement('span');
    label.textContent = size.toUpperCase();
    label.style.cssText = 'font-size: 12px; color: var(--_global-color-text-secondary);';
    
    wrapper.appendChild(icon);
    wrapper.appendChild(label);
    container.appendChild(wrapper);
  });
  
  return container;
};
Sizes.parameters = {
  docs: {
    description: {
      story: 'Icon sizes from extra small to extra large.',
    },
  },
};

// Color variations
export const Colors = () => {
  const container = document.createElement('div');
  container.style.cssText = 'display: flex; gap: 24px; align-items: center; flex-wrap: wrap;';
  
  const colors = [
    { name: 'Default', value: '' },
    { name: 'Primary', value: 'var(--_global-color-primary)' },
    { name: 'Secondary', value: 'var(--_global-color-secondary)' },
    { name: 'Success', value: 'var(--_global-color-success)' },
    { name: 'Warning', value: 'var(--_global-color-warning)' },
    { name: 'Error', value: 'var(--_global-color-error)' },
    { name: 'Info', value: 'var(--_global-color-info)' },
  ];
  
  colors.forEach(color => {
    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'display: flex; flex-direction: column; align-items: center; gap: 8px;';
    
    const icon = document.createElement('my-icon');
    icon.setAttribute('icon', 'favorite');
    icon.setAttribute('size', 'lg');
    if (color.value) icon.setAttribute('color', color.value);
    
    const label = document.createElement('span');
    label.textContent = color.name;
    label.style.cssText = 'font-size: 12px; color: var(--_global-color-text-secondary);';
    
    wrapper.appendChild(icon);
    wrapper.appendChild(label);
    container.appendChild(wrapper);
  });
  
  return container;
};
Colors.parameters = {
  docs: {
    description: {
      story: 'Icons with different color variants using CSS custom properties.',
    },
  },
};

// Interactive icons
export const Interactive = () => {
  const container = document.createElement('div');
  container.style.cssText = 'display: flex; gap: 24px; align-items: center;';
  
  const interactiveIcons = [
    { icon: 'favorite', label: 'Like' },
    { icon: 'share', label: 'Share' },
    { icon: 'settings', label: 'Settings' },
    { icon: 'visibility', label: 'Toggle View' },
  ];
  
  interactiveIcons.forEach(({ icon: iconName, label }) => {
    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'display: flex; flex-direction: column; align-items: center; gap: 8px;';
    
    const icon = document.createElement('my-icon');
    icon.setAttribute('icon', iconName);
    icon.setAttribute('size', 'lg');
    icon.setAttribute('interactive', '');
    icon.style.cursor = 'pointer';
    
    // Add click handler
    icon.addEventListener('click', () => {
      console.log(`${label} clicked!`);
      // Visual feedback
      icon.style.transform = 'scale(0.9)';
      setTimeout(() => {
        icon.style.transform = 'scale(1)';
      }, 100);
    });
    
    const labelEl = document.createElement('span');
    labelEl.textContent = label;
    labelEl.style.cssText = 'font-size: 12px; color: var(--_global-color-text-secondary);';
    
    wrapper.appendChild(icon);
    wrapper.appendChild(labelEl);
    container.appendChild(wrapper);
  });
  
  return container;
};
Interactive.parameters = {
  docs: {
    description: {
      story: 'Interactive icons that respond to clicks. Try clicking them!',
    },
  },
};

// States showcase
export const States = () => {
  const container = document.createElement('div');
  container.style.cssText = 'display: flex; gap: 24px; align-items: center;';
  
  const states = [
    { name: 'Normal', disabled: false },
    { name: 'Disabled', disabled: true },
  ];
  
  states.forEach(({ name, disabled }) => {
    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'display: flex; flex-direction: column; align-items: center; gap: 8px;';
    
    const icon = document.createElement('my-icon');
    icon.setAttribute('icon', 'settings');
    icon.setAttribute('size', 'lg');
    icon.setAttribute('interactive', '');
    if (disabled) icon.setAttribute('disabled', '');
    
    const label = document.createElement('span');
    label.textContent = name;
    label.style.cssText = 'font-size: 12px; color: var(--_global-color-text-secondary);';
    
    wrapper.appendChild(icon);
    wrapper.appendChild(label);
    container.appendChild(wrapper);
  });
  
  return container;
};
States.parameters = {
  docs: {
    description: {
      story: 'Different icon states: normal and disabled.',
    },
  },
};

// Category showcase
export const Categories = () => {
  const container = document.createElement('div');
  container.style.cssText = 'display: flex; flex-direction: column; gap: 32px;';
  
  const categories = [
    {
      title: 'Navigation Icons',
      icons: ['home', 'menu', 'arrow_back', 'arrow_forward', 'close', 'expand_more', 'expand_less']
    },
    {
      title: 'Action Icons',
      icons: ['search', 'add', 'delete', 'edit', 'check']
    },
    {
      title: 'User & Social Icons',
      icons: ['person', 'settings', 'favorite', 'star']
    },
    {
      title: 'Status & Feedback Icons',
      icons: ['error', 'warning', 'info', 'success', 'visibility', 'visibility_off']
    }
  ];
  
  categories.forEach(category => {
    const section = document.createElement('div');
    
    const title = document.createElement('h3');
    title.textContent = category.title;
    title.style.cssText = 'margin: 0 0 16px 0; font-size: 18px; font-weight: var(--_global-font-weight-medium); color: var(--_global-color-text-primary);';
    
    const iconGrid = document.createElement('div');
    iconGrid.style.cssText = 'display: flex; gap: 16px; flex-wrap: wrap;';
    
    category.icons.forEach(iconName => {
      const wrapper = document.createElement('div');
      wrapper.style.cssText = 'display: flex; flex-direction: column; align-items: center; gap: 6px; padding: 8px; min-width: 80px;';
      
      const icon = document.createElement('my-icon');
      icon.setAttribute('icon', iconName);
      icon.setAttribute('size', 'md');
      
      const label = document.createElement('span');
      label.textContent = iconName;
      label.style.cssText = 'font-size: 11px; color: var(--_global-color-text-secondary); text-align: center;';
      
      wrapper.appendChild(icon);
      wrapper.appendChild(label);
      iconGrid.appendChild(wrapper);
    });
    
    section.appendChild(title);
    section.appendChild(iconGrid);
    container.appendChild(section);
  });
  
  return container;
};
Categories.parameters = {
  docs: {
    description: {
      story: 'Icons organized by category showing their intended use cases.',
    },
  },
};