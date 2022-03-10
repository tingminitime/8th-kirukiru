module.exports = {
  env: {
    browser: true,
    node: true,
  },
  extends: [
    "prettier",
    "plugin:vue/vue3-recommended"
  ],
  rules: {
    "vue/no-unused-vars": "error",
    "vue/script-setup-uses-vars": "off",
    "vue/multi-word-component-names": "warn",
    "vue/html-self-closing": ["error", {
      "html": {
        "void": "never",
        "normal": "never",
        "component": "never"
      },
      "svg": "never",
      "math": "never"
    }]
  },
};
