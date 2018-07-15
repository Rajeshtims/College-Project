const path = require('path');
module.exports = {
    entry:'./app.js',
    output:{
        path: path.resolve(__dirname,''),
        filename:'app.js'
    },
    module:{
        loaders:[
            {
                test:/\.js$/,
                loaders:'babel-loader',
                exclude:/node_modules/,
                query:{
                    presets:['es2015','react']
                }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }

        ]
    },
    devServer: {
        historyApiFallback: true
    }
};