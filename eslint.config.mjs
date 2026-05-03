import nextVitals from "eslint-config-next/core-web-vitals";
import tseslint from "eslint-config-next/typescript";

const eslintConfig = [...nextVitals, ...tseslint];

export default eslintConfig;
