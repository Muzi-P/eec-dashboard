import React, { Component } from "react";
import { InflowsContext } from "../components/Context/context";
// import DatePicker from "react-datepicker";
import { KeyboardDatePicker } from "@material-ui/pickers";

import "react-datepicker/dist/react-datepicker.css";
import PreviousInflows from "./PreviousInflows";
import DailySummary from "./Summary";
import WeekDayGenSchedule from "./schedules/WeekDayGenSchedule";
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
class GenerateSchedule extends Component {
  static contextType = InflowsContext;
  constructor(props) {
    super(props);
    this.state = {
      value: new Date().toISOString(),
      startDate: new Date(),
      placeholder: "dangerouslySetInnerHTML={hello}",
      Mkinkomo_Reservoir_Daily_Level: "",
      Luphohlo_Daily_Level: "",
      Irrigation_Flow: "",
      Regulating_Weir: "",
      Maguga_Downstream_Wear_Limit: "",
      Ferreira: "",
      queryInflows: {},
      GS_15: "",
      GS_2: "",
      valid: true,
      disabled: true,
      model: "",
      selectedDate: new Date(),
      validFields: [
        "Mkinkomo_Reservoir_Daily_Level",
        "Luphohlo_Daily_Level",
        "Ferreira",
        "GS_15",
        "GS_2",
        "Irrigation_Flow",
        "Regulating_Weir",
        "Maguga_Downstream_Wear_Limit",
      ],
    };
  }
  /**
   *
   * @param {*} date
   * @description populate corresponding date when date from calender is selected, we compare "dateString" with "returnStringDate" because back return any dat after queried date even if it's not the same date as on the calender
   */
  handleChange = async (date) => {
    const event = new Event("dummy");
    await this.setState({
      startDate: date,
    });
    this.context.handleForecastDateChange(this.state.startDate);
    let dateString = this.context.formatDate(date);
    this.context
      .getInflow(this.context.formatDate(date))
      .then((res) => {
        let returnStringDate = this.context.formatDate(
          res.data.Day_of_Input.split("T")[0]
        );
        if (returnStringDate === dateString) {
          this.setState({ queryInflows: res.data });
          this.loadPreviousInflows(event, true);
        } else {
          this.clearInputs();
        }
      })
      .catch((err) => {
        this.clearInputs();
      });
  };
  clearInputs = () => {
    this.setState({
      Mkinkomo_Reservoir_Daily_Level: "",
    });
    this.setState({
      Luphohlo_Daily_Level: "",
    });
    this.setState({
      Ferreira: "",
    });
    this.setState({
      Ferreira: "",
    });
    this.setState({
      GS_15: "",
    });
    this.setState({
      GS_2: "",
    });
    this.setState({
      Regulating_Weir: "",
    });
    this.setState({
      Irrigation_Flow: "",
    });
  };
  componentDidMount = () => {
    this.context.handleForecastDateChange(this.state.startDate);
    this.handleChange(this.state.startDate);
  };
  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (
      !this.state.Maguga_Downstream_Wear_Limit &&
      Object.keys(this.context.settings).length !== 0
    ) {
      this.setState({
        Maguga_Downstream_Wear_Limit: this.context.settings
          .Maguga_Downstream_Wear_Limit,
      });
    }
  }

  handleInputChange = async (e) => {
    await this.setState({
      [e.target.id]: e.target.value,
    });
    const disabled = this.isValid();
    this.setState({ disabled });
  };
  isValid = () => {
    let valid = false;
    this.state.validFields.forEach((item) => {
      if (this.state[item] === "") {
        valid = true;
      }
    });
    return valid;
  };

  handleGenerateSchedule = () => {
    if (this.state.model === "") {
      this.setState(
        { model: this.context.modelNames[0] },
        this.generateSchedule
      );
    } else {
      this.generateSchedule();
    }
  };
  generateSchedule = () => {
    this.context.generateSchedule(this.state);
  };
  mkinkomoOnfocusOut = (e) => {
    let currentValue = e.target.value;
    if (currentValue === "") {
      return;
    } else {
      currentValue = parseFloat(currentValue);
      if (currentValue <= 5) {
        currentValue = 589.5 + currentValue;
        this.setState({
          [e.target.id]: currentValue,
        });
      }
    }
  };
  luphohloOnfocusOut = (e) => {
    let currentValue = e.target.value;
    if (currentValue === "") {
      return;
    } else {
      currentValue = parseFloat(currentValue);
      if (currentValue <= 20) {
        currentValue = 1015.6 + currentValue;
        this.setState({
          [e.target.id]: currentValue,
        });
      }
    }
  };
  gsOnfocusOut = (e) => {
    let currentValue = e.target.value;
    if (currentValue.includes(".")) {
      const split = currentValue.split(".");
      if (split[0] === "") {
        currentValue = `0.${split[1]}`;
        this.setState({
          [e.target.id]: currentValue,
        });
      }
    }
  };
  loadPreviousInflows = async (e, queryInflows = false) => {
    const { inflows } = this.context;
    // if (Object.keys(inflows).length === 0) return;
    var lastInflow = queryInflows
      ? this.state.queryInflows
      : inflows.slice(-1)[0];
    const {
      Mkinkomo_Reservoir_Daily_Level,
      Luphohlo_Daily_Level,
      Ferreira,
      GS_15,
      GS_2,
      Day_of_Input,
      Regulating_Weir,
      Irrigation_Flow,
    } = lastInflow;
    await this.setState({
      Mkinkomo_Reservoir_Daily_Level,
    });
    await this.setState({
      Luphohlo_Daily_Level,
    });
    await this.setState({
      Ferreira,
    });
    await this.setState({
      Ferreira,
    });
    await this.setState({
      GS_15,
    });
    await this.setState({
      GS_2,
    });
    await this.setState({
      Regulating_Weir,
    });
    await this.setState({
      Irrigation_Flow,
    });
    // split date string and get first array eg. 2020-07-01T16:00:00.000Z => 2020-07-01
    await this.setState({
      startDate: new Date(Day_of_Input.split("T")[0]),
    });
    const disabled = this.isValid();
    this.setState({ disabled });
    this.context.handleForecastDateChange(this.state.startDate);
  };
  handleDateChangeRaw = (e) => {
    e.preventDefault();
  };
  render() {
    const { date, loading, user } = this.context;
    const { disabled, Maguga_Downstream_Wear_Limit } = this.state;
    const admin = user.admin ? user.admin : false;
    return (
      <>
        <div className="content">
          <Row>
            <Col md="12" lg="12" xl="6">
              <Card>
                <CardHeader>
                  <h4 className="title">ENTER INFLOWS</h4>
                  <h5 className="title">Today's Date: {date}</h5>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row>
                      <Col className="pr-md-1 calender" md="12" lg="4">
                        <FormGroup>
                          <label htmlFor="exampleInputEmail1">
                            Select Date:
                          </label>
                          <div>
                            <KeyboardDatePicker
                              variant="inline"
                              autoOk
                              inputVariant="outlined"
                              format="dd/MM/yyyy"
                              views={["year", "month", "date"]}
                              value={this.state.startDate}
                              InputAdornmentProps={{ position: "start" }}
                              onChange={(date) => this.handleChange(date)}
                            />
                          </div>
                        </FormGroup>
                      </Col>
                      <Col className="pr-md-1" md="6" lg="4">
                        <FormGroup>
                          <label htmlFor="exampleInputEmail1">
                            Select Model:
                          </label>
                          <Input
                            type="select"
                            name="select"
                            id="model"
                            onChange={this.handleInputChange}
                            disabled={!admin}
                          >
                            {this.context.modelNames.map((model, index) => {
                              return <option key={index}>{model}</option>;
                            })}
                          </Input>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-md-1" md="3">
                        <FormGroup>
                          <label>Luphohlo Daily Level</label>
                          <Input
                            id="Luphohlo_Daily_Level"
                            placeholder="m.a.s.l."
                            required
                            type="number"
                            value={this.state.Luphohlo_Daily_Level}
                            onBlur={this.luphohloOnfocusOut}
                            onChange={this.handleInputChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pr-md-1" md="3">
                        <FormGroup>
                          <label>GS_15</label>
                          <Input
                            id="GS_15"
                            required
                            placeholder="m³/s"
                            type="number"
                            onBlur={this.gsOnfocusOut}
                            value={this.state.GS_15}
                            onChange={this.handleInputChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pr-md-1" md="3">
                        <FormGroup>
                          <label>GS_2</label>
                          <Input
                            id="GS_2"
                            required
                            placeholder="m³/s"
                            type="number"
                            onChange={this.handleInputChange}
                            onBlur={this.gsOnfocusOut}
                            value={this.state.GS_2}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pr-md-1" md="3">
                        <FormGroup>
                          <label>Mkinkomo Level</label>
                          <Input
                            id="Mkinkomo_Reservoir_Daily_Level"
                            required
                            placeholder="m.a.s.l."
                            type="number"
                            value={this.state.Mkinkomo_Reservoir_Daily_Level}
                            onChange={this.handleInputChange}
                            onBlur={this.mkinkomoOnfocusOut}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      {/* <Col className="pr-md-1" md="4">
                        <FormGroup>
                          <label>Mkinkomo Reservoir Daily Level</label>
                          <Input
                            id="Mkinkomo_Reservoir_Daily_Level"
                            required
                            placeholder="m.a.s.l."
                            type="number"
                            value={this.state.Mkinkomo_Reservoir_Daily_Level}
                            onChange={this.handleInputChange}
                            onBlur={this.mkinkomoOnfocusOut}
                          />
                        </FormGroup>
                      </Col> */}
                      <Col className="pr-md-1" md="3">
                        <FormGroup>
                          <label>Ferreira</label>
                          <Input
                            id="Ferreira"
                            required
                            placeholder="m³/s"
                            type="number"
                            onBlur={this.gsOnfocusOut}
                            value={this.state.Ferreira}
                            onChange={this.handleInputChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pr-md-1" md="3">
                        <FormGroup>
                          <label>Irrigation Flow</label>
                          <Input
                            id="Irrigation_Flow"
                            required
                            placeholder="m³/s"
                            type="number"
                            // onBlur={this.gsOnfocusOut}
                            value={this.state.Irrigation_Flow}
                            onChange={this.handleInputChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pr-md-1" md="3">
                        <FormGroup>
                          <label>Weir Daily Level</label>
                          <Input
                            id="Regulating_Weir"
                            required
                            placeholder="m.a.s.l"
                            type="number"
                            // onBlur={this.gsOnfocusOut}
                            value={this.state.Regulating_Weir}
                            onChange={this.handleInputChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pr-md-1" md="3">
                        <FormGroup>
                          <label>Weir Limit</label>
                          <Input
                            id="Maguga_Downstream_Wear_Limit"
                            required
                            placeholder="m.a.s.l"
                            type="number"
                            // onBlur={this.gsOnfocusOut}
                            value={Maguga_Downstream_Wear_Limit}
                            onChange={this.handleInputChange}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
                <CardFooter>
                  <Button
                    className="btn-fill"
                    disabled={disabled}
                    color="primary"
                    type="button"
                    onClick={this.handleGenerateSchedule}
                  >
                    Generate Schedule
                  </Button>
                  <Button
                    className="btn-fill"
                    color="info"
                    type="button"
                    onClick={this.loadPreviousInflows}
                    disabled={loading}
                  >
                    Load Previous Inflows
                  </Button>
                </CardFooter>
              </Card>
            </Col>
            <PreviousInflows />
          </Row>
          <Row>
            <WeekDayGenSchedule date={this.state.startDate} admin={admin} />
            <DailySummary />
          </Row>
        </div>
      </>
    );
  }
}

export default GenerateSchedule;
