import '../src/components/my-data-table/my-data-table.js';
import '../src/components/my-icon/my-icon.js';

export default {
  title: 'Data Display/my-data-table',
  parameters: {
    docs: {
      description: {
        component: 'A comprehensive, accessible data table component with Material Design 3 styling. Features sorting, filtering, pagination, selection, and export capabilities.',
      },
    },
  },
  argTypes: {
    selectable: {
      control: 'boolean',
      description: 'Enable row selection with checkboxes',
    },
    searchable: {
      control: 'boolean',
      description: 'Show search input for filtering data',
    },
    paginated: {
      control: 'boolean',
      description: 'Enable pagination controls',
    },
    dense: {
      control: 'boolean',
      description: 'Use compact row height',
    },
    striped: {
      control: 'boolean',
      description: 'Alternate row background colors',
    },
    bordered: {
      control: 'boolean',
      description: 'Add borders around cells',
    },
    pageSize: {
      control: { type: 'number', min: 5, max: 100, step: 5 },
      description: 'Number of rows per page',
    },
    loading: {
      control: 'boolean',
      description: 'Show loading state',
    },
  },
};

// Sample data generator
const generateSampleData = (count = 50) => {
  const firstNames = ['John', 'Jane', 'Bob', 'Alice', 'Charlie', 'Diana', 'Eve', 'Frank', 'Grace', 'Henry'];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];
  const departments = ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 'Operations', 'Design', 'Support'];
  const roles = ['Manager', 'Senior', 'Junior', 'Lead', 'Director', 'Analyst', 'Specialist', 'Coordinator'];
  
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    firstName: firstNames[Math.floor(Math.random() * firstNames.length)],
    lastName: lastNames[Math.floor(Math.random() * lastNames.length)],
    email: `user${i + 1}@example.com`,
    department: departments[Math.floor(Math.random() * departments.length)],
    role: roles[Math.floor(Math.random() * roles.length)],
    salary: Math.floor(Math.random() * 100000) + 40000,
    active: Math.random() > 0.2,
    startDate: new Date(2018 + Math.floor(Math.random() * 6), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28)),
    lastLogin: new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)),
  }));
};

const baseColumns = [
  { key: 'id', label: 'ID', type: 'number', sortable: true },
  { 
    key: 'firstName', 
    label: 'First Name', 
    sortable: true,
    render: (value, row) => `<strong>${value}</strong>`
  },
  { key: 'lastName', label: 'Last Name', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  { key: 'department', label: 'Department', sortable: true },
  { key: 'role', label: 'Role', sortable: true },
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
      ? '<span style="color: var(--_global-color-success); font-weight: bold;">●</span>' 
      : '<span style="color: var(--_global-color-error); font-weight: bold;">●</span>'
  }
];

const Template = (args) => {
  const table = document.createElement('my-data-table');
  
  // Set attributes
  if (args.selectable) table.setAttribute('selectable', '');
  if (args.searchable) table.setAttribute('searchable', '');
  if (args.paginated) table.setAttribute('paginated', '');
  if (args.dense) table.setAttribute('dense', '');
  if (args.striped) table.setAttribute('striped', '');
  if (args.bordered) table.setAttribute('bordered', '');
  if (args.loading) table.setAttribute('loading', '');
  if (args.pageSize) table.setAttribute('page-size', args.pageSize);
  
  // Set columns and data
  table.columns = baseColumns;
  table.data = generateSampleData(args.dataSize || 25);
  
  // Add event listeners for demonstration
  table.addEventListener('selection-changed', (e) => {
    console.log('Selection changed:', e.detail);
  });
  
  table.addEventListener('sort-changed', (e) => {
    console.log('Sort changed:', e.detail);
  });
  
  table.addEventListener('search-changed', (e) => {
    console.log('Search changed:', e.detail);
  });
  
  table.addEventListener('page-changed', (e) => {
    console.log('Page changed:', e.detail);
  });

  return table;
};

// Default story
export const Default = Template.bind({});
Default.args = {
  selectable: false,
  searchable: false,
  paginated: false,
  dense: false,
  striped: false,
  bordered: false,
  loading: false,
  pageSize: 10,
  dataSize: 15,
};

// Interactive table with all features
export const Interactive = Template.bind({});
Interactive.args = {
  selectable: true,
  searchable: true,
  paginated: true,
  dense: false,
  striped: true,
  bordered: false,
  loading: false,
  pageSize: 10,
  dataSize: 50,
};

Interactive.parameters = {
  docs: {
    description: {
      story: 'A fully interactive data table with selection, search, sorting, and pagination enabled.',
    },
  },
};

// Dense table
export const Dense = Template.bind({});
Dense.args = {
  selectable: true,
  searchable: true,
  paginated: true,
  dense: true,
  striped: false,
  bordered: true,
  loading: false,
  pageSize: 15,
  dataSize: 30,
};

