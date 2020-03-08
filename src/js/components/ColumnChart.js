export default class ColumnChart {
  constructor(data) {
    this.header = data.header;
    this.amount = data.amount;
    this.data = data.values;

    const $component = document.createElement("div");

    $component.innerHTML = this.template;

    return $component;
  }

  get template() {
    return `<div class="column-chart__title">${this.header}</div>
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