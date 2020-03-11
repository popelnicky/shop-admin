export default class MonthRangePicker {
  constructor(date) {
    this.date = date;
    this.month = date.getMonth();
    this.header = this.date.toLocaleString("ru", {month: "long"});
  }

  get template() {
    return `<div class="rangepicker__calendar">
                <div class="rangepicker__month-indicator">
                    <time datetime="${this.header}">${this.header}</time>
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
    // TODO: Don't like it. Needs to be refactoring
    const dayOfWeek = this.date.getDay() === 0 ? 7 : this.date.getDay();
    let result = `<button type="button" class="rangepicker__cell" data-value="${this.date.toISOString()}" style="--start-from: ${dayOfWeek}">${this.date.getDate()}</button>`;
    
    this.date.setDate(2);

    let day = this.date.getDate();

    while (this.date.getMonth() === this.month) {
      result += `<button type="button" class="rangepicker__cell" data-value="${this.date.toISOString()}">${this.date.getDate()}</button>`;
      
      day++;
      
      this.date.setDate(day);
    }

    return result;
  }
}