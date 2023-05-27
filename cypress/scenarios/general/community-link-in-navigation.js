describe("Community links in the navigation tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8000/")
    cy.viewport(1650, 795)
  })

  it("The LinkedIn logo moves to the LinkedIn profile", () => {
    cy.get(
      '.contentFooter a[href*="https://www.linkedin.com/in/adrian-po%C5%82ubi%C5%84ski-281ab2172/"]'
    )
      .should("have.attr", "href")
      .and("contain", "linkedin.com")
  })

  it("The Discord logo moves to the Discord channel", () => {
    cy.get('.contentFooter a[title*="GreenOn Software Discord channel"]')
      .should("have.attr", "href")
      .and("contain", "discord.gg")
  })

  it("The Facebook logo moves to the Facebook group", () => {
    cy.get('.contentFooter a[title*="GreenOn Software Facebook profile"]')
      .should("have.attr", "href")
      .and("contain", "facebook.com")
  })
})
