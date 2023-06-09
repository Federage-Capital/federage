module.exports = {
  images: {
    domains: [process.env.NEXT_IMAGE_DOMAIN],
  },
  images: {
  dangerouslyAllowSVG: true,
  contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
},
  typescript: {
  // !! WARN !!
  // Dangerously allow production builds to successfully complete even if
  // your project has type errors.
  // !! WARN !!
  ignoreBuildErrors: true,
},
webpack(config) {
   config.module.rules.push({
     test: /\.svg$/,
     use: ["@svgr/webpack"]
   });

   return config;
 },
}
