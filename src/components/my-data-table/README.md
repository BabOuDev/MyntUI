# my-data-table

A comprehensive, accessible data table component built with Material Design 3 principles.

## Features

- 📊 **Data Display**: Clean, organized tabular data presentation
- 🔍 **Search & Filter**: Built-in search and column filtering capabilities
- 📱 **Responsive**: Adapts to different screen sizes with horizontal scrolling
- ♿ **Accessible**: Full ARIA support and keyboard navigation
- 🎨 **Material Design 3**: Modern styling following Google's design system
- 📄 **Pagination**: Built-in pagination for large datasets
- 🔄 **Sorting**: Multi-column sorting with visual indicators
- ✅ **Selection**: Row selection with select all functionality
- 📤 **Export**: Data export in JSON and CSV formats
- 🎛️ **Customizable**: Flexible column configuration and cell rendering

## Usage

### Basic Usage

```html
<my-data-table id="basic-table"></my-data-table>

<script>
  const table = document.getElementById('basic-table');
  
  // Define columns
  table.columns = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'role', label: 'Role' }
  ];
  
  // Set data
  table.data = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' }
  ];
</script>
```

### Advanced Configuration

```html
<my-data-table 
  id="advanced-table"
  selectable
  sortable
  searchable
  paginated
  page-size="25"
  dense
  striped
></my-data-table>

<script>
  const table = document.getElementById('advanced-table');
  
  table.columns = [
    { 
      key: 'id', 
      label: 'ID', 
      type: 'number',
      sortable: true 
    },
    { 
      key: 'name', 
      label: 'Full Name', 
      sortable: true,
      render: (value, row) => `<strong>${value}</strong>`
    },
    { 
      key: 'email', 
      label: 'Email Address', 
      sortable: true 
    },
    { 
      key: 'salary', 
      label: 'Salary', 
      type: 'currency',
      sortable: true 
    },
    { 
      key: 'active', 
      label: 'Active', 
      type: 'boolean',
      render: (value) => value 
        ? '<span style="color: green">●</span>' 
        : '<span style="color: red">●</span>'
    },
    { 
      key: 'lastLogin', 
      label: 'Last Login', 
      type: 'date',
      sortable: true 
    }
  ];
  
  // Large dataset
  table.data = generateLargeDataset(1000);
  
  // Listen for events
  table.addEventListener('selection-changed', (e) => {
    console.log('Selected rows:', e.detail.selectedRows);
  });
  
  table.addEventListener('sort-changed', (e) => {
    console.log('Sorted by:', e.detail.column, e.detail.direction);
  });
</script>
```

## Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `selectable` | boolean | `false` | Enable row selection with checkboxes |
| `sortable` | boolean | `false` | Enable column sorting (also requires column config) |
| `searchable` | boolean | `false` | Show search input for filtering data |
| `paginated` | boolean | `false` | Enable pagination controls |
| `filterable` | boolean | `false` | Enable column filtering |
| `page-size` | number | `10` | Number of rows per page |
| `dense` | boolean | `false` | Use compact row height |
| `striped` | boolean | `false` | Alternate row background colors |
| `bordered` | boolean | `false` | Add borders around cells |
| `hover-effects` | boolean | `true` | Enable hover effects on rows |
| `sticky-header` | boolean | `false` | Keep header visible when scrolling |
| `loading` | boolean | `false` | Show loading state |
| `empty-message` | string | `"No data available"` | Message shown when no data |
| `loading-message` | string | `"Loading..."` | Message shown during loading |

## Properties

### columns
Array of column configuration objects.

```javascript
table.columns = [
  {
    key: 'fieldName',        // Required: data field key
    label: 'Display Name',   // Column header text
    sortable: true,          // Enable sorting for this column
    type: 'text',           // Data type: text, number, date, currency, boolean
    render: (value, row) => // Custom cell renderer function
      `<custom-element>${value}</custom-element>`
  }
];
```

### data
Array of data objects to display.

```javascript
table.data = [
  { id: 1, name: 'John', email: 'john@example.com' },
  { id: 2, name: 'Jane', email: 'jane@example.com' }
];
```

### selectedRows (read-only)
Array of selected row IDs.

```javascript
console.log(table.selectedRows); // [1, 3, 7]
```

## Column Types

| Type | Description | Example |
|------|-------------|---------|
| `text` | Plain text (default) | `"John Doe"` |
| `number` | Formatted numbers | `1,234.56` |
| `currency` | Currency formatting | `$1,234.56` |
| `date` | Date formatting | `12/31/2023` |
| `boolean` | Boolean values | `✓` or `✗` |

## Events

| Event | Detail | Description |
|-------|--------|-------------|
| `data-changed` | `{ data, totalRows }` | Fired when data is updated |
| `selection-changed` | `{ selectedRows, totalSelected }` | Fired when row selection changes |
| `sort-changed` | `{ column, direction }` | Fired when sorting changes |
| `search-changed` | `{ query }` | Fired when search query changes |
| `page-changed` | `{ page, pageSize, totalRows }` | Fired when page changes |
| `filter-changed` | `{ column, filter, activeFilters }` | Fired when column filter changes |

## Methods

### clearSelection()
Clears all selected rows.

```javascript
table.clearSelection();
```

### selectAll()
Selects all visible rows.

```javascript
table.selectAll();
```

### exportData(format)
Exports table data in specified format.

```javascript
// Export selected rows as JSON
const jsonData = table.exportData('json');

// Export all data as CSV
const csvData = table.exportData('csv');
```

## Accessibility

The component includes comprehensive accessibility features:

- **ARIA Labels**: Proper labeling for screen readers
- **Keyboard Navigation**: Full keyboard support for all interactions
- **Focus Management**: Logical tab order and focus indicators
- **Screen Reader Support**: Announces state changes and actions
- **High Contrast**: Supports high contrast mode
- **Reduced Motion**: Respects user's motion preferences

## Styling

The component uses CSS custom properties for theming:

```css
my-data-table {
  --_table-background: var(--_global-color-surface);
  --_table-border-color: var(--_global-color-outline-variant);
  --_table-header-background: var(--_global-color-surface-container-low);
  --_table-row-background-selected: color-mix(in srgb, var(--_global-color-primary) 12%, var(--_global-color-surface));
  /* ... more variables available */
}
```

## Examples

### Custom Cell Rendering

```javascript
table.columns = [
  {
    key: 'status',
    label: 'Status',
    render: (value) => {
      const color = value === 'active' ? 'green' : 'red';
      return `<span style="color: ${color}; font-weight: bold;">${value}</span>`;
    }
  },
  {
    key: 'actions',
    label: 'Actions',
    render: (value, row) => `
      <button onclick="editRow(${row.id})">Edit</button>
      <button onclick="deleteRow(${row.id})">Delete</button>
    `
  }
];
```

### Advanced Filtering

```javascript
// Set column filter programmatically
table.handleColumnFilter('status', {
  operator: 'equals',
  value: 'active'
});

// Custom filter function
table.handleColumnFilter('salary', (value) => value > 50000);
```

### Event Handling

```javascript
table.addEventListener('selection-changed', (e) => {
  const { selectedRows, totalSelected } = e.detail;
  
  // Update UI based on selection
  document.getElementById('bulk-actions').style.display = 
    totalSelected > 0 ? 'block' : 'none';
    
  document.getElementById('selected-count').textContent = 
    `${totalSelected} rows selected`;
});

table.addEventListener('sort-changed', (e) => {
  // Persist sort preference
  localStorage.setItem('table-sort', JSON.stringify({
    column: e.detail.column,
    direction: e.detail.direction
  }));
});
```