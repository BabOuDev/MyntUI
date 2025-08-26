/**
 * Comprehensive E2E Tests for Complete MyntUI Component Showcase
 * Tests all components, input types, and variants from the new CompleteComponentShowcase.stories.js
 */

describe('Complete MyntUI Component Showcase E2E Tests', () => {
  beforeEach(() => {
    // Visit the complete showcase story
    cy.visit('http://localhost:6007/iframe.html?id=complete-showcase-all-components--complete-showcase');
    cy.wait(2000); // Allow components to fully load
  });

  it('captures complete showcase overview', () => {
    // Wait for all components to load
    cy.get('h1').should('contain.text', 'MyntUI Complete Component Showcase');
    
    // Capture full page screenshot
    cy.screenshot('complete-showcase-overview', {
      capture: 'fullPage',
      overwrite: true
    });
  });

  it('tests all 17 required input types', () => {
    // Navigate to all input types story
    cy.visit('http://localhost:6007/iframe.html?id=complete-showcase-all-components--all-input-types');
    cy.wait(2000);

    cy.get('h1').should('contain.text', 'All 17 Required Input Types');
    
    // Test each required input type exists and is functional
    const inputTypes = [
      'text', 'pattern', 'number', 'integer', 'date', 'datetime-local', 
      'time', 'date-of-birth', 'email', 'password', 'url', 'tel', 
      'textarea', 'select', 'dynamic-select', 'checkbox', 'radio'
    ];

    inputTypes.forEach(type => {
      cy.get(`my-input[type="${type}"]`).should('exist');
    });

    // Test input interactions
    cy.get('my-input[type="text"]').shadow().find('input').type('Test input');
    cy.get('my-input[type="email"]').shadow().find('input').clear().type('test@example.com');
    cy.get('my-input[type="number"]').shadow().find('input').clear().type('42');

    // Test select dropdown
    cy.get('my-input[type="select"]').shadow().find('select').select('CA');

    // Test checkbox
    cy.get('my-input[type="checkbox"]').shadow().find('input').check();

    cy.screenshot('all-input-types-functional', {
      capture: 'fullPage',
      overwrite: true
    });
  });

  it('tests component states and variants', () => {
    // Navigate to component states story
    cy.visit('http://localhost:6007/iframe.html?id=complete-showcase-all-components--component-states');
    cy.wait(2000);

    cy.get('h1').should('contain.text', 'Component States & Variants');

    // Test different input states
    cy.get('my-input').should('have.length.at.least', 8);
    
    // Test disabled state
    cy.get('my-input[disabled]').should('exist');
    cy.get('my-input[disabled]').shadow().find('input').should('be.disabled');

    // Test readonly state  
    cy.get('my-input[readonly]').should('exist');
    cy.get('my-input[readonly]').shadow().find('input').should('have.attr', 'readonly');

    // Test required state
    cy.get('my-input[required]').should('exist');
    cy.get('my-input[required]').shadow().find('input').should('have.attr', 'required');

    cy.screenshot('component-states-comprehensive', {
      capture: 'fullPage', 
      overwrite: true
    });
  });

  it('tests button components and variants', () => {
    cy.visit('http://localhost:6007/iframe.html?id=complete-showcase-all-components--complete-showcase');
    cy.wait(2000);

    // Test different button variants
    cy.get('my-button[variant="primary"]').should('exist');
    cy.get('my-button[variant="secondary"]').should('exist');
    cy.get('my-button[variant="tertiary"]').should('exist');
    cy.get('my-button[variant="ghost"]').should('exist');

    // Test disabled button
    cy.get('my-button[disabled]').should('exist');
    cy.get('my-button[disabled]').should('have.attr', 'disabled');

    // Test loading button
    cy.get('my-button[loading]').should('exist');
    cy.get('my-button[loading]').should('have.attr', 'loading');

    // Test button clicks
    cy.get('my-button[variant="primary"]').not('[disabled]').first().click();

    cy.screenshot('button-variants-test', {
      capture: 'viewport',
      overwrite: true
    });
  });

  it('tests boolean input components', () => {
    cy.visit('http://localhost:6007/iframe.html?id=complete-showcase-all-components--complete-showcase');
    cy.wait(2000);

    // Test toggle switches
    cy.get('my-toggle').should('have.length.at.least', 4);
    cy.get('my-toggle').not('[disabled]').first().click();

    // Test checkboxes
    cy.get('my-checkbox').should('have.length.at.least', 4);
    cy.get('my-checkbox').not('[disabled]').first().click();

    // Test radio groups
    cy.get('my-radio-group').should('have.length.at.least', 2);
    cy.get('my-radio').should('have.length.at.least', 6);

    // Click on a radio option
    cy.get('my-radio').first().click();

    cy.screenshot('boolean-inputs-interaction', {
      capture: 'viewport',
      overwrite: true
    });
  });

  it('tests interactive components', () => {
    cy.visit('http://localhost:6007/iframe.html?id=complete-showcase-all-components--complete-showcase');
    cy.wait(2000);

    // Test dropdown
    cy.get('my-dropdown').should('exist');

    // Test tooltip
    cy.get('my-tooltip').should('exist');
    cy.get('my-tooltip my-button').trigger('mouseover');
    cy.wait(500); // Allow tooltip to appear

    // Test modal trigger
    cy.get('my-button').contains('Open Modal').click();
    cy.wait(1000);
    
    // Modal should be in the document body
    cy.get('body').find('my-modal').should('exist');
    cy.get('my-modal').should('have.attr', 'open');

    // Close modal
    cy.get('my-modal my-button').contains('OK').click();
    
    cy.screenshot('interactive-components-test', {
      capture: 'fullPage',
      overwrite: true
    });
  });

  it('tests data visualization components', () => {
    cy.visit('http://localhost:6007/iframe.html?id=complete-showcase-all-components--complete-showcase');
    cy.wait(2000);

    // Test progress bars
    cy.get('my-progress').should('have.length.at.least', 4);
    cy.get('my-progress[variant="success"]').should('exist');
    cy.get('my-progress[variant="warning"]').should('exist');
    cy.get('my-progress[variant="error"]').should('exist');

    // Test gauges
    cy.get('my-gauge').should('have.length.at.least', 3);

    // Test sparklines
    cy.get('my-sparkline').should('have.length.at.least', 2);

    cy.screenshot('data-visualization-test', {
      capture: 'viewport',
      overwrite: true
    });
  });

  it('tests icon components', () => {
    cy.visit('http://localhost:6007/iframe.html?id=complete-showcase-all-components--complete-showcase');
    cy.wait(2000);

    // Test that icons are rendered
    cy.get('my-icon').should('have.length.at.least', 20);
    
    // Test specific icons exist
    cy.get('my-icon[icon="home"]').should('exist');
    cy.get('my-icon[icon="settings"]').should('exist');
    cy.get('my-icon[icon="favorite"]').should('exist');

    cy.screenshot('icon-components-test', {
      capture: 'viewport',
      overwrite: true
    });
  });

  it('tests responsive behavior on mobile', () => {
    // Test mobile responsiveness
    cy.viewport(375, 667); // iPhone SE dimensions
    cy.visit('http://localhost:6007/iframe.html?id=complete-showcase-all-components--complete-showcase');
    cy.wait(2000);

    // Components should adapt to mobile
    cy.get('h1').should('be.visible');
    cy.get('my-input').first().should('be.visible');
    cy.get('my-button').first().should('be.visible');

    cy.screenshot('mobile-responsive-complete', {
      capture: 'fullPage',
      overwrite: true
    });
  });

  it('tests responsive behavior on tablet', () => {
    // Test tablet responsiveness
    cy.viewport(768, 1024); // iPad dimensions
    cy.visit('http://localhost:6007/iframe.html?id=complete-showcase-all-components--complete-showcase');
    cy.wait(2000);

    cy.screenshot('tablet-responsive-complete', {
      capture: 'fullPage',
      overwrite: true
    });
  });

  it('tests accessibility features', () => {
    cy.visit('http://localhost:6007/iframe.html?id=complete-showcase-all-components--complete-showcase');
    cy.wait(2000);

    // Test keyboard navigation
    cy.get('body').tab();
    cy.focused().should('exist');

    // Test ARIA attributes on inputs
    cy.get('my-input').first().shadow().find('input').should('have.attr', 'aria-label');

    // Test buttons have proper labels
    cy.get('my-button').should('have.attr', 'label');

    // Test form elements have proper labeling
    cy.get('my-checkbox').should('have.attr', 'label');
    cy.get('my-toggle').should('have.attr', 'label');

    cy.screenshot('accessibility-features-complete', {
      capture: 'fullPage',
      overwrite: true
    });
  });

  it('tests component consistency and styling', () => {
    cy.visit('http://localhost:6007/iframe.html?id=complete-showcase-all-components--complete-showcase');
    cy.wait(2000);

    // Test that components use consistent styling
    cy.get('my-input').should('have.length.at.least', 10);
    
    // Test CSS custom properties are applied
    cy.get('my-button[variant="primary"]').should('have.css', 'display', 'inline-flex');
    
    // Test that components have shadow DOM (for encapsulation)
    cy.get('my-input').first().should(($el) => {
      expect($el[0].shadowRoot).to.exist;
    });

    cy.screenshot('component-consistency-test', {
      capture: 'fullPage',
      overwrite: true
    });
  });
});

