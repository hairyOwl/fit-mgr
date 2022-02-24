module.exports = {
  lintOnSave: false,

  //ant 主题定制
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          // If you are using less-loader@5 please spread the lessOptions to options directly
          modifyVars: {
            'primary-color': '#0aa679',
            'link-color': '#0aa679',
            'border-radius-base': '4px',
          },
          javascriptEnabled: true,
        },
      },
    },
  },
};
