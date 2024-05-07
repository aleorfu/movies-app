module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "@babel/plugin-transform-json-strings",
      "@babel/plugin-transform-unicode-property-regex",
      "@babel/plugin-transform-async-generator-functions",
      "nativewind/babel",
      "module:@preact/signals-react-transform",
    ],
  };
};