Dense.parameters = {
  docs: {
    description: {
      story: 'A dense table variant with compact row height and borders for high-density data display.',
    },
  },
};

// Loading state
export const Loading = Template.bind({});
Loading.args = {
  selectable: true,
  searchable: true,
  paginated: true,
  loading: true,
  pageSize: 10,
};

Loading.parameters = {
  docs: {
    description: {
      story: 'Demonstration of the loading state with spinner and message.',
    },
  },
};

// Custom cell rendering
export const CustomCells = () => {
  const table = document.createElement('my-data-table');
  
  table.setAttribute('selectable', '');
  table.setAttribute('searchable', '');
  table.setAttribute('paginated', '');
  table.setAttribute('page-size', '10');
  
  // Custom columns with advanced rendering
  table.columns = [
    { key: 'id', label: 'ID', type: 'number', sortable: true },
    { 
      key: 'name', 
      label: 'Employee', 
      sortable: true,
      render: (value, row) => `
        <div style="display: flex; align-items: center; gap: 8px;">
          <div style="width: 32px; height: 32px; border-radius: 50%; background: var(--_global-color-primary); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 12px;">
            ${row.firstName.charAt(0)}${row.lastName.charAt(0)}
          </div>
          <div>
            <div style="font-weight: 500;">${row.firstName} ${row.lastName}</div>
            <div style="font-size: 12px; color: var(--_global-color-on-surface-variant);">${row.email}</div>
          </div>
        </div>
      `
    },
    { 
      key: 'department', 
      label: 'Department', 
      sortable: true,
      render: (value) => `
        <span style="
          display: inline-block;
          padding: 4px 12px;
          border-radius: 16px;
          font-size: 12px;
          font-weight: 500;
          background: var(--_global-color-secondary-container);
          color: var(--_global-color-on-secondary-container);
        ">${value}</span>
      `
    },
    { 
      key: 'salary', 
      label: 'Salary', 
      type: 'currency',
      sortable: true,
      render: (value) => `
        <span style="font-weight: 600; color: var(--_global-color-success);">
          ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)}
        </span>
      `
    },
    { 
      key: 'status', 
      label: 'Status', 
      render: (value, row) => {
        const isActive = row.active;
        const color = isActive ? 'var(--_global-color-success)' : 'var(--_global-color-error)';
        const bgColor = isActive ? 'var(--_global-color-success-container)' : 'var(--_global-color-error-container)';
        return `
          <div style="display: flex; align-items: center; gap: 6px;">
            <div style="width: 8px; height: 8px; border-radius: 50%; background: ${color};"></div>
            <span style="
              padding: 2px 8px;
              border-radius: 12px;
              font-size: 11px;
              font-weight: 500;
              background: ${bgColor};
              color: ${color};
            ">${isActive ? 'Active' : 'Inactive'}</span>
          </div>
        `;
      }
    },
    { 
      key: 'actions', 
      label: 'Actions',
      render: (value, row) => `
        <div style="display: flex; gap: 4px;">
          <button style="
            padding: 4px 8px;
            border: 1px solid var(--_global-color-outline);
            background: transparent;
            border-radius: 4px;
            cursor: pointer;
            font-size: 12px;
          " onclick="console.log('Edit', ${row.id})">Edit</button>
          <button style="
            padding: 4px 8px;
            border: 1px solid var(--_global-color-error);
            background: transparent;
            border-radius: 4px;
            cursor: pointer;
            font-size: 12px;
            color: var(--_global-color-error);
          " onclick="console.log('Delete', ${row.id})">Delete</button>
        </div>
      `
    }
  ];
  
  // Generate data with combined name field
  const data = generateSampleData(20);
  data.forEach(row => {
    row.name = `${row.firstName} ${row.lastName}`;
  });
  
  table.data = data;
  
  return table;
};

CustomCells.parameters = {
  docs: {
    description: {
      story: 'Advanced example showing custom cell rendering with avatars, badges, status indicators, and action buttons.',
    },
  },
};

// Empty state
export const Empty = () => {
  const table = document.createElement('my-data-table');
  
  table.setAttribute('searchable', '');
  table.setAttribute('paginated', '');
  table.setAttribute('empty-message', 'No employees found. Try adjusting your search criteria.');
  
  table.columns = baseColumns;
  table.data = []; // No data
  
  return table;
};

Empty.parameters = {
  docs: {
    description: {
      story: 'Demonstration of empty state with custom message.',
    },
  },
};

