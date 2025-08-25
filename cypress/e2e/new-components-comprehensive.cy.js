/**
 * Comprehensive tests for new MyntUI components:
 * - my-sparkline
 * - my-drawer  
 * - my-data-list
 */

describe('MyntUI New Components - Comprehensive Tests', () => {
  beforeEach(() => {
    cy.visit('/examples/index.html');
    cy.wait(1000); // Allow components to load
  });

  describe('Sparkline Components', () => {
    it('should display sparklines with correct data visualization', () => {
      cy.get('my-sparkline').should('have.length.at.least', 3);
      
      // Test different variants
      cy.get('my-sparkline[variant="success"]').should('be.visible');
      cy.get('my-sparkline[variant="info"]').should('be.visible');
      cy.get('my-sparkline[variant="warning"]').should('be.visible');
      
      // Check SVG rendering
      cy.get('my-sparkline').first().within(() => {
        cy.get('svg').should('be.visible');
        cy.get('path.sparkline-path').should('be.visible');
      });
      
      // Take screenshot of sparklines
      cy.get('[data-label="Sparklines - Trend Visualization"]').parent()
        .screenshot('sparklines-data-visualization', { 
          capture: 'viewport',
          overwrite: true 
        });
    });

    it('should handle different sparkline features', () => {
      // Test filled sparkline
      cy.get('my-sparkline[fill]').should('exist');
      
      // Test sparkline with dots
      cy.get('my-sparkline[dots]').should('exist');
      
      // Test smooth curves
      cy.get('my-sparkline[smooth]').should('exist');
      
      // Test animated sparklines
      cy.get('my-sparkline[animated]').should('exist');
    });

    it('should be responsive across different screen sizes', () => {
      // Test mobile view
      cy.viewport(375, 667);
      cy.wait(500);
      cy.get('my-sparkline').should('be.visible');
      
      // Test tablet view
      cy.viewport(768, 1024);
      cy.wait(500);
      cy.get('my-sparkline').should('be.visible');
      
      // Test desktop view
      cy.viewport(1280, 720);
      cy.wait(500);
      cy.get('my-sparkline').should('be.visible');
    });
  });

  describe('Drawer Components', () => {
    it('should open and close drawers from different positions', () => {
      // Test left drawer
      cy.contains('Left Navigation').click();
      cy.get('#leftDrawer').should('have.attr', 'open');
      
      // Check drawer content
      cy.get('#leftDrawer').within(() => {
        cy.contains('Navigation Menu').should('be.visible');
        cy.contains('Dashboard').should('be.visible');
        cy.contains('Users').should('be.visible');
        cy.contains('Analytics').should('be.visible');
      });
      
      // Close drawer
      cy.get('#leftDrawer').within(() => {
        cy.contains('Close Menu').click();
      });
      cy.get('#leftDrawer').should('not.have.attr', 'open');
      
      // Take screenshot
      cy.contains('Left Navigation').click();
      cy.wait(500);
      cy.screenshot('drawer-left-navigation', { 
        capture: 'viewport',
        overwrite: true 
      });
      cy.get('#leftDrawer').within(() => {
        cy.contains('Close Menu').click();
      });
    });

    it('should test right drawer with settings', () => {
      // Test right drawer
      cy.contains('Right Settings').click();
      cy.get('#rightDrawer').should('have.attr', 'open');
      
      // Check settings content
      cy.get('#rightDrawer').within(() => {
        cy.contains('Settings Panel').should('be.visible');
        cy.contains('Dark Mode').should('be.visible');
        cy.contains('Email notifications').should('be.visible');
        cy.get('my-dropdown').should('be.visible');
      });
      
      // Test interactions
      cy.get('#rightDrawer').within(() => {
        cy.get('my-toggle').first().click(); // Toggle dark mode
        cy.get('my-checkbox').first().should('be.checked');
      });
      
      // Close drawer
      cy.get('#rightDrawer').within(() => {
        cy.contains('Cancel').click();
      });
      cy.get('#rightDrawer').should('not.have.attr', 'open');
    });

    it('should test bottom and top drawers', () => {
      // Test bottom drawer
      cy.contains('Bottom Actions').click();
      cy.get('#bottomDrawer').should('have.attr', 'open');
      
      cy.get('#bottomDrawer').within(() => {
        cy.contains('Quick Actions').should('be.visible');
        cy.contains('Export Data').should('be.visible');
        cy.contains('Import Data').should('be.visible');
      });
      
      // Test quick action
      cy.get('#bottomDrawer').within(() => {
        cy.contains('Export Data').click();
      });
      
      // Should close and show notification
      cy.get('#bottomDrawer').should('not.have.attr', 'open');
      cy.get('my-notification').should('be.visible');
      
      // Test top drawer
      cy.contains('Top Notifications').click();
      cy.get('#topDrawer').should('have.attr', 'open');
      
      cy.get('#topDrawer').within(() => {
        cy.contains('System Notifications').should('be.visible');
        cy.contains('System Update').should('be.visible');
        cy.contains('Maintenance').should('be.visible');
      });
      
      cy.get('#topDrawer').within(() => {
        cy.contains('Dismiss All').click();
      });
    });

    it('should test special drawer features', () => {
      // Test swipeable drawer
      cy.contains('Swipeable Drawer').click();
      cy.get('#swipeableDrawer').should('have.attr', 'open');
      
      cy.get('#swipeableDrawer').within(() => {
        cy.contains('Swipeable Menu').should('be.visible');
        cy.contains('Try swiping left to close!').should('be.visible');
        cy.contains('Touch Gestures:').should('be.visible');
      });
      
      // Close by clicking backdrop
      cy.get('body').click(50, 50); // Click outside drawer
      cy.get('#swipeableDrawer').should('not.have.attr', 'open');
      
      // Test large drawer
      cy.contains('Large Drawer').click();
      cy.get('#largeDrawer').should('have.attr', 'open');
      
      cy.get('#largeDrawer').within(() => {
        cy.contains('Large Content Panel').should('be.visible');
        cy.get('my-input[label="Full Name"]').should('be.visible');
        cy.get('my-radio-group').should('be.visible');
      });
      
      cy.get('#largeDrawer').within(() => {
        cy.contains('Cancel').click();
      });
      
      // Test persistent drawer
      cy.contains('Persistent Drawer').click();
      cy.get('#persistentDrawer').should('have.attr', 'open');
      
      cy.get('#persistentDrawer').within(() => {
        cy.contains('Persistent Menu').should('be.visible');
        cy.contains('No backdrop, won\'t close automatically').should('be.visible');
      });
      
      // Should stay open when clicking outside (no backdrop)
      cy.get('body').click(400, 400);
      cy.get('#persistentDrawer').should('have.attr', 'open');
      
      // Close manually
      cy.get('#persistentDrawer').within(() => {
        cy.contains('Close').click();
      });
    });

    it('should test drawer keyboard navigation', () => {
      // Open drawer with keyboard
      cy.contains('Left Navigation').focus();
      cy.contains('Left Navigation').type('{enter}');
      cy.get('#leftDrawer').should('have.attr', 'open');
      
      // Test Escape key
      cy.get('body').type('{esc}');
      cy.get('#leftDrawer').should('not.have.attr', 'open');
    });
  });

  describe('Data List Components', () => {
    it('should display and interact with basic data list', () => {
      // Check if data list is visible
      cy.get('#basic-data-list').should('be.visible');
      
      // Check initial data
      cy.get('#basic-data-list').within(() => {
        cy.get('.list-item').should('have.length.at.least', 1);
        cy.contains('Alice Johnson').should('be.visible');
        cy.contains('alice@example.com').should('be.visible');
      });
      
      // Test search functionality
      cy.get('#basic-data-list').within(() => {
        cy.get('input[placeholder*="Search"]').type('bob');
        cy.wait(800); // Wait for debounced search
        cy.contains('Bob Smith').should('be.visible');
        cy.contains('Alice Johnson').should('not.exist');
        
        // Clear search
        cy.get('input[placeholder*="Search"]').clear();
        cy.wait(800);
      });
      
      // Test pagination
      cy.get('#basic-data-list').within(() => {
        cy.get('.next-btn').should('be.visible');
        cy.get('.prev-btn').should('be.disabled');
        cy.get('.page-info').should('contain', 'of');
      });
      
      // Take screenshot
      cy.get('#basic-data-list').screenshot('basic-data-list-functionality', { 
        capture: 'viewport',
        overwrite: true 
      });
    });

    it('should test advanced data list features', () => {
      // Check advanced data list
      cy.get('#advanced-data-list').should('be.visible');
      
      cy.get('#advanced-data-list').within(() => {
        // Check header slot
        cy.contains('Product Catalog').should('be.visible');
        cy.contains('Export').should('be.visible');
        cy.contains('Add New').should('be.visible');
        
        // Check initial data
        cy.get('.list-item').should('have.length.at.least', 1);
        cy.contains('Wireless Headphones').should('be.visible');
      });
      
      // Test search in advanced list
      cy.get('#advanced-data-list').within(() => {
        cy.get('input').type('keyboard');
        cy.wait(500); // Wait for debounced search
        cy.contains('Mechanical Keyboard').should('be.visible');
        cy.contains('Wireless Headphones').should('not.exist');
        
        // Clear search
        cy.get('input').clear();
        cy.wait(500);
      });
      
      // Test infinite scroll (load more)
      cy.get('#advanced-data-list').within(() => {
        cy.get('.list-container').scrollTo('bottom');
        cy.wait(500);
        
        // Should load more items or show load more button
        cy.get('.load-more-btn').should('be.visible');
      });
    });

    it('should handle loading states and empty states', () => {
      // Test search that returns no results
      cy.get('#basic-data-list').within(() => {
        cy.get('input[placeholder*="Search"]').type('nonexistent');
        cy.wait(1000); // Wait for search and loading
        
        // Should show empty state or no results
        cy.get('.list-item').should('have.length', 0);
      });
      
      // Clear search to restore data
      cy.get('#basic-data-list').within(() => {
        cy.get('input[placeholder*="Search"]').clear();
        cy.wait(800);
      });
    });

    it('should test data list responsiveness', () => {
      // Test mobile view
      cy.viewport(375, 667);
      cy.wait(500);
      
      cy.get('#basic-data-list').should('be.visible');
      cy.get('#advanced-data-list').should('be.visible');
      
      // Check that search inputs are still accessible
      cy.get('#basic-data-list').within(() => {
        cy.get('input').should('be.visible');
      });
      
      // Test tablet view
      cy.viewport(768, 1024);
      cy.wait(500);
      
      cy.get('#basic-data-list').should('be.visible');
      cy.get('#advanced-data-list').should('be.visible');
      
      // Restore desktop view
      cy.viewport(1280, 720);
    });

    it('should test keyboard navigation in data lists', () => {
      // Focus on data list and test arrow navigation
      cy.get('#basic-data-list').focus();
      
      // Test arrow key navigation
      cy.get('#basic-data-list').type('{downArrow}');
      cy.get('#basic-data-list').within(() => {
        cy.get('.list-item.focused').should('exist');
      });
      
      cy.get('#basic-data-list').type('{downArrow}');
      cy.get('#basic-data-list').type('{upArrow}');
      
      // Test search input focus
      cy.get('#basic-data-list').within(() => {
        cy.get('input').focus();
        cy.get('input').type('test');
        cy.wait(500);
        cy.get('input').clear();
      });
    });
  });

  describe('Component Integration Tests', () => {
    it('should test components working together', () => {
      // Open drawer and interact with components inside
      cy.contains('Right Settings').click();
      cy.get('#rightDrawer').should('have.attr', 'open');
      
      // Interact with components inside drawer
      cy.get('#rightDrawer').within(() => {
        cy.get('my-toggle').first().click();
        cy.get('my-checkbox').first().click();
        cy.get('my-dropdown').click();
      });
      
      // Save settings (should close drawer and show notification)
      cy.get('#rightDrawer').within(() => {
        cy.contains('Save Settings').click();
      });
      
      cy.get('#rightDrawer').should('not.have.attr', 'open');
      cy.get('my-notification').should('be.visible');
      cy.wait(1000);
    });

    it('should test multiple overlays interaction', () => {
      // Open a drawer
      cy.contains('Left Navigation').click();
      cy.get('#leftDrawer').should('have.attr', 'open');
      
      // Open a modal from examples
      cy.contains('Open Small Modal').click();
      cy.get('#smallModal').should('have.attr', 'open');
      
      // Modal should be above drawer (higher z-index)
      cy.get('#smallModal').should('be.visible');
      cy.get('#leftDrawer').should('be.visible');
      
      // Close modal
      cy.get('#smallModal').within(() => {
        cy.contains('Close').click();
      });
      
      // Close drawer
      cy.get('#leftDrawer').within(() => {
        cy.contains('Close Menu').click();
      });
    });
  });

  describe('Accessibility Tests', () => {
    it('should test ARIA labels and keyboard accessibility', () => {
      // Test sparkline accessibility
      cy.get('my-sparkline').first().should('have.attr', 'aria-label');
      
      // Test drawer accessibility
      cy.contains('Left Navigation').click();
      cy.get('#leftDrawer').within(() => {
        cy.get('[role="dialog"]').should('exist');
        cy.get('[aria-modal]').should('exist');
      });
      
      // Test data list accessibility
      cy.get('#basic-data-list').within(() => {
        cy.get('[role="list"]').should('exist');
        cy.get('[role="listitem"]').should('exist');
      });
      
      // Close drawer
      cy.get('#leftDrawer').within(() => {
        cy.contains('Close Menu').click();
      });
    });

    it('should test focus management', () => {
      // Test drawer focus trapping
      cy.contains('Left Navigation').click();
      cy.get('#leftDrawer').should('have.attr', 'open');
      
      // Focus should be trapped within drawer
      cy.get('#leftDrawer').within(() => {
        cy.get('a').first().focus();
        cy.get('a').first().should('be.focused');
      });
      
      cy.get('body').type('{esc}');
      cy.get('#leftDrawer').should('not.have.attr', 'open');
    });
  });

  describe('Visual Regression Tests', () => {
    it('should capture comprehensive component screenshots', () => {
      // Capture overview with new components
      cy.screenshot('new-components-overview', { 
        capture: 'fullPage',
        overwrite: true 
      });
      
      // Capture sparklines section
      cy.get('.demo-item').contains('Sparklines').parent()
        .screenshot('sparklines-comprehensive', { 
          overwrite: true 
        });
      
      // Capture drawer examples
      cy.get('.demo-item').contains('Drawers').parent()
        .screenshot('drawers-controls', { 
          overwrite: true 
        });
      
      // Capture data list examples
      cy.get('.demo-item').contains('Data List').parent()
        .screenshot('data-lists-comprehensive', { 
          overwrite: true 
        });
    });
  });
});

describe('Performance Tests', () => {
  it('should load new components efficiently', () => {
    cy.visit('/examples/index.html');
    
    // Check that all components load without errors
    cy.get('my-sparkline').should('have.length.at.least', 3);
    cy.get('my-drawer').should('have.length.at.least', 6);
    cy.get('my-data-list').should('have.length.at.least', 2);
    
    // Check that components render within reasonable time
    cy.wait(1000);
    cy.get('my-sparkline svg').should('be.visible');
    cy.get('my-data-list .list-item').should('be.visible');
  });
});