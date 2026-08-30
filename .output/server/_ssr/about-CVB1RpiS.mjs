import { d as require_jsx_runtime, u as Link } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/about-CVB1RpiS.js
var import_jsx_runtime = require_jsx_runtime();
function Header({ showHome }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "site-header",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "site-header__brand",
			children: "0000.com.ar"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
			className: "site-header__nav",
			"aria-label": "Primary",
			children: [showHome && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				children: "Home"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "https://blog.0000.com.ar",
				children: "Blog"
			})]
		})]
	});
}
function About() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, { showHome: true }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "ABOUT" })] });
}
//#endregion
export { About as component };
