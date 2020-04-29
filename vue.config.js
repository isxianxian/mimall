const path = require('path');

module.exports = {
    lintOnSave: false,
    devServer: {
        host: "localhost",
        port: 8080,
        proxy: {
            '/api': {
                target: 'http://mall-pre.springboot.cn',
                changeOrigin: true,
                pathRewrite: {
                    '/api': ''
                }
            }
        }
    },
    chainWebpack: config => {
        config.resolve.alias
            .set('@', path.resolve(__dirname, 'src'))
            .set('coms', path.resolve(__dirname, 'src/components'))
            .set('scss', path.resolve(__dirname, 'src/assets/scss'))
    }
}