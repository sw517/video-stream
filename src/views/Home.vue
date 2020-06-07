<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <VideoPlayer
      :options="{
        sources: [{ src: videoList[0].video, type: 'video/mp4' }],
        controls: true,
      }"
    />
    <VideoThumbnail
      v-for="(video, index) in videoList"
      :key="index"
      :title="video.title"
      :image="video.poster"
    />
  </div>
</template>

<script>
// Helpers
import axios from 'axios';
import { mapGetters, mapActions } from 'vuex';
// Components
import VideoPlayer from '@/components/VideoPlayer.vue';
import VideoThumbnail from '@/components/VideoThumbnail.vue';

export default {
  name: 'Home',
  components: {
    VideoPlayer,
    VideoThumbnail,
  },
  computed: {
    ...mapGetters(['videoList']),
  },
  created() {
    this.fetchVideos();
  },
  methods: {
    ...mapActions(['setVideoList']),
    fetchVideos() {
      axios
        .get('http://hybridtv.ss7.tv/techtest/movies.json')
        .then(response => {
          console.log(response);
          this.setVideoList(response.data.data);
        });
    },
  },
};
</script>
