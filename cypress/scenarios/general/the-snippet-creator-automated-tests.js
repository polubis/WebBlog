describe("The navigation in the snippet creator works correctly", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8000/snippet-creator")
    cy.viewport(1650, 795)
    cy.get(".start-snippet-creator").click()
  })

  it("The button with the right arrow in the navigation in the snippet creator moves to the next frame", () => {
    cy.get(".next").click()
  })

  it("The button with the left arrow in the navigation in the snippet creator moves to the previous frame", () => {
    cy.get(".previous-btn").click()
  })

  it("The button with three horizontal lines opens and closes the menu", () => {
    cy.get(".menu-button").first().click()
    cy.wait(700)
    cy.get(".menu-button").click()
  })
})
