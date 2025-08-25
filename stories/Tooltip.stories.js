import '../src/components/my-tooltip/my-tooltip.js';
import '../src/components/my-button/my-button.js';
import '../src/components/my-icon/my-icon.js';

export default {
  title: 'Components/my-tooltip',
  parameters: {
    docs: {
      description: {
        component: 'A small, contextual information pop-up displayed on hover or focus of an element. Supports multiple positions, variants, and sizes.',
      },
    },
  },
  argTypes: {
    text: {
      control: 'text',
      description: 'Tooltip text content',
    },
    position: {
      control: { type: 'select' },
      options: ['top', 'bottom', 'left', 'right', 'auto'],
      description: 'Tooltip position relative to target element',
    },
    variant: {
      control: { type: 'select' },
      options: ['dark', 'light', 'primary', 'error'],
      description: 'Tooltip color variant',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Tooltip size',
    },
    delay: {
      control: { type: 'number', min: 0, max: 2000, step: 100 },
      description: 'Delay in milliseconds before showing tooltip',
    },
    multiline: {
      control: 'boolean',
      description: 'Allow tooltip text to wrap to multiple lines',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable tooltip functionality',
    },
  },
};

const Template = (args) => {
  const container = document.createElement('div');
  container.style.cssText = 'padding: 100px; display: flex; justify-content: center;';
  
  const tooltip = document.createElement('my-tooltip');
  
  // Set properties
  if (args.text) tooltip.setAttribute('text', args.text);
  if (args.position && args.position !== 'top') tooltip.setAttribute('position', args.position);
  if (args.variant && args.variant !== 'dark') tooltip.setAttribute('variant', args.variant);
  if (args.size && args.size !== 'md') tooltip.setAttribute('size', args.size);
  if (args.delay !== undefined && args.delay !== 500) tooltip.setAttribute('delay', args.delay);
  if (args.multiline) tooltip.setAttribute('multiline', '');
  if (args.disabled) tooltip.setAttribute('disabled', '');

  // Add target element
  const button = document.createElement('my-button');
  button.setAttribute('label', 'Hover me');
  button.setAttribute('variant', 'outlined');
  
  tooltip.appendChild(button);
  container.appendChild(tooltip);
  
  return container;
};

// Default story
export const Default = Template.bind({});
Default.args = {
  text: 'This is a helpful tooltip',
  position: 'top',
  variant: 'dark',
  size: 'md',
  delay: 500,
  multiline: false,
  disabled: false,
};

// Position variants
export const Positions = () => {
  const container = document.createElement('div');
  container.style.cssText = 'padding: 80px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 60px; align-items: center; justify-items: center;';
  
  const positions = ['top', 'bottom', 'left', 'right'];
  
  positions.forEach(position => {
    const tooltip = document.createElement('my-tooltip');
    tooltip.setAttribute('text', `Tooltip on ${position}`);
    tooltip.setAttribute('position', position);
    tooltip.setAttribute('delay', '200');
    
    const button = document.createElement('my-button');
    button.setAttribute('label', position.charAt(0).toUpperCase() + position.slice(1));
    button.setAttribute('variant', 'filled');
    
    tooltip.appendChild(button);
    container.appendChild(tooltip);
  });
  
  return container;
};
Positions.parameters = {
  docs: {
    description: {
      story: 'Tooltips can be positioned on any side of the target element.',
    },
  },
};

// Variant showcase
export const Variants = () => {
  const container = document.createElement('div');
  container.style.cssText = 'padding: 80px; display: flex; gap: 24px; align-items: center; justify-content: center;';
  
  const variants = [
    { variant: 'dark', label: 'Dark', buttonVariant: 'filled' },
    { variant: 'light', label: 'Light', buttonVariant: 'outlined' },
    { variant: 'primary', label: 'Primary', buttonVariant: 'text' },
    { variant: 'error', label: 'Error', buttonVariant: 'error' },
  ];
  
  variants.forEach(({ variant, label, buttonVariant }) => {
    const tooltip = document.createElement('my-tooltip');
    tooltip.setAttribute('text', `${label} tooltip variant`);
    tooltip.setAttribute('variant', variant);
    tooltip.setAttribute('delay', '200');
    
    const button = document.createElement('my-button');
    button.setAttribute('label', label);
    button.setAttribute('variant', buttonVariant);
    
    tooltip.appendChild(button);
    container.appendChild(tooltip);
  });
  
  return container;
};
Variants.parameters = {
  docs: {
    description: {
      story: 'Different tooltip color variants to match various contexts.',
    },
  },
};

