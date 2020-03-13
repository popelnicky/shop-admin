export default class TempSortableTable {
    $element;
    $subElements = {};
  
    headersConfig = [];
    data = [];
    isSortLocally = false;
  
    onSortClick = event => {
      const column = event.target.closest('[data-sortable="true"]');
  
      if (column) {
        const { id, order } = column.dataset;
        const arrow = column.querySelector('.sortable-table__sort-arrow');
  
        column.dataset.order = order === 'asc' ? 'desc' : 'asc';
  
        if (!arrow) {
          column.append(this.$subElements.arrow);
        }
  
        if (this.isSortLocally) {
          this.sortLocally(id, order);
        }
  
        this.dispatchEvent(id, order);
      }
    };
  
    constructor (headersConfig, {
      data = [],
      sorted = {
        id: headersConfig.find(item => item.sortable).id,
        order: 'asc'
      },
      isSortLocally = false
    } = {}) {
      this.headersConfig = headersConfig;
      this.data = data;
      this.sorted = sorted;
      this.isSortLocally = isSortLocally;

      this.$element = document.createElement("div");
      this.$element.classList.add("sortable-table");
      this.$element.innerHTML = this.render();
      this.$subElements = this.getSubElements();
  
      this.initEventListeners();
    }
  
    sortLocally (id, order) {
      const sortedData = this.sortData(id, order);
  
      this.$subElements.body.innerHTML = this.getTableBody(sortedData);
    }
  
    renderTableBody (data) {
      this.$subElements.body.innerHTML = this.getTableBody(data);
    }
  
    dispatchEvent (id, order) {
      this.$element.dispatchEvent(new CustomEvent('sort-table', {
        bubbles: true,
        detail: {
          id,
          order
        }
      }));
    }
  
    getTableHeader () {
      return `<div data-element="header" class="sortable-table__header sortable-table__row">
        ${this.headersConfig.map(item => this.getHeaderRow(item)).join('')}
      </div>`;
    }
  
    getHeaderRow ({id, title, sortable}) {
      const order = this.sorted.id === id ? this.sorted.order : 'asc';
  
      return `
        <div class="sortable-table__cell" data-id="${id}" data-sortable="${sortable}" data-order="${order}">
          <span>${title}</span>
          ${this.getHeaderSortingArrow(id)}
        </div>
      `;
    }
  
    getHeaderSortingArrow (id) {
      const isOrderExist = this.sorted.id === id ? this.sorted.order : '';
  
      return isOrderExist
        ? `<span data-element="arrow" class="sortable-table__sort-arrow">
            <span class="sort-arrow"></span>
          </span>`
        : '';
    }
  
    getTableBody (data) {
      return `<div data-element="body" class="sortable-table__body">
        ${this.getTableRows(data)}
      </div>`;
    }
  
    getTableRows (data) {
      const cells = this.headersConfig.map(({id, template}) => {
        return {
          id,
          template
        }
      });
  
      return `${data.map(item => {
        return new TableRow(cells, item).render();
      }).join('')}`
    }
  
    getTable (data) {
      return `
        ${this.getTableHeader()}
        ${this.getTableBody(data)}
      `;
    }
  
    render () {
      const $wrapper = document.createElement('div');
      const sortedData = this.sortData(this.sorted.id);
  
      return this.getTable(sortedData);
    }
  
    sortData (field, order) {
      const arr = [...this.data];
      // TODO: rethink data structure of header config
      const column = this.headersConfig.find(item => item.id === field);
      const { sortType, sort } = column;
      const direction = order === 'asc' ? 1 : -1;
  
      return arr.sort((a, b) => {
        switch (sortType) {
        case 'number':
          return direction * (a[field] - b[field]);
        case 'string':
          return direction * a[field].localeCompare(b[field]);
        case 'custom':
          return direction * sort(a[column.id], b[column.id]);
        default:
          return direction * (a[field] - b[field]);
        }
      });
    }

    update(data) {
        this.data = data;

        this.$element.innerHTML = this.render();
    }
  
    initEventListeners () {
      this.$subElements.header.addEventListener('pointerdown', this.onSortClick);
    }
  
    getSubElements () {
      const elements = this.$element.querySelectorAll('[data-element]');
  
      return [...elements].reduce((accum, subElement) => {
        accum[subElement.dataset.element] = subElement;
  
        return accum;
      }, {});
    }
  
    addRows (data) {
      const rows = document.createElement('div');
  
      this.data = [...this.data, ...data];
      rows.innerHTML = this.getTableRows(data);
  
      this.$subElements.body.append(...rows.childNodes);
    }
  
    remove () {
      this.$element.remove();
    }
  
    destroy () {
      this.remove();
      this.$element = {};
      this.$subElements = {};
    }
  }
  
  class TableRow {
    $element;
  
    constructor (cells, data) {
      this.cells = cells;
      this.data = data;
    }
  
    getCellTemplate (item) {
      return `<div class="sortable-table__cell">${this.data[item]}</div>`;
    }
  
    getRow () {
      return `
        <div class="sortable-table__row">
          ${this.cells.map(({id, template}) => {
            return template
              ? template(this.data[id])
              : this.getCellTemplate(id);
          }).join('')}
        </div>
      `;
    }
  
    render () {
      const $wrapper = document.createElement('div');
  
      $wrapper.innerHTML = this.getRow();
  
      this.$element = $wrapper.firstElementChild;
  
      return this.$element.outerHTML;
    }
  }
  