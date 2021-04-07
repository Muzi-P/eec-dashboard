import React, { Component } from "react";
import axios from "axios";
import defaultModel from "../../model/models";
import weekDayGenSchedule from "../../data/weekDayGenSchedule.json";
import weekEndGenSchedule from "../../data/weekEndGenSchedule.json";
import weekSunGenSchedule from "../../data/weekSunGenSchedule.json";
import functions from "../../utils/functions";
import swal from "sweetalert";
import Cookies from "js-cookie";
import FileDownload from "js-file-download";
const InflowsContext = React.createContext();

class InflowsProvider extends Component {
  constructor(props) {
    super();
    this.state = {
      inflows: [],
      models: [],
      modelNames: [],
      currentYear: new Date().getFullYear(),
      reviewYears: [],
      powerStations: [],
      reviewModels: [],
      loading: true,
      utils: functions,
      selectedModel: [],
      currentModel: [],
      gs15ReviewYears: [`${new Date().getFullYear()}`],
      years: [],
      ezulwini: [],
      isAuthenticated: false,
      user: {},
      showViewModel: false,
      settings: {},
      ezulwiniPS: {},
      magugaPS: {},
      edwaleniPS: {},
      maguduzaPS: {},
      config: {},
      schedules: {},
      date: `${new Date().toDateString()}`,
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      shortMonths: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      weekDayGenSchedule: weekDayGenSchedule,
      weekEndGenSchedule: weekEndGenSchedule,
      weekSunGenSchedule: weekSunGenSchedule,
      currentSchedule: [],
      summary: [
        {
          text: "Current Model",
          value: "",
        },
        {
          text: "Current Month",
          value: "",
        },
        {
          text: "Daily Limit (m.a.s.l)",
          value: "",
        },
        {
          text: "Daily Limit (%)",
          value: "",
        },
        {
          text: "Initial Dam Level (m.a.s.l)",
          value: "",
        },
        {
          text: "Initial Dam Level (%)",
          value: "",
        },
        {
          text: "Available Water (mil. m³)",
          value: "",
        },
        {
          text: "Water Used (mil. m³)",
          value: "",
        },
        {
          text: "Final Dam Level(m.a.s.l)",
          value: "",
        },
        {
          text: "Final Dam Level(%)",
          value: "",
        },
        {
          text: "Weir Limit(m.a.s.l)",
          value: "",
        },
        {
          text: "Weir Limit(m³)",
          value: "",
        },
        {
          text: "Weir Limit(%)",
          value: "",
        },
        {
          text: "Weir Initial Level(m.a.s.l)",
          value: "",
        },
        {
          text: "Weir Initial Level(m³)",
          value: "",
        },
        {
          text: "Weir Initial Level(%)",
          value: "",
        },
        {
          text: "Available Water(m³)",
          value: "",
        },
        {
          text: "Available Hours(hrs)",
          value: "",
        },
        {
          text: "Weir Final Level(m.a.s.l)",
          value: "",
        },
        {
          text: "Weir Final Level(m³)",
          value: "",
        },
      ],
    };
  }
  componentDidMount = () => {
    this.init();
  };
  init = async () => {
    const token = Cookies.get("token");
    if (token) {
      await this.setState({ isAuthenticated: true });
    }
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    await this.setState({ config });
    this.getAllInflows();
    this.getCurrentUser();
    await this.getAllPowerStations();
    this.getCurrentSchedule();
    this.getSettings();
    this.getAllModels();
  };
  /**
   * @description get all inflows
   */
  getAllInflows = () => {
    this.setState({ loading: true });
    axios
      .get(`${process.env.REACT_APP_API}/inflows`, this.state.config)
      .then((res) => {
        this.setState({ inflows: res.data });
        this.setState({ loading: false });
        this.getAllYears(res.data);
      })
      .catch(() => {
        this.setState({ isAuthenticated: false });
      });
  };
  /**
   * @description get all power stations
   */
  getAllPowerStations = async () => {
    axios
      .get(`${process.env.REACT_APP_API}/power-stations`, this.state.config)
      .then((res) => {
        this.formatStations(res.data);
      })
      .catch(() => {
        this.setState({ isAuthenticated: false });
      });
  };

  /**
   * @description get all settings
   */
  getSettings = () => {
    axios
      .get(`${process.env.REACT_APP_API}/settings`, this.state.config)
      .then((res) => {
        this.setState({ settings: res.data });
      })
      .catch(() => {
        this.setState({ isAuthenticated: false });
      });
  };
  /**
   * @description format power stations
   */
  formatStations = (stations) => {
    this.setState({ powerStations: stations });
    stations.forEach((item) => {
      switch (item.Name) {
        case "Edwaleni Power Station":
          this.setState({ edwaleniPS: item });
          break;
        case "Maguduza Power Station":
          this.setState({ maguduzaPS: item });
          break;
        case "Ezulwini Power Station":
          this.setState({ ezulwiniPS: item });
          break;
        case "Maguga Power Station":
          this.setState({ magugaPS: item });
          break;
        default:
          break;
      }
    });
    this.setState({ loading: false });
  };
  /**
   * @description get all models
   */
  getAllModels = () => {
    this.setState({ loading: true });
    axios
      .get(`${process.env.REACT_APP_API}/models`, this.state.config)
      .then((res) => {
        this.setState({ models: res.data });
        this.getAllModelNames(res.data);
      });
  };
  /**
   * @description get current user
   */
  getCurrentUser = () => {
    axios
      .get(`${process.env.REACT_APP_API}/users/me`, this.state.config)
      .then((res) => {
        this.setState({ user: res.data });
      });
  };
  /**
   * @description get all active inflows years
   * @param inflows
   */
  getAllYears = (inflows) => {
    let years = [];
    inflows.forEach((item) => {
      let year = new Date(item.Day_of_Input).getFullYear();
      if (!years.includes(year.toString())) years.push(year.toString());
    });
    this.setState({ years });
    this.setState({ gs15ReviewYears: years });
  };
  /**
   * @description format model names
   */
  getAllModelNames = (models) => {
    const defaultModel = this.state.settings.Default_Model;
    let modelNames = [];
    models.forEach((item) => {
      modelNames.push(item.Model_Name);
    });

    let modelIndex = null;

    modelNames.forEach((modelName, index) => {
      if (modelName === defaultModel) {
        modelIndex = index;
      }
    });

    if (modelIndex) {
      modelNames = this.swapElement(modelNames, 0, modelIndex);
    }
    this.setState({ modelNames });
    // set default model
    this.setState({ reviewModels: [modelNames[0]] });
    this.setState({ loading: false });
    this.handleDrainageModelChange(modelNames[0]);
  };

