describe("Autohrs' page tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8000/")
    cy.viewport(1650, 795)
    cy.get("#home-navigation-link-Authors").click()
    cy.wait(4000)
  })

  it('"Join us" form works as expected', () => {
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

  it("Github links work as expected", () => {
    cy.get('[title="Github profile"]')
      .eq(0)
      .click()
      .should("have.attr", "target", "_blank")
  })
  /*Add for each author*/

  it("Linkedin links work as expected", () => {
    cy.get('[title="Linkedin profile"]')
      .eq(0)
      .click()
      .should("have.attr", "target", "_blank")
  })
  /*Add for each author*/
})
