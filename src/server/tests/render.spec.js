import render from "../render";
import getPage from '../renderer/getPage';

jest.mock('../renderer/getPage')

describe("render", () => {
  test("renders index.html when '/' is provided", () => {
      getPage.mockReturnValue('<h1>test</h1>');
      const html = render('/')
      expect(html).toEqual('<h1>test</h1>')
  });
});
