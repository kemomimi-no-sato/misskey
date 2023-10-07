// vite.config.ts
import path from "path";
import pluginReplace from "file:///home/misskey/misskey/node_modules/.pnpm/@rollup+plugin-replace@5.0.3_rollup@4.0.0/node_modules/@rollup/plugin-replace/dist/es/index.js";
import pluginVue from "file:///home/misskey/misskey/node_modules/.pnpm/@vitejs+plugin-vue@4.4.0_vite@4.4.11_vue@3.3.4/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import { defineConfig } from "file:///home/misskey/misskey/node_modules/.pnpm/vite@4.4.11_@types+node@20.8.2_sass@1.69.0_terser@5.21.0/node_modules/vite/dist/node/index.js";
import ReactivityTransform from "file:///home/misskey/misskey/node_modules/.pnpm/@vue-macros+reactivity-transform@0.3.23_rollup@4.0.0_vue@3.3.4/node_modules/@vue-macros/reactivity-transform/dist/vite.mjs";

// ../../locales/index.js
import * as fs from "node:fs";
import * as yaml from "file:///home/misskey/misskey/node_modules/.pnpm/js-yaml@4.1.0/node_modules/js-yaml/dist/js-yaml.mjs";
var __vite_injected_original_import_meta_url = "file:///home/misskey/misskey/locales/index.js";
var merge = (...args) => args.reduce((a, c) => ({
  ...a,
  ...c,
  ...Object.entries(a).filter(([k]) => c && typeof c[k] === "object").reduce((a2, [k, v]) => (a2[k] = merge(v, c[k]), a2), {})
}), {});
var languages = [
  "ar-SA",
  "cs-CZ",
  "da-DK",
  "de-DE",
  "en-US",
  "es-ES",
  "fr-FR",
  "id-ID",
  "it-IT",
  "ja-JP",
  "ja-KS",
  "kab-KAB",
  "kn-IN",
  "ko-KR",
  "nl-NL",
  "no-NO",
  "pl-PL",
  "pt-PT",
  "ru-RU",
  "sk-SK",
  "th-TH",
  "ug-CN",
  "uk-UA",
  "vi-VN",
  "zh-CN",
  "zh-TW"
];
var primaries = {
  "en": "US",
  "ja": "JP",
  "zh": "CN"
};
var clean = (text) => text.replace(new RegExp(String.fromCodePoint(8), "g"), "");
var locales = languages.reduce((a, c) => (a[c] = yaml.load(clean(fs.readFileSync(new URL(`${c}.yml`, __vite_injected_original_import_meta_url), "utf-8"))) || {}, a), {});
var locales_default = Object.entries(locales).reduce((a, [k, v]) => (a[k] = (() => {
  const [lang] = k.split("-");
  switch (k) {
    case "ja-JP":
      return v;
    case "ja-KS":
    case "en-US":
      return merge(locales["ja-JP"], v);
    default:
      return merge(
        locales["ja-JP"],
        locales["en-US"],
        locales[`${lang}-${primaries[lang]}`] || {},
        v
      );
  }
})(), a), {});

// ../../package.json
var package_default = {
  name: "misskey",
  version: "2023.10.0-beta.7",
  codename: "nasubi",
  repository: {
    type: "git",
    url: "https://github.com/misskey-dev/misskey.git"
  },
  packageManager: "pnpm@8.8.0",
  workspaces: [
    "packages/frontend",
    "packages/backend",
    "packages/sw"
  ],
  private: true,
  scripts: {
    "build-pre": "node ./scripts/build-pre.js",
    "build-assets": "node ./scripts/build-assets.mjs",
    build: "pnpm build-pre && pnpm -r build && pnpm build-assets",
    "build-storybook": "pnpm --filter frontend build-storybook",
    start: "pnpm check:connect && cd packages/backend && node ./built/boot/entry.js",
    "start:test": "cd packages/backend && cross-env NODE_ENV=test node ./built/boot/entry.js",
    init: "pnpm migrate",
    migrate: "cd packages/backend && pnpm migrate",
    "check:connect": "cd packages/backend && pnpm check:connect",
    migrateandstart: "pnpm migrate && pnpm start",
    watch: "pnpm dev",
    dev: "node ./scripts/dev.mjs",
    lint: "pnpm -r lint",
    "cy:open": "pnpm cypress open --browser --e2e --config-file=cypress.config.ts",
    "cy:run": "pnpm cypress run",
    e2e: "pnpm start-server-and-test start:test http://localhost:61812 cy:run",
    jest: "cd packages/backend && pnpm jest",
    "jest-and-coverage": "cd packages/backend && pnpm jest-and-coverage",
    test: "pnpm -r test",
    "test-and-coverage": "pnpm -r test-and-coverage",
    clean: "node ./scripts/clean.js",
    "clean-all": "node ./scripts/clean-all.js",
    cleanall: "pnpm clean-all"
  },
  resolutions: {
    chokidar: "3.5.3",
    lodash: "4.17.21"
  },
  dependencies: {
    execa: "8.0.1",
    cssnano: "6.0.1",
    "js-yaml": "4.1.0",
    postcss: "8.4.31",
    terser: "5.21.0",
    typescript: "5.2.2"
  },
  devDependencies: {
    "@typescript-eslint/eslint-plugin": "6.7.4",
    "@typescript-eslint/parser": "6.7.4",
    "cross-env": "7.0.3",
    cypress: "13.3.0",
    eslint: "8.50.0",
    "start-server-and-test": "2.0.1"
  },
  optionalDependencies: {
    "@tensorflow/tfjs-core": "4.4.0"
  }
};

// lib/rollup-plugin-unwind-css-module-class-name.ts
import { generate } from "file:///home/misskey/misskey/node_modules/.pnpm/astring@1.8.6/node_modules/astring/dist/astring.mjs";

// ../../node_modules/.pnpm/estree-walker@3.0.3/node_modules/estree-walker/src/walker.js
var WalkerBase = class {
  constructor() {
    this.should_skip = false;
    this.should_remove = false;
    this.replacement = null;
    this.context = {
      skip: () => this.should_skip = true,
      remove: () => this.should_remove = true,
      replace: (node) => this.replacement = node
    };
  }
  /**
   * @template {Node} Parent
   * @param {Parent | null | undefined} parent
   * @param {keyof Parent | null | undefined} prop
   * @param {number | null | undefined} index
   * @param {Node} node
   */
  replace(parent, prop, index, node) {
    if (parent && prop) {
      if (index != null) {
        parent[prop][index] = node;
      } else {
        parent[prop] = node;
      }
    }
  }
  /**
   * @template {Node} Parent
   * @param {Parent | null | undefined} parent
   * @param {keyof Parent | null | undefined} prop
   * @param {number | null | undefined} index
   */
  remove(parent, prop, index) {
    if (parent && prop) {
      if (index !== null && index !== void 0) {
        parent[prop].splice(index, 1);
      } else {
        delete parent[prop];
      }
    }
  }
};

// ../../node_modules/.pnpm/estree-walker@3.0.3/node_modules/estree-walker/src/sync.js
var SyncWalker = class extends WalkerBase {
  /**
   *
   * @param {SyncHandler} [enter]
   * @param {SyncHandler} [leave]
   */
  constructor(enter, leave) {
    super();
    this.should_skip = false;
    this.should_remove = false;
    this.replacement = null;
    this.context = {
      skip: () => this.should_skip = true,
      remove: () => this.should_remove = true,
      replace: (node) => this.replacement = node
    };
    this.enter = enter;
    this.leave = leave;
  }
  /**
   * @template {Node} Parent
   * @param {Node} node
   * @param {Parent | null} parent
   * @param {keyof Parent} [prop]
   * @param {number | null} [index]
   * @returns {Node | null}
   */
  visit(node, parent, prop, index) {
    if (node) {
      if (this.enter) {
        const _should_skip = this.should_skip;
        const _should_remove = this.should_remove;
        const _replacement = this.replacement;
        this.should_skip = false;
        this.should_remove = false;
        this.replacement = null;
        this.enter.call(this.context, node, parent, prop, index);
        if (this.replacement) {
          node = this.replacement;
          this.replace(parent, prop, index, node);
        }
        if (this.should_remove) {
          this.remove(parent, prop, index);
        }
        const skipped = this.should_skip;
        const removed = this.should_remove;
        this.should_skip = _should_skip;
        this.should_remove = _should_remove;
        this.replacement = _replacement;
        if (skipped)
          return node;
        if (removed)
          return null;
      }
      let key;
      for (key in node) {
        const value = node[key];
        if (value && typeof value === "object") {
          if (Array.isArray(value)) {
            const nodes = (
              /** @type {Array<unknown>} */
              value
            );
            for (let i = 0; i < nodes.length; i += 1) {
              const item = nodes[i];
              if (isNode(item)) {
                if (!this.visit(item, node, key, i)) {
                  i--;
                }
              }
            }
          } else if (isNode(value)) {
            this.visit(value, node, key, null);
          }
        }
      }
      if (this.leave) {
        const _replacement = this.replacement;
        const _should_remove = this.should_remove;
        this.replacement = null;
        this.should_remove = false;
        this.leave.call(this.context, node, parent, prop, index);
        if (this.replacement) {
          node = this.replacement;
          this.replace(parent, prop, index, node);
        }
        if (this.should_remove) {
          this.remove(parent, prop, index);
        }
        const removed = this.should_remove;
        this.replacement = _replacement;
        this.should_remove = _should_remove;
        if (removed)
          return null;
      }
    }
    return node;
  }
};
function isNode(value) {
  return value !== null && typeof value === "object" && "type" in value && typeof value.type === "string";
}

// ../../node_modules/.pnpm/estree-walker@3.0.3/node_modules/estree-walker/src/index.js
function walk(ast, { enter, leave }) {
  const instance = new SyncWalker(enter, leave);
  return instance.visit(ast, null);
}

