describe("Main page test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8000/")
    cy.viewport(1650, 795)
  })

  it("View code snippet in new tab", () => {
    cy.get("#home-navigation-link-Creator").click()
    cy.url().should("include", "blog-creator")
    cy.get("button").contains("Source").eq(0).click()
    //   .should("have.attr", "target", "_blank")
    /*Add for each source button*/
  })
})
