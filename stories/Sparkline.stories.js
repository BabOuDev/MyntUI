import '../src/components/my-sparkline/my-sparkline.js';
import '../src/components/my-button/my-button.js';

export default {
  title: 'Components/my-sparkline',
  parameters: {
    docs: {
      description: {
        component: 'A small, simple line chart without axes or labels, designed to show trends in data within a compact space. Perfect for dashboards and inline data visualization.',
      },
    },
  },
  argTypes: {
    data: {
      control: 'text',
      description: 'JSON string of numeric data array',
    },
    color: {
      control: 'color',
      description: 'Line color',
    },
    width: {
      control: { type: 'number', min: 50, max: 400 },
      description: 'Sparkline width in pixels',
    },
    height: {
      control: { type: 'number', min: 20, max: 200 },
      description: 'Sparkline height in pixels',
    },
    lineWidth: {
      control: { type: 'number', min: 0.5, max: 5, step: 0.5 },
      description: 'Line thickness',
    },
    variant: {
      control: { type: 'select' },
      options: ['line', 'success', 'warning', 'error', 'info'],
      description: 'Sparkline color variant',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Predefined size variant',
    },
    animated: {
      control: 'boolean',
      description: 'Enable draw animation',
    },
    fill: {
      control: 'boolean',
      description: 'Fill area under line',
    },
    gradient: {
      control: 'boolean',
      description: 'Use gradient fill',
    },
    dots: {
      control: 'boolean',
      description: 'Show data point dots',
    },
    smooth: {
      control: 'boolean',
      description: 'Use smooth curved lines',
    },
  },
};

// Generate sample data for demos
const generateSampleData = (count = 20, min = 10, max = 100) => {
  return Array.from({ length: count }, () => 
    Math.floor(Math.random() * (max - min + 1)) + min
  );
};

const Template = (args) => {
  const container = document.createElement('div');
  container.style.cssText = 'padding: 24px; display: flex; flex-direction: column; gap: 16px; align-items: flex-start;';
  
  const sparkline = document.createElement('my-sparkline');
  
  // Set properties
  if (args.data) sparkline.setAttribute('data', args.data);
  if (args.color && args.color !== 'var(--_global-color-primary)') sparkline.setAttribute('color', args.color);
  if (args.width && args.width !== 120) sparkline.setAttribute('width', args.width);
  if (args.height && args.height !== 40) sparkline.setAttribute('height', args.height);
  if (args.lineWidth && args.lineWidth !== 2) sparkline.setAttribute('line-width', args.lineWidth);
  if (args.variant && args.variant !== 'line') sparkline.setAttribute('variant', args.variant);
  if (args.size && args.size !== 'md') sparkline.setAttribute('size', args.size);
  if (args.animated) sparkline.setAttribute('animated', '');
  if (args.fill) sparkline.setAttribute('fill', '');
  if (args.gradient) sparkline.setAttribute('gradient', '');
  if (args.dots) sparkline.setAttribute('dots', '');
  if (args.smooth) sparkline.setAttribute('smooth', '');

  const label = document.createElement('div');
  label.style.cssText = 'font-size: 14px; color: var(--_global-color-text-secondary);';
  label.textContent = 'Interactive Sparkline';
  
  container.appendChild(label);
  container.appendChild(sparkline);
  
  return container;
};

// Default story
export const Default = Template.bind({});
Default.args = {
  data: JSON.stringify(generateSampleData(15)),
  color: 'var(--_global-color-primary)',
  width: 120,
  height: 40,
  lineWidth: 2,
  variant: 'line',
  size: 'md',
  animated: false,
  fill: false,
  gradient: false,
  dots: false,
  smooth: false,
};

// Variant showcase
export const Variants = () => {
  const container = document.createElement('div');
  container.style.cssText = 'padding: 24px; display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 24px;';
  
  const variants = [
    { variant: 'line', label: 'Default', data: generateSampleData(12, 20, 80) },
    { variant: 'success', label: 'Success', data: generateSampleData(12, 30, 90) },
    { variant: 'warning', label: 'Warning', data: generateSampleData(12, 15, 75) },
    { variant: 'error', label: 'Error', data: generateSampleData(12, 10, 60) },
    { variant: 'info', label: 'Info', data: generateSampleData(12, 25, 85) },
  ];
  
  variants.forEach(({ variant, label, data }) => {
    const section = document.createElement('div');
    section.style.cssText = 'display: flex; flex-direction: column; gap: 8px; align-items: center;';
    
    const sparkline = document.createElement('my-sparkline');
    sparkline.setAttribute('data', JSON.stringify(data));
    if (variant !== 'line') sparkline.setAttribute('variant', variant);
    sparkline.setAttribute('animated', '');
    
    const labelElement = document.createElement('div');
    labelElement.textContent = label;
    labelElement.style.cssText = 'font-size: 14px; font-weight: var(--_global-font-weight-medium);';
    
    section.appendChild(sparkline);
    section.appendChild(labelElement);
    container.appendChild(section);
  });
  
  return container;
};
Variants.parameters = {
  docs: {
    description: {
      story: 'Different sparkline color variants for various data contexts.',
    },
  },
};

