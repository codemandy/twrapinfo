const embedEverything = require("eleventy-plugin-embed-everything");
const Image = require("@11ty/eleventy-img");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/css/");
  eleventyConfig.addWatchTarget("src/css/");
  eleventyConfig.addPlugin(embedEverything);

  eleventyConfig.addShortcode("image", async function (src, alt, sizes) {
    // Extract folder path and filename from src
    const pathParts = src.split("/");
    const folder = pathParts.slice(0, -1).join("/");
    const filename = pathParts.pop();

    // Generate the image
    let fullPath = `src/${src}`;
    let metadata = await Image(fullPath, {
      widths: [300, 600],
      formats: ["avif", "jpeg"],
      urlPath: `/${folder}/`,
      outputDir: `./_public/${folder}/`,
    });

    let imageAttributes = {
      sizes,
      alt,
      loading: "lazy",
      decoding: "async",
    };

    return Image.generateHTML(metadata, imageAttributes);
  });

  eleventyConfig.addCollection("posts", function (collection) {
    return collection
      .getFilteredByGlob("src/blog/posts/**/*.md")
      .sort(function (a, b) {
        let nameA = a.data.title.toUpperCase();
        let nameB = b.data.title.toUpperCase();
        if (nameA < nameB) return -1;
        else if (nameA > nameB) return 1;
        else return 0;
      });
  });

  const { minify } = require("terser");
  eleventyConfig.addNunjucksAsyncFilter(
    "jsmin",
    async function (code, callback) {
      try {
        const minified = await minify(code);
        callback(null, minified.code);
      } catch (err) {
        console.error("Terser error: ", err);
        // Fail gracefully.
        callback(null, code);
      }
    }
  );

  return {
    dir: {
      input: "src",
      includes: "_includes",
      output: "_public",
    },
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
  };
};
