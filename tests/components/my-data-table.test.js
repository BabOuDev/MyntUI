/**
 * Unit tests for my-data-table component
 * Tests component functionality, data handling, sorting, filtering, and accessibility
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import '../../src/components/my-data-table/my-data-table.js';

describe('MyDataTable', () => {
  let table;
  let container;
  
  const sampleColumns = [
    { key: 'id', label: 'ID', type: 'number', sortable: true },
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'active', label: 'Active', type: 'boolean' }
  ];
  
  const sampleData = [
    { id: 1, name: 'John Doe', email: 'john@example.com', active: true },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', active: false },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', active: true }
  ];

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    
    table = document.createElement('my-data-table');
    container.appendChild(table);
    
    // Wait for component to initialize
    return new Promise(resolve => {
      if (table.shadowRoot) {
        resolve();
      } else {
        table.addEventListener('componentReady', resolve, { once: true });
        setTimeout(resolve, 100); // Fallback
      }
    });
  });

  afterEach(() => {
    if (container && container.parentNode) {
      container.parentNode.removeChild(container);
    }
  });

  describe('Initialization', () => {
    it('should create component with shadow DOM', () => {
      expect(table).toBeDefined();
      expect(table.shadowRoot).toBeDefined();
    });

    it('should have correct tag name', () => {
      expect(table.tagName.toLowerCase()).toBe('my-data-table');
    });

    it('should initialize with empty data and columns', () => {
      expect(table.data).toEqual([]);
      expect(table.columns).toEqual([]);
    });
  });

  describe('Data and Columns', () => {
    it('should set and get data correctly', () => {
      table.data = sampleData;
      expect(table.data).toEqual(sampleData);
      expect(table.data).not.toBe(sampleData); // Should be a copy
    });

    it('should set and get columns correctly', () => {
      table.columns = sampleColumns;
      expect(table.columns).toEqual(sampleColumns);
      expect(table.columns).not.toBe(sampleColumns); // Should be a copy
    });

    it('should handle invalid data gracefully', () => {
      table.data = null;
      expect(table.data).toEqual([]);
      
      table.data = 'invalid';
      expect(table.data).toEqual([]);
    });

    it('should handle invalid columns gracefully', () => {
      table.columns = null;
      expect(table.columns).toEqual([]);
      
      table.columns = 'invalid';
      expect(table.columns).toEqual([]);
    });

    it('should emit data-changed event when data is set', () => {
      const eventSpy = vi.fn();
      table.addEventListener('data-changed', eventSpy);
      
      table.data = sampleData;
      
      expect(eventSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          detail: expect.objectContaining({
            data: sampleData,
            totalRows: sampleData.length
          })
        })
      );
    });
  });

  describe('Attributes', () => {
    it('should handle selectable attribute', () => {
      table.setAttribute('selectable', '');
      expect(table.hasAttribute('selectable')).toBe(true);
    });

    it('should handle searchable attribute', () => {
      table.setAttribute('searchable', '');
      expect(table.hasAttribute('searchable')).toBe(true);
      
      // Should render search input
      const searchInput = table.shadowRoot.querySelector('.search-input');
      expect(searchInput).toBeDefined();
    });

    it('should handle paginated attribute', () => {
      table.setAttribute('paginated', '');
      expect(table.hasAttribute('paginated')).toBe(true);
    });

    it('should handle page-size attribute', () => {
      table.setAttribute('page-size', '20');
      expect(table.pageSize).toBe(20);
    });

    it('should handle dense attribute', () => {
      table.setAttribute('dense', '');
      expect(table.hasAttribute('dense')).toBe(true);
    });

    it('should handle loading attribute', () => {
      table.setAttribute('loading', '');
      expect(table.loading).toBe(true);
    });
  });

  describe('Data Processing', () => {
    beforeEach(() => {
      table.columns = sampleColumns;
      table.data = sampleData;
    });

    it('should process data correctly', () => {
      expect(table._filteredData).toEqual(sampleData);
      expect(table._totalRows).toBe(sampleData.length);
    });

    it('should filter data with search query', () => {
      table.searchQuery = 'John';
      
      // The search also includes "Johnson" so expect 2 results
      expect(table._filteredData.length).toBe(2);
      expect(table._filteredData.some(row => row.name === 'John Doe')).toBe(true);
      expect(table._filteredData.some(row => row.name === 'Bob Johnson')).toBe(true);
    });

    it('should filter data case-insensitively', () => {
      table.searchQuery = 'john';
      
      // The search also includes "Johnson" so expect 2 results
      expect(table._filteredData.length).toBe(2);
      expect(table._filteredData.some(row => row.name === 'John Doe')).toBe(true);
      expect(table._filteredData.some(row => row.name === 'Bob Johnson')).toBe(true);
    });

    it('should filter data across all columns', () => {
      table.searchQuery = 'example.com';
      
      expect(table._filteredData.length).toBe(3); // All have example.com email
    });

    it('should handle empty search query', () => {
      table.searchQuery = '';
      
      expect(table._filteredData).toEqual(sampleData);
    });
  });

  describe('Sorting', () => {
    beforeEach(() => {
      table.columns = sampleColumns;
      table.data = sampleData;
    });

    it('should sort data by string column ascending', () => {
      table.handleSort('name');
      
      expect(table._currentSort.column).toBe('name');
      expect(table._currentSort.direction).toBe('asc');
      expect(table._filteredData[0].name).toBe('Bob Johnson');
      expect(table._filteredData[2].name).toBe('John Doe');
    });

    it('should sort data by string column descending on second click', () => {
      table.handleSort('name');
      table.handleSort('name');
      
      expect(table._currentSort.column).toBe('name');
      expect(table._currentSort.direction).toBe('desc');
      expect(table._filteredData[0].name).toBe('John Doe');
      expect(table._filteredData[2].name).toBe('Bob Johnson');
    });

    it('should clear sort on third click', () => {
      table.handleSort('name');
      table.handleSort('name');
      table.handleSort('name');
      
      expect(table._currentSort.column).toBe(null);
      expect(table._currentSort.direction).toBe(null);
      expect(table._filteredData).toEqual(sampleData);
    });

    it('should sort numeric data correctly', () => {
      table.handleSort('id');
      
      expect(table._currentSort.column).toBe('id');
      expect(table._currentSort.direction).toBe('asc');
      expect(table._filteredData[0].id).toBe(1);
      expect(table._filteredData[2].id).toBe(3);
    });

    it('should not sort non-sortable columns', () => {
      table.handleSort('active');
      
      expect(table._currentSort.column).toBe(null);
      expect(table._currentSort.direction).toBe(null);
    });

    it('should emit sort-changed event', () => {
      const eventSpy = vi.fn();
      table.addEventListener('sort-changed', eventSpy);
      
      table.handleSort('name');
      
      expect(eventSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          detail: expect.objectContaining({
            column: 'name',
            direction: 'asc'
          })
        })
      );
    });
  });

  describe('Selection', () => {
    beforeEach(() => {
      table.setAttribute('selectable', '');
      table.columns = sampleColumns;
      table.data = sampleData;
    });

    it('should initialize with empty selection', () => {
      expect(table.selectedRows).toEqual([]);
    });

    it('should select rows correctly', () => {
      table.handleRowSelect(0, new Event('change'));
      
      expect(table.selectedRows.length).toBe(1);
      expect(table.selectedRows[0]).toBe(1); // ID of first row
    });

    it('should deselect rows correctly', () => {
      table.handleRowSelect(0, new Event('change'));
      table.handleRowSelect(0, new Event('change'));
      
      expect(table.selectedRows).toEqual([]);
    });

    it('should select multiple rows', () => {
      table.handleRowSelect(0, new Event('change'));
      table.handleRowSelect(1, new Event('change'));
      
      expect(table.selectedRows.length).toBe(2);
      expect(table.selectedRows).toContain(1);
      expect(table.selectedRows).toContain(2);
    });

    it('should clear all selections', () => {
      table.handleRowSelect(0, new Event('change'));
      table.handleRowSelect(1, new Event('change'));
      
      table.clearSelection();
      
      expect(table.selectedRows).toEqual([]);
    });

    it('should select all rows', () => {
      table.selectAll();
      
      expect(table.selectedRows.length).toBe(3);
      expect(table.selectedRows).toContain(1);
      expect(table.selectedRows).toContain(2);
      expect(table.selectedRows).toContain(3);
    });

    it('should emit selection-changed event', () => {
      const eventSpy = vi.fn();
      table.addEventListener('selection-changed', eventSpy);
      
      table.handleRowSelect(0, new Event('change'));
      
      expect(eventSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          detail: expect.objectContaining({
            selectedRows: [1],
            totalSelected: 1
          })
        })
      );
    });
  });

  describe('Pagination', () => {
    beforeEach(() => {
      table.setAttribute('paginated', '');
      table.setAttribute('page-size', '2');
      table.columns = sampleColumns;
      table.data = sampleData;
    });

    it('should initialize pagination correctly', () => {
      expect(table.pageSize).toBe(2);
      expect(table._currentPage).toBe(1);
    });

    it('should change pages correctly', () => {
      table.handlePageChange(2);
      
      expect(table._currentPage).toBe(2);
    });

    it('should not exceed max pages', () => {
      table.handlePageChange(10);
      
      const maxPage = Math.ceil(sampleData.length / table.pageSize);
      expect(table._currentPage).toBe(maxPage);
    });

    it('should not go below page 1', () => {
      table.handlePageChange(-1);
      
      expect(table._currentPage).toBe(1);
    });

    it('should emit page-changed event', () => {
      const eventSpy = vi.fn();
      table.addEventListener('page-changed', eventSpy);
      
      table.handlePageChange(2);
      
      expect(eventSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          detail: expect.objectContaining({
            page: 2,
            pageSize: 2,
            totalRows: sampleData.length
          })
        })
      );
    });
  });

  describe('Cell Rendering', () => {
    beforeEach(() => {
      table.columns = sampleColumns;
      table.data = sampleData;
    });

    it('should render basic cell values', () => {
      const cellValue = table.renderCell(sampleData[0], sampleColumns[1]);
      expect(cellValue).toBe('John Doe');
    });

    it('should render boolean values correctly', () => {
      const cellValue = table.renderCell(sampleData[0], sampleColumns[3]);
      expect(cellValue).toBe('✓');
      
      const falseCellValue = table.renderCell(sampleData[1], sampleColumns[3]);
      expect(falseCellValue).toBe('✗');
    });

    it('should render custom cell renderer', () => {
      const customColumn = {
        key: 'name',
        label: 'Name',
        render: (value) => `<strong>${value}</strong>`
      };
      
      const cellValue = table.renderCell(sampleData[0], customColumn);
      expect(cellValue).toBe('<strong>John Doe</strong>');
    });

    it('should handle nested object keys', () => {
      const nestedData = [{ user: { profile: { name: 'John' } } }];
      const nestedColumn = { key: 'user.profile.name', label: 'Name' };
      
      const cellValue = table.getCellValue(nestedData[0], 'user.profile.name');
      expect(cellValue).toBe('John');
    });
  });

  describe('Export Functionality', () => {
    beforeEach(() => {
      table.columns = sampleColumns.slice(0, 3); // Only first 3 columns
      table.data = sampleData;
    });

    it('should export data as JSON', () => {
      const jsonData = table.exportData('json');
      const parsedData = JSON.parse(jsonData);
      
      expect(parsedData).toEqual(sampleData);
    });

    it('should export data as CSV', () => {
      const csvData = table.exportData('csv');
      
      expect(csvData).toContain('ID,Name,Email');
      expect(csvData).toContain('"1","John Doe","john@example.com"');
      expect(csvData).toContain('"2","Jane Smith","jane@example.com"');
    });

    it('should export selected rows only when selection exists', () => {
      table.setAttribute('selectable', '');
      table.handleRowSelect(0, new Event('change'));
      
      const jsonData = table.exportData('json');
      const parsedData = JSON.parse(jsonData);
      
      expect(parsedData.length).toBe(1);
      expect(parsedData[0].name).toBe('John Doe');
    });

    it('should export all data when no rows are selected', () => {
      table.setAttribute('selectable', '');
      
      const jsonData = table.exportData('json');
      const parsedData = JSON.parse(jsonData);
      
      expect(parsedData).toEqual(sampleData);
    });
  });

  describe('Accessibility', () => {
    beforeEach(() => {
      table.columns = sampleColumns;
      table.data = sampleData;
    });

    it('should have proper ARIA roles', () => {
      const tableElement = table.shadowRoot.querySelector('table');
      expect(tableElement).toBeTruthy();
      expect(tableElement.getAttribute('role')).toBe('table');
      expect(tableElement.getAttribute('aria-label')).toBe('Data table');
    });

    it('should have proper column headers', () => {
      table.columns = [{ key: 'name', label: 'Name', sortable: true }];
      table.render();
      
      const sortableHeader = table.shadowRoot.querySelector('[role="columnheader"]');
      expect(sortableHeader).toBeTruthy();
      expect(sortableHeader.getAttribute('role')).toBe('columnheader');
      expect(sortableHeader.getAttribute('tabindex')).toBe('0');
    });

    it('should update ARIA sort attributes', () => {
      table.columns = [{ key: 'name', label: 'Name', sortable: true }];
      table.render();
      table.handleSort('name');
      
      // Re-render to update ARIA attributes
      table.render();
      
      const sortableHeader = table.shadowRoot.querySelector('[role="columnheader"]');
      expect(sortableHeader).toBeTruthy();
      expect(sortableHeader.getAttribute('aria-sort')).toBe('ascending');
      
      table.handleSort('name');
      table.render();
      const descendingHeader = table.shadowRoot.querySelector('[role="columnheader"]');
      expect(descendingHeader.getAttribute('aria-sort')).toBe('descending');
    });

    it('should have proper checkbox labels', () => {
      table.setAttribute('selectable', '');
      table.render();
      
      const selectAllCheckbox = table.shadowRoot.querySelector('.select-all-checkbox');
      expect(selectAllCheckbox.getAttribute('aria-label')).toBe('Select all rows');
    });
  });

  describe('Loading State', () => {
    it('should show loading state when loading attribute is set', () => {
      table.loading = true;
      
      expect(table.hasAttribute('loading')).toBe(true);
      
      const loadingRow = table.shadowRoot.querySelector('.loading-row');
      expect(loadingRow).toBeDefined();
    });

    it('should hide loading state when loading is false', () => {
      table.loading = true;
      table.columns = sampleColumns;
      table.data = sampleData;
      
      table.loading = false;
      
      expect(table.hasAttribute('loading')).toBe(false);
      
      const loadingRow = table.shadowRoot.querySelector('.loading-row');
      expect(loadingRow).toBe(null);
    });
  });

  describe('Empty State', () => {
    it('should show empty message when no data', () => {
      table.columns = sampleColumns;
      table.data = [];
      
      const emptyRow = table.shadowRoot.querySelector('.empty-row');
      expect(emptyRow).toBeDefined();
      expect(emptyRow.textContent.trim()).toContain('No data available');
    });

    it('should show custom empty message', () => {
      table.setAttribute('empty-message', 'No records found');
      table.columns = sampleColumns;
      table.data = [];
      
      const emptyRow = table.shadowRoot.querySelector('.empty-row');
      expect(emptyRow.textContent.trim()).toContain('No records found');
    });
  });

  describe('Error Handling', () => {
    it('should handle malformed column configuration gracefully', () => {
      // This should not throw an error, but handle missing keys gracefully
      table.columns = [{ /* missing key */ label: 'Test' }];
      table.data = sampleData;
      
      // Component should handle this without throwing
      expect(table.columns.length).toBe(1);
      expect(table.data.length).toBe(3);
    });

    it('should handle missing data properties gracefully', () => {
      table.columns = sampleColumns;
      
      expect(() => {
        table.data = [{ id: 1 /* missing other properties */ }];
      }).not.toThrow();
    });

    it('should handle invalid sort column gracefully', () => {
      table.columns = sampleColumns;
      table.data = sampleData;
      
      expect(() => {
        table.handleSort('nonexistent');
      }).not.toThrow();
    });
  });
});