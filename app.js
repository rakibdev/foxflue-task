import { createApp } from 'vue';
import { ripple } from './directives.js';
import App from './app.vue';
import Button from './components/button.vue';
import Chip from './components/chip.vue';

const app = createApp(App);
app.directive('ripple', ripple);
app.component('btn', Button);
app.component('chip', Chip);
app.mount('.app');

// used for hiding icons until font loaded.
document.body.classList.add('font-loading');
document.fonts.ready.then(() => {
  document.body.classList.remove('font-loading');
});
