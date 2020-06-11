import { shallowMount } from '@vue/test-utils';
import VideoThumbnail from '@/components/VideoThumbnail.vue';

describe('VideoThumbnail.vue', () => {
  const movieTitle = 'Test Movie';

  const wrapper = shallowMount(VideoThumbnail, {
    propsData: {
      image: '/test.png',
      title: movieTitle,
    },
    stubs: ['router-link'],
  });

  it('renders when correct props are passed', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('renders props.title as text in component', () => {
    expect(wrapper.text()).toMatch(movieTitle);
  });
});
