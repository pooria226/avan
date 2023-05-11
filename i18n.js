module.exports = {
  defaultLocale: "en",
  locales: ["fa", "en"],
  localeDetection: false,
  pages: {
    "*": ["common"],
    "/": ["home"],
    "/cart": ["cart"],
    "/content/[slug]": ["content"],
    "rgx:^/account": ["account"],
  },
};
