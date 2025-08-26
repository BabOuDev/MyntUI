import '../src/components/my-data-chart/my-data-chart.js';

export default {
  title: 'Components/my-data-chart',
  parameters: {
    docs: {
      description: {
        component: 'A flexible data visualization component based on D3.js for rendering various chart types with Material Design 3 styling.',
      },
    },
  },
  argTypes: {
    chartType: {
      control: { type: 'select' },
      options: ['bar', 'line', 'pie', 'scatter', 'area'],
      description: 'Type of chart to render',
    },
    width: {
      control: { type: 'number', min: 200, max: 800 },
      description: 'Chart width in pixels',
    },
    height: {
      control: { type: 'number', min: 200, max: 600 },
      description: 'Chart height in pixels',
    },
    xAxisLabel: {
      control: 'text',
      description: 'X-axis label',
    },
    yAxisLabel: {
      control: 'text',
      description: 'Y-axis label',
    },
    responsive: {
      control: 'boolean',
      description: 'Enable responsive behavior',
    },
  },
};

// Sample data generators
const generateBarData = () => [
  { label: 'Q1', value: 120 },
  { label: 'Q2', value: 150 },
  { label: 'Q3', value: 180 },
  { label: 'Q4', value: 200 }
];

const generateLineData = () => [
  { x: 0, y: 10 },
  { x: 1, y: 25 },
  { x: 2, y: 15 },
  { x: 3, y: 30 },
  { x: 4, y: 20 },
  { x: 5, y: 35 }
];

const generatePieData = () => [
  { name: 'Chrome', value: 65 },
  { name: 'Safari', value: 20 },
  { name: 'Firefox', value: 10 },
  { name: 'Edge', value: 5 }
];

const generateScatterData = () => [
  { x: 1, y: 2, size: 5 },
  { x: 2, y: 3, size: 8 },
  { x: 3, y: 1, size: 3 },
  { x: 4, y: 4, size: 6 },
  { x: 5, y: 2, size: 4 },
  { x: 6, y: 5, size: 7 }
];

const generateAreaData = () => [
  { x: 0, y: 10 },
  { x: 1, y: 30 },
  { x: 2, y: 20 },
  { x: 3, y: 40 },
  { x: 4, y: 35 },
  { x: 5, y: 50 }
];

// Stories
export const BarChart = (args) => {
  const chart = document.createElement('my-data-chart');
  chart.setAttribute('chart-type', 'bar');
  chart.setAttribute('width', '500');
  chart.setAttribute('height', '300');
  chart.setAttribute('x-axis-label', 'Quarter');
  chart.setAttribute('y-axis-label', 'Revenue (k$)');
  chart.data = generateBarData();
  return chart;
};

export const LineChart = (args) => {
  const chart = document.createElement('my-data-chart');
  chart.setAttribute('chart-type', 'line');
  chart.setAttribute('width', '500');
  chart.setAttribute('height', '300');
  chart.setAttribute('x-axis-label', 'Time');
  chart.setAttribute('y-axis-label', 'Value');
  chart.data = generateLineData();
  return chart;
};

export const PieChart = (args) => {
  const chart = document.createElement('my-data-chart');
  chart.setAttribute('chart-type', 'pie');
  chart.setAttribute('width', '400');
  chart.setAttribute('height', '400');
  chart.data = generatePieData();
  return chart;
};

export const ScatterPlot = (args) => {
  const chart = document.createElement('my-data-chart');
  chart.setAttribute('chart-type', 'scatter');
  chart.setAttribute('width', '500');
  chart.setAttribute('height', '300');
  chart.setAttribute('x-axis-label', 'X Variable');
  chart.setAttribute('y-axis-label', 'Y Variable');
  chart.data = generateScatterData();
  return chart;
};

export const AreaChart = (args) => {
  const chart = document.createElement('my-data-chart');
  chart.setAttribute('chart-type', 'area');
  chart.setAttribute('width', '500');
  chart.setAttribute('height', '300');
  chart.setAttribute('x-axis-label', 'Time');
  chart.setAttribute('y-axis-label', 'Value');
  chart.data = generateAreaData();
  return chart;
};

