const embedEverything = require("eleventy-plugin-embed-everything");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets/");
  eleventyConfig.addPassthroughCopy("src/css/");
  eleventyConfig.addWatchTarget("src/css/");
  eleventyConfig.addPlugin(embedEverything);


  // eleventyConfig.addCollection('posts', function(collectionApi) {
  //   return collectionApi.getFilteredByGlob('src/blog/posts/**/*.md');
  // })


  eleventyConfig.addCollection("posts", function(collection) {
    return collection.getFilteredByGlob('src/blog/posts/**/*.md').sort(function(a, b) {
        let nameA = a.data.title.toUpperCase();
        let nameB = b.data.title.toUpperCase();
        if (nameA < nameB) return -1;
        else if (nameA > nameB) return 1;
        else return 0;
    });
});


  const { minify } = require("terser");
  eleventyConfig.addNunjucksAsyncFilter("jsmin", async function (
    code,
    callback
  ) {
    try {
      const minified = await minify(code);
      callback(null, minified.code);
    } catch (err) {
      console.error("Terser error: ", err);
      // Fail gracefully.
      callback(null, code);
    }
  });


  return {
    dir: {
      input: 'src',
      includes: '_includes',
      output: '_public'
    },
    templateFormats: ['md', 'njk', 'html'],
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
  };
}
