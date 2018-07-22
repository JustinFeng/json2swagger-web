import React from 'react';
import { shallow } from 'enzyme';
import Feedback from './index';

describe('Feedback', () => {
  it('renders correctly', () => {
    expect(shallow(<Feedback />)).toMatchSnapshot();
  });
});
