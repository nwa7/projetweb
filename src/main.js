import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import HomePage from './components/home.vue'
import citiesGallery from './components/gallery.vue';
import citiesGame from './components/game.vue';

const routes = [
  { path: '/', component: HomePage },
  { path: '/gallery', component: citiesGallery },
  { path: '/game', component: citiesGame },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

const app = createApp(App);
app.use(router);
app.mount('#app');
