describe('MyntUI Component Gallery Tests', () => {
  beforeEach(() => {
    cy.visit('/examples/index.html')
    // Wait for all components to be loaded and rendered
    cy.get('my-button').should('exist')
    cy.get('my-icon').should('exist')
    cy.wait(1000) // Allow time for all components to render
  })

  it('captures full component gallery overview', () => {
    // Take full page screenshot to see all components
    cy.takeFullPageScreenshot('component-gallery-overview')
  })

  it('tests basic components section', () => {
    cy.get('.demo-section').first().within(() => {
      // Test icons are rendered
      cy.get('my-icon').should('have.length.at.least', 5)
      
      // Test buttons are rendered
      cy.get('my-button').should('have.length.at.least', 10)
      
      // Test button interactions
      cy.get('my-button[variant="filled"]').first().click()
      cy.wait(300)
      
      cy.takeFullPageScreenshot('basic-components-section')
    })
  })

  it('tests form components section', () => {
    cy.get('.demo-section').eq(1).scrollIntoView().within(() => {
      // Test inputs are rendered
      cy.get('my-input').should('have.length.at.least', 8)
      
      // Test input interactions - using shadowRoot to access inputs
      cy.get('my-input[name="firstName"]').then(($input) => {
        const shadowRoot = $input[0].shadowRoot
        const input = shadowRoot.querySelector('input')
        if (input) {
          cy.wrap(input).type('Test User')
        }
      })
      cy.wait(300)
      
      cy.takeFullPageScreenshot('form-components-section')
    })
  })

  it('tests boolean input components section', () => {
    cy.get('.demo-section').eq(2).scrollIntoView().within(() => {
      // Test toggles
      cy.get('my-toggle').should('have.length.at.least', 3)
      cy.get('my-toggle').first().click()
      cy.wait(300)
      
      // Test checkboxes
      cy.get('my-checkbox').should('have.length.at.least', 4)
      cy.get('my-checkbox').first().click()
      cy.wait(300)
      
      // Test radio groups
      cy.get('my-radio-group').should('have.length.at.least', 2)
      cy.get('my-radio[value="medium"]').first().click()
      cy.wait(300)
      
      cy.takeFullPageScreenshot('boolean-inputs-section')
    })
  })

  it('tests interactive components section', () => {
    cy.get('.demo-section').eq(3).scrollIntoView().within(() => {
      // Test tooltips - hover to show
      cy.get('my-tooltip').first().trigger('mouseover')
      cy.wait(600) // Wait for tooltip delay
      
      // Test dropdown interactions
      cy.get('my-dropdown').should('have.length.at.least', 3)
      cy.get('my-dropdown').first().click()
      cy.wait(300)
      
      cy.takeFullPageScreenshot('interactive-components-section')
    })
  })

  it('tests data visualization components section', () => {
    cy.get('.demo-section').eq(4).scrollIntoView().within(() => {
      // Test progress bars
      cy.get('my-progress').should('have.length.at.least', 8)
      
      // Test gauges
      cy.get('my-gauge').should('have.length.at.least', 6)
      
      // Test interactive gauge slider
      cy.get('#gaugeSlider').should('exist')
      cy.get('#gaugeSlider').invoke('val', 75).trigger('input')
      cy.wait(800) // Wait for animation
      
      cy.takeFullPageScreenshot('data-visualization-section')
    })
  })

  it('tests component responsiveness', () => {
    // Test mobile viewport
    cy.viewport(375, 667)
    cy.wait(500)
    cy.takeFullPageScreenshot('mobile-responsive-view')
    
    // Test tablet viewport
    cy.viewport(768, 1024)
    cy.wait(500)
    cy.takeFullPageScreenshot('tablet-responsive-view')
    
    // Test desktop viewport
    cy.viewport(1280, 800)
    cy.wait(500)
    cy.takeFullPageScreenshot('desktop-responsive-view')
  })

  it('tests component interactions and animations', () => {
    // Test progress bar animations
    cy.get('my-progress[indeterminate]').should('exist')
    
    // Test gauge animations
    cy.get('my-gauge[animated]').should('exist')
    
    // Test button hover states
    cy.get('my-button[variant="filled"]').first().trigger('mouseover')
    cy.wait(300)
    
    // Test dropdown open/close
    cy.get('my-dropdown').first().click()
    cy.wait(300)
    cy.get('body').click() // Click outside to close
    cy.wait(300)
    
    cy.takeFullPageScreenshot('component-interactions-test')
  })

  it('tests accessibility features', () => {
    // Test focus indicators
    cy.get('my-button').first().focus()
    cy.wait(200)
    cy.takeFullPageScreenshot('accessibility-focus-indicators')
  })

  it('tests component states', () => {
    // Test disabled states
    cy.get('my-button[disabled]').should('exist')
    cy.get('my-toggle[disabled]').should('exist')
    cy.get('my-dropdown[disabled]').should('exist')
    
    // Test loading states
    cy.get('my-button[loading]').should('exist')
    cy.get('my-progress[indeterminate]').should('exist')
    
    cy.takeFullPageScreenshot('component-states-test')
  })
})

// Custom command to take full page screenshots (if not already defined)
Cypress.Commands.add('takeFullPageScreenshot', (name) => {
  cy.screenshot(name, { 
    capture: 'fullPage',
    overwrite: true 
  })
})