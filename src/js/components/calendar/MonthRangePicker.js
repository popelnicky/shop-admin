import DayRangePicker from "./DayRangePicker";

export default class MonthRangePicker {
  constructor(month, selected) {
    this.month = month;
    this.selected = selected;
    this.range = this.getRange();
    this.header = this.month.toLocaleString("ru", {month: "long"});
  }

  get template() {
    return `<div class="rangepicker__calendar">
                <div class="rangepicker__month-indicator">
                    <time datetime="${this.month.getMonth()}">${this.header}</time>
                </div>
                <div class="rangepicker__day-of-week">
                    <div>Пн</div>
                    <div>Вт</div>
                    <div>Ср</div>
                    <div>Чт</div>
                    <div>Пт</div>
                    <div>Сб</div>
                    <div>Вс</div>
                </div>
                <div class="rangepicker__date-grid">
                    ${this.getDays()}
                </div>
            </div>`;
  }

  getDays() {
    return this.range.reduce((result, day) => {
      const item = new Date(this.month);

      item.setDate(day);

      return result += new DayRangePicker(item, this.selected).template;
    }, "");
  }

  getRange() {
    let day = 0;
    let last = 28;
    const monthIndex = this.month.getMonth();
    const month = new Date(this.month);

    month.setDate(last);
    
    while (month.getMonth() === monthIndex) {
      last++;
      month.setDate(last);
    }

    return new Array(last - 1).fill(1).map(() => {
      return ++day;
    });
  }
}