<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import axios from 'axios';

export default {
  name: 'App',
  computed: {
    ...mapGetters('video', ['videoList']),
  },
  created() {
    if (!this.videoList.length) this.fetchVideos();
  },
  mounted() {
    this.setWindowWidth(document.documentElement.clientWidth);
    window.addEventListener('resize', () => {
      this.setWindowWidth(document.documentElement.clientWidth);
    });
  },
  methods: {
    ...mapActions('generalConfig', ['setWindowWidth']),
    ...mapActions('video', ['setVideoList']),
    fetchVideos() {
      axios({
        method: 'GET',
        url: 'http://hybridtv.ss7.tv/techtest/movies.json',
        crossDomain: true,
      }).then(response => {
        this.setVideoList(response.data.data);
      });
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  @apply mb-12;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.container {
  @apply mx-auto px-4;

  // Override media-query max-width
  &.container {
    @apply max-w-screen-lg;
  }
}

.row {
  @apply -mx-4;
}

.column {
  @apply px-4;
}
</style>
