import MonthRangePicker from "./MonthRangePicker";

export default class CalendarRangePicker {
  constructor(
    from = new Date(new Date() - (30 * 24 * 60 * 60 * 1000)),
    to = new Date(),
    size = 2) {
    this.selected = { from, to };
    this.size = size;
    this.range = this.getRange(to);

    this.show = event => {
      const $target = event.target.closest(".rangepicker");

      if ($target) {
        $target.classList.toggle("rangepicker_open");
      }
    };
    
    // TODO: Maybe not needed
    // this.opened = false;

    this.$element = document.createElement("div");
    this.$element.classList.add("container");
    this.$element.innerHTML = this.template;

    this.initEventListeners();

    return this.$element;
  }

  get template() {
    return `<div class="rangepicker">
                <div class="rangepicker__input" data-elem="input">
                    <span data-elem="from">${this.selected.from.toLocaleDateString("en")}</span> -
                    <span data-elem="to">${this.selected.to.toLocaleDateString("en")}</span>
                </div>
                <div class="rangepicker__selector" data-elem="selector">
                    <div class="rangepicker__selector-arrow"></div>
                    <div class="rangepicker__selector-control-left"></div>
                    <div class="rangepicker__selector-control-right"></div>
                    ${this.getMonths()}
                </div>
            </div>`;
  }

  initEventListeners() {
    this.$element.addEventListener("pointerdown", this.show);
  }

  removeEventListeners() {
    this.$element.removeEventListener("pointerdown", this.show);
  }

  getMonths() {
    return this.range.reduce((result, month) => {
      const item = new MonthRangePicker(month, this.selected);

      return result += item.template;
    }, "");
  }

  getRange(latestMonth) {
    let shiftMonth = this.size - 1;

    return new Array(this.size).fill(1).map(() => {
      const month = new Date(latestMonth);
      const monthIndex = month.getMonth() - shiftMonth;

      month.setMonth(monthIndex);
      month.setDate(1);
      
      shiftMonth--;

      return month;
    });
  }

  destroy() {
    this.removeEventListeners();

    this.from = null;
    this.to = null;
    this.opened = false;
    this.$element = null;
  }
}