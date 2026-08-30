import { d as require_jsx_runtime, u as Link } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BMYQLTv3.js
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "home",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "home__header",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "0000" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Maximiliano Cespedes." })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "home__statement",
				"aria-labelledby": "statement-title",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						id: "statement-title",
						children: "I design and build digital products."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Product-minded engineering for ambitious ideas, from early direction to polished interfaces." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						className: "home__portfolio-link",
						to: "/portfolio",
						children: "View portfolio →"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "home__footer",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "home__details",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						"aria-labelledby": "work-title",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							id: "work-title",
							children: "Selected focus"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
							"Product engineering",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							"Frontend systems",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							"AI product advisory"
						] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						"aria-labelledby": "availability-title",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							id: "availability-title",
							children: "Availability"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
							"Open for selected projects",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							"Remote from the Netherlands"
						] })]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "home__footer-links",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						className: "home__contact",
						href: "mailto:hello@0000.com.ar",
						children: "hello@0000.com.ar"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						className: "home__links",
						"aria-label": "Links",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/portfolio",
								children: "Portfolio"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "https://www.linkedin.com/in/neomaxzero/",
								target: "_blank",
								rel: "noreferrer",
								children: "LinkedIn"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "https://github.com/neomaxzero/",
								target: "_blank",
								rel: "noreferrer",
								children: "GitHub"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "https://blog.0000.com.ar",
								target: "_blank",
								rel: "noreferrer",
								children: "Blog"
							})
						]
					})]
				})]
			})
		]
	});
}
//#endregion
export { Home as component };
