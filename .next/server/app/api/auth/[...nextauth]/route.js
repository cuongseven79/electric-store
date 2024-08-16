"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/auth/[...nextauth]/route";
exports.ids = ["app/api/auth/[...nextauth]/route"];
exports.modules = {

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ "../../client/components/action-async-storage.external":
/*!*******************************************************************************!*\
  !*** external "next/dist/client/components/action-async-storage.external.js" ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/action-async-storage.external.js");

/***/ }),

/***/ "../../client/components/request-async-storage.external":
/*!********************************************************************************!*\
  !*** external "next/dist/client/components/request-async-storage.external.js" ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/request-async-storage.external.js");

/***/ }),

/***/ "../../client/components/static-generation-async-storage.external":
/*!******************************************************************************************!*\
  !*** external "next/dist/client/components/static-generation-async-storage.external.js" ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/static-generation-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("assert");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("events");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("querystring");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("zlib");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=%2FUsers%2Fcuongseven%2FDesktop%2Felectric-store%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fcuongseven%2FDesktop%2Felectric-store&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=%2FUsers%2Fcuongseven%2FDesktop%2Felectric-store%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fcuongseven%2FDesktop%2Felectric-store&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_cuongseven_Desktop_electric_store_app_api_auth_nextauth_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/auth/[...nextauth]/route.ts */ \"(rsc)/./app/api/auth/[...nextauth]/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/auth/[...nextauth]/route\",\n        pathname: \"/api/auth/[...nextauth]\",\n        filename: \"route\",\n        bundlePath: \"app/api/auth/[...nextauth]/route\"\n    },\n    resolvedPagePath: \"/Users/cuongseven/Desktop/electric-store/app/api/auth/[...nextauth]/route.ts\",\n    nextConfigOutput,\n    userland: _Users_cuongseven_Desktop_electric_store_app_api_auth_nextauth_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/auth/[...nextauth]/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZhdXRoJTJGJTVCLi4ubmV4dGF1dGglNUQlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmF1dGglMkYlNUIuLi5uZXh0YXV0aCU1RCUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmF1dGglMkYlNUIuLi5uZXh0YXV0aCU1RCUyRnJvdXRlLnRzJmFwcERpcj0lMkZVc2VycyUyRmN1b25nc2V2ZW4lMkZEZXNrdG9wJTJGZWxlY3RyaWMtc3RvcmUlMkZhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPSUyRlVzZXJzJTJGY3VvbmdzZXZlbiUyRkRlc2t0b3AlMkZlbGVjdHJpYy1zdG9yZSZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQXNHO0FBQ3ZDO0FBQ2M7QUFDNEI7QUFDekc7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGdIQUFtQjtBQUMzQztBQUNBLGNBQWMseUVBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxpRUFBaUU7QUFDekU7QUFDQTtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUN1SDs7QUFFdkgiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vP2Y2YjMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiL1VzZXJzL2N1b25nc2V2ZW4vRGVza3RvcC9lbGVjdHJpYy1zdG9yZS9hcHAvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdXCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS9hdXRoL1suLi5uZXh0YXV0aF0vcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCIvVXNlcnMvY3VvbmdzZXZlbi9EZXNrdG9wL2VsZWN0cmljLXN0b3JlL2FwcC9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdL3JvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgcmVxdWVzdEFzeW5jU3RvcmFnZSwgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuY29uc3Qgb3JpZ2luYWxQYXRobmFtZSA9IFwiL2FwaS9hdXRoL1suLi5uZXh0YXV0aF0vcm91dGVcIjtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgc2VydmVySG9va3MsXG4gICAgICAgIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCByZXF1ZXN0QXN5bmNTdG9yYWdlLCBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgb3JpZ2luYWxQYXRobmFtZSwgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=%2FUsers%2Fcuongseven%2FDesktop%2Felectric-store%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fcuongseven%2FDesktop%2Felectric-store&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./app/api/auth/[...nextauth]/route.ts":
