import * as esbuild from "esbuild";
import { readFile, writeFile, readdir, cp } from "node:fs/promises";

await esbuild.build({
  entryPoints: ["source.js"],
  bundle: true,
  write: true,
  format: "esm",
  outfile: "index.js",
});

// copy the .d.(m)ts files from deepmerge and ensure they are also published, for TS support
const dtsFiles = (await readdir("./node_modules/deepmerge")).filter(
  (f) => f.endsWith(".d.ts") || f.endsWith(".d.mts"),
);

await Promise.all(
  dtsFiles.map(async (f) => {
    await cp(`./node_modules/deepmerge/${f}`, `./${f}`);
    const contents = await readFile(f, "utf-8");
    await writeFile(
      f,
      // maybe we can use rollup-plugin-dts in future?
      contents.replace("export = ", "export default "),
      "utf-8",
    );
  }),
);
