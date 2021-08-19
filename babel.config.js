module.exports = {
  presets: ["@babel/env"],
  plugins:
    process.env.NODE_ENV === "production" ? ["transform-remove-console"] : [],
};
