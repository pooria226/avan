const nextTranslate = require("next-translate-plugin");
const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
});
const { i18n } = require("./i18n.js");
module.exports = withPWA(
  nextTranslate({
    reactStrictMode: true,
    images: {
      domains: `${process.env.NEXT_PUBLIC_IMAGE_URL}`.split(","),
      deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    },
    webpack: (config, { isServer }) => {
      config.module.rules.push({
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ["@svgr/webpack"],
      });
      return config;
    },
    i18n,
  })
);
