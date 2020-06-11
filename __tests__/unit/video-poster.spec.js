import { shallowMount } from '@vue/test-utils';
import VideoPoster from '@/components/VideoPoster.vue';

describe('VideoPoster.vue', () => {
  const movieTitle = 'Test Movie';

  const wrapper = shallowMount(VideoPoster, {
    propsData: {
      image: '/test.png',
      title: movieTitle,
    },
  });

  it('renders when correct props are passed', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('renders props.title as text in component', () => {
    expect(wrapper.text()).toMatch(movieTitle);
  });
});
