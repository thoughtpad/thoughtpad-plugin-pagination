var init = function (thoughtpad) {
    thoughtpad.subscribe("html-precompile-all-request", splitPages);
},

splitPages = function *(obj) {
    var config = obj.thoughtpad.config,
        i,
        len,
        contentPerPage,
        oldPages,
        sortedPages,
        name,
        blocks;

    // Only split pages if we know how many pages are in each block
    if (config.pagination && config.pagination.contentPerPage) {
        contentPerPage = config.pagination.contentPerPage;
        
        // Loop through the pages and work out what needs to change
        for (page in config.pages) {            
            if (config.pages[page].pages && config.pages[page].pages.length > contentPerPage && config.pages[page].pagination !== false) {   

                sortedPages = sortPages(config.pages, page);             
                blocks = Math.ceil(config.pages[page].pages.length / contentPerPage); 

                i = 0;
                len = sortedPages.length;
                oldPages = [];

                for (i; i < len; i++) {
                    oldPages.push(sortedPages[i].name);
                }

                i = 1;
                len = blocks + 1;
                config.pages[page].pages = oldPages.slice(0, contentPerPage);
                config.pages[page].pageNumber = 1;
                config.pages[page].maxPages = blocks;

                // Rebuild new page array
                for (i; i < len; i++) {

                    name = page + "-pageblock-" + i;
                    config.pages[page].pages.push(name);
                    config.pages[name] = {};

                    // Copy across all user config values so that we don't lose anything
                    for (var prop in config.pages[page]) {
                        config.pages[name][prop] = config.pages[page][prop];
                    }

                    config.pages[name].friendlyUrl = i.toString();
                    config.pages[name].ignoreBlockInUrl = true;
                    config.pages[name].pageNumber = i;
                    config.pages[name].maxPages = blocks;

                    config.pages[name].pages = oldPages.slice((i - 1) * contentPerPage, ((i - 1) * contentPerPage) + contentPerPage);
                    // Only 1 index page, and it should be the first page
                    if (config.pages[name].index && i > 1) {
                        config.pages[name].index = false;
                    }

                    if (config.pages[page].index) {
                        config.pages[page].index = false;
                    }
                }               
            }
        }
    }
},

sortPages = function (pages, pageName) {
    var i = 0,
        len,
        sortBy = pages[pageName].sortBy,
        order = (pages[pageName].sortOrder && pages[pageName].sortOrder === "asc") ? [1, -1] : [-1, 1],
        page = pages[pageName],
        sortedArr = [];

    if (page.pages && sortBy) {
        len = page.pages.length;
        for (i; i < len; i++) {
            if (pages[page.pages[i]][sortBy]) {
                sortedArr.push({ name: page.pages[i], value: pages[page.pages[i]][sortBy] });
            }
        }

        // By default the sort order is desc (so latest posts appear at the top)
        sortedArr.sort(function (a, b) {
            if (a.value > b.value) return order[0];
            if (a.value < b.value) return order[1];
            return 0;
        });
    }

    return sortedArr;
};

module.exports = {
    init: init
};
