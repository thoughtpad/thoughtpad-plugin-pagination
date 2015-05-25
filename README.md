thoughtpad-plugin-pagination
============================

[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]

A thoughtpad plugin that automatically splits content into pages during compilation.

## Usage

The plugin should be loaded using the [thoughtpad-plugin-manager](https://github.com/thoughtpad/thoughtpad-plugin-manager). Once this has been done then the plugin will respond to events. To use standalone:

```JavaScript
var man = require('thoughtpad-plugin-manager'),
    pagination = require('thoughtpad-plugin-pagination');

var thoughtpad = man.registerPlugins([pagination]);
yield thoughtpad.notify("html-precompile-all-request");
```

## Config File Setup

The split pages will be automatically made, as long as you have the `contentPerPage` variable in the config file:

```JavaScript
pagination: {
    contentPerPage: 5
}
```

The plugin will add a number of additional variables for use in templates:

* `currentPage`
* `maxPages`

Note that if you have additional plugins that manipulate the order and the layout of the pages (such as the tag plugin), then the order of the module names in the config file is important. The pagination plugin should therefore be added as late as possible so that all pages are split into their respective blocks.

If you do not want a set of pages split into blocks (such as the tag engine), then use the `pagination: false` flag in the config file.

## Tests

Ensure you have globally installed mocha - `npm -g install mocha`. Then you can run:

`mocha`

Alternatively if you are in a *NIX environment `npm test` will run the tests plus coverage data.

## License

The code is available under the [MIT license](http://deif.mit-license.org/).

[travis-image]: https://img.shields.io/travis/thoughtpad/thoughtpad-plugin-pagination/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/thoughtpad/thoughtpad-plugin-pagination
[coveralls-image]: https://img.shields.io/coveralls/thoughtpad/thoughtpad-plugin-pagination/master.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/thoughtpad/thoughtpad-plugin-pagination?branch=master
