import path  from "path";
import express from "express";
import { createServer as createViteServer } from "vite";
import _dirname from "./dirname.mjs";

console.log(_dirname);

// const fs = require("fs");
// const path = require("path");
// const express = require("express");
// const { createServer: createViteServer } = require("vite");

async function createServer() {
  const app = express();

  // Create Vite server in middleware mode. This disables Vite's own HTML
  // serving logic and let the parent server take control.
  //
  // In middleware mode, if you want to use Vite's own HTML serving logic
  // use `'html'` as the `middlewareMode` (ref https://vitejs.dev/config/#server-middlewaremode)
  const vite = await createViteServer({
    server: { middlewareMode: "ssr" },
  });
  // use vite's connect instance as middleware
  app.use(vite.middlewares);

  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    try {      
        console.log(_dirname);
      const pathSSRModule = path.resolve(_dirname, "render.js");      
      const { render } = await vite.ssrLoadModule(pathSSRModule);
      const html = await render(url);
      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (e) {
      // If an error is caught, let Vite fix the stracktrace so it maps back to
      // your actual source code.
      vite.ssrFixStacktrace(e);
      console.log(e);
      next(e);
    }
  });

  app.on("error", (err) => {
    throw err;
  });

  app.listen(3000, (error) =>
    console.log("Listening on http://localhost:3000", error)
  );
}

createServer();
