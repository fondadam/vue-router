// vendor
import Vue from 'vue';
import Router from 'vue-router';

// components
import App from './components/App.vue';
import Listview from './components/Listview.vue';
import Postview from './components/Postview.vue';


// setting
import setting from './setting';

// debug
Vue.config.debug = true;

// init router
Vue.use(Router);

// routing
let router = new Router();

router.map({
  '/list': {
    name: 'markdown',
    setting: setting,
    component:  Listview
  },
  '/list/:archive':{
    name: 'archive',
    setting: setting,
    component: Listview,
  },
  '/post/:archive/:title': {
    name: 'post',
    setting: setting,
    component:Postview
  }
});

// default router
router.redirect({
  '*': '/home'
});

// alias
router.alias({
  '/home': '/list/markdown'
});

router.start(App, '#app');
