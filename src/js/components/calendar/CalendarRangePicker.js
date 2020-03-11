import MonthRangePicker from "./MonthRangePicker";

export default class CalendarRangePicker {
  constructor(
    from = new Date(new Date() - (30 * 24 * 60 * 60 * 1000)),
    to = new Date(),
    size = 2) {
    this.selected = { from, to };
    // this.range = { left: new Date(to).setMonth(to.getMonth() - 1).setDate(1), right: new Date(to).setDate(1) };
    this.size = size;

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
    let result = "";
    const shift = this.size - 1;

    for (let i = 0, month = this.selected.to.getMonth() - shift; i < this.size; i++, month++) {
      const item = new MonthRangePicker(new Date(this.selected.to.getFullYear(), month, 1));

      result += item.template;
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