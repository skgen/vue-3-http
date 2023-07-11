import { createMelkorUi } from '@patriarche/melkor';

import '@patriarche/melkor/style';
import '@/assets/scss/main.scss';

import router from '@/plugins/router';

const mkui = createMelkorUi({
  router,
});

export default mkui;
