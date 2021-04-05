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
    const { ezulwiniPS, maguduzaPS, edwaleniPS, magugaPS, user } = this.context;
    const admin = user.admin ? user.admin : false;
    return (
      <>
        <div className="content">
          <Row>
            <Maguga magugaPS={magugaPS} admin={admin} />
            <Ezulwini ezulwiniPS={ezulwiniPS} admin={admin} />
            <Edwaleni edwaleniPS={edwaleniPS} admin={admin} />
            <Maguduza maguduzaPS={maguduzaPS} admin={admin} />
          </Row>
        </div>
      </>
    );
  }
}

export default Settings;
