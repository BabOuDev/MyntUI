# my-data-list

Displays a list of data items with built-in controls for searching, filtering, sorting, and pagination/infinite scroll. Perfect for displaying dynamic data sets with full user interaction capabilities.

## Features

- **Built-in Search**: Instant search across data fields with debounced input
- **Flexible Sorting**: Multi-field sorting with direction indicators
- **Advanced Filtering**: Custom filter predicates and operators
- **Multiple Pagination**: Standard pagination, infinite scroll, or load more button
- **Keyboard Navigation**: Full arrow key navigation through list items
- **Custom Templates**: Slot-based item rendering for complete customization
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Accessibility**: Screen reader support and keyboard navigation
- **Performance**: Efficient virtual rendering for large datasets

## Usage

### Basic Data List

```html
<my-data-list 
  id="users-list"
  searchable
  sortable
  page-size="10"
>
</my-data-list>

<script>
const usersList = document.getElementById('users-list');

// Set initial data
usersList.rows = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor' }
];

usersList.totalItems = 150;

// Handle query changes
usersList.addEventListener('query-change', async (e) => {
  const { query } = e.detail;
  const data = await fetchData(query);
  usersList.rows = data.items;
  usersList.totalItems = data.total;
});
</script>
```

### Custom Item Template

```html
<my-data-list 
  id="products-list"
  searchable
  filterable
  pagination-type="infinite"
>
  <!-- Custom item template -->
  <template slot="item">
    <div class="product-card">
      <img src="{{image}}" alt="{{name}}">
      <div class="product-info">
        <h3>{{name}}</h3>
        <p class="price">${{price}}</p>
        <p class="description">{{description}}</p>
        <div class="tags">
          <span class="tag">{{category}}</span>
          <span class="stock {{stock > 0 ? 'in-stock' : 'out-of-stock'}}">
            {{stock > 0 ? 'In Stock' : 'Out of Stock'}}
          </span>
        </div>
      </div>
    </div>
  </template>
</my-data-list>
```

### With Advanced Controls

```html
<my-data-list 
  searchable
  sortable
  filterable
  search-placeholder="Search products..."
  empty-message="No products found"
>
  <!-- Custom header -->
  <div slot="header">
    <h2>Product Catalog</h2>
    <div class="actions">
      <button onclick="exportData()">Export</button>
      <button onclick="addNew()">Add Product</button>
    </div>
  </div>

  <!-- Custom controls -->
  <div slot="controls">
    <div class="filter-group">
      <label>Category:</label>
      <select onchange="filterByCategory(this.value)">
        <option value="">All Categories</option>
        <option value="electronics">Electronics</option>
        <option value="clothing">Clothing</option>
        <option value="books">Books</option>
      </select>
    </div>
    
    <div class="filter-group">
      <label>Price Range:</label>
      <input type="range" min="0" max="1000" onchange="filterByPrice(this.value)">
    </div>
  </div>
</my-data-list>
```

## Properties

### Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `searchable` | `boolean` | `false` | Enable search functionality |
| `sortable` | `boolean` | `false` | Enable sorting controls |
| `filterable` | `boolean` | `false` | Enable filtering functionality |
| `pagination-type` | `string` | `pagination` | Pagination type: pagination, infinite, none |
| `page-size` | `number` | `10` | Items per page |
| `loading` | `boolean` | `false` | Show loading state |
| `empty-message` | `string` | `No data available` | Message when no data |
| `search-placeholder` | `string` | `Search...` | Search input placeholder |
| `total-items` | `number` | `0` | Total items count for pagination |

### JavaScript Properties

```javascript
const dataList = document.querySelector('my-data-list');

// Data management
dataList.rows = [/* array of objects */];
dataList.totalItems = 150;

// Query state
dataList.query = {
  searchBy: 'john',
  filtersBy: [
    { field: 'role', operator: 'eq', value: 'admin' }
  ],
  sortBy: [
    { field: 'name', direction: 'asc' }
  ],
  offset: 0,
  limit: 10
};

// UI state
dataList.loading = true;
dataList.searchable = true;
dataList.paginationType = 'infinite';
```

## Query Object

The query object provides a standardized way to handle data operations:

```javascript
{
  searchBy: string,           // Search term
  filtersBy: [               // Array of filter objects
    {
      field: string,         // Field name to filter
      operator: string,      // eq, ne, gt, lt, contains, starts, ends
      value: any            // Filter value
    }
  ],
  sortBy: [                 // Array of sort objects
    {
      field: string,        // Field name to sort by
      direction: string     // 'asc' or 'desc'
    }
  ],
  offset: number,          // Starting index (for pagination)
  limit: number           // Number of items to return
}
```

## Events

### query-change Event

Emitted whenever the query state changes (search, filter, sort, pagination):

```javascript
dataList.addEventListener('query-change', (event) => {
  const { query } = event.detail;
  
  // Fetch data based on query
  fetchData(query).then(result => {
    dataList.rows = result.items;
    dataList.totalItems = result.total;
    dataList.loading = false;
  });
});
```

## Pagination Types

### Standard Pagination

```html
<my-data-list pagination-type="pagination" page-size="20">
  <!-- Shows page numbers and navigation -->
</my-data-list>
```

### Infinite Scroll

```html
<my-data-list pagination-type="infinite" page-size="10">
  <!-- Automatically loads more on scroll -->
</my-data-list>
```

### Load More Button

