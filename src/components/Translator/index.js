import React, { Component } from 'react';
import 'whatwg-fetch';
import { FormGroup, FormControl, Button, Grid, Row, Col, Glyphicon, ControlLabel } from 'react-bootstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import apiUrl from '../../utils/apiUrl';
import './Translator.css';

const ROWS = 20;

class Translator extends Component {
  constructor(props) {
    super(props);
    this.state = { data: '', valid: false, result: '', loading: false, format: 'yaml' };
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

  onSelect = e => {
    const format = e.target.value;
    this.setState({
      format
    });
  }

  handleErrors = response => {
    this.setState({ loading: false });
    if (!response.ok) {
      throw Error();
    }

    return response;
  };

  translate = () => {
    this.setState({ loading: true });
    const headers = { 'Content-Type': 'application/json', 'Accept': `application/${this.state.format}` };

    fetch(`${apiUrl()}/translate`, { method: 'POST', headers, body: this.state.data })
      .then(this.handleErrors)
      .then(response => response.text())
      .then(result => this.setState({ result, resultStatus: 'success' }))
      .catch(() => this.setState({
        result: 'I was beaten by your json, please report a bug with the json.', resultStatus: 'error'
      }));
  };

  validateState = () => this.state.data ? this.state.valid ? 'success' : 'error' : null;

  renderConvert = () =>
    <Col md={2} className="App-convert">
      <FormGroup controlId="translate" className="App-translate">
        <ControlLabel className="App-format-label">Format:</ControlLabel>
        <FormControl componentClass="select" className="App-format" onChange={this.onSelect}>
          <option value="yaml">YAML</option>
          <option value="json">JSON</option>
        </FormControl>
        <Button
          className="App-translate-button"
          bsStyle="success"
          disabled={!this.state.valid}
          onClick={this.translate}>
          Translate
        </Button>
      </FormGroup>
    </Col>

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
        { this.renderConvert() }
        <Col md={5}>
          <FormGroup controlId="swaggerTextArea" validationState={this.state.resultStatus}>
            <FormControl
              componentClass="textarea"
              className="App-textarea"
              rows={ROWS}
              readOnly
              value={this.state.loading ? 'loading...' : this.state.result}
            />
            <FormControl.Feedback />
          </FormGroup>
          <CopyToClipboard text={this.state.result} className={`App-copy ${this.state.resultStatus}`}>
            <Button>
              <Glyphicon glyph="copy" />
            </Button>
          </CopyToClipboard>
        </Col>
      </Row>
    </Grid>
}

export default Translator;
