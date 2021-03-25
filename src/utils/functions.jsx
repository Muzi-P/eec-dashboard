const methods = {
  levelToVol: (level) => {
    let result;
    if (level < 983) {
      result = 10;
    } else if (level >= 983 && level <= 984) {
      result = 200000;
    } else if (level >= 984 && level <= 984.4) {
      result = 300000;
    } else if (level >= 984.5 && level <= 985) {
      result = 400000;
    } else if (level >= 985.1 && level <= 985.4) {
      result = 450000;
    } else if (level >= 985.5 && level <= 986) {
      result = 500000;
    } else if (level >= 986.1 && level <= 986.4) {
      result = 600000;
    } else if (level >= 986.5 && level <= 987) {
      result = 700000;
    } else if (level >= 987.1 && level <= 987.4) {
      result = 800000;
    } else if (level >= 987.5 && level <= 988) {
      result = 850000;
    } else if (level >= 988.1 && level <= 988.4) {
      result = 900000;
    } else if (level >= 988.5 && level <= 989) {
      result = 950000;
    } else if (level >= 989.1 && level <= 989.4) {
      result = 970000;
    } else if (level >= 989.5 && level <= 990) {
      result = 1000000;
    } else if (level >= 990.1 && level <= 990.4) {
      result = 1100000;
    } else if (level >= 990.5 && level <= 991) {
      result = 1300000;
    } else if (level >= 991.1 && level <= 991.4) {
      result = 1500000;
    } else if (level >= 991.5 && level <= 992) {
      result = 1700000;
    } else if (level >= 992.1 && level <= 992.4) {
      result = 1900000;
    } else if (level >= 992.5 && level <= 993) {
      result = 1990000;
    } else if (level >= 993.1 && level <= 993.4) {
      result = 2000000;
    } else if (level >= 993.5 && level <= 994) {
      result = 2200000;
    } else if (level >= 994.1 && level <= 994.4) {
      result = 2400000;
    } else if (level >= 994.5 && level <= 995) {
      result = 2500000;
    } else if (level >= 995.1 && level <= 995.4) {
      result = 2900000;
    } else if (level >= 995.5 && level <= 996) {
      result = 3000000;
    } else if (level >= 996.1 && level <= 996.4) {
      result = 3400000;
    } else if (level >= 996.5 && level <= 997) {
      result = 3600000;
    } else if (level >= 997.1 && level <= 997.4) {
      result = 3800000;
    } else if (level >= 997.5 && level <= 998) {
      result = 4000000;
    } else if (level >= 998.1 && level <= 998.4) {
      result = 4200000;
    } else if (level >= 998.5 && level <= 999) {
      result = 4500000;
    } else if (level >= 999.1 && level <= 999.4) {
      result = 4700000;
    } else if (level >= 999.5 && level <= 1000) {
      result = 5000000;
    } else if (level >= 1000.1 && level <= 1000.4) {
      result = 5500000;
    } else if (level >= 1000.5 && level <= 1001) {
      result = 5700000;
    } else if (level >= 1001.1 && level <= 1001.4) {
      result = 6200000;
    } else if (level >= 1001.5 && level <= 1002) {
      result = 6500000;
    } else if (level >= 1002.1 && level <= 1002.4) {
      result = 7000000;
    } else if (level >= 1002.5 && level <= 1003) {
      result = 7200000;
    } else if (level >= 1003.1 && level <= 1003.4) {
      result = 8000000;
    } else if (level >= 1003.5 && level <= 1004) {
      result = 8200000;
    } else if (level >= 1004.1 && level <= 1004.4) {
      result = 9000000;
    } else if (level >= 1004.5 && level <= 1005) {
      result = 9200000;
    } else if (level >= 1005.1 && level <= 1005.4) {
      result = 10000000;
    } else if (level >= 1005.5 && level <= 1006) {
      result = 10200000;
    } else if (level >= 1006.1 && level <= 1006.4) {
      result = 10600000;
    } else if (level >= 1006.5 && level <= 1007) {
      result = 11900000;
    } else if (level >= 1007.1 && level <= 1007.4) {
      result = 12000000;
    } else if (level >= 1007.5 && level <= 1008) {
      result = 13000000;
    } else if (level >= 1008.1 && level <= 1008.4) {
      result = 13200000;
    } else if (level >= 1008.5 && level <= 1008.9) {
      result = 13800000;
    } else if (level >= 1009 && level <= 1009.1) {
      result = 14000000;
    } else if (level >= 1009.2 && level <= 1009.4) {
      result = 14500000;
    } else if (level >= 1009.5 && level <= 1010) {
      result = 15000000;
    } else if (level >= 1010.1 && level <= 1010.4) {
      result = 15500000;
    } else if (level >= 1010.5 && level <= 1011) {
      result = 16000000;
    } else if (level >= 1011.1 && level <= 1011.4) {
      result = 17000000;
    } else if (level >= 1011.5 && level <= 1011.9) {
      result = 17500000;
    } else if (level >= 1012 && level <= 1012.4) {
      result = 18000000;
    } else if (level >= 1012.5 && level <= 1013) {
      result = 19000000;
    } else if (level >= 1013.1 && level <= 1013.4) {
      result = 20000000;
    } else if (level >= 1013.5 && level <= 1014) {
      result = 20500000;
    } else if (level >= 1014.1 && level <= 1014.3) {
      result = 21500000;
    } else if (level > 1014.3 && level <= 1014.4) {
      result = 21240000;
    } else if (level >= 1014.5 && level <= 1015) {
      result = 22000000;
    } else if (level >= 1015.1 && level <= 1015.6) {
      result = 23600000;
    } else if (level > 1015.6 && level <= 1016) {
      result = 23600000;
    }
    return result;
  },
  magugaWeirLevelToVol: (level) => {
    let result;
    if (level < 512) {
      result = 0;
    } else if (level >= 512 && level <= 512.13) {
      result = 175000;
    } else if (level >= 512.14 && level <= 512.25) {
      result = 188000;
    } else if (level >= 512.26 && level <= 512.38) {
      result = 190000;
    } else if (level >= 512.39 && level <= 512.5) {
      result = 200000;
    } else if (level >= 512.51 && level <= 512.63) {
      result = 205000;
    } else if (level >= 512.64 && level <= 512.75) {
      result = 213000;
    } else if (level >= 512.76 && level <= 512.88) {
      result = 219000;
    } else if (level >= 512.89 && level <= 512.99) {
      result = 225000;
    } else if (level === 513) {
      result = 227395;
    } else if (level >= 513.01 && level <= 513.13) {
      result = 238000;
    } else if (level >= 513.14 && level <= 513.25) {
      result = 244000;
    } else if (level >= 513.26 && level <= 513.38) {
      result = 250000;
    } else if (level >= 513.39 && level <= 513.5) {
      result = 263000;
    } else if (level >= 513.51 && level <= 513.63) {
      result = 275000;
    } else if (level >= 513.64 && level <= 513.7) {
      result = 280000;
    } else if (level >= 513.71 && level <= 513.8) {
      result = 288000;
    } else if (level >= 513.81 && level <= 513.9) {
      result = 300000;
    } else if (level >= 513.91 && level <= 513.99) {
      result = 288000;
    } else if (level === 514) {
      result = 306093;
    } else if (level >= 514.01 && level <= 514.1) {
      result = 313000;
    } else if (level >= 514.11 && level <= 514.2) {
      result = 325000;
    } else if (level >= 514.21 && level <= 514.3) {
      result = 338000;
    } else if (level >= 514.31 && level <= 514.4) {
      result = 350000;
    } else if (level >= 514.41 && level <= 514.5) {
      result = 356000;
    } else if (level >= 514.51 && level <= 514.6) {
      result = 369000;
    } else if (level >= 514.61 && level <= 514.7) {
      result = 381000;
    } else if (level >= 514.71 && level <= 514.8) {
      result = 398000;
    } else if (level >= 514.81 && level <= 514.9) {
      result = 400000;
    } else if (level >= 514.91 && level <= 514.99) {
      result = 413000;
    } else if (level === 515) {
      result = 415352;
    } else if (level >= 515.01 && level <= 515.1) {
      result = 425000;
    } else if (level >= 515.11 && level <= 515.2) {
      result = 438000;
    } else if (level >= 515.21 && level <= 515.3) {
      result = 450000;
    } else if (level >= 515.31 && level <= 515.4) {
      result = 468000;
    } else if (level >= 515.41 && level <= 515.5) {
      result = 475000;
    } else if (level >= 515.51 && level <= 515.6) {
      result = 492000;
    } else if (level >= 515.61 && level <= 515.7) {
      result = 507000;
    } else if (level >= 515.71 && level <= 515.8) {
      result = 525000;
    } else if (level >= 515.81 && level <= 515.9) {
      result = 538000;
    } else if (level >= 515.91 && level <= 515.99) {
      result = 550000;
    } else if (level === 516) {
      result = 552853;
    } else if (level >= 516.01 && level <= 516.1) {
      result = 569000;
    } else if (level >= 516.11 && level <= 516.2) {
      result = 580000;
    } else if (level >= 516.21 && level <= 516.3) {
      result = 600000;
    } else if (level >= 516.31 && level <= 516.4) {
      result = 613000;
    } else if (level >= 516.41 && level <= 516.5) {
      result = 625000;
    } else if (level >= 516.51 && level <= 516.6) {
      result = 644000;
    } else if (level >= 516.61 && level <= 516.7) {
      result = 663000;
    } else if (level >= 516.71 && level <= 516.8) {
      result = 675000;
    } else if (level >= 516.81 && level <= 516.9) {
      result = 694000;
    } else if (level >= 516.91 && level <= 516.99) {
      result = 710000;
    } else if (level === 517) {
      result = 711039;
    } else if (level >= 517.01 && level <= 517.1) {
      result = 725000;
    } else if (level >= 517.11 && level <= 517.2) {
      result = 744000;
    } else if (level >= 517.21 && level <= 517.3) {
      result = 763000;
    } else if (level >= 517.31 && level <= 517.4) {
      result = 775000;
    } else if (level >= 517.41 && level <= 517.5) {
      result = 800000;
    } else if (level >= 517.51 && level <= 517.6) {
      result = 813000;
    } else if (level >= 517.61 && level <= 517.7) {
      result = 834000;
    } else if (level >= 517.71 && level <= 517.8) {
      result = 850000;
    } else if (level >= 517.81 && level <= 517.9) {
      result = 875000;
    } else if (level >= 517.91 && level <= 517.99) {
      result = 888000;
    } else if (level === 518) {
      result = 890193;
    } else if (level >= 518.01 && level <= 518.1) {
      result = 913000;
    } else if (level >= 518.21 && level <= 518.3) {
      result = 950000;
    } else if (level >= 518.31 && level <= 518.4) {
      result = 969000;
    } else if (level >= 518.41 && level <= 518.49) {
      result = 978000;
    } else if (level > 518.5) {
      result = 989000;
    }

    return result;
  },
  volToPerc: (volume) => {
    return ((volume / 23600000) * 100).toFixed(2);
  },
  /*****Ezulwini Peak *********/
  ezulwiniPeakFullLoad: (schedule) => {
    schedule.forEach((item) => {
      if (item.Period === "Peak") item.EZULWINI = "20";
    });
    return schedule;
  },
  ezulwiniPeakHalfLoad: (schedule) => {
    schedule.forEach((item) => {
      if (item.Period === "Peak") item.EZULWINI = "10";
    });
    return schedule;
  },
  ezulwiniPeakShutDown: (schedule) => {
    schedule.forEach((item) => {
      if (item.Period === "Peak") item.EZULWINI = "0";
    });
    return schedule;
  },

  /*****Ezulwini Stnd *********/
  ezulwiniStandardFullLoad: (schedule) => {
    schedule.forEach((item) => {
      if (item.Period === "Standard") item.EZULWINI = "20";
    });
    return schedule;
  },
  ezulwiniStandardHalfLoad: (schedule) => {
    schedule.forEach((item) => {
      if (item.Period === "Standard") item.EZULWINI = "10";
    });
    return schedule;
  },
  ezulwiniStandardShutDown: (schedule) => {
    schedule.forEach((item) => {
      if (item.Period === "Standard") item.EZULWINI = "0";
    });
    return schedule;
  },

  /*****Ezulwini Off-Peak *********/
  ezulwiniOffPeakFullLoad: (schedule) => {
    schedule.forEach((item) => {
      if (item.Period === "Off-Peak") item.EZULWINI = "20";
    });
    return schedule;
  },
  ezulwiniOffPeakHalfLoad: (schedule) => {
    schedule.forEach((item) => {
      if (item.Period === "Off-Peak") item.EZULWINI = "10";
    });
    return schedule;
  },
  ezulwiniOffPeakShutDown: (schedule) => {
    schedule.forEach((item) => {
      if (item.Period === "Off-Peak") item.EZULWINI = "0";
    });
    return schedule;
  },

  /*****Ezulwini ShutDown *********/
  ezulwiniShutDown: (schedule) => {
    schedule.forEach((item) => {
      item.EZULWINI = "0";
    });
    return schedule;
  },

  /*****Edwaleni Peak *********/
  edwaleniPeakFullLoad: (schedule) => {
    schedule.forEach((item) => {
      if (item.Period === "Peak") item.EDWALENI = "14.6";
    });
    return schedule;
  },
  edwaleniPeakHalfLoad: (schedule) => {
    schedule.forEach((item) => {
      if (item.Period === "Peak") item.EDWALENI = "5";
    });
    return schedule;
  },
  edwaleniPeakShutDown: (schedule) => {
    schedule.forEach((item) => {
      if (item.Period === "Peak") item.EDWALENI = "0";
    });
    return schedule;
  },

  /*****Edwaleni Stnd *********/
  edwaleniStandardFullLoad: (schedule) => {
    schedule.forEach((item) => {
      if (item.Period === "Standard") item.EDWALENI = "14.6";
    });
    return schedule;
  },
  edwaleniStandardHalfLoad: (schedule) => {
    schedule.forEach((item) => {
      if (item.Period === "Standard") item.EDWALENI = "5";
    });
    return schedule;
  },
  edwaleniStandardShutDown: (schedule) => {
    schedule.forEach((item) => {
      if (item.Period === "Standard") item.EDWALENI = "0";
    });
    return schedule;
  },

  /*****Edwaleni Off-Peak *********/
  edwaleniOffPeakFullLoad: (schedule) => {
    schedule.forEach((item) => {
      if (item.Period === "Off-Peak") item.EDWALENI = "14.6";
    });
    return schedule;
  },
  edwaleniOffPeakHalfLoad: (schedule) => {
    schedule.forEach((item) => {
      if (item.Period === "Off-Peak") item.EDWALENI = "5";
    });
    return schedule;
  },
  edwaleniOffPeakShutDown: (schedule) => {
    schedule.forEach((item) => {
      if (item.Period === "Off-Peak") item.EDWALENI = "0";
    });
    return schedule;
  },

  /*****Edwaleni ShutDown *********/
  edwaleniShutDown: (schedule) => {
    schedule.forEach((item) => {
      item.EDWALENI = "0";
    });
    return schedule;
  },

  /*****Maguduza Peak *********/
  maguduzaPeakFullLoad: (schedule) => {
    schedule.forEach((item) => {
      if (item.Period === "Peak") item.MAGUDUZA = "5.6";
    });
    return schedule;
  },
  maguduzaPeakHalfLoad: (schedule) => {
    schedule.forEach((item) => {
      if (item.Period === "Peak") item.MAGUDUZA = "3";
    });
    return schedule;
  },
  maguduzaPeakShutDown: (schedule) => {
    schedule.forEach((item) => {
      if (item.Period === "Peak") item.MAGUDUZA = "0";
    });
    return schedule;
  },

  /*****Maguduza Standard *********/
  maguduzaStandardFullLoad: (schedule) => {
    schedule.forEach((item) => {
      if (item.Period === "Standard") item.MAGUDUZA = "5.6";
    });
    return schedule;
  },
  /**
   * @description maguduza standard half load
   * @param {*} schedule
   */
  maguduzaStandardHalfLoad: (schedule) => {
    schedule.forEach((item) => {
      if (item.Period === "Standard") item.MAGUDUZA = "3";
    });
    return schedule;
  },
  /**
   * @description maguduza standard shut down
   * @param {*} schedule
   */
  maguduzaStandardShutDown: (schedule) => {
    schedule.forEach((item) => {
      if (item.Period === "Standard") item.MAGUDUZA = "0";
    });
    return schedule;
  },
  /**
   * @description maguduza off peak full load
   * @param {*} schedule
   */
  maguduzaOffPeakFullLoad: (schedule) => {
    schedule.forEach((item) => {
      if (item.Period === "Off-Peak") item.MAGUDUZA = "5.6";
    });
    return schedule;
  },
  /**
   * @description maguduza off peak half load
   * @param {*} schedule
   */
  maguduzaOffPeakHalfLoad: (schedule) => {
    schedule.forEach((item) => {
      if (item.Period === "Off-Peak") item.MAGUDUZA = "3";
    });
    return schedule;
  },
  /**
   * @description maguduza off peak shut down
   * @param {*} schedule
   */
  maguduzaOffPeakShutDown: (schedule) => {
    schedule.forEach((item) => {
      if (item.Period === "Off-Peak") item.MAGUDUZA = "0";
    });
    return schedule;
  },

  /**
   * @description maguduza shutdown
   * @param {*} schedule
   */
  edwaShutDown: (schedule) => {
    schedule.forEach((item) => {
      item.MAGUDUZA = "0";
    });
    return schedule;
  },
  /**
   * @description all stations shutdown
   * @param {*} schedule
   */
  allShutDown: (schedule) => {
    schedule.forEach((item) => {
      item.MAGUDUZA = "0";
      item.EZULWINI = "0";
      item.EDWALENI = "0";
      item.MAGUGA = "0";
    });
    return schedule;
  },
  /**
   * @description calculate sum
   * @param {*} schedule
   */
  calcSum: (schedule) => {
    let ezulwiniSum = 0;
    let ezulwiniSumPeak = 0;
    let ezulwiniSumStnd = 0;
    let ezulwiniSumOffPeak = 0;

    let edwaleniSum = 0;
    let edwaleniSumPeak = 0;
    let edwaleniSumStnd = 0;
    let edwaleniSumOffPeak = 0;

    let maguduzaSum = 0;
    let maguduzaSumPeak = 0;
    let maguduzaSumStnd = 0;
    let maguduzaSumOffPeak = 0;

    let magugaSum = 0;
    let magugaSumPeak = 0;
    let magugaSumStnd = 0;
    let magugaSumOffPeak = 0;

    schedule.forEach((item) => {
      /* sum */
      ezulwiniSum = ezulwiniSum + parseInt(item.EZULWINI);
      edwaleniSum = edwaleniSum + parseFloat(item.EDWALENI);
      maguduzaSum = maguduzaSum + parseFloat(item.MAGUDUZA);
      magugaSum = magugaSum + parseFloat(item.MAGUGA);
      if (item.Period === "SUM") {
        item.EZULWINI = Math.round(ezulwiniSum * 10) / 10;
        item.EDWALENI = Math.round(edwaleniSum * 10) / 10;
        item.MAGUDUZA = Math.round(maguduzaSum * 10) / 10;
        item.MAGUGA = Math.round(magugaSum * 10) / 10;
      }

      /* Peak sum */
      if (item.Period === "Peak") {
        ezulwiniSumPeak = ezulwiniSumPeak + parseInt(item.EZULWINI);
        edwaleniSumPeak = edwaleniSumPeak + parseFloat(item.EDWALENI);
        maguduzaSumPeak = maguduzaSumPeak + parseFloat(item.MAGUDUZA);
        magugaSumPeak = magugaSumPeak + parseFloat(item.MAGUGA);
      }
      if (item.Period === "PEAK") {
        item.EZULWINI = ezulwiniSumPeak;
        item.EDWALENI = Math.round(edwaleniSumPeak * 10) / 10;
        item.MAGUDUZA = Math.round(maguduzaSumPeak * 10) / 10;
        item.MAGUGA = Math.round(magugaSumPeak * 10) / 10;
      }

      /* Standard sum */
      if (item.Period === "Standard") {
        ezulwiniSumStnd = ezulwiniSumStnd + parseInt(item.EZULWINI);
        edwaleniSumStnd = edwaleniSumStnd + parseFloat(item.EDWALENI);
        maguduzaSumStnd = maguduzaSumStnd + parseFloat(item.MAGUDUZA);
        magugaSumStnd = magugaSumStnd + parseFloat(item.MAGUGA);
      }
      if (item.Period === "STANDARD") {
        item.EZULWINI = ezulwiniSumStnd;
        item.EDWALENI = Math.round(edwaleniSumStnd * 10) / 10;
        item.MAGUDUZA = Math.round(maguduzaSumStnd * 10) / 10;
        item.MAGUGA = Math.round(magugaSumStnd * 10) / 10;
      }

      /* Off-Peak sum */
      if (item.Period === "Off-Peak") {
        ezulwiniSumOffPeak = ezulwiniSumOffPeak + parseInt(item.EZULWINI);
        edwaleniSumOffPeak = edwaleniSumOffPeak + parseFloat(item.EDWALENI);
        maguduzaSumOffPeak = maguduzaSumOffPeak + parseFloat(item.MAGUDUZA);
        magugaSumOffPeak = magugaSumOffPeak + parseFloat(item.MAGUGA);
      }
      if (item.Period === "OFF-PEAK") {
        item.EZULWINI = ezulwiniSumOffPeak;
        item.EDWALENI = Math.round(edwaleniSumOffPeak * 10) / 10;
        item.MAGUDUZA = Math.round(maguduzaSumOffPeak * 10) / 10;
        item.MAGUGA = Math.round(magugaSumOffPeak * 10) / 10;
      }
    });
    return schedule;
  },
  /**
   * @description calculate sum for weekdays
   * @param {*} schedule
   */
  calcWeekDaySum: (schedule) => {
    let ezulwiniSumPeak = 0;
    let ezulwiniSumStnd = 0;
    let ezulwiniSumOffPeak = 0;

    let edwaleniSumPeak = 0;
    let edwaleniSumStnd = 0;
    let edwaleniSumOffPeak = 0;

    let maguduzaSumPeak = 0;
    let maguduzaSumStnd = 0;
    let maguduzaSumOffPeak = 0;

    let magugaSumPeak = 0;
    let magugaSumStnd = 0;
    let magugaSumOffPeak = 0;
    schedule.forEach((item) => {
      if (item.Period === "Peak") {
        ezulwiniSumPeak = ezulwiniSumPeak + parseInt(item.EZULWINI);
        edwaleniSumPeak = edwaleniSumPeak + parseFloat(item.EDWALENI);
        maguduzaSumPeak = maguduzaSumPeak + parseFloat(item.MAGUDUZA);
        magugaSumPeak = magugaSumPeak + parseFloat(item.MAGUGA);

        if ("ezulwiniSumPeak" in item) {
          item["ezulwiniSumPeak"] = Math.round(ezulwiniSumPeak * 10) / 10;
          item["edwaleniSumPeak"] = Math.round(edwaleniSumPeak * 10) / 10;
          item["maguduzaSumPeak"] = Math.round(maguduzaSumPeak * 10) / 10;
          item["magugaSumPeak"] = Math.round(magugaSumPeak * 10) / 10;

          ezulwiniSumPeak = 0;
          edwaleniSumPeak = 0;
          maguduzaSumPeak = 0;
          magugaSumPeak = 0;
        }
      }
      if (item.Period === "Standard") {
        ezulwiniSumStnd = ezulwiniSumStnd + parseInt(item.EZULWINI);
        edwaleniSumStnd = edwaleniSumStnd + parseFloat(item.EDWALENI);
        maguduzaSumStnd = maguduzaSumStnd + parseFloat(item.MAGUDUZA);
        magugaSumStnd = magugaSumStnd + parseFloat(item.MAGUGA);

        if ("ezulwiniSumStnd" in item) {
          item["ezulwiniSumStnd"] = Math.round(ezulwiniSumStnd * 10) / 10;
          item["edwaleniSumStnd"] = Math.round(edwaleniSumStnd * 10) / 10;
          item["maguduzaSumStnd"] = Math.round(maguduzaSumStnd * 10) / 10;
          item["magugaSumStnd"] = Math.round(magugaSumStnd * 10) / 10;

          ezulwiniSumStnd = 0;
          edwaleniSumStnd = 0;
          maguduzaSumStnd = 0;
          magugaSumStnd = 0;
        }
      }

      if (item.Period === "Off-Peak") {
        ezulwiniSumOffPeak = ezulwiniSumOffPeak + parseInt(item.EZULWINI);
        edwaleniSumOffPeak = edwaleniSumOffPeak + parseFloat(item.EDWALENI);
        maguduzaSumOffPeak = maguduzaSumOffPeak + parseFloat(item.MAGUDUZA);
        magugaSumOffPeak = magugaSumOffPeak + parseFloat(item.MAGUGA);

        if ("ezulwiniSumOffPeak" in item) {
          item["ezulwiniSumOffPeak"] = Math.round(ezulwiniSumOffPeak * 10) / 10;
          item["edwaleniSumOffPeak"] = Math.round(edwaleniSumOffPeak * 10) / 10;
          item["maguduzaSumOffPeak"] = Math.round(maguduzaSumOffPeak * 10) / 10;
          item["magugaSumOffPeak"] = Math.round(magugaSumOffPeak * 10) / 10;

          ezulwiniSumOffPeak = 0;
          edwaleniSumOffPeak = 0;
          maguduzaSumOffPeak = 0;
          magugaSumOffPeak = 0;
        }
      }
    });
    return schedule;
  },
  /********   Maguga Power Station     ************** */
  /**
   *
   * @param {Array} schedule current schedule
   * @param {Array} period type of period eg. Peak, Off-Peak
   * @param {String} power power to be generated
   * @param {String} station power station
   */
  periodGen: (schedule, period, power, station) => {
    schedule.forEach((item) => {
      if (item.Period === period) item[station] = power;
    });

    return schedule;
  },
  /*********************generate given period and time */
  /**
   *
   * @param {Array} schedule current schedule
   * @param {Array} periods range of hours
   * @param {String} power power to be generated
   * @param {String} station power station
   */
  hourlyGen: (schedule, periods, power, station) => {
    periods.forEach((timePeriod) => {
      schedule.forEach((item) => {
        if (item.Time === timePeriod) item[station] = power;
      });
    });

    return schedule;
  },
  /**
   *
   * @param {Array} schedule current schedule
   * @param {Array} periods range of hours
   * @param {String} power power to be generated
   * @param {String} station power stations
   * @param {Number} availableHours available hours
   */
  hourlyGenWithLimit: (schedule, periods, power, station, availableHours) => {
    // for (let index = 0; index < periods.length; index++) {
    //   schedule.forEach((item) => {
    //     if (item.Time === periods[index]) item[station] = power;
    //   });
    // }

    periods.forEach((timePeriod) => {
      if (availableHours < 0) {
        return false;
      }
      schedule.forEach((item) => {
        if (item.Time === timePeriod) item[station] = power;
      });
      availableHours--;
    });

    return schedule;
  },

  magugaWeekDayPriority: () => {
    return [
      "7:00  -  8:00",
      "8:00  -  9:00",
      "9:00  -  10:00",
      "18:00  -  19:00",
      "19:00  -  20:00",
      "6:00  -  7:00",
      "17:00  -  18:00",
      "10:00  -  11:00",
      "11:00  -  12:00",
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
    ];
  },
  magugaSatPriority: () => {
    return [
      "7:00  -  8:00",
      "8:00  -  9:00",
      "9:00  -  10:00",
      "10:00  -  11:00",
      "11:00  -  12:00",
      "18:00  -  19:00",
      "19:00  -  20:00",
      "6:00  -  7:00",
      "17:00  -  18:00",
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
    ];
  },
};

export default {
  methods,
};
