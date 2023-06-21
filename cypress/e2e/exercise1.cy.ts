describe("Exercise1", () => {
  beforeEach(() => {
    cy.visit("/exercise1");
  });

  it("should display the min label input", () => {
    cy.get("input").invoke("val").should("contain", "10");
  });
  it("should display the max label input", () => {
    cy.get("input").eq(1).invoke("val").should("contain", "70");
  });
});
