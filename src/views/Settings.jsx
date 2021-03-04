import React from "react";

// reactstrap components
import { Row } from "reactstrap";
import { InflowsContext } from "../components/Context/context";
import Edwaleni from "./Power Stations/Edwaleni";
import Ezulwini from "./Power Stations/Ezulwini";
import Maguga from "./Power Stations/Maguga";
import Maguduza from "./Power Stations/Maguduza";

class Settings extends React.Component {
  static contextType = InflowsContext;
  render() {
    const { ezulwiniPS, maguduzaPS, edwaleniPS, magugaPS } = this.context;
    return (
      <>
        <div className="content">
          <Row>
            <Ezulwini ezulwiniPS={ezulwiniPS} />
            <Edwaleni edwaleniPS={edwaleniPS} />
            <Maguduza maguduzaPS={maguduzaPS} />
            <Maguga magugaPS={magugaPS} />
          </Row>
        </div>
      </>
    );
  }
}

export default Settings;
