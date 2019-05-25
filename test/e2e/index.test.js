module.exports = {
    'step one: open homepage and check': browser => {
        browser
            .url('http://localhost:3000')
            .waitForElementVisible('body')

        browser.expect.element('.HomePageLogo').text.to.equal('HomePage');
        browser.expect.element('.subRouter').to.be.an('a');

        browser.click('.subRouter .menuItem');
        browser.expect.url().to.contain('book/sub');
    },

    'step two: test router -> worker': browser => {
        browser.expect.element('.menuContainer .worker').to.be.an('a');
        browser
            .pause(1000)
            .click('.menuContainer .worker')
            .waitForElementVisible('.routerContainer');
            
        browser.expect.elements('.routerContainer button').count.to.equal(3);
        browser.click('.routerContainer .onlyAjax');
    },

    'step three: test router -> books': browser => {
        browser.expect.element('.menuContainer .books').to.be.an('a');
        browser
            .pause(1000)
            .click('.menuContainer .books')
            .waitForElementVisible('.routerContainer .booksContainer');

        browser.waitForElementPresent('.booksContainer button.add');
        browser.expect.elements('.routerContainer tr.ant-table-row').count.to.equal(0);
        let booksCount = browser.elements('css selector', '.routerContainer tr.ant-table-row').count || 0;
        
        browser
            .click('.booksContainer button.add')
            .waitForElementVisible('.r-modal');

        // empty commit
        browser.click('.r-modal .ant-modal-footer .ant-btn-primary');
        browser.expect.elements('.r-modal .ant-modal-body .ant-form-item-control.has-error').count.to.equal(2);
        
        // for better
        const name = 'name', price = 100;
        browser.pause(1000);
        browser.setValue('#name', name).setValue('#price', price);
        browser.pause(1000);
        browser.click('.r-modal .ant-modal-footer .ant-btn-primary');
        booksCount += 1;
        browser.waitForElementNotVisible('.r-modal');
        browser.expect.elements('.routerContainer tr.ant-table-row').count.to.equal(booksCount);

        // only one row
        browser.click('.routerContainer tr.ant-table-row .edit');
        browser.expect.element('#name').value.to.equal(name);
        browser.expect.element('#price').value.to.equal("100");
        browser.clearValue('#name');
        browser.clearValue('#price');
        browser.setValue('#name', 'otherName')
        browser.setValue('#price', 0);
        browser.click('.r-modal .ant-modal-footer .ant-btn-primary');
        browser.waitForElementNotVisible('.r-modal');
        browser.pause(2000);
        browser.expect.element('.routerContainer tr.ant-table-row .nameCell').text.to.not.equal(name);
        // bug ?
        // browser.expect.element('.routerContainer tr.ant-table-row .priceCell').text.to.equal('0');

        browser.click('.routerContainer tr.ant-table-row .del');
        booksCount -= 1;
        browser.expect.elements('.routerContainer tr.ant-table-row').count.to.equal(booksCount);
        browser.pause(1000);
        browser.end();
    }
}