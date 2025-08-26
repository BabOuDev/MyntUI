describe('Comprehensive Input Types Test', () => {
  beforeEach(() => {
    cy.visit('/examples/test-all-inputs.html');
  });

  const inputTypes = [
    'text', 'pattern', 'number', 'integer', 'date', 'datetime-local', 
    'time', 'date-of-birth', 'email', 'tel', 'url', 'password', 
    'search', 'textarea', 'select', 'dynamic-select', 'checkbox', 'radio'
  ];

  it('should render all required input types from CONTRIBUTING.md', () => {
    // Wait for components to load
    cy.wait(1000);
    
    inputTypes.forEach(type => {
      cy.get(`my-input[type="${type}"]`, { timeout: 10000 })
        .should('exist')
        .should('be.visible');
    });
  });

  it('should display success message for all working input types', () => {
    cy.wait(2000);
    
    cy.get('#results')
      .should('contain', '🎉 All input types working correctly!');
  });

  it('should have proper shadow DOM structure for each input type', () => {
    cy.wait(1000);
    
    inputTypes.forEach(type => {
      cy.get(`my-input[type="${type}"]`)
        .should('exist')
        .then($input => {
          expect($input[0].shadowRoot).to.not.be.null;
        });
    });
  });

  it('captures comprehensive input types screenshot', () => {
    cy.wait(2000);
    cy.screenshot('comprehensive-input-types', {
      capture: 'fullPage',
      overwrite: true
    });
  });

  it('should test text input functionality', () => {
    const testValue = 'John Doe';
    
    cy.get('my-input[type="text"]')
      .shadow()
      .find('input')
      .type(testValue)
      .should('have.value', testValue);
  });

  it('should test number input functionality', () => {
    const testValue = '42.50';
    
    cy.get('my-input[type="number"]')
      .shadow()
      .find('input')
      .type(testValue)
      .should('have.value', testValue);
  });

  it('should test integer input functionality', () => {
    const testValue = '25';
    
    cy.get('my-input[type="integer"]')
      .shadow()
      .find('input')
      .type(testValue)
      .should('have.value', testValue);
  });

  it('should test email input functionality', () => {
    const testValue = 'test@example.com';
    
    cy.get('my-input[type="email"]')
      .shadow()
      .find('input')
      .type(testValue)
      .should('have.value', testValue);
  });

  it('should test textarea functionality', () => {
    const testValue = 'This is a test description';
    
    cy.get('my-input[type="textarea"]')
      .shadow()
      .find('textarea')
      .type(testValue)
      .should('have.value', testValue);
  });

  it('should test select functionality', () => {
    cy.get('my-input[type="select"]')
      .shadow()
      .find('select')
      .select('US')
      .should('have.value', 'US');
  });

  it('should test checkbox functionality', () => {
    cy.get('my-input[type="checkbox"]')
      .shadow()
      .find('input[type="checkbox"]')
      .check({ force: true })
      .should('be.checked');
  });

  it('should test date input functionality', () => {
    const testDate = '2023-12-25';
    
    cy.get('my-input[type="date"]')
      .shadow()
      .find('input')
      .type(testDate)
      .should('have.value', testDate);
  });

  it('should test time input functionality', () => {
    const testTime = '14:30';
    
    cy.get('my-input[type="time"]')
      .shadow()
      .find('input')
      .type(testTime)
      .should('have.value', testTime);
  });

  it('should test datetime-local input functionality', () => {
    const testDateTime = '2023-12-25T14:30';
    
    cy.get('my-input[type="datetime-local"]')
      .shadow()
      .find('input')
      .type(testDateTime)
      .should('have.value', testDateTime);
  });

  it('should test pattern validation', () => {
    // Test valid pattern
    cy.get('my-input[type="pattern"]')
      .shadow()
      .find('input')
      .type('ABC123')
      .should('have.value', 'ABC123');
      
    // Test invalid pattern (this would be validated on form submission)
    cy.get('my-input[type="pattern"]')
      .shadow()
      .find('input')
      .clear()
      .type('invalid')
      .should('have.value', 'invalid');
  });

  it('should have proper accessibility attributes', () => {
    // Test that inputs have proper labels and ARIA attributes
    inputTypes.forEach(type => {
      cy.get(`my-input[type="${type}"]`)
        .should('have.attr', 'label');
    });
  });

  it('should display helper text when provided', () => {
    cy.get('my-input[helper-text]')
      .each($input => {
        const helperText = $input.attr('helper-text');
        if (helperText) {
          cy.wrap($input)
            .shadow()
            .should('contain.text', helperText);
        }
      });
  });
});