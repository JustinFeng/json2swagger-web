import React from 'react';
import renderer from 'react-test-renderer';
import Translator from './index';

describe('Translator', () => {
  it('renders correctly', () => {
    const app = renderer
      .create(<Translator />)
      .toJSON();

    expect(app).toMatchSnapshot();
  });
});
