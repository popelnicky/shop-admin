export default class Utils {
  static getRandomNumber(from, to) {
    return parseInt(from + Math.random() * to, 10);
  }
}