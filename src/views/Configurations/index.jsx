import React, { Component } from "react";
import { Row } from "reactstrap";
import { InflowsContext } from "../../components/Context/context";
import Config from "./Config";

export default class index extends Component {
  static contextType = InflowsContext;
  render() {
    const { settings, modelNames } = this.context;
    return (
      <div className="content">
        <Row>
          <Config settings={settings} modelNames={modelNames} />
        </Row>
      </div>
    );
  }
}
