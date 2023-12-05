import {createStore} from 'vuex';
import marketplace from './store/marketplace';

export const store = createStore({
    modules: {
        marketplace,
    }
})