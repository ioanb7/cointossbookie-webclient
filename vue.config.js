
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
let assetsDir = "cointossbookie";
module.exports = {
    configureWebpack: {
        optimization: {
            minimizer: [new UglifyJsPlugin()],
        },
        devtool: 'source-map'
    },

    transpileDependencies: ['vuex-module-decorators'],

    //https://dev.to/coolgoose/static--fixed-filenames-for-generated-vue-cli-builds-3a2l
    assetsDir: 'cointossbookie',

    // outputDir: assetsDir, // TODO: ideally the same.
    configureWebpack: {
        output: {
            filename: assetsDir + "/[name].js",
            chunkFilename: assetsDir + "/[name].js"
        }
    },

    chainWebpack: config => {
        if (config.plugins.has("extract-css")) {
            const extractCSSPlugin = config.plugin("extract-css");

            if (extractCSSPlugin) {
                extractCSSPlugin.tap(() => [{
                    filename: assetsDir + "/[name].css",
                    chunkFilename: assetsDir + "/[name].css"
                    }]);
            }
        }
/*
        config.plugins
            .delete("html")
            .delete("prefetch")
            .delete("preload");*/
    },

    productionSourceMap: false
}