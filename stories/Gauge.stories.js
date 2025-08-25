import '../src/index.js';

export default {
  title: 'Components/Gauge',
  parameters: {
    docs: {
      description: {
        component: 'Gauge components for visualizing single numerical values within defined ranges with beautiful Material Design 3 styling and interactive features.',
      },
    },
    layout: 'padded',
  },
};

export const AllVariants = () => {
  const container = document.createElement('div');
  container.style.cssText = `
    display: flex;
    flex-direction: column;
    gap: 3rem;
    max-width: 1200px;
    font-family: var(--_global-font-family-sans);
  `;

  // Basic Gauges
  const basicSection = document.createElement('div');
  basicSection.innerHTML = `
    <h3 style="margin: 0 0 1.5rem 0; color: var(--_global-color-text-primary);">Basic Gauges</h3>
  `;
  
  const basicGrid = document.createElement('div');
  basicGrid.style.cssText = 'display: flex; gap: 2rem; flex-wrap: wrap; justify-content: center;';
  
  const basicVariants = [
    { label: 'CPU Usage', value: 35, variant: 'primary', unit: '%' },
    { label: 'Memory', value: 68, variant: 'secondary', unit: '%' },
    { label: 'Network', value: 42, variant: 'info', unit: 'MB/s' },
    { label: 'Temperature', value: 78, variant: 'warning', unit: '°C' }
  ];
  
  basicVariants.forEach(({ label, value, variant, unit }) => {
    const gauge = document.createElement('my-gauge');
    gauge.setAttribute('label', label);
    gauge.setAttribute('value', value);
    gauge.setAttribute('variant', variant);
    gauge.setAttribute('unit', unit);
    gauge.setAttribute('show-value', '');
    basicGrid.appendChild(gauge);
  });
  
  basicSection.appendChild(basicGrid);
  container.appendChild(basicSection);

  // Size Variants
  const sizeSection = document.createElement('div');
  sizeSection.innerHTML = `
    <h3 style="margin: 0 0 1.5rem 0; color: var(--_global-color-text-primary);">Size Variants</h3>
  `;
  
  const sizeGrid = document.createElement('div');
  sizeGrid.style.cssText = 'display: flex; gap: 2rem; flex-wrap: wrap; justify-content: center; align-items: center;';
  
  const sizeVariants = [
    { label: 'Small', value: 45, size: 'sm' },
    { label: 'Medium', value: 65, size: 'md' },
    { label: 'Large', value: 85, size: 'lg' }
  ];
  
  sizeVariants.forEach(({ label, value, size }) => {
    const gauge = document.createElement('my-gauge');
    gauge.setAttribute('label', label);
    gauge.setAttribute('value', value);
    gauge.setAttribute('size', size);
    gauge.setAttribute('show-value', '');
    gauge.setAttribute('unit', '%');
    sizeGrid.appendChild(gauge);
  });
  
  sizeSection.appendChild(sizeGrid);
  container.appendChild(sizeSection);

  // Status Variants
  const statusSection = document.createElement('div');
  statusSection.innerHTML = `
    <h3 style="margin: 0 0 1.5rem 0; color: var(--_global-color-text-primary);">Status Indicators</h3>
  `;
  
  const statusGrid = document.createElement('div');
  statusGrid.style.cssText = 'display: flex; gap: 2rem; flex-wrap: wrap; justify-content: center;';
  
  const statusVariants = [
    { label: 'Success', value: 95, variant: 'success', unit: '%' },
    { label: 'Warning', value: 75, variant: 'warning', unit: '%' },
    { label: 'Error', value: 25, variant: 'error', unit: '%' },
    { label: 'Info', value: 50, variant: 'info', unit: '%' }
  ];
  
  statusVariants.forEach(({ label, value, variant, unit }) => {
    const gauge = document.createElement('my-gauge');
    gauge.setAttribute('label', label);
    gauge.setAttribute('value', value);
    gauge.setAttribute('variant', variant);
    gauge.setAttribute('unit', unit);
    gauge.setAttribute('show-value', '');
    statusGrid.appendChild(gauge);
  });
  
  statusSection.appendChild(statusGrid);
  container.appendChild(statusSection);

  // Advanced Features
  const advancedSection = document.createElement('div');
  advancedSection.innerHTML = `
    <h3 style="margin: 0 0 1.5rem 0; color: var(--_global-color-text-primary);">Advanced Features</h3>
  `;
  
  const advancedGrid = document.createElement('div');
  advancedGrid.style.cssText = 'display: flex; gap: 2rem; flex-wrap: wrap; justify-content: center;';
  
  // Gauge with thresholds
  const thresholdGauge = document.createElement('my-gauge');
  thresholdGauge.setAttribute('label', 'With Thresholds');
  thresholdGauge.setAttribute('value', '85');
  thresholdGauge.setAttribute('unit', '%');
  thresholdGauge.setAttribute('show-value', '');
  thresholdGauge.setAttribute('thresholds', JSON.stringify([
    { min: 0, max: 50, color: 'var(--_global-color-success)', label: 'Good' },
    { min: 50, max: 80, color: 'var(--_global-color-warning)', label: 'Warning' },
    { min: 80, max: 100, color: 'var(--_global-color-error)', label: 'Critical' }
  ]));
  
  // Gauge with gradient
  const gradientGauge = document.createElement('my-gauge');
  gradientGauge.setAttribute('label', 'Gradient');
  gradientGauge.setAttribute('value', '72');
  gradientGauge.setAttribute('unit', '%');
  gradientGauge.setAttribute('show-value', '');
  gradientGauge.setAttribute('gradient', '');
  
  // Animated gauge
  const animatedGauge = document.createElement('my-gauge');
  animatedGauge.setAttribute('label', 'Animated');
  animatedGauge.setAttribute('value', '60');
  animatedGauge.setAttribute('unit', '%');
  animatedGauge.setAttribute('show-value', '');
  animatedGauge.setAttribute('animated', '');
  
  // Custom range gauge
  const customRangeGauge = document.createElement('my-gauge');
  customRangeGauge.setAttribute('label', 'Custom Range');
  customRangeGauge.setAttribute('value', '150');
  customRangeGauge.setAttribute('min', '100');
  customRangeGauge.setAttribute('max', '200');
  customRangeGauge.setAttribute('unit', ' RPM');
  customRangeGauge.setAttribute('show-value', '');
  
  advancedGrid.appendChild(thresholdGauge);
  advancedGrid.appendChild(gradientGauge);
  advancedGrid.appendChild(animatedGauge);
  advancedGrid.appendChild(customRangeGauge);
  advancedSection.appendChild(advancedGrid);
  container.appendChild(advancedSection);

  // Interactive Demo
  const interactiveSection = document.createElement('div');
  interactiveSection.innerHTML = `
    <h3 style="margin: 0 0 1.5rem 0; color: var(--_global-color-text-primary);">Interactive Demo</h3>
  `;
  
  const interactiveContainer = document.createElement('div');
  interactiveContainer.style.cssText = 'display: flex; flex-direction: column; align-items: center; gap: 2rem;';
  
  const demoGauge = document.createElement('my-gauge');
  demoGauge.setAttribute('label', 'Interactive Gauge');
  demoGauge.setAttribute('value', '0');
  demoGauge.setAttribute('show-value', '');
  demoGauge.setAttribute('animated', '');
  demoGauge.setAttribute('unit', '%');
  demoGauge.setAttribute('tooltip', 'Use controls below or arrow keys when focused');
  
  const controlsContainer = document.createElement('div');
  controlsContainer.style.cssText = 'display: flex; gap: 0.5rem; flex-wrap: wrap; justify-content: center;';
  
  // Create control buttons
  const buttons = [
    { label: '0%', value: 0 },
    { label: '25%', value: 25 },
    { label: '50%', value: 50 },
    { label: '75%', value: 75 },
    { label: '100%', value: 100 },
    { label: 'Random', value: -1 }
  ];
  
  buttons.forEach(({ label, value }) => {
    const button = document.createElement('my-button');
    button.setAttribute('label', label);
    button.setAttribute('variant', 'outlined');
    button.setAttribute('size', 'sm');
    button.addEventListener('click', () => {
      const newValue = value === -1 ? Math.floor(Math.random() * 101) : value;
      demoGauge.value = newValue;
    });
    controlsContainer.appendChild(button);
  });
  
  // Variant selector
  const variantContainer = document.createElement('div');
  variantContainer.style.cssText = 'display: flex; gap: 0.5rem; flex-wrap: wrap; justify-content: center;';
  
  const variants = ['primary', 'secondary', 'success', 'warning', 'error', 'info'];
  variants.forEach(variant => {
    const button = document.createElement('my-button');
    button.setAttribute('label', variant);
    button.setAttribute('variant', 'text');
    button.setAttribute('size', 'sm');
    button.addEventListener('click', () => {
      demoGauge.setAttribute('variant', variant);
    });
    variantContainer.appendChild(button);
  });
  
  const instructions = document.createElement('p');
  instructions.textContent = 'Click the gauge and use arrow keys, Home/End, or Page Up/Down to control it';
  instructions.style.cssText = 'text-align: center; color: var(--_global-color-text-secondary); font-size: 14px; margin: 0;';
  
  interactiveContainer.appendChild(demoGauge);
  interactiveContainer.appendChild(controlsContainer);
  interactiveContainer.appendChild(variantContainer);
  interactiveContainer.appendChild(instructions);
  interactiveSection.appendChild(interactiveContainer);
  container.appendChild(interactiveSection);

  return container;
};

