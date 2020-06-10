<template>
  <router-link
    :to="{ name: 'Watch', params: { title } }"
    class="video-thumbnail block relative"
    :title="title"
  >
    <img :src="image" :alt="cImageAlt" class="video-thumbnail__image block" />
    <span
      class="video-thumbnail__title block truncate font-bold text-left absolute left-0 bottom-0 right-0 pl-4 pr-4 pb-4 pt-8"
    >
      {{ title }}
    </span>
  </router-link>
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
    cImageAlt() {
      return `${this.title || 'Untitled'} movie poster`;
    },
  },
};
</script>

<style lang="scss" scoped>
.video-thumbnail {
  overflow: hidden;

  @media screen and (pointer: fine) {
    &:hover {
      box-shadow: 0 0 0 2px #ffd700;

      .video-thumbnail__title {
        transform: translateY(0);
      }
    }
  }
}

.video-thumbnail__title {
  background-image: linear-gradient(transparent, #000);
  color: #fff;
  transform: translateY(100%);
  transition: transform ease 0.4s;
  will-change: transform;
}
</style>
