import '../src/index.js';

export default {
  title: 'Components/Progress',
  parameters: {
    docs: {
      description: {
        component: 'Progress components for displaying task progress, loading states, and completion status with enhanced Material Design 3 styling.',
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
    gap: 2rem;
    max-width: 800px;
    font-family: var(--_global-font-family-sans);
  `;

  // Basic Progress Bars
  const basicSection = document.createElement('div');
  basicSection.innerHTML = `
    <h3 style="margin: 0 0 1rem 0; color: var(--_global-color-text-primary);">Basic Progress Bars</h3>
  `;
  
  const basicGrid = document.createElement('div');
  basicGrid.style.cssText = 'display: grid; gap: 1rem;';
  
  const basicVariants = [
    { label: 'Primary Progress', value: 25, variant: 'primary' },
    { label: 'Secondary Progress', value: 45, variant: 'secondary' },
    { label: 'Success Progress', value: 65, variant: 'success' },
    { label: 'Warning Progress', value: 80, variant: 'warning' },
    { label: 'Error Progress', value: 35, variant: 'error' },
    { label: 'Info Progress', value: 55, variant: 'info' }
  ];
  
  basicVariants.forEach(({ label, value, variant }) => {
    const progress = document.createElement('my-progress');
    progress.setAttribute('label', label);
    progress.setAttribute('value', value);
    progress.setAttribute('variant', variant);
    progress.setAttribute('show-value', '');
    basicGrid.appendChild(progress);
  });
  
  basicSection.appendChild(basicGrid);
  container.appendChild(basicSection);

  // Size Variants
  const sizeSection = document.createElement('div');
  sizeSection.innerHTML = `
    <h3 style="margin: 0 0 1rem 0; color: var(--_global-color-text-primary);">Size Variants</h3>
  `;
  
  const sizeGrid = document.createElement('div');
  sizeGrid.style.cssText = 'display: grid; gap: 1rem;';
  
  const sizeVariants = [
    { label: 'Small Progress', value: 40, size: 'sm' },
    { label: 'Medium Progress', value: 60, size: 'md' },
    { label: 'Large Progress', value: 80, size: 'lg' }
  ];
  
  sizeVariants.forEach(({ label, value, size }) => {
    const progress = document.createElement('my-progress');
    progress.setAttribute('label', label);
    progress.setAttribute('value', value);
    progress.setAttribute('size', size);
    progress.setAttribute('show-value', '');
    sizeGrid.appendChild(progress);
  });
  
  sizeSection.appendChild(sizeGrid);
  container.appendChild(sizeSection);

  // Special States
  const statesSection = document.createElement('div');
  statesSection.innerHTML = `
    <h3 style="margin: 0 0 1rem 0; color: var(--_global-color-text-primary);">Special States</h3>
  `;
  
  const statesGrid = document.createElement('div');
  statesGrid.style.cssText = 'display: grid; gap: 1rem;';
  
  // Indeterminate progress
  const indeterminateProgress = document.createElement('my-progress');
  indeterminateProgress.setAttribute('label', 'Loading...');
  indeterminateProgress.setAttribute('indeterminate', '');
  statesGrid.appendChild(indeterminateProgress);
  
  // Striped progress
  const stripedProgress = document.createElement('my-progress');
  stripedProgress.setAttribute('label', 'Striped Progress');
  stripedProgress.setAttribute('value', '70');
  stripedProgress.setAttribute('variant', 'striped');
  stripedProgress.setAttribute('show-value', '');
  statesGrid.appendChild(stripedProgress);
  
  // Animated progress
  const animatedProgress = document.createElement('my-progress');
  animatedProgress.setAttribute('label', 'Animated Progress');
  animatedProgress.setAttribute('value', '45');
  animatedProgress.setAttribute('animated', '');
  animatedProgress.setAttribute('show-value', '');
  statesGrid.appendChild(animatedProgress);
  
  // Buffer progress
  const bufferProgress = document.createElement('my-progress');
  bufferProgress.setAttribute('label', 'Buffered Progress');
  bufferProgress.setAttribute('value', '30');
  bufferProgress.setAttribute('buffer-value', '60');
  bufferProgress.setAttribute('show-value', '');
  statesGrid.appendChild(bufferProgress);
  
  statesSection.appendChild(statesGrid);
  container.appendChild(statesSection);

  // Circular Progress
  const circularSection = document.createElement('div');
  circularSection.innerHTML = `
    <h3 style="margin: 0 0 1rem 0; color: var(--_global-color-text-primary);">Circular Progress</h3>
  `;
  
  const circularGrid = document.createElement('div');
  circularGrid.style.cssText = 'display: flex; gap: 2rem; flex-wrap: wrap;';
  
  const circularVariants = [
    { label: 'Small Circular', value: 30, size: 'sm' },
    { label: 'Medium Circular', value: 65, size: 'md' },
    { label: 'Large Circular', value: 90, size: 'lg' }
  ];
  
  circularVariants.forEach(({ label, value, size }) => {
    const progress = document.createElement('my-progress');
    progress.setAttribute('label', label);
    progress.setAttribute('value', value);
    progress.setAttribute('type', 'circular');
    progress.setAttribute('size', size);
    progress.setAttribute('show-value', '');
    progress.setAttribute('variant', 'primary');
    circularGrid.appendChild(progress);
  });
  
  // Indeterminate circular
  const indeterminateCircular = document.createElement('my-progress');
  indeterminateCircular.setAttribute('label', 'Loading');
  indeterminateCircular.setAttribute('type', 'circular');
  indeterminateCircular.setAttribute('indeterminate', '');
  indeterminateCircular.setAttribute('size', 'md');
  circularGrid.appendChild(indeterminateCircular);
  
  circularSection.appendChild(circularGrid);
  container.appendChild(circularSection);

  // Interactive Demo
  const interactiveSection = document.createElement('div');
  interactiveSection.innerHTML = `
    <h3 style="margin: 0 0 1rem 0; color: var(--_global-color-text-primary);">Interactive Demo</h3>
  `;
  
  const interactiveContainer = document.createElement('div');
  interactiveContainer.style.cssText = 'display: flex; flex-direction: column; gap: 1rem;';
  
  const demoProgress = document.createElement('my-progress');
  demoProgress.setAttribute('label', 'Interactive Progress');
  demoProgress.setAttribute('value', '0');
  demoProgress.setAttribute('show-value', '');
  demoProgress.setAttribute('animated', '');
  demoProgress.setAttribute('tooltip', 'Click to interact');
  
  const controlsContainer = document.createElement('div');
  controlsContainer.style.cssText = 'display: flex; gap: 0.5rem; flex-wrap: wrap;';
  
  // Create control buttons
  const buttons = [
    { label: '25%', value: 25 },
    { label: '50%', value: 50 },
    { label: '75%', value: 75 },
    { label: '100%', value: 100 },
    { label: 'Reset', value: 0 }
  ];
  
  buttons.forEach(({ label, value }) => {
    const button = document.createElement('my-button');
    button.setAttribute('label', label);
    button.setAttribute('variant', 'outlined');
    button.setAttribute('size', 'sm');
    button.addEventListener('click', () => {
      demoProgress.value = value;
    });
    controlsContainer.appendChild(button);
  });
  
  // Add indeterminate toggle
  const indeterminateToggle = document.createElement('my-toggle');
  indeterminateToggle.setAttribute('label', 'Indeterminate');
  indeterminateToggle.addEventListener('change', (e) => {
    if (e.detail.checked) {
      demoProgress.setAttribute('indeterminate', '');
    } else {
      demoProgress.removeAttribute('indeterminate');
    }
  });
  
  interactiveContainer.appendChild(demoProgress);
  interactiveContainer.appendChild(controlsContainer);
  interactiveContainer.appendChild(indeterminateToggle);
  interactiveSection.appendChild(interactiveContainer);
  container.appendChild(interactiveSection);

  return container;
};

export const BasicProgress = () => {
  const progress = document.createElement('my-progress');
  progress.setAttribute('label', 'Basic Progress');
  progress.setAttribute('value', '65');
  progress.setAttribute('show-value', '');
  return progress;
};

export const IndeterminateProgress = () => {
  const progress = document.createElement('my-progress');
  progress.setAttribute('label', 'Loading...');
  progress.setAttribute('indeterminate', '');
  return progress;
};

export const CircularProgress = () => {
  const container = document.createElement('div');
  container.style.cssText = 'display: flex; gap: 2rem; align-items: center;';
  
  const progress1 = document.createElement('my-progress');
  progress1.setAttribute('type', 'circular');
  progress1.setAttribute('value', '75');
  progress1.setAttribute('show-value', '');
  progress1.setAttribute('label', 'Complete');
  
  const progress2 = document.createElement('my-progress');
  progress2.setAttribute('type', 'circular');
  progress2.setAttribute('indeterminate', '');
  progress2.setAttribute('label', 'Loading');
  
  container.appendChild(progress1);
  container.appendChild(progress2);
  return container;
};

export const WithBuffer = () => {
  const progress = document.createElement('my-progress');
  progress.setAttribute('label', 'Video Loading');
  progress.setAttribute('value', '30');
  progress.setAttribute('buffer-value', '60');
  progress.setAttribute('show-value', '');
  progress.setAttribute('tooltip', 'Download progress with buffer');
  return progress;
};

export const VariantShowcase = () => {
  const container = document.createElement('div');
  container.style.cssText = 'display: grid; gap: 1rem; max-width: 600px;';
  
  const variants = ['primary', 'secondary', 'success', 'warning', 'error', 'info', 'striped'];
  const values = [25, 35, 45, 55, 65, 75, 85];
  
  variants.forEach((variant, index) => {
    const progress = document.createElement('my-progress');
    progress.setAttribute('label', `${variant.charAt(0).toUpperCase() + variant.slice(1)} Progress`);
    progress.setAttribute('value', values[index]);
    progress.setAttribute('variant', variant);
    progress.setAttribute('show-value', '');
    container.appendChild(progress);
  });
  
  return container;
};

export const SizeComparison = () => {
  const container = document.createElement('div');
  container.style.cssText = 'display: grid; gap: 1rem; max-width: 400px;';
  
  const sizes = ['sm', 'md', 'lg'];
  const values = [40, 60, 80];
  
  sizes.forEach((size, index) => {
    const progress = document.createElement('my-progress');
    progress.setAttribute('label', `${size.toUpperCase()} Progress`);
    progress.setAttribute('value', values[index]);
    progress.setAttribute('size', size);
    progress.setAttribute('show-value', '');
    container.appendChild(progress);
  });
  
  return container;
};

export const AccessibilityDemo = () => {
  const container = document.createElement('div');
  container.style.cssText = 'display: grid; gap: 1.5rem; max-width: 600px;';
  
  // Properly labeled progress
  const labeledProgress = document.createElement('my-progress');
  labeledProgress.setAttribute('label', 'File Upload Progress');
  labeledProgress.setAttribute('value', '67');
  labeledProgress.setAttribute('show-value', '');
  labeledProgress.setAttribute('tooltip', 'Uploading file: document.pdf');
  
  // Progress with custom range
  const customRangeProgress = document.createElement('my-progress');
  customRangeProgress.setAttribute('label', 'Custom Range (10-90)');
  customRangeProgress.setAttribute('value', '45');
  customRangeProgress.setAttribute('min', '10');
  customRangeProgress.setAttribute('max', '90');
  customRangeProgress.setAttribute('show-value', '');
  
  // Clickable progress
  const clickableProgress = document.createElement('my-progress');
  clickableProgress.setAttribute('label', 'Clickable Progress');
  clickableProgress.setAttribute('value', '30');
  clickableProgress.setAttribute('show-value', '');
  clickableProgress.setAttribute('tooltip', 'Click anywhere to set progress');
  
  // Add click handler
  clickableProgress.addEventListener('click', (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = (clickX / rect.width) * 100;
    clickableProgress.setAttribute('value', Math.round(percentage));
  });
  
  container.appendChild(labeledProgress);
  container.appendChild(customRangeProgress);
  container.appendChild(clickableProgress);
  
  return container;
};