/*!*********************************************!*\
  !*** ./app/api/auth/[...nextauth]/route.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ handler),\n/* harmony export */   POST: () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var _auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/auth */ \"(rsc)/./auth.ts\");\n/* harmony import */ var next_auth_next__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/next */ \"(rsc)/./node_modules/next-auth/next/index.js\");\n\n\nconst handler = (0,next_auth_next__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(_auth__WEBPACK_IMPORTED_MODULE_0__.authOptions);\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQXFDO0FBQ0M7QUFFdEMsTUFBTUUsVUFBVUQsMERBQVFBLENBQUNELDhDQUFXQTtBQUNPIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vYXBwL2FwaS9hdXRoL1suLi5uZXh0YXV0aF0vcm91dGUudHM/YzhhNCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBhdXRoT3B0aW9ucyB9IGZyb20gJ0AvYXV0aCc7XG5pbXBvcnQgTmV4dEF1dGggZnJvbSAnbmV4dC1hdXRoL25leHQnO1xuXG5jb25zdCBoYW5kbGVyID0gTmV4dEF1dGgoYXV0aE9wdGlvbnMpO1xuZXhwb3J0IHsgaGFuZGxlciBhcyBHRVQsIGhhbmRsZXIgYXMgUE9TVCB9O1xuIl0sIm5hbWVzIjpbImF1dGhPcHRpb25zIiwiTmV4dEF1dGgiLCJoYW5kbGVyIiwiR0VUIiwiUE9TVCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/auth/[...nextauth]/route.ts\n");

/***/ }),

