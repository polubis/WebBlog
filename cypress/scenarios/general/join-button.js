describe("Join button in the top navigation bar", () => {
  it("Join button in the top navigation bar works as expected", () => {
    cy.visit("http://localhost:8000/")
    cy.viewport(1650, 795)

    cy.get("#home-navigation-join-button").contains("Join").click()
    cy.get('[type="email"]').type("example@mail.com")
    cy.get("textarea").type("Some text")
    cy.get('[type="submit"]').contains("SEND").click()
    cy.get(".ok").should(
      "have.text",
      "We have your submission! We will get back to you within 2 days"
    )
    cy.get('[type="submit"]').contains("CLOSE").click()
  })
})