```html
<my-data-list pagination-type="infinite" page-size="15">
  <!-- Shows "Load More" button -->
</my-data-list>
```

### No Pagination

```html
<my-data-list pagination-type="none">
  <!-- Shows all items at once -->
</my-data-list>
```

## Slots

### Content Slots

| Slot | Description | Optional |
|------|-------------|----------|
| `header` | Top section with title/actions | Yes |
| `controls` | Custom search/filter controls | Yes |
| `item` | Template for each list item | Yes |
| `empty` | Content when no data available | Yes |

### Item Slot Data

The item slot receives data through the `data-item` attribute:

```javascript
// Access item data in slot
const itemSlot = document.querySelector('[slot="item"]');
const itemData = JSON.parse(itemSlot.getAttribute('data-item'));
```

## Custom Item Templates

### Using Slots

```html
<my-data-list>
  <div slot="item" class="custom-item">
    <div class="item-header">
      <h3 data-field="title"></h3>
      <span class="badge" data-field="status"></span>
    </div>
    <p data-field="description"></p>
    <div class="item-actions">
      <button onclick="editItem({{id}})">Edit</button>
      <button onclick="deleteItem({{id}})">Delete</button>
    </div>
  </div>
</my-data-list>
```

### Programmatic Templates

```javascript
const dataList = document.querySelector('my-data-list');

// Custom item renderer
dataList.itemRenderer = (item, index) => {
  return `
    <div class="user-card">
      <img src="${item.avatar}" alt="${item.name}">
      <div class="user-info">
        <h4>${item.name}</h4>
        <p>${item.email}</p>
        <span class="role ${item.role.toLowerCase()}">${item.role}</span>
      </div>
      <div class="actions">
        <button onclick="viewUser('${item.id}')">View</button>
        <button onclick="editUser('${item.id}')">Edit</button>
      </div>
    </div>
  `;
};
```

## Filtering Examples

### Basic Filtering

```javascript
// Filter by single field
dataList.query = {
  filtersBy: [
    { field: 'status', operator: 'eq', value: 'active' }
  ]
};
```

### Advanced Filtering

```javascript
// Multiple filters
dataList.query = {
  filtersBy: [
    { field: 'role', operator: 'eq', value: 'admin' },
    { field: 'lastLogin', operator: 'gt', value: '2023-01-01' },
    { field: 'name', operator: 'contains', value: 'john' }
  ]
};
```

### Filter Operators

| Operator | Description | Example |
|----------|-------------|---------|
| `eq` | Equals | `{field: 'status', operator: 'eq', value: 'active'}` |
| `ne` | Not equals | `{field: 'status', operator: 'ne', value: 'inactive'}` |
| `gt` | Greater than | `{field: 'age', operator: 'gt', value: 18}` |
| `lt` | Less than | `{field: 'score', operator: 'lt', value: 100}` |
| `contains` | Contains text | `{field: 'name', operator: 'contains', value: 'john'}` |
| `starts` | Starts with | `{field: 'email', operator: 'starts', value: 'admin'}` |
| `ends` | Ends with | `{field: 'email', operator: 'ends', value: '.com'}` |

## Styling

### CSS Custom Properties

```css
my-data-list {
  --_data-list-background: #ffffff;
  --_data-list-item-background: #f8f9fa;
  --_data-list-item-hover-background: #e9ecef;
  --_data-list-border-radius: 12px;
  --_data-list-elevation: var(--elevation-2);
}
```

### Custom Item Styling

```css
.user-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  border-radius: 8px;
  background: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.user-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
}

.role.admin {
  background: #dc3545;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
}
```

## Integration Examples

### With API

```javascript
class UserDataList {
  constructor() {
    this.dataList = document.getElementById('users-list');
    this.setupEventListeners();
  }
  
  setupEventListeners() {
    this.dataList.addEventListener('query-change', async (e) => {
      const { query } = e.detail;
      await this.fetchUsers(query);
    });
  }
  
  async fetchUsers(query) {
    this.dataList.loading = true;
    
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(query)
      });
      
      const data = await response.json();
      
      // Update or append data based on pagination type
      if (query.offset === 0 || this.dataList.paginationType !== 'infinite') {
        this.dataList.rows = data.users;
      } else {
        this.dataList.rows = [...this.dataList.rows, ...data.users];
      }
      
      this.dataList.totalItems = data.total;
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      this.dataList.loading = false;
    }
  }
}

new UserDataList();
```

### With State Management

```javascript
// Redux integration
store.subscribe(() => {
  const state = store.getState();
  const dataList = document.getElementById('data-list');
  
  dataList.rows = state.data.items;
  dataList.totalItems = state.data.total;
  dataList.loading = state.data.loading;
  dataList.query = state.data.query;
});

// Dispatch actions on query changes
dataList.addEventListener('query-change', (e) => {
  store.dispatch(updateQuery(e.detail.query));
  store.dispatch(fetchData(e.detail.query));
});
```

## Performance

- **Virtual Scrolling**: Efficient rendering for large datasets
- **Debounced Search**: Prevents excessive API calls
- **Smart Updates**: Only re-renders changed items
- **Memory Management**: Automatic cleanup of event listeners
- **Lazy Loading**: Images and content loaded as needed

## Browser Support

- Chrome 54+
- Firefox 63+
- Safari 10+
- Edge 79+

## Accessibility

- Full keyboard navigation with arrow keys
- Screen reader announcements for state changes
- Proper ARIA roles and labels
- High contrast mode support
- Focus management and visual indicators