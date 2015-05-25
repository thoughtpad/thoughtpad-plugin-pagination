module.exports = {
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
}