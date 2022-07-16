<template>
  <div :class="['dialog-root', { open: opened }]" @click.self="onClickOutside()">
    <div class="dialog" ref="dialog_ref">
      <h3 class="title">Camera</h3>
      <div class="body">
        <video ref="video_ref" autoplay>Video stream not available.</video>
        <canvas ref="canvas_ref" width="320" height="240" />
      </div>
      <div class="actions">
        <btn label="Cancel" @click="opened = false" />
        <btn label="Capture" @click="capture" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const opened = ref(false);
const dialog_ref = ref(false);
const video_ref = ref(null);
const canvas_ref = ref(null);

const open = async () => {
  try {
    opened.value = true;
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
    video_ref.value.src = stream;
  } catch (error) {
    opened.value = false;
    alert('Unable to use camera: ' + error);
  }
};

const capture = () => {
  const width = canvas_ref.value.width;
  const height = canvas_ref.value.height;
  const context = canvas_ref.value.getContext('2d');
  context.drawImage(video_ref.value, 0, 0, width, height);

  const link = document.createElement('a');
  link.setAttribute('download', 'capture.png');
  link.setAttribute(
    'href',
    canvas_ref.value.toDataURL('image/png').replace('image/png', 'image/octet-stream')
  );
  link.click();

  // clear canvas
  context.fillStyle = '#fff';
  context.fillRect(0, 0, width, height);
};

const onClickOutside = () => {
  dialog_ref.value.animate(
    { transform: ['scale(1)', 'scale(1.03)', 'scale(1)'] },
    { duration: 180 }
  );
};

defineExpose({ open });
</script>

<style scoped>
canvas {
  display: none;
}

video {
  width: 100%;
}

.dialog-root {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(0 0 0 / 30%);
  visibility: hidden;
  opacity: 0;
  transition-property: visibility, opacity;
  transition-duration: 300ms;
  z-index: 100;
}

.dialog-root.open {
  visibility: visible;
  opacity: 1;
}

.dialog {
  width: 400px;
  max-height: 100%;
  padding: 16px 0;
  border-radius: 30px;
  background-color: var(--background);
  transform: scale(0.7);
  transition: transform 300ms;
  display: flex;
  flex-direction: column;
  overflow: hidden; /* hide round corner scrollbar overflow */
}

.dialog-root.open .dialog {
  transform: scale(1);
}

.dialog > .title {
  text-align: center;
  padding: 0 24px 16px 24px;
}

.dialog > .body {
  flex: 1;
  padding: 0 24px;
  overflow-y: auto;
  overscroll-behavior: contain;
}

.dialog > .actions {
  display: flex;
  justify-content: flex-end;
  padding: 16px 24px 0 24px;
}

.dialog > .actions .button + .button {
  margin-left: 10px;
}
</style>
