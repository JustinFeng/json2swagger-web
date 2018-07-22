import React from 'react';
import { shallow } from 'enzyme';
import Translator from './index';

describe('Translator', () => {
  let translator;

  beforeEach(() => {
    translator = shallow(<Translator />);
  });

  describe('initialize', () => {
    it('renders', () => {
      expect(translator.state()).toEqual({ data: '', valid: false, result: '' });
      expect(translator).toMatchSnapshot();
    });
  });

  describe('input data', () => {
    let input;

    beforeEach(() => {
      input = translator.find('FormControl').at(0)
    });

    it('updates state when input data is invalid', () => {
      input.simulate('change', { target: { value: 'abc' }});

      expect(translator.state('data')).toEqual('abc');
      expect(translator.state('valid')).toBeFalsy();
      expect(translator).toMatchSnapshot();
    });

    it('updates state when input data is valid', () => {
      input.simulate('change', { target: { value: '{"some": "json"}' }});

      expect(translator.state('data')).toEqual('{"some": "json"}');
      expect(translator.state('valid')).toBeTruthy();
      expect(translator).toMatchSnapshot();
    });
  });

  describe('translate data', () => {
    beforeEach(() => {
      fetch = jest.fn().mockReturnValue(Promise.resolve({ text: () => 'result' }));

      translator.setState({ data: 'valid data', valid: true, result: '' });
      translator.find('Button').simulate('click');
    });

    it('calls translate api with input data', () => {
      expect(fetch.mock.calls.length).toBe(1);
      expect(fetch.mock.calls[0][0]).toEqual('http://localhost:9292/translate');
      expect(fetch.mock.calls[0][1].method).toEqual('POST');
      expect(fetch.mock.calls[0][1].body).toEqual('valid data');
    });

    it('updates state with translation result', () => {
      expect(translator.state('result')).toEqual('result');
      expect(translator).toMatchSnapshot();
    });
  });
});
