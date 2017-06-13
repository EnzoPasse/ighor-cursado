import { IGhorPage } from './app.po';

describe('i-ghor App', () => {
  let page: IGhorPage;

  beforeEach(() => {
    page = new IGhorPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