export const ResponsiveChart = (args) => {
  const container = document.createElement('div');
  container.style.width = '100%';
  container.style.height = '400px';
  container.style.border = '2px dashed var(--_global-color-outline-variant)';
  container.style.borderRadius = 'var(--_global-border-radius-md)';
  container.style.padding = 'var(--_global-spacing-md)';
  
  const chart = document.createElement('my-data-chart');
  chart.setAttribute('chart-type', 'line');
  chart.setAttribute('responsive', '');
  chart.style.width = '100%';
  chart.style.height = '100%';
  chart.data = generateLineData();
  
  container.appendChild(chart);
  return container;
};

export const InteractiveCharts = () => {
  const container = document.createElement('div');
  container.style.display = 'grid';
  container.style.gridTemplateColumns = 'repeat(auto-fit, minmax(300px, 1fr))';
  container.style.gap = 'var(--_global-spacing-lg)';
  container.style.padding = 'var(--_global-spacing-lg)';
  
  const chartTypes = [
    { type: 'bar', data: generateBarData(), title: 'Quarterly Revenue' },
    { type: 'line', data: generateLineData(), title: 'Growth Trend' },
    { type: 'pie', data: generatePieData(), title: 'Browser Usage' },
    { type: 'scatter', data: generateScatterData(), title: 'Correlation Analysis' }
  ];
  
  chartTypes.forEach(({ type, data, title }) => {
    const chartContainer = document.createElement('div');
    chartContainer.style.background = 'var(--_global-color-surface-container-lowest)';
    chartContainer.style.borderRadius = 'var(--_global-border-radius-lg)';
    chartContainer.style.padding = 'var(--_global-spacing-md)';
    chartContainer.style.border = '1px solid var(--_global-color-outline-variant)';
    
    const titleElement = document.createElement('h3');
    titleElement.textContent = title;
    titleElement.style.margin = '0 0 var(--_global-spacing-md) 0';
    titleElement.style.color = 'var(--_global-color-on-surface)';
    titleElement.style.fontSize = 'var(--_global-font-size-title-medium)';
    titleElement.style.fontWeight = 'var(--_global-font-weight-medium)';
    
    const chart = document.createElement('my-data-chart');
    chart.setAttribute('chart-type', type);
    chart.setAttribute('width', '350');
    chart.setAttribute('height', '250');
    chart.data = data;
    
    chartContainer.appendChild(titleElement);
    chartContainer.appendChild(chart);
    container.appendChild(chartContainer);
  });
  
  return container;
};

