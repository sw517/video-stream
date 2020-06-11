import { shallowMount } from '@vue/test-utils';
import VideoPlayer from '@/components/VideoPlayer.vue';

describe('VideoPlayer.vue', () => {
  const options = {
    sources: [
      {
        src: '/test.mp4',
        type: 'video/mp4',
      },
    ],
    controls: true,
    fluid: true,
    autoplay: true,
  };

  const wrapper = shallowMount(VideoPlayer, {
    propsData: {
      options,
    },
  });

  it('renders when correct props are passed', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
