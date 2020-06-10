<template>
  <main class="home">
    <section>
      <div class="container">
        <div class="row">
          <div class="column">
            <ThumbnailCarousel>
              <template v-for="(video, index) in videoList" v-slot:[index]>
                <VideoThumbnail :key="index" :title="video.title" :image="video.poster" />
              </template>
            </ThumbnailCarousel>
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
import VideoThumbnail from '@/components/VideoThumbnail.vue';
import ThumbnailCarousel from '@/components/ThumbnailCarousel.vue';

export default {
  name: 'Home',
  components: {
    VideoThumbnail,
    ThumbnailCarousel,
  },
  computed: {
    ...mapGetters('video', ['videoList']),
    ...mapGetters('generalConfig', ['currentBreakpoint']),
  },
};
</script>
