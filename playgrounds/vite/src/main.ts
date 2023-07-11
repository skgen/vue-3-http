import { createApp } from 'vue';

import { createHttpProvider } from '@patriarche/vue-http';
import mkui from '@/plugins/melkor';
import App from '@/App.vue';

createHttpProvider({
  baseURL: 'https://swapi.dev/api',
}, {
  main: true,
});

const app = createApp(App);

app.use(mkui);

app.mount('#app');
