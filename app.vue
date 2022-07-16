<template>
  <section>
    <google-map />
    <camera ref="camera_ref" />
    <div>
      <chip label="Offer #T216" />
      <chip label="Pending payment" />
      <chip label="Assigned" />
    </div>
    <ul class="list outlined">
      <li>
        <div class="label-wrapper">
          <p class="body-small">Customer</p>
          <p class="label">Christopher Nunez</p>
          <p class="body-small">+1 (516) 812-9200</p>
        </div>
        <btn icon="mail" label="Message" />
        <btn icon="call" label="Call" />
      </li>
      <li>
        <div class="label-wrapper">
          <p class="body-small">Pickup address</p>
          <p class="label">{{ pickup_address }}</p>
          <p class="body-small primary-label" v-if="pickup_distance">
            <span class="icon">pin_drop</span> {{ pickup_distance }} miles away from my location
          </p>
        </div>
        <btn label="GO" />
      </li>
    </ul>

    <div class="options">
      <btn v-for="{ label, icon } in options" :secondary-label="label" :icon="icon" />
    </div>
  </section>

  <section class="devices">
    <header class="header">
      <span class="icon">smartphone</span>
      <h3 class="title">Devices</h3>
      <btn icon="more_horiz" />
    </header>
    <ul class="list outlined">
      <li v-for="{ label, image, features, price } in devices">
        <img class="photo" :src="image" loading="lazy" />
        <div class="label-wrapper">
          <div class="label">{{ label }}</div>
          <div class="description body-small">{{ features.join(' - ') }}</div>
          <div class="body-small primary-label">Estimated offer ${{ price }}</div>
        </div>
        <btn label="Start inspection" @click="camera_ref.open()" />
      </li>
    </ul>
  </section>

  <section>
    <header class="header">
      <span class="icon">update</span>
      <h3 class="title">Payments</h3>
      <btn icon="more_horiz" />
    </header>
    <ul class="list">
      <li>
        <div class="label-wrapper">
          <div class="label">Subtotal</div>
          <div class="description body-small">{{ devices.length }} Devices</div>
        </div>
        ${{ subtotal }}
      </li>
      <li>
        <div class="label-wrapper">
          <div class="label">Payment Method</div>
          <div class="description body-small">
            Cashapp: <span class="primary-label">$scga12</span>
          </div>
        </div>
      </li>
      <li>
        <div class="label-wrapper">
          <div class="label">Total</div>
        </div>
        ${{ subtotal }}
      </li>
    </ul>
  </section>
</template>

<script setup>
import GoogleMap from './components/map.vue';
import Camera from './components/camera.vue';
import { ref, computed } from 'vue';
import { useState } from './state.js';

const { devices, pickup_address, pickup_distance } = useState();
const camera_ref = ref(null);

const subtotal = computed(() =>
  devices.value.reduce((previous, current) => previous.price + current.price)
);

const options = [
  { label: 'Chats', icon: 'chat' },
  { label: 'Schedule', icon: 'date_range' },
  { label: 'Pickups', icon: 'pin_drop' },
  { label: 'Earnings', icon: 'paid' },
  { label: 'Account', icon: 'account_circle' }
];
</script>

<style scoped>
section {
  background-color: #fff;
}

section + section {
  margin-top: 8px;
}

header,
.options {
  height: 40px;
  padding: 0 16px;
  display: flex;
  align-items: center;
}

header .icon {
  color: var(--brown);
  margin-right: 16px;
}

header .title,
.options .button {
  flex: 1;
}

header .button {
  color: var(--pink);
}

.list {
  list-style: none;
  margin: 0;
  padding: 8px 0;
}

.list.outlined li + li {
  border-top: 1px solid var(--outline);
}

li {
  width: 100%;
  min-height: 40px;
  padding: 8px 24px;
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
}

li .label-wrapper {
  flex: 1;
  overflow: hidden;
}

li :is(.label, .description) {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.primary-label {
  color: var(--primary);
}

.devices .photo {
  height: 64px;
  margin-right: 16px;
}
</style>

<style>
@font-face {
  font-family: 'Material Icons Outlined';
  src: url(./assets/material-icons.woff2) format('woff2');
}

@font-face {
  font-family: 'Google Sans';
  src: url(./assets/google-sans.woff2) format('woff2');
}

body {
  --primary-95: #eaf1ff;
  --primary-90: #d3e3ff;
  --primary-80: #a4c8ff;
  --primary-70: #6fadff;
  --primary-60: #2692ff;
  --primary-50: #0077db;
  --primary: #005fb1;
  --primary-30: #004787;
  --primary-20: #00315f;
  --primary-10: #001c3b;

  --brown-95: #ffeed6;
  --brown-90: #ffddaa;
  --brown-80: #e4c18c;
  --brown-70: #c7a673;
  --brown-60: #ab8c5b;
  --brown-50: #8f7244;
  --brown: #755a2e;
  --brown-30: #5b4319;
  --brown-20: #422c04;
  --brown-10: #281800;

  --pink-95: #ffebf8;
  --pink-90: #ffd6f4;
  --pink-80: #ffabf0;
  --pink-70: #ff77ef;
  --pink-60: #ff08f4;
  --pink-50: #d500cd;
  --pink: #ab00a4;
  --pink-30: #82007d;
  --pink-20: #5c0058;
  --pink-10: #390037;

  --neutral-95: #eaf2fc;
  --neutral-90: #dbe3ed;
  --neutral-80: #bfc7d0;
  --neutral-70: #a4acb5;
  --neutral-60: #8a929b;
  --neutral-50: #707880;
  --neutral: #575f67;
  --neutral-30: #404850;
  --neutral-20: #293138;
  --neutral-10: #141c23;

  --background: var(--neutral-95);
  --foreground: var(--neutral-20);
  --outline: var(--neutral-80);

  color: var(--foreground);
  background-color: var(--background);
  font: 16px Google Sans, Helvetica, Arial, sans-serif;
  line-height: 24px;
}

@media (min-width: 960px) {
  .app {
    width: 600px;
    margin: 8px auto;
  }
}

::selection {
  background-color: var(--primary-70);
}

::-webkit-scrollbar {
  width: 8px; /* vertical scrollbar */
  height: 8px; /* horizontal scrollbar */
}

::-webkit-scrollbar-thumb {
  background-color: var(--neutral-80);
  border-radius: 30px;
  border: 2px solid transparent;
  background-clip: padding-box;
}

* {
  box-sizing: border-box;
}

body,
h1,
h2,
h3,
h4,
p {
  margin: 0;
}

.title,
.title-large {
  font-weight: bold;
}

.title {
  font-size: 18px;
}

.title-large {
  font-size: 24px;
}

.body-small {
  font-size: 14px;
  color: var(--neutral);
}

hr {
  background: var(--neutral-80);
  border-width: 0;
  height: 1px;
  margin: 8px 0;
}

.icon {
  font: 24px Material Icons Outlined, Material Icons;
  color: currentColor;
  vertical-align: middle;
}

.font-loading .icon {
  visibility: hidden;
}

button {
  -webkit-tap-highlight-color: transparent;
}

a {
  color: var(--primary);
}

a:is(:hover, :focus) {
  background-color: var(--primary-90);
  outline: none;
}

.ripple-container {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  border-radius: inherit;
  overflow: hidden;
  pointer-events: none;
}

.ripple {
  background-color: var(--color, currentColor);
  opacity: 0.19;
  border-radius: 50%;
  position: absolute;
  -webkit-mask-image: radial-gradient(closest-side, #fff 65%, transparent);
}
</style>
