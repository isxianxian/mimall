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
            .set('scss', path.resolve(__dirname, 'src/assets/scss'));

        config.plugins.delete('prefetch')

    },
    // assetsDir: 'static',
    // publicPath: '/',  // 域名/项目内容
    // outputDir: 'dist',   // 打包生成的文件
    // indexPath: 'index.html', // 生成的html路径，相对于outputDir
    // filenameHashing: true,  // 使生成的静态文件名中自带hash值==>游览器的缓存机制
    // lintOnSave: false,    // eslint 检查，用设为true
    // productionSourceMap: false, // 生产环境的sourceMap,要关闭，防止代码泄露
}