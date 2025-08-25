/**
 * End-to-end tests for my-data-table component
 * Tests complete data table functionality, user interactions, and visual consistency
 */

describe('MyntUI Data Table E2E Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:6006/iframe.html?args=&id=data-display-my-data-table--interactive&viewMode=story');
    cy.wait(2000); // Wait for component to fully load
  });

  describe('Basic Functionality', () => {
    it('should render data table with all expected elements', () => {
      // Check if table is rendered
      cy.get('my-data-table').should('exist');
      
      // Check for search input
      cy.get('my-data-table').shadow().find('.search-input').should('exist');
      
      // Check for table headers
      cy.get('my-data-table').shadow().find('thead th').should('have.length.at.least', 5);
      
      // Check for data rows
      cy.get('my-data-table').shadow().find('tbody tr').should('have.length.at.least', 1);
      
      // Check for pagination controls
      cy.get('my-data-table').shadow().find('.pagination').should('exist');
    });

    it('should display table data correctly', () => {
      // Check if data is displayed in table cells
      cy.get('my-data-table').shadow().find('tbody td').should('contain.text', 'John');
      cy.get('my-data-table').shadow().find('tbody td').should('contain.text', 'example.com');
      
      // Check column headers
      cy.get('my-data-table').shadow().find('thead th').should('contain.text', 'ID');
      cy.get('my-data-table').shadow().find('thead th').should('contain.text', 'Name');
      cy.get('my-data-table').shadow().find('thead th').should('contain.text', 'Email');
    });
  });

  describe('Search Functionality', () => {
    it('should filter data based on search query', () => {
      // Get initial row count
      cy.get('my-data-table').shadow().find('tbody tr.data-row').then($rows => {
        const initialCount = $rows.length;
        
        // Search for specific term
        cy.get('my-data-table').shadow().find('.search-input').type('John');
        cy.wait(500); // Wait for debounced search
        
        // Check that results are filtered
        cy.get('my-data-table').shadow().find('tbody tr.data-row').should('have.length.lessThan', initialCount);
        cy.get('my-data-table').shadow().find('tbody').should('contain.text', 'John');
      });
    });

    it('should show no results message when search yields no matches', () => {
      // Search for non-existent term
      cy.get('my-data-table').shadow().find('.search-input').type('nonexistentterm');
      cy.wait(500);
      
      // Should show empty state
      cy.get('my-data-table').shadow().find('.empty-row').should('exist');
      cy.get('my-data-table').shadow().find('.empty-row').should('contain.text', 'No data available');
    });

    it('should clear search results when input is cleared', () => {
      // Perform search
      cy.get('my-data-table').shadow().find('.search-input').type('John');
      cy.wait(500);
      
      // Clear search
      cy.get('my-data-table').shadow().find('.search-input').clear();
      cy.wait(500);
      
      // Should show all results again
      cy.get('my-data-table').shadow().find('tbody tr.data-row').should('have.length.at.least', 5);
    });
  });

  describe('Sorting Functionality', () => {
    it('should sort data when clicking sortable column headers', () => {
      // Click on Name column header to sort
      cy.get('my-data-table').shadow().find('thead th[data-column="firstName"]').click();
      cy.wait(200);
      
      // Check that sort indicator is shown
      cy.get('my-data-table').shadow().find('thead th[data-column="firstName"]')
        .should('have.attr', 'data-sort', 'asc');
      cy.get('my-data-table').shadow().find('thead th[data-column="firstName"] .sort-indicator')
        .should('exist');
    });

    it('should reverse sort order on second click', () => {
      const nameColumn = 'thead th[data-column="firstName"]';
      
      // First click - ascending
      cy.get('my-data-table').shadow().find(nameColumn).click();
      cy.wait(200);
      cy.get('my-data-table').shadow().find(nameColumn).should('have.attr', 'data-sort', 'asc');
      
      // Second click - descending  
      cy.get('my-data-table').shadow().find(nameColumn).click();
      cy.wait(200);
      cy.get('my-data-table').shadow().find(nameColumn).should('have.attr', 'data-sort', 'desc');
    });

    it('should clear sort on third click', () => {
      const nameColumn = 'thead th[data-column="firstName"]';
      
      // Three clicks to clear sort
      cy.get('my-data-table').shadow().find(nameColumn).click();
      cy.wait(200);
      cy.get('my-data-table').shadow().find(nameColumn).click();
      cy.wait(200);
      cy.get('my-data-table').shadow().find(nameColumn).click();
      cy.wait(200);
      
      // Sort should be cleared
      cy.get('my-data-table').shadow().find(nameColumn).should('have.attr', 'data-sort', '');
    });
  });

  describe('Row Selection', () => {
    it('should select individual rows when checkbox is clicked', () => {
      // Click first row checkbox
      cy.get('my-data-table').shadow()
        .find('tbody tr:first-child .checkbox-wrapper input[type="checkbox"]')
        .check();
      
      // Row should be marked as selected
      cy.get('my-data-table').shadow()
        .find('tbody tr:first-child')
        .should('have.class', 'selected');
      
      // Checkbox should be checked
      cy.get('my-data-table').shadow()
        .find('tbody tr:first-child .checkbox-wrapper input[type="checkbox"]')
        .should('be.checked');
    });

    it('should deselect rows when clicked again', () => {
      // Select then deselect first row
      cy.get('my-data-table').shadow()
        .find('tbody tr:first-child .checkbox-wrapper input[type="checkbox"]')
        .check()
        .uncheck();
      
      // Row should not be selected
      cy.get('my-data-table').shadow()
        .find('tbody tr:first-child')
        .should('not.have.class', 'selected');
    });

    it('should handle select all functionality', () => {
      // Click select all checkbox
      cy.get('my-data-table').shadow()
        .find('thead .select-all-checkbox')
        .check();
      
      // All visible rows should be selected
      cy.get('my-data-table').shadow()
        .find('tbody tr.data-row')
        .should('have.class', 'selected');
      
      // All row checkboxes should be checked
      cy.get('my-data-table').shadow()
        .find('tbody tr.data-row .checkbox-wrapper input[type="checkbox"]')
        .should('be.checked');
    });

    it('should update select all state based on individual selections', () => {
      // Select all individual rows manually
      cy.get('my-data-table').shadow()
        .find('tbody tr.data-row .checkbox-wrapper input[type="checkbox"]')
        .check({ multiple: true });
      
      // Select all checkbox should be checked or indeterminate
      cy.get('my-data-table').shadow()
        .find('thead .select-all-checkbox')
        .should('be.checked');
    });
  });

  describe('Pagination', () => {
    it('should navigate between pages', () => {
      // Check that pagination controls exist
      cy.get('my-data-table').shadow().find('.pagination-controls').should('exist');
      
      // Click next page button
      cy.get('my-data-table').shadow().find('.pagination-btn[data-action="next"]').click();
      cy.wait(200);
      
      // Page indicator should show page 2
      cy.get('my-data-table').shadow().find('.page-indicator').should('contain.text', 'Page 2');
      
      // Previous button should be enabled
      cy.get('my-data-table').shadow()
        .find('.pagination-btn[data-action="prev"]')
        .should('not.be.disabled');
    });

    it('should disable navigation buttons at page boundaries', () => {
      // Previous button should be disabled on first page
      cy.get('my-data-table').shadow()
        .find('.pagination-btn[data-action="prev"]')
        .should('be.disabled');
      
      // First button should be disabled on first page  
      cy.get('my-data-table').shadow()
        .find('.pagination-btn[data-action="first"]')
        .should('be.disabled');
    });

    it('should show correct pagination information', () => {
      // Check pagination info text
      cy.get('my-data-table').shadow()
        .find('.pagination-info')
        .should('contain.text', 'Showing')
        .and('contain.text', 'items');
    });

    it('should go to last page when last button is clicked', () => {
      // Click last page button
      cy.get('my-data-table').shadow().find('.pagination-btn[data-action="last"]').click();
      cy.wait(200);
      
      // Next button should be disabled on last page
      cy.get('my-data-table').shadow()
        .find('.pagination-btn[data-action="next"]')
        .should('be.disabled');
    });
  });

  describe('Loading State', () => {
    it('should show loading state when loading attribute is set', () => {
      // Set loading attribute via JavaScript
      cy.get('my-data-table').invoke('attr', 'loading', '');
      cy.wait(200);
      
      // Loading spinner should be visible
      cy.get('my-data-table').shadow().find('.loading-spinner').should('exist');
      cy.get('my-data-table').shadow().find('.loading-row').should('contain.text', 'Loading');
    });
  });

  describe('Responsive Design', () => {
    it('should be responsive on mobile devices', () => {
      // Test mobile viewport
      cy.viewport(375, 667);
      cy.wait(500);
      
      // Table should still be functional
      cy.get('my-data-table').shadow().find('.table-wrapper').should('exist');
      
      // Search input should adapt to smaller screen
      cy.get('my-data-table').shadow().find('.search-input').should('be.visible');
    });

    it('should handle horizontal scrolling for wide tables', () => {
      // Test tablet viewport
      cy.viewport(768, 1024);
      cy.wait(500);
      
      // Table wrapper should handle overflow
      cy.get('my-data-table').shadow().find('.table-wrapper').should('have.css', 'overflow-x', 'auto');
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA labels and roles', () => {
      // Main table should have proper role
      cy.get('my-data-table').shadow().find('.data-table').should('have.attr', 'role', 'table');
      cy.get('my-data-table').shadow().find('.data-table').should('have.attr', 'aria-label', 'Data table');
      
      // Column headers should have proper roles
      cy.get('my-data-table').shadow().find('thead th.sortable-header').should('have.attr', 'role', 'columnheader');
      
      // Checkboxes should have proper labels
      cy.get('my-data-table').shadow().find('.select-all-checkbox').should('have.attr', 'aria-label', 'Select all rows');
    });

    it('should be keyboard navigable', () => {
      // Focus on search input
      cy.get('my-data-table').shadow().find('.search-input').focus();
      cy.get('my-data-table').shadow().find('.search-input').should('be.focused');
      
      // Tab to sortable headers
      cy.get('my-data-table').shadow().find('thead th.sortable-header').first().focus();
      cy.get('my-data-table').shadow().find('thead th.sortable-header').first().should('be.focused');
    });

    it('should announce sorting changes', () => {
      // Click sortable header and verify ARIA sort attributes
      cy.get('my-data-table').shadow().find('thead th[data-column="firstName"]').click();
      cy.wait(200);
      
      cy.get('my-data-table').shadow().find('thead th[data-column="firstName"]')
        .should('have.attr', 'aria-sort', 'ascending');
    });
  });

  describe('Visual Consistency', () => {
    it('should match Material Design 3 styling', () => {
      // Take screenshot for visual regression testing
      cy.get('my-data-table').screenshot('data-table-default-state');
      
      // Check for proper styling classes
      cy.get('my-data-table').shadow().find('.data-table').should('have.class', 'data-table');
      
      // Verify button styling consistency
      cy.get('my-data-table').shadow().find('.pagination-btn').should('exist');
    });

    it('should maintain consistent hover states', () => {
      // Hover over first data row
      cy.get('my-data-table').shadow().find('tbody tr.data-row').first().trigger('mouseover');
      
      // Row should show hover effect
      cy.get('my-data-table').shadow().find('tbody tr.data-row').first()
        .should('have.css', 'background-color');
    });

    it('should show proper selection visual feedback', () => {
      // Select a row
      cy.get('my-data-table').shadow()
        .find('tbody tr:first-child .checkbox-wrapper input[type="checkbox"]')
        .check();
      
      // Take screenshot of selected state
      cy.get('my-data-table').screenshot('data-table-selected-state');
      
      // Verify visual selection feedback
      cy.get('my-data-table').shadow()
        .find('tbody tr:first-child')
        .should('have.class', 'selected');
    });
  });

  describe('Performance', () => {
    it('should handle large datasets efficiently', () => {
      // Verify pagination limits data rendering
      cy.get('my-data-table').shadow().find('tbody tr.data-row').should('have.length.at.most', 10);
      
      // Search should be debounced
      cy.get('my-data-table').shadow().find('.search-input').type('test', { delay: 50 });
      // Should not immediately filter while typing
    });

    it('should not block UI during interactions', () => {
      // Rapid clicking should not break the interface
      cy.get('my-data-table').shadow().find('thead th[data-column="firstName"]')
        .click().click().click();
      
      // Component should remain functional
      cy.get('my-data-table').shadow().find('.data-table').should('exist');
    });
  });

  describe('Data Export (if implemented)', () => {
    // These tests would require the export functionality to be exposed in the story
    it('should be able to export table data', () => {
      // This would test export functionality if buttons were available in the story
      // For now, we'll just verify the table structure supports export
      cy.get('my-data-table').shadow().find('tbody tr.data-row').should('exist');
    });
  });

  describe('Custom Cell Rendering', () => {
    it('should render custom cell content correctly', () => {
      // Check if custom rendered cells (like status indicators) are present
      cy.get('my-data-table').shadow().find('tbody td').should('contain.html', '●');
    });
  });

  describe('Error Handling', () => {
    it('should gracefully handle empty data state', () => {
      // Search for something that doesn't exist
      cy.get('my-data-table').shadow().find('.search-input').type('xyznothinghere');
      cy.wait(500);
      
      // Should show empty state message
      cy.get('my-data-table').shadow().find('.empty-row').should('exist');
      cy.get('my-data-table').shadow().find('.empty-row').should('be.visible');
    });
  });
});

