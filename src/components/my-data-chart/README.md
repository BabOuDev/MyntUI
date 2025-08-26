# my-data-chart

A flexible data visualization component based on D3.js for rendering various chart types with Material Design 3 styling.

## Features

- 🎯 **Multiple Chart Types**: Bar, line, pie, scatter, and area charts
- 🎨 **Material Design 3**: Consistent styling with design system variables
- 📊 **D3.js Integration**: Powerful visualizations with industry-standard library
- 🔍 **Query Support**: Built-in filtering, sorting, and searching capabilities
- 📱 **Responsive Design**: Automatic resizing with responsive attribute
- ♿ **Accessible**: ARIA labels and keyboard navigation support
- 🎭 **Interactive**: Hover effects and smooth animations

## Usage

### Basic Usage

```html
<my-data-chart 
  chart-type="bar" 
  data='[{"label":"A","value":10},{"label":"B","value":20}]'
  width="400" 
  height="300">
</my-data-chart>
```

### Chart Types

#### Bar Chart
```html
<my-data-chart 
  chart-type="bar" 
  data='[{"label":"Q1","value":100},{"label":"Q2","value":150},{"label":"Q3","value":120}]'
  x-axis-label="Quarter" 
  y-axis-label="Revenue">
</my-data-chart>
```

#### Line Chart
```html
<my-data-chart 
  chart-type="line" 
  data='[{"x":0,"y":10},{"x":1,"y":20},{"x":2,"y":15},{"x":3,"y":25}]'>
</my-data-chart>
```

#### Pie Chart
```html
<my-data-chart 
  chart-type="pie" 
  data='[{"name":"Chrome","value":65},{"name":"Safari","value":20},{"name":"Firefox","value":15}]'>
</my-data-chart>
```

#### Scatter Plot
```html
<my-data-chart 
  chart-type="scatter" 
  data='[{"x":1,"y":2,"size":5},{"x":3,"y":4,"size":8},{"x":2,"y":6,"size":3}]'>
</my-data-chart>
```

#### Area Chart
```html
<my-data-chart 
  chart-type="area" 
  data='[{"x":0,"y":10},{"x":1,"y":30},{"x":2,"y":20},{"x":3,"y":40}]'>
</my-data-chart>
```

### Advanced Configuration

#### With Query Support
```html
<my-data-chart 
  chart-type="bar"
  data='[{"category":"A","value":10,"region":"US"},{"category":"B","value":20,"region":"EU"}]'
  query='{"filtersBy":[{"field":"region","operator":"eq","value":"US"}],"sortBy":[{"field":"value","direction":"desc"}]}'>
</my-data-chart>
```

#### Responsive Chart
```html
<my-data-chart 
  chart-type="line" 
  data='[...]'
  responsive
  style="width: 100%; min-height: 300px;">
</my-data-chart>
```

#### With Custom Options
```html
<my-data-chart 
  chart-type="bar"
  data='[...]'
  options='{"xAxisLabel":"Products","yAxisLabel":"Sales","colorScale":["#ff6b6b","#4ecdc4","#45b7d1"]}'>
</my-data-chart>
```

## JavaScript API

### Properties

#### `data`
- **Type**: Array of objects
- **Description**: The data to visualize

```javascript
chart.data = [
  { label: 'A', value: 10 },
  { label: 'B', value: 20 }
];
```

#### `chartType`
- **Type**: String
- **Default**: `'bar'`
- **Options**: `'bar'`, `'line'`, `'pie'`, `'scatter'`, `'area'`

```javascript
chart.chartType = 'line';
```

#### `options`
- **Type**: Object
- **Description**: Chart-specific configuration options

```javascript
chart.options = {
  xAxisLabel: 'Time',
  yAxisLabel: 'Value',
  colorScale: ['#ff6b6b', '#4ecdc4', '#45b7d1']
};
```

#### `query`
- **Type**: Object
- **Description**: Query object for filtering and sorting data

```javascript
chart.query = {
  searchBy: 'product',
  filtersBy: [
    { field: 'category', operator: 'eq', value: 'electronics' }
  ],
  sortBy: [
    { field: 'value', direction: 'desc' }
  ]
};
```

### Methods

#### `redrawChart()`
Manually trigger a chart redraw.

```javascript
chart.redrawChart();
```

### Events

#### `chart-render`
Fired when the chart is successfully rendered.

```javascript
chart.addEventListener('chart-render', (event) => {
  console.log('Chart rendered:', event.detail);
});
```

#### `query-change`
Fired when the query object changes and data is reprocessed.

```javascript
chart.addEventListener('query-change', (event) => {
  console.log('Query changed:', event.detail.query);
  console.log('Processed data:', event.detail.processedData);
});
```

## Styling

The component uses Material Design 3 design tokens and can be styled using CSS custom properties:

```css
my-data-chart {
  --_chart-background: var(--_global-color-surface-variant);
  --_chart-border: var(--_global-color-primary);
  --_chart-text: var(--_global-color-on-surface);
}
```

### Available Custom Properties

- `--_chart-background`: Chart background color
- `--_chart-border`: Chart border color
- `--_chart-text`: Chart text color

## Data Format

### Bar Chart Data
```json
[
  { "label": "Category A", "value": 100 },
  { "label": "Category B", "value": 150 }
]
```

### Line Chart Data
```json
[
  { "x": 0, "y": 10 },
  { "x": 1, "y": 20 },
  { "x": 2, "y": 15 }
]
```

### Pie Chart Data
```json
[
  { "name": "Slice A", "value": 30 },
  { "name": "Slice B", "value": 70 }
]
```

### Scatter Plot Data
```json
[
  { "x": 1, "y": 2, "size": 5 },
  { "x": 3, "y": 4, "size": 8 }
]
```

## Query System

The query system supports:

### Filters
```json
{
  "filtersBy": [
    { "field": "category", "operator": "eq", "value": "A" },
    { "field": "value", "operator": "gt", "value": 50 }
  ]
}
```

**Operators**: `eq`, `ne`, `gt`, `lt`, `gte`, `lte`, `contains`

### Sorting
```json
{
  "sortBy": [
    { "field": "value", "direction": "desc" },
    { "field": "label", "direction": "asc" }
  ]
}
```

### Search
```json
{
  "searchBy": "search term"
}
```

## Browser Support

- Chrome 63+
- Firefox 63+
- Safari 13+
- Edge 79+

Requires D3.js v7+ (automatically loaded from CDN).

## Accessibility

- ARIA labels for chart descriptions
- Keyboard navigation support
- High contrast mode compatibility
- Screen reader friendly