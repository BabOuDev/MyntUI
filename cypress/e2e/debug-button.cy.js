describe('Debug Button Test', () => {
  it('captures debug button page', () => {
    cy.visit('/examples/debug-button.html')
    cy.wait(2000) // Wait for component to load
    
    // Take screenshot regardless of visibility
    cy.takeFullPageScreenshot('debug-button-page')
    
    // Check if buttons exist in DOM
    cy.get('my-button').should('have.length.greaterThan', 0)
  })
})