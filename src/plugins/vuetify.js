import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#00c9d7',
        secondary: '#31353e',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#00c9d7',
        success: '#4CAF50',
        warning: '#FFC107',
      },
    },
  },
  icons: {
    iconfont: 'mdi', // default - only for display purposes
  },
});
