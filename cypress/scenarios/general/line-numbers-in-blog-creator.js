describe("There are line numbers in the blog creator", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8000/")
    cy.viewport(1650, 795)
  })

  it("In the article preview on the creator page, there are line numbers", () => {
    cy.get("#home-navigation-link-Creator").click()
    cy.wait(4000)
    cy.url().should("include", "/blog-creator")
    cy.get("pre")
      .children()
      .should("have.class", "editor-line-wrapper")
      .children()
      .should("have.class", "editor-line-number")
  })
})