// lib/rollup-plugin-unwind-css-module-class-name.ts
function isFalsyIdentifier(identifier) {
  return identifier.name === "undefined" || identifier.name === "NaN";
}
function normalizeClassWalker(tree) {
  if (tree.type === "Identifier")
    return isFalsyIdentifier(tree) ? "" : null;
  if (tree.type === "Literal")
    return typeof tree.value === "string" ? tree.value : "";
  if (tree.type === "BinaryExpression") {
    if (tree.operator !== "+")
      return null;
    const left = normalizeClassWalker(tree.left);
    const right = normalizeClassWalker(tree.right);
    if (left === null || right === null)
      return null;
    return `${left}${right}`;
  }
  if (tree.type === "TemplateLiteral") {
    if (tree.expressions.some((x) => x.type !== "Literal" && (x.type !== "Identifier" || !isFalsyIdentifier(x))))
      return null;
    return tree.quasis.reduce((a, c, i) => {
      const v = i === tree.quasis.length - 1 ? "" : tree.expressions[i].value;
      return a + c.value.raw + (typeof v === "string" ? v : "");
    }, "");
  }
  if (tree.type === "ArrayExpression") {
    const values = tree.elements.map((treeNode) => {
      if (treeNode === null)
        return "";
      if (treeNode.type === "SpreadElement")
        return normalizeClassWalker(treeNode.argument);
      return normalizeClassWalker(treeNode);
    });
    if (values.some((x) => x === null))
      return null;
    return values.join(" ");
  }
  if (tree.type === "ObjectExpression") {
    const values = tree.properties.map((treeNode) => {
      if (treeNode.type === "SpreadElement")
        return normalizeClassWalker(treeNode.argument);
      let x = treeNode.value;
      let inveted = false;
      while (x.type === "UnaryExpression" && x.operator === "!") {
        x = x.argument;
        inveted = !inveted;
      }
      if (x.type === "Literal") {
        if (inveted === !x.value) {
          return treeNode.key.type === "Identifier" ? treeNode.computed ? null : treeNode.key.name : treeNode.key.type === "Literal" ? treeNode.key.value : "";
        } else {
          return "";
        }
      }
      if (x.type === "Identifier") {
        if (inveted !== isFalsyIdentifier(x)) {
          return "";
        } else {
          return null;
        }
      }
      return null;
    });
    if (values.some((x) => x === null))
      return null;
    return values.join(" ");
  }
  console.error(`Unexpected node type: ${tree.type}`);
  return null;
}
function normalizeClass(tree) {
  const walked = normalizeClassWalker(tree);
  return walked && walked.replace(/^\s+|\s+(?=\s)|\s+$/g, "");
}
function unwindCssModuleClassName(ast) {
  walk(ast, {
    enter(node, parent) {
      var _a, _b, _c, _d;
      if ((parent == null ? void 0 : parent.type) !== "Program")
        return;
      if (node.type !== "VariableDeclaration")
        return;
      if (node.declarations.length !== 1)
        return;
      if (node.declarations[0].id.type !== "Identifier")
        return;
      const name = node.declarations[0].id.name;
      if (((_a = node.declarations[0].init) == null ? void 0 : _a.type) !== "CallExpression")
        return;
      if (node.declarations[0].init.callee.type !== "Identifier")
        return;
      if (node.declarations[0].init.callee.name !== "_export_sfc")
        return;
      if (node.declarations[0].init.arguments.length !== 2)
        return;
      if (node.declarations[0].init.arguments[0].type !== "Identifier")
        return;
      const ident = node.declarations[0].init.arguments[0].name;
      if (!ident.startsWith("_sfc_main"))
        return;
      if (node.declarations[0].init.arguments[1].type !== "ArrayExpression")
        return;
      if (node.declarations[0].init.arguments[1].elements.length === 0)
        return;
      const __cssModulesIndex = node.declarations[0].init.arguments[1].elements.findIndex((x) => {
        var _a2, _b2;
        if ((x == null ? void 0 : x.type) !== "ArrayExpression")
          return false;
        if (x.elements.length !== 2)
          return false;
        if (((_a2 = x.elements[0]) == null ? void 0 : _a2.type) !== "Literal")
          return false;
        if (x.elements[0].value !== "__cssModules")
          return false;
        if (((_b2 = x.elements[1]) == null ? void 0 : _b2.type) !== "Identifier")
          return false;
        return true;
      });
      if (!~__cssModulesIndex)
        return;
      const cssModuleForestName = node.declarations[0].init.arguments[1].elements[__cssModulesIndex].elements[1].name;
      const cssModuleForestNode = parent.body.find((x) => {
        var _a2;
        if (x.type !== "VariableDeclaration")
          return false;
        if (x.declarations.length !== 1)
          return false;
        if (x.declarations[0].id.type !== "Identifier")
          return false;
        if (x.declarations[0].id.name !== cssModuleForestName)
          return false;
        if (((_a2 = x.declarations[0].init) == null ? void 0 : _a2.type) !== "ObjectExpression")
          return false;
        return true;
      });
      const moduleForest = new Map(cssModuleForestNode.declarations[0].init.properties.flatMap((property) => {
        if (property.type !== "Property")
          return [];
        if (property.key.type !== "Literal")
          return [];
        if (property.value.type !== "Identifier")
          return [];
        return [[property.key.value, property.value.name]];
      }));
      const sfcMain = parent.body.find((x) => {
        if (x.type !== "VariableDeclaration")
          return false;
        if (x.declarations.length !== 1)
          return false;
        if (x.declarations[0].id.type !== "Identifier")
          return false;
        if (x.declarations[0].id.name !== ident)
          return false;
        return true;
      });
      if (((_b = sfcMain.declarations[0].init) == null ? void 0 : _b.type) !== "CallExpression")
        return;
      if (sfcMain.declarations[0].init.callee.type !== "Identifier")
        return;
      if (sfcMain.declarations[0].init.callee.name !== "defineComponent")
        return;
      if (sfcMain.declarations[0].init.arguments.length !== 1)
        return;
      if (sfcMain.declarations[0].init.arguments[0].type !== "ObjectExpression")
        return;
      const setup = sfcMain.declarations[0].init.arguments[0].properties.find((x) => {
        if (x.type !== "Property")
          return false;
        if (x.key.type !== "Identifier")
          return false;
        if (x.key.name !== "setup")
          return false;
        return true;
      });
      if (setup.value.type !== "FunctionExpression")
        return;
      const render = setup.value.body.body.find((x) => {
        if (x.type !== "ReturnStatement")
          return false;
        return true;
      });
      if (((_c = render.argument) == null ? void 0 : _c.type) !== "ArrowFunctionExpression")
        return;
      if (render.argument.params.length !== 2)
        return;
      const ctx = render.argument.params[0];
      if (ctx.type !== "Identifier")
        return;
      if (ctx.name !== "_ctx")
        return;
      if (render.argument.body.type !== "BlockStatement")
        return;
      for (const [key, value] of moduleForest) {
        const cssModuleTreeNode = parent.body.find((x) => {
          if (x.type !== "VariableDeclaration")
            return false;
          if (x.declarations.length !== 1)
            return false;
          if (x.declarations[0].id.type !== "Identifier")
            return false;
          if (x.declarations[0].id.name !== value)
            return false;
          return true;
        });
        if (((_d = cssModuleTreeNode.declarations[0].init) == null ? void 0 : _d.type) !== "ObjectExpression")
          return;
        const moduleTree = new Map(cssModuleTreeNode.declarations[0].init.properties.flatMap((property) => {
          var _a2;
          if (property.type !== "Property")
            return [];
          const actualKey = property.key.type === "Identifier" ? property.key.name : property.key.type === "Literal" ? property.key.value : null;
          if (typeof actualKey !== "string")
            return [];
          if (property.value.type === "Literal")
            return [[actualKey, property.value.value]];
          if (property.value.type !== "Identifier")
            return [];
          const labelledValue = property.value.name;
          const actualValue = parent.body.find((x) => {
            if (x.type !== "VariableDeclaration")
              return false;
            if (x.declarations.length !== 1)
              return false;
            if (x.declarations[0].id.type !== "Identifier")
              return false;
            if (x.declarations[0].id.name !== labelledValue)
              return false;
            return true;
          });
          if (((_a2 = actualValue.declarations[0].init) == null ? void 0 : _a2.type) !== "Literal")
            return [];
          return [[actualKey, actualValue.declarations[0].init.value]];
        }));
        walk(render.argument.body, {
          enter(childNode) {
            if (childNode.type !== "MemberExpression")
              return;
            if (childNode.object.type !== "MemberExpression")
              return;
            if (childNode.object.object.type !== "Identifier")
              return;
            if (childNode.object.object.name !== ctx.name)
              return;
            if (childNode.object.property.type !== "Identifier")
              return;
            if (childNode.object.property.name !== key)
              return;
            if (childNode.property.type !== "Identifier")
              return;
            const actualValue = moduleTree.get(childNode.property.name);
            if (actualValue === void 0)
              return;
            this.replace({
              type: "Literal",
              value: actualValue
            });
          }
        });
        walk(render.argument.body, {
          enter(childNode) {
            if (childNode.type !== "MemberExpression")
              return;
            if (childNode.object.type !== "MemberExpression")
              return;
            if (childNode.object.object.type !== "Identifier")
              return;
            if (childNode.object.object.name !== ctx.name)
              return;
            if (childNode.object.property.type !== "Identifier")
              return;
            if (childNode.object.property.name !== key)
              return;
            if (childNode.property.type !== "Identifier")
              return;
            console.error(`Undefined style detected: ${key}.${childNode.property.name} (in ${name})`);
            this.replace({
              type: "Identifier",
              name: "undefined"
            });
          }
        });
        walk(render.argument.body, {
          enter(childNode) {
            if (childNode.type !== "CallExpression")
              return;
            if (childNode.callee.type !== "Identifier")
              return;
            if (childNode.callee.name !== "normalizeClass")
              return;
            if (childNode.arguments.length !== 1)
              return;
            const normalized = normalizeClass(childNode.arguments[0]);
            if (normalized === null)
              return;
            this.replace({
              type: "Literal",
              value: normalized
            });
          }
        });
      }
      if (node.declarations[0].init.arguments[1].elements.length === 1) {
        this.replace({
          type: "VariableDeclaration",
          declarations: [{
            type: "VariableDeclarator",
            id: {
              type: "Identifier",
              name: node.declarations[0].id.name
            },
            init: {
              type: "Identifier",
              name: ident
            }
          }],
          kind: "const"
        });
      } else {
        this.replace({
          type: "VariableDeclaration",
          declarations: [{
            type: "VariableDeclarator",
            id: {
              type: "Identifier",
              name: node.declarations[0].id.name
            },
            init: {
              type: "CallExpression",
              callee: {
                type: "Identifier",
                name: "_export_sfc"
              },
              arguments: [{
                type: "Identifier",
                name: ident
              }, {
                type: "ArrayExpression",
                elements: node.declarations[0].init.arguments[1].elements.slice(0, __cssModulesIndex).concat(node.declarations[0].init.arguments[1].elements.slice(__cssModulesIndex + 1))
              }]
            }
          }],
          kind: "const"
        });
      }
    }
  });
}
function pluginUnwindCssModuleClassName() {
  return {
    name: "UnwindCssModuleClassName",
    renderChunk(code) {
      const ast = this.parse(code);
      unwindCssModuleClassName(ast);
      return { code: generate(ast) };
    }
  };
}

// vite.json5.ts
import JSON5 from "file:///home/misskey/misskey/node_modules/.pnpm/json5@2.2.3/node_modules/json5/lib/index.js";
import { createFilter, dataToEsm } from "file:///home/misskey/misskey/node_modules/.pnpm/@rollup+pluginutils@5.0.5_rollup@4.0.0/node_modules/@rollup/pluginutils/dist/es/index.js";
function json5(options = {}) {
  const filter = createFilter(options.include, options.exclude);
  const indent = "indent" in options ? options.indent : "	";
  return {
    name: "json5",
    // eslint-disable-next-line no-shadow
    transform(json, id) {
      if (id.slice(-6) !== ".json5" || !filter(id))
        return null;
      try {
        const parsed = JSON5.parse(json);
        return {
          code: dataToEsm(parsed, {
            preferConst: options.preferConst,
            compact: options.compact,
            namedExports: options.namedExports,
            indent
          }),
          map: { mappings: "" }
        };
      } catch (err) {
        if (!(err instanceof SyntaxError)) {
          throw err;
        }
        const message = "Could not parse JSON5 file";
        const { lineNumber, columnNumber } = err;
        this.warn({ message, id, loc: { line: lineNumber, column: columnNumber } });
        return null;
      }
    }
  };
}

