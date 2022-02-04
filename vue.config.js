// vue.config.js
module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "" : "./",
  //构建项目生成的目录
  outputDir: process.env.NODE_ENV === "production" ? "dist" : "devDist",
  //关闭语法的自动检测
  lintOnSave: false,

  /*
  svg配置
  */

  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "./src/styles/main.scss";`,
      },
    },
  },
  devServer: {
    open: false, //运行项目后是否自动打开
    host:"0.0.0.0", //可以让外部访问
    port: 8000,
    proxy: {
      [process.env.VUE_APP_FLAG]: {
        target: process.env.VUE_APP_APIURL, //接口地址
        ws: true,           //是否开启websockets
        changeOrigin: true,  //是否开启跨域
        secure: false,
        pathRewrite: {
          [`^${process.env.VUE_APP_FLAG}`]: ''      //查找开头为 /api 的字符，替换成空字符串
        }
      },
    }
  },
};