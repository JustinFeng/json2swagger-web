import React from 'react';
import renderer from 'react-test-renderer';
import Header from './index';

describe('Header', () => {
  it('renders correctly', () => {
    const app = renderer
      .create(<Header />)
      .toJSON();

    expect(app).toMatchSnapshot();
  });
});
