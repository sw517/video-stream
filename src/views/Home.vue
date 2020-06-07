<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <VideoStream
      :options="{
        sources: [{ src: this.videoList[0].video, type: 'video/mp4' }],
        controls: true,
      }"
    />
  </div>
</template>

<script>
// Helpers
import axios from 'axios';
import { mapGetters, mapActions } from 'vuex';
// Components
import VideoStream from '@/components/VideoStream.vue';

export default {
  name: 'Home',
  components: {
    VideoStream,
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
