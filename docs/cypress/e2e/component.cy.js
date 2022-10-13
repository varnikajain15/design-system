const hostURL = Cypress.env('HOST_URL') || 'http://localhost:8000';
const componentURL = hostURL + '/components/overview/all-components/';

describe('Cypress Test of component page', () => {
  const navLink = [];
  before(() => {
    cy.visit(componentURL);
    cy.leftnavTraverse(navLink);
  });

  // it('check for all the links it redirects', () => {
  //   navLink.forEach((page) => {
  //     cy.visit(page);
  //     cy.linkVisit();
  //   });
  // });

  // it('check if all links of table of contents direct to the content', () => {
  //   navLink.forEach((page) => {
  //     cy.visit(page);
  //     // cy.next();
  //     // console.log(page.should('contains','overview'));
  //     if(!page.includes("overview")){
  //     cy.tableOfContent();
  //     }
  //   });
  // });

  it('check if images of page are loading', () => {
    navLink.forEach((page) => {
      cy.visit(page);
      cy.wait(5000);
      cy.imageRender();
      
    });
  });

  // it('check if tabs exsits and they are loading', () => {
  //   navLink.forEach((page) => {
  //     cy.visit(page);
  //     cy.tabsVisit();        
  //   });
  // });
});
