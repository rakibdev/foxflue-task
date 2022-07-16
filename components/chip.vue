<template>
  <btn class="chip" :filled="selected" :label="label" :start-icon="startIcon" />
</template>

<script setup>
defineProps({
  label: [String, Number],
  startIcon: String,
  selected: Boolean,
  color: { type: String, default: 'primary' }
});
</script>

<style>
.chip {
  border: 1px solid var(--primary-70);
  border-radius: 30px;
  height: 28px;
  padding: 0 8px;
  font-size: 13px;
}

.chip .icon {
  font-size: inherit;
}

.chip.filled {
  border: none;
}
</style>