// Size variants
export const Sizes = () => {
  const container = document.createElement('div');
  container.style.cssText = 'padding: 24px; display: flex; gap: 24px; align-items: center; flex-wrap: wrap;';
  
  const sizes = [
    { size: 'sm', label: 'Small (80x24)' },
    { size: 'md', label: 'Medium (120x40)' },
    { size: 'lg', label: 'Large (160x56)' },
  ];
  
  const sampleData = generateSampleData(15, 20, 80);
  
  sizes.forEach(({ size, label }) => {
    const section = document.createElement('div');
    section.style.cssText = 'display: flex; flex-direction: column; gap: 8px; align-items: center;';
    
    const sparkline = document.createElement('my-sparkline');
    sparkline.setAttribute('data', JSON.stringify(sampleData));
    sparkline.setAttribute('size', size);
    sparkline.setAttribute('animated', '');
    
    const labelElement = document.createElement('div');
    labelElement.textContent = label;
    labelElement.style.cssText = 'font-size: 12px; color: var(--_global-color-text-secondary);';
    
    section.appendChild(sparkline);
    section.appendChild(labelElement);
    container.appendChild(section);
  });
  
  return container;
};
Sizes.parameters = {
  docs: {
    description: {
      story: 'Predefined size variants for different use cases.',
    },
  },
};

// Style options
export const StyleOptions = () => {
  const container = document.createElement('div');
  container.style.cssText = 'padding: 24px; display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px;';
  
  const baseData = generateSampleData(18, 15, 85);
  
  const options = [
    { name: 'Basic Line', config: {} },
    { name: 'Filled Area', config: { fill: true } },
    { name: 'With Gradient', config: { fill: true, gradient: true } },
    { name: 'Smooth Curves', config: { smooth: true } },
    { name: 'With Data Points', config: { dots: true } },
    { name: 'Full Featured', config: { fill: true, gradient: true, smooth: true, dots: true } },
  ];
  
  options.forEach(({ name, config }) => {
    const section = document.createElement('div');
    section.style.cssText = 'display: flex; flex-direction: column; gap: 12px;';
    
    const title = document.createElement('h4');
    title.textContent = name;
    title.style.cssText = 'margin: 0; font-size: 16px; font-weight: var(--_global-font-weight-medium);';
    
    const sparkline = document.createElement('my-sparkline');
    sparkline.setAttribute('data', JSON.stringify(baseData));
    sparkline.setAttribute('animated', '');
    
    // Apply configuration
    Object.entries(config).forEach(([key, value]) => {
      if (value) sparkline.setAttribute(key, '');
    });
    
    section.appendChild(title);
    section.appendChild(sparkline);
    container.appendChild(section);
  });
  
  return container;
};
StyleOptions.parameters = {
  docs: {
    description: {
      story: 'Different styling options including fill, gradient, smooth curves, and data points.',
    },
  },
};