  /**
   * swap array
   * @param {*} array
   * @param {*} indexA
   * @param {*} indexB
   */
  swapElement = (array, indexA, indexB) => {
    var tmp = array[indexA];
    array[indexA] = array[indexB];
    array[indexB] = tmp;
    return array;
  };
  /**
   * @description get current schedules
   */
  getCurrentSchedule = (date = new Date()) => {
    axios
      .get(
        `${process.env.REACT_APP_API}/schedules/${this.formatDate(date)}`,
        this.state.config
      )
      .then((res) => {
        this.setState({ schedules: res.data });
      })
      .catch((res) => {
        this.setState({ schedules: [] });
      });
  };
  postToNode(inflows) {
    let config = {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjMwMjkyZjZjZjFiOTAwMTcyODZhMmYiLCJpYXQiOjE1OTY5OTE3OTF9.n0rOE78rbqRVWzWS3t9qn9KVDQQGAG4RIDEITlh07sk",
      },
    };
    inflows.forEach((item) => {
      axios
        .post(`${process.env.REACT_APP_API}/inflows`, item, config)
        .then((res) => console.log(res))
        .catch((res) => console.log(res));
    });
  }
  populateGS15Model = (reviewYear) => {
    let singleYearInflows = this.state.inflows.filter((inflow) =>
      inflow.Day_of_Input.includes(reviewYear)
    );
    // this.postToNode(singleYearInflows)
    let yearlyGS15Inflows = [];
    let dataGS15 = [];
    for (let i = 0; i < 12; i++) {
      let singleMonth = singleYearInflows.filter(
        (inflow) => new Date(inflow.Day_of_Input).getMonth() === i
      );
      let monthlyGS15 = singleMonth.map((inflow) => {
        return parseFloat(inflow.GS_15);
      });
      let average = this.gs15MonthlyInflowsAverage(monthlyGS15);
      let object = {};
      object[this.state.months[i]] = monthlyGS15;
      object["average"] = parseFloat(average);
      yearlyGS15Inflows.push(object);

      let dataPointObject = {};
      dataPointObject["label"] = this.state.months[i];
      dataPointObject["y"] = parseFloat(average);
      dataGS15.push(dataPointObject);
    }
    return dataGS15;
  };

  editModel = (modelData) => {
    let y_min_points = [];
    let y_opt_points = [];
    let y_max_points = [];

    modelData.forEach((item) => {
      y_min_points.push(parseFloat(item.min));
      y_opt_points.push(parseFloat(item.opt));
      y_max_points.push(parseFloat(item.max));
    });
    console.log({ y_min_points, y_opt_points, y_max_points });
  };
  populateModel = (reviewYear) => {
    // Current model
    let singleYearInflows = this.state.inflows.filter((inflow) =>
      inflow.Day_of_Input.includes(reviewYear)
    );
    // this.postToNode(singleYearInflows)
    let result = {};
    let dataPoints = singleYearInflows.map((inflow) => {
      let year = inflow.Day_of_Input.split("-");
      year[0] = "2016";
      let newDay_of_Input = year.join("-");
      let data = {
        x: new Date(newDay_of_Input),
        y: parseFloat(inflow.Luphohlo_Daily_Level),
      };
      result = { ...data };
      return result;
    });
    return dataPoints;
  };

  getDefaultModel = () => {
    // default model
    let defaultdataPoints = defaultModel.defaultModel.opt();
    return defaultdataPoints;
  };

  changeForecastYear = (year) => {
    this.setState({ reviewYear: year });
  };
  changeGS15ForecastYear = (year) => {
    this.setState({ gs15ReviewYears: year });
  };
  handleReviewYear = (year) => {
    if (this.state.reviewYears.includes(year)) {
      this.setState({
        reviewYears: this.state.reviewYears.filter((item) => item !== year),
      });
    } else {
      this.setState({ reviewYears: [...this.state.reviewYears, year] });
    }
  };

  handleReviewModel = (model) => {
    if (this.state.reviewModels.includes(model)) {
      this.setState({
        reviewModels: this.state.reviewModels.filter((item) => item !== model),
      });
    } else {
      this.setState({ reviewModels: [...this.state.reviewModels, model] });
    }
  };
  handleGS15ReviewYear = (year) => {
    if (this.state.gs15ReviewYears.includes(year)) {
      this.setState({
        gs15ReviewYears: this.state.gs15ReviewYears.filter(
          (item) => item !== year
        ),
      });
    } else {
      this.setState({ gs15ReviewYears: [...this.state.gs15ReviewYears, year] });
    }
  };
  populateModelDataPoints = () => {
    let reviewModelsDataPoints = this.state.reviewModels.map((model) => {
      const { min, max, opt } = this.generatePoints(model);
      let singleYearDataPoint = this.singleModelDataPoint(model, opt, min, max);
      return singleYearDataPoint;
    });
    let data = this.singleModelDataPoint(
      "default-model",
      defaultModel.defaultModel.opt(),
      defaultModel.defaultModel.min(),
      defaultModel.defaultModel.max()
    );
    if (reviewModelsDataPoints[0]) return reviewModelsDataPoints.flat();
    return data;
  };
  singleModelDataPoint = (name, opt, min, max) => {
    let data = [
      {
        type: "spline",
        name: `${name}-opt`,
        showInLegend: true,
        xValueFormatString: "DD MMM",
        yValueFormatString: "#,###.## m.a.s.l",
        dataPoints: opt,
      },
      {
        type: "spline",
        name: `${name}-min`,
        showInLegend: true,
        xValueFormatString: "DD MMM",
        yValueFormatString: "#,###.## m.a.s.l",
        dataPoints: min,
      },
      {
        type: "spline",
        name: `${name}-max`,
        showInLegend: true,
        xValueFormatString: "DD MMM",
        yValueFormatString: "#,###.## m.a.s.l",
        dataPoints: max,
      },
    ];

    return data;
  };

  interpolate = async (url, postData) => {
    let response = await axios.post(
      `${process.env.REACT_APP_FLASK_API}/${url}`,
      postData
    );
    return response;
  };

  getInflow = async (date) => {
    let response = await axios.get(
      `${process.env.REACT_APP_API}/inflows/${date}`,
      this.state.config
    );
    return response;
  };
  populateDataPoints = (view = false) => {
    let data = this.populateModelDataPoints();

    let reviewYearsDataPoints = this.state.reviewYears.map((year) => {
      let singleYearDataPoint = this.singleYearDataPoint(year);
      return singleYearDataPoint;
    });
    if (view) {
      reviewYearsDataPoints = [];
    }
    if (reviewYearsDataPoints.length === 0) {
      return data;
    } else {
      let merge = data.concat(reviewYearsDataPoints);
      return merge;
    }
  };
  generatePoints = (modelName) => {
    let currentModel = this.state.models.filter(
      (model) => model.Model_Name === modelName
    );
    const { Min, Max, Opt } = currentModel[0];
    return {
      min: this.generateModelDataPoint(Min),
      max: this.generateModelDataPoint(Max),
      opt: this.generateModelDataPoint(Opt),
    };
  };
  generateModelDataPoint = (arr) => {
    let result = {};
    let dataPoints = arr.map((item) => {
      let data = { x: new Date(item.x), y: parseFloat(item.y) };
      result = { ...data };
      return result;
    });
    return dataPoints;
  };
  populateGS15DataPoints = () => {
    let reviewYearsGS15DataPoints = this.state.gs15ReviewYears.map((year) => {
      let singleYearDataPoint = this.singleYearGS15DataPoint(year);
      return singleYearDataPoint;
    });
    return reviewYearsGS15DataPoints;
  };

  singleYearDataPoint = (year) => {
    let data = {
      type: "line",
      name: year,
      showInLegend: true,
      xValueFormatString: "DD MMM",
      yValueFormatString: "#,###.## m.a.s.l",
      dataPoints: this.populateModel(year),
    };
    return data;
  };
  singleYearGS15DataPoint = (year) => {
    let data = {
      type: "spline",
      name: year,
      showInLegend: true,
      xValueFormatString: "MMM",
      yValueFormatString: "#,###.## m^3/s",
      dataPoints: this.populateGS15Model(year),
    };
    return data;
  };

  gs15MonthlyInflowsAverage = (arr) => {
    let sum = 0;

    for (let i = 0; i < arr.length; i++) {
      sum += arr[i];
    }

    return (sum / arr.length).toFixed(2);
  };
  /**
   * @description change schedule template as per day of the week
   * @param {*} date date of scheduling
   */
  handleForecastDateChange = (date) => {
    let day = date.getDay();
    if (day === 6) {
      this.setState({ currentSchedule: this.state.weekEndGenSchedule });
    }

    if (day === 0) {
      this.setState({ currentSchedule: this.state.weekSunGenSchedule });
    }

    if (day !== 6 && day !== 0) {
      this.setState({ currentSchedule: this.state.weekDayGenSchedule });
    }
  };
  /**
   * @description format date string date type ---> "yyyy-mm-dd" or "yyyy,mm,dd"
   * @param {*} date
   * @param {*} commaSeparated if true return yyyy,mm,dd
   */
  formatDate = (date, commaSeparated = false) => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();
    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return commaSeparated
      ? [2016, month, day].join(",")
      : [year, month, day].join("-");
  };
  volumeToPerc = (volume) => ((volume / 23600000) * 100).toFixed(2);
  generateSchedule = async (state) => {
    const {
      startDate,
      Mkinkomo_Reservoir_Daily_Level,
      Luphohlo_Daily_Level,
      Ferreira,
      GS_15,
      GS_2,
      model,
      Regulating_Weir,
      Irrigation_Flow,
      Maguga_Downstream_Wear_Limit,
    } = state;
    let selectedModel = this.state.models.filter(
      (models) => models.Model_Name === model
    );
    await this.setState({ currentModel: selectedModel });
    const inflow = {
      Day_of_Input: this.formatDate(startDate),
      GS_2: GS_2,
      GS_15: GS_15,
      Ferreira: Ferreira,
      Luphohlo_Daily_Level: Luphohlo_Daily_Level,
      Mkinkomo_Reservoir_Daily_Level: Mkinkomo_Reservoir_Daily_Level,
      Regulating_Weir: Regulating_Weir,
      Irrigation_Flow: Irrigation_Flow,
    };
    await this.postInflow(inflow);
    this.updateSummary("Current Model", model);
    this.updateSummary(
      "Maguga Weir Limit(m.a.s.l)",
      Maguga_Downstream_Wear_Limit
    );
    this.updateSummary("Initial Dam Level (m.a.s.l)", Luphohlo_Daily_Level);
    this.updateSummary(
      "Current Month",
      this.state.months[startDate.getMonth()]
    );
    let dateString = this.formatDate(startDate, true);
    let limit = "";
    this.state.currentModel[0].Opt.forEach((item) => {
      if (item.x === dateString) {
        limit = item.y;
        return false;
      }
    });
    const dayVolume = this.state.utils.methods.levelToVol(
      parseFloat(Luphohlo_Daily_Level)
    );
    this.updateSummary("Initial Dam Level (%)", this.volumeToPerc(dayVolume));
    let volume;

    // reset schedules

    let generatedSchedule = this.state.currentSchedule;
    generatedSchedule = this.state.utils.methods.allShutDown(generatedSchedule);
    await this.setState({ currentSchedule: generatedSchedule });

    const month = startDate.getMonth();
    const day = startDate.getDay();
    if (month === 5 || month === 6 || month === 7) {
      if (day === 6 || day === 0) {
        // weekends and peak season
        // only generate if there is a spillage
        limit = 1015.6;
        volume = this.state.utils.methods.levelToVol(limit);
        await this.calculateDailyReq(
          parseFloat(GS_15),
          parseInt(volume),
          parseInt(dayVolume)
        );
      } else {
        // weekday and peak season
        volume = this.state.utils.methods.levelToVol(parseInt(limit));
        await this.calculateDailyReq(
          parseFloat(GS_15),
          parseInt(volume),
          parseInt(dayVolume)
        );
      }
    } else {
      if (day === 6 || day === 0) {
        // weekends off-peak season
        // only generate if dam is above 90%
        limit = parseFloat(this.state.settings.Luphohlo_Weekend_Limit);
        volume = this.state.utils.methods.levelToVol(limit);
        await this.calculateDailyReq(
          parseFloat(GS_15),
          parseInt(volume),
          parseInt(dayVolume)
        );
      } else {
        // weekday and off-peak season
        volume = this.state.utils.methods.levelToVol(parseInt(limit));
        await this.calculateDailyReq(
          parseFloat(GS_15),
          parseInt(volume),
          parseInt(dayVolume)
        );
      }
    }

    const percent = ((volume / 23600000) * 100).toFixed(2);
    this.updateSummary("Daily Limit (m.a.s.l)", limit);
    this.updateSummary("Daily Limit (%)", percent);

    this.populateSchedule(
      startDate,
      Luphohlo_Daily_Level,
      parseFloat(GS_2),
      parseFloat(Ferreira),
      parseFloat(Regulating_Weir),
      parseFloat(Irrigation_Flow),
      parseFloat(Maguga_Downstream_Wear_Limit)
    );
    this.storeSchedule(startDate);
  };
  /**
   * @description function to store schedules in backend
   * @param startDate
   */

  storeSchedule = (startDate) => {
    let powerStations = [];
    let schedulesPostData = {};
    schedulesPostData.Date = this.formatDate(startDate);
    schedulesPostData["Power_Stations"] = [];
    this.state.powerStations.forEach((item) => {
      if (!powerStations.includes(item.Name)) {
        powerStations.push(item.Name);
      }
    });
    powerStations.forEach((powerStation) => {
      let powerStationSchedule = {};
      powerStationSchedule["Schedule"] = [];
      let totals = [];
      powerStationSchedule.Name = powerStation;
      this.state.currentSchedule.forEach((item) => {
        if (item.Time !== "") {
          powerStationSchedule["Schedule"].push({
            Time: item.Time,
            Period: item.Period,
            Power: this.getPower(powerStation, item),
            ezulwiniSumPeak:
              item["ezulwiniSumPeak"] >= 0 ? item["ezulwiniSumPeak"] : null,
            ezulwiniSumStnd:
              item["ezulwiniSumStnd"] >= 0 ? item["ezulwiniSumStnd"] : null,
            ezulwiniSumOffPeak:
              item["ezulwiniSumOffPeak"] >= 0
                ? item["ezulwiniSumOffPeak"]
                : null,
            edwaleniSumPeak:
              item["edwaleniSumPeak"] >= 0 ? item["edwaleniSumPeak"] : null,
            edwaleniSumStnd:
              item["edwaleniSumStnd"] >= 0 ? item["edwaleniSumStnd"] : null,
            edwaleniSumOffPeak:
              item["edwaleniSumOffPeak"] >= 0
                ? item["edwaleniSumOffPeak"]
                : null,
            maguduzaSumPeak:
              item["maguduzaSumPeak"] >= 0 ? item["maguduzaSumPeak"] : null,
            maguduzaSumStnd:
              item["maguduzaSumStnd"] >= 0 ? item["maguduzaSumStnd"] : null,
            maguduzaSumOffPeak:
              item["maguduzaSumOffPeak"] >= 0
                ? item["maguduzaSumOffPeak"]
                : null,
            magugaSumPeak:
              item["magugaSumPeak"] >= 0 ? item["magugaSumPeak"] : null,
            magugaSumStnd:
              item["magugaSumStnd"] >= 0 ? item["magugaSumStnd"] : null,
            magugaSumOffPeak:
              item["magugaSumOffPeak"] >= 0 ? item["magugaSumOffPeak"] : null,
          });
        } else {
          let stationKey = powerStation.split(" ")[0].toUpperCase();
          let objectKey = item.Period.toLowerCase();
          let sumObject = {};
          sumObject[objectKey] = item[stationKey];
          totals.push(sumObject);
        }
      });
      powerStationSchedule["totals"] = totals;
      schedulesPostData["Power_Stations"].push(powerStationSchedule);
    });
    axios.post(
      `${process.env.REACT_APP_API}/schedules`,
      schedulesPostData,
      this.state.config
    );
  };
  /**
   * @description match power generated to power station from schedules object
   * @param powerStation
   * @param hourlyGeneration
   */
  getPower = (powerStation, hourlyGeneration) => {
    let power = "";
    switch (powerStation) {
      case "Edwaleni Power Station":
        power = hourlyGeneration.EDWALENI;
        break;
      case "Ezulwini Power Station":
        power = hourlyGeneration.EZULWINI;
        break;
      case "Maguduza Power Station":
        power = hourlyGeneration.MAGUDUZA;
        break;
      case "Maguga Power Station":
        power = hourlyGeneration.MAGUGA;
        break;
      default:
        break;
    }
    return power;
  };

  /**
   * @description the main function for schedulling
   * @param startDate
   * @param Luphohlo_Daily_Level
   * @param GS_2
   * @param Ferreira
   */
  populateSchedule = (
    startDate,
    Luphohlo_Daily_Level,
    GS_2,
    Ferreira,
    Regulating_Weir,
    Irrigation_Flow,
    Maguga_Downstream_Wear_Limit
  ) => {
    const month = startDate.getMonth();
    const day = startDate.getDay();
    if (month === 5 || month === 6 || month === 7) {
      if (day === 6 || day === 0) {
        // weekends and peak season
        // only generate if there is a spillage
        // Ezulwini
        this.populateScheduleWeekEndOffPeak(day);
        // edwaleni same as off peak season
        this.populateEdwaleniWeekendOffPeakSchedule(GS_2, Ferreira, day);
        // maguduza genarations
        this.populateMaguduza();
        // maguga
        this.populateMagugaWeekDaySchedule(
          Regulating_Weir,
          Irrigation_Flow,
          Maguga_Downstream_Wear_Limit,
          this.state.utils.methods.magugaSatPriority
        );
      } else {
        // weekday and peak season
        this.populateScheduleWeekDayPeakSeason(Luphohlo_Daily_Level);
        // Edwaleni same as off-peak season
        this.populateEdwaleniWeekDayOffPeakSchedule(GS_2, Ferreira);
        // maguduza genarations
        this.populateMaguduza();
        this.populateMagugaWeekDaySchedule(
          Regulating_Weir,
          Irrigation_Flow,
          Maguga_Downstream_Wear_Limit,
          this.state.utils.methods.magugaWeekDayPriority
        );
      }
    } else {
      if (day === 6 || day === 0) {
        // weekends off-peak season
        // only generate if dam is above 90%
        this.populateScheduleWeekEndOffPeak(day);
        // edwaleni
        this.populateEdwaleniWeekendOffPeakSchedule(GS_2, Ferreira, day);
        // maguduza genarations
        this.populateMaguduza();
        // maguga
        this.populateMagugaWeekDaySchedule(
          Regulating_Weir,
          Irrigation_Flow,
          Maguga_Downstream_Wear_Limit,
          this.state.utils.methods.magugaSatPriority
        );
      } else {
        // weekday and off-peak season
        // Ezulwini
        this.populateScheduleWeekDayEzulwinOffPeakSeason(GS_2, Ferreira);
        // Edwaleni
        this.populateEdwaleniWeekDayOffPeakSchedule(GS_2, Ferreira);
        // maguduza genarations
        this.populateMaguduza();
        // Maguga
        this.populateMagugaWeekDaySchedule(
          Regulating_Weir,
          Irrigation_Flow,
          Maguga_Downstream_Wear_Limit,
          this.state.utils.methods.magugaWeekDayPriority
        );
      }
    }

    this.calcSum();
  };
  /**
   * edwaleni & maguduza weekday
   * @param {*} GS_2
   * @param {*} Ferreira
   */
  populateEdwaleniWeekDayOffPeakSchedule = async (GS_2, Ferreira) => {
    /**
     * 1. Calculate water available for the whole day
     * 2. Calculate Water needed for edwaleni peak period full load
     * 3. If water is left, priotirize standard before peak
     * 4. If water is left, run the entire standard: try 3 - 5 MW
     * 5. If less water try 1.5MW and add each until all are added
     * 6. Move to off peak
     */

    let generatedSchedule = this.state.currentSchedule;
    // 1.
    let availableWater = Math.round(this.calcTotalDailyFlow(GS_2 + Ferreira));
    console.log(`\n edwaleni and maguduza ===========start======`);
    console.log("availableWater", availableWater);
    // 2.
    const peakFullLoadWater = Math.round(this.calcEdwaleniLoadWater(5, 9.6, 5));
    console.log("peakFullLoadWater", peakFullLoadWater);
    console.log("avaialble water before peak full load", availableWater);
    console.log("----end of peak---");
    availableWater = availableWater - peakFullLoadWater;
    console.log("after peak full load", availableWater);

    if (availableWater >= 0) {
      generatedSchedule = this.state.utils.methods.periodGen(
        this.state.currentSchedule,
        "Peak",
        "14.6",
        "EDWALENI"
      );
    }
    // 3.
    const standardBeforePeakWater = Math.round(
      this.calcEdwaleniLoadWater(2, 9.6, 5)
    );
    availableWater = availableWater - standardBeforePeakWater;
    console.log(
      "water needed for standardBeforePeak 2 hours",
      standardBeforePeakWater
    );
    console.log(
      "water left after standardBeforePeak 2 hours: ",
      availableWater
    );

    if (availableWater >= 0) {
      generatedSchedule = this.state.utils.methods.hourlyGen(
        this.state.currentSchedule,
        ["6:00  -  7:00", "17:00  -  18:00"],
        "14.6",
        "EDWALENI"
      );
    }
    let result = this.distributeEdwaleniPower(
      generatedSchedule,
      availableWater,
      [
        "10:00  -  11:00",
        "11:00  -  12:00",
        "12:00  -  13:00",
        "13:00  -  14:00",
        "14:00  -  15:00",
        "15:00  -  16:00",
        "16:00  -  17:00",
      ],
      "Standard"
    );

    generatedSchedule = result.generatedSchedule;
    availableWater = result.availableWater;

    result = this.distributeEdwaleniPower(
      generatedSchedule,
      availableWater,
      [
        "20:00  -  21:00",
        "21:00 -  22:00",
        "22:00  - 23:00",
        "23:00  -  00:00",
        "0:00  -  1:00",
        "1:00  -  2:00",
        "2:00  -  3:00",
        "3:00  -  4:00",
        "4:00  -  5:00",
        "5:00  -  6:00",
      ],
      "Off-Peak"
    );
    generatedSchedule = result.generatedSchedule;
    availableWater = result.availableWater;

    console.log("availableWater", availableWater);
    console.log(` edwaleni and maguduza ===========end======`);

    // calculate sum per hour periods
    generatedSchedule = this.state.utils.methods.calcWeekDaySum(
      generatedSchedule
    );
    await this.setState({ currentSchedule: generatedSchedule });
  };
  /**
   * edwaleni & maguduza weekends
   * @param {*} GS_2
   * @param {*} Ferreira
   */
  populateEdwaleniWeekendOffPeakSchedule = async (GS_2, Ferreira, day) => {
    if (day === 6) {
      this.populateEdwaleniSatPeakSchedule(GS_2, Ferreira);
    } else {
      this.populateEdwaleniSunPeakSchedule(GS_2, Ferreira);
    }
  };
  populateEdwaleniSatPeakSchedule = async (GS_2, Ferreira) => {
    /**
     * 1. Calculate water available for the whole day
     * 2. Calculate Water needed for edwaleni standard period full load
     * 3. If water is left, priotirize offpeaek before standard
     * 4. If water is left, run the entire standard: try 3 - 5 MW
     * 5. If less water try 1.5MW and add each until all are added
     * 6. Move to off peak
     */

    let generatedSchedule = this.state.currentSchedule;
    // 1.
    let availableWater = Math.round(this.calcTotalDailyFlow(GS_2 + Ferreira));
    console.log(`\n edwaleni and maguduza ===========start======`);
    console.log("availableWater", availableWater);
    // 2.
    const standardFullLoadWater = Math.round(
      this.calcEdwaleniLoadWater(7, 9.6, 5)
    );
    console.log("standardFullLoadWater", standardFullLoadWater);
    console.log("avaialble water before standard full load", availableWater);
    console.log("----end of standard---");
    availableWater = availableWater - standardFullLoadWater;
    console.log("after standard full load", availableWater);

    if (availableWater >= 0) {
      generatedSchedule = this.state.utils.methods.periodGen(
        this.state.currentSchedule,
        "Standard",
        "14.6",
        "EDWALENI"
      );
      generatedSchedule = this.state.utils.methods.periodGen(
        this.state.currentSchedule,
        "Standard",
        "5.6",
        "MAGUDUZA"
      );
    }
    // 3.
    const offPeakBeforeStandardWater = Math.round(
      this.calcEdwaleniLoadWater(2, 9.6, 5)
    );
    availableWater = availableWater - offPeakBeforeStandardWater;
    console.log(
      "water needed for standardBeforePeak 2 hours",
      offPeakBeforeStandardWater
    );
    console.log(
      "water left after standardBeforePeak 2 hours: ",
      availableWater
    );

    if (availableWater >= 0) {
      generatedSchedule = this.state.utils.methods.hourlyGen(
        this.state.currentSchedule,
        ["6:00  -  7:00", "17:00  -  18:00"],
        "14.6",
        "EDWALENI"
      );
      generatedSchedule = this.state.utils.methods.hourlyGen(
        this.state.currentSchedule,
        ["6:00  -  7:00", "17:00  -  18:00"],
        "5.6",
        "MAGUDUZA"
      );
    }
    let result = this.distributeEdwaleniPower(
      generatedSchedule,
      availableWater,
      [
        "12:00  -  13:00",
        "13:00  -  14:00",
        "14:00  -  15:00",
        "15:00  -  16:00",
        "16:00  -  17:00",
        "20:00  -  21:00",
        "21:00 -  22:00",
        "22:00  - 23:00",
        "23:00  -  00:00",
        "0:00  -  1:00",
        "1:00  -  2:00",
        "2:00  -  3:00",
        "3:00  -  4:00",
        "4:00  -  5:00",
        "5:00  -  6:00",
      ],
      "Off-Peak"
    );

    generatedSchedule = result.generatedSchedule;
    availableWater = result.availableWater;
    console.log("availableWater", availableWater);
    console.log(` edwaleni ===========end======`);

    // calculate sum per hour periods
    generatedSchedule = this.state.utils.methods.calcWeekDaySum(
      generatedSchedule
    );
    await this.setState({ currentSchedule: generatedSchedule });
  };
  populateEdwaleniSunPeakSchedule = async (GS_2, Ferreira) => {
    /**
     * 1. Calculate water available for the whole day
     * 2. Calculate Water needed for edwaleni standard period full load
     * 3. If water is left, priotirize offpeaek before standard
     * 4. If water is left, run the entire standard: try 3 - 5 MW
     * 5. If less water try 1.5MW and add each until all are added
     * 6. Move to off peak
     */

    let generatedSchedule = this.state.currentSchedule;
    // 1.
    let availableWater = Math.round(this.calcTotalDailyFlow(GS_2 + Ferreira));
    console.log(`\n edwaleni ===========start======`);
    console.log("availableWater", availableWater);
    // 2.
    const standardFullLoadWater = Math.round(
      this.calcEdwaleniLoadWater(7, 9.6, 5)
    );
    console.log(
      "water needed for standardFullLoadWater (using sat. standard)",
      standardFullLoadWater
    );
    console.log("avaialble water before standard full load", availableWater);
    console.log("----end of standard---");
    availableWater = availableWater - standardFullLoadWater;
    console.log("after standard full load", availableWater);

    if (availableWater >= 0) {
      generatedSchedule = this.state.utils.methods.hourlyGen(
        this.state.currentSchedule,
        [
          "7:00  -  8:00",
          "8:00  -  9:00",
          "9:00  -  10:00",
          "10:00  -  11:00",
          "11:00  -  12:00",
          "18:00  -  19:00",
          "19:00  -  20:00",
        ],
        "14.6",
        "EDWALENI"
      );
    }
    // 3.
    const offPeakBeforeStandardWater = Math.round(
      this.calcEdwaleniLoadWater(2, 9.6, 5)
    );
    availableWater = availableWater - offPeakBeforeStandardWater;
    console.log(
      "water needed for standardBeforePeak 2 hours",
      offPeakBeforeStandardWater
    );
    console.log(
      "water left after standardBeforePeak 2 hours: ",
      availableWater
    );

    if (availableWater >= 0) {
      generatedSchedule = this.state.utils.methods.hourlyGen(
        this.state.currentSchedule,
        ["6:00  -  7:00", "17:00  -  18:00"],
        "14.6",
        "EDWALENI"
      );
    }
    let result = this.distributeEdwaleniPower(
      generatedSchedule,
      availableWater,
      [
        "12:00  -  13:00",
        "13:00  -  14:00",
        "14:00  -  15:00",
        "15:00  -  16:00",
        "16:00  -  17:00",
        "20:00  -  21:00",
        "21:00 -  22:00",
        "22:00  - 23:00",
        "23:00  -  00:00",
        "0:00  -  1:00",
        "1:00  -  2:00",
        "2:00  -  3:00",
        "3:00  -  4:00",
        "4:00  -  5:00",
        "5:00  -  6:00",
      ],
      "Off-Peak"
    );

    generatedSchedule = result.generatedSchedule;
    availableWater = result.availableWater;
    console.log("availableWater", availableWater);
    console.log(` edwaleni ===========end======`);

    // calculate sum per hour periods
    generatedSchedule = this.state.utils.methods.calcWeekDaySum(
      generatedSchedule
    );
    await this.setState({ currentSchedule: generatedSchedule });
  };
  populateScheduleWeekEndOffPeak = async (day) => {
    let waterConsumed = 0;
    let generatedSchedule = this.state.utils.methods.ezulwiniShutDown(
      this.state.currentSchedule
    );
    const {
      SAT_STANDARD,
      SAT_STANDARDHALFLOAD,
      SAT_OFFPEAKHALFLOAD,
      SAT_OFFPEAKFULLLOAD,
      SUN_OFFPEAKHALFLOAD,
      SUN_OFFPEAKFULLLOAD,
      TOTAL_WATER_NEEDED_FOR_STND_SAT_FULL_LOAD,
      TOTAL_WATER_NEEDED_FOR_OFF_PEAK_SAT_FULL_LOAD,
      TOTAL_WATER_NEEDED_FOR_STND_SAT_HALF_LOAD,
      TOTAL_WATER_NEEDED_FOR_OFF_PEAK_SAT_HALF_LOAD,
      TOTAL_WATER_NEEDED_FOR_OFF_PEAK_SUN_FULL_LOAD,
      TOTAL_WATER_NEEDED_FOR_OFF_PEAK_SUN_HALF_LOAD,
      DAILY_LUPHOHLO_INFLOW,
      INITIAL_LUPHOHLO_DAM_VOLUME,
    } = this.state.ezulwini;
    if (day === 6) {
      // saturday
      if (
        (SAT_STANDARDHALFLOAD === 0 || SAT_STANDARDHALFLOAD > 0) &&
        SAT_STANDARD < 0
      ) {
        generatedSchedule = this.state.utils.methods.ezulwiniStandardHalfLoad(
          generatedSchedule
        );
        waterConsumed =
          waterConsumed + TOTAL_WATER_NEEDED_FOR_STND_SAT_HALF_LOAD;
      }
      if (SAT_STANDARD === 0 || SAT_STANDARD > 0) {
        generatedSchedule = this.state.utils.methods.ezulwiniStandardFullLoad(
          generatedSchedule
        );
        waterConsumed =
          waterConsumed + TOTAL_WATER_NEEDED_FOR_STND_SAT_FULL_LOAD;
      }
      if (
        (SAT_OFFPEAKHALFLOAD === 0 || SAT_OFFPEAKHALFLOAD > 0) &&
        SAT_OFFPEAKFULLLOAD < 0
      ) {
        generatedSchedule = this.state.utils.methods.ezulwiniOffPeakHalfLoad(
          generatedSchedule
        );
        waterConsumed =
          waterConsumed + TOTAL_WATER_NEEDED_FOR_OFF_PEAK_SAT_HALF_LOAD;
      }
      if (SAT_OFFPEAKFULLLOAD === 0 || SAT_OFFPEAKFULLLOAD > 0) {
        generatedSchedule = this.state.utils.methods.ezulwiniOffPeakFullLoad(
          generatedSchedule
        );
        waterConsumed =
          waterConsumed + TOTAL_WATER_NEEDED_FOR_OFF_PEAK_SAT_FULL_LOAD;
      }
    } else {
      // sunday
      if (
        (SUN_OFFPEAKHALFLOAD === 0 || SUN_OFFPEAKHALFLOAD > 0) &&
        SUN_OFFPEAKFULLLOAD < 0
      ) {
        generatedSchedule = this.state.utils.methods.ezulwiniOffPeakHalfLoad(
          generatedSchedule
        );
        waterConsumed =
          waterConsumed + TOTAL_WATER_NEEDED_FOR_OFF_PEAK_SUN_HALF_LOAD;
      }
      if (SUN_OFFPEAKFULLLOAD === 0 || SUN_OFFPEAKFULLLOAD > 0) {
        generatedSchedule = this.state.utils.methods.ezulwiniOffPeakFullLoad(
          generatedSchedule
        );
        waterConsumed =
          waterConsumed + TOTAL_WATER_NEEDED_FOR_OFF_PEAK_SUN_FULL_LOAD;
      }
    }

    let finalDamVolume =
      DAILY_LUPHOHLO_INFLOW + INITIAL_LUPHOHLO_DAM_VOLUME - waterConsumed;
    finalDamVolume = this.volumeToPerc(finalDamVolume);

    waterConsumed = (waterConsumed / 1000000).toFixed(2);
    this.updateSummary("Water Used (mil. m³)", waterConsumed);
    this.updateSummary("Final Dam Level(%)", finalDamVolume);
    this.interpolate("luphohlo-volume-interpolate", {
      volume: finalDamVolume,
    }).then((res) => {
      console.log(res);
    });
    await this.setState({ currentSchedule: generatedSchedule });
  };
  populateScheduleWeekDayEzulwinOffPeakSeason = async (GS_2, Ferreira) => {
    const {
      PEAK,
      STANDARD,
      STANDARDHALFLOAD,
      OFFPEAKHALFLOAD,
      OFFPEAKFULLLOAD,
      TOTAL_WATER_NEEDED_FOR_PEAK_FULL_LOAD,
      TOTAL_WATER_NEEDED_FOR_STND_FULL_LOAD,
      TOTAL_WATER_NEEDED_FOR_STND_HALF_LOAD,
      TOTAL_WATER_NEEDED_FOR_OFF_PEAK_FULL_LOAD,
      TOTAL_WATER_NEEDED_FOR_OFF_PEAK_HALF_LOAD,
      DAILY_LUPHOHLO_INFLOW,
      INITIAL_LUPHOHLO_DAM_VOLUME,
    } = this.state.ezulwini;
    let generatedSchedule = this.state.utils.methods.allShutDown(
      this.state.currentSchedule
    );
    let waterConsumed = 0;

    if (PEAK === 0 || PEAK > 0) {
      generatedSchedule = this.state.utils.methods.ezulwiniPeakFullLoad(
        generatedSchedule
      );
      waterConsumed = waterConsumed + TOTAL_WATER_NEEDED_FOR_PEAK_FULL_LOAD;
    }
    if (PEAK > 0 && STANDARDHALFLOAD > 0 && STANDARD < 0) {
      generatedSchedule = this.state.utils.methods.ezulwiniStandardHalfLoad(
        generatedSchedule
      );
      waterConsumed = waterConsumed + TOTAL_WATER_NEEDED_FOR_STND_HALF_LOAD;
    }
    if (PEAK > 0 && STANDARD > 0) {
      generatedSchedule = this.state.utils.methods.ezulwiniStandardFullLoad(
        generatedSchedule
      );
      waterConsumed = waterConsumed + TOTAL_WATER_NEEDED_FOR_STND_FULL_LOAD;
    }
    if (OFFPEAKHALFLOAD > 0 && PEAK > 0 && OFFPEAKFULLLOAD < 0) {
      generatedSchedule = this.state.utils.methods.ezulwiniOffPeakHalfLoad(
        generatedSchedule
      );
      waterConsumed = waterConsumed + TOTAL_WATER_NEEDED_FOR_OFF_PEAK_HALF_LOAD;
    }
    if (OFFPEAKFULLLOAD > 0 && PEAK > 0) {
      generatedSchedule = this.state.utils.methods.ezulwiniOffPeakFullLoad(
        generatedSchedule
      );
      waterConsumed = waterConsumed + TOTAL_WATER_NEEDED_FOR_OFF_PEAK_FULL_LOAD;
    }

    let finalDamVolume =
      DAILY_LUPHOHLO_INFLOW + INITIAL_LUPHOHLO_DAM_VOLUME - waterConsumed;
    this.interpolate("luphohlo-volume-interpolate", {
      volume: finalDamVolume,
    }).then((res) => {
      this.updateSummary("Final Dam Level(m.a.s.l)", res.data.level);
    });
    finalDamVolume = this.volumeToPerc(finalDamVolume);
    waterConsumed = (waterConsumed / 1000000).toFixed(2);
    this.updateSummary("Water Used (mil. m³)", waterConsumed);
    this.updateSummary("Final Dam Level(%)", finalDamVolume);

    await this.setState({ currentSchedule: generatedSchedule });
  };

  /**
   * @description calculate water needed for edwaleni peak full load
   */
  calcEdwFullLoadWater = (hours) => {
    let edwaleniPSGenerators = this.state.edwaleniPS.Genarators;
    let peakkFullLoadWater =
      hours *
      60 *
      60 *
      (2.5 * 4 * parseFloat(edwaleniPSGenerators[0].Rated_Flow) +
        5 * parseFloat(edwaleniPSGenerators[1].Rated_Flow));
    return parseFloat(peakkFullLoadWater); //  85500
  };
  populateScheduleWeekDayPeakSeason = async (Luphohlo_Daily_Level) => {
    let generatedSchedule = this.state.utils.methods.ezulwiniShutDown(
      this.state.currentSchedule
    );
    // ezulwini
    if (parseInt(Luphohlo_Daily_Level) > 1002) {
      generatedSchedule = this.state.utils.methods.ezulwiniPeakFullLoad(
        generatedSchedule
      );
      let waterConsumed = (this.state.ezulwini.PEAK / 1000000).toFixed(2);
      this.updateSummary("Water Used (mil. m³)", waterConsumed);
    }

    // edwaleni
    generatedSchedule = this.state.utils.methods.edwaleniPeakFullLoad(
      generatedSchedule
    );
    generatedSchedule = this.state.utils.methods.maguduzaPeakFullLoad(
      generatedSchedule
    );
    await this.setState({ currentSchedule: generatedSchedule });
  };
  /**
   *
   * @param {*} Regulating_Weir maguga regulating weir
   * @param {*} Irrigation_Flow maguga irrigation flow
   */
  populateMagugaWeekDaySchedule = async (
    Regulating_Weir,
    Irrigation_Flow,
    Maguga_Downstream_Wear_Limit,
    hoursPriority
  ) => {
    /**
     * 1. get available water
     *  ***Final water  -  (current weir water - water needed for irrigation)
     * 2. get number of hours required to replace water
     * 3. Distribute the number of hours obtained by giving priority to peak periods.
     */
    const currentVolume = this.state.utils.methods.magugaWeirLevelToVol(
      Regulating_Weir
    );
    const finalVolume = this.state.utils.methods.magugaWeirLevelToVol(
      Maguga_Downstream_Wear_Limit
    );

    const irrigationVolume = this.calcTotalDailyFlow(Irrigation_Flow);
    const waterConsumedEachSet = this.calcWaterConsumedByMagugaSetsFullLoad();
    //  inflows = limit - current + outflows
    const availableWater = finalVolume - currentVolume + irrigationVolume;
    console.log(`\n Maguga ===========start======`);
    console.log("current volume", currentVolume);
    console.log("final volume", finalVolume);
    console.log("water needed for irrigation", irrigationVolume);
    console.log("available water", availableWater);
    let generatedSchedule = this.state.currentSchedule;
    // 2.
    let availableHours = parseFloat(availableWater / waterConsumedEachSet);
    availableHours = Math.round(availableHours * 10) / 10; // one decimal point
    console.log("available hours", availableHours);
    // 3.
    if (availableHours > 0) {
      generatedSchedule = this.state.utils.methods.hourlyGenWithLimit(
        generatedSchedule,
        hoursPriority(),
        "20",
        "MAGUGA",
        availableHours
      );
      // calculate sum per hour periods
      generatedSchedule = this.state.utils.methods.calcWeekDaySum(
        generatedSchedule
      );
    }
    await this.setState({ currentSchedule: generatedSchedule });
    console.log(`Maguga ===========end======`);

    // update UI
    this.updateSummary("Available Water(m³)", availableWater);
    this.updateSummary("Available Hours(hrs)", availableHours);
    // limit level
    this.updateSummary("Weir Limit(m.a.s.l)", Maguga_Downstream_Wear_Limit);
    this.interpolate("weir-level-interpolate", {
      level: Maguga_Downstream_Wear_Limit,
    }).then((res) => {
      this.updateSummary("Weir Limit(m³)", res.data.volume);
      this.updateSummary(
        "Weir Limit(%)",
        this.weirVolumeToPerc(res.data.volume)
      );
    });
    // current level
    this.updateSummary("Weir Initial Level(m.a.s.l)", Regulating_Weir);
    this.interpolate("weir-level-interpolate", {
      level: Regulating_Weir,
    }).then((res) => {
      this.updateSummary("Weir Initial Level(m³)", res.data.volume);
      this.updateSummary(
        "Weir Initial Level(%)",
        this.weirVolumeToPerc(res.data.volume)
      );
    });
  };
  weirVolumeToPerc = (volume) => ((volume / 987500) * 100).toFixed(2);
  populateMaguduza = async () => {
    let generatedSchedule = this.state.currentSchedule;
    // maguduza can run at 5.6, 5, 4, 3 levels
    generatedSchedule.forEach((item) => {
      const edwaleniPower = parseFloat(item.EDWALENI);
      if (item.Time && edwaleniPower > 0) {
        item.MAGUDUZA = this.maguduzaHourlyGen(edwaleniPower);
      }
    });
    await this.setState({ currentSchedule: generatedSchedule });
  };
  maguduzaHourlyGen = (edwaleniPower) => {
    let maguduzaPower = 0;
    if (edwaleniPower === 14.6) {
      maguduzaPower = 5.6;
    } else if (edwaleniPower >= 10 && edwaleniPower <= 14.6) {
      maguduzaPower = 5;
    } else if (edwaleniPower >= 8 && edwaleniPower <= 10) {
      maguduzaPower = 4;
    } else if (edwaleniPower >= 5 && edwaleniPower <= 8) {
      maguduzaPower = 3;
    }
    return maguduzaPower;
  };
  calcMagugaHourGen = (maguduzaRatedFlow, maguduzaLevels, availableWater) => {
    let maguduzaHourlyPower = 0;
    for (let power = 0; power < maguduzaLevels.length; power++) {
      let waterNeeded = this.calWaterConsumedByAnyMachine(
        1,
        maguduzaLevels[power],
        maguduzaRatedFlow
      );
      console.log(
        `water needed to run maguduza @ ${maguduzaLevels[power]}: ${waterNeeded}`
      );
      if (availableWater >= waterNeeded) {
        maguduzaHourlyPower = maguduzaLevels[power];
        break;
      }
    }
    console.log(`maguga power ${maguduzaHourlyPower}`);
    return maguduzaHourlyPower;
  };
  edwaleniHourlyOutFlow = (edwaleniPower) => {
    let hourlyWaterAvailabeForMaguduza = 0;
    const ratedFlowSmall = parseFloat(
      this.state.edwaleniPS.Genarators[0].Rated_Flow
    );
    const ratedFlowBig = parseFloat(
      this.state.edwaleniPS.Genarators[1].Rated_Flow
    );
    if (edwaleniPower > 5) {
      hourlyWaterAvailabeForMaguduza = this.calWaterConsumedByAnyMachine(
        1,
        5,
        ratedFlowBig
      );
      // console.log("5mw", hourlyWaterAvailabeForMaguduza);
      hourlyWaterAvailabeForMaguduza += this.calWaterConsumedByAnyMachine(
        1,
        edwaleniPower - 5,
        ratedFlowSmall
      );
      // console.log(`${edwaleniPower - 5}`, hourlyWaterAvailabeForMaguduza);
    }

    if (edwaleniPower <= 5 && edwaleniPower >= 3) {
      hourlyWaterAvailabeForMaguduza = this.calWaterConsumedByAnyMachine(
        1,
        edwaleniPower,
        ratedFlowBig
      );
    }

    if (edwaleniPower < 3) {
      hourlyWaterAvailabeForMaguduza = this.calWaterConsumedByAnyMachine(
        1,
        edwaleniPower,
        ratedFlowSmall
      );
    }
    return hourlyWaterAvailabeForMaguduza;
  };
  /**
   * Calculate the volume of irrigation water that will be discharged from the regulating weir in 24hrs.
   * @param {*} Irrigation_Flow irrigation flow (m3/s)
   */
  calcTotalDailyFlow = (Irrigation_Flow) => {
    return Irrigation_Flow * 24 * 60 * 60;
  };

  calcWaterConsumedByMagugaSetsFullLoad = () => {
    const ratedFlowOne = parseFloat(
      this.state.magugaPS.Genarators[0].Rated_Flow
    );
    const ratedFlowTwo = parseFloat(
      this.state.magugaPS.Genarators[1].Rated_Flow
    );
    const waterConsumed = 60 * 60 * 10 * (ratedFlowOne + ratedFlowTwo);

    return waterConsumed;
  };

  calcEdwaleniLoadWater = (hours, smallSetsPower, bigSetPower) => {
    const ratedFlowSmall = parseFloat(
      this.state.edwaleniPS.Genarators[0].Rated_Flow
    );
    const ratedFlowBig = parseFloat(
      this.state.edwaleniPS.Genarators[1].Rated_Flow
    );
    // 8hrs x 60sec x 60 min x 9.6MW * rated flow
    const waterConsumedByAllSmallSets = this.calWaterConsumedByAnyMachine(
      hours,
      smallSetsPower,
      ratedFlowSmall
    );

    // 8hrs x 60sec x 60 min x 5MW * rated flow
    const waterConsumedByBig = this.calWaterConsumedByAnyMachine(
      hours,
      bigSetPower,
      ratedFlowBig
    );

    return waterConsumedByAllSmallSets + waterConsumedByBig;
  };

  calWaterConsumedByAnyMachine = (hours, power, ratedFlow) => {
    return 3600 * hours * power * ratedFlow;
  };
  calcSum = async () => {
    let generatedSchedule = this.state.currentSchedule;
    generatedSchedule = this.state.utils.methods.calcSum(generatedSchedule);

    // calculate sum per hour periods
    generatedSchedule = this.state.utils.methods.calcWeekDaySum(
      generatedSchedule
    );
    await this.setState({ currentSchedule: generatedSchedule });
  };
  calculateDailyReq = async (
    GS_15,
    MONTHLY_LIMIT,
    INITIAL_LUPHOHLO_DAM_VOLUME
  ) => {
    const DAILY_LUPHOHLO_INFLOW = GS_15 * 24 * 60 * 60;
    const TOTAL_DAILY_AVAILABLE_WATER =
      DAILY_LUPHOHLO_INFLOW + INITIAL_LUPHOHLO_DAM_VOLUME - MONTHLY_LIMIT;
    this.updateSummary(
      "Available Water (mil. m³)",
      (TOTAL_DAILY_AVAILABLE_WATER / 1000000).toFixed(2)
    );

    /* weekdays */
    const TOTAL_WATER_NEEDED_FOR_PEAK_FULL_LOAD = this.calcEzWater(20, 7);
    const TOTAL_WATER_NEEDED_FOR_PEAK_HALF_LOAD = this.calcEzWater(10, 7);
    const TOTAL_WATER_NEEDED_FOR_STND_FULL_LOAD = this.calcEzWater(20, 9); // C28
    const TOTAL_WATER_NEEDED_FOR_STND_HALF_LOAD = this.calcEzWater(10, 9); // E28
    const TOTAL_WATER_NEEDED_FOR_OFF_PEAK_FULL_LOAD = this.calcEzWater(20, 8); // E33
    const TOTAL_WATER_NEEDED_FOR_OFF_PEAK_HALF_LOAD = this.calcEzWater(10, 8); // E31

    const PEAK =
      TOTAL_DAILY_AVAILABLE_WATER - TOTAL_WATER_NEEDED_FOR_PEAK_FULL_LOAD; // C27
    const PEAKHALFLOAD =
      TOTAL_DAILY_AVAILABLE_WATER - TOTAL_WATER_NEEDED_FOR_PEAK_HALF_LOAD;
    const STANDARD = PEAK - TOTAL_WATER_NEEDED_FOR_STND_FULL_LOAD; // C29 = C27 - C28
    const STANDARDHALFLOAD = PEAK - TOTAL_WATER_NEEDED_FOR_STND_HALF_LOAD; // E29 = C27 - E28
    const OFFPEAKHALFLOAD =
      STANDARD - TOTAL_WATER_NEEDED_FOR_OFF_PEAK_HALF_LOAD; // E32 = C29 - E31
    const OFFPEAKFULLLOAD =
      STANDARD - TOTAL_WATER_NEEDED_FOR_OFF_PEAK_FULL_LOAD; // E34 = C29 - E33

    /* saturday */
    const TOTAL_WATER_NEEDED_FOR_STND_SAT_FULL_LOAD = this.calcEzWater(20, 7);
    const TOTAL_WATER_NEEDED_FOR_STND_SAT_HALF_LOAD = this.calcEzWater(10, 7);
    const TOTAL_WATER_NEEDED_FOR_OFF_PEAK_SAT_FULL_LOAD = this.calcEzWater(
      20,
      17
    );
    const TOTAL_WATER_NEEDED_FOR_OFF_PEAK_SAT_HALF_LOAD = this.calcEzWater(
      10,
      17
    );

    const SAT_STANDARD =
      TOTAL_DAILY_AVAILABLE_WATER - TOTAL_WATER_NEEDED_FOR_STND_SAT_FULL_LOAD;
    const SAT_STANDARDHALFLOAD =
      TOTAL_DAILY_AVAILABLE_WATER - TOTAL_WATER_NEEDED_FOR_STND_SAT_HALF_LOAD;
    const SAT_OFFPEAKHALFLOAD =
      SAT_STANDARD - TOTAL_WATER_NEEDED_FOR_OFF_PEAK_SAT_HALF_LOAD;
    const SAT_OFFPEAKFULLLOAD =
      SAT_STANDARD - TOTAL_WATER_NEEDED_FOR_OFF_PEAK_SAT_FULL_LOAD;

    /* sunday */
    const TOTAL_WATER_NEEDED_FOR_OFF_PEAK_SUN_FULL_LOAD = this.calcEzWater(
      20,
      24
    );
    const TOTAL_WATER_NEEDED_FOR_OFF_PEAK_SUN_HALF_LOAD = this.calcEzWater(
      10,
      24
    );

    const SUN_OFFPEAKHALFLOAD =
      TOTAL_DAILY_AVAILABLE_WATER -
      TOTAL_WATER_NEEDED_FOR_OFF_PEAK_SUN_FULL_LOAD;
    const SUN_OFFPEAKFULLLOAD =
      TOTAL_DAILY_AVAILABLE_WATER -
      TOTAL_WATER_NEEDED_FOR_OFF_PEAK_SUN_HALF_LOAD;

    const ezulwini = {
      PEAK,
      PEAKHALFLOAD,
      STANDARD,
      STANDARDHALFLOAD,
      OFFPEAKHALFLOAD,
      OFFPEAKFULLLOAD,
      SAT_STANDARD,
      SAT_STANDARDHALFLOAD,
      SAT_OFFPEAKHALFLOAD,
      SAT_OFFPEAKFULLLOAD,
      SUN_OFFPEAKHALFLOAD,
      SUN_OFFPEAKFULLLOAD,
      TOTAL_WATER_NEEDED_FOR_STND_SAT_FULL_LOAD,
      TOTAL_WATER_NEEDED_FOR_OFF_PEAK_SAT_FULL_LOAD,
      TOTAL_WATER_NEEDED_FOR_STND_SAT_HALF_LOAD,
      TOTAL_WATER_NEEDED_FOR_OFF_PEAK_SAT_HALF_LOAD,
      TOTAL_WATER_NEEDED_FOR_OFF_PEAK_SUN_FULL_LOAD,
      TOTAL_WATER_NEEDED_FOR_OFF_PEAK_SUN_HALF_LOAD,
      TOTAL_WATER_NEEDED_FOR_PEAK_FULL_LOAD,
      TOTAL_WATER_NEEDED_FOR_PEAK_HALF_LOAD,
      TOTAL_WATER_NEEDED_FOR_STND_FULL_LOAD,
      TOTAL_WATER_NEEDED_FOR_STND_HALF_LOAD,
      TOTAL_WATER_NEEDED_FOR_OFF_PEAK_FULL_LOAD,
      TOTAL_WATER_NEEDED_FOR_OFF_PEAK_HALF_LOAD,
      DAILY_LUPHOHLO_INFLOW,
      INITIAL_LUPHOHLO_DAM_VOLUME,
    };
    await this.setState({ ezulwini });
  };
  distributeEdwaleniPower = (
    generatedSchedule,
    availableWater,
    hours,
    periodName
  ) => {
    let cummulatedPower = 0;

    for (let power = 5; power > 2; power--) {
      let bigSetWater = Math.round(
        this.calcEdwaleniLoadWater(hours.length, 0, power)
      );
      console.log(
        `water needed to run at ${power} MW for the rest of ${periodName}:${bigSetWater}`
      );
      console.log(`available water : ${availableWater}`);
      if (availableWater - bigSetWater >= 0) {
        cummulatedPower = power;
        availableWater = availableWater - bigSetWater;
        console.log(`available water after ${power} : ${availableWater}`);
        break;
      }
    }

    // 5.

    let SmallSetWater = Math.round(
      this.calcEdwaleniLoadWater(hours.length, 0, 2.4)
    );
    console.log("water needed by smallset", SmallSetWater);
    let smallSetsPowerSum = 0;
    for (let index = 1; index < 5; index++) {
      if (availableWater < SmallSetWater) {
        break;
      }
      smallSetsPowerSum = 2.4 * index;
      availableWater = availableWater - SmallSetWater;
      console.log(
        `available water after (${index}) 2.4 Mw set : ${availableWater}`
      );
    }
    cummulatedPower = cummulatedPower + smallSetsPowerSum;

    // standard generation
    generatedSchedule = this.state.utils.methods.hourlyGen(
      this.state.currentSchedule,
      hours,
      cummulatedPower,
      "EDWALENI"
    );
    console.log(`----end of ${periodName}---`);

    return { generatedSchedule, availableWater };
  };
  calcEzWater = (watts, hours) =>
    watts *
    hours *
    parseFloat(this.state.ezulwiniPS.Genarators[0].Rated_Flow) *
    60 *
    60;

  /**
   * @description update summary
   * */
  updateSummary = async (text, value) => {
    const elementsIndex = this.state.summary.findIndex(
      (element) => element.text === text
    );
    let newSummary = [...this.state.summary];
    newSummary[elementsIndex] = { ...newSummary[elementsIndex], value: value };
    await this.setState({
      summary: newSummary,
    });
  };

  /**
   * @description post new inflows
   * */
  postInflow = (inflow) => {
    axios
      .post(`${process.env.REACT_APP_API}/inflows`, inflow, this.state.config)
      .then((res) => {
        this.alert(
          "Inflows Added",
          `Date: ${res.data.Day_of_Input.split("T")[0]}`
        );
        this.getAllInflows();
      })
      .catch((res) => console.log(res));
  };
  /**
   * @description edit rate flow
   * */
  editRatedFlow = (powerStation) => {
    axios
      .patch(
        `${process.env.REACT_APP_API}/power-stations/${powerStation.Name}`,
        powerStation,
        this.state.config
      )
      .then((res) => {
        this.alert("Rated Flow Updated", res.data.Name);
        this.getAllPowerStations();
      })
      .catch((res) => console.log(res));
  };

  /**
   * @description edit config
   * */
  editConfig = (settings) => {
    axios
      .patch(
        `${process.env.REACT_APP_API}/settings/edit`,
        settings,
        this.state.config
      )
      .then((res) => {
        this.alert("Settings Updated");
        this.getSettings();
        this.getAllModels();
      })
      .catch((res) => console.log(res));
  };

  alert = (title, text = "", icon = "success") => {
    swal({
      title,
      text,
      icon,
      button: "Okay",
    }).then(() => {
      // this.getAllInflows();
      // this.getAllPowerStations();
      // this.getAllModels();
    });
  };
  /**
   * @description handle when user selects model in drop down
   * @param {*} modelName
   */
  /********Drainage model*****/
  handleDrainageModelChange = (modelName) => {
    this.setState({ reviewModels: [modelName] });
    let selectedModel = this.state.models.filter(
      (model) => model.Model_Name === modelName
    );
    this.setState({ currentModel: selectedModel });
    let model = [];
    selectedModel[0].Max.forEach((item, index) => {
      let day = item.x.split(",")[2];
      let date = new Date(item.x);
      if (day === "15") {
        let volume = this.state.utils.methods.levelToVol(
          parseInt(selectedModel[0].Opt[index].y)
        );
        let perc = this.state.utils.methods.volToPerc(volume);
        let singleMonth = {
          max: item.y,
          min: selectedModel[0].Min[index].y,
          opt: selectedModel[0].Opt[index].y,
          month: this.state.months[date.getMonth()],
          day: item.x,
          perc,
        };
        model.push(singleMonth);
      }
    });
    this.setState({ selectedModel: model });
  };
  /**
   * @description update model
   * @param {*} edit
   * @param {*} current
   * @param {*} name
   */
  updateModel = (edit, current, name) => {
    let currentModel = current;
    let y_min_points = [];
    let y_opt_points = [];
    let y_max_points = [];
    edit.forEach((item) => {
      y_min_points.push(parseFloat(item.min));
      y_opt_points.push(parseFloat(item.opt));
      y_max_points.push(parseFloat(item.max));
    });
    let postData = { y_min_points, y_opt_points, y_max_points };

    axios
      .post(`${process.env.REACT_APP_FLASK_API}/interpolate`, postData)
      .then((res) => {
        this.handleUpdateModel(res.data, currentModel, edit, name);
      });
  };
  handleUpdateModel = (interpolatedModel, currentModel, edit, name) => {
    const { max, min, opt } = interpolatedModel;
    max.forEach((item, index) => {
      currentModel[0].Max[index].y = item;
      currentModel[0].Min[index].y = min[index];
      currentModel[0].Opt[index].y = opt[index];
    });
    currentModel[0].Model_Name = edit.Model_Name;
    delete currentModel[0].__v;
    this.updateModelApi(currentModel, name);
  };

  updateModelApi = (model, name) => {
    axios
      .patch(
        `${process.env.REACT_APP_API}/models/${name}`,
        model[0],
        this.state.config
      )
      .then((res) => {
        this.alert("Model Updated", `Model Name: ${res.data.Model_Name}`);
        this.getAllModels();
      })
      .catch((error) => console.log(error));
  };

  /*adding a new  model */
  newModel = (newModel, modelName) => {
    let y_min_points = [];
    let y_opt_points = [];
    let y_max_points = [];
    newModel.forEach((item) => {
      y_min_points.push(parseFloat(item.min));
      y_opt_points.push(parseFloat(item.opt));
      y_max_points.push(parseFloat(item.max));
    });
    let postData = { y_min_points, y_opt_points, y_max_points };

    axios
      .post(`${process.env.REACT_APP_FLASK_API}/interpolate`, postData)
      .then((res) => {
        this.handleNewModel(res.data, modelName);
      });
  };

  handleNewModel = (interpolatedModel, modelName) => {
    let newModel = this.state.models[0];
    const { max, min, opt } = interpolatedModel;
    max.forEach((item, index) => {
      newModel.Max[index].y = item;
      newModel.Min[index].y = min[index];
      newModel.Opt[index].y = opt[index];
      delete newModel.Max[index]._id;
      delete newModel.Min[index]._id;
      delete newModel.Opt[index]._id;
    });
    newModel.Model_Name = modelName;
    delete newModel._id;
    delete newModel.createdAt;
    delete newModel.updatedAt;
    delete newModel.__v;
    this.newModelApi(newModel);
  };
  newModelApi = (model) => {
    axios
      .post(`${process.env.REACT_APP_API}/models`, model, this.state.config)
      .then((res) => {
        this.alert("New Model Created", `Model Name: ${res.data.Model_Name}`);
        this.getAllModels();
      })
      .catch((res) => {
        this.alert("New Model Creation", "Model Name Already Exits", "error");
      });
  };
  signIn = (loginInfo) => {
    axios
      .post(`${process.env.REACT_APP_API}/users/login`, loginInfo)
      .then((res) => {
        Cookies.set("token", res.data.token);
        Cookies.set("loggedIn", true);
        this.setState({ user: res.data.user });
      })
      .then(() => {
        this.init();
      })
      .catch((res) => {
        this.alert("Sign In Error", "Incorrect Credentials", "error");
      });
  };
  signUp = (loginInfo) => {
    axios
      .post(`${process.env.REACT_APP_API}/users`, loginInfo)
      .then((res) => {
        Cookies.set("token", res.data.token);
        Cookies.set("loggedIn", true);
        this.setState({ user: res.data.user });
      })
      .then(() => {
        this.init();
      })
      .catch((res) => {
        this.alert("Sign Up Error", "Unauthorized Email", "error");
      });
  };

  /*delete a model */
  deleteModel = (modelName) => {
    axios
      .delete(
        `${process.env.REACT_APP_API}/models/${modelName}`,
        this.state.config
      )
      .then(this.handleDrainageModelChange(this.state.modelNames[0]))
      .catch((res) => console.log(res));
  };
  keepLoggedIn = () => {
    this.setState({ isAuthenticated: true });
  };
  logOut = async () => {
    const token = Cookies.get("token");
    if (!token) {
      await this.setState({ isAuthenticated: false });
    }
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .post(`${process.env.REACT_APP_API}/users/logout`, {}, config)
      .then((res) => {
        Cookies.remove("token");
        Cookies.set("loggedIn", false);
        this.setState({ isAuthenticated: false });
      })
      .catch((res) => console.log(res));
  };
  /**
   * @description export shedules to excel files
   * @param date export date
   */

  exportSchedules = (date) => {
    // console.log(this.formatDate(date));
    // axios
    //   .get(
    //     `${process.env.REACT_APP_API}/download-schedules/${this.formatDate(
    //       date
    //     )}`,
    //     this.state.config
    //   )
    //   .then((res) => {
    //     console.log(res);
    //     // download(res.data, "test.xlsx");
    //   });
    axios({
      url: `${process.env.REACT_APP_API}/download-schedules/${this.formatDate(
        date
      )}`,
      data: {
        date,
      },
      headers: this.state.config.headers,
      method: "POST",
      responseType: "blob", // Important
    }).then((response) => {
      FileDownload(response.data, "report.xlsx");
    });
  };
  render() {
    return (
      <InflowsContext.Provider
        value={{
          ...this.state,
          getData: this.populateModel,
          getDefaultModel: this.getDefaultModel,
          changeForecastYear: this.changeForecastYear,
          handleReviewYear: this.handleReviewYear,
          populateDataPoints: this.populateDataPoints,
          handleGS15ReviewYear: this.handleGS15ReviewYear,
          changeGS15ForecastYear: this.changeGS15ForecastYear,
          populateGS15DataPoints: this.populateGS15DataPoints,
          handleForecastDateChange: this.handleForecastDateChange,
          generateSchedule: this.generateSchedule,
          handleReviewModel: this.handleReviewModel,
          handleDrainageModelChange: this.handleDrainageModelChange,
          updateModel: this.updateModel,
          signIn: this.signIn,
          newModel: this.newModel,
          deleteModel: this.deleteModel,
          getAllModels: this.getAllModels,
          keepLoggedIn: this.keepLoggedIn,
          editConfig: this.editConfig,
          logOut: this.logOut,
          getInflow: this.getInflow,
          signUp: this.signUp,
          formatDate: this.formatDate,
          editModel: this.editModel,
          exportSchedules: this.exportSchedules,
          getCurrentSchedule: this.getCurrentSchedule,
          editRatedFlow: this.editRatedFlow,
        }}
      >
        {this.props.children}
      </InflowsContext.Provider>
    );
  }
}

const InflowsConsumer = InflowsContext.Consumer;

export { InflowsProvider, InflowsConsumer, InflowsContext };
