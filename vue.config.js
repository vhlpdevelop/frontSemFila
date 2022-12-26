const plugins =[];
if(process.env.NODE_ENV === 'production'){
  const {join} = require('path')
  const PrerenderSpaPlugin = require('prerender-spa-plugin')
  const render = PrerenderSpaPlugin.PuppeteerRenderer;
  plugins.unshift(new PrerenderSpaPlugin({
    staticDir: join(__dirname, 'dist'),
    routes:['/','/home', '/comece', '/tornarSemFila', '/carreiras'],
    renderer: new render({
      renderAfterDocumentEvent: 'render-complete',
      injectProperty: "__PRERENDER_INJECTED",
      inject: {
        prerendered: false,
      },
      headless: false,
      ignoreHTTPSErrors: true,
      maxConcurrentRoutes: 1,
    }),
  }));
}
module.exports = {
    configureWebpack(config){
      config.plugins=[
        ...config.plugins,
        ...plugins
      ]
    },
    devServer: {
        https: true,
        disableHostCheck: true,
        port: 8081,
        public: '0.0.0.0:8081'
    },
    publicPath: "/"
}