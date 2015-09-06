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
        lessFiles: './source/**/*.less',
        jsFiles: './source/**/*.js',
        htmlFiles: [
            './source/**/*.html',
            './pages/**/*.md'
        ]
    }
};
