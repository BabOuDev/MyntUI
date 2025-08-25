describe('Button Component Visual Tests', () => {
  beforeEach(() => {
    cy.visit('/examples/test-button.html')
    // Wait for page load and components to render
    cy.get('my-button').should('exist')
    cy.wait(1000)
  })

  it('captures button variants and states', () => {
    // Take full page screenshot
    cy.takeFullPageScreenshot('button-component-overview')
    
    // Test individual sections
    cy.get('.demo-section').first().within(() => {
      cy.takeFullPageScreenshot('material-design-variants')
    })
    
    // Test hover states
    cy.get('my-button[variant="filled"]').first().trigger('mouseover')
    cy.wait(300) // Wait for hover animation
    cy.takeFullPageScreenshot('button-hover-state')
    
    // Test focus states
    cy.get('my-button[variant="outlined"]').first().then(($button) => {
      $button[0].focus()
    })
    cy.wait(300)
    cy.takeFullPageScreenshot('button-focus-state')
    
    // Test loading state
    cy.get('my-button[loading]').should('exist')
    cy.takeFullPageScreenshot('button-loading-state')
    
    // Test disabled state
    cy.get('my-button[disabled]').should('exist')
    cy.takeFullPageScreenshot('button-disabled-state')
  })

  it('tests ripple effect interaction', () => {
    // Click a button to trigger ripple
    cy.get('my-button[variant="filled"]').first().click()
    cy.wait(500) // Wait for ripple animation
    cy.takeFullPageScreenshot('button-ripple-effect')
  })

  it('tests density variants', () => {
    // Focus on density section
    cy.get('.demo-section').eq(2).scrollIntoView()
    cy.wait(500)
    cy.takeFullPageScreenshot('button-density-variants')
  })

  it('tests accessibility focus indicators', () => {
    // Test keyboard navigation - focus the first button
    cy.get('my-button').first().then(($button) => {
      // Trigger focus event programmatically
      $button[0].focus()
    })
    cy.wait(300)
    
    // Take screenshot of focus ring
    cy.takeFullPageScreenshot('button-accessibility-focus')
    
    // Test tab navigation using keyboard event
    cy.get('my-button').first().trigger('keydown', { key: 'Tab' })
    cy.wait(300)
    
    // Focus next button manually for visual test
    cy.get('my-button').eq(1).then(($button) => {
      $button[0].focus()
    })
    cy.wait(300)
    cy.takeFullPageScreenshot('button-tab-navigation')
  })
})