/***/ "(rsc)/./auth.ts":
/*!*****************!*\
  !*** ./auth.ts ***!
  \*****************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   authOptions: () => (/* binding */ authOptions)\n/* harmony export */ });\n/* harmony import */ var _lib_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/lib/api */ \"(rsc)/./lib/api.ts\");\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/providers/credentials */ \"(rsc)/./node_modules/next-auth/providers/credentials.js\");\n/* harmony import */ var next_auth_providers_google__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next-auth/providers/google */ \"(rsc)/./node_modules/next-auth/providers/google.js\");\n/* harmony import */ var _auth_prisma_adapter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @auth/prisma-adapter */ \"(rsc)/./node_modules/@auth/prisma-adapter/index.js\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! zod */ \"(rsc)/./node_modules/zod/lib/index.mjs\");\n\n\n\n\n\n\nconst prisma = new _prisma_client__WEBPACK_IMPORTED_MODULE_4__.PrismaClient();\nconst authOptions = {\n    secret: process.env.NEXTAUTH_SECRET,\n    providers: [\n        (0,next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1__[\"default\"])({\n            name: \"credentials\",\n            credentials: {\n                email: {\n                    label: \"Email\",\n                    type: \"text\"\n                },\n                password: {\n                    label: \"Password\",\n                    type: \"password\"\n                }\n            },\n            async authorize (credentials) {\n                const parsedCredentials = zod__WEBPACK_IMPORTED_MODULE_5__.z.object({\n                    email: zod__WEBPACK_IMPORTED_MODULE_5__.z.string(),\n                    password: zod__WEBPACK_IMPORTED_MODULE_5__.z.string().min(4)\n                }).safeParse(credentials);\n                if (parsedCredentials.success) {\n                    const res = await (0,_lib_api__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(\"/api/login\", {\n                        method: \"POST\",\n                        headers: {\n                            \"Content-Type\": \"application/json\"\n                        },\n                        body: JSON.stringify({\n                            email: credentials.email,\n                            password: credentials.password\n                        })\n                    });\n                    if (res?.message) {\n                        throw new Error(\"Login Failed\");\n                    }\n                    if (res) {\n                        return res;\n                    } else {\n                        return null;\n                    }\n                }\n                return null;\n            }\n        }),\n        (0,next_auth_providers_google__WEBPACK_IMPORTED_MODULE_2__[\"default\"])({\n            clientId: \"1071328933627-krcgpia6gumrdtktlb2pe9svem5qoe8j.apps.googleusercontent.com\",\n            clientSecret: \"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\",\n            authorization: {\n                params: {\n                    prompt: \"consent\",\n                    access_type: \"offline\",\n                    response_type: \"code\"\n                }\n            }\n        })\n    ],\n    adapter: (0,_auth_prisma_adapter__WEBPACK_IMPORTED_MODULE_3__.PrismaAdapter)(prisma),\n    // debug: true,\n    session: {\n        strategy: \"jwt\"\n    },\n    callbacks: {\n        async session ({ session, token, user }) {\n            if (session.user) {\n                session.user.accessToken = token.accessToken;\n                session.user = {\n                    ...session.user,\n                    ...token\n                };\n                session.token = token.accessToken;\n                // session.provider = token.provider;\n                session.user.role = token.role;\n                session.user.name = token.fullname || token.name;\n                session.user.image = token.image || token.picture;\n            }\n            return session;\n        },\n        async jwt ({ token, user, account, profile }) {\n            if (account?.provider && account.provider === \"google\") {\n                token.role = \"USER\";\n                token.accessToken = account.access_token; // Store access token in JWT\n            }\n            return {\n                ...token,\n                ...user,\n                ...profile\n            };\n        }\n    }\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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ZWJwYWNrOi8vLy4vYXV0aC50cz85MjM4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBhcGkgZnJvbSAnQC9saWIvYXBpJztcbmltcG9ydCBOZXh0QXV0aCwgeyBVc2VyLCBOZXh0QXV0aENvbmZpZywgQXV0aE9wdGlvbnMgfSBmcm9tICduZXh0LWF1dGgnO1xuaW1wb3J0IENyZWRlbnRpYWxzIGZyb20gJ25leHQtYXV0aC9wcm92aWRlcnMvY3JlZGVudGlhbHMnO1xuaW1wb3J0IEdvb2dsZVByb3ZpZGVyIGZyb20gJ25leHQtYXV0aC9wcm92aWRlcnMvZ29vZ2xlJztcbmltcG9ydCB7IFByaXNtYUFkYXB0ZXIgfSBmcm9tICdAYXV0aC9wcmlzbWEtYWRhcHRlcic7XG5pbXBvcnQgeyBQcmlzbWFDbGllbnQgfSBmcm9tICdAcHJpc21hL2NsaWVudCc7XG5pbXBvcnQgeyB6IH0gZnJvbSAnem9kJztcblxuY29uc3QgcHJpc21hID0gbmV3IFByaXNtYUNsaWVudCgpO1xuZXhwb3J0IGNvbnN0IGF1dGhPcHRpb25zOiBBdXRoT3B0aW9ucyA9IHtcbiAgc2VjcmV0OiBwcm9jZXNzLmVudi5ORVhUQVVUSF9TRUNSRVQsXG4gIHByb3ZpZGVyczogW1xuICAgIENyZWRlbnRpYWxzKHtcbiAgICAgIG5hbWU6ICdjcmVkZW50aWFscycsXG4gICAgICBjcmVkZW50aWFsczoge1xuICAgICAgICBlbWFpbDogeyBsYWJlbDogJ0VtYWlsJywgdHlwZTogJ3RleHQnIH0sXG4gICAgICAgIHBhc3N3b3JkOiB7IGxhYmVsOiAnUGFzc3dvcmQnLCB0eXBlOiAncGFzc3dvcmQnIH0sXG4gICAgICB9LFxuICAgICAgYXN5bmMgYXV0aG9yaXplKGNyZWRlbnRpYWxzKTogUHJvbWlzZTxhbnkgfCBudWxsPiB7XG4gICAgICAgIGNvbnN0IHBhcnNlZENyZWRlbnRpYWxzID0gelxuICAgICAgICAgIC5vYmplY3QoeyBlbWFpbDogei5zdHJpbmcoKSwgcGFzc3dvcmQ6IHouc3RyaW5nKCkubWluKDQpIH0pXG4gICAgICAgICAgLnNhZmVQYXJzZShjcmVkZW50aWFscyk7XG5cbiAgICAgICAgaWYgKHBhcnNlZENyZWRlbnRpYWxzLnN1Y2Nlc3MpIHtcbiAgICAgICAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkoJy9hcGkvbG9naW4nLCB7XG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgIGhlYWRlcnM6IHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9LFxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICBlbWFpbDogY3JlZGVudGlhbHMuZW1haWwsXG4gICAgICAgICAgICAgIHBhc3N3b3JkOiBjcmVkZW50aWFscy5wYXNzd29yZCxcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgaWYgKHJlcz8ubWVzc2FnZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdMb2dpbiBGYWlsZWQnKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAocmVzKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9LFxuICAgIH0pLFxuICAgIEdvb2dsZVByb3ZpZGVyKHtcbiAgICAgIGNsaWVudElkOiBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19HT09HTEVfQ0xJRU5UX0lELFxuICAgICAgY2xpZW50U2VjcmV0OiBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19HT09HTEVfQ0xJRU5UX1NFQ1JFVCxcbiAgICAgIGF1dGhvcml6YXRpb246IHtcbiAgICAgICAgcGFyYW1zOiB7XG4gICAgICAgICAgcHJvbXB0OiAnY29uc2VudCcsXG4gICAgICAgICAgYWNjZXNzX3R5cGU6ICdvZmZsaW5lJyxcbiAgICAgICAgICByZXNwb25zZV90eXBlOiAnY29kZScsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0pLFxuICBdLFxuICBhZGFwdGVyOiBQcmlzbWFBZGFwdGVyKHByaXNtYSksXG4gIC8vIGRlYnVnOiB0cnVlLFxuICBzZXNzaW9uOiB7XG4gICAgc3RyYXRlZ3k6ICdqd3QnLFxuICB9LFxuICBjYWxsYmFja3M6IHtcbiAgICBhc3luYyBzZXNzaW9uKHsgc2Vzc2lvbiwgdG9rZW4sIHVzZXIgfSkge1xuICAgICAgaWYgKHNlc3Npb24udXNlcikge1xuICAgICAgICBzZXNzaW9uLnVzZXIuYWNjZXNzVG9rZW4gPSB0b2tlbi5hY2Nlc3NUb2tlbjtcbiAgICAgICAgc2Vzc2lvbi51c2VyID0geyAuLi5zZXNzaW9uLnVzZXIsIC4uLnRva2VuIH07XG4gICAgICAgIHNlc3Npb24udG9rZW4gPSB0b2tlbi5hY2Nlc3NUb2tlbjtcbiAgICAgICAgLy8gc2Vzc2lvbi5wcm92aWRlciA9IHRva2VuLnByb3ZpZGVyO1xuICAgICAgICBzZXNzaW9uLnVzZXIucm9sZSA9IHRva2VuLnJvbGU7XG4gICAgICAgIHNlc3Npb24udXNlci5uYW1lID0gdG9rZW4uZnVsbG5hbWUgfHwgdG9rZW4ubmFtZTtcbiAgICAgICAgc2Vzc2lvbi51c2VyLmltYWdlID0gdG9rZW4uaW1hZ2UgfHwgdG9rZW4ucGljdHVyZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzZXNzaW9uO1xuICAgIH0sXG4gICAgYXN5bmMgand0KHsgdG9rZW4sIHVzZXIsIGFjY291bnQsIHByb2ZpbGUgfSkge1xuICAgICAgaWYgKGFjY291bnQ/LnByb3ZpZGVyICYmIGFjY291bnQucHJvdmlkZXIgPT09ICdnb29nbGUnKSB7XG4gICAgICAgIHRva2VuLnJvbGUgPSAnVVNFUic7XG4gICAgICAgIHRva2VuLmFjY2Vzc1Rva2VuID0gYWNjb3VudC5hY2Nlc3NfdG9rZW47IC8vIFN0b3JlIGFjY2VzcyB0b2tlbiBpbiBKV1RcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHsgLi4udG9rZW4sIC4uLnVzZXIsIC4uLnByb2ZpbGUgfTtcbiAgICB9LFxuICB9LFxufTtcbiJdLCJuYW1lcyI6WyJhcGkiLCJDcmVkZW50aWFscyIsIkdvb2dsZVByb3ZpZGVyIiwiUHJpc21hQWRhcHRlciIsIlByaXNtYUNsaWVudCIsInoiLCJwcmlzbWEiLCJhdXRoT3B0aW9ucyIsInNlY3JldCIsInByb2Nlc3MiLCJlbnYiLCJORVhUQVVUSF9TRUNSRVQiLCJwcm92aWRlcnMiLCJuYW1lIiwiY3JlZGVudGlhbHMiLCJlbWFpbCIsImxhYmVsIiwidHlwZSIsInBhc3N3b3JkIiwiYXV0aG9yaXplIiwicGFyc2VkQ3JlZGVudGlhbHMiLCJvYmplY3QiLCJzdHJpbmciLCJtaW4iLCJzYWZlUGFyc2UiLCJzdWNjZXNzIiwicmVzIiwibWV0aG9kIiwiaGVhZGVycyIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5IiwibWVzc2FnZSIsIkVycm9yIiwiY2xpZW50SWQiLCJORVhUX1BVQkxJQ19HT09HTEVfQ0xJRU5UX0lEIiwiY2xpZW50U2VjcmV0IiwiTkVYVF9QVUJMSUNfR09PR0xFX0NMSUVOVF9TRUNSRVQiLCJhdXRob3JpemF0aW9uIiwicGFyYW1zIiwicHJvbXB0IiwiYWNjZXNzX3R5cGUiLCJyZXNwb25zZV90eXBlIiwiYWRhcHRlciIsInNlc3Npb24iLCJzdHJhdGVneSIsImNhbGxiYWNrcyIsInRva2VuIiwidXNlciIsImFjY2Vzc1Rva2VuIiwicm9sZSIsImZ1bGxuYW1lIiwiaW1hZ2UiLCJwaWN0dXJlIiwiand0IiwiYWNjb3VudCIsInByb2ZpbGUiLCJwcm92aWRlciIsImFjY2Vzc190b2tlbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./auth.ts\n");

