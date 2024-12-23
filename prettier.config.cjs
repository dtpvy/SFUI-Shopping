module.exports = {
  arrowParens: "always",
  bracketSpacing: true,
  bracketSameLine: false,
  printWidth: 80,
  proseWrap: "always",
  semi: true,
  singleQuote: false,
  tabWidth: 2,
  trailingComma: "all",
  useTabs: false,
  plugins: ["@trivago/prettier-plugin-sort-imports"],
  importOrder: [
    "^react$",
    "^react-dom$",
    "<THIRD_PARTY_MODULES>",
    "^@/",
    "^[./]",
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