export const WithQueryFiltering = () => {
  const container = document.createElement('div');
  container.style.display = 'flex';
  container.style.flexDirection = 'column';
  container.style.gap = 'var(--_global-spacing-lg)';
  container.style.padding = 'var(--_global-spacing-lg)';
  
  // Sample data with multiple dimensions
  const salesData = [
    { product: 'Laptop', category: 'Electronics', value: 1200, region: 'US' },
    { product: 'Mouse', category: 'Electronics', value: 50, region: 'US' },
    { product: 'Keyboard', category: 'Electronics', value: 80, region: 'EU' },
    { product: 'Monitor', category: 'Electronics', value: 300, region: 'US' },
    { product: 'Chair', category: 'Furniture', value: 200, region: 'EU' },
    { product: 'Desk', category: 'Furniture', value: 400, region: 'US' }
  ];
  
  // Create controls
  const controlsContainer = document.createElement('div');
  controlsContainer.style.background = 'var(--_global-color-surface-container)';
  controlsContainer.style.padding = 'var(--_global-spacing-md)';
  controlsContainer.style.borderRadius = 'var(--_global-border-radius-md)';
  controlsContainer.style.display = 'flex';
  controlsContainer.style.gap = 'var(--_global-spacing-md)';
  controlsContainer.style.alignItems = 'center';
  
  const categoryFilter = document.createElement('select');
  categoryFilter.style.padding = 'var(--_global-spacing-sm)';
  categoryFilter.style.borderRadius = 'var(--_global-border-radius-sm)';
  categoryFilter.style.border = '1px solid var(--_global-color-outline)';
  categoryFilter.innerHTML = `
    <option value="">All Categories</option>
    <option value="Electronics">Electronics</option>
    <option value="Furniture">Furniture</option>
  `;
  
  const regionFilter = document.createElement('select');
  regionFilter.style.padding = 'var(--_global-spacing-sm)';
  regionFilter.style.borderRadius = 'var(--_global-border-radius-sm)';
  regionFilter.style.border = '1px solid var(--_global-color-outline)';
  regionFilter.innerHTML = `
    <option value="">All Regions</option>
    <option value="US">United States</option>
    <option value="EU">Europe</option>
  `;
  
  const sortSelect = document.createElement('select');
  sortSelect.style.padding = 'var(--_global-spacing-sm)';
  sortSelect.style.borderRadius = 'var(--_global-border-radius-sm)';
  sortSelect.style.border = '1px solid var(--_global-color-outline)';
  sortSelect.innerHTML = `
    <option value="product:asc">Product A-Z</option>
    <option value="value:desc">Value High-Low</option>
    <option value="value:asc">Value Low-High</option>
  `;
  
  controlsContainer.appendChild(document.createTextNode('Filter by: '));
  controlsContainer.appendChild(categoryFilter);
  controlsContainer.appendChild(regionFilter);
  controlsContainer.appendChild(document.createTextNode(' Sort by: '));
  controlsContainer.appendChild(sortSelect);
  
  // Create chart
  const chart = document.createElement('my-data-chart');
  chart.setAttribute('chart-type', 'bar');
  chart.setAttribute('width', '600');
  chart.setAttribute('height', '350');
  chart.setAttribute('x-axis-label', 'Products');
  chart.setAttribute('y-axis-label', 'Sales Value ($)');
  chart.data = salesData.map(item => ({ label: item.product, value: item.value }));
  
  // Update chart based on filters
  const updateChart = () => {
    const filters = [];
    
    if (categoryFilter.value) {
      filters.push({ field: 'category', operator: 'eq', value: categoryFilter.value });
    }
    
    if (regionFilter.value) {
      filters.push({ field: 'region', operator: 'eq', value: regionFilter.value });
    }
    
    const [sortField, sortDirection] = sortSelect.value.split(':');
    const sortBy = [{ field: sortField, direction: sortDirection }];
    
    chart.query = { filtersBy: filters, sortBy };
    chart.data = salesData;
  };
  
  // Add event listeners
  categoryFilter.addEventListener('change', updateChart);
  regionFilter.addEventListener('change', updateChart);
  sortSelect.addEventListener('change', updateChart);
  
  // Initial update
  updateChart();
  
  container.appendChild(controlsContainer);
  container.appendChild(chart);
  
  return container;
};

// Set story parameters
BarChart.parameters = {
  docs: { description: { story: 'Basic bar chart showing quarterly revenue data.' } }
};

LineChart.parameters = {
  docs: { description: { story: 'Line chart displaying trends over time.' } }
};

PieChart.parameters = {
  docs: { description: { story: 'Pie chart showing distribution of browser usage.' } }
};

ScatterPlot.parameters = {
  docs: { description: { story: 'Scatter plot for correlation analysis.' } }
};

AreaChart.parameters = {
  docs: { description: { story: 'Area chart showing filled areas under the curve.' } }
};

ResponsiveChart.parameters = {
  docs: { description: { story: 'Responsive chart that adapts to container size.' } }
};

InteractiveCharts.parameters = {
  docs: { description: { story: 'Multiple interactive charts showcasing different visualization types.' } }
};

WithQueryFiltering.parameters = {
  docs: { description: { story: 'Chart with dynamic filtering and sorting capabilities using the query system.' } }
};