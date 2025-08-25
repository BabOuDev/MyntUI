import '../src/components/my-data-list/my-data-list.js';
import '../src/components/my-input/my-input.js';
import '../src/components/my-icon/my-icon.js';
import '../src/components/my-button/my-button.js';

export default {
  title: 'Components/my-data-list',
  parameters: {
    docs: {
      description: {
        component: 'Displays a list of data items with built-in controls for searching, filtering, sorting, and pagination/infinite scroll. Perfect for displaying datasets with user interaction.',
      },
    },
  },
  argTypes: {
    searchable: {
      control: 'boolean',
      description: 'Enable search functionality',
    },
    sortable: {
      control: 'boolean',
      description: 'Enable sorting functionality',
    },
    filterable: {
      control: 'boolean',
      description: 'Enable filtering functionality',
    },
    paginationType: {
      control: { type: 'select' },
      options: ['pagination', 'infinite', 'none'],
      description: 'Type of pagination',
    },
    pageSize: {
      control: { type: 'number', min: 5, max: 50 },
      description: 'Number of items per page',
    },
    loading: {
      control: 'boolean',
      description: 'Show loading state',
    },
    emptyMessage: {
      control: 'text',
      description: 'Message shown when no data',
    },
    searchPlaceholder: {
      control: 'text',
      description: 'Search input placeholder',
    },
  },
};

// Generate sample data
const generateUsers = (count = 50) => {
  const firstNames = ['John', 'Jane', 'Bob', 'Alice', 'Charlie', 'Diana', 'Edward', 'Fiona', 'George', 'Helen'];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];
  const departments = ['Engineering', 'Design', 'Marketing', 'Sales', 'HR', 'Finance'];
  const roles = ['Developer', 'Designer', 'Manager', 'Analyst', 'Coordinator', 'Specialist'];
  
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `${firstNames[i % firstNames.length]} ${lastNames[i % lastNames.length]}`,
    email: `user${i + 1}@company.com`,
    department: departments[i % departments.length],
    role: roles[i % roles.length],
    status: i % 3 === 0 ? 'Active' : i % 3 === 1 ? 'Inactive' : 'Pending',
    salary: 50000 + (i * 1000),
    joinDate: new Date(2020 + (i % 4), i % 12, (i % 28) + 1).toISOString().split('T')[0]
  }));
};

const Template = (args) => {
  const container = document.createElement('div');
  container.style.cssText = 'padding: 24px; max-width: 800px;';
  
  const dataList = document.createElement('my-data-list');
  
  // Set properties
  if (args.searchable) dataList.setAttribute('searchable', '');
  if (args.sortable) dataList.setAttribute('sortable', '');
  if (args.filterable) dataList.setAttribute('filterable', '');
  if (args.paginationType && args.paginationType !== 'pagination') dataList.setAttribute('pagination-type', args.paginationType);
  if (args.pageSize && args.pageSize !== 10) dataList.setAttribute('page-size', args.pageSize);
  if (args.loading) dataList.setAttribute('loading', '');
  if (args.emptyMessage && args.emptyMessage !== 'No data available') dataList.setAttribute('empty-message', args.emptyMessage);
  if (args.searchPlaceholder && args.searchPlaceholder !== 'Search...') dataList.setAttribute('search-placeholder', args.searchPlaceholder);

  // Generate sample data
  const sampleData = generateUsers(25);
  dataList.rows = sampleData;
  dataList.totalItems = sampleData.length;
  
  // Add custom item template
  const itemTemplate = document.createElement('template');
  itemTemplate.innerHTML = `
    <div slot="item" class="custom-user-item" style="display: flex; gap: 16px; align-items: center;">
      <div style="width: 40px; height: 40px; border-radius: 50%; background: var(--_global-color-primary-container); display: flex; align-items: center; justify-content: center; color: var(--_global-color-on-primary-container); font-weight: bold;"></div>
      <div style="flex: 1;">
        <div style="font-weight: var(--_global-font-weight-medium); margin-bottom: 4px;"></div>
        <div style="font-size: var(--_global-font-size-sm); color: var(--_global-color-text-secondary);"></div>
      </div>
      <div style="text-align: right;">
        <div style="font-size: var(--_global-font-size-sm); margin-bottom: 4px;"></div>
        <div style="font-size: var(--_global-font-size-xs); color: var(--_global-color-text-secondary);"></div>
      </div>
    </div>
  `;
  
  // Handle query changes
  dataList.addEventListener('query-change', (event) => {
    const { query } = event.detail;
    console.log('Query changed:', query);
    
    // Simulate filtering/searching (in real app, this would be an API call)
    let filteredData = [...sampleData];
    
    // Apply search
    if (query.searchBy) {
      filteredData = filteredData.filter(item => 
        item.name.toLowerCase().includes(query.searchBy.toLowerCase()) ||
        item.email.toLowerCase().includes(query.searchBy.toLowerCase()) ||
        item.department.toLowerCase().includes(query.searchBy.toLowerCase())
      );
    }
    
    // Apply sorting
    if (query.sortBy.length > 0) {
      const { field, direction } = query.sortBy[0];
      filteredData.sort((a, b) => {
        const aVal = a[field];
        const bVal = b[field];
        if (direction === 'asc') {
          return aVal > bVal ? 1 : -1;
        } else {
          return aVal < bVal ? 1 : -1;
        }
      });
    }
    
    // Apply pagination
    const start = query.offset;
    const end = start + query.limit;
    const paginatedData = filteredData.slice(start, end);
    
    // Update data list
    dataList.rows = paginatedData;
    dataList.totalItems = filteredData.length;
  });
  
  container.appendChild(dataList);
  
  return container;
};

