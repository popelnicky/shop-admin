export default class DayRangePicker {
  constructor(day = new Date(), {from, to} = {}) {
    this.day = day;
    this.timestamp = this.getDayTimestamp(day);
    this.from = this.getDayTimestamp(from);
    this.to = this.getDayTimestamp(to);
    this.first = this.day.getDate() === 1 ? ` style="--start-from: ${this.day.getDay() || 7}"` : "";
    this.selected = this.getSelected();
  }
    
  get template() {
    return `<button type="button" class="rangepicker__cell${this.selected}" data-value="${this.day.getTime()}"${this.first}>${this.day.getDate()}</button>`;
  }

  getSelected() {
    let result = "";

    if (this.timestamp === this.from) {
      result = " rangepicker__selected-from";
    }

    if (this.timestamp === this.to) {
      result = " rangepicker__selected-to";
    }

    if (this.from < this.timestamp && this.timestamp < this.to) {
      result = " rangepicker__selected-between";
    }

    return result;
  }

  getDayTimestamp(day) {
    const dayInMilliseconds = (24 * 60 * 60 * 1000);
      
    return parseInt(day.getTime() / dayInMilliseconds, 10) * dayInMilliseconds;
  }
}