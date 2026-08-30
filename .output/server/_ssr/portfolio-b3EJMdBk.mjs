import { d as require_jsx_runtime, u as Link } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/portfolio-b3EJMdBk.js
var import_jsx_runtime = require_jsx_runtime();
function Portfolio() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "portfolio",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "portfolio__header",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				children: "0000"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Maximiliano Cespedes." })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "portfolio__content",
			"aria-labelledby": "portfolio-title",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				id: "portfolio-title",
				children: "Portfolio"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "project-list",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						className: "project project--stepcraft",
						href: "https://www.stepcraft.app",
						target: "_blank",
						rel: "noreferrer",
						"aria-label": "Visit Stepcraft",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "project__identity",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: "https://www.stepcraft.app/assets/images/favicon/android-chrome-512x512.png",
								alt: ""
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Stepcraft" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "co-founded" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						className: "project",
						href: "https://www.tike.com.ar",
						target: "_blank",
						rel: "noreferrer",
						"aria-label": "Visit Tike",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/tike-logo.svg",
							alt: "Tike"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "co-founded" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						className: "project project--wetransfer",
						href: "https://wetransfer.com",
						target: "_blank",
						rel: "noreferrer",
						"aria-label": "Visit WeTransfer",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							className: "project__brand-logo project__brand-logo--wetransfer",
							src: "https://upload.wikimedia.org/wikipedia/commons/3/36/WeTransfer_logo.svg",
							alt: "WeTransfer"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						className: "project project--coolblue",
						href: "https://www.coolblue.nl",
						target: "_blank",
						rel: "noreferrer",
						"aria-label": "Visit Coolblue",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							className: "project__brand-logo project__brand-logo--icon",
							src: "https://upload.wikimedia.org/wikipedia/commons/1/1e/Coolblue_Logo.svg",
							alt: "Coolblue"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						className: "project project--creative-fabrica",
						href: "https://www.creativefabrica.com",
						target: "_blank",
						rel: "noreferrer",
						"aria-label": "Visit Creative Fabrica",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							className: "project__brand-logo project__brand-logo--icon",
							src: "https://www.google.com/s2/favicons?domain=creativefabrica.com&sz=256",
							alt: "Creative Fabrica"
						})
					})
				]
			})]
		})]
	});
}
//#endregion
export { Portfolio as component };