export const BasicGauge = () => {
  const gauge = document.createElement('my-gauge');
  gauge.setAttribute('label', 'CPU Usage');
  gauge.setAttribute('value', '65');
  gauge.setAttribute('unit', '%');
  gauge.setAttribute('show-value', '');
  return gauge;
};

export const WithThresholds = () => {
  const gauge = document.createElement('my-gauge');
  gauge.setAttribute('label', 'System Health');
  gauge.setAttribute('value', '85');
  gauge.setAttribute('unit', '%');
  gauge.setAttribute('show-value', '');
  gauge.setAttribute('tooltip', 'System health indicator with thresholds');
  gauge.setAttribute('thresholds', JSON.stringify([
    { min: 0, max: 60, color: 'var(--_global-color-success)', label: 'Good' },
    { min: 60, max: 85, color: 'var(--_global-color-warning)', label: 'Warning' },
    { min: 85, max: 100, color: 'var(--_global-color-error)', label: 'Critical' }
  ]));
  return gauge;
};

export const SizeComparison = () => {
  const container = document.createElement('div');
  container.style.cssText = 'display: flex; gap: 2rem; align-items: center; justify-content: center;';
  
  const sizes = ['sm', 'md', 'lg'];
  const values = [40, 60, 80];
  
  sizes.forEach((size, index) => {
    const gauge = document.createElement('my-gauge');
    gauge.setAttribute('label', `${size.toUpperCase()}`);
    gauge.setAttribute('value', values[index]);
    gauge.setAttribute('size', size);
    gauge.setAttribute('show-value', '');
    gauge.setAttribute('unit', '%');
    container.appendChild(gauge);
  });
  
  return container;
};

