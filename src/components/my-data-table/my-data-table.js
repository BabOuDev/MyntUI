/**
 * MyntUI my-data-table Component - TailwindCSS Enhanced Version
 * A comprehensive data table component with Material Design 3 styling
 * Features sorting, filtering, pagination, row selection, and responsive design
 * Enhanced with accessibility features and customizable column rendering
 */

import { MyntUIBaseComponent } from '../../core/base-component.js';
import { globalConfig } from '../../config/global-config.js';

class MyDataTable extends MyntUIBaseComponent {
  constructor() {
    super();
    
    // Component-specific internal state
    this._data = [];
    this._columns = [];
    this._filteredData = [];
    this._sortedData = [];
    this._selectedRows = new Set();
    this._currentSort = { column: null, direction: null };
    this._currentPage = 1;
    this._pageSize = 10;
    this._totalRows = 0;
    this._loading = false;
    this._searchQuery = '';
    this._columnFilters = new Map();
    
    // Component-specific bindings
    this.handleSort = this.handleSort.bind(this);
    this.handleRowSelect = this.handleRowSelect.bind(this);
    this.handleSelectAll = this.handleSelectAll.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleColumnFilter = this.handleColumnFilter.bind(this);
    
    this.log('DataTable component initializing...');
  }

  // Extended observed attributes
  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      'selectable', 'sortable', 'filterable', 'searchable', 'paginated',
      'page-size', 'dense', 'striped', 'bordered', 'hover-effects',
      'sticky-header', 'loading', 'empty-message', 'loading-message'
    ];
  }

  // Component-specific attribute handling
  handleAttributeChange(name, oldValue, newValue) {
    super.handleAttributeChange(name, oldValue, newValue);
    
    switch (name) {
      case 'loading':
        this._loading = newValue !== null;
        this.updateLoadingState();
        break;
      case 'page-size':
        this._pageSize = parseInt(newValue) || 10;
        this.updatePagination();
        break;
      case 'searchable':
      case 'filterable':
      case 'paginated':
        this.render();
        break;
    }
  }

  // Getters and setters
  get data() {
    return this._data;
  }

  set data(value) {
    this._data = Array.isArray(value) ? [...value] : [];
    this._totalRows = this._data.length;
    this.processData();
    this.render();
    this.emit('data-changed', { data: this._data, totalRows: this._totalRows });
  }

  get columns() {
    return this._columns;
  }

  set columns(value) {
    this._columns = Array.isArray(value) ? [...value] : [];
    this.render();
    this.emit('columns-changed', { columns: this._columns });
  }

  get selectedRows() {
    return Array.from(this._selectedRows);
  }

  get loading() {
    return this._loading;
  }

  set loading(value) {
    this._loading = Boolean(value);
    this.toggleAttribute('loading', this._loading);
    this.updateLoadingState();
  }

  get pageSize() {
    return this._pageSize;
  }

  set pageSize(value) {
    this._pageSize = Math.max(1, parseInt(value) || 10);
    this.setAttribute('page-size', this._pageSize);
    this.updatePagination();
  }

  get searchQuery() {
    return this._searchQuery;
  }

  set searchQuery(value) {
    this._searchQuery = String(value || '');
    this.processData();
    this.updateDisplay();
  }

  // Data processing pipeline
  processData() {
    let processedData = [...this._data];
    
    // Apply search filter
    if (this._searchQuery.trim()) {
      processedData = this.applySearch(processedData);
    }
    
    // Apply column filters
    if (this._columnFilters.size > 0) {
      processedData = this.applyColumnFilters(processedData);
    }
    
    // Apply sorting
    if (this._currentSort.column) {
      processedData = this.applySorting(processedData);
    }
    
    this._filteredData = processedData;
    this._totalRows = processedData.length;
    
    // Reset to first page if current page exceeds available pages
    const maxPage = Math.ceil(this._totalRows / this._pageSize);
    if (this._currentPage > maxPage && maxPage > 0) {
      this._currentPage = 1;
    }
    
    return processedData;
  }

  applySearch(data) {
    const query = this._searchQuery.toLowerCase().trim();
    return data.filter(row => {
      return this._columns.some(column => {
        const value = this.getCellValue(row, column.key);
        return String(value).toLowerCase().includes(query);
      });
    });
  }

  applyColumnFilters(data) {
    return data.filter(row => {
      for (const [columnKey, filterValue] of this._columnFilters) {
        const cellValue = this.getCellValue(row, columnKey);
        if (!this.matchesFilter(cellValue, filterValue)) {
          return false;
        }
      }
      return true;
    });
  }

  applySorting(data) {
    const { column, direction } = this._currentSort;
    return [...data].sort((a, b) => {
      const aValue = this.getCellValue(a, column);
      const bValue = this.getCellValue(b, column);
      
      // Handle different data types
      let comparison;
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        comparison = aValue - bValue;
      } else if (aValue instanceof Date && bValue instanceof Date) {
        comparison = aValue.getTime() - bValue.getTime();
      } else {
        comparison = String(aValue).localeCompare(String(bValue));
      }
      
      return direction === 'desc' ? -comparison : comparison;
    });
  }

  matchesFilter(cellValue, filterValue) {
    if (typeof filterValue === 'string') {
      return String(cellValue).toLowerCase().includes(filterValue.toLowerCase());
    } else if (typeof filterValue === 'function') {
      return filterValue(cellValue);
    } else if (filterValue && typeof filterValue === 'object') {
      // Advanced filtering with operators
      const { operator = 'contains', value } = filterValue;
      switch (operator) {
        case 'equals': return cellValue === value;
        case 'contains': return String(cellValue).toLowerCase().includes(String(value).toLowerCase());
        case 'startsWith': return String(cellValue).toLowerCase().startsWith(String(value).toLowerCase());
        case 'endsWith': return String(cellValue).toLowerCase().endsWith(String(value).toLowerCase());
        case 'gt': return Number(cellValue) > Number(value);
        case 'gte': return Number(cellValue) >= Number(value);
        case 'lt': return Number(cellValue) < Number(value);
        case 'lte': return Number(cellValue) <= Number(value);
        default: return true;
      }
    }
    return true;
  }

  getCellValue(row, key) {
    return key.includes('.') 
      ? key.split('.').reduce((obj, k) => obj?.[k], row)
      : row[key];
  }

  // Event handlers
  handleSort(columnKey) {
    const column = this._columns.find(col => col.key === columnKey);
    if (!column || !column.sortable) return;

    let direction = 'asc';
    if (this._currentSort.column === columnKey) {
      if (this._currentSort.direction === 'asc') {
        direction = 'desc';
      } else if (this._currentSort.direction === 'desc') {
        // Clear sort
        this._currentSort = { column: null, direction: null };
        this.processData();
        this.updateDisplay();
        this.emit('sort-changed', { column: null, direction: null });
        return;
      }
    }

    this._currentSort = { column: columnKey, direction };
    this.processData();
    this.updateDisplay();
    this.emit('sort-changed', { column: columnKey, direction });
    
    this.announceToScreenReader(
      `Table sorted by ${column.label || columnKey} in ${direction}ending order`,
      'polite'
    );
  }

  handleRowSelect(rowIndex, event) {
    event.stopPropagation();
    
    const actualIndex = (this._currentPage - 1) * this._pageSize + rowIndex;
    const rowId = this.getRowId(actualIndex);
    
    if (this._selectedRows.has(rowId)) {
      this._selectedRows.delete(rowId);
    } else {
      this._selectedRows.add(rowId);
    }
    
    this.updateSelectAllState();
    this.updateRowSelection();
    this.emit('selection-changed', { 
      selectedRows: this.selectedRows,
      totalSelected: this._selectedRows.size 
    });
    
    this.announceToScreenReader(
      `Row ${actualIndex + 1} ${this._selectedRows.has(rowId) ? 'selected' : 'deselected'}. ${this._selectedRows.size} rows selected.`,
      'polite'
    );
  }

  handleSelectAll(event) {
    const isChecked = event.target.checked;
    
    if (isChecked) {
      // Select all visible rows
      const startIndex = (this._currentPage - 1) * this._pageSize;
      const endIndex = Math.min(startIndex + this._pageSize, this._filteredData.length);
      
      for (let i = startIndex; i < endIndex; i++) {
        this._selectedRows.add(this.getRowId(i));
      }
    } else {
      // Deselect all visible rows
      const startIndex = (this._currentPage - 1) * this._pageSize;
      const endIndex = Math.min(startIndex + this._pageSize, this._filteredData.length);
      
      for (let i = startIndex; i < endIndex; i++) {
        this._selectedRows.delete(this.getRowId(i));
      }
    }
    
    this.updateRowSelection();
    this.emit('selection-changed', { 
      selectedRows: this.selectedRows,
      totalSelected: this._selectedRows.size 
    });
    
    this.announceToScreenReader(
      `${isChecked ? 'Selected' : 'Deselected'} all visible rows. ${this._selectedRows.size} total rows selected.`,
      'polite'
    );
  }

  handleSearch(event) {
    this.searchQuery = event.target.value;
    this._currentPage = 1; // Reset to first page
    this.updatePagination();
    this.emit('search-changed', { query: this._searchQuery });
  }

  handleColumnFilter(columnKey, filterValue) {
    if (filterValue) {
      this._columnFilters.set(columnKey, filterValue);
    } else {
      this._columnFilters.delete(columnKey);
    }
    
    this._currentPage = 1; // Reset to first page
    this.processData();
    this.updateDisplay();
    this.emit('filter-changed', { 
      column: columnKey, 
      filter: filterValue,
      activeFilters: Object.fromEntries(this._columnFilters) 
    });
  }

  handlePageChange(newPage) {
    const maxPage = Math.ceil(this._totalRows / this._pageSize);
    this._currentPage = Math.max(1, Math.min(newPage, maxPage));
    this.updateDisplay();
    this.emit('page-changed', { 
      page: this._currentPage, 
      pageSize: this._pageSize,
      totalRows: this._totalRows 
    });
    
    this.announceToScreenReader(
      `Showing page ${this._currentPage} of ${maxPage}`,
      'polite'
    );
  }

  getRowId(index) {
    const row = this._filteredData[index];
    return row?.id || row?.key || index;
  }

  // UI update methods
  updateLoadingState() {
    const tbody = this.shadowRoot.querySelector('tbody');
    const loadingRow = this.shadowRoot.querySelector('.loading-row');
    
    if (this._loading) {
      if (tbody && !loadingRow) {
        const classes = this.getTailwindClasses();
        const colCount = this._columns.length + (this.hasAttribute('selectable') ? 1 : 0);
        tbody.innerHTML = `
          <tr class="loading-row">
            <td colspan="${colCount}" class="${classes.emptyCell}">
              <div class="${classes.loadingSpinner}"></div>
              <div class="mt-sm">${this.getAttribute('loading-message') || 'Loading...'}</div>
            </td>
          </tr>
        `;
      }
    } else {
      this.updateDisplay();
    }
  }

  updateDisplay() {
    if (this._loading) return;
    
    const tbody = this.shadowRoot.querySelector('tbody');
    if (!tbody) return;

    const classes = this.getTailwindClasses();
    const startIndex = (this._currentPage - 1) * this._pageSize;
    const endIndex = Math.min(startIndex + this._pageSize, this._filteredData.length);
    const pageData = this._filteredData.slice(startIndex, endIndex);

    if (pageData.length === 0) {
      const colCount = this._columns.length + (this.hasAttribute('selectable') ? 1 : 0);
      tbody.innerHTML = `
        <tr class="empty-row">
          <td colspan="${colCount}" class="${classes.emptyCell}">
            ${this.getAttribute('empty-message') || 'No data available'}
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = pageData.map((row, index) => {
      const actualIndex = startIndex + index;
      const rowId = this.getRowId(actualIndex);
      const isSelected = this._selectedRows.has(rowId);
      
      return `
        <tr class="${classes.tr} ${isSelected ? classes.selectedTr : ''}" data-index="${actualIndex}">
          ${this.hasAttribute('selectable') ? `
            <td class="${classes.td} ${classes.selectCell}">
              <label class="${classes.checkboxWrapper}">
                <input 
                  type="checkbox" 
                  class="${classes.checkbox} peer"
                  ${isSelected ? 'checked' : ''}
                  aria-label="Select row ${actualIndex + 1}"
                  data-row-index="${index}"
                />
                <span class="${classes.checkmark}"></span>
              </label>
            </td>
          ` : ''}
          ${this._columns.map(column => `
            <td class="${classes.td}" data-column="${column.key}">
              ${this.renderCell(row, column)}
            </td>
          `).join('')}
        </tr>
      `;
    }).join('');

    this.attachRowEventListeners();
    this.updateSelectAllState();
    this.updatePagination();
  }

  renderCell(row, column) {
    const value = this.getCellValue(row, column.key);
    
    if (column.render && typeof column.render === 'function') {
      return column.render(value, row);
    }
    
    if (column.type === 'date' && value instanceof Date) {
      return value.toLocaleDateString();
    }
    
    if (column.type === 'currency' && typeof value === 'number') {
      return new Intl.NumberFormat('en-US', { 
        style: 'currency', 
        currency: 'USD' 
      }).format(value);
    }
    
    if (column.type === 'number' && typeof value === 'number') {
      return value.toLocaleString();
    }
    
    if (column.type === 'boolean') {
      return value ? '✓' : '✗';
    }
    
    return String(value || '');
  }

  updateSelectAllState() {
    const selectAllCheckbox = this.shadowRoot.querySelector('.select-all-checkbox');
    if (!selectAllCheckbox) return;

    const startIndex = (this._currentPage - 1) * this._pageSize;
    const endIndex = Math.min(startIndex + this._pageSize, this._filteredData.length);
    const visibleRowIds = [];
    
    for (let i = startIndex; i < endIndex; i++) {
      visibleRowIds.push(this.getRowId(i));
    }
    
    const selectedVisibleRows = visibleRowIds.filter(id => this._selectedRows.has(id));
    
    if (selectedVisibleRows.length === 0) {
      selectAllCheckbox.checked = false;
      selectAllCheckbox.indeterminate = false;
    } else if (selectedVisibleRows.length === visibleRowIds.length) {
      selectAllCheckbox.checked = true;
      selectAllCheckbox.indeterminate = false;
    } else {
      selectAllCheckbox.checked = false;
      selectAllCheckbox.indeterminate = true;
    }
  }

  updateRowSelection() {
    const rows = this.shadowRoot.querySelectorAll('.data-row');
    rows.forEach((row, index) => {
      const actualIndex = (this._currentPage - 1) * this._pageSize + index;
      const rowId = this.getRowId(actualIndex);
      const isSelected = this._selectedRows.has(rowId);
      
      row.classList.toggle('selected', isSelected);
      const checkbox = row.querySelector('input[type="checkbox"]');
      if (checkbox) {
        checkbox.checked = isSelected;
      }
    });
  }

  updatePagination() {
    const pagination = this.shadowRoot.querySelector('[role="navigation"]');
    if (!pagination || !this.hasAttribute('paginated')) return;

    const classes = this.getTailwindClasses();
    const totalPages = Math.ceil(this._totalRows / this._pageSize);
    
    if (totalPages <= 1) {
      pagination.style.display = 'none';
      return;
    }
    
    pagination.style.display = 'flex';
    
    const startItem = (this._currentPage - 1) * this._pageSize + 1;
    const endItem = Math.min(this._currentPage * this._pageSize, this._totalRows);
    
    pagination.innerHTML = `
      <div class="${classes.paginationInfo}">
        Showing ${startItem}-${endItem} of ${this._totalRows} items
      </div>
      <div class="${classes.paginationControls}">
        <button 
          class="${classes.paginationBtn}" 
          ${this._currentPage === 1 ? 'disabled' : ''}
          data-action="first"
          aria-label="Go to first page"
        >⟪</button>
        <button 
          class="${classes.paginationBtn}" 
          ${this._currentPage === 1 ? 'disabled' : ''}
          data-action="prev"
          aria-label="Go to previous page"
        >❮</button>
        <span class="${classes.pageIndicator}">Page ${this._currentPage} of ${totalPages}</span>
        <button 
          class="${classes.paginationBtn}" 
          ${this._currentPage === totalPages ? 'disabled' : ''}
          data-action="next"
          aria-label="Go to next page"
        >❯</button>
        <button 
          class="${classes.paginationBtn}" 
          ${this._currentPage === totalPages ? 'disabled' : ''}
          data-action="last"
          aria-label="Go to last page"
        >⟫</button>
      </div>
    `;

    this.attachPaginationEventListeners();
  }

  // Attach event listeners
  attachRowEventListeners() {
    const checkboxes = this.shadowRoot.querySelectorAll('.data-row input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', (e) => {
        const rowIndex = parseInt(e.target.dataset.rowIndex);
        this.handleRowSelect(rowIndex, e);
      });
    });
  }

  attachPaginationEventListeners() {
    const paginationBtns = this.shadowRoot.querySelectorAll('[data-action]');
    paginationBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const action = e.target.dataset.action;
        const totalPages = Math.ceil(this._totalRows / this._pageSize);
        
        switch (action) {
          case 'first': this.handlePageChange(1); break;
          case 'prev': this.handlePageChange(this._currentPage - 1); break;
          case 'next': this.handlePageChange(this._currentPage + 1); break;
          case 'last': this.handlePageChange(totalPages); break;
        }
      });
    });
  }

  attachEventListeners() {
    this.removeEventListeners();

    // Header sorting
    const sortableHeaders = this.shadowRoot.querySelectorAll('[role="columnheader"]');
    sortableHeaders.forEach(header => {
      header.addEventListener('click', () => {
        this.handleSort(header.dataset.column);
      });
    });

    // Select all checkbox
    const selectAllCheckbox = this.shadowRoot.querySelector('.select-all-checkbox');
    if (selectAllCheckbox) {
      selectAllCheckbox.addEventListener('change', this.handleSelectAll);
    }

    // Search input
    const searchInput = this.shadowRoot.querySelector('input[type="text"]');
    if (searchInput) {
      searchInput.addEventListener('input', this.handleSearch);
    }
  }

  // Generate TailwindCSS classes for the data table
  getTailwindClasses() {
    const dense = this.hasAttribute('dense');
    const striped = this.hasAttribute('striped');
    const bordered = this.hasAttribute('bordered');
    const config = globalConfig.get('theme.tailwind', {});

    return {
      container: [
        'relative w-full overflow-hidden',
        'bg-surface rounded-lg shadow-elevation1 font-sans'
      ].join(' '),

      controls: [
        'flex gap-md items-center flex-wrap p-md',
        'bg-surface-container-lowest border-b border-outline-variant',
        dense && 'p-sm'
      ].filter(Boolean).join(' '),

      searchInput: [
        'flex-1 min-w-48 px-md py-sm border border-outline-variant',
        'rounded-sm text-body-medium bg-surface text-surface-on-surface',
        'outline-none transition-all duration-short2',
        'focus:border-primary focus:ring-2 focus:ring-primary/20'
      ].join(' '),

      tableWrapper: [
        'overflow-x-auto overflow-y-visible'
      ].join(' '),

      table: [
        'w-full border-collapse text-body-medium',
        'text-surface-on-surface bg-surface'
      ].join(' '),

      thead: [
        'bg-surface-container-low sticky top-0 z-10'
      ].join(' '),

      th: [
        'px-md py-md text-left font-medium text-body-medium',
        'text-surface-on-surface border-b-2 border-outline-variant',
        'whitespace-nowrap relative',
        dense && 'px-sm py-sm'
      ].filter(Boolean).join(' '),

      sortableHeader: [
        'cursor-pointer select-none transition-all duration-short2',
        'hover:bg-surface-container-high focus:outline focus:outline-2 focus:outline-primary focus:outline-offset-2'
      ].join(' '),

      sortIndicator: [
        'ml-xs text-xs opacity-70 transition-all duration-short2'
      ].join(' '),

      tbody: [
        // Base tbody styling is handled by individual rows
      ].join(' '),

      tr: [
        'bg-surface transition-all duration-short2 h-13',
        'hover:bg-surface-container-highest',
        dense && 'h-8',
        striped && 'even:bg-surface-container-lowest/30'
      ].filter(Boolean).join(' '),

      selectedTr: [
        'bg-primary/12'
      ].join(' '),

      td: [
        'px-md py-md border-b border-outline-variant align-middle',
        dense && 'px-sm py-sm',
        bordered && 'border border-outline-variant'
      ].filter(Boolean).join(' '),

      selectCell: [
        'w-12 text-center'
      ].join(' '),

      checkboxWrapper: [
        'inline-flex items-center relative cursor-pointer'
      ].join(' '),

      checkbox: [
        'absolute opacity-0 cursor-pointer'
      ].join(' '),

      checkmark: [
        'w-4 h-4 border-2 border-outline rounded-xs bg-surface',
        'relative transition-all duration-short2',
        'peer-checked:bg-primary peer-checked:border-primary',
        'peer-indeterminate:bg-primary peer-indeterminate:border-primary'
      ].join(' '),

      loadingSpinner: [
        'w-6 h-6 border-2 border-outline-variant border-t-primary',
        'rounded-full animate-spin mx-auto mb-xs'
      ].join(' '),

      emptyCell: [
        'text-center py-8 text-surface-on-surface-variant italic'
      ].join(' '),

      pagination: [
        'flex justify-between items-center px-md py-md',
        'bg-surface-container-lowest border-t border-outline-variant text-body-small'
      ].join(' '),

      paginationInfo: [
        'text-surface-on-surface-variant'
      ].join(' '),

      paginationControls: [
        'flex gap-xs items-center'
      ].join(' '),

      paginationBtn: [
        'w-8 h-8 border border-outline-variant bg-surface',
        'text-surface-on-surface rounded-xs cursor-pointer',
        'transition-all duration-short2 flex items-center justify-center text-xs',
        'hover:bg-surface-container-highest hover:border-primary',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'focus:outline focus:outline-2 focus:outline-primary focus:outline-offset-2'
      ].join(' '),

      pageIndicator: [
        'mx-sm font-medium'
      ].join(' ')
    };
  }

  // Render the component with TailwindCSS
  render() {
    const classes = this.getTailwindClasses();

    this.shadowRoot.innerHTML = `
      <style>
        @import '/src/styles/tailwind.css';
        
        :host {
          display: block;
        }

        /* Custom checkbox styling */
        .checkbox-wrapper input[type="checkbox"]:checked + .checkmark::after {
          content: "✓";
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: theme(colors.primary.on-primary);
          font-size: 12px;
          font-weight: bold;
        }

        .checkbox-wrapper input[type="checkbox"]:indeterminate + .checkmark::after {
          content: "−";
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: theme(colors.primary.on-primary);
          font-size: 12px;
          font-weight: bold;
        }

        /* Sort indicators */
        .sortable-header[data-sort="asc"] .sort-indicator::after {
          content: "▲";
          opacity: 1;
        }

        .sortable-header[data-sort="desc"] .sort-indicator::after {
          content: "▼";
          opacity: 1;
        }

        /* Accessibility enhancements */
        @media (prefers-reduced-motion: reduce) {
          * {
            transition: none !important;
            animation: none !important;
          }
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .table-controls {
            flex-direction: column;
            align-items: stretch;
          }
          
          .pagination {
            flex-direction: column;
            gap: theme(spacing.sm);
          }
          
          .pagination-info {
            order: 2;
          }
        }

        /* Enhanced striped rows for host attribute */
        :host([striped]) tbody tr:nth-child(odd) {
          background-color: theme(colors.surface-container-lowest);
        }

        /* Enhanced bordered table for host attribute */
        :host([bordered]) table,
        :host([bordered]) th,
        :host([bordered]) td {
          border: 1px solid theme(colors.outline-variant);
        }
      </style>
      
      <div class="${classes.container}">
        ${this.hasAttribute('searchable') ? `
          <div class="${classes.controls}">
            <input 
              type="text" 
              class="${classes.searchInput}" 
              placeholder="Search..."
              aria-label="Search table data"
            />
          </div>
        ` : ''}
        
        <div class="${classes.tableWrapper}">
          <table class="${classes.table}" role="table" aria-label="Data table">
            <thead class="${classes.thead}">
              <tr>
                ${this.hasAttribute('selectable') ? `
                  <th class="${classes.th} ${classes.selectCell}">
                    <label class="${classes.checkboxWrapper}">
                      <input 
                        type="checkbox" 
                        class="${classes.checkbox} select-all-checkbox peer"
                        aria-label="Select all rows"
                      />
                      <span class="${classes.checkmark}"></span>
                    </label>
                  </th>
                ` : ''}
                ${this._columns.map(column => `
                  <th 
                    class="${classes.th} ${column.sortable ? classes.sortableHeader : ''}"
                    data-column="${column.key}"
                    ${column.sortable ? `data-sort="${this._currentSort.column === column.key ? this._currentSort.direction : ''}"` : ''}
                    ${column.sortable ? 'role="columnheader" tabindex="0"' : ''}
                    ${column.sortable ? `aria-sort="${this._currentSort.column === column.key ? (this._currentSort.direction === 'asc' ? 'ascending' : 'descending') : 'none'}"` : ''}
                  >
                    ${column.label || column.key}
                    ${column.sortable ? `<span class="${classes.sortIndicator}"></span>` : ''}
                  </th>
                `).join('')}
              </tr>
            </thead>
            <tbody class="${classes.tbody}">
              <!-- Data rows will be populated by updateDisplay() -->
            </tbody>
          </table>
        </div>

        ${this.hasAttribute('paginated') ? `
          <div class="${classes.pagination}" role="navigation" aria-label="Table pagination">
            <!-- Pagination controls will be populated by updatePagination() -->
          </div>
        ` : ''}
      </div>
    `;

    // Initialize display
    if (this._loading) {
      this.updateLoadingState();
    } else {
      this.updateDisplay();
    }

    // Attach event listeners
    this.attachEventListeners();
  }

  // Public methods
  clearSelection() {
    this._selectedRows.clear();
    this.updateRowSelection();
    this.emit('selection-changed', { selectedRows: [], totalSelected: 0 });
  }

  selectAll() {
    this._filteredData.forEach((_, index) => {
      this._selectedRows.add(this.getRowId(index));
    });
    this.updateRowSelection();
    this.updateSelectAllState();
    this.emit('selection-changed', { 
      selectedRows: this.selectedRows,
      totalSelected: this._selectedRows.size 
    });
  }

  exportData(format = 'json') {
    const data = this.selectedRows.length > 0 
      ? this._filteredData.filter((_, index) => this._selectedRows.has(this.getRowId(index)))
      : this._filteredData;

    switch (format.toLowerCase()) {
      case 'json':
        return JSON.stringify(data, null, 2);
      case 'csv':
        return this.exportToCSV(data);
      default:
        return data;
    }
  }

  exportToCSV(data) {
    const headers = this._columns.map(col => col.label || col.key);
    const csvContent = [
      headers.join(','),
      ...data.map(row => 
        this._columns.map(col => {
          const value = this.getCellValue(row, col.key);
          return `"${String(value).replace(/"/g, '""')}"`;
        }).join(',')
      )
    ].join('\n');

    return csvContent;
  }
}

// Register the custom element
if (!customElements.get('my-data-table')) {
  customElements.define('my-data-table', MyDataTable);
}