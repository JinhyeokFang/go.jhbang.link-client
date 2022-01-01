module.exports = {
  transpileDependencies: [
    'vuetify',
  ],
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "@/scss/_variables.scss"`
      }
    }
  },
};
