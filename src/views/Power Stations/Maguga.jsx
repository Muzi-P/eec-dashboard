import React, { Component } from "react";
import { InflowsContext } from "../../components/Context/context";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";

export class Maguga extends Component {
  static contextType = InflowsContext;
  constructor(props) {
    super();
    this.state = {
      magugaPS: {
        Name: "Edwaleni Power Station",
        Rated_Head: "262",
        Total_Power_Output: "15",
        Genarators: [
          {
            Rated_Power: "2.5",
            Rated_Flow: "0.240",
            Units: "4",
          },
          {
            Rated_Power: "5",
            Rated_Flow: "0.470",
            Units: "1",
          },
        ],
      },
      disabled: true,
    };
  }
  static getDerivedStateFromProps(nextProps) {
    return {
      magugaPS: nextProps.magugaPS,
    };
  }
  handleEzuwliniInputChange = (e) => {
    this.setState({ disabled: false });
    let magugaPS = this.state.magugaPS;
    magugaPS.Genarators[e.target.id].Rated_Flow = e.target.value;
    this.setState({ magugaPS });
  };
  handleRatedFlowChange = () => {
    this.context.editRatedFlow(this.state.magugaPS);
    this.setState({ disabled: true });
  };
  handleChange = () => {};
  render() {
    const { magugaPS, disabled } = this.state;
    const { loading } = this.context;
    const { admin } = this.props;
    return (
      <>
        {!loading && (
          <Col md="12" lg="6" xl="6">
            <Card>
              <CardHeader>
                <h5 className="title">{magugaPS.Name}</h5>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col className="pr-md-1" md="6">
                      <FormGroup>
                        <label>Total Power Output (MW)</label>
                        <Input
                          onChange={this.handleChange}
                          value={magugaPS.Total_Power_Output}
                          type="number"
                          disabled={true}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="6">
                      <FormGroup>
                        <label>Rated Head (m)</label>
                        <Input
                          onChange={this.handleChange}
                          value={magugaPS.Rated_Head}
                          type="number"
                          disabled={true}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-md-1" md="6">
                      <FormGroup>
                        <label>Generators</label>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-md-1" md="4">
                      <FormGroup>
                        <label>Rated Power (MW)</label>
                        <Input
                          onChange={this.handleChange}
                          value={magugaPS.Genarators[0].Rated_Power}
                          disabled={!admin}
                          type="number"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="4">
                      <FormGroup>
                        <label>Units</label>
                        <Input
                          onChange={this.handleChange}
                          value={magugaPS.Genarators[0].Units}
                          disabled={!admin}
                          type="number"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="4">
                      <FormGroup>
                        <label>Rated Flow (m³/s/MW)</label>
                        <Input
                          onChange={this.handleEzuwliniInputChange}
                          value={magugaPS.Genarators[0].Rated_Flow}
                          id="0"
                          disabled={!admin}
                          type="number"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-md-1" md="4">
                      <FormGroup>
                        <Input
                          onChange={this.handleChange}
                          value={magugaPS.Genarators[1].Rated_Power}
                          disabled={!admin}
                          type="number"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="4">
                      <FormGroup>
                        <Input
                          onChange={this.handleChange}
                          value={magugaPS.Genarators[1].Units}
                          disabled={!admin}
                          type="number"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="4">
                      <FormGroup>
                        <Input
                          onChange={this.handleEzuwliniInputChange}
                          value={magugaPS.Genarators[1].Rated_Flow}
                          id="1"
                          disabled={!admin}
                          type="number"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
              <CardFooter>
                <Button
                  className="btn-fill"
                  color="primary"
                  type="submit"
                  onClick={this.handleRatedFlowChange}
                  disabled={disabled}
                >
                  Save
                </Button>
              </CardFooter>
            </Card>
          </Col>
        )}
      </>
    );
  }
}

export default Maguga;
