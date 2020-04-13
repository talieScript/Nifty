<template>
  <svg class="icon" :style="iconStyle" :viewBox="viewBox">
    <path :fill="fill || '#000000'" :d="path" />
    <slot name="default" />
  </svg>
</template>

<script>
export default {
  name: 'Icon',
  props: {
    path: String,
    fill: String,
    viewBox: String,
    iconStyle: String,
  },
};
</script>