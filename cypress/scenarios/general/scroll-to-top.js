describe("Scroll to top button", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8000/")
    cy.viewport(1650, 795)
  })

  it("The scroll to top button moves to the top of the page", () => {
    cy.scrollTo(0, 500)
    cy.wait(500)
    cy.scrollTo(0, 400)
    cy.wait(500)
    cy.get(".scroll-up-button").click()
    cy.wait(500)
    cy.window().its("scrollY").should("equal", 0)
  })
})
