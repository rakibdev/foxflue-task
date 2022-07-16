const addListeners = (element, events, func, options = {}) => {
  events.split(' ').forEach(event => {
    element.addEventListener(event, func, options[event]);
  });
};

const removeListeners = (element, events, func) => {
  events.split(' ').forEach(event => {
    element.removeEventListener(event, func);
  });
};

const showRipple = event => {
  const element = event.currentTarget;
  const rect = element.getBoundingClientRect();
  const x = event.clientX ? event.clientX - rect.left : rect.width / 2;
  const y = event.clientY ? event.clientY - rect.top : rect.height / 2;
  const corners = [
    { x: 0, y: 0 },
    { x: rect.width, y: 0 },
    { x: 0, y: rect.height },
    { x: rect.width, y: rect.height }
  ];
  let radius = 0;
  corners.forEach(corner => {
    const x_delta = x - corner.x;
    const y_delta = y - corner.y;
    const corner_distance = Math.sqrt(x_delta * x_delta + y_delta * y_delta);
    if (corner_distance > radius) {
      radius = corner_distance;
    }
  });

  // ripple soft edge size 65% of container.
  radius += radius * (65 / 100);
  const ripple = document.createElement('div');
  ripple.className = 'ripple';
  ripple.style.width = radius * 2 + 'px';
  ripple.style.height = ripple.style.width;
  ripple.style.left = x - radius + 'px';
  ripple.style.top = y - radius + 'px';

  const ripple_container = document.createElement('div');
  ripple_container.className = 'ripple-container';
  ripple_container.appendChild(ripple);
  element.appendChild(ripple_container);

  const ripple_animation = ripple.animate({ transform: ['scale(0.1)', 'scale(1)'] }, 400);
  const hide_events = {
    pointerdown: 'pointerup pointerleave',
    keydown: 'keyup',
    focus: 'blur'
  };
  const hideRipple = async () => {
    removeListeners(element, hide_events[event.type], hideRipple);
    await ripple_animation.finished;
    const hide_animation = ripple.animate(
      { opacity: [getComputedStyle(ripple).opacity, 0] },
      { duration: 100, fill: 'forwards' }
    );
    await hide_animation.finished;
    ripple.remove();
    ripple_container.remove();
  };
  addListeners(element, hide_events[event.type], hideRipple);
};

const ripple = {
  mounted(element) {
    if (getComputedStyle(element).position == 'static') {
      element.style.position = 'relative';
    }
    let ignore_next = false;
    addListeners(element, 'pointerdown focus keydown', event => {
      if (ignore_next) return;
      ignore_next = true;
      setTimeout(() => (ignore_next = false), 100);
      if (event.type == 'keydown' && event.key != 'Enter') return;
      showRipple(event);
    });
  }
};

export { ripple };
