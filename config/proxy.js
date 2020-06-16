/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 */
export default {
  dev: {
    '/api/': {
      /* target: 'http://localhost:5000', */
      // target:'http://192.168.2.108:3000',
      target:'http://192.168.1.211:3000/',
      changeOrigin: true,
      pathRewrite: {
        '^': '',
      },
    },
  },
  test: {  
    '/api/': {
      target: 'http://192.168.1.211:3000',
      changeOrigin: true,
      pathRewrite: {
        '^': '',
      },
    },
  },
  pre: {
    '/api/': {
      target: 'http://192.168.1.211:3000',
      changeOrigin: true,
      pathRewrite: {
        '^': '',
      },
    },
  },
};
