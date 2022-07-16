<template>
  <component
    :class="[
      'button',
      {
        filled,
        loading,
        disabled,
        circle: icon
      }
    ]"
    :is="link ? 'a' : 'button'"
    :href="link"
    :type="link ? null : 'button'"
    :disabled="disabled || loading"
    :style="{ color: 'var(--color)' }"
    v-ripple
  >
    <span class="icon start-icon" v-if="startIcon">{{ startIcon }}</span>
    <span class="icon" v-if="icon?.length > 0">{{ icon }}</span>
    {{ label }}
    <slot />
    <span class="icon end-icon" v-if="endIcon">{{ endIcon }}</span>
  </component>
</template>

<script setup>
// todo: auto remove tab when tab v-model doesn't match.
defineProps({
  filled: Boolean,
  label: String,
  icon: [Boolean, String],
  startIcon: String,
  endIcon: String,
  loading: Boolean,
  link: String,
  disabled: Boolean,
  color: { type: String, default: 'primary' }
});
</script>

<style>
.button {
  color: var(v-bind(color));
  transition: background-color 100ms;
  height: 36px;
  min-width: 64px;
  padding: 8px 16px;
  display: inline-flex;
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

a.button {
  text-decoration: none;
}

.button:is(.filled, :hover) {
  color: var(--primary-10);
  background-color: var(--primary-90);
}

.button.filled:hover {
  background-color: var(--primary-80);
}

.button.circle {
  height: 40px;
  width: 40px;
  border-radius: 50%;
  padding: 0;
  min-width: 0;
}

.button .start-icon {
  margin-right: 5px;
}

.button .end-icon {
  margin-left: 5px;
}
</style>
