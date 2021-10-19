var cheerio = require('cheerio');
var slug = require('github-slugid');

// insert anchor link into section
function addTarget(content) {
    var $ = cheerio.load(content);
    $('a').each(function(i, elem) {
        var link = $(elem);
        var href = link.attr("href");
        if (href && href.indexOf('#') === 0) {
            link.attr('target', '_self');
        }
    });
    return $.html();
}

module.exports = {
    book: {
        assets: "./assets",
        css: [ "plugin.css" ]
    },
    hooks: {
        "page": function(page) {
            page.content = addTarget(page.content);
            return page;
        }
    }
};