// Size variants
export const Sizes = () => {
  const container = document.createElement('div');
  container.style.cssText = 'padding: 80px; display: flex; gap: 24px; align-items: center; justify-content: center;';
  
  const sizes = ['sm', 'md', 'lg'];
  
  sizes.forEach(size => {
    const tooltip = document.createElement('my-tooltip');
    tooltip.setAttribute('text', `Size ${size.toUpperCase()} tooltip with longer text content`);
    tooltip.setAttribute('size', size);
    tooltip.setAttribute('delay', '200');
    
    const button = document.createElement('my-button');
    button.setAttribute('label', size.toUpperCase());
    button.setAttribute('size', size);
    button.setAttribute('variant', 'outlined');
    
    tooltip.appendChild(button);
    container.appendChild(tooltip);
  });
  
  return container;
};
Sizes.parameters = {
  docs: {
    description: {
      story: 'Tooltips come in three sizes: small, medium, and large.',
    },
  },
};

// Multi-line tooltips
export const Multiline = () => {
  const container = document.createElement('div');
  container.style.cssText = 'padding: 100px; display: flex; gap: 24px; align-items: center; justify-content: center;';
  
  const singleLineTooltip = document.createElement('my-tooltip');
  singleLineTooltip.setAttribute('text', 'This is a very long tooltip text that would normally be truncated with ellipsis');
  singleLineTooltip.setAttribute('delay', '200');
  
  const singleLineButton = document.createElement('my-button');
  singleLineButton.setAttribute('label', 'Single Line');
  singleLineButton.setAttribute('variant', 'outlined');
  singleLineTooltip.appendChild(singleLineButton);
  
  const multiLineTooltip = document.createElement('my-tooltip');
  multiLineTooltip.setAttribute('text', 'This is a very long tooltip text that will wrap to multiple lines when multiline is enabled');
  multiLineTooltip.setAttribute('multiline', '');
  multiLineTooltip.setAttribute('delay', '200');
  
  const multiLineButton = document.createElement('my-button');
  multiLineButton.setAttribute('label', 'Multi-line');
  multiLineButton.setAttribute('variant', 'filled');
  multiLineTooltip.appendChild(multiLineButton);
  
  container.appendChild(singleLineTooltip);
  container.appendChild(multiLineTooltip);
  
  return container;
};
Multiline.parameters = {
  docs: {
    description: {
      story: 'Comparison between single-line (truncated) and multi-line tooltips.',
    },
  },
};

// Custom content with slot
export const CustomContent = () => {
  const container = document.createElement('div');
  container.style.cssText = 'padding: 100px; display: flex; gap: 24px; align-items: center; justify-content: center;';
  
  const tooltip = document.createElement('my-tooltip');
  tooltip.setAttribute('variant', 'light');
  tooltip.setAttribute('size', 'lg');
  tooltip.setAttribute('delay', '200');
  
  // Custom content using slot
  const content = document.createElement('div');
  content.setAttribute('slot', 'content');
  content.innerHTML = `
    <div style="display: flex; align-items: center; gap: 8px;">
      <my-icon icon="info" size="sm" style="color: var(--_global-color-primary);"></my-icon>
      <div>
        <div style="font-weight: var(--_global-font-weight-bold); margin-bottom: 4px;">Pro Tip</div>
        <div style="font-size: var(--_global-font-size-xs);">This tooltip contains custom HTML content</div>
      </div>
    </div>
  `;
  
  const button = document.createElement('my-button');
  button.setAttribute('label', 'Rich Content');
  button.setAttribute('variant', 'filled');
  button.innerHTML = '<my-icon icon="help" slot="left"></my-icon>Rich Content';
  
  tooltip.appendChild(content);
  tooltip.appendChild(button);
  container.appendChild(tooltip);
  
  return container;
};
CustomContent.parameters = {
  docs: {
    description: {
      story: 'Tooltips can contain rich HTML content using the content slot.',
    },
  },
};

