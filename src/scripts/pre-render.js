// Pre-render the app into static HTML.
// run `npm run generate` and then `dist/static` can be served as a static site.

const fs = require("fs");
const path = require("path");

const toAbsolute = (p) => path.resolve(__dirname, p);

const manifest = require("../../dist/client/ssr-manifest.json");
const template = fs.readFileSync(
  toAbsolute("../../dist/client/index.html"),
  "utf-8"
);
const { render } = require("../../dist/server/index.js");

const routesToPrerender = fs
  .readdirSync(toAbsolute("../server/pages"))
  .map((file) => {
    const name = file.replace(/\.ejs$/, "").toLowerCase();
    return name === "index" ? `/` : `/${name}`;
  });

(async () => {
  // pre-render each route...
  for (const url of routesToPrerender) {
    try {
      const appHtml = await render(url, manifest);
      const html = template
        // .replace(`<!--preload-links-->`, preloadLinks)
        .replace(`<!--ssr-outlet-->`, appHtml);

      const filePath = `../../dist/client${url === "/" ? "/index" : url}.html`;
      console.log("pre-rendered:", filePath);
      fs.writeFileSync(toAbsolute(filePath), html);
    } catch (err) {
      throw err;
    }
  }

  fs.unlinkSync(toAbsolute("../../dist/client/ssr-manifest.json"));
})();
