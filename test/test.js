var should = require('should'),
    app = require('./../src/main'),
    co = require('co'),
    man = require('thoughtpad-plugin-manager'),
    incorrectconfig = require('./incorrect-config'),
    thoughtpad;

describe("pagination plugin", function () {
    it("should not do anything if pagination config doesn't exist", function (done) {
        var res = false;
        thoughtpad = man.registerPlugins([app]);
        thoughtpad.config = incorrectconfig;

        co(function *() {
            yield thoughtpad.notify("html-precompile-all-request");
            should.not.exist(thoughtpad.config.pages['home-pageblock-1']);
            done();
        }).catch(done);
    });


    it("should add new pageblock", function (done) {
        var res = false;
        thoughtpad = man.registerPlugins([app]);
        thoughtpad.config = {
            topPages: ['home'],
            pagination: {
                contentPerPage: 2
            },
            pages: {
                home: {
                    layout: 'foo',
                    url: 'home.html',
                    pages: [
                        'page1',
                        'page2',
                        'page3',
                        'page4',
                        'page5'
                    ]
                }
            }
        };

        co(function *() {
            yield thoughtpad.notify("html-precompile-all-request");
            thoughtpad.config.pages['home-pageblock-1'].layout.should.equal('foo');
            done();
        }).catch(done);
    });

    it("should change the original page block pages", function (done) {
        var res = false;
        thoughtpad = man.registerPlugins([app]);
        thoughtpad.config = {
            topPages: ['home'],
            pagination: {
                contentPerPage: 2
            },
            pages: {
                home: {
                    layout: 'foo',
                    url: 'home.html',
                    pages: [
                        'page1',
                        'page2',
                        'page3',
                        'page4',
                        'page5'
                    ]
                }
            }
        };

        co(function *() {
            yield thoughtpad.notify("html-precompile-all-request");
            thoughtpad.config.pages.home.pages.length.should.equal(3);
            done();
        }).catch(done);
    });

    it("should change the index page", function (done) {
        var res = false;
        thoughtpad = man.registerPlugins([app]);
        thoughtpad.config = {
            topPages: ['home'],
            pagination: {
                contentPerPage: 2
            },
            pages: {
                home: {
                    layout: 'foo',
                    url: 'home.html',
                    index: true,
                    pages: [
                        'page1',
                        'page2',
                        'page3',
                        'page4',
                        'page5'
                    ]
                }
            }
        };

        co(function *() {
            yield thoughtpad.notify("html-precompile-all-request");
            thoughtpad.config.pages.home.index.should.be.false;
            thoughtpad.config.pages['home-pageblock-1'].index.should.be.true;
            thoughtpad.config.pages['home-pageblock-2'].index.should.be.false;
            done();
        }).catch(done);
    });

    it("should have friendly url attached", function (done) {
        var res = false;
        thoughtpad = man.registerPlugins([app]);
        thoughtpad.config = {
            topPages: ['home'],
            pagination: {
                contentPerPage: 2
            },
            pages: {
                home: {
                    layout: 'foo',
                    url: 'home.html',
                    pages: [
                        'page1',
                        'page2',
                        'page3',
                        'page4',
                        'page5'
                    ]
                }
            }
        };

        co(function *() {
            yield thoughtpad.notify("html-precompile-all-request");
            thoughtpad.config.pages['home-pageblock-1'].friendlyUrl.should.equal('1');
            done();
        }).catch(done);
    });

    it("should sort pages before blocking them", function (done) {
        var res = false;
        thoughtpad = man.registerPlugins([app]);
        thoughtpad.config = {
            topPages: ['home'],
            pagination: {
                contentPerPage: 2
            },
            pages: {
                home: {
                    layout: 'foo',
                    url: 'home.html',
                    sortBy: 'foo',
                    pages: [
                        'page1',
                        'page2',
                        'page3',
                        'page4',
                        'page5'
                    ]
                },
                page5: {
                    foo: 1
                },
                page4: {
                    foo: 5
                },
                page3: {
                    foo: 2
                },
                page2: {
                    foo: 4
                },
                page1: {
                    foo: 2
                }
            }
        };

        co(function *() {
            yield thoughtpad.notify("html-precompile-all-request");
            thoughtpad.config.pages['home-pageblock-1'].pages.indexOf('page4').should.equal(0);
            thoughtpad.config.pages['home-pageblock-1'].pages.indexOf('page2').should.equal(1);
            done();
        }).catch(done);
    });


});