import deepmerge from "./index-esm.js";

// tiny smoke test
console.assert(
  JSON.stringify(deepmerge({ foo: "bar" }, { baz: "qux" })) ===
    JSON.stringify({ foo: "bar", baz: "qux" })
);
