<template>
  <div class="video-thumbnail">
    <img :src="image" :alt="imageAlt" />
    <span class="block truncate">{{ title }}</span>
  </div>
</template>

<script>
export default {
  name: 'VideoThumbnail',
  props: {
    title: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      required: true,
      default: '',
    },
  },
  computed: {
    imageAlt() {
      return `${this.title || 'Untitled'} movie poster`;
    },
  },
};
</script>

<style lang="scss" scoped></style>
