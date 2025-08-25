/**
 * MyntUI my-data-table Component
 * A comprehensive data table component with Material Design 3 styling
 * Features sorting, filtering, pagination, row selection, and responsive design
 * Enhanced with accessibility features and customizable column rendering
 */

import { MyntUIBaseComponent } from '../../core/base-component.js';

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
        const colCount = this._columns.length + (this.hasAttribute('selectable') ? 1 : 0);
        tbody.innerHTML = `
          <tr class="loading-row">
            <td colspan="${colCount}" style="text-align: center; padding: 2rem;">
              <div class="loading-spinner"></div>
              <div>${this.getAttribute('loading-message') || 'Loading...'}</div>
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

    const startIndex = (this._currentPage - 1) * this._pageSize;
    const endIndex = Math.min(startIndex + this._pageSize, this._filteredData.length);
    const pageData = this._filteredData.slice(startIndex, endIndex);

    if (pageData.length === 0) {
      const colCount = this._columns.length + (this.hasAttribute('selectable') ? 1 : 0);
      tbody.innerHTML = `
        <tr class="empty-row">
          <td colspan="${colCount}" style="text-align: center; padding: 2rem; color: var(--_global-color-on-surface-variant);">
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
        <tr class="data-row ${isSelected ? 'selected' : ''}" data-index="${actualIndex}">
          ${this.hasAttribute('selectable') ? `
            <td class="select-cell">
              <label class="checkbox-wrapper">
                <input 
                  type="checkbox" 
                  ${isSelected ? 'checked' : ''}
                  aria-label="Select row ${actualIndex + 1}"
                  data-row-index="${index}"
                />
                <span class="checkmark"></span>
              </label>
            </td>
          ` : ''}
          ${this._columns.map(column => `
            <td class="data-cell" data-column="${column.key}">
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
    const pagination = this.shadowRoot.querySelector('.pagination');
    if (!pagination || !this.hasAttribute('paginated')) return;

    const totalPages = Math.ceil(this._totalRows / this._pageSize);
    
    if (totalPages <= 1) {
      pagination.style.display = 'none';
      return;
    }
    
    pagination.style.display = 'flex';
    
    const startItem = (this._currentPage - 1) * this._pageSize + 1;
    const endItem = Math.min(this._currentPage * this._pageSize, this._totalRows);
    
    pagination.innerHTML = `
      <div class="pagination-info">
        Showing ${startItem}-${endItem} of ${this._totalRows} items
      </div>
      <div class="pagination-controls">
        <button 
          class="pagination-btn" 
          ${this._currentPage === 1 ? 'disabled' : ''}
          data-action="first"
          aria-label="Go to first page"
        >⟪</button>
        <button 
          class="pagination-btn" 
          ${this._currentPage === 1 ? 'disabled' : ''}
          data-action="prev"
          aria-label="Go to previous page"
        >❮</button>
        <span class="page-indicator">Page ${this._currentPage} of ${totalPages}</span>
        <button 
          class="pagination-btn" 
          ${this._currentPage === totalPages ? 'disabled' : ''}
          data-action="next"
          aria-label="Go to next page"
        >❯</button>
        <button 
          class="pagination-btn" 
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
    const paginationBtns = this.shadowRoot.querySelectorAll('.pagination-btn');
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
    const sortableHeaders = this.shadowRoot.querySelectorAll('.sortable-header');
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
    const searchInput = this.shadowRoot.querySelector('.search-input');
    if (searchInput) {
      searchInput.addEventListener('input', this.handleSearch);
    }
  }

  // Render the component
  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          /* Material Design 3 Data Table Variables */
          --_table-background: var(--_global-color-surface);
          --_table-border-color: var(--_global-color-outline-variant);
          --_table-header-background: var(--_global-color-surface-container-low);
          --_table-header-text-color: var(--_global-color-on-surface);
          --_table-row-background: var(--_global-color-surface);
          --_table-row-background-hover: var(--_global-color-surface-container-highest);
          --_table-row-background-selected: color-mix(in srgb, var(--_global-color-primary) 12%, var(--_global-color-surface));
          --_table-cell-padding: var(--_global-spacing-md);
          --_table-border-radius: var(--_global-border-radius-md);
          --_table-shadow: var(--_global-elevation-1);
          --_table-transition: var(--_global-motion-duration-short2) var(--_global-motion-easing-standard);
          
          /* Typography */
          --_table-font-family: var(--_global-font-family-sans);
          --_table-font-size: var(--_global-font-size-sm);
          --_table-header-font-size: var(--_global-font-size-sm);
          --_table-header-font-weight: var(--_global-font-weight-medium);
          
          /* Density variants */
          --_table-row-height-compact: 32px;
          --_table-row-height-normal: 52px;
          --_table-row-height-comfortable: 64px;
          --_table-row-height: var(--_table-row-height-normal);
          
          display: block;
          font-family: var(--_table-font-family);
          background: var(--_table-background);
          border-radius: var(--_table-border-radius);
          overflow: hidden;
          box-shadow: var(--_table-shadow);
        }

        /* Table container */
        .table-container {
          position: relative;
          width: 100%;
          overflow: hidden;
        }

        /* Search and filters */
        .table-controls {
          padding: var(--_global-spacing-md);
          background: var(--_global-color-surface-container-lowest);
          border-bottom: 1px solid var(--_table-border-color);
          display: flex;
          gap: var(--_global-spacing-md);
          align-items: center;
          flex-wrap: wrap;
        }

        .search-input {
          flex: 1;
          min-width: 200px;
          padding: var(--_global-spacing-sm) var(--_global-spacing-md);
          border: 1px solid var(--_table-border-color);
          border-radius: var(--_global-border-radius-sm);
          font-size: var(--_table-font-size);
          background: var(--_global-color-surface);
          color: var(--_global-color-on-surface);
          outline: none;
          transition: var(--_table-transition);
        }

        .search-input:focus {
          border-color: var(--_global-color-primary);
          box-shadow: 0 0 0 2px color-mix(in srgb, var(--_global-color-primary) 20%, transparent);
        }

        /* Table wrapper for horizontal scrolling */
        .table-wrapper {
          overflow-x: auto;
          overflow-y: visible;
        }

        /* Main table */
        .data-table {
          width: 100%;
          border-collapse: collapse;
          font-size: var(--_table-font-size);
          color: var(--_global-color-on-surface);
          background: var(--_table-background);
        }

        /* Table header */
        .data-table thead {
          background: var(--_table-header-background);
          position: sticky;
          top: 0;
          z-index: 2;
        }

        .data-table th {
          padding: var(--_table-cell-padding);
          text-align: left;
          font-weight: var(--_table-header-font-weight);
          font-size: var(--_table-header-font-size);
          color: var(--_table-header-text-color);
          border-bottom: 2px solid var(--_table-border-color);
          white-space: nowrap;
          position: relative;
        }

        .sortable-header {
          cursor: pointer;
          user-select: none;
          transition: var(--_table-transition);
        }

        .sortable-header:hover {
          background: var(--_global-color-surface-container-high);
        }

        .sort-indicator {
          margin-left: var(--_global-spacing-xs);
          font-size: 12px;
          opacity: 0.7;
          transition: var(--_table-transition);
        }

        .sortable-header[data-sort="asc"] .sort-indicator::after {
          content: "▲";
          opacity: 1;
        }

        .sortable-header[data-sort="desc"] .sort-indicator::after {
          content: "▼";
          opacity: 1;
        }

        /* Table body */
        .data-table tbody tr {
          background: var(--_table-row-background);
          transition: var(--_table-transition);
          height: var(--_table-row-height);
        }

        .data-table tbody tr:hover {
          background: var(--_table-row-background-hover);
        }

        .data-table tbody tr.selected {
          background: var(--_table-row-background-selected);
        }

        .data-table tbody tr:nth-child(even) {
          background: color-mix(in srgb, var(--_global-color-surface-container-lowest) 30%, var(--_table-row-background));
        }

        .data-table tbody tr:nth-child(even):hover {
          background: var(--_table-row-background-hover);
        }

        .data-table tbody tr:nth-child(even).selected {
          background: var(--_table-row-background-selected);
        }

        .data-table td {
          padding: var(--_table-cell-padding);
          border-bottom: 1px solid var(--_table-border-color);
          vertical-align: middle;
        }

        /* Selection styles */
        .select-cell {
          width: 48px;
          text-align: center;
        }

        .checkbox-wrapper {
          display: inline-flex;
          align-items: center;
          position: relative;
          cursor: pointer;
        }

        .checkbox-wrapper input[type="checkbox"] {
          position: absolute;
          opacity: 0;
          cursor: pointer;
        }

        .checkmark {
          width: 18px;
          height: 18px;
          border: 2px solid var(--_global-color-outline);
          border-radius: var(--_global-border-radius-xs);
          background: var(--_global-color-surface);
          position: relative;
          transition: var(--_table-transition);
        }

        .checkbox-wrapper input[type="checkbox"]:checked + .checkmark {
          background: var(--_global-color-primary);
          border-color: var(--_global-color-primary);
        }

        .checkbox-wrapper input[type="checkbox"]:checked + .checkmark::after {
          content: "✓";
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: var(--_global-color-on-primary);
          font-size: 12px;
          font-weight: bold;
        }

        .checkbox-wrapper input[type="checkbox"]:indeterminate + .checkmark {
          background: var(--_global-color-primary);
          border-color: var(--_global-color-primary);
        }

        .checkbox-wrapper input[type="checkbox"]:indeterminate + .checkmark::after {
          content: "−";
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: var(--_global-color-on-primary);
          font-size: 12px;
          font-weight: bold;
        }

        /* Loading and empty states */
        .loading-spinner {
          width: 24px;
          height: 24px;
          border: 2px solid var(--_global-color-outline-variant);
          border-top: 2px solid var(--_global-color-primary);
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto 8px auto;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .empty-row td,
        .loading-row td {
          text-align: center;
          padding: 2rem;
          color: var(--_global-color-on-surface-variant);
          font-style: italic;
        }

        /* Pagination */
        .pagination {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: var(--_global-spacing-md);
          background: var(--_global-color-surface-container-lowest);
          border-top: 1px solid var(--_table-border-color);
          font-size: var(--_global-font-size-sm);
        }

        .pagination-info {
          color: var(--_global-color-on-surface-variant);
        }

        .pagination-controls {
          display: flex;
          gap: var(--_global-spacing-xs);
          align-items: center;
        }

        .pagination-btn {
          width: 32px;
          height: 32px;
          border: 1px solid var(--_table-border-color);
          background: var(--_global-color-surface);
          color: var(--_global-color-on-surface);
          border-radius: var(--_global-border-radius-xs);
          cursor: pointer;
          transition: var(--_table-transition);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
        }

        .pagination-btn:hover:not(:disabled) {
          background: var(--_global-color-surface-container-highest);
          border-color: var(--_global-color-primary);
        }

        .pagination-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .page-indicator {
          margin: 0 var(--_global-spacing-sm);
          font-weight: var(--_global-font-weight-medium);
        }

        /* Density variants */
        :host([dense]) {
          --_table-row-height: var(--_table-row-height-compact);
          --_table-cell-padding: var(--_global-spacing-sm);
        }

        :host([dense]) .table-controls {
          padding: var(--_global-spacing-sm) var(--_global-spacing-md);
        }

        /* Responsive design */
        @media (max-width: 768px) {
          .table-controls {
            flex-direction: column;
            align-items: stretch;
          }

          .search-input {
            min-width: unset;
          }

          .pagination {
            flex-direction: column;
            gap: var(--_global-spacing-sm);
          }

          .pagination-info {
            order: 2;
          }
        }

        /* Striped variant */
        :host([striped]) .data-table tbody tr:nth-child(odd) {
          background: var(--_global-color-surface-container-lowest);
        }

        /* Bordered variant */
        :host([bordered]) .data-table,
        :host([bordered]) .data-table th,
        :host([bordered]) .data-table td {
          border: 1px solid var(--_table-border-color);
        }

        /* Accessibility improvements */
        @media (prefers-reduced-motion: reduce) {
          * {
            transition: none !important;
            animation: none !important;
          }
        }

        /* Focus styles */
        .sortable-header:focus,
        .pagination-btn:focus,
        .checkbox-wrapper:focus-within {
          outline: 2px solid var(--_global-color-primary);
          outline-offset: 2px;
        }
      </style>
      
      <div class="table-container">
        ${this.hasAttribute('searchable') ? `
          <div class="table-controls">
            <input 
              type="text" 
              class="search-input" 
              placeholder="Search..."
              aria-label="Search table data"
            />
          </div>
        ` : ''}
        
        <div class="table-wrapper">
          <table class="data-table" role="table" aria-label="Data table">
            <thead>
              <tr>
                ${this.hasAttribute('selectable') ? `
                  <th class="select-cell">
                    <label class="checkbox-wrapper">
                      <input 
                        type="checkbox" 
                        class="select-all-checkbox"
                        aria-label="Select all rows"
                      />
                      <span class="checkmark"></span>
                    </label>
                  </th>
                ` : ''}
                ${this._columns.map(column => `
                  <th 
                    class="${column.sortable ? 'sortable-header' : ''}"
                    data-column="${column.key}"
                    ${column.sortable ? `data-sort="${this._currentSort.column === column.key ? this._currentSort.direction : ''}"` : ''}
                    ${column.sortable ? 'role="columnheader" tabindex="0"' : ''}
                    ${column.sortable ? `aria-sort="${this._currentSort.column === column.key ? (this._currentSort.direction === 'asc' ? 'ascending' : 'descending') : 'none'}"` : ''}
                  >
                    ${column.label || column.key}
                    ${column.sortable ? '<span class="sort-indicator"></span>' : ''}
                  </th>
                `).join('')}
              </tr>
            </thead>
            <tbody>
              <!-- Data rows will be populated by updateDisplay() -->
            </tbody>
          </table>
        </div>

        ${this.hasAttribute('paginated') ? `
          <div class="pagination" role="navigation" aria-label="Table pagination">
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