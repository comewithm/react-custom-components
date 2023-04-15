const path = require('path')

module.exports = {
    entry: path.join(__dirname, './src/index.ts'),
    output: {
        path: path.join(__dirname, './dist'),
        publicPath: '/'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
    },
    externals: {},
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-react",
                            "@babel/preset-typescript"
                        ]
                    }
                }
            }
        ]
    }
}