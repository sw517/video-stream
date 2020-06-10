<template>
  <main class="video">
    <section>
      <div class="container">
        <div class="row">
          <div class="column">
            <template v-if="videoActive">
              <VideoPlayer :options="videoOptions" />
              <div class="flex justify-between mt-6">
                <h1 class="text-left text-lg sm:text-2xl">{{ $route.params.title }}</h1>
                <button
                  aria-label="Close Video"
                  class="ml-4 border-2 px-4 py-1"
                  @click="toggleVideoActive"
                >
                  X
                </button>
              </div>
            </template>
            <template v-else>
              <VideoPoster
                :image="videoObj.poster"
                :title="videoObj.title"
                @click-play="toggleVideoActive"
              />
            </template>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
// Helpers
import { mapGetters } from 'vuex';
// Components
import VideoPlayer from '@/components/VideoPlayer.vue';
import VideoPoster from '@/components/VideoPoster.vue';

export default {
  name: 'Watch',
  components: {
    VideoPlayer,
    VideoPoster,
  },
  data() {
    return {
      videoActive: false,
      videoObj: {},
      videoOptions: {
        controls: true,
        sources: [],
        fluid: true,
        autoplay: true,
      },
    };
  },
  computed: {
    ...mapGetters('video', ['videoByTitle']),
  },
  created() {
    this.videoObj = this.videoByTitle(this.$route.params.title);
    if (Object.keys(this.videoObj).length) {
      this.videoOptions.sources.push({
        src: this.videoObj.video,
        type: 'video/mp4',
      });
    }
  },
  methods: {
    toggleVideoActive() {
      this.videoActive = !this.videoActive;
    },
  },
};
</script>
