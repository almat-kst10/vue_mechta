import { createApp } from 'vue';
import {router, store} from './providers';
import App from './index.vue';
import VueSweetalert2 from 'vue-sweetalert2';

// import BaseIcon from '@/shared/components/BaseIcon'

export const app = createApp(App)
.use(router)
.use(store)
.use(VueSweetalert2)
// .use(BaseIcon)