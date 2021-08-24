module.exports = {
  extends: [
    /* Provides support for all ESLint core rules. */
    "@arcticicestudio/eslint-config-base",
    /*
     * Optional entry point to enable support for projects using Prettier.
     * Note that this must always be placed after the `@arcticicestudio/eslint-config-base` preset to take precedence,
     * otherwise it won't prevent errors due to useless and possibly conflicting rules!
     */
    "@arcticicestudio/eslint-config-base/prettier",
  ],
  plugins: ["import"],
  rules: {
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: ["**/*.js"],
      },
    ],
  },
};
