describe('Component Gallery Visual Tests', () => {
  beforeEach(() => {
    cy.visit('/index.html')
    cy.waitForComponents()
    cy.wait(1000) // Wait for all components and fonts to load
  })

  it('captures full component gallery', () => {
    // Take overview screenshot
    cy.takeFullPageScreenshot('component-gallery-overview')
  })

  it('captures individual component sections', () => {
    // Basic Components section
    cy.get('.demo-section').first().within(() => {
      cy.takeFullPageScreenshot('basic-components-section')
    })
    
    // Form Components section  
    cy.get('.demo-section').eq(1).scrollIntoView()
    cy.wait(500)
    cy.takeFullPageScreenshot('form-components-section')
    
    // Boolean Inputs section
    cy.get('.demo-section').eq(2).scrollIntoView()
    cy.wait(500)
    cy.takeFullPageScreenshot('boolean-components-section')
    
    // Interactive Components section
    cy.get('.demo-section').eq(3).scrollIntoView()
    cy.wait(500)
    cy.takeFullPageScreenshot('interactive-components-section')
  })

  it('tests component interactions', () => {
    // Test form inputs
    cy.get('my-input[name="firstName"]').type('John Doe')
    cy.get('my-input[name="email"]').type('john@example.com')
    cy.takeFullPageScreenshot('form-inputs-filled')
    
    // Test checkboxes and toggles
    cy.get('my-checkbox').first().click()
    cy.get('my-toggle').first().click()
    cy.takeFullPageScreenshot('boolean-inputs-activated')
    
    // Test tooltips
    cy.get('my-tooltip').first().trigger('mouseover')
    cy.wait(300)
    cy.takeFullPageScreenshot('tooltip-visible')
  })
})