/***/ }),

/***/ "(rsc)/./lib/api.ts":
/*!********************!*\
  !*** ./lib/api.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ api)\n/* harmony export */ });\nasync function api(input, init, token) {\n    let cfg = {\n        ...init,\n        cache: \"no-store\"\n    };\n    if (token) {\n        cfg = {\n            ...cfg,\n            headers: {\n                Authorization: `Bearer ${token}`\n            }\n        };\n    }\n    try {\n        const resp = await fetch(`${\"http://localhost:3000\"}${input}`, cfg);\n        const data = await resp.json();\n        if (!resp.ok) {\n            throw new Error(data.message);\n        }\n        return data;\n    } catch (e) {\n        throw Error(e);\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvYXBpLnRzIiwibWFwcGluZ3MiOiI7Ozs7QUFTZSxlQUFlQSxJQUM1QkMsS0FBd0IsRUFDeEJDLElBQWtCLEVBQ2xCQyxLQUFjO0lBRWQsSUFBSUMsTUFBbUI7UUFBRSxHQUFHRixJQUFJO1FBQUVHLE9BQU87SUFBVztJQUNwRCxJQUFJRixPQUFPO1FBQ1RDLE1BQU07WUFBRSxHQUFHQSxHQUFHO1lBQUVFLFNBQVM7Z0JBQUVDLGVBQWUsQ0FBQyxPQUFPLEVBQUVKLE1BQU0sQ0FBQztZQUFDO1FBQUU7SUFDaEU7SUFDQSxJQUFJO1FBQ0YsTUFBTUssT0FBTyxNQUFNQyxNQUFNLENBQUMsRUFBRUMsdUJBQStCLENBQUMsRUFBRVQsTUFBTSxDQUFDLEVBQUVHO1FBRXZFLE1BQU1TLE9BQU8sTUFBTUwsS0FBS00sSUFBSTtRQUM1QixJQUFJLENBQUNOLEtBQUtPLEVBQUUsRUFBRTtZQUNaLE1BQU0sSUFBSUMsTUFBTUgsS0FBS0ksT0FBTztRQUM5QjtRQUNBLE9BQU9KO0lBQ1QsRUFBRSxPQUFPSyxHQUFHO1FBQ1YsTUFBTUYsTUFBTUU7SUFDZDtBQUNGIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vbGliL2FwaS50cz82OGExIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHRocm93cyB9IGZyb20gJ2Fzc2VydCc7XG5pbXBvcnQgeyBnZXRTZXNzaW9uLCB1c2VTZXNzaW9uIH0gZnJvbSAnbmV4dC1hdXRoL3JlYWN0JztcbmltcG9ydCB7IFpvZEVycm9yLCBab2RJc3N1ZSB9IGZyb20gJ3pvZCc7XG5cbmV4cG9ydCB0eXBlIEVycm9yUmVzcG9uc2UgPSB7XG4gIG1lc3NhZ2U6IHN0cmluZztcbiAgZXJyb3JzPzogUmVjb3JkPHN0cmluZywgc3RyaW5nW10+O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24gYXBpKFxuICBpbnB1dDogUmVxdWVzdEluZm8gfCBVUkwsXG4gIGluaXQ/OiBSZXF1ZXN0SW5pdCxcbiAgdG9rZW4/OiBzdHJpbmcsXG4pOiBQcm9taXNlPGFueSB8IEVycm9yUmVzcG9uc2U+IHtcbiAgbGV0IGNmZzogUmVxdWVzdEluaXQgPSB7IC4uLmluaXQsIGNhY2hlOiAnbm8tc3RvcmUnIH07XG4gIGlmICh0b2tlbikge1xuICAgIGNmZyA9IHsgLi4uY2ZnLCBoZWFkZXJzOiB7IEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHt0b2tlbn1gIH0gfTtcbiAgfVxuICB0cnkge1xuICAgIGNvbnN0IHJlc3AgPSBhd2FpdCBmZXRjaChgJHtwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19BUElfVVJMfSR7aW5wdXR9YCwgY2ZnKTtcblxuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwLmpzb24oKTtcbiAgICBpZiAoIXJlc3Aub2spIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihkYXRhLm1lc3NhZ2UpO1xuICAgIH1cbiAgICByZXR1cm4gZGF0YTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHRocm93IEVycm9yKGUpO1xuICB9XG59XG4iXSwibmFtZXMiOlsiYXBpIiwiaW5wdXQiLCJpbml0IiwidG9rZW4iLCJjZmciLCJjYWNoZSIsImhlYWRlcnMiLCJBdXRob3JpemF0aW9uIiwicmVzcCIsImZldGNoIiwicHJvY2VzcyIsImVudiIsIk5FWFRfUFVCTElDX0FQSV9VUkwiLCJkYXRhIiwianNvbiIsIm9rIiwiRXJyb3IiLCJtZXNzYWdlIiwiZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/api.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/next-auth","vendor-chunks/@babel","vendor-chunks/zod","vendor-chunks/openid-client","vendor-chunks/uuid","vendor-chunks/oauth","vendor-chunks/@panva","vendor-chunks/yallist","vendor-chunks/preact-render-to-string","vendor-chunks/oidc-token-hash","vendor-chunks/@auth","vendor-chunks/preact","vendor-chunks/lru-cache"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=%2FUsers%2Fcuongseven%2FDesktop%2Felectric-store%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fcuongseven%2FDesktop%2Felectric-store&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();