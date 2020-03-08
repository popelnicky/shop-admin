import { successes, warnings, errors } from "../data/common";

export default class Utils {
  static getRandomNumber(from, to) {
    return Math.round(from - 0.5 + Math.random() * (to - from + 1));
  }

  static getChartData(header, preffix = "") {
    const values = [];
    let amount = preffix;

    for (let i = 0; i < 25; i++) {
      values.push(this.getRandomNumber(0, 50));
    }

    amount += values.reduce((result, value) => {
      return result += value;
    }, 0).toLocaleString("en-US");

    return { header, amount, values };
  }

  static getMessageData() {
    const type = parseInt(Math.random() * 1000, 10) % 3;

    switch (type) {
    case 0: {
      return {
        type: "success",
        message: successes[this.getRandomNumber(0, successes.length - 1)]
      };
    }
    case 1: {
      return {
        type: "warning",
        message: warnings[this.getRandomNumber(0, warnings.length - 1)]
      };
    }
    case 2: {
      return {
        type: "error",
        message: errors[this.getRandomNumber(0, errors.length - 1)]
      };
    }
    }
  }
}