export const VariantShowcase = () => {
  const container = document.createElement('div');
  container.style.cssText = 'display: flex; gap: 2rem; flex-wrap: wrap; justify-content: center;';
  
  const variants = ['primary', 'secondary', 'success', 'warning', 'error', 'info'];
  const values = [25, 35, 45, 55, 65, 75];
  
  variants.forEach((variant, index) => {
    const gauge = document.createElement('my-gauge');
    gauge.setAttribute('label', variant.charAt(0).toUpperCase() + variant.slice(1));
    gauge.setAttribute('value', values[index]);
    gauge.setAttribute('variant', variant);
    gauge.setAttribute('show-value', '');
    gauge.setAttribute('unit', '%');
    container.appendChild(gauge);
  });
  
  return container;
};

export const CustomRange = () => {
  const container = document.createElement('div');
  container.style.cssText = 'display: flex; gap: 2rem; flex-wrap: wrap; justify-content: center;';
  
  // Temperature gauge
  const tempGauge = document.createElement('my-gauge');
  tempGauge.setAttribute('label', 'Temperature');
  tempGauge.setAttribute('value', '72');
  tempGauge.setAttribute('min', '0');
  tempGauge.setAttribute('max', '100');
  tempGauge.setAttribute('unit', '°C');
  tempGauge.setAttribute('show-value', '');
  tempGauge.setAttribute('variant', 'warning');
  
  // Speed gauge  
  const speedGauge = document.createElement('my-gauge');
  speedGauge.setAttribute('label', 'Speed');
  speedGauge.setAttribute('value', '120');
  speedGauge.setAttribute('min', '0');
  speedGauge.setAttribute('max', '200');
  speedGauge.setAttribute('unit', ' km/h');
  speedGauge.setAttribute('show-value', '');
  speedGauge.setAttribute('variant', 'info');
  
  // Pressure gauge
  const pressureGauge = document.createElement('my-gauge');
  pressureGauge.setAttribute('label', 'Pressure');
  pressureGauge.setAttribute('value', '2.5');
  pressureGauge.setAttribute('min', '0');
  pressureGauge.setAttribute('max', '5');
  pressureGauge.setAttribute('unit', ' bar');
  pressureGauge.setAttribute('show-value', '');
  pressureGauge.setAttribute('variant', 'success');
  
  container.appendChild(tempGauge);
  container.appendChild(speedGauge);
  container.appendChild(pressureGauge);
  
  return container;
};

