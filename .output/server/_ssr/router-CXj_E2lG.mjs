import { a as createRouter, c as createFileRoute, d as require_jsx_runtime, l as createRootRoute, n as Scripts, o as Outlet, r as HeadContent, s as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-CXj_E2lG.js
var import_jsx_runtime = require_jsx_runtime();
var Route$3 = createRootRoute({
	head: () => ({ meta: [
		{ charSet: "utf-8" },
		{
			name: "viewport",
			content: "width=device-width, initial-scale=1"
		},
		{ title: "0000.com.ar" }
	] }),
	component: RootComponent
});
function RootComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RootDocument, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) });
}
function RootDocument({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("head", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("link", {
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", {
				async: true,
				src: "https://www.googletagmanager.com/gtag/js?id=G-LDF17VT6YS"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", { dangerouslySetInnerHTML: { __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-LDF17VT6YS');
            ` } })
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
var $$splitComponentImporter$2 = () => import("./portfolio-b3EJMdBk.mjs");
var Route$2 = createFileRoute("/portfolio")({
	head: () => ({ meta: [{ title: "Portfolio | 0000" }, {
		name: "description",
		content: "Selected work by Maximiliano Cespedes."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./about-CVB1RpiS.mjs");
var Route$1 = createFileRoute("/about")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./routes-BMYQLTv3.mjs");
var Route = createFileRoute("/")({
	head: () => ({ meta: [{ title: "0000.com.ar" }, {
		name: "description",
		content: "Maximiliano Céspedes. Product engineer and independent builder."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var PortfolioRoute = Route$2.update({
	id: "/portfolio",
	path: "/portfolio",
	getParentRoute: () => Route$3
});
var AboutRoute = Route$1.update({
	id: "/about",
	path: "/about",
	getParentRoute: () => Route$3
});
var rootRouteChildren = {
	IndexRoute: Route.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$3
	}),
	AboutRoute,
	PortfolioRoute
};
var routeTree = Route$3._addFileChildren(rootRouteChildren)._addFileTypes();
function getRouter() {
	return createRouter({ routeTree });
}
//#endregion
export { getRouter };
