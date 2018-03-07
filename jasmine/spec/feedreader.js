/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */
$(function () {

    describe('RSS Feeds', function () {
        /* This test is to makes sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        allFeeds.forEach(function (feedUrl) {
            it('url defined', function () {
                expect(feedUrl.url).toBeDefined();
                expect(feedUrl.url).not.toBe("");
            });
        });

        /* This test loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        allFeeds.forEach(function (feedName) {
            it('url defined', function () {
                expect(feedName.name).toBeDefined();
                expect(feedName.name).not.toBe("");
            });
        });
    });

    // New Test Suite for the Menu
    describe('The Menu', function () {

        /* Tests that the menu element is
         * hidden by default.
         */
        it('Menu Hidden', function () {
            let checkClass = $('body').hasClass('menu-hidden');
            expect(checkClass).toEqual(true);
        });

        /* This test ensures the menu changes
         * visibility when the menu icon is clicked.
         */
        function clickMenu() {
            $('i').click();
        }
        it('Check if menu is displaying when clicked', function () {
            clickMenu();
            var menuClass = $('body')[0].className;
            expect(menuClass).toEqual('');
        });

        it('Check if menu is hiding when clicked again', function () {
            clickMenu();
            var menuClass = $('body')[0].className;
            expect(menuClass).toEqual('menu-hidden');
        });
    });

    /* New Test Suite to test the AJAX call for the initial entries */
    describe('Initial Entries', function () {

        /* This test ensures that when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        beforeEach((done) => {
            loadFeed(0, function () {
                done();
            });
        });
        it('Test loadFeed function', function () {
            var feedContent = $('.feed')[0].childElementCount;
            expect(feedContent).not.toEqual(0);
        });
    });
    /* New Test Suite that tests that when a new feed is selected it actually is new data */
    describe('New Feed Selection', function () {

        /* This test ensures that when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        var initialFeed;
        beforeEach((done) => {
            loadFeed(0, function () {
                initialFeed = $('.feed')[0].innerHTML;
                loadFeed(1, function () {
                    done();
                });
            });

        });
        it('Changes when loading content', function (done) {
            var nextFeed = $('.feed')[0].innerHTML;
            expect(initialFeed).not.toEqual(nextFeed);
            done();
        });

    });
}());