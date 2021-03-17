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

export class Config extends Component {
  static contextType = InflowsContext;
  constructor(props) {
    super();
    this.state = {
      ezulwiniPS: {
        Name: "Edwaleni Power Station",
        Rated_Head: "262",
        Total_Power_Output: "15",
        modelNames: [],
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
      settings: {
        Default_Model: "Dry_season",
        Luphohlo_Weekend_Limit: "1006.5",
        Maguga_Downstream_Wear_Limit: "512",
      },
      disabled: true,
    };
  }
  static getDerivedStateFromProps(nextProps) {
    return {
      settings: nextProps.settings,
      modelNames: nextProps.modelNames,
    };
  }
  handleConfigInputChange = async (e) => {
    this.setState({ disabled: false });
    let settings = this.state.settings;
    settings[e.target.id] = e.target.value;
    await this.setState({
      settings,
    });
  };
  handleConfigChange = () => {
    this.context.editConfig(this.state.settings);
    this.setState({ disabled: true });
  };
  render() {
    const { loading } = this.context;
    const { settings, disabled, modelNames } = this.state;
    return (
      <>
        {!loading && (
          <Col md="12" lg="12" xl="6">
            <Card>
              <CardHeader>
                <h5 className="title">Configurations</h5>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col className="pr-md-1" md="6">
                      <FormGroup>
                        <label>Luphohlo_Weekend_Limit (m.a.sl)</label>
                        <Input
                          onChange={this.handleConfigInputChange}
                          type="number"
                          id="Luphohlo_Weekend_Limit"
                          value={settings.Luphohlo_Weekend_Limit}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="5">
                      <FormGroup>
                        <label>Default_Model</label>
                        <Input
                          type="select"
                          name="select"
                          id="Default_Model"
                          onChange={this.handleConfigInputChange}
                        >
                          {modelNames.map((model, index) => {
                            return <option key={index}>{model}</option>;
                          })}
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-md-1" md="6">
                      <FormGroup>
                        <label>Maguga_Downstream_Wear_Limit(m.a.s.l)</label>
                        <Input
                          onChange={this.handleConfigInputChange}
                          value={settings.Maguga_Downstream_Wear_Limit}
                          id="Maguga_Downstream_Wear_Limit"
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
                  onClick={this.handleConfigChange}
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

export default Config;
