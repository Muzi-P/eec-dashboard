import React from "react";

// reactstrap components
import { Row } from "reactstrap";
import { InflowsContext } from "../components/Context/context";
import Configurations from "./Power Stations/Configurations";

class Settings extends React.Component {
  static contextType = InflowsContext;
  render() {
    const { ezulwiniPS, user } = this.context;
    const admin = user.admin ? user.admin : false;
    return (
      <>
        <div className="content">
          <Row className="justify-content-md-center">
            <Configurations ezulwiniPS={ezulwiniPS} admin={admin} />
          </Row>
        </div>
      </>
    );
  }
}

export default Settings;
