import React from 'react';
import renderer from 'react-test-renderer';
import Feedback from './index';

describe('Feedback', () => {
  it('renders correctly', () => {
    const app = renderer
      .create(<Feedback />)
      .toJSON();

    expect(app).toMatchSnapshot();
  });
});
