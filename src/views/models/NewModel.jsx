import React, { Component } from "react";
import MaterialTable from "material-table";
import { InflowsContext } from "../../components/Context/context";
import {
  Card,
  CardBody,
  FormGroup,
  Input,
  CardTitle,
  Button,
  CardFooter,
  Col,
} from "reactstrap";
import swal from "sweetalert";

export default class NewModel extends Component {
  static contextType = InflowsContext;
  constructor(props) {
    super();
    this.state = {
      columns: [
        { title: "Month", field: "month", editable: "never" },
        { title: "Min", field: "min", type: "numeric" },
        { title: "Opt", field: "opt", type: "numeric" },
        { title: "Max", field: "max", type: "numeric" },
      ],
      data: [
        { month: "January", max: "", min: "", opt: "" },
        { month: "February", max: "", min: "", opt: "" },
        { month: "March", max: "", min: "", opt: "" },
        { month: "April", max: "", min: "", opt: "" },
        { month: "May", max: "", min: "", opt: "" },
        { month: "June", max: "", min: "", opt: "" },
        { month: "July", max: "", min: "", opt: "" },
        { month: "August", max: "", min: "", opt: "" },
        { month: "September", max: "", min: "", opt: "" },
        { month: "October", max: "", min: "", opt: "" },
        { month: "November", max: "", min: "", opt: "" },
        { month: "December", max: "", min: "", opt: "" },
        // {
        //   max: "1011.78",
        //   min: "1008.68",
        //   opt: "1010.31",
        //   month: "January",
        //   day: "2016,01,15",
        // },
        // {
        //   max: "1013.47",
        //   min: "1012.10",
        //   opt: "1012.93",
        //   month: "February",
        //   day: "2016,02,15",
        // },
        // {
        //   max: "1014.75",
        //   min: "1014.39",
        //   opt: "1014.64",
        //   month: "March",
        //   day: "2016,03,15",
        // },
        // {
        //   max: "1015.60",
        //   min: "1015.60",
        //   opt: "1015.60",
        //   month: "April",
        //   day: "2016,04,15",
        // },
        // {
        //   max: "1015.32",
        //   min: "1015.26",
        //   opt: "1015.32",
        //   month: "May",
        //   day: "2016,05,15",
        // },
        // {
        //   max: "1012.63",
        //   min: "1012.27",
        //   opt: "1012.47",
        //   month: "June",
        //   day: "2016,06,15",
        // },
        // {
        //   max: "1009.73",
        //   min: "1009.09",
        //   opt: "1009.47",
        //   month: "July",
        //   day: "2016,07,15",
        // },
        // {
        //   max: "1007.50",
        //   min: "1006.54",
        //   opt: "1007.14",
        //   month: "August",
        //   day: "2016,08,15",
        // },
        // {
        //   max: "1005.59",
        //   min: "1004.28",
        //   opt: "1004.92",
        //   month: "September",
        //   day: "2016,09,15",
        // },
        // {
        //   max: "1004.44",
        //   min: "1003.08",
        //   opt: "1003.55",
        //   month: "October",
        //   day: "2016,10,15",
        // },
        // {
        //   max: "1004.06",
        //   min: "1002.26",
        //   opt: "1003.05",
        //   month: "November",
        //   day: "2016,11,15",
        // },
        // {
        //   max: "1005.96",
        //   min: "1003.79",
        //   opt: "1004.88",
        //   month: "December",
        //   day: "2016,12,15",
        // },
      ],
      ModelName: "",
      valid: true,
      disabled: true,
      validFields: ["ModelName"],
    };
  }
  handleInputChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
    this.isValid();
  };
  drainageModelOnfocusOut = () => {
    this.isValid();
  };
  isValid = () => {
    let disabled = false;
    this.state.validFields.forEach((item) => {
      if (this.state[item] === "") {
        disabled = true;
      }
    });
    this.setState({ disabled });
  };
  handleNewModel = (e) => {
    e.preventDefault();
    const { allFilled, row } = this.isModelFilled();
    if (allFilled) {
      this.context.newModel(this.state.data, this.state.ModelName);
    } else {
      swal({
        title: "Invalid Input",
        text: `${row.join()}`,
        icon: "error",
        button: "Okay",
      });
    }
    // this.context.newModel(this.state.data, this.state.ModelName);
    // this.alert();
  };
  alert = () => {
    swal({
      title: "New Model Created",
      text: `Model Name: ${this.state.ModelName}`,
      icon: "success",
      button: "Okay",
    }).then(() => {
      this.props.showViewModel();
    });
  };
  isModelFilled = () => {
    let allFilled = true;
    let row = [];
    let rowArray = this.state.data;
    for (let index = 0; index < rowArray.length; index++) {
      if (
        !rowArray[index].max ||
        !rowArray[index].min ||
        !rowArray[index].opt
      ) {
        allFilled = false;
        row.push(rowArray[index].month);
        break;
      }
    }
    return { allFilled, row };
  };
  render() {
    const { columns, data, disabled } = this.state;
    return (
      <>
        <Col md="12">
          <Card>
            <CardTitle>
              <FormGroup>
                <label>Name of Drainage Model</label>
                <Input
                  id="ModelName"
                  placeholder="model name"
                  required
                  value={this.state.ModelName}
                  onBlur={this.drainageModelOnfocusOut}
                  onChange={this.handleInputChange}
                />
              </FormGroup>
            </CardTitle>
            <CardBody>
              <MaterialTable
                title="Editable Example"
                columns={columns}
                data={data}
                options={{
                  paging: false,
                  search: false,
                }}
                editable={{
                  onRowUpdate: (newData, oldData) =>
                    new Promise((resolve) => {
                      setTimeout(() => {
                        resolve();
                        if (oldData) {
                          this.setState((prevState) => {
                            const data = [...prevState.data];
                            data[data.indexOf(oldData)] = newData;
                            return { ...prevState, data };
                          });
                        }
                      }, 600);
                    }),
                  // onBulkUpdate: (changes) =>
                  //   new Promise((resolve, reject) => {
                  //     setTimeout(() => {
                  //       resolve();
                  //     }, 1000);
                  //   }),
                }}
              />
            </CardBody>
            <CardFooter>
              <Button
                className="btn-fill"
                color="primary"
                disabled={disabled}
                onClick={(e) => this.handleNewModel(e)}
              >
                Save New Model
              </Button>
            </CardFooter>
          </Card>
        </Col>
      </>
    );
  }
}
