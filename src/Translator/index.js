import React, { Component } from 'react';
import 'whatwg-fetch';
import { FormGroup, FormControl, Button, Grid, Row, Col } from 'react-bootstrap';
import './Translator.css';

const ROWS = 30;

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

  translate = () => {
    fetch('http://localhost:9292/translate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: this.state.data })
      .then(response => response.text())
      .then(result => this.setState({ result }));
  };

  render = () =>
    <Grid className="App-grid">
      <Row className="show-grid">
        <Col md={5}>
          <FormGroup controlId="jsonTextArea">
            <FormControl
              componentClass="textarea"
              className="App-textarea"
              rows={ROWS}
              placeholder="Paste json data here..."
              value={this.state.data}
              onChange={this.onChange}
            />
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
          <FormGroup controlId="swaggerTextArea">
            <FormControl
              componentClass="textarea"
              className="App-textarea"
              rows={ROWS}
              readOnly
              value={this.state.result}
            />
          </FormGroup>
        </Col>
      </Row>
    </Grid>
}

export default Translator;
