// If you want to use other PostCSS plugins, see the following:
// https://tailwindcss.com/docs/using-with-preprocessors
module.exports = {
    plugins: [
        'postcss-import',
        'tailwindcss',
        'postcss-nested',
        'autoprefixer',
        // [
        //  'postcss-preset-env',
        //  {
        //      autoprefixer: {
        //          flexbox: 'no-2009',
        //      },
        //      stage: 3,
        //      features: {
        //          'custom-properties': true,
        //          'nesting-rules': true,
        //      },
        //  },
        // ],
    ],
}
