<template>
  <div class="video-player" @mouseover="isHovered = true" @mouseout="isHovered = false">
    <video ref="video" class="video-js ml-auto mr-auto" @click="onVideoClick" />
    <button
      v-show="isHovered"
      :class="{ 'video-player__button--paused': isPaused }"
      class="video-player__button"
      @click="onPlayButtonClick"
    />
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
      isPaused: false,
      isHovered: false,
    };
  },
  mounted() {
    this.player = videojs(this.$refs.video, this.options);
  },
  beforeDestroy() {
    if (this.player) this.player.dispose();
  },
  methods: {
    onVideoClick() {
      if (this.player.paused() !== this.isPaused) this.toggleVideoPauseState();
    },
    onPlayButtonClick() {
      this.playOrPauseVideo();
    },
    toggleVideoPauseState() {
      this.isPaused = this.player.paused();
    },
    playOrPauseVideo() {
      if (this.player.paused()) this.player.play();
      else this.player.pause();
      this.toggleVideoPauseState();
    },
  },
};
</script>

<style lang="scss" scoped>
.video-player {
  position: relative;

  & ::v-deep {
    .vjs-big-play-button,
    .vjs-play-control.vjs-control.vjs-button {
      display: none;
    }
  }
}

.video-player__button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 999px;
  width: 60px;
  height: 60px;
  background-color: rgba(0, 0, 0, 0.6);
  background-image: url('../assets/images/btn-pause.png');
  background-repeat: no-repeat;
  background-position: 50%;
  background-size: 40%;

  &:hover {
    background-color: #ffd700;
  }
}

.video-player__button--paused {
  background-image: url('../assets/images/btn-play.png');
}
</style>