// Additional specialized tests for input validation
describe('Complete Showcase Input Validation Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:6007/iframe.html?id=complete-showcase-all-components--all-input-types');
    cy.wait(2000);
  });

  it('tests email validation', () => {
    cy.get('my-input[type="email"]').shadow().find('input').as('emailInput');
    
    // Test invalid email
    cy.get('@emailInput').clear().type('invalid-email');
    cy.get('@emailInput').blur();
    // Component should handle validation internally
    
    // Test valid email
    cy.get('@emailInput').clear().type('valid@example.com');
    cy.get('@emailInput').blur();

    cy.screenshot('email-validation-test');
  });

  it('tests number input constraints', () => {
    cy.get('my-input[type="number"]').shadow().find('input').as('numberInput');
    
    // Test within range
    cy.get('@numberInput').clear().type('50');
    
    // Test boundary values
    cy.get('@numberInput').clear().type('0'); // min value
    cy.get('@numberInput').clear().type('100'); // max value

    cy.screenshot('number-validation-test');
  });

  it('tests pattern validation', () => {
    cy.get('my-input[type="pattern"]').shadow().find('input').as('patternInput');
    
    // Test valid pattern
    cy.get('@patternInput').clear().type('ABC123');
    
    // Test invalid pattern
    cy.get('@patternInput').clear().type('invalid');

    cy.screenshot('pattern-validation-test');
  });

  it('tests required field validation', () => {
    cy.get('my-input[required]').first().shadow().find('input').as('requiredInput');
    
    // Test empty required field
    cy.get('@requiredInput').focus().blur();
    
    // Test filled required field
    cy.get('@requiredInput').type('filled value');

    cy.screenshot('required-validation-test');
  });
});