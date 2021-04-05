import React, { Component } from "react";
import { InflowsContext } from "../components/Context/context";
import { Card, CardBody, CardHeader, Row, CardTitle, Col } from "reactstrap";

export default class DailySummary extends Component {
  static contextType = InflowsContext;

  render() {
    const { summary } = this.context;
    return (
      <>
        <Col md="12" lg="12" xl="5">
          <Card>
            <CardHeader>
              <CardTitle
                tag="h4"
                style={{ "text-align": "center", "font-weight": 600 }}
              >
                Water Usage Summary
              </CardTitle>
            </CardHeader>
            <CardBody>
              <Row>
                <Col>
                  <h5 className="title">Ezulwini Power Station</h5>
                </Col>
              </Row>
              <Row>
                {summary.slice(0, 10).map((item, index) => {
                  return (
                    <Col className="pr-md-1" md="4" key={index}>
                      <label htmlFor="exampleInputEmail1">{item.text}</label>
                      <h5 className="title">{item.value}</h5>
                    </Col>
                  );
                })}
              </Row>
              <br />
              <Row>
                <Col>
                  <h5 className="title">Maguga Power Station</h5>
                </Col>
              </Row>
              <Row>
                {summary.slice(10).map((item, index) => {
                  return (
                    <Col className="pr-md-1" md="4" key={index}>
                      <label htmlFor="exampleInputEmail1">{item.text}</label>
                      <h5 className="title">{item.value}</h5>
                    </Col>
                  );
                })}
              </Row>
            </CardBody>
          </Card>
        </Col>
      </>
    );
  }
}
