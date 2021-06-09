import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { Button,Switch,Pagination,Form,Uploader,Icon } from 'vant';
import axios from 'axios'

Vue.prototype.$http=axios;
Vue.use(Icon);
Vue.use(Button);
Vue.use(Uploader);
Vue.use(Form);
Vue.use(Pagination);
Vue.use(Switch);
Vue.use(ElementUI);
Vue.use(ViewUI);
Vue.prototype.axios = axios;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