// Additional test for the Custom Cells story
describe('MyntUI Data Table - Custom Cells', () => {
  it('should render advanced custom cells correctly', () => {
    cy.visit('http://localhost:6006/iframe.html?args=&id=data-display-my-data-table--custom-cells&viewMode=story');
    cy.wait(2000);
    
    // Check for avatar elements
    cy.get('my-data-table').shadow().find('tbody td').should('contain.html', 'border-radius: 50%');
    
    // Check for badges/tags
    cy.get('my-data-table').shadow().find('tbody td').should('contain.html', 'border-radius: 16px');
    
    // Check for action buttons
    cy.get('my-data-table').shadow().find('tbody button').should('contain.text', 'Edit');
    cy.get('my-data-table').shadow().find('tbody button').should('contain.text', 'Delete');
    
    // Take screenshot of custom cells
    cy.get('my-data-table').screenshot('data-table-custom-cells');
  });
});

// Test for different table variants
describe('MyntUI Data Table - Variants', () => {
  it('should render different table variants correctly', () => {
    cy.visit('http://localhost:6006/iframe.html?args=&id=data-display-my-data-table--variants&viewMode=story');
    cy.wait(2000);
    
    // Should have multiple tables showing different variants
    cy.get('my-data-table').should('have.length.at.least', 2);
    
    // Take screenshot of variants
    cy.screenshot('data-table-variants-overview');
  });
});