// Interactive elements
export const InteractiveElements = () => {
  const container = document.createElement('div');
  container.style.cssText = 'padding: 80px; display: flex; gap: 24px; align-items: center; justify-content: center; flex-wrap: wrap;';
  
  // Button with tooltip
  const buttonTooltip = document.createElement('my-tooltip');
  buttonTooltip.setAttribute('text', 'Click to perform action');
  buttonTooltip.setAttribute('position', 'top');
  
  const button = document.createElement('my-button');
  button.setAttribute('label', 'Action');
  button.setAttribute('variant', 'filled');
  buttonTooltip.appendChild(button);
  
  // Icon with tooltip
  const iconTooltip = document.createElement('my-tooltip');
  iconTooltip.setAttribute('text', 'Settings');
  iconTooltip.setAttribute('position', 'bottom');
  iconTooltip.setAttribute('variant', 'dark');
  
  const iconButton = document.createElement('my-button');
  iconButton.setAttribute('variant', 'text');
  iconButton.setAttribute('icon-only', '');
  iconButton.innerHTML = '<my-icon icon="settings"></my-icon>';
  iconTooltip.appendChild(iconButton);
  
  // Text with tooltip
  const textTooltip = document.createElement('my-tooltip');
  textTooltip.setAttribute('text', 'This is a technical term that needs explanation');
  textTooltip.setAttribute('variant', 'primary');
  textTooltip.setAttribute('multiline', '');
  textTooltip.style.color = 'var(--_global-color-primary)';
  textTooltip.style.textDecoration = 'underline dotted';
  textTooltip.style.cursor = 'help';
  textTooltip.textContent = 'Hover over this text';
  
  container.appendChild(buttonTooltip);
  container.appendChild(iconTooltip);
  container.appendChild(textTooltip);
  
  return container;
};
InteractiveElements.parameters = {
  docs: {
    description: {
      story: 'Tooltips can enhance various interactive elements like buttons, icons, and text.',
    },
  },
};

// Auto positioning
export const AutoPositioning = () => {
  const container = document.createElement('div');
  container.style.cssText = 'position: relative; height: 400px; width: 100%; border: 1px dashed var(--_global-color-outline); border-radius: var(--_global-border-radius-md);';
  
  // Corner positions to test auto-positioning
  const positions = [
    { top: '20px', left: '20px', label: 'Top-left' },
    { top: '20px', right: '20px', label: 'Top-right' },
    { bottom: '20px', left: '20px', label: 'Bottom-left' },
    { bottom: '20px', right: '20px', label: 'Bottom-right' },
    { top: '50%', left: '50%', transform: 'translate(-50%, -50%)', label: 'Center' },
  ];
  
  positions.forEach(({ label, ...style }) => {
    const tooltip = document.createElement('my-tooltip');
    tooltip.setAttribute('text', `Auto-positioned tooltip from ${label}`);
    tooltip.setAttribute('position', 'auto');
    tooltip.setAttribute('delay', '200');
    tooltip.style.position = 'absolute';
    Object.assign(tooltip.style, style);
    
    const button = document.createElement('my-button');
    button.setAttribute('label', label);
    button.setAttribute('size', 'sm');
    button.setAttribute('variant', 'outlined');
    
    tooltip.appendChild(button);
    container.appendChild(tooltip);
  });
  
  return container;
};
AutoPositioning.parameters = {
  docs: {
    description: {
      story: 'Tooltips with auto positioning will automatically choose the best position based on available space.',
    },
  },
};

// Accessibility features
export const Accessibility = () => {
  const container = document.createElement('div');
  container.style.cssText = 'padding: 80px; max-width: 600px; margin: 0 auto;';
  
  const info = document.createElement('div');
  info.innerHTML = `
    <h3 style="margin: 0 0 16px 0;">Accessibility Features</h3>
    <ul style="line-height: 1.6; color: var(--_global-color-text-secondary);">
      <li>Tooltips are announced by screen readers</li>
      <li>Keyboard accessible (focus/blur events)</li>
      <li>Respects reduced motion preferences</li>
      <li>High contrast mode support</li>
      <li>Escape key dismisses tooltip</li>
    </ul>
  `;
  container.appendChild(info);
  
  const tooltipDemo = document.createElement('div');
  tooltipDemo.style.cssText = 'display: flex; gap: 16px; align-items: center; margin-top: 24px;';
  
  const focusTooltip = document.createElement('my-tooltip');
  focusTooltip.setAttribute('text', 'This tooltip appears on keyboard focus for accessibility');
  focusTooltip.setAttribute('variant', 'primary');
  focusTooltip.setAttribute('multiline', '');
  
  const focusButton = document.createElement('my-button');
  focusButton.setAttribute('label', 'Tab to Focus');
  focusButton.setAttribute('variant', 'outlined');
  focusTooltip.appendChild(focusButton);
  
  tooltipDemo.appendChild(focusTooltip);
  container.appendChild(tooltipDemo);
  
  return container;
};
Accessibility.parameters = {
  docs: {
    description: {
      story: 'Tooltip component includes comprehensive accessibility features.',
    },
  },
};