module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets/");
  eleventyConfig.addPassthroughCopy("src/css/");
  eleventyConfig.addWatchTarget("src/css/");



  eleventyConfig.addCollection('posts', function(collectionApi) {
    return collectionApi.getFilteredByGlob('src/blog/posts/**/*.md');
  })

  eleventyConfig.addCollection("specialCollection", function (collection) {
    return collection.getAll().filter((item) => item.data.customKey);
  });

  const embedVimeo = require("eleventy-plugin-vimeo-embed");

  module.exports = function(eleventyConfig) {
    eleventyConfig.addPlugin(embedVimeo);
  };


  return {
    dir: {
      input: 'src',
      includes: '_includes',
      output: 'public',
    },
    templateFormats: ['md', 'njk', 'html'],
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
  };
}
