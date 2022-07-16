Notes

- Used Vue 3, Composition API, script-setup syntactic sugar.
- No external UI libraries used.
- snake_case for variables and camelCase for functions
- I havn't used Nuxt before (will look documentation). But for now to do quick used bare Vue 3.
- As PDF design is for mobile so i set app width to 600px to look mobile style.
- Used custom build script `dev.js` that opens localhost and auto reloads browser.
- Esbuild bundler used (10-100x faster than webpack)
- Added ripple directive for buttons
- Global main CSS styles in app.vue
- Used header, section, ul, li tags for readability. Not only divs.
- Devices are from v-for loop, payments subtotal is dynamically calculated.
- Material Icons Outlined varient used.
- Added blue dot and distance polyline in maps
- Used nominatim to get geolocation of address as Google geocoder requires billing.
- `state.js` file is newer alternative to Vuex for Vue 3. Used for sharing "pickup_distance, pickup_address" between `map.vue` and `app.vue`. And devices array in that file.
- The design in PDF isn't actually good UI in terms of usability. Such as it has primary color, button height, background colors, list item top border, button label below icon (should be side by side), icon-button mixed circle and square, many more inconsistency. But I guess this just to test so I coded exactly same.
- Used toLocaleString() to seperate month, day, time only 3 lines of code. no need for "date-fns"
