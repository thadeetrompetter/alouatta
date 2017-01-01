module.exports = {
    css: './source/main.less',
    taskDir: './tasks',
    pages: './pages',
    html: [
        'source/views/[^_]*/*.html'
    ],
    meta: 'meta.json',
    script: './source/main.js',
    dist: './dist',
    distAssets: './dist/assets',
    tmp: './tmp',
    paths: {
        assets: './source/components/*/assets/**/*.*',
        processedImages: './tmp/**/*.*',
        lessFiles: './source/**/*.less',
        jsFiles: [
            './source/**/*.js',
            '!./source/components/*/assets/**/*.js'
        ],
        eslint: './source/.eslintrc.json',
        htmlFiles: [
            './source/**/*.html',
            './pages/**/*.md'
        ]
    }
};
