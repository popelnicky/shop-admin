export default class ColumnChart {
  constructor({ header, amount, values }, style = "daf4") {
    this.header = header;
    this.amount = amount;
    this.data = values;

    const $element = document.createElement("div");

    $element.classList.add("column-chart");
    $element.classList.add(style);
    $element.innerHTML = this.template;

    return $element;
  }

  get template() {
    return `<div class="column-chart__title">Total ${this.header}</div>
                <div class="column-chart__container">
                    <div class="column-chart__header">${this.amount}</div>
                    <div class="column-chart__chart">
                        ${this.getColumns()}
                    </div>
                </div>`;
  }

  getColumns() {
    return this.data.map(item => `<div style="--value:${item}" data-tooltip="${item}"></div>`).join("");
  }

  destroy() {
    this.header = null;
    this.amount = null;
    this.data = null;
  }
}