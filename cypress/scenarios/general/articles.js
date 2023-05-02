describe("Articles' tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8000/")
    cy.viewport(1650, 795)
  })

  it('"Read article" buttons work as expected', () => {
    cy.get("#home-navigation-link-Articles").click()
    cy.url().should("include", "articles")
    cy.get(
      '[href="/articles/thoughts/loops-performance-in-javascript/"] > .Button-dtUzzq'
    ).click()
    //Add tests for each article
  })

  it("Clicking on author's avatar works as expected", () => {
    cy.get("#home-navigation-link-Articles").click()
    cy.url().should("include", "articles")
    cy.get(
      ":nth-child(1) > .Details___default-McGbG > a > .AuthorBadge__Badge-gJdzZR > .AuthorAvatar-jsiITc > .gatsby-image-wrapper > picture > img"
    ).click()
    cy.url().should("include", "authors")
  })
})
