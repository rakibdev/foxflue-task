<template>
  <button :class="['button', iconHorizontal ? 'icon-horizontal' : '', { filled }]" v-ripple>
    <span class="icon" v-if="icon?.length > 0">{{ icon }}</span>
    <p>{{ label }}</p>
    <slot />
  </button>
</template>

<script setup>
// todo: auto remove tab when tab v-model doesn't match.
defineProps({
  filled: Boolean,
  label: String,
  icon: [Boolean, String],
  iconHorizontal: Boolean
});
</script>

<style>
.button {
  --color: var(--primary);
  color: var(--color);
  background-color: transparent;
  transition: background-color 100ms;
  min-width: 64px;
  padding: 8px 16px;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  border-radius: 8px;
  border: 0;
  outline: none;
  font-size: 14px;
  font-family: inherit;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  user-select: none;
  white-space: nowrap;
}

.button.filled {
  color: #fff;
  background-color: var(--color);
}

.button .icon {
  padding: 4px;
}

.button.icon-horizontal {
  flex-direction: row;
}
</style>
