Cypress.Commands.add("checkDiscordLink", (id, pageToVisit = "") => {
  if (typeof id !== "string" || typeof pageToVisit !== "string") {
    throw new Error("parameters have to be strings")
  }
  pageToVisit && cy.visit(`http://localhost:8000/${pageToVisit}`)
  cy.get(`#${id}`)
    .should("have.attr", "href")
    .and("match", /discord.gg/)
})
describe("Discord link", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8000/")
    cy.viewport(1650, 795)
  })

  it("Discord link in navigation bar exists", () => {
    cy.checkDiscordLink("home-navigation-join-button")
  })

  it("Discord link in footer exists", () => {
    cy.checkDiscordLink("footer-join-us-link")
  })

  it("Discord link at authors subpage exists", () => {
    cy.checkDiscordLink("author-join-us", "authors")
  })

  it("Discord link at authors subpage exists", () => {
    cy.checkDiscordLink("blog-join-us", "blog-creator")
  })
})
