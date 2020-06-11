import store from '../../../src/store/video';

describe('Getters', () => {
  const state = {
    videoList: [
      {
        title: 'Test Title 1',
        poster: '/test1.png',
        video: '/test1.mp4',
      },
      {
        title: 'Test Title 2',
        poster: '/test1.png',
        video: '/test1.mp4',
      },
      {
        title: 'Test Title 3',
        poster: '/test1.png',
        video: '/test1.mp4',
      },
    ],
  };

  it('filters the api payload by title using videoByTitle', () => {
    expect(store.getters.videoByTitle(state)('Test Title 2')).toBe(state.videoList[1]);
  });
});
