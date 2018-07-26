import React, { Component } from 'react';
import 'whatwg-fetch';
import { FormGroup, FormControl, Button, Grid, Row, Col } from 'react-bootstrap';
import apiUrl from '../../utils/apiUrl';
import './Translator.css';

const ROWS = 20;

class Translator extends Component {
  constructor(props) {
    super(props);
    this.state = { data: '', valid: false, result: '' };
  }

  validate = data => {
    try {
      JSON.parse(data);
    } catch (e) {
      return false;
    }

    return true;
  };

  onChange = e => {
    const data = e.target.value;
    this.setState({
      data,
      valid: this.validate(data)
    });
  };

  handleErrors = response => {
    if (!response.ok) {
      throw Error();
    }

    return response;
  };

  translate = () => {
    fetch(`${apiUrl()}/translate`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: this.state.data })
      .then(this.handleErrors)
      .then(response => response.text())
      .then(result => this.setState({ result, resultStatus: 'success' }))
      .catch(() => this.setState({
        result: 'I was beaten by your json, please report a bug with the json.', resultStatus: 'error'
      }));
  };

  validateState = () => this.state.data ? this.state.valid ? 'success' : 'error' : null;

  render = () =>
    <Grid className="App-grid">
      <Row className="show-grid">
        <Col md={5}>
          <FormGroup controlId="jsonTextArea" validationState={this.validateState()}>
            <FormControl
              componentClass="textarea"
              className="App-textarea"
              rows={ROWS}
              placeholder="Paste json data here..."
              value={this.state.data}
              onChange={this.onChange}
            />
            <FormControl.Feedback />
          </FormGroup>
        </Col>
        <Col md={2} className="App-convert">
          <Button
            bsStyle="success"
            disabled={!this.state.valid}
            onClick={this.translate}>
            Translate
          </Button>
        </Col>
        <Col md={5}>
          <FormGroup controlId="swaggerTextArea" validationState={this.state.resultStatus}>
            <FormControl
              componentClass="textarea"
              className="App-textarea"
              rows={ROWS}
              readOnly
              value={this.state.result}
            />
            <FormControl.Feedback />
          </FormGroup>
        </Col>
      </Row>
    </Grid>
}

export default Translator;
