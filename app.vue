<template>
  <google-map />
  <camera ref="camera_ref" />
  <section>
    <div class="row">
      <chip label="Offer #T216" />
      <chip label="Pending payment" filled class="payment-chip" />
      <chip label="Assigned" filled class="assigned-chip" />
    </div>

    <ul class="row list shedule">
      <li>
        <span class="icon">date_range</span>
        <div class="label-wrapper">
          <p class="body-small">Date</p>
          <p class="title">{{ parseTime(time).day }}</p>
        </div>
      </li>
      <li>
        <span class="icon">schedule</span>
        <div class="label-wrapper">
          <p class="body-small">Time</p>
          <p class="title">{{ parseTime(time).time }}</p>
        </div>
      </li>
    </ul>

    <div class="row alert title">
      You will earn<span class="primary-label earning-amount">$30</span>
    </div>

    <ul class="list outlined">
      <li class="customer">
        <div class="label-wrapper">
          <p class="body-small">Customer</p>
          <p>Christopher Nunez</p>
          <p class="body-small">+1 (516) 812-9200</p>
        </div>
        <btn filled icon="mail" label="Msg" />
        <btn filled icon="call" label="Call" />
      </li>
      <li>
        <div class="label-wrapper">
          <p class="body-small">Pickup address</p>
          <p>{{ pickup_address }}</p>
          <p class="body-small primary-label" v-if="pickup_distance">
            <span class="icon">pin_drop</span> {{ pickup_distance }} miles away from my location
          </p>
        </div>
        <btn filled class="go" label="GO" />
      </li>
    </ul>
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
          <p>{{ label }}</p>
          <p class="body-small">{{ features.join(' - ') }}</p>
          <p class="body-small primary-label">Estimated offer ${{ price }}</p>
        </div>
        <btn filled label="Start inspection" @click="camera_ref.open()" />
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
          <p>Subtotal</p>
          <p class="body-small">{{ devices.length }} Devices</p>
        </div>
        ${{ subtotal }}
      </li>
      <li>
        <div class="label-wrapper">
          <p>Payment Method</p>
          <p class="body-small">Cashapp: <span class="primary-label">$scga12</span></p>
        </div>
      </li>
      <li>
        <div class="label-wrapper">
          <p>Total</p>
        </div>
        ${{ subtotal }}
      </li>
      <li class="payment">
        <btn filled label="Send payment" />
      </li>
    </ul>
  </section>

  <div class="bottom-bar row">
    <btn v-for="{ label, icon } in options" :label="label" :icon="icon" />
  </div>
</template>

<script setup>
import GoogleMap from './components/map.vue';
import Camera from './components/camera.vue';
import { ref, computed } from 'vue';
import { useState } from './state.js';

const { devices, pickup_address, pickup_distance, time } = useState();
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

const parseTime = () => {
  const date = new Date(time.value);
  return {
    day: date.toLocaleString('en-us', { month: 'long', day: 'numeric' }),
    time: date.toLocaleString('en-us', { hour: 'numeric', hour12: true })
  };
};
</script>

<style scoped>
section {
  background-color: #fff;
}

section + section {
  margin-top: 8px;
}

header {
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
.bottom-bar .button {
  flex: 1;
}

header .button,
.devices .button {
  --color: var(--pink);
}

.bottom-bar {
  background-color: #fff;
  box-shadow: 0 -1px 3px rgb(0 0 0 / 20%);
  position: fixed;
  bottom: 0;
  height: 60px;
  display: flex;
  align-items: center;
  z-index: 10;
  left: 50%;
  transform: translateX(-50%);
}

@media (max-width: 960px) {
  .bottom-bar {
    width: 100%;
  }
}

.row {
  display: flex;
  justify-content: center;
  gap: 16px;
  padding: 16px;
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
  min-height: 40px;
  padding: 8px 24px;
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
}

li .label-wrapper {
  flex: 1;
}

.primary-label {
  color: var(--primary);
}

.shedule .icon {
  color: var(--primary);
  font-size: 40px;
  margin-right: 16px;
}

.alert {
  background: var(--primary-90);
  border: 1px solid var(--primary);
  border-radius: 9px;
  margin: 0 40px;
  padding: 16px 40px;
}

.alert .earning-amount {
  margin-left: auto;
}

.payment-chip.button {
  --color: var(--brown-90);
  color: var(--brown-20);
}

.assigned-chip.button {
  --color: var(--neutral-90);
  color: var(--neutral-20);
}

.devices .photo {
  height: 64px;
  margin-right: 16px;
}

.customer .button {
  --color: var(--neutral-90);
  color: var(--primary);
}

.customer .button + .button {
  margin-left: 16px;
}

.go {
  height: 64px;
  font-size: 20px;
  --color: var(--green);
}

.payment {
  justify-content: center;
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
  --primary-90: #daecfd;
  --primary-70: #6fadff;
  --primary: #0086f2;
  --primary-20: #00315f;

  --brown-90: #fcd7a0;
  --brown: #976f37;
  --brown-20: #422c04;

  --pink: #ff0459;
  --green: #71e480;

  --neutral-95: #eaf2fc;
  --neutral-90: #dbe3ed;
  --neutral: #575f67;
  --neutral-20: #293138;

  --background: var(--neutral-95);
  --foreground: var(--neutral-20);
  --outline: var(--neutral-90);

  --app-width: 600px;

  color: var(--foreground);
  background-color: var(--background);
  font: 16px Google Sans, Helvetica, Arial, sans-serif;
  line-height: 24px;
}

@media (min-width: 960px) {
  .app {
    margin: 8px auto;
  }

  .app,
  .bottom-bar {
    width: var(--app-width);
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

.title {
  font-size: 18px;
  font-weight: bold;
}

.body-small {
  font-size: 14px;
  color: var(--neutral);
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
