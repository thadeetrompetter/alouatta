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
    paths: {
        assets: './source/components/*/assets/**/*.*',
        lessFiles: './source/**/*.less',
        jsFiles: [
            './source/**/*.js',
            '!./source/components/*/assets/**/*.js'
        ],
        htmlFiles: [
            './source/**/*.html',
            './pages/**/*.md'
        ]
    }
};
