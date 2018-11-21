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
      expect(translator.state()).toEqual({ data: '', valid: false, result: '', loading: false, format: 'yaml' });
      expect(translator).toMatchSnapshot();
    });
  });

  describe('input data', () => {
    let input;

    beforeEach(() => {
      input = translator.find('FormControl').at(0);
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

  describe('format', () => {
    let select;

    beforeEach(() => {
      select = translator.find('FormControl').at(1);
    })

    it('updates state when json format selected', () => {
      select.simulate('change', { target: { value: 'json' }});

      expect(translator.state('format')).toEqual('json');
      expect(translator).toMatchSnapshot();
    });
  });

  describe('translate data', () => {
    describe('successful', () => {
      let promise;

      beforeEach(() => {
        promise = Promise.resolve({ ok: true, text: () => 'result' });
        fetch = jest.fn().mockReturnValue(promise);
      });

      it('calls translate api with input data when expected format is yaml', () => {
        translator.setState({ data: 'valid data', valid: true, result: '', loading: false, format: 'yaml' });
        translator.find('Button').at(0).simulate('click');

        expect(fetch.mock.calls.length).toBe(1);
        expect(fetch.mock.calls[0][0]).toEqual('http://localhost:9292/translate');
        expect(fetch.mock.calls[0][1].method).toEqual('POST');
        expect(fetch.mock.calls[0][1].headers).toEqual({ 'Content-Type': 'application/json', 'Accept': 'application/yaml' });
        expect(fetch.mock.calls[0][1].body).toEqual('valid data');
      });

      it('calls translate api with input data when expected format is json', () => {
        translator.setState({ data: 'valid data', valid: true, result: '', loading: false, format: 'json' });
        translator.find('Button').at(0).simulate('click');

        expect(fetch.mock.calls.length).toBe(1);
        expect(fetch.mock.calls[0][0]).toEqual('http://localhost:9292/translate');
        expect(fetch.mock.calls[0][1].method).toEqual('POST');
        expect(fetch.mock.calls[0][1].headers).toEqual({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
        expect(fetch.mock.calls[0][1].body).toEqual('valid data');
      });

      it('updates state with translation result', () => {
        translator.setState({ data: 'valid data', valid: true, result: '', loading: false, format: 'yaml' });
        translator.find('Button').at(0).simulate('click');

        promise.then().then().then(() => {
          expect(translator.state('result')).toEqual('result');
          expect(translator.state('resultStatus')).toEqual('success');
          expect(translator).toMatchSnapshot();
        });
      });
    });

    describe('unsuccessful', () => {
      let promise;

      beforeEach(() => {
        promise = Promise.resolve({ ok: false, text: () => 'result' });
        fetch = jest.fn().mockReturnValue(promise);

        translator.setState({ data: 'valid data', valid: true, result: '', loading: false });
        translator.find('Button').at(0).simulate('click');
      });

      it('updates state with error message', () => {
        expect(translator.state('result')).toEqual('I was beaten by your json, please report a bug with the json.');
        expect(translator.state('resultStatus')).toEqual('error');
        expect(translator).toMatchSnapshot();
      });
    });
  });
});
