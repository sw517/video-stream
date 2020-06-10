<template>
  <div class="video-poster">
    <div class="video-poster__image-wrapper relative">
      <img :src="image" :alt="cImageAlt" class="video-poster__image block mx-auto" />
      <button class="video-poster__btn" aria-label="Play Video" @click="onButtonClick" />
    </div>
    <span class="video-poster__title block text-center mt-2 font-bold">
      {{ title }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'VideoPoster',
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
  methods: {
    onButtonClick() {
      this.$emit('click-play');
    },
  },
};
</script>

<style lang="scss" scoped>
.video-poster__image {
  max-height: 50vh;
}

.video-poster__btn {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 999px;
  width: 60px;
  height: 60px;
  background-color: rgba(0, 0, 0, 0.6);
  background-image: url('../assets/images/btn-play.png');
  background-repeat: no-repeat;
  background-position: 50%;
  background-size: 40%;

  &:hover {
    background-color: #ffd700;
  }
}
</style>
