<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <VideoStream
      v-if="videoList.length > 0"
      :options="{
        sources: [{ src: this.videoList[0].video, type: 'video/mp4' }],
        controls: true,
      }"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import VideoStream from '@/components/VideoStream.vue';
import axios from 'axios';

export default {
  name: 'Home',
  components: {
    VideoStream,
  },
  data() {
    return {
      videoList: [],
    };
  },
  mounted() {
    this.fetchVideos();
  },
  methods: {
    fetchVideos() {
      axios
        .get('http://hybridtv.ss7.tv/techtest/movies.json')
        .then(response => {
          console.log(response);
          this.videoList = response.data.data;
        });
    },
  },
};
</script>
