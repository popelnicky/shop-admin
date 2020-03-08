import { successes, warnings, errors } from "../data/common";

export default class Utils {
  static getRandomNumber(from, to) {
    return parseInt(from + Math.random() * to, 10);
  }

  static getMessageData() {
    const type = parseInt(Math.random() * 1000, 10) % 3;

    switch (type) {
    case 0: {
      return {
        type: "success",
        message: successes[this.getRandomNumber(0, successes.length)]
      };
    }
    case 1: {
      return {
        type: "warning",
        message: warnings[this.getRandomNumber(0, warnings.length)]
      };
    }
    case 2: {
      return {
        type: "error",
        message: errors[this.getRandomNumber(0, errors.length)]
      };
    }
    }
  }
}