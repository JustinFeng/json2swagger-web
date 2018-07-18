import React, { Component } from 'react';
import './App.css';
import { FormGroup, FormControl, Button, Grid, Row, Col } from 'react-bootstrap';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">JSON to Swagger</h1>
        </header>

        <div className="App-container">
          <Grid className="App-grid">
            <Row className="show-grid">
              <Col md={5}>
                <FormGroup controlId="jsonTextArea">
                  <FormControl componentClass="textarea" className="App-textarea" rows={20} placeholder="Paste json data here..." />
                </FormGroup>
              </Col>
              <Col md={2} className="App-convert">
                <Button bsStyle="success">Convert</Button>
              </Col>
              <Col md={5}>
                <FormGroup controlId="swaggerTextArea">
                  <FormControl componentClass="textarea" className="App-textarea" rows={20} readOnly />
                </FormGroup>
              </Col>
            </Row>
          </Grid>

          <div className="App-feedback">
            <a href="https://github.com/JustinFeng/json2swagger-web/issues/new" rel="noopener noreferrer" target="_blank">
              Report a bug / Feedback
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
