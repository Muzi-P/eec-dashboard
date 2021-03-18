import React from "react";

// reactstrap components
import { Row } from "reactstrap";
import { InflowsContext } from "../components/Context/context";
import Configurations from "./Power Stations/Configurations";

class Settings extends React.Component {
  static contextType = InflowsContext;
  render() {
    const { ezulwiniPS } = this.context;
    return (
      <>
        <div className="content">
          <Row className="justify-content-md-center">
            <Configurations ezulwiniPS={ezulwiniPS} />
          </Row>
        </div>
      </>
    );
  }
}

export default Settings;
