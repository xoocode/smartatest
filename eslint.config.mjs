import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    /* Arbetsmappen. Utkast, provkörningar och tillfälliga skript hör hemma där
       enligt CLAUDE.md, och de är per definition halvfärdiga. Att lint:en
       fällde bygget på en oanvänd variabel i ett provskript är fel sorts
       larm: mappen är gitignorerad och når aldrig produktion. */
    ".agent/**",
  ]),
]);

export default eslintConfig;
