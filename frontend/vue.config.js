const path = require('path')

module.exports = {
    publicPath: '/',
    outputDir: '../.deploy/frontend/dist',
    assetsDir: '',
    indexPath: 'index.html',
    filenameHashing: true,
    pages: undefined,
    productionSourceMap: false,
    chainWebpack: config => {
        config.module
            .rule('vue')
            .test(/\.vue$/)
            .use('vue-loader')
            .tap(options => options)
            .end()
    },
    css: {
        loaderOptions: {
            sass: {
                includePaths: [
                    path.resolve(__dirname, 'node_modules')
                ]
            }
        }
    }
}