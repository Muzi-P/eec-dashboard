import React, { Component } from "react";
import MultiSeriesAreaChartGs2 from "./MuLtiSeriesAreaChartGS_2";
import { InflowsContext } from "../Context/context";

import {
  // ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  DropdownToggle,
  DropdownMenu,
  UncontrolledDropdown,
  Input,
  Row,
  InputGroupText,
  Col,
} from "reactstrap";

export default class MuLtiSeriesAreaChartGS2Wrapper extends Component {
  static contextType = InflowsContext;
  constructor(props) {
    super(props);
    this.state = {
      bigChartData: "data1",
      inflows: [],
      data: [],
    };
  }

  handleChange = (e) => {
    this.setState({ checkboxChecked: e.target.checked });
    this.context.handleGS2ReviewYear(e.target.value);
  };
  render() {
    const { gs2ReviewYears } = this.context;

    let yearInfocus = this.context.years.map((year, key) => {
      return (
        <InputGroupText className="reveiwYear" key={year}>
          <Input
            addon
            type="checkbox"
            aria-label="Checkbox for following text input"
            onChange={(e) => this.handleChange(e)}
            value={year}
            key={year}
            checked={gs2ReviewYears.includes(year)}
          />
          {year}
        </InputGroupText>
      );
    });
    return (
      <Row>
        <Col xs="12">
          <Card className="card-chart">
            <CardHeader>
              <Row>
                <Col className="text-left" sm="6">
                  {gs2ReviewYears.length !== 0 && (
                    <h5 className="card-category">
                      Review Year: {gs2ReviewYears.toString()}
                    </h5>
                  )}
                  <CardTitle tag="h2">GS 2 Inflows</CardTitle>
                </Col>
                <Col>
                  <UncontrolledDropdown>
                    <DropdownToggle
                      caret
                      className="btn-icon"
                      color="link"
                      data-toggle="dropdown"
                      type="button"
                    >
                      <i className="tim-icons icon-settings-gear-63" />
                    </DropdownToggle>
                    <DropdownMenu
                      aria-labelledby="dropdownMenuLink"
                      right
                      persist
                      overflow="auto"
                      className="reviewYearMenu"
                    >
                      {yearInfocus}
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              <MultiSeriesAreaChartGs2
                data={this.context.populateGS2DataPoints()}
                dataPoints={this.context.getData()}
                defaultModel={this.context.getDefaultModel()}
                reviewYear={this.context.reviewYear}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}
