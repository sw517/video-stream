<template>
  <div class="video-player">
    <video ref="video" class="video-js" />
  </div>
</template>

<script>
import videojs from 'video.js';

export default {
  name: 'VideoPlayer',
  props: {
    options: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
  data() {
    return {
      player: null,
    };
  },
  mounted() {
    this.player = videojs(this.$refs.video, this.options, function onPlayerReady() {
      console.log('ready', this);
    });
  },
  beforeDestroy() {
    if (this.player) this.player.dispose();
  },
};
</script>

<style lang="scss"></style>
