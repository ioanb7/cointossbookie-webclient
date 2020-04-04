module.exports = {
    configureWebpack: {
        devtool: 'source-map'
    },
    outputDir: path.resolve(__dirname, "./wwwroot/dist"),
    chainWebpack: config => {
        config.resolve.alias
            .set("@api", path.resolve(__dirname, "./src/api"));
    }
}