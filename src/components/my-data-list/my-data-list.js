/**
 * MyntUI my-data-list Component
 * Displays a list of data items, with built-in controls for searching, filtering, sorting, and pagination/infinite scroll
 */

class MyDataList extends HTMLElement {
  constructor() {
    super();
    
    // Create Shadow DOM for encapsulation
    this.attachShadow({ mode: 'open' });
    
    // Internal state
    this._rows = [];
    this._query = {
      searchBy: '',
      filtersBy: [],
      sortBy: [],
      offset: 0,
      limit: 10
    };
    this._totalItems = 0;
    this._loading = false;
    this._hasMore = true;
    
    // Bind event handlers
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSort = this.handleSort.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.handleLoadMore = this.handleLoadMore.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.debouncedSearch = this.debounce(this.handleSearch, 300);
    
    // Initialize component
    this.render();
    this.attachEventListeners();
  }

  // Define which attributes to observe for changes
  static get observedAttributes() {
    return [
      'searchable', 'sortable', 'filterable', 'pagination-type', 'page-size',
      'loading', 'empty-message', 'search-placeholder', 'total-items'
    ];
  }

  // Handle attribute changes
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      if (name === 'total-items') {
        this._totalItems = parseInt(newValue) || 0;
        this.updatePagination();
      }
      this.render();
      this.attachEventListeners();
    }
  }

  // Debounce utility
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Getters and setters
  get rows() {
    return this._rows;
  }

  set rows(value) {
    this._rows = Array.isArray(value) ? value : [];
    this.render();
  }

  get query() {
    return { ...this._query };
  }

  set query(value) {
    this._query = { ...this._query, ...value };
    this.render();
  }

  get totalItems() {
    return this._totalItems;
  }

  set totalItems(value) {
    this._totalItems = parseInt(value) || 0;
    this.updatePagination();
  }

  get loading() {
    return this._loading || this.hasAttribute('loading');
  }

  set loading(value) {
    this._loading = Boolean(value);
    if (value) {
      this.setAttribute('loading', '');
    } else {
      this.removeAttribute('loading');
    }
    this.render();
  }

  get searchable() {
    return this.hasAttribute('searchable');
  }

  set searchable(value) {
    if (value) {
      this.setAttribute('searchable', '');
    } else {
      this.removeAttribute('searchable');
    }
  }

  get sortable() {
    return this.hasAttribute('sortable');
  }

  set sortable(value) {
    if (value) {
      this.setAttribute('sortable', '');
    } else {
      this.removeAttribute('sortable');
    }
  }

  get filterable() {
    return this.hasAttribute('filterable');
  }

  set filterable(value) {
    if (value) {
      this.setAttribute('filterable', '');
    } else {
      this.removeAttribute('filterable');
    }
  }

  get paginationType() {
    return this.getAttribute('pagination-type') || 'pagination';
  }

  set paginationType(value) {
    this.setAttribute('pagination-type', value);
  }

  get pageSize() {
    return parseInt(this.getAttribute('page-size')) || 10;
  }

  set pageSize(value) {
    this.setAttribute('page-size', value);
  }

  get emptyMessage() {
    return this.getAttribute('empty-message') || 'No data available';
  }

  set emptyMessage(value) {
    this.setAttribute('empty-message', value);
  }

  get searchPlaceholder() {
    return this.getAttribute('search-placeholder') || 'Search...';
  }

  set searchPlaceholder(value) {
    this.setAttribute('search-placeholder', value);
  }

  // Event handlers
  handleSearch(event) {
    const searchTerm = event.target.value;
    this._query.searchBy = searchTerm;
    this._query.offset = 0; // Reset to first page
    this.emitQueryChange();
  }

  handleSort(field, direction) {
    // Toggle sort direction if clicking same field
    if (this._query.sortBy.length > 0 && this._query.sortBy[0].field === field) {
      const currentDirection = this._query.sortBy[0].direction;
      direction = currentDirection === 'asc' ? 'desc' : 'asc';
    }
    
    this._query.sortBy = [{ field, direction: direction || 'asc' }];
    this._query.offset = 0; // Reset to first page
    this.emitQueryChange();
    this.updateSortIndicators();
  }

  handleFilter(field, operator, value, active = true) {
    // Remove existing filter for this field
    this._query.filtersBy = this._query.filtersBy.filter(f => f.field !== field);
    
    // Add new filter if active
    if (active && value !== undefined && value !== '') {
      this._query.filtersBy.push({ field, operator, value });
    }
    
    this._query.offset = 0; // Reset to first page
    this.emitQueryChange();
  }

  handleLoadMore() {
    if (this.loading || !this._hasMore) return;
    
    this._query.offset += this._query.limit;
    this.emitQueryChange();
  }

  handleScroll(event) {
    if (this.paginationType !== 'infinite') return;
    
    const container = event.target;
    const scrollTop = container.scrollTop;
    const scrollHeight = container.scrollHeight;
    const clientHeight = container.clientHeight;
    
    // Load more when near bottom
    if (scrollTop + clientHeight >= scrollHeight - 50) {
      this.handleLoadMore();
    }
  }

  handleKeyDown(event) {
    // Handle keyboard navigation
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      this.navigateItems(event.key === 'ArrowDown' ? 1 : -1);
    }
  }

  // Navigation helpers
  navigateItems(direction) {
    const items = this.shadowRoot.querySelectorAll('.list-item');
    const currentIndex = Array.from(items).findIndex(item => 
      item.classList.contains('focused')
    );
    
    let nextIndex;
    if (currentIndex === -1) {
      nextIndex = direction > 0 ? 0 : items.length - 1;
    } else {
      nextIndex = currentIndex + direction;
      if (nextIndex < 0) nextIndex = items.length - 1;
      if (nextIndex >= items.length) nextIndex = 0;
    }
    
    // Update focus
    items.forEach(item => item.classList.remove('focused'));
    if (items[nextIndex]) {
      items[nextIndex].classList.add('focused');
      items[nextIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  // Emit query change event
  emitQueryChange() {
    this.dispatchEvent(new CustomEvent('query-change', {
      detail: { query: this.query },
      bubbles: true,
      cancelable: true
    }));
  }

  // Update sort indicators in UI
  updateSortIndicators() {
    const sortButtons = this.shadowRoot.querySelectorAll('.sort-btn');
    sortButtons.forEach(btn => {
      const field = btn.dataset.field;
      const currentSort = this._query.sortBy.find(s => s.field === field);
      
      btn.classList.remove('sorted-asc', 'sorted-desc');
      if (currentSort) {
        btn.classList.add(`sorted-${currentSort.direction}`);
      }
    });
  }

  // Update pagination state
  updatePagination() {
    const totalPages = Math.ceil(this._totalItems / this._query.limit);
    const currentPage = Math.floor(this._query.offset / this._query.limit) + 1;
    this._hasMore = this._query.offset + this._query.limit < this._totalItems;
    
    // Update pagination UI
    const pageInfo = this.shadowRoot.querySelector('.page-info');
    const prevBtn = this.shadowRoot.querySelector('.prev-btn');
    const nextBtn = this.shadowRoot.querySelector('.next-btn');
    const loadMoreBtn = this.shadowRoot.querySelector('.load-more-btn');
    
    if (pageInfo) {
      const start = Math.min(this._query.offset + 1, this._totalItems);
      const end = Math.min(this._query.offset + this._query.limit, this._totalItems);
      pageInfo.textContent = `${start}-${end} of ${this._totalItems}`;
    }
    
    if (prevBtn) {
      prevBtn.disabled = currentPage <= 1;
    }
    
    if (nextBtn) {
      nextBtn.disabled = currentPage >= totalPages;
    }
    
    if (loadMoreBtn) {
      loadMoreBtn.style.display = this._hasMore ? 'block' : 'none';
    }
  }

  // Generate controls HTML
  generateControls() {
    const hasControls = this.searchable || this.sortable || this.filterable;
    if (!hasControls) return '';
    
    return `
      <div class="controls-section">
        <slot name="controls">
          ${this.searchable ? `
            <div class="search-container">
              <my-input 
                name="list-search"
                type="text" 
                placeholder="${this.searchPlaceholder}"
                class="search-input"
                value="${this._query.searchBy}"
              >
                <my-icon slot="left" icon="search"></my-icon>
                ${this._query.searchBy ? '<my-icon slot="right" icon="clear" class="clear-search"></my-icon>' : ''}
              </my-input>
            </div>
          ` : ''}
          
          ${this.sortable ? `
            <div class="sort-container">
              <slot name="sort-controls"></slot>
            </div>
          ` : ''}
          
          ${this.filterable ? `
            <div class="filter-container">
              <slot name="filter-controls"></slot>
            </div>
          ` : ''}
        </slot>
      </div>
    `;
  }

  // Generate list items
  generateListItems() {
    if (this._rows.length === 0) {
      return `
        <div class="empty-state">
          <slot name="empty">
            <div class="empty-content">
              <my-icon icon="inbox" size="lg"></my-icon>
              <p>${this.emptyMessage}</p>
            </div>
          </slot>
        </div>
      `;
    }

    return this._rows.map((item, index) => `
      <div 
        class="list-item" 
        data-index="${index}"
        role="listitem"
        tabindex="0"
      >
        <slot name="item" data-item='${JSON.stringify(item)}'>
          <div class="default-item">
            ${Object.entries(item).map(([key, value]) => `
              <div class="item-field">
                <span class="field-label">${key}:</span>
                <span class="field-value">${value}</span>
              </div>
            `).join('')}
          </div>
        </slot>
      </div>
    `).join('');
  }

  // Generate pagination controls
  generatePagination() {
    if (this.paginationType === 'none') return '';
    
    if (this.paginationType === 'infinite') {
      return `
        <div class="pagination-section infinite-scroll">
          ${this._hasMore ? `
            <button class="load-more-btn" ${this.loading ? 'disabled' : ''}>
              ${this.loading ? 'Loading...' : 'Load More'}
            </button>
          ` : ''}
        </div>
      `;
    }
    
    // Standard pagination
    return `
      <div class="pagination-section">
        <div class="page-info"></div>
        <div class="pagination-controls">
          <button class="prev-btn" aria-label="Previous page">
            <my-icon icon="chevron_left"></my-icon>
          </button>
          <button class="next-btn" aria-label="Next page">
            <my-icon icon="chevron_right"></my-icon>
          </button>
        </div>
      </div>
    `;
  }

  // Attach event listeners
  attachEventListeners() {
    // Search input
    const searchInput = this.shadowRoot.querySelector('.search-input input');
    if (searchInput) {
      searchInput.removeEventListener('input', this.debouncedSearch);
      searchInput.addEventListener('input', this.debouncedSearch);
    }
    
    // Clear search
    const clearSearch = this.shadowRoot.querySelector('.clear-search');
    if (clearSearch) {
      clearSearch.removeEventListener('click', () => {
        const searchInput = this.shadowRoot.querySelector('.search-input input');
        if (searchInput) {
          searchInput.value = '';
          this.handleSearch({ target: { value: '' } });
        }
      });
      clearSearch.addEventListener('click', () => {
        const searchInput = this.shadowRoot.querySelector('.search-input input');
        if (searchInput) {
          searchInput.value = '';
          this.handleSearch({ target: { value: '' } });
        }
      });
    }
    
    // Pagination buttons
    const prevBtn = this.shadowRoot.querySelector('.prev-btn');
    const nextBtn = this.shadowRoot.querySelector('.next-btn');
    const loadMoreBtn = this.shadowRoot.querySelector('.load-more-btn');
    
    if (prevBtn) {
      prevBtn.removeEventListener('click', () => {
        this._query.offset = Math.max(0, this._query.offset - this._query.limit);
        this.emitQueryChange();
      });
      prevBtn.addEventListener('click', () => {
        this._query.offset = Math.max(0, this._query.offset - this._query.limit);
        this.emitQueryChange();
      });
    }
    
    if (nextBtn) {
      nextBtn.removeEventListener('click', () => {
        this._query.offset += this._query.limit;
        this.emitQueryChange();
      });
      nextBtn.addEventListener('click', () => {
        this._query.offset += this._query.limit;
        this.emitQueryChange();
      });
    }
    
    if (loadMoreBtn) {
      loadMoreBtn.removeEventListener('click', this.handleLoadMore);
      loadMoreBtn.addEventListener('click', this.handleLoadMore);
    }
    
    // Infinite scroll
    const listContainer = this.shadowRoot.querySelector('.list-container');
    if (listContainer && this.paginationType === 'infinite') {
      listContainer.removeEventListener('scroll', this.handleScroll);
      listContainer.addEventListener('scroll', this.handleScroll);
    }
    
    // Keyboard navigation
    this.removeEventListener('keydown', this.handleKeyDown);
    this.addEventListener('keydown', this.handleKeyDown);
    
    // List item focus management
    const listItems = this.shadowRoot.querySelectorAll('.list-item');
    listItems.forEach(item => {
      item.addEventListener('focus', () => {
        listItems.forEach(i => i.classList.remove('focused'));
        item.classList.add('focused');
      });
    });
  }

  // Render the component
  render() {
    // Update query limits
    this._query.limit = this.pageSize;

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          /* Data list-specific variables using global semantic variables */
          --_data-list-background: var(--_global-color-surface-container-low);
          --_data-list-border: 1px solid var(--_global-color-outline-variant);
          --_data-list-border-radius: var(--_global-border-radius-lg);
          --_data-list-elevation: var(--_global-elevation-1);
          
          --_data-list-item-padding: var(--_global-spacing-md);
          --_data-list-item-gap: var(--_global-spacing-sm);
          --_data-list-item-border: 1px solid var(--_global-color-outline-variant);
          --_data-list-item-border-radius: var(--_global-border-radius-md);
          --_data-list-item-background: var(--_global-color-surface);
          --_data-list-item-hover-background: var(--_global-color-surface-container);
          
          --_data-list-controls-padding: var(--_global-spacing-lg);
          --_data-list-controls-gap: var(--_global-spacing-md);
          --_data-list-controls-border: 1px solid var(--_global-color-outline-variant);
          
          --_data-list-transition: all var(--_global-motion-duration-short2) var(--_global-motion-easing-standard);
          
          display: block;
          background: var(--_data-list-background);
          border: var(--_data-list-border);
          border-radius: var(--_data-list-border-radius);
          box-shadow: var(--_data-list-elevation);
          overflow: hidden;
          font-family: var(--_global-font-family-sans);
        }

        /* Header section */
        .header-section {
          padding: var(--_data-list-controls-padding);
          border-bottom: var(--_data-list-controls-border);
          background: var(--_global-color-surface-container);
        }

        /* Controls section */
        .controls-section {
          display: flex;
          gap: var(--_data-list-controls-gap);
          flex-wrap: wrap;
          align-items: center;
          padding: var(--_data-list-controls-padding);
          background: var(--_global-color-surface-container-high);
          border-bottom: var(--_data-list-controls-border);
        }

        .search-container {
          flex: 1;
          min-width: 200px;
        }

        .sort-container,
        .filter-container {
          display: flex;
          gap: var(--_global-spacing-sm);
          align-items: center;
        }

        .clear-search {
          cursor: pointer;
          color: var(--_global-color-on-surface-variant);
          transition: color var(--_data-list-transition);
        }

        .clear-search:hover {
          color: var(--_global-color-on-surface);
        }

        /* List container */
        .list-container {
          max-height: ${this.paginationType === 'infinite' ? '400px' : 'none'};
          overflow-y: ${this.paginationType === 'infinite' ? 'auto' : 'visible'};
          padding: var(--_global-spacing-md);
        }

        /* List items */
        .list-item {
          background: var(--_data-list-item-background);
          border: var(--_data-list-item-border);
          border-radius: var(--_data-list-item-border-radius);
          padding: var(--_data-list-item-padding);
          margin-bottom: var(--_data-list-item-gap);
          transition: var(--_data-list-transition);
          cursor: pointer;
          outline: none;
        }

        .list-item:hover {
          background: var(--_data-list-item-hover-background);
          transform: translateY(-1px);
          box-shadow: var(--_global-elevation-2);
        }

        .list-item:focus,
        .list-item.focused {
          outline: 2px solid var(--_global-color-primary);
          outline-offset: 2px;
        }

        .list-item:last-child {
          margin-bottom: 0;
        }

        /* Default item styling */
        .default-item {
          display: flex;
          flex-direction: column;
          gap: var(--_global-spacing-xs);
        }

        .item-field {
          display: flex;
          gap: var(--_global-spacing-sm);
        }

        .field-label {
          font-weight: var(--_global-font-weight-medium);
          color: var(--_global-color-on-surface-variant);
          min-width: 100px;
        }

        .field-value {
          color: var(--_global-color-on-surface);
          flex: 1;
        }

        /* Empty state */
        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: var(--_global-spacing-xxl);
          text-align: center;
          color: var(--_global-color-on-surface-variant);
        }

        .empty-content my-icon {
          margin-bottom: var(--_global-spacing-md);
          opacity: 0.5;
        }

        .empty-content p {
          margin: 0;
          font-size: var(--_global-font-size-lg);
        }

        /* Loading state */
        :host([loading]) .list-container {
          opacity: 0.6;
          pointer-events: none;
        }

        :host([loading]) .list-container::after {
          content: 'Loading...';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: var(--_global-color-surface);
          padding: var(--_global-spacing-md);
          border-radius: var(--_global-border-radius-md);
          box-shadow: var(--_global-elevation-2);
        }

        /* Pagination section */
        .pagination-section {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: var(--_global-spacing-md) var(--_data-list-controls-padding);
          border-top: var(--_data-list-controls-border);
          background: var(--_global-color-surface-container);
        }

        .page-info {
          font-size: var(--_global-font-size-sm);
          color: var(--_global-color-on-surface-variant);
        }

        .pagination-controls {
          display: flex;
          gap: var(--_global-spacing-sm);
        }

        .pagination-controls button {
          background: var(--_global-color-surface);
          border: 1px solid var(--_global-color-outline-variant);
          border-radius: var(--_global-border-radius-sm);
          padding: var(--_global-spacing-sm);
          cursor: pointer;
          transition: var(--_data-list-transition);
          color: var(--_global-color-on-surface);
        }

        .pagination-controls button:hover:not(:disabled) {
          background: var(--_global-color-surface-container);
          border-color: var(--_global-color-outline);
        }

        .pagination-controls button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        /* Infinite scroll */
        .load-more-btn {
          display: block;
          width: 100%;
          padding: var(--_global-spacing-md);
          background: var(--_global-color-surface-container);
          border: 1px solid var(--_global-color-outline-variant);
          border-radius: var(--_global-border-radius-md);
          color: var(--_global-color-on-surface);
          cursor: pointer;
          transition: var(--_data-list-transition);
          font-family: inherit;
        }

        .load-more-btn:hover:not(:disabled) {
          background: var(--_global-color-surface-container-high);
        }

        .load-more-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        /* Responsive design */
        @media (max-width: 768px) {
          .controls-section {
            flex-direction: column;
            align-items: stretch;
          }
          
          .search-container {
            min-width: auto;
          }
          
          .default-item {
            gap: var(--_global-spacing-sm);
          }
          
          .item-field {
            flex-direction: column;
            gap: var(--_global-spacing-xs);
          }
          
          .field-label {
            min-width: auto;
            font-size: var(--_global-font-size-xs);
          }
        }

        /* High contrast support */
        @media (prefers-contrast: high) {
          .list-item {
            border-width: 2px;
          }
          
          .list-item:focus {
            outline-width: 3px;
          }
        }

        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          .list-item,
          .pagination-controls button,
          .load-more-btn {
            transition: none;
          }
          
          .list-item:hover {
            transform: none;
          }
        }

        /* Scrollbar styling */
        .list-container::-webkit-scrollbar {
          width: 8px;
        }

        .list-container::-webkit-scrollbar-track {
          background: var(--_global-color-surface-container);
          border-radius: var(--_global-border-radius-sm);
        }

        .list-container::-webkit-scrollbar-thumb {
          background: var(--_global-color-outline-variant);
          border-radius: var(--_global-border-radius-sm);
        }

        .list-container::-webkit-scrollbar-thumb:hover {
          background: var(--_global-color-outline);
        }
      </style>

      <div class="header-section">
        <slot name="header"></slot>
      </div>

      ${this.generateControls()}

      <div class="list-container" role="list" aria-label="Data list">
        ${this.generateListItems()}
      </div>

      ${this.generatePagination()}
    `;

    // Update pagination info
    this.updatePagination();
    this.updateSortIndicators();
    
    // Attach event listeners
    this.attachEventListeners();
  }

  // Connected callback
  connectedCallback() {
    // Set initial focus for keyboard navigation
    this.setAttribute('tabindex', '0');
  }

  // Cleanup when component is removed
  disconnectedCallback() {
    // Clean up any remaining event listeners
    this.removeEventListener('keydown', this.handleKeyDown);
  }
}

// Register the custom element only if it hasn't been registered already
if (!customElements.get('my-data-list')) {
  customElements.define('my-data-list', MyDataList);
}