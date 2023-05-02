describe("Main page test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8000/")
    cy.viewport(1650, 795)
  })

  it('"Check blog" button works as expected', () => {
    cy.get(".WelcomeSection__TextContent-kMKlwD > a > .Button-dtUzzq")
      .contains("CHECK BLOG")
      .click()
    cy.url().should("include", "articles")
  })

  it('"Write your first article" button works as expected', () => {
    cy.get(
      ".StatsSection__BloggerTileContent-leFqlL > a > .Button-dtUzzq"
    ).click()
    cy.url().should("include", "blog-creator")
  })

  it("About us section in the footer works as expected", () => {
    cy.get(".Button__LinkButton-fwUmEk").click()
    // cy.get("body").then($body => {
    //   if ($body.find(".JoinUsModal__Container-dmxFvw").length > 0) {
    //     console.log(true)
    //   }
    //   console.log(false)
    // })
    cy.get('[type="email"]').type("example@mail.com")
    cy.get("textarea").type("Some text")
    cy.get('[type="submit"]').contains("SEND").click()
    cy.get(".ok").should(
      "have.text",
      "We have your submission! We will get back to you within 2 days"
    )
    cy.get('[type="submit"]').contains("CLOSE").click()
  })

  // it("Recent articles' section works as expected", () => {
  //   cy.get(".cJizmy").each(($el, index, $list) => {
  //     cy.wrap($el).click()
  //     cy.wait(4000)
  //     cy.go("back")
  //   })

  //   // cy.get(
  //   //   '[href="/articles/testing/mocking-up-with-factories/"] > .Footer__Figure-dNkjlH > .gatsby-image-wrapper > picture > img'
  //   // ).click()
  //   // cy.wait(4000)
  //   // cy.go("back")
  // })
})