// Different table variants showcase
export const Variants = () => {
  const container = document.createElement('div');
  container.style.cssText = 'display: flex; flex-direction: column; gap: 2rem;';
  
  // Minimal table
  const minimalTable = document.createElement('my-data-table');
  const minimalData = generateSampleData(5);
  minimalTable.columns = baseColumns.slice(0, 4); // Only first 4 columns
  minimalTable.data = minimalData;
  
  // Striped table
  const stripedTable = document.createElement('my-data-table');
  stripedTable.setAttribute('striped', '');
  stripedTable.setAttribute('bordered', '');
  stripedTable.columns = baseColumns.slice(0, 5);
  stripedTable.data = generateSampleData(6);
  
  // Dense table
  const denseTable = document.createElement('my-data-table');
  denseTable.setAttribute('dense', '');
  denseTable.setAttribute('selectable', '');
  denseTable.columns = baseColumns;
  denseTable.data = generateSampleData(8);
  
  container.innerHTML = `
    <div>
      <h3 style="margin: 0 0 1rem 0; color: var(--_global-color-on-surface);">Minimal Table</h3>
    </div>
  `;
  container.appendChild(minimalTable);
  
  container.innerHTML += `
    <div>
      <h3 style="margin: 0 0 1rem 0; color: var(--_global-color-on-surface);">Striped & Bordered</h3>
    </div>
  `;
  container.appendChild(stripedTable);
  
  container.innerHTML += `
    <div>
      <h3 style="margin: 0 0 1rem 0; color: var(--_global-color-on-surface);">Dense with Selection</h3>
    </div>
  `;
  container.appendChild(denseTable);
  
  return container;
};

Variants.parameters = {
  docs: {
    description: {
      story: 'Different visual variants of the data table component.',
    },
  },
};

// Performance test with large dataset
export const LargeDataset = () => {
  const table = document.createElement('my-data-table');
  
  table.setAttribute('selectable', '');
  table.setAttribute('searchable', '');
  table.setAttribute('paginated', '');
  table.setAttribute('page-size', '25');
  
  table.columns = baseColumns;
  table.data = generateSampleData(500); // Large dataset
  
  // Add performance monitoring
  table.addEventListener('search-changed', (e) => {
    console.time('search-performance');
    setTimeout(() => console.timeEnd('search-performance'), 0);
  });
  
  return table;
};

LargeDataset.parameters = {
  docs: {
    description: {
      story: 'Performance test with a large dataset (500 rows) demonstrating pagination and search capabilities.',
    },
  },
};

// Export functionality demo
export const ExportDemo = () => {
  const container = document.createElement('div');
  container.style.cssText = 'display: flex; flex-direction: column; gap: 1rem;';
  
  const table = document.createElement('my-data-table');
  table.setAttribute('selectable', '');
  table.setAttribute('searchable', '');
  table.columns = baseColumns;
  table.data = generateSampleData(15);
  
  const controls = document.createElement('div');
  controls.style.cssText = 'display: flex; gap: 1rem; padding: 1rem; background: var(--_global-color-surface-container-lowest); border-radius: 8px;';
  
  controls.innerHTML = `
    <button id="export-json" style="
      padding: 8px 16px;
      background: var(--_global-color-primary);
      color: var(--_global-color-on-primary);
      border: none;
      border-radius: 4px;
      cursor: pointer;
    ">Export JSON</button>
    <button id="export-csv" style="
      padding: 8px 16px;
      background: var(--_global-color-secondary);
      color: var(--_global-color-on-secondary);
      border: none;
      border-radius: 4px;
      cursor: pointer;
    ">Export CSV</button>
    <button id="export-selected" style="
      padding: 8px 16px;
      background: var(--_global-color-tertiary);
      color: var(--_global-color-on-tertiary);
      border: none;
      border-radius: 4px;
      cursor: pointer;
    ">Export Selected</button>
    <span id="status" style="
      padding: 8px;
      color: var(--_global-color-on-surface-variant);
      font-size: 14px;
    "></span>
  `;
  
  container.appendChild(controls);
  container.appendChild(table);
  
  // Add export functionality
  setTimeout(() => {
    const exportJson = container.querySelector('#export-json');
    const exportCsv = container.querySelector('#export-csv');
    const exportSelected = container.querySelector('#export-selected');
    const status = container.querySelector('#status');
    
    exportJson.addEventListener('click', () => {
      const data = table.exportData('json');
      console.log('JSON Export:', data);
      status.textContent = 'JSON data exported to console';
    });
    
    exportCsv.addEventListener('click', () => {
      const data = table.exportData('csv');
      console.log('CSV Export:', data);
      status.textContent = 'CSV data exported to console';
    });
    
    exportSelected.addEventListener('click', () => {
      const selectedCount = table.selectedRows.length;
      if (selectedCount === 0) {
        status.textContent = 'Please select some rows first';
        return;
      }
      const data = table.exportData('json');
      console.log('Selected rows export:', data);
      status.textContent = `Exported ${selectedCount} selected rows`;
    });
    
    table.addEventListener('selection-changed', (e) => {
      const count = e.detail.totalSelected;
      status.textContent = count > 0 ? `${count} rows selected` : '';
    });
  }, 100);
  
  return container;
};

ExportDemo.parameters = {
  docs: {
    description: {
      story: 'Demonstration of data export functionality in JSON and CSV formats, including selected rows export.',
    },
  },
};