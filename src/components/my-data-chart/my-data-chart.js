/**
 * MyntUI my-data-chart Component
 * A flexible data visualization component based on D3.js for rendering various chart types
 * Supports bar, line, pie, scatter, and area charts with Material Design 3 styling
 * Enhanced version using MyntUIBaseComponent for improved consistency and maintainability
 */

import { MyntUIBaseComponent } from '../../core/base-component.js';

class MyDataChart extends MyntUIBaseComponent {
  constructor() {
    super();
    
    // Component-specific internal state
    this._data = [];
    this._chartType = 'bar';
    this._options = {};
    this._query = {};
    this._chart = null;
    this._d3Loaded = false;
    this._resizeObserver = null;
    
    // Chart dimensions
    this._dimensions = {
      width: 400,
      height: 300,
      margin: { top: 20, right: 30, bottom: 40, left: 40 }
    };
    
    // Initialize with base component pattern
    this.log('DataChart component initializing...');
    this.parseAttributes();
    
    // Load D3.js if not already loaded
    this._loadD3();
  }

  // Extended observed attributes (inherits base ones)
  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      'chart-type', 'data', 'options', 'query', 'width', 'height',
      'x-axis-label', 'y-axis-label', 'color-scale', 'responsive'
    ];
  }

  // Component-specific attribute handling
  handleAttributeChange(name, oldValue, newValue) {
    super.handleAttributeChange(name, oldValue, newValue);
    
    switch (name) {
      case 'chart-type':
        this._chartType = newValue || 'bar';
        this._redrawChart();
        break;
      case 'data':
        try {
          this._data = newValue ? JSON.parse(newValue) : [];
          this._redrawChart();
        } catch (e) {
          console.warn('Invalid data JSON in my-data-chart:', e);
          this._data = [];
        }
        break;
      case 'options':
        try {
          this._options = newValue ? JSON.parse(newValue) : {};
          this._redrawChart();
        } catch (e) {
          console.warn('Invalid options JSON in my-data-chart:', e);
          this._options = {};
        }
        break;
      case 'query':
        try {
          this._query = newValue ? JSON.parse(newValue) : {};
          this._processDataWithQuery();
        } catch (e) {
          console.warn('Invalid query JSON in my-data-chart:', e);
          this._query = {};
        }
        break;
      case 'width':
        this._dimensions.width = parseInt(newValue) || 400;
        this._redrawChart();
        break;
      case 'height':
        this._dimensions.height = parseInt(newValue) || 300;
        this._redrawChart();
        break;
    }
  }

  // Parse attributes and build configuration
  parseAttributes() {
    this._chartType = this.getAttribute('chart-type') || 'bar';
    this._dimensions.width = parseInt(this.getAttribute('width')) || 400;
    this._dimensions.height = parseInt(this.getAttribute('height')) || 300;
    
    // Parse data
    const dataAttr = this.getAttribute('data');
    if (dataAttr) {
      try {
        this._data = JSON.parse(dataAttr);
      } catch (e) {
        console.warn('Invalid data JSON:', e);
        this._data = [];
      }
    }
    
    // Parse options
    const optionsAttr = this.getAttribute('options');
    if (optionsAttr) {
      try {
        this._options = JSON.parse(optionsAttr);
      } catch (e) {
        console.warn('Invalid options JSON:', e);
        this._options = {};
      }
    }
    
    // Parse query
    const queryAttr = this.getAttribute('query');
    if (queryAttr) {
      try {
        this._query = JSON.parse(queryAttr);
      } catch (e) {
        console.warn('Invalid query JSON:', e);
        this._query = {};
      }
    }
  }

  // Load D3.js library
  async _loadD3() {
    if (window.d3) {
      this._d3Loaded = true;
      this._redrawChart();
      return;
    }
    
    try {
      // Load D3.js from CDN
      const script = document.createElement('script');
      script.src = 'https://d3js.org/d3.v7.min.js';
      script.onload = () => {
        this._d3Loaded = true;
        this.log('D3.js loaded successfully');
        this._redrawChart();
      };
      script.onerror = () => {
        console.error('Failed to load D3.js');
      };
      document.head.appendChild(script);
    } catch (error) {
      console.error('Error loading D3.js:', error);
    }
  }

  // Process data with query filters
  _processDataWithQuery() {
    if (!this._query || Object.keys(this._query).length === 0) {
      this._processedData = this._data;
      this._redrawChart();
      return;
    }
    
    let processedData = [...this._data];
    
    // Apply filters
    if (this._query.filtersBy && Array.isArray(this._query.filtersBy)) {
      this._query.filtersBy.forEach(filter => {
        processedData = processedData.filter(item => {
          const value = item[filter.field];
          switch (filter.operator) {
            case 'eq': return value === filter.value;
            case 'ne': return value !== filter.value;
            case 'gt': return value > filter.value;
            case 'lt': return value < filter.value;
            case 'gte': return value >= filter.value;
            case 'lte': return value <= filter.value;
            case 'contains': return String(value).toLowerCase().includes(String(filter.value).toLowerCase());
            default: return true;
          }
        });
      });
    }
    
    // Apply search
    if (this._query.searchBy) {
      const searchTerm = this._query.searchBy.toLowerCase();
      processedData = processedData.filter(item => 
        Object.values(item).some(value => 
          String(value).toLowerCase().includes(searchTerm)
        )
      );
    }
    
    // Apply sorting
    if (this._query.sortBy && Array.isArray(this._query.sortBy)) {
      this._query.sortBy.forEach(sort => {
        processedData.sort((a, b) => {
          const aVal = a[sort.field];
          const bVal = b[sort.field];
          const comparison = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
          return sort.direction === 'desc' ? -comparison : comparison;
        });
      });
    }
    
    this._processedData = processedData;
    this._redrawChart();
    
    // Emit query-change event
    this.emitEvent('query-change', { query: this._query, processedData });
  }

  // Redraw chart when data or options change
  _redrawChart() {
    if (!this._d3Loaded || !this.shadowRoot) return;
    
    const container = this.shadowRoot.querySelector('.chart-container');
    if (!container) return;
    
    // Clear previous chart
    const d3 = window.d3;
    d3.select(container).select('svg').remove();
    
    const data = this._processedData || this._data;
    if (!data || data.length === 0) return;
    
    try {
      switch (this._chartType) {
        case 'bar':
          this._drawBarChart(container, data);
          break;
        case 'line':
          this._drawLineChart(container, data);
          break;
        case 'pie':
          this._drawPieChart(container, data);
          break;
        case 'scatter':
          this._drawScatterChart(container, data);
          break;
        case 'area':
          this._drawAreaChart(container, data);
          break;
        default:
          console.warn(`Unsupported chart type: ${this._chartType}`);
          this._drawBarChart(container, data);
      }
      
      this.emitEvent('chart-render', { chartType: this._chartType, data });
    } catch (error) {
      console.error('Error drawing chart:', error);
    }
  }

  // Draw bar chart
  _drawBarChart(container, data) {
    const d3 = window.d3;
    const { width, height, margin } = this._dimensions;
    
    const svg = d3.select(container)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('class', 'chart-svg');
    
    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);
    
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;
    
    // Scales
    const xScale = d3.scaleBand()
      .domain(data.map(d => d.label || d.name || d.x))
      .range([0, chartWidth])
      .padding(0.1);
    
    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value || d.y)])
      .nice()
      .range([chartHeight, 0]);
    
    // Color scale
    const colorScale = d3.scaleOrdinal()
      .domain(data.map(d => d.label || d.name || d.x))
      .range(['var(--_global-color-primary)', 'var(--_global-color-secondary)', 'var(--_global-color-tertiary)']);
    
    // Bars
    g.selectAll('.bar')
      .data(data)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', d => xScale(d.label || d.name || d.x))
      .attr('width', xScale.bandwidth())
      .attr('y', d => yScale(d.value || d.y))
      .attr('height', d => chartHeight - yScale(d.value || d.y))
      .attr('fill', d => colorScale(d.label || d.name || d.x))
      .attr('rx', 4)
      .style('transition', 'all var(--_global-animation-duration-normal) var(--_global-animation-easing-standard)');
    
    // X axis
    g.append('g')
      .attr('transform', `translate(0,${chartHeight})`)
      .call(d3.axisBottom(xScale));
    
    // Y axis
    g.append('g')
      .call(d3.axisLeft(yScale));
    
    // Axis labels
    if (this._options.xAxisLabel || this.getAttribute('x-axis-label')) {
      g.append('text')
        .attr('transform', `translate(${chartWidth / 2}, ${chartHeight + margin.bottom})`)
        .style('text-anchor', 'middle')
        .text(this._options.xAxisLabel || this.getAttribute('x-axis-label'));
    }
    
    if (this._options.yAxisLabel || this.getAttribute('y-axis-label')) {
      g.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 0 - margin.left)
        .attr('x', 0 - (chartHeight / 2))
        .attr('dy', '1em')
        .style('text-anchor', 'middle')
        .text(this._options.yAxisLabel || this.getAttribute('y-axis-label'));
    }
  }

  // Draw line chart
  _drawLineChart(container, data) {
    const d3 = window.d3;
    const { width, height, margin } = this._dimensions;
    
    const svg = d3.select(container)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('class', 'chart-svg');
    
    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);
    
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;
    
    // Scales
    const xScale = d3.scaleLinear()
      .domain(d3.extent(data, (d, i) => d.x || i))
      .range([0, chartWidth]);
    
    const yScale = d3.scaleLinear()
      .domain(d3.extent(data, d => d.y || d.value))
      .nice()
      .range([chartHeight, 0]);
    
    // Line generator
    const line = d3.line()
      .x(d => xScale(d.x || data.indexOf(d)))
      .y(d => yScale(d.y || d.value))
      .curve(d3.curveMonotoneX);
    
    // Draw line
    g.append('path')
      .datum(data)
      .attr('class', 'line')
      .attr('d', line)
      .style('fill', 'none')
      .style('stroke', 'var(--_global-color-primary)')
      .style('stroke-width', 2)
      .style('transition', 'all var(--_global-animation-duration-normal) var(--_global-animation-easing-standard)');
    
    // Draw points
    g.selectAll('.dot')
      .data(data)
      .enter().append('circle')
      .attr('class', 'dot')
      .attr('cx', (d, i) => xScale(d.x || i))
      .attr('cy', d => yScale(d.y || d.value))
      .attr('r', 4)
      .style('fill', 'var(--_global-color-primary)');
    
    // X axis
    g.append('g')
      .attr('transform', `translate(0,${chartHeight})`)
      .call(d3.axisBottom(xScale));
    
    // Y axis
    g.append('g')
      .call(d3.axisLeft(yScale));
  }

  // Draw pie chart
  _drawPieChart(container, data) {
    const d3 = window.d3;
    const { width, height } = this._dimensions;
    
    const radius = Math.min(width, height) / 2;
    
    const svg = d3.select(container)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('class', 'chart-svg');
    
    const g = svg.append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);
    
    // Color scale
    const colorScale = d3.scaleOrdinal()
      .domain(data.map(d => d.label || d.name))
      .range(d3.schemeCategory10);
    
    // Pie generator
    const pie = d3.pie()
      .value(d => d.value);
    
    // Arc generator
    const arc = d3.arc()
      .innerRadius(0)
      .outerRadius(radius - 10);
    
    // Draw pie slices
    const arcs = g.selectAll('.arc')
      .data(pie(data))
      .enter().append('g')
      .attr('class', 'arc');
    
    arcs.append('path')
      .attr('d', arc)
      .style('fill', d => colorScale(d.data.label || d.data.name))
      .style('stroke', 'var(--_global-color-surface)')
      .style('stroke-width', 2)
      .style('transition', 'all var(--_global-animation-duration-normal) var(--_global-animation-easing-standard)');
    
    // Add labels
    arcs.append('text')
      .attr('transform', d => `translate(${arc.centroid(d)})`)
      .attr('dy', '0.35em')
      .style('text-anchor', 'middle')
      .style('font-size', '12px')
      .text(d => d.data.label || d.data.name);
  }

  // Draw scatter chart
  _drawScatterChart(container, data) {
    const d3 = window.d3;
    const { width, height, margin } = this._dimensions;
    
    const svg = d3.select(container)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('class', 'chart-svg');
    
    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);
    
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;
    
    // Scales
    const xScale = d3.scaleLinear()
      .domain(d3.extent(data, d => d.x))
      .range([0, chartWidth]);
    
    const yScale = d3.scaleLinear()
      .domain(d3.extent(data, d => d.y))
      .range([chartHeight, 0]);
    
    // Draw points
    g.selectAll('.dot')
      .data(data)
      .enter().append('circle')
      .attr('class', 'dot')
      .attr('cx', d => xScale(d.x))
      .attr('cy', d => yScale(d.y))
      .attr('r', d => d.size || 5)
      .style('fill', 'var(--_global-color-primary)')
      .style('opacity', 0.7)
      .style('transition', 'all var(--_global-animation-duration-normal) var(--_global-animation-easing-standard)');
    
    // X axis
    g.append('g')
      .attr('transform', `translate(0,${chartHeight})`)
      .call(d3.axisBottom(xScale));
    
    // Y axis
    g.append('g')
      .call(d3.axisLeft(yScale));
  }

  // Draw area chart
  _drawAreaChart(container, data) {
    const d3 = window.d3;
    const { width, height, margin } = this._dimensions;
    
    const svg = d3.select(container)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('class', 'chart-svg');
    
    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);
    
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;
    
    // Scales
    const xScale = d3.scaleLinear()
      .domain(d3.extent(data, (d, i) => d.x || i))
      .range([0, chartWidth]);
    
    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.y || d.value)])
      .nice()
      .range([chartHeight, 0]);
    
    // Area generator
    const area = d3.area()
      .x((d, i) => xScale(d.x || i))
      .y0(chartHeight)
      .y1(d => yScale(d.y || d.value))
      .curve(d3.curveMonotoneX);
    
    // Draw area
    g.append('path')
      .datum(data)
      .attr('class', 'area')
      .attr('d', area)
      .style('fill', 'var(--_global-color-primary)')
      .style('fill-opacity', 0.3)
      .style('transition', 'all var(--_global-animation-duration-normal) var(--_global-animation-easing-standard)');
    
    // Draw line
    const line = d3.line()
      .x((d, i) => xScale(d.x || i))
      .y(d => yScale(d.y || d.value))
      .curve(d3.curveMonotoneX);
    
    g.append('path')
      .datum(data)
      .attr('class', 'line')
      .attr('d', line)
      .style('fill', 'none')
      .style('stroke', 'var(--_global-color-primary)')
      .style('stroke-width', 2);
    
    // X axis
    g.append('g')
      .attr('transform', `translate(0,${chartHeight})`)
      .call(d3.axisBottom(xScale));
    
    // Y axis
    g.append('g')
      .call(d3.axisLeft(yScale));
  }

  // Setup resize observer for responsive behavior
  _setupResizeObserver() {
    if (!this.hasAttribute('responsive')) return;
    
    this._resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        this._dimensions.width = width;
        this._dimensions.height = height;
        this._redrawChart();
      }
    });
    
    this._resizeObserver.observe(this);
  }

  // Connected callback
  connectedCallback() {
    super.connectedCallback();
    this._setupResizeObserver();
  }

  // Disconnected callback
  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._resizeObserver) {
      this._resizeObserver.disconnect();
      this._resizeObserver = null;
    }
  }

  // Public API methods
  set data(value) {
    this._data = value;
    this._processDataWithQuery();
  }

  get data() {
    return this._data;
  }

  set chartType(value) {
    this._chartType = value;
    this._redrawChart();
  }

  get chartType() {
    return this._chartType;
  }

  set options(value) {
    this._options = value;
    this._redrawChart();
  }

  get options() {
    return this._options;
  }

  set query(value) {
    this._query = value;
    this._processDataWithQuery();
  }

  get query() {
    return this._query;
  }

  // Render method
  render() {
    return `
      <style>
        :host {
          --_chart-background: var(--_global-color-surface);
          --_chart-border: var(--_global-color-outline-variant);
          --_chart-text: var(--_global-color-on-surface);
          
          display: block;
          background: var(--_chart-background);
          border: 1px solid var(--_chart-border);
          border-radius: var(--_global-border-radius-lg);
          padding: var(--_global-spacing-lg);
          color: var(--_chart-text);
          font-family: var(--_global-font-family-sans);
          position: relative;
          overflow: hidden;
        }

        :host([responsive]) {
          width: 100%;
          height: auto;
        }

        .chart-container {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .chart-svg {
          max-width: 100%;
          height: auto;
        }

        .loading-indicator {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 200px;
          color: var(--_global-color-on-surface-variant);
          font-size: var(--_global-font-size-body-medium);
        }

        .error-message {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 200px;
          color: var(--_global-color-error);
          font-size: var(--_global-font-size-body-medium);
        }

        /* Chart-specific styles */
        .bar {
          transition: opacity var(--_global-animation-duration-normal) var(--_global-animation-easing-standard);
        }

        .bar:hover {
          opacity: 0.8;
        }

        .line {
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .dot {
          transition: r var(--_global-animation-duration-normal) var(--_global-animation-easing-standard);
        }

        .dot:hover {
          r: 6;
        }

        .arc path {
          transition: transform var(--_global-animation-duration-normal) var(--_global-animation-easing-standard);
        }

        .arc:hover path {
          transform: scale(1.05);
        }

        /* Axis styling */
        .chart-svg .domain {
          stroke: var(--_global-color-outline);
        }

        .chart-svg .tick line {
          stroke: var(--_global-color-outline-variant);
        }

        .chart-svg .tick text {
          fill: var(--_global-color-on-surface-variant);
          font-size: 12px;
          font-family: var(--_global-font-family-sans);
        }
      </style>
      
      <div class="chart-container" role="img" aria-label="Data visualization chart">
        ${!this._d3Loaded ? '<div class="loading-indicator">Loading chart...</div>' : ''}
      </div>
    `;
  }
}

// Register the custom element
customElements.define('my-data-chart', MyDataChart);

export default MyDataChart;