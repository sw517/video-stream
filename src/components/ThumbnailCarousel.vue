<template>
  <div ref="thumbnail-carousel" class="thumbnail-carousel">
    <div class="thumbnail-carousel__controls">
      <button
        class="thumbnail-carousel__controls__btn thumbnail-carousel__controls__btn--prev"
        @click="handlePagination(currentSlide - 1)"
      >
        &lt;
      </button>
      <button
        class="thumbnail-carousel__controls__btn thumbnail-carousel__controls__btn--next"
        @click="handlePagination(currentSlide + 1)"
      >
        &gt;
      </button>
    </div>
    <div :style="cCycleStyles" class="thumbnail-carousel__cycle">
      <div
        v-for="(slot, index) in slideCount"
        :key="index"
        :style="cSlideStyles"
        class="thumbnail-carousel__slide"
      >
        <slot :name="index" />
      </div>
    </div>
  </div>
</template>

<script>
// Vuex
import { mapGetters } from 'vuex';
// Helpers
import merge from 'lodash.merge';
// Components

export default {
  name: 'ThumbnailCarousel',
  props: {
    config: {
      type: Object,
      required: false,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      slideCount: Object.keys(this.$slots).length,
      slideSpacing: 0,
      slideWidth: 0,
      currentSlide: 1,
      carouselWidth: null,
      touchEvent: {
        swipeStartPosition: null,
        swipeEndPosition: null,
        startTimeStamp: null,
        endTimeStamp: null,
      },
      sliderConfig: {},
    };
  },
  computed: {
    ...mapGetters('generalConfig', ['currentWindowWidth', 'currentBreakpoint']),
    /**
     * Returns the CSS Styles for the individual slides.
     */
    cSlideStyles() {
      return {
        minWidth: `${this.slideWidth + this.slideSpacing}px`,
        width: `${this.slideWidth + this.slideSpacing}px`,
        paddingRight: `${this.slideSpacing}px`,
      };
    },
    /**
     * Returns the CSS Styles for the carousel cycle.
     */
    cCycleStyles() {
      const transform = (this.currentSlide - 1) * (this.slideWidth + this.slideSpacing);
      return {
        transform: `translateX(-${transform}px)`,
      };
    },
    cCarouselIsAtEnd() {
      return this.currentSlide === this.slideCount - (this.cWholeSlidesVisible - 1);
    },
    cWholeSlidesVisible() {
      return Math.floor(this.carouselWidth / this.slideWidth);
    },
  },
  watch: {
    currentWindowWidth() {
      this.setCarouselWidth();
    },
    currentBreakpoint() {
      this.setSlideWidth(this.sliderConfig.slideWidth);
      this.setSlideSpacing(this.sliderConfig.slideSpacing);
    },
  },
  created() {
    this.setupConfig();
    this.setSlideCount();
  },
  mounted() {
    this.setCarouselWidth();
    this.setSlideWidth(this.sliderConfig.slideWidth);
    this.setSlideSpacing(this.sliderConfig.slideSpacing);
    this.addTouchEventListeners();
  },
  updated() {
    this.setSlideCount();
    this.setSlideWidth(this.sliderConfig.slideWidth);
    this.setSlideSpacing(this.sliderConfig.slideSpacing);
  },
  methods: {
    /**
     * Merges default slider config and custom props config
     * into one configuration object used by the component.
     */
    setupConfig() {
      const defaultConfig = {
        slideWidth: {
          xs: '200px',
          sm: '300px',
          md: '400px',
          lg: null,
          xl: null,
        },
        slideSpacing: {
          xs: '20px',
          sm: null,
          md: '40px',
          lg: null,
          xl: null,
        },
      };
      this.sliderConfig = Object.assign({}, merge(defaultConfig, this.$props.config));
    },
    handlePagination(pageNumber) {
      if (pageNumber < 1 || (pageNumber > this.currentSlide && this.cCarouselIsAtEnd)) return;
      this.currentSlide = pageNumber;
    },
    setSlideCount() {
      this.slideCount = Object.keys(this.$slots).length;
    },
    /**
     * Set the width of the carousel as a data property. This is
     * used to calculate the carousel transformation.
     * Called on mounted() and on window resize.
     */
    setCarouselWidth() {
      this.carouselWidth = this.$refs['thumbnail-carousel'].clientWidth;
    },
    /**
     * Gets the current breakpoint and slider config to
     * detirmine the width of the slides/ how many slides should
     * currently be visible.
     * This component is built mobile first so if only mobile
     * is set, this will also affect tablet and desktop.
     * Expects string width as percentage or fixed pixels.
     * @param arg.xs {string} Width of slides at mobile
     * @param arg.sm {string} Width of slides at tablet
     * @param arg.md {string} Width of slides at laptop
     * @param arg.lg {string} Width of slides at desktop
     * @param arg.xl {string} Width of slides at large desktop (1600px)
     */
    setSlideWidth({ xs, sm, md, lg, xl }) {
      let slideWidth;

      switch (this.currentBreakpoint) {
        case 'xl':
          slideWidth = xl || lg || md || sm || xs;
          break;
        case 'lg':
          slideWidth = lg || md || sm || xs;
          break;
        case 'md':
          slideWidth = md || sm || xs;
          break;
        case 'sm':
          slideWidth = sm || xs;
          break;
        default:
          slideWidth = xs; // Set to 1 by default in props
          break;
      }

      this.slideWidth = Number(slideWidth.split('px')[0]);
    },
    /**
     * Gets the current breakpoint and slider config to
     * detirmine the margin for each slide. This component is built
     * mobile first so if only mobile or tablet margin is set, this
     * will affect laptop and desktop too.
     * @param arg.xs {string} Slide spacing at mobile
     * @param arg.sm {string} Slide spacing at tablet
     * @param arg.md {string} Slide spacing at laptop
     * @param arg.lg {string} Slide spacing at desktop
     * @param arg.xl {string} Slide spacing at large desktop (1600px)
     */
    setSlideSpacing({ xs, sm, md, lg, xl }) {
      let spacing;

      switch (this.currentBreakpoint) {
        case 'xl':
          spacing = xl || lg || md || sm || xs;
          break;
        case 'lg':
          spacing = lg || md || sm || xs;
          break;
        case 'md':
          spacing = md || sm || xs;
          break;
        case 'sm':
          spacing = sm || xs;
          break;
        default:
          spacing = xs;
          break;
      }

      this.slideSpacing = Number(spacing.split('px')[0]);
    },
    /**
     * Adds the touch-swipe events for mobile.
     */
    addTouchEventListeners() {
      const carousel = this.$refs['thumbnail-carousel'];

      carousel.addEventListener('touchstart', e => {
        this.touchEvent.swipeStartPosition = e.changedTouches['0'].pageX;
        this.touchEvent.startTimeStamp = e.timeStamp;
      });

      carousel.addEventListener('touchend', e => {
        this.touchEvent.swipeEndPosition = e.changedTouches['0'].pageX;
        this.touchEvent.endTimeStamp = e.timeStamp;
        this.handleTouchEvent();
      });
    },
    /**
     * Uses data properties on the component to store co-ordinates
     * and timestamps to detirmine the direction of the touch swipe.
     */
    handleTouchEvent() {
      const startPos = this.touchEvent.swipeStartPosition;
      const endPos = this.touchEvent.swipeEndPosition;
      // Return if touch was not a long enough full swipe.
      if (Math.abs(startPos - endPos) <= 10) return;

      const allowedTime = 2000;
      const swipeTime = this.touchEvent.endTimeStamp - this.touchEvent.startTimeStamp;

      if (swipeTime < allowedTime) {
        const direction = startPos < endPos ? 'prev' : 'next';
        if (direction === 'prev') {
          this.handlePagination(this.currentSlide - 1);
        } else {
          this.handlePagination(this.currentSlide + 1);
        }
      }
    },
  },
};
</script>

<style lang="scss">
.thumbnail-carousel {
  position: relative;
  overflow: hidden;
  padding: 5px;

  &:after {
    content: '';
    display: block;
    pointer-events: none;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    width: 10%;
    background-image: linear-gradient(90deg, transparent, #fff);
    z-index: 3;
  }
}

.thumbnail-carousel__controls__btn {
  position: absolute;
  top: 50%;
  left: 15px;
  transform: translateY(-50%);
  font-size: 2rem;
  color: #fff;
  text-shadow: 0 0 2px #000;
  z-index: 5;
  width: 50px;
  height: 50px;

  &:hover {
    box-shadow: 0 0 0 2px #ffd700;
    border-radius: 5px;
  }
}

.thumbnail-carousel__controls__btn--next {
  left: auto;
  right: 15px;
}

.thumbnail-carousel__cycle {
  display: flex;
  transition: transform ease 0.5s;
}

// Fallback width and margin
.thumbnail-carousel__slide {
  width: 100%;
  min-width: 100%;
  padding-right: 20px;
}
</style>