export const AnimatedGauge = () => {
  const gauge = document.createElement('my-gauge');
  gauge.setAttribute('label', 'Animated Progress');
  gauge.setAttribute('value', '75');
  gauge.setAttribute('unit', '%');
  gauge.setAttribute('show-value', '');
  gauge.setAttribute('animated', '');
  gauge.setAttribute('gradient', '');
  
  // Auto-update demo
  let currentValue = 75;
  setInterval(() => {
    currentValue = Math.max(10, Math.min(90, currentValue + (Math.random() - 0.5) * 20));
    gauge.value = Math.round(currentValue);
  }, 2000);
  
  return gauge;
};

export const AccessibilityDemo = () => {
  const container = document.createElement('div');
  container.style.cssText = 'display: flex; gap: 2rem; flex-wrap: wrap; justify-content: center;';
  
  // Focusable gauge with keyboard controls
  const focusableGauge = document.createElement('my-gauge');
  focusableGauge.setAttribute('label', 'Keyboard Controlled');
  focusableGauge.setAttribute('value', '50');
  focusableGauge.setAttribute('unit', '%');
  focusableGauge.setAttribute('show-value', '');
  focusableGauge.setAttribute('tooltip', 'Focusable with arrow key controls');
  
  // Gauge with screen reader friendly labels
  const accessibleGauge = document.createElement('my-gauge');
  accessibleGauge.setAttribute('label', 'Battery Level');
  accessibleGauge.setAttribute('value', '23');
  accessibleGauge.setAttribute('unit', '%');
  accessibleGauge.setAttribute('show-value', '');
  accessibleGauge.setAttribute('variant', 'error');
  accessibleGauge.setAttribute('tooltip', 'Low battery warning - please charge soon');
  
  // High contrast gauge
  const contrastGauge = document.createElement('my-gauge');
  contrastGauge.setAttribute('label', 'High Contrast');
  contrastGauge.setAttribute('value', '67');
  contrastGauge.setAttribute('unit', '%');
  contrastGauge.setAttribute('show-value', '');
  contrastGauge.style.setProperty('--_global-color-primary', '#000000');
  contrastGauge.style.setProperty('--_global-color-text-primary', '#000000');
  
  container.appendChild(focusableGauge);
  container.appendChild(accessibleGauge);
  container.appendChild(contrastGauge);
  
  return container;
};

export const RealWorldExamples = () => {
  const container = document.createElement('div');
  container.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 2rem; max-width: 800px;';
  
  // System monitoring gauges
  const cpuGauge = document.createElement('my-gauge');
  cpuGauge.setAttribute('label', 'CPU Usage');
  cpuGauge.setAttribute('value', '67');
  cpuGauge.setAttribute('unit', '%');
  cpuGauge.setAttribute('show-value', '');
  cpuGauge.setAttribute('variant', 'warning');
  cpuGauge.setAttribute('thresholds', JSON.stringify([
    { min: 0, max: 50, color: 'var(--_global-color-success)', label: 'Normal' },
    { min: 50, max: 80, color: 'var(--_global-color-warning)', label: 'High' },
    { min: 80, max: 100, color: 'var(--_global-color-error)', label: 'Critical' }
  ]));
  
  const memoryGauge = document.createElement('my-gauge');
  memoryGauge.setAttribute('label', 'Memory Usage');
  memoryGauge.setAttribute('value', '45');
  memoryGauge.setAttribute('unit', '%');
  memoryGauge.setAttribute('show-value', '');
  memoryGauge.setAttribute('variant', 'success');
  
  const diskGauge = document.createElement('my-gauge');
  diskGauge.setAttribute('label', 'Disk Usage');
  diskGauge.setAttribute('value', '89');
  diskGauge.setAttribute('unit', '%');
  diskGauge.setAttribute('show-value', '');
  diskGauge.setAttribute('variant', 'error');
  
  const networkGauge = document.createElement('my-gauge');
  networkGauge.setAttribute('label', 'Network');
  networkGauge.setAttribute('value', '23');
  networkGauge.setAttribute('unit', ' MB/s');
  networkGauge.setAttribute('show-value', '');
  networkGauge.setAttribute('variant', 'info');
  networkGauge.setAttribute('max', '100');
  
  container.appendChild(cpuGauge);
  container.appendChild(memoryGauge);
  container.appendChild(diskGauge);
  container.appendChild(networkGauge);
  
  return container;
};