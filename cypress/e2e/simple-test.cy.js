describe('Simple Button Test', () => {
  it('tests simple inline button component', () => {
    cy.visit('/examples/simple-test.html')
    cy.wait(1000)
    
    cy.takeFullPageScreenshot('simple-button-test')
    
    cy.get('my-button').should('exist')
  })
})