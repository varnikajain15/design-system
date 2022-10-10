/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
Cypress.Commands.add('tableOfContent', () => {
    cy.wait(3000);
    cy.get('[data-test=Docs-Toc--Link]').each((page) => {
        cy.get('[data-test=DesignSystem-Heading]').contains(`${page.text()}`);
    });
});

Cypress.Commands.add('imageRender', () => {
    cy.viewport('macbook-15');
    cy.wait(3000)
    cy.get('img').each(($img) => {
        cy.wrap($img).scrollIntoView().should('be.visible').should('have.attr', 'alt');
    });
});

Cypress.Commands.add('tileToggle', () => {
    cy.wait(1000);
    cy.get('.Tile').click({
        multiple: true,
        force: true
    });
});

Cypress.Commands.add('linkVisit', () => {
    cy.wait(1000);
    cy.get('[data-test=Docs-inner--container]').find('a').each((page) => {
        cy.request(page.prop('href'));
    })
})

Cypress.Commands.add('leftnavTraverse', (arr) => {
    cy.get('[data-test=Docs-Leftnav]').find('a').not(':contains("started")').each(page => {
        cy.request(page.prop('href'));
    })
    cy.get('[data-test=DesignSystem-VerticalNav--Item]').each((navLink) => {
        arr.push(navLink.prop('href'))
    })
})

Cypress.Commands.add('tabsVisit', () => {
    cy.get('[data-test=Docs-Main--Row]').then(($body) => {
        if ($body.find('[data-test=DesignSystem-Tabs]').length) {
            cy.get('[data-test=DesignSystem-Tabs--Tab]').next().each((page) => {
                const tabName = page[0].innerText
                const tabSlug = tabName.toLowerCase().replace(/\s/g, '-');
                const url = page[0].baseURI;
                const pagePath = url.split('/');
                const pages = pagePath.slice(0, pagePath.length - 2);
                const path = `${pages.join('/')}/${tabSlug}/`;
                cy.visit(path);
                cy.linkVisit();
                cy.tableOfContent();
                cy.imageRender();
            })
        }
    });
})