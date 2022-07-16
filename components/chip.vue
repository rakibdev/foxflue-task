<template>
  <btn class="chip" :label="label" />
</template>

<script setup>
defineProps({
  label: [String, Number]
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
