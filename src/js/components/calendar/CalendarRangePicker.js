import MonthRangePicker from "./MonthRangePicker";

export default class CalendarRangePicker {
  constructor(from, to, size = 2) {
    this.from = from;
    this.to = to;
    this.size = size;

    this.show = event => {
      const $target = event.target.closest(".rangepicker");

      if ($target) {
        this.opened = !this.opened;

        const action = this.opened ? "add" : "remove";

        $target.classList[action]("rangepicker_open");
      }
    };
    this.opened = false;

    this.$element = document.createElement("div");
    this.$element.classList.add("container");
    this.$element.innerHTML = this.template;

    this.initEventListeners();

    return this.$element;
  }

  get template() {
    return `<div class="rangepicker">
                <div class="rangepicker__input" data-elem="input">
                    <span data-elem="from">${this.from.toLocaleDateString("en-US")}</span> -
                    <span data-elem="to">${this.to.toLocaleDateString("en-US")}</span>
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
    let result = "";

    for (let i = 0; i < this.size; i++) {
      const month = new MonthRangePicker();

      result += month.template;
    }

    return result;
  }

  destroy() {
    this.removeEventListeners();

    this.from = null;
    this.to = null;
    this.opened = false;
    this.$element = null;
  }
}