// Real-world data examples
export const RealWorldExamples = () => {
  const container = document.createElement('div');
  container.style.cssText = 'padding: 24px; display: flex; flex-direction: column; gap: 32px;';
  
  // Stock price example
  const stockSection = document.createElement('div');
  stockSection.style.cssText = 'display: flex; flex-direction: column; gap: 12px;';
  
  const stockTitle = document.createElement('h3');
  stockTitle.textContent = 'Stock Price Trend';
  stockTitle.style.cssText = 'margin: 0; font-size: 18px; font-weight: var(--_global-font-weight-medium);';
  
  const stockData = [145, 148, 142, 155, 160, 158, 162, 159, 165, 170, 168, 175, 172, 180, 185];
  const stockSparkline = document.createElement('my-sparkline');
  stockSparkline.setAttribute('data', JSON.stringify(stockData));
  stockSparkline.setAttribute('variant', 'success');
  stockSparkline.setAttribute('fill', '');
  stockSparkline.setAttribute('gradient', '');
  stockSparkline.setAttribute('animated', '');
  stockSparkline.setAttribute('width', '200');
  
  const stockLabel = document.createElement('div');
  stockLabel.innerHTML = `<strong>$${stockData[stockData.length - 1]}</strong> <span style="color: var(--_global-color-success);">+${((stockData[stockData.length - 1] - stockData[0]) / stockData[0] * 100).toFixed(1)}%</span>`;
  stockLabel.style.cssText = 'font-size: 14px;';
  
  stockSection.appendChild(stockTitle);
  stockSection.appendChild(stockSparkline);
  stockSection.appendChild(stockLabel);
  
  // Server response time example
  const serverSection = document.createElement('div');
  serverSection.style.cssText = 'display: flex; flex-direction: column; gap: 12px;';
  
  const serverTitle = document.createElement('h3');
  serverTitle.textContent = 'Server Response Times (ms)';
  serverTitle.style.cssText = 'margin: 0; font-size: 18px; font-weight: var(--_global-font-weight-medium);';
  
  const serverData = [120, 115, 125, 110, 140, 160, 155, 130, 125, 115, 108, 112, 118, 122, 119];
  const serverSparkline = document.createElement('my-sparkline');
  serverSparkline.setAttribute('data', JSON.stringify(serverData));
  serverSparkline.setAttribute('variant', 'warning');
  serverSparkline.setAttribute('smooth', '');
  serverSparkline.setAttribute('animated', '');
  serverSparkline.setAttribute('width', '200');
  
  const serverLabel = document.createElement('div');
  serverLabel.innerHTML = `Average: <strong>${Math.round(serverData.reduce((a, b) => a + b) / serverData.length)}ms</strong>`;
  serverLabel.style.cssText = 'font-size: 14px;';
  
  serverSection.appendChild(serverTitle);
  serverSection.appendChild(serverSparkline);
  serverSection.appendChild(serverLabel);
  
  // Sales data example
  const salesSection = document.createElement('div');
  salesSection.style.cssText = 'display: flex; flex-direction: column; gap: 12px;';
  
  const salesTitle = document.createElement('h3');
  salesTitle.textContent = 'Daily Sales';
  salesTitle.style.cssText = 'margin: 0; font-size: 18px; font-weight: var(--_global-font-weight-medium);';
  
  const salesData = [1200, 1350, 980, 1100, 1450, 1600, 1380, 1550, 1720, 1900, 1650, 1800, 2100, 2350, 2200];
  const salesSparkline = document.createElement('my-sparkline');
  salesSparkline.setAttribute('data', JSON.stringify(salesData));
  salesSparkline.setAttribute('variant', 'info');
  salesSparkline.setAttribute('fill', '');
  salesSparkline.setAttribute('dots', '');
  salesSparkline.setAttribute('animated', '');
  salesSparkline.setAttribute('width', '200');
  
  const salesLabel = document.createElement('div');
  salesLabel.innerHTML = `Total: <strong>$${(salesData.reduce((a, b) => a + b) / 1000).toFixed(1)}K</strong>`;
  salesLabel.style.cssText = 'font-size: 14px;';
  
  salesSection.appendChild(salesTitle);
  salesSection.appendChild(salesSparkline);
  salesSection.appendChild(salesLabel);
  
  container.appendChild(stockSection);
  container.appendChild(serverSection);
  container.appendChild(salesSection);
  
  return container;
};
RealWorldExamples.parameters = {
  docs: {
    description: {
      story: 'Real-world examples showing stock prices, server metrics, and sales data.',
    },
  },
};

