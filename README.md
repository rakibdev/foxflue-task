## Recreate Figma design in Vue 3. Assessment for a company interview. 
- When you click "Start inspection" button it'll display your camera output in a popup. https://github.com/rakibdev/foxflue-task/blob/main/components/camera.vue#L28
- It has Google Map that'll display a blue line and miles to indicate distance between you and a hard-coded USA address. https://github.com/rakibdev/foxflue-task/blob/main/components/map.vue#L66. Map not working now because Google made their API paid. 
- Pure Vue 3, composition API, script setup used without any external library like Vuetify, Pinia or vue-google-maps.
- Used reactive() instead of Pinia. See `state.js`.
- `dev.js` is a custom build script which opens localhost and auto reloads browser. The esbuild bundler 10-100x faster than webpack.
- Utilized header, section, ul, li tags. Not only divs.
- Used modern toLocaleString() to get day, time https://github.com/rakibdev/foxflue-task/blob/main/app.vue#L135. No need for "date-fns" library bloat.
