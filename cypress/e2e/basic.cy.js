describe('Bring Shopping List App', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173')
  })

  it('displays the home page', () => {
    cy.contains('Bring!')
    cy.contains('L\'application collaborative')
  })

  it('can navigate to login form', () => {
    cy.contains('Se connecter').click()
    cy.get('input[type="email"]').should('be.visible')
    cy.get('input[type="password"]').should('be.visible')
  })

  it('shows validation errors', () => {
    cy.contains('Se connecter').click()
    cy.get('button[type="submit"]').click()
    cy.contains('Email is required')
  })
})