// Default story
export const Default = Template.bind({});
Default.args = {
  searchable: true,
  sortable: false,
  filterable: false,
  paginationType: 'pagination',
  pageSize: 10,
  loading: false,
  emptyMessage: 'No data available',
  searchPlaceholder: 'Search users...',
};

// Feature showcase
export const WithAllFeatures = () => {
  const container = document.createElement('div');
  container.style.cssText = 'padding: 24px; max-width: 1000px;';
  
  const title = document.createElement('h3');
  title.textContent = 'Data List with All Features';
  title.style.cssText = 'margin: 0 0 16px 0;';
  
  const dataList = document.createElement('my-data-list');
  dataList.setAttribute('searchable', '');
  dataList.setAttribute('sortable', '');
  dataList.setAttribute('filterable', '');
  dataList.setAttribute('pagination-type', 'pagination');
  dataList.setAttribute('page-size', '8');
  dataList.setAttribute('search-placeholder', 'Search by name, email, or department...');
  
  // Generate data
  const userData = generateUsers(50);
  dataList.rows = userData.slice(0, 8);
  dataList.totalItems = userData.length;
  
  // Add header
  const header = document.createElement('div');
  header.setAttribute('slot', 'header');
  header.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center;">
      <h4 style="margin: 0;">Employee Directory</h4>
      <div style="display: flex; gap: 8px;">
        <my-button variant="outlined" label="Export" size="sm"></my-button>
        <my-button variant="filled" label="Add Employee" size="sm"></my-button>
      </div>
    </div>
  `;
  
  // Add custom item template
  dataList.innerHTML = `
    <div slot="item" class="employee-card" style="display: grid; grid-template-columns: auto 1fr auto auto; gap: 16px; align-items: center;">
      <div class="avatar" style="width: 48px; height: 48px; border-radius: 50%; background: var(--_global-color-primary-container); display: flex; align-items: center; justify-content: center; color: var(--_global-color-on-primary-container); font-weight: bold; font-size: 18px;"></div>
      
      <div class="employee-info">
        <div class="employee-name" style="font-weight: var(--_global-font-weight-medium); font-size: var(--_global-font-size-md); margin-bottom: 4px;"></div>
        <div class="employee-email" style="font-size: var(--_global-font-size-sm); color: var(--_global-color-text-secondary);"></div>
      </div>
      
      <div class="department-role" style="text-align: center;">
        <div class="department" style="font-size: var(--_global-font-size-sm); font-weight: var(--_global-font-weight-medium); margin-bottom: 2px;"></div>
        <div class="role" style="font-size: var(--_global-font-size-xs); color: var(--_global-color-text-secondary);"></div>
      </div>
      
      <div class="status-badge" style="padding: 4px 8px; border-radius: var(--_global-border-radius-full); font-size: var(--_global-font-size-xs); font-weight: var(--_global-font-weight-medium);"></div>
    </div>
  `;
  
  dataList.appendChild(header);
  
  // Handle query changes with more sophisticated logic
  dataList.addEventListener('query-change', (event) => {
    const { query } = event.detail;
    let filteredData = [...userData];
    
    // Apply search
    if (query.searchBy) {
      const searchTerm = query.searchBy.toLowerCase();
      filteredData = filteredData.filter(item => 
        item.name.toLowerCase().includes(searchTerm) ||
        item.email.toLowerCase().includes(searchTerm) ||
        item.department.toLowerCase().includes(searchTerm) ||
        item.role.toLowerCase().includes(searchTerm)
      );
    }
    
    // Apply sorting
    if (query.sortBy.length > 0) {
      const { field, direction } = query.sortBy[0];
      filteredData.sort((a, b) => {
        let aVal = a[field];
        let bVal = b[field];
        
        // Handle different data types
        if (typeof aVal === 'string') {
          aVal = aVal.toLowerCase();
          bVal = bVal.toLowerCase();
        }
        
        if (direction === 'asc') {
          return aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
        } else {
          return aVal < bVal ? 1 : aVal > bVal ? -1 : 0;
        }
      });
    }
    
    // Apply pagination
    const start = query.offset;
    const end = start + query.limit;
    const paginatedData = filteredData.slice(start, end);
    
    // Update the display data
    dataList.rows = paginatedData;
    dataList.totalItems = filteredData.length;
    
    // Update custom item content
    setTimeout(() => {
      const items = dataList.shadowRoot.querySelectorAll('.employee-card');
      items.forEach((item, index) => {
        const employee = paginatedData[index];
        if (employee) {
          const avatar = item.querySelector('.avatar');
          const name = item.querySelector('.employee-name');
          const email = item.querySelector('.employee-email');
          const department = item.querySelector('.department');
          const role = item.querySelector('.role');
          const status = item.querySelector('.status-badge');
          
          avatar.textContent = employee.name.split(' ').map(n => n[0]).join('');
          name.textContent = employee.name;
          email.textContent = employee.email;
          department.textContent = employee.department;
          role.textContent = employee.role;
          status.textContent = employee.status;
          
          // Style status badge based on status
          const statusColors = {
            'Active': { bg: 'var(--_global-color-success-container)', text: 'var(--_global-color-on-success-container)' },
            'Inactive': { bg: 'var(--_global-color-error-container)', text: 'var(--_global-color-on-error-container)' },
            'Pending': { bg: 'var(--_global-color-warning-container)', text: 'var(--_global-color-on-warning-container)' }
          };
          const statusStyle = statusColors[employee.status] || statusColors['Pending'];
          status.style.backgroundColor = statusStyle.bg;
          status.style.color = statusStyle.text;
        }
      });
    }, 50);
  });
  
  // Trigger initial load
  dataList.dispatchEvent(new CustomEvent('query-change', {
    detail: { query: dataList.query }
  }));
  
  container.appendChild(title);
  container.appendChild(dataList);
  
  return container;
};
WithAllFeatures.parameters = {
  docs: {
    description: {
      story: 'Complete data list with search, sort, filter, pagination, and custom item templates.',
    },
  },
};

// Infinite scroll example
export const InfiniteScroll = () => {
  const container = document.createElement('div');
  container.style.cssText = 'padding: 24px; max-width: 600px;';
  
  const title = document.createElement('h3');
  title.textContent = 'Infinite Scroll Data List';
  title.style.cssText = 'margin: 0 0 16px 0;';
  
  const dataList = document.createElement('my-data-list');
  dataList.setAttribute('searchable', '');
  dataList.setAttribute('pagination-type', 'infinite');
  dataList.setAttribute('page-size', '10');
  dataList.setAttribute('search-placeholder', 'Search products...');
  
  // Generate product data
  const generateProducts = (count = 100) => {
    const categories = ['Electronics', 'Clothing', 'Books', 'Home & Garden', 'Sports', 'Toys'];
    const adjectives = ['Premium', 'Professional', 'Deluxe', 'Standard', 'Essential', 'Advanced'];
    const products = ['Laptop', 'Headphones', 'T-Shirt', 'Book', 'Camera', 'Phone', 'Watch', 'Keyboard'];
    
    return Array.from({ length: count }, (_, i) => ({
      id: i + 1,
      name: `${adjectives[i % adjectives.length]} ${products[i % products.length]} ${i + 1}`,
      category: categories[i % categories.length],
      price: Math.floor(Math.random() * 500 + 10),
      rating: (Math.random() * 4 + 1).toFixed(1),
      inStock: i % 4 !== 0
    }));
  };
  
  const allProducts = generateProducts(100);
  let loadedProducts = allProducts.slice(0, 10);
  
  dataList.rows = loadedProducts;
  dataList.totalItems = allProducts.length;
  
  // Add custom product item template
  dataList.innerHTML = `
    <div slot="item" class="product-card" style="display: flex; gap: 12px; align-items: center;">
      <div class="product-image" style="width: 60px; height: 60px; border-radius: var(--_global-border-radius-md); background: var(--_global-color-surface-container); display: flex; align-items: center; justify-content: center;">
        <my-icon icon="inventory"></my-icon>
      </div>
      <div style="flex: 1;">
        <div class="product-name" style="font-weight: var(--_global-font-weight-medium); margin-bottom: 4px;"></div>
        <div class="product-category" style="font-size: var(--_global-font-size-sm); color: var(--_global-color-text-secondary); margin-bottom: 2px;"></div>
        <div class="product-rating" style="font-size: var(--_global-font-size-sm);"></div>
      </div>
      <div class="product-details" style="text-align: right;">
        <div class="product-price" style="font-weight: var(--_global-font-weight-bold); font-size: var(--_global-font-size-lg); margin-bottom: 4px;"></div>
        <div class="product-stock" style="font-size: var(--_global-font-size-xs);"></div>
      </div>
    </div>
  `;
  
  // Handle infinite scroll loading
  dataList.addEventListener('query-change', (event) => {
    const { query } = event.detail;
    
    // Simulate loading delay
    dataList.loading = true;
    
    setTimeout(() => {
      let filteredData = [...allProducts];
      
      // Apply search
      if (query.searchBy) {
        const searchTerm = query.searchBy.toLowerCase();
        filteredData = filteredData.filter(item => 
          item.name.toLowerCase().includes(searchTerm) ||
          item.category.toLowerCase().includes(searchTerm)
        );
      }
      
      // Get data for current offset
      const start = query.offset;
      const end = start + query.limit;
      const newData = filteredData.slice(start, end);
      
      if (query.offset === 0) {
        // New search/filter - replace data
        loadedProducts = newData;
      } else {
        // Load more - append data
        loadedProducts = [...loadedProducts, ...newData];
      }
      
      dataList.rows = loadedProducts;
      dataList.totalItems = filteredData.length;
      dataList.loading = false;
      
      // Update custom content
      setTimeout(() => {
        const items = dataList.shadowRoot.querySelectorAll('.product-card');
        items.forEach((item, index) => {
          const product = loadedProducts[index];
          if (product) {
            item.querySelector('.product-name').textContent = product.name;
            item.querySelector('.product-category').textContent = product.category;
            item.querySelector('.product-rating').textContent = `★ ${product.rating}`;
            item.querySelector('.product-price').textContent = `$${product.price}`;
            item.querySelector('.product-stock').textContent = product.inStock ? 'In Stock' : 'Out of Stock';
            item.querySelector('.product-stock').style.color = product.inStock ? 'var(--_global-color-success)' : 'var(--_global-color-error)';
          }
        });
      }, 10);
    }, 1000);
  });
  
  // Trigger initial load
  dataList.dispatchEvent(new CustomEvent('query-change', {
    detail: { query: dataList.query }
  }));
  
  container.appendChild(title);
  container.appendChild(dataList);
  
  return container;
};
InfiniteScroll.parameters = {
  docs: {
    description: {
      story: 'Data list with infinite scroll pagination for loading large datasets progressively.',
    },
  },
};

// Empty state showcase
export const EmptyState = () => {
  const container = document.createElement('div');
  container.style.cssText = 'padding: 24px; max-width: 600px;';
  
  const dataList = document.createElement('my-data-list');
  dataList.setAttribute('searchable', '');
  dataList.setAttribute('empty-message', 'No employees found');
  dataList.setAttribute('search-placeholder', 'Search employees...');
  
  // Empty data
  dataList.rows = [];
  dataList.totalItems = 0;
  
  // Custom empty state
  const emptyContent = document.createElement('div');
  emptyContent.setAttribute('slot', 'empty');
  emptyContent.innerHTML = `
    <div style="display: flex; flex-direction: column; align-items: center; padding: 48px 24px; text-align: center;">
      <my-icon icon="people" size="xl" style="color: var(--_global-color-text-secondary); margin-bottom: 16px; opacity: 0.5;"></my-icon>
      <h3 style="margin: 0 0 8px 0; font-size: var(--_global-font-size-lg); color: var(--_global-color-on-surface);">No employees found</h3>
      <p style="margin: 0 0 24px 0; color: var(--_global-color-text-secondary); max-width: 300px;">
        Try adjusting your search criteria or add some employees to get started.
      </p>
      <my-button variant="filled" label="Add Employee"></my-button>
    </div>
  `;
  
  dataList.appendChild(emptyContent);
  
  const title = document.createElement('h3');
  title.textContent = 'Empty State Example';
  title.style.cssText = 'margin: 0 0 16px 0;';
  
  container.appendChild(title);
  container.appendChild(dataList);
  
  return container;
};
EmptyState.parameters = {
  docs: {
    description: {
      story: 'Data list with custom empty state when no data is available.',
    },
  },
};

// Loading state
export const LoadingState = () => {
  const container = document.createElement('div');
  container.style.cssText = 'padding: 24px; max-width: 600px;';
  
  const dataList = document.createElement('my-data-list');
  dataList.setAttribute('searchable', '');
  dataList.setAttribute('loading', '');
  dataList.setAttribute('search-placeholder', 'Search...');
  
  // Sample data while loading
  const sampleData = generateUsers(5);
  dataList.rows = sampleData;
  dataList.totalItems = 25;
  
  const title = document.createElement('h3');
  title.textContent = 'Loading State Example';
  title.style.cssText = 'margin: 0 0 16px 0;';
  
  const toggleButton = document.createElement('my-button');
  toggleButton.setAttribute('variant', 'outlined');
  toggleButton.setAttribute('label', 'Toggle Loading');
  toggleButton.style.marginBottom = '16px';
  
  toggleButton.addEventListener('click', () => {
    dataList.loading = !dataList.loading;
  });
  
  container.appendChild(title);
  container.appendChild(toggleButton);
  container.appendChild(dataList);
  
  return container;
};
LoadingState.parameters = {
  docs: {
    description: {
      story: 'Data list showing loading state during data operations.',
    },
  },
};

// Minimal example
export const Minimal = () => {
  const container = document.createElement('div');
  container.style.cssText = 'padding: 24px; max-width: 500px;';
  
  const dataList = document.createElement('my-data-list');
  dataList.setAttribute('pagination-type', 'none');
  
  // Simple data
  const simpleData = [
    { title: 'Important Task', priority: 'High', due: 'Today' },
    { title: 'Review Documents', priority: 'Medium', due: 'Tomorrow' },
    { title: 'Team Meeting', priority: 'Low', due: 'Friday' },
    { title: 'Project Planning', priority: 'High', due: 'Next Week' },
  ];
  
  dataList.rows = simpleData;
  dataList.totalItems = simpleData.length;
  
  const title = document.createElement('h3');
  title.textContent = 'Minimal Data List';
  title.style.cssText = 'margin: 0 0 16px 0;';
  
  container.appendChild(title);
  container.appendChild(dataList);
  
  return container;
};
Minimal.parameters = {
  docs: {
    description: {
      story: 'Minimal data list with just basic item display and no controls.',
    },
  },
};

// Accessibility demo
export const Accessibility = () => {
  const container = document.createElement('div');
  container.style.cssText = 'padding: 24px; max-width: 600px;';
  
  const info = document.createElement('div');
  info.innerHTML = `
    <h3 style="margin: 0 0 8px 0;">Accessibility Features</h3>
    <ul style="margin: 0 0 24px 0; color: var(--_global-color-text-secondary); line-height: 1.6;">
      <li>Keyboard navigation with arrow keys</li>
      <li>Proper ARIA roles and labels</li>
      <li>Focus management and indicators</li>
      <li>Screen reader friendly</li>
      <li>High contrast mode support</li>
      <li>Reduced motion preferences</li>
    </ul>
  `;
  
  const dataList = document.createElement('my-data-list');
  dataList.setAttribute('searchable', '');
  dataList.setAttribute('page-size', '5');
  dataList.setAttribute('search-placeholder', 'Search items (keyboard navigable)...');
  
  // Accessibility-focused data
  const a11yData = [
    { name: 'Keyboard Navigation', description: 'Use arrow keys to navigate items', status: 'Available' },
    { name: 'Screen Reader Support', description: 'Proper ARIA labels and roles', status: 'Available' },
    { name: 'Focus Management', description: 'Clear focus indicators', status: 'Available' },
    { name: 'High Contrast', description: 'Works with high contrast mode', status: 'Available' },
    { name: 'Reduced Motion', description: 'Respects motion preferences', status: 'Available' },
    { name: 'Keyboard Shortcuts', description: 'Search and navigation shortcuts', status: 'Available' },
  ];
  
  dataList.rows = a11yData;
  dataList.totalItems = a11yData.length;
  
  container.appendChild(info);
  container.appendChild(dataList);
  
  return container;
};
Accessibility.parameters = {
  docs: {
    description: {
      story: 'Data list showcasing comprehensive accessibility features.',
    },
  },
};