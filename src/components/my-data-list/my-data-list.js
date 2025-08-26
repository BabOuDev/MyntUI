/**
 * MyntUI my-data-list Component - TailwindCSS Enhanced Version
 * Displays a list of data items, with built-in controls for searching, filtering, sorting, and pagination/infinite scroll
 * Enhanced with Material Design 3 patterns and TailwindCSS
 */

import { globalConfig } from '../../config/global-config.js';

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
    const items = this.shadowRoot.querySelectorAll('[role="listitem"]');
    const classes = this.getTailwindClasses();
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
    items.forEach(item => {
      item.classList.remove('focused');
      // Remove focus styling classes
      classes.focusedItem.split(' ').forEach(cls => item.classList.remove(cls));
    });
    if (items[nextIndex]) {
      items[nextIndex].classList.add('focused');
      // Add focus styling classes
      classes.focusedItem.split(' ').forEach(cls => items[nextIndex].classList.add(cls));
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
  generateControls(classes) {
    const hasControls = this.searchable || this.sortable || this.filterable;
    if (!hasControls) return '';
    
    return `
      <div class="${classes.controlsSection}">
        <slot name="controls">
          ${this.searchable ? `
            <div class="${classes.searchContainer}">
              <my-input 
                name="list-search"
                type="text" 
                placeholder="${this.searchPlaceholder}"
                class="search-input"
                value="${this._query.searchBy}"
              >
                <my-icon slot="left" icon="search"></my-icon>
                ${this._query.searchBy ? `<my-icon slot="right" icon="clear" class="${classes.clearSearch}"></my-icon>` : ''}
              </my-input>
            </div>
          ` : ''}
          
          ${this.sortable ? `
            <div class="${classes.sortContainer}">
              <slot name="sort-controls"></slot>
            </div>
          ` : ''}
          
          ${this.filterable ? `
            <div class="${classes.filterContainer}">
              <slot name="filter-controls"></slot>
            </div>
          ` : ''}
        </slot>
      </div>
    `;
  }

  // Generate list items
  generateListItems(classes) {
    if (this._rows.length === 0) {
      return `
        <div class="${classes.emptyState}">
          <slot name="empty">
            <div class="empty-content">
              <my-icon icon="inbox" size="lg" class="${classes.emptyIcon}"></my-icon>
              <p class="${classes.emptyText}">${this.emptyMessage}</p>
            </div>
          </slot>
        </div>
      `;
    }

    return this._rows.map((item, index) => `
      <div 
        class="${classes.listItem}" 
        data-index="${index}"
        role="listitem"
        tabindex="0"
      >
        <slot name="item" data-item='${JSON.stringify(item)}'>
          <div class="${classes.defaultItem}">
            ${Object.entries(item).map(([key, value]) => `
              <div class="${classes.itemField}">
                <span class="${classes.fieldLabel}">${key}:</span>
                <span class="${classes.fieldValue}">${value}</span>
              </div>
            `).join('')}
          </div>
        </slot>
      </div>
    `).join('');
  }

  // Generate pagination controls
  generatePagination(classes) {
    if (this.paginationType === 'none') return '';
    
    if (this.paginationType === 'infinite') {
      return `
        <div class="${classes.paginationSection} infinite-scroll">
          ${this._hasMore ? `
            <button class="${classes.loadMoreBtn}" ${this.loading ? 'disabled' : ''}>
              ${this.loading ? 'Loading...' : 'Load More'}
            </button>
          ` : ''}
        </div>
      `;
    }
    
    // Standard pagination
    return `
      <div class="${classes.paginationSection}">
        <div class="${classes.pageInfo}"></div>
        <div class="${classes.paginationControls}">
          <button class="${classes.paginationBtn} prev-btn" aria-label="Previous page">
            <my-icon icon="chevron_left"></my-icon>
          </button>
          <button class="${classes.paginationBtn} next-btn" aria-label="Next page">
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
    const listItems = this.shadowRoot.querySelectorAll('[role="listitem"]');
    const classes = this.getTailwindClasses();
    listItems.forEach(item => {
      item.addEventListener('focus', () => {
        listItems.forEach(i => {
          i.classList.remove('focused');
          classes.focusedItem.split(' ').forEach(cls => i.classList.remove(cls));
        });
        item.classList.add('focused');
        classes.focusedItem.split(' ').forEach(cls => item.classList.add(cls));
      });
    });
  }

  // Generate TailwindCSS classes for the data list
  getTailwindClasses() {
    const config = globalConfig.get('theme.tailwind', {});

    return {
      container: [
        'block bg-surface-container-low border border-outline-variant',
        'rounded-lg shadow-elevation1 overflow-hidden font-sans'
      ].join(' '),

      headerSection: [
        'px-lg py-lg border-b border-outline-variant bg-surface-container'
      ].join(' '),

      controlsSection: [
        'flex gap-md items-center flex-wrap px-lg py-lg',
        'bg-surface-container-high border-b border-outline-variant'
      ].join(' '),

      searchContainer: [
        'flex-1 min-w-48'
      ].join(' '),

      sortContainer: [
        'flex gap-sm items-center'
      ].join(' '),

      filterContainer: [
        'flex gap-sm items-center'
      ].join(' '),

      clearSearch: [
        'cursor-pointer text-surface-on-surface-variant',
        'transition-colors duration-short2 hover:text-surface-on-surface'
      ].join(' '),

      listContainer: [
        'px-md py-md',
        this.paginationType === 'infinite' && 'max-h-96 overflow-y-auto'
      ].filter(Boolean).join(' '),

      listItem: [
        'bg-surface border border-outline-variant rounded-lg',
        'px-md py-md mb-sm cursor-pointer outline-none',
        'transition-all duration-short2 ease-standard',
        'hover:bg-surface-container hover:-translate-y-px hover:shadow-elevation2',
        'focus:outline focus:outline-2 focus:outline-primary focus:outline-offset-2',
        'last:mb-0'
      ].join(' '),

      focusedItem: [
        'bg-surface-container'
      ].join(' '),

      defaultItem: [
        'flex flex-col gap-xs'
      ].join(' '),

      itemField: [
        'flex gap-sm'
      ].join(' '),

      fieldLabel: [
        'font-medium text-surface-on-surface-variant min-w-24 flex-shrink-0'
      ].join(' '),

      fieldValue: [
        'text-surface-on-surface flex-1'
      ].join(' '),

      emptyState: [
        'flex flex-col items-center justify-center py-xl text-center',
        'text-surface-on-surface-variant'
      ].join(' '),

      emptyIcon: [
        'mb-md opacity-50'
      ].join(' '),

      emptyText: [
        'm-0 text-body-large'
      ].join(' '),

      paginationSection: [
        'flex justify-between items-center px-lg py-md',
        'border-t border-outline-variant bg-surface-container'
      ].join(' '),

      pageInfo: [
        'text-body-small text-surface-on-surface-variant'
      ].join(' '),

      paginationControls: [
        'flex gap-sm items-center'
      ].join(' '),

      paginationBtn: [
        'bg-surface border border-outline-variant rounded-sm px-sm py-sm',
        'cursor-pointer transition-all duration-short2 text-surface-on-surface',
        'hover:bg-surface-container hover:border-outline',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'focus:outline focus:outline-2 focus:outline-primary focus:outline-offset-2'
      ].join(' '),

      loadMoreBtn: [
        'block w-full px-md py-md bg-surface-container',
        'border border-outline-variant rounded-lg text-surface-on-surface',
        'cursor-pointer transition-all duration-short2 font-inherit',
        'hover:bg-surface-container-high',
        'disabled:opacity-50 disabled:cursor-not-allowed'
      ].join(' ')
    };
  }

  // Render the component with TailwindCSS
  render() {
    // Update query limits
    this._query.limit = this.pageSize;
    const classes = this.getTailwindClasses();

    this.shadowRoot.innerHTML = `
      <style>
        @import '/src/styles/tailwind.css';
        
        :host {
          display: block;
        }

        :host([loading]) .list-container {
          opacity: 60%;
          pointer-events: none;
          position: relative;
        }

        :host([loading]) .list-container::after {
          content: 'Loading...';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: theme(colors.surface.DEFAULT);
          padding: theme(spacing.md);
          border-radius: theme(borderRadius.lg);
          box-shadow: theme(boxShadow.elevation2);
          z-index: 10;
        }

        /* Scrollbar styling */
        .list-container::-webkit-scrollbar {
          width: 8px;
        }
        .list-container::-webkit-scrollbar-track {
          background: theme(colors.surface-container);
          border-radius: theme(borderRadius.sm);
        }
        .list-container::-webkit-scrollbar-thumb {
          background: theme(colors.outline-variant);
          border-radius: theme(borderRadius.sm);
        }
        .list-container::-webkit-scrollbar-thumb:hover {
          background: theme(colors.outline);
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
          
          .item-field {
            flex-direction: column;
            gap: theme(spacing.xs);
          }
          
          .field-label {
            min-width: auto;
            font-size: theme(fontSize.xs);
          }
        }

        /* Accessibility enhancements */
        @media (prefers-reduced-motion: reduce) {
          * {
            transition: none !important;
            transform: none !important;
            animation: none !important;
          }
        }

        @media (prefers-contrast: high) {
          .list-item {
            border-width: 2px;
          }
          .list-item:focus {
            outline-width: 3px;
          }
        }
      </style>

      <div class="${classes.container}">
        <div class="${classes.headerSection}">
          <slot name="header"></slot>
        </div>

        ${this.generateControls(classes)}

        <div class="${classes.listContainer}" role="list" aria-label="Data list">
          ${this.generateListItems(classes)}
        </div>

        ${this.generatePagination(classes)}
      </div>
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