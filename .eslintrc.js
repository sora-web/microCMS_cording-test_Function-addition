module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ["eslint:recommended", "plugin:react/recommended", "prettier"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint", "prettier"],
  rules: {
    "@typescript-eslint/explicit-module-boundary-types": "off",

    "@typescript-eslint/ba-ts-comment": "off",
    "react/react-in-jsx-scope": "off",
    "prettier/prettier": "error",
  },
  setting: {
    react: {
      version: "detect",
    },
  },
};
