module.exports = {
  // 选项...
  lintOnSave: false, //是否开启eslint校验
  
  
  devServer: {
    port: 9002,
    proxy: {
      //配置代理，解决跨域请求后台数据的问题
      '/api': {
        target: 'http://localhost:9001/', //后台接口
        ws: true, //是否跨域
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/',
        },
      },
    },
  },
}