// Interactive dashboard example
export const InteractiveDashboard = () => {
  const container = document.createElement('div');
  container.style.cssText = 'padding: 24px; max-width: 800px;';
  
  const title = document.createElement('h3');
  title.textContent = 'Analytics Dashboard';
  title.style.cssText = 'margin: 0 0 24px 0; font-size: 20px; font-weight: var(--_global-font-weight-medium);';
  
  const dashboard = document.createElement('div');
  dashboard.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 24px;';
  
  const metrics = [
    {
      title: 'Page Views',
      value: '12.4K',
      change: '+8.2%',
      variant: 'success',
      data: generateSampleData(20, 400, 800),
      changeType: 'positive'
    },
    {
      title: 'Bounce Rate',
      value: '34.2%',
      change: '-2.1%',
      variant: 'info',
      data: generateSampleData(20, 30, 50),
      changeType: 'positive'
    },
    {
      title: 'Load Time',
      value: '1.8s',
      change: '+0.3s',
      variant: 'warning',
      data: generateSampleData(20, 100, 250),
      changeType: 'negative'
    },
    {
      title: 'Error Rate',
      value: '0.4%',
      change: '+0.1%',
      variant: 'error',
      data: generateSampleData(20, 1, 8),
      changeType: 'negative'
    },
  ];
  
  metrics.forEach(({ title, value, change, variant, data, changeType }) => {
    const card = document.createElement('div');
    card.style.cssText = `
      background: var(--_global-color-surface-container);
      border: 1px solid var(--_global-color-outline-variant);
      border-radius: var(--_global-border-radius-lg);
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      transition: transform var(--_global-motion-duration-short2);
    `;
    
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-2px)';
      card.style.boxShadow = 'var(--_global-elevation-2)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
      card.style.boxShadow = 'none';
    });
    
    const cardHeader = document.createElement('div');
    cardHeader.style.cssText = 'display: flex; justify-content: space-between; align-items: flex-start;';
    
    const cardTitle = document.createElement('h4');
    cardTitle.textContent = title;
    cardTitle.style.cssText = 'margin: 0; font-size: 14px; font-weight: var(--_global-font-weight-medium); color: var(--_global-color-text-secondary);';
    
    const cardSparkline = document.createElement('my-sparkline');
    cardSparkline.setAttribute('data', JSON.stringify(data));
    cardSparkline.setAttribute('variant', variant);
    cardSparkline.setAttribute('size', 'sm');
    cardSparkline.setAttribute('smooth', '');
    cardSparkline.setAttribute('animated', '');
    
    cardHeader.appendChild(cardTitle);
    cardHeader.appendChild(cardSparkline);
    
    const cardMetrics = document.createElement('div');
    cardMetrics.style.cssText = 'display: flex; justify-content: space-between; align-items: baseline;';
    
    const cardValue = document.createElement('div');
    cardValue.textContent = value;
    cardValue.style.cssText = 'font-size: 24px; font-weight: var(--_global-font-weight-bold);';
    
    const cardChange = document.createElement('div');
    cardChange.textContent = change;
    cardChange.style.cssText = `
      font-size: 12px;
      font-weight: var(--_global-font-weight-medium);
      color: var(--_global-color-${changeType === 'positive' ? 'success' : 'error'});
    `;
    
    cardMetrics.appendChild(cardValue);
    cardMetrics.appendChild(cardChange);
    
    card.appendChild(cardHeader);
    card.appendChild(cardMetrics);
    dashboard.appendChild(card);
  });
  
  const refreshButton = document.createElement('my-button');
  refreshButton.setAttribute('label', 'Refresh Data');
  refreshButton.setAttribute('variant', 'outlined');
  refreshButton.style.marginTop = '24px';
  
  refreshButton.addEventListener('click', () => {
    // Regenerate data and update sparklines
    metrics.forEach((metric, index) => {
      const newData = generateSampleData(20, 
        metric.title === 'Error Rate' ? 1 : metric.title === 'Load Time' ? 100 : 200,
        metric.title === 'Error Rate' ? 8 : metric.title === 'Load Time' ? 250 : 800
      );
      const sparkline = dashboard.children[index].querySelector('my-sparkline');
      sparkline.setAttribute('data', JSON.stringify(newData));
    });
  });
  
  container.appendChild(title);
  container.appendChild(dashboard);
  container.appendChild(refreshButton);
  
  return container;
};
InteractiveDashboard.parameters = {
  docs: {
    description: {
      story: 'Interactive dashboard example with multiple sparklines showing different metrics.',
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
      <li>ARIA role="img" with descriptive labels</li>
      <li>Respects reduced motion preferences</li>
      <li>High contrast mode support</li>
      <li>Semantic SVG structure</li>
      <li>Color-blind friendly variants</li>
      <li>Clear visual hierarchy</li>
    </ul>
  `;
  
  const exampleSection = document.createElement('div');
  exampleSection.style.cssText = 'display: flex; flex-direction: column; gap: 16px;';
  
  const accessibilityData = generateSampleData(15, 20, 80);
  
  const sparkline = document.createElement('my-sparkline');
  sparkline.setAttribute('data', JSON.stringify(accessibilityData));
  sparkline.setAttribute('variant', 'success');
  sparkline.setAttribute('fill', '');
  sparkline.setAttribute('animated', '');
  
  const description = document.createElement('div');
  description.innerHTML = `
    <p style="margin: 0; font-size: 14px; color: var(--_global-color-text-secondary);">
      This sparkline includes proper ARIA labeling and respects user preferences for motion and contrast.
    </p>
  `;
  
  exampleSection.appendChild(sparkline);
  exampleSection.appendChild(description);
  
  container.appendChild(info);
  container.appendChild(exampleSection);
  
  return container;
};
Accessibility.parameters = {
  docs: {
    description: {
      story: 'Accessibility features ensuring inclusive data visualization.',
    },
  },
};