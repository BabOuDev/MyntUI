// Cypress support file for e2e tests
// This file is processed and loaded automatically before your test files.

// Add custom commands here
Cypress.Commands.add('takeFullPageScreenshot', (name) => {
  cy.screenshot(name, { 
    capture: 'fullPage',
    overwrite: true 
  })
})

Cypress.Commands.add('waitForComponents', () => {
  // Wait for web components to be defined
  cy.window().then((win) => {
    return new Promise((resolve) => {
      const checkComponents = () => {
        if (win.customElements.get('my-button')) {
          resolve()
        } else {
          setTimeout(checkComponents, 100)
        }
      }
      checkComponents()
    })
  })
})