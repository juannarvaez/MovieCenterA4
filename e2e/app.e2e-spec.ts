import { MovieCenterPage } from './app.po';

describe('movie-center App', function() {
  let page: MovieCenterPage;

  beforeEach(() => {
    page = new MovieCenterPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
