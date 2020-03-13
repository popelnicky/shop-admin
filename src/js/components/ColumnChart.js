export default class ColumnChart {
  constructor(header = "", style = "untitled-style") {
    this.header = header;
    this.amount = 0;
    this.data = [];

    this.$element = document.createElement("div");

    this.$element.classList.add("column-chart");
    this.$element.classList.add(style);
    this.$element.innerHTML = this.template;
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
    return this.data.map(item => `<div style="--value:${item.rate}" data-tooltip="<div><small>${item.date}</small></div><strong>${item.value}</strong>"></div>`).join("");
  }

  update({amount, values} = {}) {
    this.amount = amount;
    this.data = new Array(...values);

    this.$element.innerHTML = this.template;
  }

  destroy() {
    this.header = null;
    this.amount = null;
    this.data = null;
  }
}