// vite.config.ts
var __vite_injected_original_dirname = "/home/misskey/misskey/packages/frontend";
var extensions = [".ts", ".tsx", ".js", ".jsx", ".mjs", ".json", ".json5", ".svg", ".sass", ".scss", ".css", ".vue"];
var hash = (str, seed = 0) => {
  let h1 = 3735928559 ^ seed, h2 = 1103547991 ^ seed;
  for (let i = 0, ch; i < str.length; i++) {
    ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ h1 >>> 16, 2246822507) ^ Math.imul(h2 ^ h2 >>> 13, 3266489909);
  h2 = Math.imul(h2 ^ h2 >>> 16, 2246822507) ^ Math.imul(h1 ^ h1 >>> 13, 3266489909);
  return 4294967296 * (2097151 & h2) + (h1 >>> 0);
};
var BASE62_DIGITS = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
function toBase62(n) {
  if (n === 0) {
    return "0";
  }
  let result = "";
  while (n > 0) {
    result = BASE62_DIGITS[n % BASE62_DIGITS.length] + result;
    n = Math.floor(n / BASE62_DIGITS.length);
  }
  return result;
}
function getConfig() {
  return {
    base: "/vite/",
    server: {
      port: 5173
    },
    plugins: [
      pluginVue({
        reactivityTransform: true
      }),
      ReactivityTransform(),
      pluginUnwindCssModuleClassName(),
      json5(),
      ...process.env.NODE_ENV === "production" ? [
        pluginReplace({
          preventAssignment: true,
          values: {
            "isChromatic()": JSON.stringify(false)
          }
        })
      ] : []
    ],
    resolve: {
      extensions,
      alias: {
        "@/": __vite_injected_original_dirname + "/src/",
        "/client-assets/": __vite_injected_original_dirname + "/assets/",
        "/static-assets/": __vite_injected_original_dirname + "/../backend/assets/",
        "/fluent-emojis/": __vite_injected_original_dirname + "/../../fluent-emojis/dist/",
        "/fluent-emoji/": __vite_injected_original_dirname + "/../../fluent-emojis/dist/"
      }
    },
    css: {
      modules: {
        generateScopedName(name, filename, _css) {
          const id = (path.relative(__vite_injected_original_dirname, filename.split("?")[0]) + "-" + name).replace(/[\\\/\.\?&=]/g, "-").replace(/(src-|vue-)/g, "");
          if (process.env.NODE_ENV === "production") {
            return "x" + toBase62(hash(id)).substring(0, 4);
          } else {
            return id;
          }
        }
      }
    },
    define: {
      _VERSION_: JSON.stringify(package_default.version),
      _LANGS_: JSON.stringify(Object.entries(locales_default).map(([k, v]) => [k, v._lang_])),
      _ENV_: JSON.stringify(process.env.NODE_ENV),
      _DEV_: process.env.NODE_ENV !== "production",
      _PERF_PREFIX_: JSON.stringify("Misskey:"),
      _DATA_TRANSFER_DRIVE_FILE_: JSON.stringify("mk_drive_file"),
      _DATA_TRANSFER_DRIVE_FOLDER_: JSON.stringify("mk_drive_folder"),
      _DATA_TRANSFER_DECK_COLUMN_: JSON.stringify("mk_deck_column"),
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false
    },
    // https://vitejs.dev/guide/dep-pre-bundling.html#monorepos-and-linked-dependencies
    optimizeDeps: {
      include: ["misskey-js"]
    },
    build: {
      target: [
        "chrome116",
        "firefox116",
        "safari16"
      ],
      manifest: "manifest.json",
      rollupOptions: {
        input: {
          app: "./src/_boot_.ts"
        },
        output: {
          manualChunks: {
            vue: ["vue"],
            photoswipe: ["photoswipe", "photoswipe/lightbox", "photoswipe/style.css"]
          },
          chunkFileNames: process.env.NODE_ENV === "production" ? "[hash:8].js" : "[name]-[hash:8].js",
          assetFileNames: process.env.NODE_ENV === "production" ? "[hash:8][extname]" : "[name]-[hash:8][extname]"
        }
      },
      cssCodeSplit: true,
      outDir: __vite_injected_original_dirname + "/../../built/_vite_",
      assetsDir: ".",
      emptyOutDir: false,
      sourcemap: process.env.NODE_ENV === "development",
      reportCompressedSize: false,
      // https://vitejs.dev/guide/dep-pre-bundling.html#monorepos-and-linked-dependencies
      commonjsOptions: {
        include: [/misskey-js/, /node_modules/]
      }
    },
    worker: {
      format: "es"
    },
    test: {
      environment: "happy-dom",
      deps: {
        inline: [
          // XXX: misskey-dev/browser-image-resizer has no "type": "module"
          "browser-image-resizer"
        ]
      }
    }
  };
}
var config = defineConfig(({ command, mode }) => getConfig());
var vite_config_default = config;
export {
  vite_config_default as default,
  getConfig
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAiLi4vLi4vbG9jYWxlcy9pbmRleC5qcyIsICIuLi8uLi9wYWNrYWdlLmpzb24iLCAibGliL3JvbGx1cC1wbHVnaW4tdW53aW5kLWNzcy1tb2R1bGUtY2xhc3MtbmFtZS50cyIsICIuLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vZXN0cmVlLXdhbGtlckAzLjAuMy9ub2RlX21vZHVsZXMvZXN0cmVlLXdhbGtlci9zcmMvd2Fsa2VyLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9lc3RyZWUtd2Fsa2VyQDMuMC4zL25vZGVfbW9kdWxlcy9lc3RyZWUtd2Fsa2VyL3NyYy9zeW5jLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9lc3RyZWUtd2Fsa2VyQDMuMC4zL25vZGVfbW9kdWxlcy9lc3RyZWUtd2Fsa2VyL3NyYy9pbmRleC5qcyIsICJ2aXRlLmpzb241LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL2hvbWUvbWlzc2tleS9taXNza2V5L3BhY2thZ2VzL2Zyb250ZW5kXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9taXNza2V5L21pc3NrZXkvcGFja2FnZXMvZnJvbnRlbmQvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL2hvbWUvbWlzc2tleS9taXNza2V5L3BhY2thZ2VzL2Zyb250ZW5kL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgcGx1Z2luUmVwbGFjZSBmcm9tICdAcm9sbHVwL3BsdWdpbi1yZXBsYWNlJztcbmltcG9ydCBwbHVnaW5WdWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJztcbmltcG9ydCB7IHR5cGUgVXNlckNvbmZpZywgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XG4vLyBAdHMtZXhwZWN0LWVycm9yIGh0dHBzOi8vZ2l0aHViLmNvbS9zeHp6L3VucGx1Z2luLXZ1ZS1tYWNyb3MvaXNzdWVzLzI1NyNpc3N1ZWNvbW1lbnQtMTQxMDc1Mjg5MFxuaW1wb3J0IFJlYWN0aXZpdHlUcmFuc2Zvcm0gZnJvbSAnQHZ1ZS1tYWNyb3MvcmVhY3Rpdml0eS10cmFuc2Zvcm0vdml0ZSc7XG5cbmltcG9ydCBsb2NhbGVzIGZyb20gJy4uLy4uL2xvY2FsZXMnO1xuaW1wb3J0IG1ldGEgZnJvbSAnLi4vLi4vcGFja2FnZS5qc29uJztcbmltcG9ydCBwbHVnaW5VbndpbmRDc3NNb2R1bGVDbGFzc05hbWUgZnJvbSAnLi9saWIvcm9sbHVwLXBsdWdpbi11bndpbmQtY3NzLW1vZHVsZS1jbGFzcy1uYW1lJztcbmltcG9ydCBwbHVnaW5Kc29uNSBmcm9tICcuL3ZpdGUuanNvbjUnO1xuXG5jb25zdCBleHRlbnNpb25zID0gWycudHMnLCAnLnRzeCcsICcuanMnLCAnLmpzeCcsICcubWpzJywgJy5qc29uJywgJy5qc29uNScsICcuc3ZnJywgJy5zYXNzJywgJy5zY3NzJywgJy5jc3MnLCAnLnZ1ZSddO1xuXG5jb25zdCBoYXNoID0gKHN0cjogc3RyaW5nLCBzZWVkID0gMCk6IG51bWJlciA9PiB7XG5cdGxldCBoMSA9IDB4ZGVhZGJlZWYgXiBzZWVkLFxuXHRcdGgyID0gMHg0MWM2Y2U1NyBeIHNlZWQ7XG5cdGZvciAobGV0IGkgPSAwLCBjaDsgaSA8IHN0ci5sZW5ndGg7IGkrKykge1xuXHRcdGNoID0gc3RyLmNoYXJDb2RlQXQoaSk7XG5cdFx0aDEgPSBNYXRoLmltdWwoaDEgXiBjaCwgMjY1NDQzNTc2MSk7XG5cdFx0aDIgPSBNYXRoLmltdWwoaDIgXiBjaCwgMTU5NzMzNDY3Nyk7XG5cdH1cblxuXHRoMSA9IE1hdGguaW11bChoMSBeIChoMSA+Pj4gMTYpLCAyMjQ2ODIyNTA3KSBeIE1hdGguaW11bChoMiBeIChoMiA+Pj4gMTMpLCAzMjY2NDg5OTA5KTtcblx0aDIgPSBNYXRoLmltdWwoaDIgXiAoaDIgPj4+IDE2KSwgMjI0NjgyMjUwNykgXiBNYXRoLmltdWwoaDEgXiAoaDEgPj4+IDEzKSwgMzI2NjQ4OTkwOSk7XG5cblx0cmV0dXJuIDQyOTQ5NjcyOTYgKiAoMjA5NzE1MSAmIGgyKSArIChoMSA+Pj4gMCk7XG59O1xuXG5jb25zdCBCQVNFNjJfRElHSVRTID0gJzAxMjM0NTY3ODlhYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ekFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaJztcbmZ1bmN0aW9uIHRvQmFzZTYyKG46IG51bWJlcik6IHN0cmluZyB7XG5cdGlmIChuID09PSAwKSB7XG5cdFx0cmV0dXJuICcwJztcblx0fVxuXHRsZXQgcmVzdWx0ID0gJyc7XG5cdHdoaWxlIChuID4gMCkge1xuXHRcdHJlc3VsdCA9IEJBU0U2Ml9ESUdJVFNbbiAlIEJBU0U2Ml9ESUdJVFMubGVuZ3RoXSArIHJlc3VsdDtcblx0XHRuID0gTWF0aC5mbG9vcihuIC8gQkFTRTYyX0RJR0lUUy5sZW5ndGgpO1xuXHR9XG5cblx0cmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldENvbmZpZygpOiBVc2VyQ29uZmlnIHtcblx0cmV0dXJuIHtcblx0XHRiYXNlOiAnL3ZpdGUvJyxcblxuXHRcdHNlcnZlcjoge1xuXHRcdFx0cG9ydDogNTE3Myxcblx0XHR9LFxuXG5cdFx0cGx1Z2luczogW1xuXHRcdFx0cGx1Z2luVnVlKHtcblx0XHRcdFx0cmVhY3Rpdml0eVRyYW5zZm9ybTogdHJ1ZSxcblx0XHRcdH0pLFxuXHRcdFx0UmVhY3Rpdml0eVRyYW5zZm9ybSgpLFxuXHRcdFx0cGx1Z2luVW53aW5kQ3NzTW9kdWxlQ2xhc3NOYW1lKCksXG5cdFx0XHRwbHVnaW5Kc29uNSgpLFxuXHRcdFx0Li4ucHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdwcm9kdWN0aW9uJ1xuXHRcdFx0XHQ/IFtcblx0XHRcdFx0XHRwbHVnaW5SZXBsYWNlKHtcblx0XHRcdFx0XHRcdHByZXZlbnRBc3NpZ25tZW50OiB0cnVlLFxuXHRcdFx0XHRcdFx0dmFsdWVzOiB7XG5cdFx0XHRcdFx0XHRcdCdpc0Nocm9tYXRpYygpJzogSlNPTi5zdHJpbmdpZnkoZmFsc2UpLFxuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHR9KSxcblx0XHRcdFx0XVxuXHRcdFx0XHQ6IFtdLFxuXHRcdF0sXG5cblx0XHRyZXNvbHZlOiB7XG5cdFx0XHRleHRlbnNpb25zLFxuXHRcdFx0YWxpYXM6IHtcblx0XHRcdFx0J0AvJzogX19kaXJuYW1lICsgJy9zcmMvJyxcblx0XHRcdFx0Jy9jbGllbnQtYXNzZXRzLyc6IF9fZGlybmFtZSArICcvYXNzZXRzLycsXG5cdFx0XHRcdCcvc3RhdGljLWFzc2V0cy8nOiBfX2Rpcm5hbWUgKyAnLy4uL2JhY2tlbmQvYXNzZXRzLycsXG5cdFx0XHRcdCcvZmx1ZW50LWVtb2ppcy8nOiBfX2Rpcm5hbWUgKyAnLy4uLy4uL2ZsdWVudC1lbW9qaXMvZGlzdC8nLFxuXHRcdFx0XHQnL2ZsdWVudC1lbW9qaS8nOiBfX2Rpcm5hbWUgKyAnLy4uLy4uL2ZsdWVudC1lbW9qaXMvZGlzdC8nLFxuXHRcdFx0fSxcblx0XHR9LFxuXG5cdFx0Y3NzOiB7XG5cdFx0XHRtb2R1bGVzOiB7XG5cdFx0XHRcdGdlbmVyYXRlU2NvcGVkTmFtZShuYW1lLCBmaWxlbmFtZSwgX2Nzcyk6IHN0cmluZyB7XG5cdFx0XHRcdFx0Y29uc3QgaWQgPSAocGF0aC5yZWxhdGl2ZShfX2Rpcm5hbWUsIGZpbGVuYW1lLnNwbGl0KCc/JylbMF0pICsgJy0nICsgbmFtZSkucmVwbGFjZSgvW1xcXFxcXC9cXC5cXD8mPV0vZywgJy0nKS5yZXBsYWNlKC8oc3JjLXx2dWUtKS9nLCAnJyk7XG5cdFx0XHRcdFx0aWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAncHJvZHVjdGlvbicpIHtcblx0XHRcdFx0XHRcdHJldHVybiAneCcgKyB0b0Jhc2U2MihoYXNoKGlkKSkuc3Vic3RyaW5nKDAsIDQpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gaWQ7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0fSxcblx0XHR9LFxuXG5cdFx0ZGVmaW5lOiB7XG5cdFx0XHRfVkVSU0lPTl86IEpTT04uc3RyaW5naWZ5KG1ldGEudmVyc2lvbiksXG5cdFx0XHRfTEFOR1NfOiBKU09OLnN0cmluZ2lmeShPYmplY3QuZW50cmllcyhsb2NhbGVzKS5tYXAoKFtrLCB2XSkgPT4gW2ssIHYuX2xhbmdfXSkpLFxuXHRcdFx0X0VOVl86IEpTT04uc3RyaW5naWZ5KHByb2Nlc3MuZW52Lk5PREVfRU5WKSxcblx0XHRcdF9ERVZfOiBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nLFxuXHRcdFx0X1BFUkZfUFJFRklYXzogSlNPTi5zdHJpbmdpZnkoJ01pc3NrZXk6JyksXG5cdFx0XHRfREFUQV9UUkFOU0ZFUl9EUklWRV9GSUxFXzogSlNPTi5zdHJpbmdpZnkoJ21rX2RyaXZlX2ZpbGUnKSxcblx0XHRcdF9EQVRBX1RSQU5TRkVSX0RSSVZFX0ZPTERFUl86IEpTT04uc3RyaW5naWZ5KCdta19kcml2ZV9mb2xkZXInKSxcblx0XHRcdF9EQVRBX1RSQU5TRkVSX0RFQ0tfQ09MVU1OXzogSlNPTi5zdHJpbmdpZnkoJ21rX2RlY2tfY29sdW1uJyksXG5cdFx0XHRfX1ZVRV9PUFRJT05TX0FQSV9fOiB0cnVlLFxuXHRcdFx0X19WVUVfUFJPRF9ERVZUT09MU19fOiBmYWxzZSxcblx0XHR9LFxuXG5cdFx0Ly8gaHR0cHM6Ly92aXRlanMuZGV2L2d1aWRlL2RlcC1wcmUtYnVuZGxpbmcuaHRtbCNtb25vcmVwb3MtYW5kLWxpbmtlZC1kZXBlbmRlbmNpZXNcblx0XHRvcHRpbWl6ZURlcHM6IHtcblx0XHRcdGluY2x1ZGU6IFsnbWlzc2tleS1qcyddLFxuXHRcdH0sXG5cblx0XHRidWlsZDoge1xuXHRcdFx0dGFyZ2V0OiBbXG5cdFx0XHRcdCdjaHJvbWUxMTYnLFxuXHRcdFx0XHQnZmlyZWZveDExNicsXG5cdFx0XHRcdCdzYWZhcmkxNicsXG5cdFx0XHRdLFxuXHRcdFx0bWFuaWZlc3Q6ICdtYW5pZmVzdC5qc29uJyxcblx0XHRcdHJvbGx1cE9wdGlvbnM6IHtcblx0XHRcdFx0aW5wdXQ6IHtcblx0XHRcdFx0XHRhcHA6ICcuL3NyYy9fYm9vdF8udHMnLFxuXHRcdFx0XHR9LFxuXHRcdFx0XHRvdXRwdXQ6IHtcblx0XHRcdFx0XHRtYW51YWxDaHVua3M6IHtcblx0XHRcdFx0XHRcdHZ1ZTogWyd2dWUnXSxcblx0XHRcdFx0XHRcdHBob3Rvc3dpcGU6IFsncGhvdG9zd2lwZScsICdwaG90b3N3aXBlL2xpZ2h0Ym94JywgJ3Bob3Rvc3dpcGUvc3R5bGUuY3NzJ10sXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRjaHVua0ZpbGVOYW1lczogcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdwcm9kdWN0aW9uJyA/ICdbaGFzaDo4XS5qcycgOiAnW25hbWVdLVtoYXNoOjhdLmpzJyxcblx0XHRcdFx0XHRhc3NldEZpbGVOYW1lczogcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdwcm9kdWN0aW9uJyA/ICdbaGFzaDo4XVtleHRuYW1lXScgOiAnW25hbWVdLVtoYXNoOjhdW2V4dG5hbWVdJyxcblx0XHRcdFx0fSxcblx0XHRcdH0sXG5cdFx0XHRjc3NDb2RlU3BsaXQ6IHRydWUsXG5cdFx0XHRvdXREaXI6IF9fZGlybmFtZSArICcvLi4vLi4vYnVpbHQvX3ZpdGVfJyxcblx0XHRcdGFzc2V0c0RpcjogJy4nLFxuXHRcdFx0ZW1wdHlPdXREaXI6IGZhbHNlLFxuXHRcdFx0c291cmNlbWFwOiBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50Jyxcblx0XHRcdHJlcG9ydENvbXByZXNzZWRTaXplOiBmYWxzZSxcblxuXHRcdFx0Ly8gaHR0cHM6Ly92aXRlanMuZGV2L2d1aWRlL2RlcC1wcmUtYnVuZGxpbmcuaHRtbCNtb25vcmVwb3MtYW5kLWxpbmtlZC1kZXBlbmRlbmNpZXNcblx0XHRcdGNvbW1vbmpzT3B0aW9uczoge1xuXHRcdFx0XHRpbmNsdWRlOiBbL21pc3NrZXktanMvLCAvbm9kZV9tb2R1bGVzL10sXG5cdFx0XHR9LFxuXHRcdH0sXG5cblx0XHR3b3JrZXI6IHtcblx0XHRcdGZvcm1hdDogJ2VzJyxcblx0XHR9LFxuXG5cdFx0dGVzdDoge1xuXHRcdFx0ZW52aXJvbm1lbnQ6ICdoYXBweS1kb20nLFxuXHRcdFx0ZGVwczoge1xuXHRcdFx0XHRpbmxpbmU6IFtcblx0XHRcdFx0XHQvLyBYWFg6IG1pc3NrZXktZGV2L2Jyb3dzZXItaW1hZ2UtcmVzaXplciBoYXMgbm8gXCJ0eXBlXCI6IFwibW9kdWxlXCJcblx0XHRcdFx0XHQnYnJvd3Nlci1pbWFnZS1yZXNpemVyJyxcblx0XHRcdFx0XSxcblx0XHRcdH0sXG5cdFx0fSxcblx0fTtcbn1cblxuY29uc3QgY29uZmlnID0gZGVmaW5lQ29uZmlnKCh7IGNvbW1hbmQsIG1vZGUgfSkgPT4gZ2V0Q29uZmlnKCkpO1xuXG5leHBvcnQgZGVmYXVsdCBjb25maWc7XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9ob21lL21pc3NrZXkvbWlzc2tleS9sb2NhbGVzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9taXNza2V5L21pc3NrZXkvbG9jYWxlcy9pbmRleC5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vaG9tZS9taXNza2V5L21pc3NrZXkvbG9jYWxlcy9pbmRleC5qc1wiOy8qKlxuICogTGFuZ3VhZ2VzIExvYWRlclxuICovXG5cbmltcG9ydCAqIGFzIGZzIGZyb20gJ25vZGU6ZnMnO1xuaW1wb3J0ICogYXMgeWFtbCBmcm9tICdqcy15YW1sJztcblxuY29uc3QgbWVyZ2UgPSAoLi4uYXJncykgPT4gYXJncy5yZWR1Y2UoKGEsIGMpID0+ICh7XG5cdC4uLmEsXG5cdC4uLmMsXG5cdC4uLk9iamVjdC5lbnRyaWVzKGEpXG5cdFx0LmZpbHRlcigoW2tdKSA9PiBjICYmIHR5cGVvZiBjW2tdID09PSAnb2JqZWN0Jylcblx0XHQucmVkdWNlKChhLCBbaywgdl0pID0+IChhW2tdID0gbWVyZ2UodiwgY1trXSksIGEpLCB7fSlcbn0pLCB7fSk7XG5cbmNvbnN0IGxhbmd1YWdlcyA9IFtcblx0J2FyLVNBJyxcblx0J2NzLUNaJyxcblx0J2RhLURLJyxcblx0J2RlLURFJyxcblx0J2VuLVVTJyxcblx0J2VzLUVTJyxcblx0J2ZyLUZSJyxcblx0J2lkLUlEJyxcblx0J2l0LUlUJyxcblx0J2phLUpQJyxcblx0J2phLUtTJyxcblx0J2thYi1LQUInLFxuXHQna24tSU4nLFxuXHQna28tS1InLFxuXHQnbmwtTkwnLFxuXHQnbm8tTk8nLFxuXHQncGwtUEwnLFxuXHQncHQtUFQnLFxuXHQncnUtUlUnLFxuXHQnc2stU0snLFxuXHQndGgtVEgnLFxuXHQndWctQ04nLFxuXHQndWstVUEnLFxuXHQndmktVk4nLFxuXHQnemgtQ04nLFxuXHQnemgtVFcnLFxuXTtcblxuY29uc3QgcHJpbWFyaWVzID0ge1xuXHQnZW4nOiAnVVMnLFxuXHQnamEnOiAnSlAnLFxuXHQnemgnOiAnQ04nLFxufTtcblxuLy8gXHU0RjU1XHU2NTQ1XHUzMDRCXHU2NTg3XHU1QjU3XHU1MjE3XHUzMDZCXHUzMEQwXHUzMEMzXHUzMEFGXHUzMEI5XHUzMERBXHUzMEZDXHUzMEI5XHU2NTg3XHU1QjU3XHUzMDRDXHU2REY3XHU1MTY1XHUzMDU5XHUzMDhCXHUzMDUzXHUzMDY4XHUzMDRDXHUzMDQyXHUzMDhBXHUzMDAxWUFNTFx1MzA0Q1x1NThDQVx1MzA4Q1x1MzA4Qlx1MzA2RVx1MzA2N1x1NTNENlx1MzA4QVx1OTY2NFx1MzA0RlxuY29uc3QgY2xlYW4gPSAodGV4dCkgPT4gdGV4dC5yZXBsYWNlKG5ldyBSZWdFeHAoU3RyaW5nLmZyb21Db2RlUG9pbnQoMHgwOCksICdnJyksICcnKTtcblxuY29uc3QgbG9jYWxlcyA9IGxhbmd1YWdlcy5yZWR1Y2UoKGEsIGMpID0+IChhW2NdID0geWFtbC5sb2FkKGNsZWFuKGZzLnJlYWRGaWxlU3luYyhuZXcgVVJMKGAke2N9LnltbGAsIGltcG9ydC5tZXRhLnVybCksICd1dGYtOCcpKSkgfHwge30sIGEpLCB7fSk7XG5cbmV4cG9ydCBkZWZhdWx0IE9iamVjdC5lbnRyaWVzKGxvY2FsZXMpXG5cdC5yZWR1Y2UoKGEsIFtrICx2XSkgPT4gKGFba10gPSAoKCkgPT4ge1xuXHRcdGNvbnN0IFtsYW5nXSA9IGsuc3BsaXQoJy0nKTtcblx0XHRzd2l0Y2ggKGspIHtcblx0XHRcdGNhc2UgJ2phLUpQJzogcmV0dXJuIHY7XG5cdFx0XHRjYXNlICdqYS1LUyc6XG5cdFx0XHRjYXNlICdlbi1VUyc6IHJldHVybiBtZXJnZShsb2NhbGVzWydqYS1KUCddLCB2KTtcblx0XHRcdGRlZmF1bHQ6IHJldHVybiBtZXJnZShcblx0XHRcdFx0bG9jYWxlc1snamEtSlAnXSxcblx0XHRcdFx0bG9jYWxlc1snZW4tVVMnXSxcblx0XHRcdFx0bG9jYWxlc1tgJHtsYW5nfS0ke3ByaW1hcmllc1tsYW5nXX1gXSB8fCB7fSxcblx0XHRcdFx0dlxuXHRcdFx0KTtcblx0XHR9XG5cdH0pKCksIGEpLCB7fSk7XG4iLCAie1xuXHRcIm5hbWVcIjogXCJtaXNza2V5XCIsXG5cdFwidmVyc2lvblwiOiBcIjIwMjMuMTAuMC1iZXRhLjdcIixcblx0XCJjb2RlbmFtZVwiOiBcIm5hc3ViaVwiLFxuXHRcInJlcG9zaXRvcnlcIjoge1xuXHRcdFwidHlwZVwiOiBcImdpdFwiLFxuXHRcdFwidXJsXCI6IFwiaHR0cHM6Ly9naXRodWIuY29tL21pc3NrZXktZGV2L21pc3NrZXkuZ2l0XCJcblx0fSxcblx0XCJwYWNrYWdlTWFuYWdlclwiOiBcInBucG1AOC44LjBcIixcblx0XCJ3b3Jrc3BhY2VzXCI6IFtcblx0XHRcInBhY2thZ2VzL2Zyb250ZW5kXCIsXG5cdFx0XCJwYWNrYWdlcy9iYWNrZW5kXCIsXG5cdFx0XCJwYWNrYWdlcy9zd1wiXG5cdF0sXG5cdFwicHJpdmF0ZVwiOiB0cnVlLFxuXHRcInNjcmlwdHNcIjoge1xuXHRcdFwiYnVpbGQtcHJlXCI6IFwibm9kZSAuL3NjcmlwdHMvYnVpbGQtcHJlLmpzXCIsXG5cdFx0XCJidWlsZC1hc3NldHNcIjogXCJub2RlIC4vc2NyaXB0cy9idWlsZC1hc3NldHMubWpzXCIsXG5cdFx0XCJidWlsZFwiOiBcInBucG0gYnVpbGQtcHJlICYmIHBucG0gLXIgYnVpbGQgJiYgcG5wbSBidWlsZC1hc3NldHNcIixcblx0XHRcImJ1aWxkLXN0b3J5Ym9va1wiOiBcInBucG0gLS1maWx0ZXIgZnJvbnRlbmQgYnVpbGQtc3Rvcnlib29rXCIsXG5cdFx0XCJzdGFydFwiOiBcInBucG0gY2hlY2s6Y29ubmVjdCAmJiBjZCBwYWNrYWdlcy9iYWNrZW5kICYmIG5vZGUgLi9idWlsdC9ib290L2VudHJ5LmpzXCIsXG5cdFx0XCJzdGFydDp0ZXN0XCI6IFwiY2QgcGFja2FnZXMvYmFja2VuZCAmJiBjcm9zcy1lbnYgTk9ERV9FTlY9dGVzdCBub2RlIC4vYnVpbHQvYm9vdC9lbnRyeS5qc1wiLFxuXHRcdFwiaW5pdFwiOiBcInBucG0gbWlncmF0ZVwiLFxuXHRcdFwibWlncmF0ZVwiOiBcImNkIHBhY2thZ2VzL2JhY2tlbmQgJiYgcG5wbSBtaWdyYXRlXCIsXG5cdFx0XCJjaGVjazpjb25uZWN0XCI6IFwiY2QgcGFja2FnZXMvYmFja2VuZCAmJiBwbnBtIGNoZWNrOmNvbm5lY3RcIixcblx0XHRcIm1pZ3JhdGVhbmRzdGFydFwiOiBcInBucG0gbWlncmF0ZSAmJiBwbnBtIHN0YXJ0XCIsXG5cdFx0XCJ3YXRjaFwiOiBcInBucG0gZGV2XCIsXG5cdFx0XCJkZXZcIjogXCJub2RlIC4vc2NyaXB0cy9kZXYubWpzXCIsXG5cdFx0XCJsaW50XCI6IFwicG5wbSAtciBsaW50XCIsXG5cdFx0XCJjeTpvcGVuXCI6IFwicG5wbSBjeXByZXNzIG9wZW4gLS1icm93c2VyIC0tZTJlIC0tY29uZmlnLWZpbGU9Y3lwcmVzcy5jb25maWcudHNcIixcblx0XHRcImN5OnJ1blwiOiBcInBucG0gY3lwcmVzcyBydW5cIixcblx0XHRcImUyZVwiOiBcInBucG0gc3RhcnQtc2VydmVyLWFuZC10ZXN0IHN0YXJ0OnRlc3QgaHR0cDovL2xvY2FsaG9zdDo2MTgxMiBjeTpydW5cIixcblx0XHRcImplc3RcIjogXCJjZCBwYWNrYWdlcy9iYWNrZW5kICYmIHBucG0gamVzdFwiLFxuXHRcdFwiamVzdC1hbmQtY292ZXJhZ2VcIjogXCJjZCBwYWNrYWdlcy9iYWNrZW5kICYmIHBucG0gamVzdC1hbmQtY292ZXJhZ2VcIixcblx0XHRcInRlc3RcIjogXCJwbnBtIC1yIHRlc3RcIixcblx0XHRcInRlc3QtYW5kLWNvdmVyYWdlXCI6IFwicG5wbSAtciB0ZXN0LWFuZC1jb3ZlcmFnZVwiLFxuXHRcdFwiY2xlYW5cIjogXCJub2RlIC4vc2NyaXB0cy9jbGVhbi5qc1wiLFxuXHRcdFwiY2xlYW4tYWxsXCI6IFwibm9kZSAuL3NjcmlwdHMvY2xlYW4tYWxsLmpzXCIsXG5cdFx0XCJjbGVhbmFsbFwiOiBcInBucG0gY2xlYW4tYWxsXCJcblx0fSxcblx0XCJyZXNvbHV0aW9uc1wiOiB7XG5cdFx0XCJjaG9raWRhclwiOiBcIjMuNS4zXCIsXG5cdFx0XCJsb2Rhc2hcIjogXCI0LjE3LjIxXCJcblx0fSxcblx0XCJkZXBlbmRlbmNpZXNcIjoge1xuXHRcdFwiZXhlY2FcIjogXCI4LjAuMVwiLFxuXHRcdFwiY3NzbmFub1wiOiBcIjYuMC4xXCIsXG5cdFx0XCJqcy15YW1sXCI6IFwiNC4xLjBcIixcblx0XHRcInBvc3Rjc3NcIjogXCI4LjQuMzFcIixcblx0XHRcInRlcnNlclwiOiBcIjUuMjEuMFwiLFxuXHRcdFwidHlwZXNjcmlwdFwiOiBcIjUuMi4yXCJcblx0fSxcblx0XCJkZXZEZXBlbmRlbmNpZXNcIjoge1xuXHRcdFwiQHR5cGVzY3JpcHQtZXNsaW50L2VzbGludC1wbHVnaW5cIjogXCI2LjcuNFwiLFxuXHRcdFwiQHR5cGVzY3JpcHQtZXNsaW50L3BhcnNlclwiOiBcIjYuNy40XCIsXG5cdFx0XCJjcm9zcy1lbnZcIjogXCI3LjAuM1wiLFxuXHRcdFwiY3lwcmVzc1wiOiBcIjEzLjMuMFwiLFxuXHRcdFwiZXNsaW50XCI6IFwiOC41MC4wXCIsXG5cdFx0XCJzdGFydC1zZXJ2ZXItYW5kLXRlc3RcIjogXCIyLjAuMVwiXG5cdH0sXG5cdFwib3B0aW9uYWxEZXBlbmRlbmNpZXNcIjoge1xuXHRcdFwiQHRlbnNvcmZsb3cvdGZqcy1jb3JlXCI6IFwiNC40LjBcIlxuXHR9XG59XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9ob21lL21pc3NrZXkvbWlzc2tleS9wYWNrYWdlcy9mcm9udGVuZC9saWJcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9ob21lL21pc3NrZXkvbWlzc2tleS9wYWNrYWdlcy9mcm9udGVuZC9saWIvcm9sbHVwLXBsdWdpbi11bndpbmQtY3NzLW1vZHVsZS1jbGFzcy1uYW1lLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL21pc3NrZXkvbWlzc2tleS9wYWNrYWdlcy9mcm9udGVuZC9saWIvcm9sbHVwLXBsdWdpbi11bndpbmQtY3NzLW1vZHVsZS1jbGFzcy1uYW1lLnRzXCI7LypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IHN5dWlsbyBhbmQgb3RoZXIgbWlzc2tleSBjb250cmlidXRvcnNcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG4gKi9cblxuaW1wb3J0IHsgZ2VuZXJhdGUgfSBmcm9tICdhc3RyaW5nJztcbmltcG9ydCAqIGFzIGVzdHJlZSBmcm9tICdlc3RyZWUnO1xuaW1wb3J0IHsgd2FsayB9IGZyb20gJy4uL25vZGVfbW9kdWxlcy9lc3RyZWUtd2Fsa2VyL3NyYy9pbmRleC5qcyc7XG5pbXBvcnQgdHlwZSAqIGFzIGVzdHJlZVdhbGtlciBmcm9tICdlc3RyZWUtd2Fsa2VyJztcbmltcG9ydCB0eXBlIHsgUGx1Z2luIH0gZnJvbSAndml0ZSc7XG5cbmZ1bmN0aW9uIGlzRmFsc3lJZGVudGlmaWVyKGlkZW50aWZpZXI6IGVzdHJlZS5JZGVudGlmaWVyKTogYm9vbGVhbiB7XG5cdHJldHVybiBpZGVudGlmaWVyLm5hbWUgPT09ICd1bmRlZmluZWQnIHx8IGlkZW50aWZpZXIubmFtZSA9PT0gJ05hTic7XG59XG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZUNsYXNzV2Fsa2VyKHRyZWU6IGVzdHJlZS5Ob2RlKTogc3RyaW5nIHwgbnVsbCB7XG5cdGlmICh0cmVlLnR5cGUgPT09ICdJZGVudGlmaWVyJykgcmV0dXJuIGlzRmFsc3lJZGVudGlmaWVyKHRyZWUpID8gJycgOiBudWxsO1xuXHRpZiAodHJlZS50eXBlID09PSAnTGl0ZXJhbCcpIHJldHVybiB0eXBlb2YgdHJlZS52YWx1ZSA9PT0gJ3N0cmluZycgPyB0cmVlLnZhbHVlIDogJyc7XG5cdGlmICh0cmVlLnR5cGUgPT09ICdCaW5hcnlFeHByZXNzaW9uJykge1xuXHRcdGlmICh0cmVlLm9wZXJhdG9yICE9PSAnKycpIHJldHVybiBudWxsO1xuXHRcdGNvbnN0IGxlZnQgPSBub3JtYWxpemVDbGFzc1dhbGtlcih0cmVlLmxlZnQpO1xuXHRcdGNvbnN0IHJpZ2h0ID0gbm9ybWFsaXplQ2xhc3NXYWxrZXIodHJlZS5yaWdodCk7XG5cdFx0aWYgKGxlZnQgPT09IG51bGwgfHwgcmlnaHQgPT09IG51bGwpIHJldHVybiBudWxsO1xuXHRcdHJldHVybiBgJHtsZWZ0fSR7cmlnaHR9YDtcblx0fVxuXHRpZiAodHJlZS50eXBlID09PSAnVGVtcGxhdGVMaXRlcmFsJykge1xuXHRcdGlmICh0cmVlLmV4cHJlc3Npb25zLnNvbWUoKHgpID0+IHgudHlwZSAhPT0gJ0xpdGVyYWwnICYmICh4LnR5cGUgIT09ICdJZGVudGlmaWVyJyB8fCAhaXNGYWxzeUlkZW50aWZpZXIoeCkpKSkgcmV0dXJuIG51bGw7XG5cdFx0cmV0dXJuIHRyZWUucXVhc2lzLnJlZHVjZSgoYSwgYywgaSkgPT4ge1xuXHRcdFx0Y29uc3QgdiA9IGkgPT09IHRyZWUucXVhc2lzLmxlbmd0aCAtIDEgPyAnJyA6ICh0cmVlLmV4cHJlc3Npb25zW2ldIGFzIFBhcnRpYWw8ZXN0cmVlLkxpdGVyYWw+KS52YWx1ZTtcblx0XHRcdHJldHVybiBhICsgYy52YWx1ZS5yYXcgKyAodHlwZW9mIHYgPT09ICdzdHJpbmcnID8gdiA6ICcnKTtcblx0XHR9LCAnJyk7XG5cdH1cblx0aWYgKHRyZWUudHlwZSA9PT0gJ0FycmF5RXhwcmVzc2lvbicpIHtcblx0XHRjb25zdCB2YWx1ZXMgPSB0cmVlLmVsZW1lbnRzLm1hcCgodHJlZU5vZGUpID0+IHtcblx0XHRcdGlmICh0cmVlTm9kZSA9PT0gbnVsbCkgcmV0dXJuICcnO1xuXHRcdFx0aWYgKHRyZWVOb2RlLnR5cGUgPT09ICdTcHJlYWRFbGVtZW50JykgcmV0dXJuIG5vcm1hbGl6ZUNsYXNzV2Fsa2VyKHRyZWVOb2RlLmFyZ3VtZW50KTtcblx0XHRcdHJldHVybiBub3JtYWxpemVDbGFzc1dhbGtlcih0cmVlTm9kZSk7XG5cdFx0fSk7XG5cdFx0aWYgKHZhbHVlcy5zb21lKCh4KSA9PiB4ID09PSBudWxsKSkgcmV0dXJuIG51bGw7XG5cdFx0cmV0dXJuIHZhbHVlcy5qb2luKCcgJyk7XG5cdH1cblx0aWYgKHRyZWUudHlwZSA9PT0gJ09iamVjdEV4cHJlc3Npb24nKSB7XG5cdFx0Y29uc3QgdmFsdWVzID0gdHJlZS5wcm9wZXJ0aWVzLm1hcCgodHJlZU5vZGUpID0+IHtcblx0XHRcdGlmICh0cmVlTm9kZS50eXBlID09PSAnU3ByZWFkRWxlbWVudCcpIHJldHVybiBub3JtYWxpemVDbGFzc1dhbGtlcih0cmVlTm9kZS5hcmd1bWVudCk7XG5cdFx0XHRsZXQgeCA9IHRyZWVOb2RlLnZhbHVlO1xuXHRcdFx0bGV0IGludmV0ZWQgPSBmYWxzZTtcblx0XHRcdHdoaWxlICh4LnR5cGUgPT09ICdVbmFyeUV4cHJlc3Npb24nICYmIHgub3BlcmF0b3IgPT09ICchJykge1xuXHRcdFx0XHR4ID0geC5hcmd1bWVudDtcblx0XHRcdFx0aW52ZXRlZCA9ICFpbnZldGVkO1xuXHRcdFx0fVxuXHRcdFx0aWYgKHgudHlwZSA9PT0gJ0xpdGVyYWwnKSB7XG5cdFx0XHRcdGlmIChpbnZldGVkID09PSAheC52YWx1ZSkge1xuXHRcdFx0XHRcdHJldHVybiB0cmVlTm9kZS5rZXkudHlwZSA9PT0gJ0lkZW50aWZpZXInID8gdHJlZU5vZGUuY29tcHV0ZWQgPyBudWxsIDogdHJlZU5vZGUua2V5Lm5hbWUgOiB0cmVlTm9kZS5rZXkudHlwZSA9PT0gJ0xpdGVyYWwnID8gdHJlZU5vZGUua2V5LnZhbHVlIDogJyc7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cmV0dXJuICcnO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRpZiAoeC50eXBlID09PSAnSWRlbnRpZmllcicpIHtcblx0XHRcdFx0aWYgKGludmV0ZWQgIT09IGlzRmFsc3lJZGVudGlmaWVyKHgpKSB7XG5cdFx0XHRcdFx0cmV0dXJuICcnO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHJldHVybiBudWxsO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9KTtcblx0XHRpZiAodmFsdWVzLnNvbWUoKHgpID0+IHggPT09IG51bGwpKSByZXR1cm4gbnVsbDtcblx0XHRyZXR1cm4gdmFsdWVzLmpvaW4oJyAnKTtcblx0fVxuXHRjb25zb2xlLmVycm9yKGBVbmV4cGVjdGVkIG5vZGUgdHlwZTogJHt0cmVlLnR5cGV9YCk7XG5cdHJldHVybiBudWxsO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbm9ybWFsaXplQ2xhc3ModHJlZTogZXN0cmVlLk5vZGUpOiBzdHJpbmcgfCBudWxsIHtcblx0Y29uc3Qgd2Fsa2VkID0gbm9ybWFsaXplQ2xhc3NXYWxrZXIodHJlZSk7XG5cdHJldHVybiB3YWxrZWQgJiYgd2Fsa2VkLnJlcGxhY2UoL15cXHMrfFxccysoPz1cXHMpfFxccyskL2csICcnKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVud2luZENzc01vZHVsZUNsYXNzTmFtZShhc3Q6IGVzdHJlZS5Ob2RlKTogdm9pZCB7XG5cdCh3YWxrIGFzIHR5cGVvZiBlc3RyZWVXYWxrZXIud2FsaykoYXN0LCB7XG5cdFx0ZW50ZXIobm9kZSwgcGFyZW50KTogdm9pZCB7XG5cdFx0XHRpZiAocGFyZW50Py50eXBlICE9PSAnUHJvZ3JhbScpIHJldHVybjtcblx0XHRcdGlmIChub2RlLnR5cGUgIT09ICdWYXJpYWJsZURlY2xhcmF0aW9uJykgcmV0dXJuO1xuXHRcdFx0aWYgKG5vZGUuZGVjbGFyYXRpb25zLmxlbmd0aCAhPT0gMSkgcmV0dXJuO1xuXHRcdFx0aWYgKG5vZGUuZGVjbGFyYXRpb25zWzBdLmlkLnR5cGUgIT09ICdJZGVudGlmaWVyJykgcmV0dXJuO1xuXHRcdFx0Y29uc3QgbmFtZSA9IG5vZGUuZGVjbGFyYXRpb25zWzBdLmlkLm5hbWU7XG5cdFx0XHRpZiAobm9kZS5kZWNsYXJhdGlvbnNbMF0uaW5pdD8udHlwZSAhPT0gJ0NhbGxFeHByZXNzaW9uJykgcmV0dXJuO1xuXHRcdFx0aWYgKG5vZGUuZGVjbGFyYXRpb25zWzBdLmluaXQuY2FsbGVlLnR5cGUgIT09ICdJZGVudGlmaWVyJykgcmV0dXJuO1xuXHRcdFx0aWYgKG5vZGUuZGVjbGFyYXRpb25zWzBdLmluaXQuY2FsbGVlLm5hbWUgIT09ICdfZXhwb3J0X3NmYycpIHJldHVybjtcblx0XHRcdGlmIChub2RlLmRlY2xhcmF0aW9uc1swXS5pbml0LmFyZ3VtZW50cy5sZW5ndGggIT09IDIpIHJldHVybjtcblx0XHRcdGlmIChub2RlLmRlY2xhcmF0aW9uc1swXS5pbml0LmFyZ3VtZW50c1swXS50eXBlICE9PSAnSWRlbnRpZmllcicpIHJldHVybjtcblx0XHRcdGNvbnN0IGlkZW50ID0gbm9kZS5kZWNsYXJhdGlvbnNbMF0uaW5pdC5hcmd1bWVudHNbMF0ubmFtZTtcblx0XHRcdGlmICghaWRlbnQuc3RhcnRzV2l0aCgnX3NmY19tYWluJykpIHJldHVybjtcblx0XHRcdGlmIChub2RlLmRlY2xhcmF0aW9uc1swXS5pbml0LmFyZ3VtZW50c1sxXS50eXBlICE9PSAnQXJyYXlFeHByZXNzaW9uJykgcmV0dXJuO1xuXHRcdFx0aWYgKG5vZGUuZGVjbGFyYXRpb25zWzBdLmluaXQuYXJndW1lbnRzWzFdLmVsZW1lbnRzLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuXHRcdFx0Y29uc3QgX19jc3NNb2R1bGVzSW5kZXggPSBub2RlLmRlY2xhcmF0aW9uc1swXS5pbml0LmFyZ3VtZW50c1sxXS5lbGVtZW50cy5maW5kSW5kZXgoKHgpID0+IHtcblx0XHRcdFx0aWYgKHg/LnR5cGUgIT09ICdBcnJheUV4cHJlc3Npb24nKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdGlmICh4LmVsZW1lbnRzLmxlbmd0aCAhPT0gMikgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRpZiAoeC5lbGVtZW50c1swXT8udHlwZSAhPT0gJ0xpdGVyYWwnKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdGlmICh4LmVsZW1lbnRzWzBdLnZhbHVlICE9PSAnX19jc3NNb2R1bGVzJykgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRpZiAoeC5lbGVtZW50c1sxXT8udHlwZSAhPT0gJ0lkZW50aWZpZXInKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fSk7XG5cdFx0XHRpZiAoIX5fX2Nzc01vZHVsZXNJbmRleCkgcmV0dXJuO1xuXHRcdFx0Y29uc3QgY3NzTW9kdWxlRm9yZXN0TmFtZSA9ICgobm9kZS5kZWNsYXJhdGlvbnNbMF0uaW5pdC5hcmd1bWVudHNbMV0uZWxlbWVudHNbX19jc3NNb2R1bGVzSW5kZXhdIGFzIGVzdHJlZS5BcnJheUV4cHJlc3Npb24pLmVsZW1lbnRzWzFdIGFzIGVzdHJlZS5JZGVudGlmaWVyKS5uYW1lO1xuXHRcdFx0Y29uc3QgY3NzTW9kdWxlRm9yZXN0Tm9kZSA9IHBhcmVudC5ib2R5LmZpbmQoKHgpID0+IHtcblx0XHRcdFx0aWYgKHgudHlwZSAhPT0gJ1ZhcmlhYmxlRGVjbGFyYXRpb24nKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdGlmICh4LmRlY2xhcmF0aW9ucy5sZW5ndGggIT09IDEpIHJldHVybiBmYWxzZTtcblx0XHRcdFx0aWYgKHguZGVjbGFyYXRpb25zWzBdLmlkLnR5cGUgIT09ICdJZGVudGlmaWVyJykgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRpZiAoeC5kZWNsYXJhdGlvbnNbMF0uaWQubmFtZSAhPT0gY3NzTW9kdWxlRm9yZXN0TmFtZSkgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRpZiAoeC5kZWNsYXJhdGlvbnNbMF0uaW5pdD8udHlwZSAhPT0gJ09iamVjdEV4cHJlc3Npb24nKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fSkgYXMgdW5rbm93biBhcyBlc3RyZWUuVmFyaWFibGVEZWNsYXJhdGlvbjtcblx0XHRcdGNvbnN0IG1vZHVsZUZvcmVzdCA9IG5ldyBNYXAoKGNzc01vZHVsZUZvcmVzdE5vZGUuZGVjbGFyYXRpb25zWzBdLmluaXQgYXMgZXN0cmVlLk9iamVjdEV4cHJlc3Npb24pLnByb3BlcnRpZXMuZmxhdE1hcCgocHJvcGVydHkpID0+IHtcblx0XHRcdFx0aWYgKHByb3BlcnR5LnR5cGUgIT09ICdQcm9wZXJ0eScpIHJldHVybiBbXTtcblx0XHRcdFx0aWYgKHByb3BlcnR5LmtleS50eXBlICE9PSAnTGl0ZXJhbCcpIHJldHVybiBbXTtcblx0XHRcdFx0aWYgKHByb3BlcnR5LnZhbHVlLnR5cGUgIT09ICdJZGVudGlmaWVyJykgcmV0dXJuIFtdO1xuXHRcdFx0XHRyZXR1cm4gW1twcm9wZXJ0eS5rZXkudmFsdWUgYXMgc3RyaW5nLCBwcm9wZXJ0eS52YWx1ZS5uYW1lIGFzIHN0cmluZ11dO1xuXHRcdFx0fSkpO1xuXHRcdFx0Y29uc3Qgc2ZjTWFpbiA9IHBhcmVudC5ib2R5LmZpbmQoKHgpID0+IHtcblx0XHRcdFx0aWYgKHgudHlwZSAhPT0gJ1ZhcmlhYmxlRGVjbGFyYXRpb24nKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdGlmICh4LmRlY2xhcmF0aW9ucy5sZW5ndGggIT09IDEpIHJldHVybiBmYWxzZTtcblx0XHRcdFx0aWYgKHguZGVjbGFyYXRpb25zWzBdLmlkLnR5cGUgIT09ICdJZGVudGlmaWVyJykgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRpZiAoeC5kZWNsYXJhdGlvbnNbMF0uaWQubmFtZSAhPT0gaWRlbnQpIHJldHVybiBmYWxzZTtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9KSBhcyB1bmtub3duIGFzIGVzdHJlZS5WYXJpYWJsZURlY2xhcmF0aW9uO1xuXHRcdFx0aWYgKHNmY01haW4uZGVjbGFyYXRpb25zWzBdLmluaXQ/LnR5cGUgIT09ICdDYWxsRXhwcmVzc2lvbicpIHJldHVybjtcblx0XHRcdGlmIChzZmNNYWluLmRlY2xhcmF0aW9uc1swXS5pbml0LmNhbGxlZS50eXBlICE9PSAnSWRlbnRpZmllcicpIHJldHVybjtcblx0XHRcdGlmIChzZmNNYWluLmRlY2xhcmF0aW9uc1swXS5pbml0LmNhbGxlZS5uYW1lICE9PSAnZGVmaW5lQ29tcG9uZW50JykgcmV0dXJuO1xuXHRcdFx0aWYgKHNmY01haW4uZGVjbGFyYXRpb25zWzBdLmluaXQuYXJndW1lbnRzLmxlbmd0aCAhPT0gMSkgcmV0dXJuO1xuXHRcdFx0aWYgKHNmY01haW4uZGVjbGFyYXRpb25zWzBdLmluaXQuYXJndW1lbnRzWzBdLnR5cGUgIT09ICdPYmplY3RFeHByZXNzaW9uJykgcmV0dXJuO1xuXHRcdFx0Y29uc3Qgc2V0dXAgPSBzZmNNYWluLmRlY2xhcmF0aW9uc1swXS5pbml0LmFyZ3VtZW50c1swXS5wcm9wZXJ0aWVzLmZpbmQoKHgpID0+IHtcblx0XHRcdFx0aWYgKHgudHlwZSAhPT0gJ1Byb3BlcnR5JykgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRpZiAoeC5rZXkudHlwZSAhPT0gJ0lkZW50aWZpZXInKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdGlmICh4LmtleS5uYW1lICE9PSAnc2V0dXAnKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fSkgYXMgdW5rbm93biBhcyBlc3RyZWUuUHJvcGVydHk7XG5cdFx0XHRpZiAoc2V0dXAudmFsdWUudHlwZSAhPT0gJ0Z1bmN0aW9uRXhwcmVzc2lvbicpIHJldHVybjtcblx0XHRcdGNvbnN0IHJlbmRlciA9IHNldHVwLnZhbHVlLmJvZHkuYm9keS5maW5kKCh4KSA9PiB7XG5cdFx0XHRcdGlmICh4LnR5cGUgIT09ICdSZXR1cm5TdGF0ZW1lbnQnKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fSkgYXMgdW5rbm93biBhcyBlc3RyZWUuUmV0dXJuU3RhdGVtZW50O1xuXHRcdFx0aWYgKHJlbmRlci5hcmd1bWVudD8udHlwZSAhPT0gJ0Fycm93RnVuY3Rpb25FeHByZXNzaW9uJykgcmV0dXJuO1xuXHRcdFx0aWYgKHJlbmRlci5hcmd1bWVudC5wYXJhbXMubGVuZ3RoICE9PSAyKSByZXR1cm47XG5cdFx0XHRjb25zdCBjdHggPSByZW5kZXIuYXJndW1lbnQucGFyYW1zWzBdO1xuXHRcdFx0aWYgKGN0eC50eXBlICE9PSAnSWRlbnRpZmllcicpIHJldHVybjtcblx0XHRcdGlmIChjdHgubmFtZSAhPT0gJ19jdHgnKSByZXR1cm47XG5cdFx0XHRpZiAocmVuZGVyLmFyZ3VtZW50LmJvZHkudHlwZSAhPT0gJ0Jsb2NrU3RhdGVtZW50JykgcmV0dXJuO1xuXHRcdFx0Zm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgbW9kdWxlRm9yZXN0KSB7XG5cdFx0XHRcdGNvbnN0IGNzc01vZHVsZVRyZWVOb2RlID0gcGFyZW50LmJvZHkuZmluZCgoeCkgPT4ge1xuXHRcdFx0XHRcdGlmICh4LnR5cGUgIT09ICdWYXJpYWJsZURlY2xhcmF0aW9uJykgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRcdGlmICh4LmRlY2xhcmF0aW9ucy5sZW5ndGggIT09IDEpIHJldHVybiBmYWxzZTtcblx0XHRcdFx0XHRpZiAoeC5kZWNsYXJhdGlvbnNbMF0uaWQudHlwZSAhPT0gJ0lkZW50aWZpZXInKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0aWYgKHguZGVjbGFyYXRpb25zWzBdLmlkLm5hbWUgIT09IHZhbHVlKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdH0pIGFzIHVua25vd24gYXMgZXN0cmVlLlZhcmlhYmxlRGVjbGFyYXRpb247XG5cdFx0XHRcdGlmIChjc3NNb2R1bGVUcmVlTm9kZS5kZWNsYXJhdGlvbnNbMF0uaW5pdD8udHlwZSAhPT0gJ09iamVjdEV4cHJlc3Npb24nKSByZXR1cm47XG5cdFx0XHRcdGNvbnN0IG1vZHVsZVRyZWUgPSBuZXcgTWFwKGNzc01vZHVsZVRyZWVOb2RlLmRlY2xhcmF0aW9uc1swXS5pbml0LnByb3BlcnRpZXMuZmxhdE1hcCgocHJvcGVydHkpID0+IHtcblx0XHRcdFx0XHRpZiAocHJvcGVydHkudHlwZSAhPT0gJ1Byb3BlcnR5JykgcmV0dXJuIFtdO1xuXHRcdFx0XHRcdGNvbnN0IGFjdHVhbEtleSA9IHByb3BlcnR5LmtleS50eXBlID09PSAnSWRlbnRpZmllcicgPyBwcm9wZXJ0eS5rZXkubmFtZSA6IHByb3BlcnR5LmtleS50eXBlID09PSAnTGl0ZXJhbCcgPyBwcm9wZXJ0eS5rZXkudmFsdWUgOiBudWxsO1xuXHRcdFx0XHRcdGlmICh0eXBlb2YgYWN0dWFsS2V5ICE9PSAnc3RyaW5nJykgcmV0dXJuIFtdO1xuXHRcdFx0XHRcdGlmIChwcm9wZXJ0eS52YWx1ZS50eXBlID09PSAnTGl0ZXJhbCcpIHJldHVybiBbW2FjdHVhbEtleSwgcHJvcGVydHkudmFsdWUudmFsdWUgYXMgc3RyaW5nXV07XG5cdFx0XHRcdFx0aWYgKHByb3BlcnR5LnZhbHVlLnR5cGUgIT09ICdJZGVudGlmaWVyJykgcmV0dXJuIFtdO1xuXHRcdFx0XHRcdGNvbnN0IGxhYmVsbGVkVmFsdWUgPSBwcm9wZXJ0eS52YWx1ZS5uYW1lO1xuXHRcdFx0XHRcdGNvbnN0IGFjdHVhbFZhbHVlID0gcGFyZW50LmJvZHkuZmluZCgoeCkgPT4ge1xuXHRcdFx0XHRcdFx0aWYgKHgudHlwZSAhPT0gJ1ZhcmlhYmxlRGVjbGFyYXRpb24nKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0XHRpZiAoeC5kZWNsYXJhdGlvbnMubGVuZ3RoICE9PSAxKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0XHRpZiAoeC5kZWNsYXJhdGlvbnNbMF0uaWQudHlwZSAhPT0gJ0lkZW50aWZpZXInKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0XHRpZiAoeC5kZWNsYXJhdGlvbnNbMF0uaWQubmFtZSAhPT0gbGFiZWxsZWRWYWx1ZSkgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdFx0fSkgYXMgdW5rbm93biBhcyBlc3RyZWUuVmFyaWFibGVEZWNsYXJhdGlvbjtcblx0XHRcdFx0XHRpZiAoYWN0dWFsVmFsdWUuZGVjbGFyYXRpb25zWzBdLmluaXQ/LnR5cGUgIT09ICdMaXRlcmFsJykgcmV0dXJuIFtdO1xuXHRcdFx0XHRcdHJldHVybiBbW2FjdHVhbEtleSwgYWN0dWFsVmFsdWUuZGVjbGFyYXRpb25zWzBdLmluaXQudmFsdWUgYXMgc3RyaW5nXV07XG5cdFx0XHRcdH0pKTtcblx0XHRcdFx0KHdhbGsgYXMgdHlwZW9mIGVzdHJlZVdhbGtlci53YWxrKShyZW5kZXIuYXJndW1lbnQuYm9keSwge1xuXHRcdFx0XHRcdGVudGVyKGNoaWxkTm9kZSkge1xuXHRcdFx0XHRcdFx0aWYgKGNoaWxkTm9kZS50eXBlICE9PSAnTWVtYmVyRXhwcmVzc2lvbicpIHJldHVybjtcblx0XHRcdFx0XHRcdGlmIChjaGlsZE5vZGUub2JqZWN0LnR5cGUgIT09ICdNZW1iZXJFeHByZXNzaW9uJykgcmV0dXJuO1xuXHRcdFx0XHRcdFx0aWYgKGNoaWxkTm9kZS5vYmplY3Qub2JqZWN0LnR5cGUgIT09ICdJZGVudGlmaWVyJykgcmV0dXJuO1xuXHRcdFx0XHRcdFx0aWYgKGNoaWxkTm9kZS5vYmplY3Qub2JqZWN0Lm5hbWUgIT09IGN0eC5uYW1lKSByZXR1cm47XG5cdFx0XHRcdFx0XHRpZiAoY2hpbGROb2RlLm9iamVjdC5wcm9wZXJ0eS50eXBlICE9PSAnSWRlbnRpZmllcicpIHJldHVybjtcblx0XHRcdFx0XHRcdGlmIChjaGlsZE5vZGUub2JqZWN0LnByb3BlcnR5Lm5hbWUgIT09IGtleSkgcmV0dXJuO1xuXHRcdFx0XHRcdFx0aWYgKGNoaWxkTm9kZS5wcm9wZXJ0eS50eXBlICE9PSAnSWRlbnRpZmllcicpIHJldHVybjtcblx0XHRcdFx0XHRcdGNvbnN0IGFjdHVhbFZhbHVlID0gbW9kdWxlVHJlZS5nZXQoY2hpbGROb2RlLnByb3BlcnR5Lm5hbWUpO1xuXHRcdFx0XHRcdFx0aWYgKGFjdHVhbFZhbHVlID09PSB1bmRlZmluZWQpIHJldHVybjtcblx0XHRcdFx0XHRcdHRoaXMucmVwbGFjZSh7XG5cdFx0XHRcdFx0XHRcdHR5cGU6ICdMaXRlcmFsJyxcblx0XHRcdFx0XHRcdFx0dmFsdWU6IGFjdHVhbFZhbHVlLFxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0fSk7XG5cdFx0XHRcdCh3YWxrIGFzIHR5cGVvZiBlc3RyZWVXYWxrZXIud2FsaykocmVuZGVyLmFyZ3VtZW50LmJvZHksIHtcblx0XHRcdFx0XHRlbnRlcihjaGlsZE5vZGUpIHtcblx0XHRcdFx0XHRcdGlmIChjaGlsZE5vZGUudHlwZSAhPT0gJ01lbWJlckV4cHJlc3Npb24nKSByZXR1cm47XG5cdFx0XHRcdFx0XHRpZiAoY2hpbGROb2RlLm9iamVjdC50eXBlICE9PSAnTWVtYmVyRXhwcmVzc2lvbicpIHJldHVybjtcblx0XHRcdFx0XHRcdGlmIChjaGlsZE5vZGUub2JqZWN0Lm9iamVjdC50eXBlICE9PSAnSWRlbnRpZmllcicpIHJldHVybjtcblx0XHRcdFx0XHRcdGlmIChjaGlsZE5vZGUub2JqZWN0Lm9iamVjdC5uYW1lICE9PSBjdHgubmFtZSkgcmV0dXJuO1xuXHRcdFx0XHRcdFx0aWYgKGNoaWxkTm9kZS5vYmplY3QucHJvcGVydHkudHlwZSAhPT0gJ0lkZW50aWZpZXInKSByZXR1cm47XG5cdFx0XHRcdFx0XHRpZiAoY2hpbGROb2RlLm9iamVjdC5wcm9wZXJ0eS5uYW1lICE9PSBrZXkpIHJldHVybjtcblx0XHRcdFx0XHRcdGlmIChjaGlsZE5vZGUucHJvcGVydHkudHlwZSAhPT0gJ0lkZW50aWZpZXInKSByZXR1cm47XG5cdFx0XHRcdFx0XHRjb25zb2xlLmVycm9yKGBVbmRlZmluZWQgc3R5bGUgZGV0ZWN0ZWQ6ICR7a2V5fS4ke2NoaWxkTm9kZS5wcm9wZXJ0eS5uYW1lfSAoaW4gJHtuYW1lfSlgKTtcblx0XHRcdFx0XHRcdHRoaXMucmVwbGFjZSh7XG5cdFx0XHRcdFx0XHRcdHR5cGU6ICdJZGVudGlmaWVyJyxcblx0XHRcdFx0XHRcdFx0bmFtZTogJ3VuZGVmaW5lZCcsXG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHR9KTtcblx0XHRcdFx0KHdhbGsgYXMgdHlwZW9mIGVzdHJlZVdhbGtlci53YWxrKShyZW5kZXIuYXJndW1lbnQuYm9keSwge1xuXHRcdFx0XHRcdGVudGVyKGNoaWxkTm9kZSkge1xuXHRcdFx0XHRcdFx0aWYgKGNoaWxkTm9kZS50eXBlICE9PSAnQ2FsbEV4cHJlc3Npb24nKSByZXR1cm47XG5cdFx0XHRcdFx0XHRpZiAoY2hpbGROb2RlLmNhbGxlZS50eXBlICE9PSAnSWRlbnRpZmllcicpIHJldHVybjtcblx0XHRcdFx0XHRcdGlmIChjaGlsZE5vZGUuY2FsbGVlLm5hbWUgIT09ICdub3JtYWxpemVDbGFzcycpIHJldHVybjtcblx0XHRcdFx0XHRcdGlmIChjaGlsZE5vZGUuYXJndW1lbnRzLmxlbmd0aCAhPT0gMSkgcmV0dXJuO1xuXHRcdFx0XHRcdFx0Y29uc3Qgbm9ybWFsaXplZCA9IG5vcm1hbGl6ZUNsYXNzKGNoaWxkTm9kZS5hcmd1bWVudHNbMF0pO1xuXHRcdFx0XHRcdFx0aWYgKG5vcm1hbGl6ZWQgPT09IG51bGwpIHJldHVybjtcblx0XHRcdFx0XHRcdHRoaXMucmVwbGFjZSh7XG5cdFx0XHRcdFx0XHRcdHR5cGU6ICdMaXRlcmFsJyxcblx0XHRcdFx0XHRcdFx0dmFsdWU6IG5vcm1hbGl6ZWQsXG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHRcdGlmIChub2RlLmRlY2xhcmF0aW9uc1swXS5pbml0LmFyZ3VtZW50c1sxXS5lbGVtZW50cy5sZW5ndGggPT09IDEpIHtcblx0XHRcdFx0dGhpcy5yZXBsYWNlKHtcblx0XHRcdFx0XHR0eXBlOiAnVmFyaWFibGVEZWNsYXJhdGlvbicsXG5cdFx0XHRcdFx0ZGVjbGFyYXRpb25zOiBbe1xuXHRcdFx0XHRcdFx0dHlwZTogJ1ZhcmlhYmxlRGVjbGFyYXRvcicsXG5cdFx0XHRcdFx0XHRpZDoge1xuXHRcdFx0XHRcdFx0XHR0eXBlOiAnSWRlbnRpZmllcicsXG5cdFx0XHRcdFx0XHRcdG5hbWU6IG5vZGUuZGVjbGFyYXRpb25zWzBdLmlkLm5hbWUsXG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0aW5pdDoge1xuXHRcdFx0XHRcdFx0XHR0eXBlOiAnSWRlbnRpZmllcicsXG5cdFx0XHRcdFx0XHRcdG5hbWU6IGlkZW50LFxuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHR9XSxcblx0XHRcdFx0XHRraW5kOiAnY29uc3QnLFxuXHRcdFx0XHR9KTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoaXMucmVwbGFjZSh7XG5cdFx0XHRcdFx0dHlwZTogJ1ZhcmlhYmxlRGVjbGFyYXRpb24nLFxuXHRcdFx0XHRcdGRlY2xhcmF0aW9uczogW3tcblx0XHRcdFx0XHRcdHR5cGU6ICdWYXJpYWJsZURlY2xhcmF0b3InLFxuXHRcdFx0XHRcdFx0aWQ6IHtcblx0XHRcdFx0XHRcdFx0dHlwZTogJ0lkZW50aWZpZXInLFxuXHRcdFx0XHRcdFx0XHRuYW1lOiBub2RlLmRlY2xhcmF0aW9uc1swXS5pZC5uYW1lLFxuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdGluaXQ6IHtcblx0XHRcdFx0XHRcdFx0dHlwZTogJ0NhbGxFeHByZXNzaW9uJyxcblx0XHRcdFx0XHRcdFx0Y2FsbGVlOiB7XG5cdFx0XHRcdFx0XHRcdFx0dHlwZTogJ0lkZW50aWZpZXInLFxuXHRcdFx0XHRcdFx0XHRcdG5hbWU6ICdfZXhwb3J0X3NmYycsXG5cdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcdGFyZ3VtZW50czogW3tcblx0XHRcdFx0XHRcdFx0XHR0eXBlOiAnSWRlbnRpZmllcicsXG5cdFx0XHRcdFx0XHRcdFx0bmFtZTogaWRlbnQsXG5cdFx0XHRcdFx0XHRcdH0sIHtcblx0XHRcdFx0XHRcdFx0XHR0eXBlOiAnQXJyYXlFeHByZXNzaW9uJyxcblx0XHRcdFx0XHRcdFx0XHRlbGVtZW50czogbm9kZS5kZWNsYXJhdGlvbnNbMF0uaW5pdC5hcmd1bWVudHNbMV0uZWxlbWVudHMuc2xpY2UoMCwgX19jc3NNb2R1bGVzSW5kZXgpLmNvbmNhdChub2RlLmRlY2xhcmF0aW9uc1swXS5pbml0LmFyZ3VtZW50c1sxXS5lbGVtZW50cy5zbGljZShfX2Nzc01vZHVsZXNJbmRleCArIDEpKSxcblx0XHRcdFx0XHRcdFx0fV0sXG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdH1dLFxuXHRcdFx0XHRcdGtpbmQ6ICdjb25zdCcsXG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH0sXG5cdH0pO1xufVxuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgaW1wb3J0L25vLWRlZmF1bHQtZXhwb3J0XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBwbHVnaW5VbndpbmRDc3NNb2R1bGVDbGFzc05hbWUoKTogUGx1Z2luIHtcblx0cmV0dXJuIHtcblx0XHRuYW1lOiAnVW53aW5kQ3NzTW9kdWxlQ2xhc3NOYW1lJyxcblx0XHRyZW5kZXJDaHVuayhjb2RlKTogeyBjb2RlOiBzdHJpbmcgfSB7XG5cdFx0XHRjb25zdCBhc3QgPSB0aGlzLnBhcnNlKGNvZGUpIGFzIHVua25vd24gYXMgZXN0cmVlLk5vZGU7XG5cdFx0XHR1bndpbmRDc3NNb2R1bGVDbGFzc05hbWUoYXN0KTtcblx0XHRcdHJldHVybiB7IGNvZGU6IGdlbmVyYXRlKGFzdCkgfTtcblx0XHR9LFxuXHR9O1xufVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9taXNza2V5L21pc3NrZXkvbm9kZV9tb2R1bGVzLy5wbnBtL2VzdHJlZS13YWxrZXJAMy4wLjMvbm9kZV9tb2R1bGVzL2VzdHJlZS13YWxrZXIvc3JjXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9taXNza2V5L21pc3NrZXkvbm9kZV9tb2R1bGVzLy5wbnBtL2VzdHJlZS13YWxrZXJAMy4wLjMvbm9kZV9tb2R1bGVzL2VzdHJlZS13YWxrZXIvc3JjL3dhbGtlci5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vaG9tZS9taXNza2V5L21pc3NrZXkvbm9kZV9tb2R1bGVzLy5wbnBtL2VzdHJlZS13YWxrZXJAMy4wLjMvbm9kZV9tb2R1bGVzL2VzdHJlZS13YWxrZXIvc3JjL3dhbGtlci5qc1wiOy8qKlxuICogQHR5cGVkZWYgeyBpbXBvcnQoJ2VzdHJlZScpLk5vZGV9IE5vZGVcbiAqIEB0eXBlZGVmIHt7XG4gKiAgIHNraXA6ICgpID0+IHZvaWQ7XG4gKiAgIHJlbW92ZTogKCkgPT4gdm9pZDtcbiAqICAgcmVwbGFjZTogKG5vZGU6IE5vZGUpID0+IHZvaWQ7XG4gKiB9fSBXYWxrZXJDb250ZXh0XG4gKi9cblxuZXhwb3J0IGNsYXNzIFdhbGtlckJhc2Uge1xuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHQvKiogQHR5cGUge2Jvb2xlYW59ICovXG5cdFx0dGhpcy5zaG91bGRfc2tpcCA9IGZhbHNlO1xuXG5cdFx0LyoqIEB0eXBlIHtib29sZWFufSAqL1xuXHRcdHRoaXMuc2hvdWxkX3JlbW92ZSA9IGZhbHNlO1xuXG5cdFx0LyoqIEB0eXBlIHtOb2RlIHwgbnVsbH0gKi9cblx0XHR0aGlzLnJlcGxhY2VtZW50ID0gbnVsbDtcblxuXHRcdC8qKiBAdHlwZSB7V2Fsa2VyQ29udGV4dH0gKi9cblx0XHR0aGlzLmNvbnRleHQgPSB7XG5cdFx0XHRza2lwOiAoKSA9PiAodGhpcy5zaG91bGRfc2tpcCA9IHRydWUpLFxuXHRcdFx0cmVtb3ZlOiAoKSA9PiAodGhpcy5zaG91bGRfcmVtb3ZlID0gdHJ1ZSksXG5cdFx0XHRyZXBsYWNlOiAobm9kZSkgPT4gKHRoaXMucmVwbGFjZW1lbnQgPSBub2RlKVxuXHRcdH07XG5cdH1cblxuXHQvKipcblx0ICogQHRlbXBsYXRlIHtOb2RlfSBQYXJlbnRcblx0ICogQHBhcmFtIHtQYXJlbnQgfCBudWxsIHwgdW5kZWZpbmVkfSBwYXJlbnRcblx0ICogQHBhcmFtIHtrZXlvZiBQYXJlbnQgfCBudWxsIHwgdW5kZWZpbmVkfSBwcm9wXG5cdCAqIEBwYXJhbSB7bnVtYmVyIHwgbnVsbCB8IHVuZGVmaW5lZH0gaW5kZXhcblx0ICogQHBhcmFtIHtOb2RlfSBub2RlXG5cdCAqL1xuXHRyZXBsYWNlKHBhcmVudCwgcHJvcCwgaW5kZXgsIG5vZGUpIHtcblx0XHRpZiAocGFyZW50ICYmIHByb3ApIHtcblx0XHRcdGlmIChpbmRleCAhPSBudWxsKSB7XG5cdFx0XHRcdC8qKiBAdHlwZSB7QXJyYXk8Tm9kZT59ICovIChwYXJlbnRbcHJvcF0pW2luZGV4XSA9IG5vZGU7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQvKiogQHR5cGUge05vZGV9ICovIChwYXJlbnRbcHJvcF0pID0gbm9kZTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogQHRlbXBsYXRlIHtOb2RlfSBQYXJlbnRcblx0ICogQHBhcmFtIHtQYXJlbnQgfCBudWxsIHwgdW5kZWZpbmVkfSBwYXJlbnRcblx0ICogQHBhcmFtIHtrZXlvZiBQYXJlbnQgfCBudWxsIHwgdW5kZWZpbmVkfSBwcm9wXG5cdCAqIEBwYXJhbSB7bnVtYmVyIHwgbnVsbCB8IHVuZGVmaW5lZH0gaW5kZXhcblx0ICovXG5cdHJlbW92ZShwYXJlbnQsIHByb3AsIGluZGV4KSB7XG5cdFx0aWYgKHBhcmVudCAmJiBwcm9wKSB7XG5cdFx0XHRpZiAoaW5kZXggIT09IG51bGwgJiYgaW5kZXggIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHQvKiogQHR5cGUge0FycmF5PE5vZGU+fSAqLyAocGFyZW50W3Byb3BdKS5zcGxpY2UoaW5kZXgsIDEpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZGVsZXRlIHBhcmVudFtwcm9wXTtcblx0XHRcdH1cblx0XHR9XG5cdH1cbn1cbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL2hvbWUvbWlzc2tleS9taXNza2V5L25vZGVfbW9kdWxlcy8ucG5wbS9lc3RyZWUtd2Fsa2VyQDMuMC4zL25vZGVfbW9kdWxlcy9lc3RyZWUtd2Fsa2VyL3NyY1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUvbWlzc2tleS9taXNza2V5L25vZGVfbW9kdWxlcy8ucG5wbS9lc3RyZWUtd2Fsa2VyQDMuMC4zL25vZGVfbW9kdWxlcy9lc3RyZWUtd2Fsa2VyL3NyYy9zeW5jLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL21pc3NrZXkvbWlzc2tleS9ub2RlX21vZHVsZXMvLnBucG0vZXN0cmVlLXdhbGtlckAzLjAuMy9ub2RlX21vZHVsZXMvZXN0cmVlLXdhbGtlci9zcmMvc3luYy5qc1wiO2ltcG9ydCB7IFdhbGtlckJhc2UgfSBmcm9tICcuL3dhbGtlci5qcyc7XG5cbi8qKlxuICogQHR5cGVkZWYgeyBpbXBvcnQoJ2VzdHJlZScpLk5vZGV9IE5vZGVcbiAqIEB0eXBlZGVmIHsgaW1wb3J0KCcuL3dhbGtlci5qcycpLldhbGtlckNvbnRleHR9IFdhbGtlckNvbnRleHRcbiAqIEB0eXBlZGVmIHsoXG4gKiAgICB0aGlzOiBXYWxrZXJDb250ZXh0LFxuICogICAgbm9kZTogTm9kZSxcbiAqICAgIHBhcmVudDogTm9kZSB8IG51bGwsXG4gKiAgICBrZXk6IHN0cmluZyB8IG51bWJlciB8IHN5bWJvbCB8IG51bGwgfCB1bmRlZmluZWQsXG4gKiAgICBpbmRleDogbnVtYmVyIHwgbnVsbCB8IHVuZGVmaW5lZFxuICogKSA9PiB2b2lkfSBTeW5jSGFuZGxlclxuICovXG5cbmV4cG9ydCBjbGFzcyBTeW5jV2Fsa2VyIGV4dGVuZHMgV2Fsa2VyQmFzZSB7XG5cdC8qKlxuXHQgKlxuXHQgKiBAcGFyYW0ge1N5bmNIYW5kbGVyfSBbZW50ZXJdXG5cdCAqIEBwYXJhbSB7U3luY0hhbmRsZXJ9IFtsZWF2ZV1cblx0ICovXG5cdGNvbnN0cnVjdG9yKGVudGVyLCBsZWF2ZSkge1xuXHRcdHN1cGVyKCk7XG5cblx0XHQvKiogQHR5cGUge2Jvb2xlYW59ICovXG5cdFx0dGhpcy5zaG91bGRfc2tpcCA9IGZhbHNlO1xuXG5cdFx0LyoqIEB0eXBlIHtib29sZWFufSAqL1xuXHRcdHRoaXMuc2hvdWxkX3JlbW92ZSA9IGZhbHNlO1xuXG5cdFx0LyoqIEB0eXBlIHtOb2RlIHwgbnVsbH0gKi9cblx0XHR0aGlzLnJlcGxhY2VtZW50ID0gbnVsbDtcblxuXHRcdC8qKiBAdHlwZSB7V2Fsa2VyQ29udGV4dH0gKi9cblx0XHR0aGlzLmNvbnRleHQgPSB7XG5cdFx0XHRza2lwOiAoKSA9PiAodGhpcy5zaG91bGRfc2tpcCA9IHRydWUpLFxuXHRcdFx0cmVtb3ZlOiAoKSA9PiAodGhpcy5zaG91bGRfcmVtb3ZlID0gdHJ1ZSksXG5cdFx0XHRyZXBsYWNlOiAobm9kZSkgPT4gKHRoaXMucmVwbGFjZW1lbnQgPSBub2RlKVxuXHRcdH07XG5cblx0XHQvKiogQHR5cGUge1N5bmNIYW5kbGVyIHwgdW5kZWZpbmVkfSAqL1xuXHRcdHRoaXMuZW50ZXIgPSBlbnRlcjtcblxuXHRcdC8qKiBAdHlwZSB7U3luY0hhbmRsZXIgfCB1bmRlZmluZWR9ICovXG5cdFx0dGhpcy5sZWF2ZSA9IGxlYXZlO1xuXHR9XG5cblx0LyoqXG5cdCAqIEB0ZW1wbGF0ZSB7Tm9kZX0gUGFyZW50XG5cdCAqIEBwYXJhbSB7Tm9kZX0gbm9kZVxuXHQgKiBAcGFyYW0ge1BhcmVudCB8IG51bGx9IHBhcmVudFxuXHQgKiBAcGFyYW0ge2tleW9mIFBhcmVudH0gW3Byb3BdXG5cdCAqIEBwYXJhbSB7bnVtYmVyIHwgbnVsbH0gW2luZGV4XVxuXHQgKiBAcmV0dXJucyB7Tm9kZSB8IG51bGx9XG5cdCAqL1xuXHR2aXNpdChub2RlLCBwYXJlbnQsIHByb3AsIGluZGV4KSB7XG5cdFx0aWYgKG5vZGUpIHtcblx0XHRcdGlmICh0aGlzLmVudGVyKSB7XG5cdFx0XHRcdGNvbnN0IF9zaG91bGRfc2tpcCA9IHRoaXMuc2hvdWxkX3NraXA7XG5cdFx0XHRcdGNvbnN0IF9zaG91bGRfcmVtb3ZlID0gdGhpcy5zaG91bGRfcmVtb3ZlO1xuXHRcdFx0XHRjb25zdCBfcmVwbGFjZW1lbnQgPSB0aGlzLnJlcGxhY2VtZW50O1xuXHRcdFx0XHR0aGlzLnNob3VsZF9za2lwID0gZmFsc2U7XG5cdFx0XHRcdHRoaXMuc2hvdWxkX3JlbW92ZSA9IGZhbHNlO1xuXHRcdFx0XHR0aGlzLnJlcGxhY2VtZW50ID0gbnVsbDtcblxuXHRcdFx0XHR0aGlzLmVudGVyLmNhbGwodGhpcy5jb250ZXh0LCBub2RlLCBwYXJlbnQsIHByb3AsIGluZGV4KTtcblxuXHRcdFx0XHRpZiAodGhpcy5yZXBsYWNlbWVudCkge1xuXHRcdFx0XHRcdG5vZGUgPSB0aGlzLnJlcGxhY2VtZW50O1xuXHRcdFx0XHRcdHRoaXMucmVwbGFjZShwYXJlbnQsIHByb3AsIGluZGV4LCBub2RlKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmICh0aGlzLnNob3VsZF9yZW1vdmUpIHtcblx0XHRcdFx0XHR0aGlzLnJlbW92ZShwYXJlbnQsIHByb3AsIGluZGV4KTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGNvbnN0IHNraXBwZWQgPSB0aGlzLnNob3VsZF9za2lwO1xuXHRcdFx0XHRjb25zdCByZW1vdmVkID0gdGhpcy5zaG91bGRfcmVtb3ZlO1xuXG5cdFx0XHRcdHRoaXMuc2hvdWxkX3NraXAgPSBfc2hvdWxkX3NraXA7XG5cdFx0XHRcdHRoaXMuc2hvdWxkX3JlbW92ZSA9IF9zaG91bGRfcmVtb3ZlO1xuXHRcdFx0XHR0aGlzLnJlcGxhY2VtZW50ID0gX3JlcGxhY2VtZW50O1xuXG5cdFx0XHRcdGlmIChza2lwcGVkKSByZXR1cm4gbm9kZTtcblx0XHRcdFx0aWYgKHJlbW92ZWQpIHJldHVybiBudWxsO1xuXHRcdFx0fVxuXG5cdFx0XHQvKiogQHR5cGUge2tleW9mIE5vZGV9ICovXG5cdFx0XHRsZXQga2V5O1xuXG5cdFx0XHRmb3IgKGtleSBpbiBub2RlKSB7XG5cdFx0XHRcdC8qKiBAdHlwZSB7dW5rbm93bn0gKi9cblx0XHRcdFx0Y29uc3QgdmFsdWUgPSBub2RlW2tleV07XG5cblx0XHRcdFx0aWYgKHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcblx0XHRcdFx0XHRpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcblx0XHRcdFx0XHRcdGNvbnN0IG5vZGVzID0gLyoqIEB0eXBlIHtBcnJheTx1bmtub3duPn0gKi8gKHZhbHVlKTtcblx0XHRcdFx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgbm9kZXMubGVuZ3RoOyBpICs9IDEpIHtcblx0XHRcdFx0XHRcdFx0Y29uc3QgaXRlbSA9IG5vZGVzW2ldO1xuXHRcdFx0XHRcdFx0XHRpZiAoaXNOb2RlKGl0ZW0pKSB7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKCF0aGlzLnZpc2l0KGl0ZW0sIG5vZGUsIGtleSwgaSkpIHtcblx0XHRcdFx0XHRcdFx0XHRcdC8vIHJlbW92ZWRcblx0XHRcdFx0XHRcdFx0XHRcdGktLTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9IGVsc2UgaWYgKGlzTm9kZSh2YWx1ZSkpIHtcblx0XHRcdFx0XHRcdHRoaXMudmlzaXQodmFsdWUsIG5vZGUsIGtleSwgbnVsbCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGlmICh0aGlzLmxlYXZlKSB7XG5cdFx0XHRcdGNvbnN0IF9yZXBsYWNlbWVudCA9IHRoaXMucmVwbGFjZW1lbnQ7XG5cdFx0XHRcdGNvbnN0IF9zaG91bGRfcmVtb3ZlID0gdGhpcy5zaG91bGRfcmVtb3ZlO1xuXHRcdFx0XHR0aGlzLnJlcGxhY2VtZW50ID0gbnVsbDtcblx0XHRcdFx0dGhpcy5zaG91bGRfcmVtb3ZlID0gZmFsc2U7XG5cblx0XHRcdFx0dGhpcy5sZWF2ZS5jYWxsKHRoaXMuY29udGV4dCwgbm9kZSwgcGFyZW50LCBwcm9wLCBpbmRleCk7XG5cblx0XHRcdFx0aWYgKHRoaXMucmVwbGFjZW1lbnQpIHtcblx0XHRcdFx0XHRub2RlID0gdGhpcy5yZXBsYWNlbWVudDtcblx0XHRcdFx0XHR0aGlzLnJlcGxhY2UocGFyZW50LCBwcm9wLCBpbmRleCwgbm9kZSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAodGhpcy5zaG91bGRfcmVtb3ZlKSB7XG5cdFx0XHRcdFx0dGhpcy5yZW1vdmUocGFyZW50LCBwcm9wLCBpbmRleCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRjb25zdCByZW1vdmVkID0gdGhpcy5zaG91bGRfcmVtb3ZlO1xuXG5cdFx0XHRcdHRoaXMucmVwbGFjZW1lbnQgPSBfcmVwbGFjZW1lbnQ7XG5cdFx0XHRcdHRoaXMuc2hvdWxkX3JlbW92ZSA9IF9zaG91bGRfcmVtb3ZlO1xuXG5cdFx0XHRcdGlmIChyZW1vdmVkKSByZXR1cm4gbnVsbDtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gbm9kZTtcblx0fVxufVxuXG4vKipcbiAqIER1Y2t0eXBlIGEgbm9kZS5cbiAqXG4gKiBAcGFyYW0ge3Vua25vd259IHZhbHVlXG4gKiBAcmV0dXJucyB7dmFsdWUgaXMgTm9kZX1cbiAqL1xuZnVuY3Rpb24gaXNOb2RlKHZhbHVlKSB7XG5cdHJldHVybiAoXG5cdFx0dmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiAndHlwZScgaW4gdmFsdWUgJiYgdHlwZW9mIHZhbHVlLnR5cGUgPT09ICdzdHJpbmcnXG5cdCk7XG59XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9ob21lL21pc3NrZXkvbWlzc2tleS9ub2RlX21vZHVsZXMvLnBucG0vZXN0cmVlLXdhbGtlckAzLjAuMy9ub2RlX21vZHVsZXMvZXN0cmVlLXdhbGtlci9zcmNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9ob21lL21pc3NrZXkvbWlzc2tleS9ub2RlX21vZHVsZXMvLnBucG0vZXN0cmVlLXdhbGtlckAzLjAuMy9ub2RlX21vZHVsZXMvZXN0cmVlLXdhbGtlci9zcmMvaW5kZXguanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL2hvbWUvbWlzc2tleS9taXNza2V5L25vZGVfbW9kdWxlcy8ucG5wbS9lc3RyZWUtd2Fsa2VyQDMuMC4zL25vZGVfbW9kdWxlcy9lc3RyZWUtd2Fsa2VyL3NyYy9pbmRleC5qc1wiO2ltcG9ydCB7IFN5bmNXYWxrZXIgfSBmcm9tICcuL3N5bmMuanMnO1xuaW1wb3J0IHsgQXN5bmNXYWxrZXIgfSBmcm9tICcuL2FzeW5jLmpzJztcblxuLyoqXG4gKiBAdHlwZWRlZiB7aW1wb3J0KCdlc3RyZWUnKS5Ob2RlfSBOb2RlXG4gKiBAdHlwZWRlZiB7aW1wb3J0KCcuL3N5bmMuanMnKS5TeW5jSGFuZGxlcn0gU3luY0hhbmRsZXJcbiAqIEB0eXBlZGVmIHtpbXBvcnQoJy4vYXN5bmMuanMnKS5Bc3luY0hhbmRsZXJ9IEFzeW5jSGFuZGxlclxuICovXG5cbi8qKlxuICogQHBhcmFtIHtOb2RlfSBhc3RcbiAqIEBwYXJhbSB7e1xuICogICBlbnRlcj86IFN5bmNIYW5kbGVyXG4gKiAgIGxlYXZlPzogU3luY0hhbmRsZXJcbiAqIH19IHdhbGtlclxuICogQHJldHVybnMge05vZGUgfCBudWxsfVxuICovXG5leHBvcnQgZnVuY3Rpb24gd2Fsayhhc3QsIHsgZW50ZXIsIGxlYXZlIH0pIHtcblx0Y29uc3QgaW5zdGFuY2UgPSBuZXcgU3luY1dhbGtlcihlbnRlciwgbGVhdmUpO1xuXHRyZXR1cm4gaW5zdGFuY2UudmlzaXQoYXN0LCBudWxsKTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge05vZGV9IGFzdFxuICogQHBhcmFtIHt7XG4gKiAgIGVudGVyPzogQXN5bmNIYW5kbGVyXG4gKiAgIGxlYXZlPzogQXN5bmNIYW5kbGVyXG4gKiB9fSB3YWxrZXJcbiAqIEByZXR1cm5zIHtQcm9taXNlPE5vZGUgfCBudWxsPn1cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFzeW5jV2Fsayhhc3QsIHsgZW50ZXIsIGxlYXZlIH0pIHtcblx0Y29uc3QgaW5zdGFuY2UgPSBuZXcgQXN5bmNXYWxrZXIoZW50ZXIsIGxlYXZlKTtcblx0cmV0dXJuIGF3YWl0IGluc3RhbmNlLnZpc2l0KGFzdCwgbnVsbCk7XG59XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9ob21lL21pc3NrZXkvbWlzc2tleS9wYWNrYWdlcy9mcm9udGVuZFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUvbWlzc2tleS9taXNza2V5L3BhY2thZ2VzL2Zyb250ZW5kL3ZpdGUuanNvbjUudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL2hvbWUvbWlzc2tleS9taXNza2V5L3BhY2thZ2VzL2Zyb250ZW5kL3ZpdGUuanNvbjUudHNcIjsvLyBPcmlnaW5hbDogaHR0cHM6Ly9naXRodWIuY29tL3JvbGx1cC9wbHVnaW5zL3RyZWUvODgzNWRkMmFlZDkyZjQwOGQ3ZGM3MmQ3Y2MyNWE5NzI4ZTE2ZmFjZS9wYWNrYWdlcy9qc29uXG5cbmltcG9ydCBKU09ONSBmcm9tICdqc29uNSc7XG5pbXBvcnQgeyBQbHVnaW4gfSBmcm9tICdyb2xsdXAnO1xuaW1wb3J0IHsgY3JlYXRlRmlsdGVyLCBkYXRhVG9Fc20gfSBmcm9tICdAcm9sbHVwL3BsdWdpbnV0aWxzJztcbmltcG9ydCB7IFJvbGx1cEpzb25PcHRpb25zIH0gZnJvbSAnQHJvbGx1cC9wbHVnaW4tanNvbic7XG5cbi8vIGpzb241IGV4dGVuZHMgU3ludGF4RXJyb3Igd2l0aCBhZGRpdGlvbmFsIGZpZWxkcyAod2l0aG91dCBzdWJjbGFzc2luZylcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9qc29uNS9qc29uNS9ibG9iL2RlMzQ0ZjA2MTliZGExNDY1YTZlMjVjNzZmMWMwYzNkZGE4MTA4ZDkvbGliL3BhcnNlLmpzI0wxMTExLUwxMTEyXG5pbnRlcmZhY2UgSnNvbjVTeW50YXhFcnJvciBleHRlbmRzIFN5bnRheEVycm9yIHtcblx0bGluZU51bWJlcjogbnVtYmVyO1xuXHRjb2x1bW5OdW1iZXI6IG51bWJlcjtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24ganNvbjUob3B0aW9uczogUm9sbHVwSnNvbk9wdGlvbnMgPSB7fSk6IFBsdWdpbiB7XG5cdGNvbnN0IGZpbHRlciA9IGNyZWF0ZUZpbHRlcihvcHRpb25zLmluY2x1ZGUsIG9wdGlvbnMuZXhjbHVkZSk7XG5cdGNvbnN0IGluZGVudCA9ICdpbmRlbnQnIGluIG9wdGlvbnMgPyBvcHRpb25zLmluZGVudCA6ICdcXHQnO1xuXG5cdHJldHVybiB7XG5cdFx0bmFtZTogJ2pzb241JyxcblxuXHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1zaGFkb3dcblx0XHR0cmFuc2Zvcm0oanNvbiwgaWQpIHtcblx0XHRcdGlmIChpZC5zbGljZSgtNikgIT09ICcuanNvbjUnIHx8ICFmaWx0ZXIoaWQpKSByZXR1cm4gbnVsbDtcblxuXHRcdFx0dHJ5IHtcblx0XHRcdFx0Y29uc3QgcGFyc2VkID0gSlNPTjUucGFyc2UoanNvbik7XG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0Y29kZTogZGF0YVRvRXNtKHBhcnNlZCwge1xuXHRcdFx0XHRcdFx0cHJlZmVyQ29uc3Q6IG9wdGlvbnMucHJlZmVyQ29uc3QsXG5cdFx0XHRcdFx0XHRjb21wYWN0OiBvcHRpb25zLmNvbXBhY3QsXG5cdFx0XHRcdFx0XHRuYW1lZEV4cG9ydHM6IG9wdGlvbnMubmFtZWRFeHBvcnRzLFxuXHRcdFx0XHRcdFx0aW5kZW50LFxuXHRcdFx0XHRcdH0pLFxuXHRcdFx0XHRcdG1hcDogeyBtYXBwaW5nczogJycgfSxcblx0XHRcdFx0fTtcblx0XHRcdH0gY2F0Y2ggKGVycikge1xuXHRcdFx0XHRpZiAoIShlcnIgaW5zdGFuY2VvZiBTeW50YXhFcnJvcikpIHtcblx0XHRcdFx0XHR0aHJvdyBlcnI7XG5cdFx0XHRcdH1cblx0XHRcdFx0Y29uc3QgbWVzc2FnZSA9ICdDb3VsZCBub3QgcGFyc2UgSlNPTjUgZmlsZSc7XG5cdFx0XHRcdGNvbnN0IHsgbGluZU51bWJlciwgY29sdW1uTnVtYmVyIH0gPSBlcnIgYXMgSnNvbjVTeW50YXhFcnJvcjtcblx0XHRcdFx0dGhpcy53YXJuKHsgbWVzc2FnZSwgaWQsIGxvYzogeyBsaW5lOiBsaW5lTnVtYmVyLCBjb2x1bW46IGNvbHVtbk51bWJlciB9IH0pO1xuXHRcdFx0XHRyZXR1cm4gbnVsbDtcblx0XHRcdH1cblx0XHR9LFxuXHR9O1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUF1UyxPQUFPLFVBQVU7QUFDeFQsT0FBTyxtQkFBbUI7QUFDMUIsT0FBTyxlQUFlO0FBQ3RCLFNB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
