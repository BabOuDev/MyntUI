describe('MyntUI Enhanced Components Tests', () => {
  beforeEach(() => {
    // Visit Storybook instead of the examples page to test our new stories
    cy.visit('http://localhost:6007')
    cy.wait(2000) // Allow Storybook to load
  })

  it('tests new tooltip component stories', () => {
    // Navigate to tooltip stories
    cy.get('[data-item-id="components-my-tooltip"]').click()
    cy.wait(1000)
    
    // Test default tooltip story
    cy.get('iframe[id="storybook-preview-iframe"]').then($iframe => {
      const doc = $iframe[0].contentDocument
      const $body = Cypress.$(doc.body)
      
      // Find and interact with tooltip trigger
      const button = $body.find('my-button').first()
      if (button.length > 0) {
        cy.wrap(button[0]).trigger('mouseenter')
        cy.wait(600) // Wait for tooltip to appear
        
        // Take screenshot of tooltip interaction
        cy.screenshot('tooltip-hover-interaction', {
          capture: 'viewport'
        })
        
        cy.wrap(button[0]).trigger('mouseleave')
        cy.wait(300)
      }
    })
    
    // Test different tooltip variants
    cy.get('[data-item-id="components-my-tooltip--variants"]').click()
    cy.wait(1000)
    cy.screenshot('tooltip-variants', {
      capture: 'viewport'
    })
  })

  it('tests new notification component stories', () => {
    // Navigate to notification stories
    cy.get('[data-item-id="components-my-notification"]').click()
    cy.wait(1000)
    
    cy.get('iframe[id="storybook-preview-iframe"]').then($iframe => {
      const doc = $iframe[0].contentDocument
      const $body = Cypress.$(doc.body)
      
      // Find and click notification trigger button
      const button = $body.find('my-button').first()
      if (button.length > 0) {
        cy.wrap(button[0]).click()
        cy.wait(1000) // Wait for notification to appear
        
        cy.screenshot('notification-triggered', {
          capture: 'viewport'
        })
        
        cy.wait(2000) // Let notification auto-dismiss or stay
      }
    })
    
    // Test notification types
    cy.get('[data-item-id="components-my-notification--types"]').click()
    cy.wait(1000)
    cy.screenshot('notification-types', {
      capture: 'viewport'
    })
  })

  it('tests new radio component stories', () => {
    // Navigate to radio stories
    cy.get('[data-item-id="components-my-radio-my-radio-group"]').click()
    cy.wait(1000)
    
    cy.get('iframe[id="storybook-preview-iframe"]').then($iframe => {
      const doc = $iframe[0].contentDocument
      const $body = Cypress.$(doc.body)
      
      // Test radio group interactions
      const radioGroup = $body.find('my-radio-group').first()
      if (radioGroup.length > 0) {
        const radios = $body.find('my-radio')
        if (radios.length > 1) {
          // Click different radio options
          cy.wrap(radios[0]).click()
          cy.wait(300)
          cy.wrap(radios[1]).click()
          cy.wait(300)
          
          cy.screenshot('radio-group-interaction', {
            capture: 'viewport'
          })
        }
      }
    })
    
    // Test radio layouts
    cy.get('[data-item-id="components-my-radio-my-radio-group--layouts"]').click()
    cy.wait(1000)
    cy.screenshot('radio-layouts', {
      capture: 'viewport'
    })
  })

  it('tests new drawer component stories', () => {
    // Navigate to drawer stories
    cy.get('[data-item-id="components-my-drawer"]').click()
    cy.wait(1000)
    
    cy.get('iframe[id="storybook-preview-iframe"]').then($iframe => {
      const doc = $iframe[0].contentDocument
      const $body = Cypress.$(doc.body)
      
      // Find and click drawer trigger button
      const button = $body.find('my-button').first()
      if (button.length > 0) {
        cy.wrap(button[0]).click()
        cy.wait(1000) // Wait for drawer animation
        
        cy.screenshot('drawer-opened', {
          capture: 'viewport'
        })
        
        // Try to close drawer (look for close button in shadow DOM)
        cy.wait(1000)
        // Drawer should auto-close or we can click backdrop
        cy.wrap($body[0]).click()
        cy.wait(500)
      }
    })
    
    // Test drawer positions
    cy.get('[data-item-id="components-my-drawer--positions"]').click()
    cy.wait(1000)
    cy.screenshot('drawer-positions', {
      capture: 'viewport'
    })
  })

  it('tests new sparkline component stories', () => {
    // Navigate to sparkline stories
    cy.get('[data-item-id="components-my-sparkline"]').click()
    cy.wait(1000)
    
    cy.screenshot('sparkline-default', {
      capture: 'viewport'
    })
    
    // Test sparkline variants
    cy.get('[data-item-id="components-my-sparkline--variants"]').click()
    cy.wait(1000)
    cy.screenshot('sparkline-variants', {
      capture: 'viewport'
    })
    
    // Test interactive dashboard
    cy.get('[data-item-id="components-my-sparkline--interactive-dashboard"]').click()
    cy.wait(1000)
    cy.screenshot('sparkline-dashboard', {
      capture: 'viewport'
    })
  })

  it('tests new data-list component stories', () => {
    // Navigate to data-list stories
    cy.get('[data-item-id="components-my-data-list"]').click()
    cy.wait(1000)
    
    cy.get('iframe[id="storybook-preview-iframe"]').then($iframe => {
      const doc = $iframe[0].contentDocument
      const $body = Cypress.$(doc.body)
      
      // Test search functionality if available
      const searchInput = $body.find('my-input input').first()
      if (searchInput.length > 0) {
        cy.wrap(searchInput[0]).type('test search')
        cy.wait(500)
        
        cy.screenshot('data-list-search', {
          capture: 'viewport'
        })
        
        // Clear search
        cy.wrap(searchInput[0]).clear()
        cy.wait(500)
      }
    })
    
    // Test data-list with all features
    cy.get('[data-item-id="components-my-data-list--with-all-features"]').click()
    cy.wait(1000)
    cy.screenshot('data-list-full-features', {
      capture: 'viewport'
    })
  })

  it('tests enhanced toggle component', () => {
    // Navigate to enhanced toggle stories
    cy.get('[data-item-id="components-my-toggle-enhanced"]').click()
    cy.wait(1000)
    
    cy.get('iframe[id="storybook-preview-iframe"]').then($iframe => {
      const doc = $iframe[0].contentDocument
      const $body = Cypress.$(doc.body)
      
      // Test toggle interaction
      const toggle = $body.find('my-toggle-enhanced').first()
      if (toggle.length > 0) {
        cy.wrap(toggle[0]).click()
        cy.wait(300)
        cy.wrap(toggle[0]).click()
        cy.wait(300)
        
        cy.screenshot('enhanced-toggle-interaction', {
          capture: 'viewport'
        })
      }
    })
    
    // Test enhanced features
    cy.get('[data-item-id="components-my-toggle-enhanced--enhanced-features"]').click()
    cy.wait(1000)
    cy.screenshot('enhanced-toggle-features', {
      capture: 'viewport'
    })
    
    // Test API demonstration
    cy.get('[data-item-id="components-my-toggle-enhanced--api-demonstration"]').click()
    cy.wait(1000)
    
    cy.get('iframe[id="storybook-preview-iframe"]').then($iframe => {
      const doc = $iframe[0].contentDocument
      const $body = Cypress.$(doc.body)
      
      // Test API buttons
      const buttons = $body.find('button')
      if (buttons.length > 0) {
        // Click a few API method buttons
        cy.wrap(buttons[0]).click() // Toggle
        cy.wait(200)
        cy.wrap(buttons[1]).click() // Check
        cy.wait(200)
        cy.wrap(buttons[3]).click() // Validate
        cy.wait(200)
        
        cy.screenshot('enhanced-toggle-api-demo', {
          capture: 'viewport'
        })
      }
    })
  })

  it('tests storybook navigation and responsiveness', () => {
    // Test responsive view in Storybook
    cy.viewport(375, 667) // Mobile
    cy.get('[data-item-id="components-my-button"]').click()
    cy.wait(1000)
    cy.screenshot('storybook-mobile-view', {
      capture: 'viewport'
    })
    
    cy.viewport(768, 1024) // Tablet
    cy.wait(500)
    cy.screenshot('storybook-tablet-view', {
      capture: 'viewport'
    })
    
    cy.viewport(1280, 720) // Desktop
    cy.wait(500)
    cy.screenshot('storybook-desktop-view', {
      capture: 'viewport'
    })
  })

  it('captures storybook sidebar navigation', () => {
    // Expand all component categories
    cy.get('[data-item-id="components"]').click()
    cy.wait(500)
    
    // Take screenshot of expanded sidebar
    cy.screenshot('storybook-sidebar-expanded', {
      capture: 'viewport'
    })
    
    // Test story search functionality
    cy.get('input[placeholder*="Find components"]').type('button')
    cy.wait(500)
    cy.screenshot('storybook-search-functionality', {
      capture: 'viewport'
    })
  })

  it('tests accessibility in storybook', () => {
    // Navigate to a component story
    cy.get('[data-item-id="components-my-button--accessibility"]').click()
    cy.wait(1000)
    
    // Test keyboard navigation in iframe
    cy.get('iframe[id="storybook-preview-iframe"]').then($iframe => {
      const doc = $iframe[0].contentDocument
      
      // Focus and test tab navigation
      cy.wrap(doc.body).focus()
      cy.wait(200)
      
      // Simulate tab key presses for accessibility testing
      cy.wrap(doc.body).type('{tab}')
      cy.wait(200)
      cy.wrap(doc.body).type('{tab}')
      cy.wait(200)
      
      cy.screenshot('accessibility-focus-testing', {
        capture: 'viewport'
      })
    })
  })

  it('captures comprehensive storybook overview', () => {
    // Go back to main docs page
    cy.get('[data-item-id="introduction--docs"]').click()
    cy.wait(1000)
    
    cy.screenshot('storybook-introduction', {
      capture: 'viewport'
    })
    
    // Take full viewport screenshot of Storybook interface
    cy.screenshot('storybook-complete-interface', {
      capture: 'fullPage'
    })
  })
})