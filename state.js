import { reactive, toRefs } from 'vue';

const state = reactive({
  time: 1657983121750,
  pickup_address: '3001 Fulton St, Brooklyn, NY 11208, USA',
  pickup_distance: null,
  devices: [
    {
      label: 'iPhone 13 Pro Max',
      image: 'https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-13-pro-max.jpg',
      features: ['128GB', 'Unlocked', 'Flawless'],
      price: 750
    },
    {
      label: 'iPhone 13 Pro Max',
      image: 'https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-13.jpg',
      features: ['128GB', 'Unlocked', 'Good'],
      price: 550
    }
  ]
});

const useState = () => toRefs(state);

export { useState };
